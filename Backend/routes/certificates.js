import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Certificate from '../models/Certificate.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadMultiple, handleUploadError, cleanupFile } from '../middleware/upload.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validation rules
const certificateValidation = [
  body('rollNumber')
    .trim()
    .notEmpty()
    .withMessage('Roll number is required')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('Roll number can only contain letters and numbers')
];

// ============================================================================
// @route   POST /api/certificates/upload
// @desc    Upload multiple images, merge into PDF, save to Cloudinary
// @access  Private (Admin)
// ============================================================================
router.post(
  '/upload',
  authenticateToken,
  uploadMultiple, // handles multiple images
  handleUploadError,
  certificateValidation,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.files && req.files.length > 0) {
          req.files.forEach(file => cleanupFile(file.path));
        }
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { rollNumber } = req.body;
      const upperRoll = rollNumber.toUpperCase().trim();

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'At least one image file is required'
        });
      }

      // Check for duplicate roll number
      const existing = await Certificate.findOne({ rollNumber: upperRoll });
      if (existing) {
        req.files.forEach(file => cleanupFile(file.path));
        return res.status(400).json({
          success: false,
          message: 'Certificate with this roll number already exists'
        });
      }

      // ===== Create PDF from uploaded images =====
      const pdfPath = path.join(__dirname, `../uploads/${Date.now()}_${upperRoll}.pdf`);
      const doc = new PDFDocument({ autoFirstPage: false });
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      req.files.forEach((file, index) => {
        const img = doc.openImage(file.path);
        const pageWidth = img.width > 600 ? 600 : img.width;
        const pageHeight = (img.height / img.width) * pageWidth;

        doc.addPage({ size: [pageWidth + 50, pageHeight + 50] });
        doc.image(file.path, 25, 25, { fit: [pageWidth, pageHeight], align: 'center', valign: 'center' });
      });

      doc.end();

      // Wait until the PDF is finished writing
      await new Promise(resolve => stream.on('finish', resolve));

      // Upload merged PDF to Cloudinary
      const uploadResult = await uploadToCloudinary(
        { path: pdfPath, originalname: `${upperRoll}.pdf` },
        'itbu-certificates'
      );

      if (!uploadResult.success) {
        cleanupFile(pdfPath);
        req.files.forEach(file => cleanupFile(file.path));
        return res.status(500).json({
          success: false,
          message: 'Failed to upload merged PDF to Cloudinary',
          error: uploadResult.error
        });
      }

      // Cleanup local files
      req.files.forEach(file => cleanupFile(file.path));
      cleanupFile(pdfPath);

      // Save record to database
      const certificate = new Certificate({
        rollNumber: upperRoll,
        pdfUrl: uploadResult.url,
        fileName: `${upperRoll}.pdf`,
        uploadedBy: req.admin._id
      });

      await certificate.save();
      await certificate.populate('uploadedBy', 'username');

      res.status(201).json({
        success: true,
        message: 'Certificate PDF created and uploaded successfully',
        data: { certificate }
      });
    } catch (error) {
      if (req.files && req.files.length > 0) {
        req.files.forEach(file => cleanupFile(file.path));
      }
      console.error('Upload certificate error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during certificate upload'
      });
    }
  }
);

// ============================================================================
// Other routes (no change except small cleanup)
// ============================================================================

// Get all certificates
router.get(
  '/',
  authenticateToken,
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('search').optional().trim()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const filter = {};
      if (req.query.search) {
        filter.rollNumber = new RegExp(req.query.search, 'i');
      }

      const [certificates, total] = await Promise.all([
        Certificate.find(filter)
          .populate('uploadedBy', 'username')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        Certificate.countDocuments(filter)
      ]);

      res.status(200).json({
        success: true,
        data: {
          certificates,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalCertificates: total
          }
        }
      });
    } catch (error) {
      console.error('Get certificates error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// Get single certificate
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id).populate('uploadedBy', 'username');
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }
    res.status(200).json({ success: true, data: { certificate } });
  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update certificate roll number
router.put(
  '/:id',
  authenticateToken,
  [
    body('rollNumber')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Roll number cannot be empty')
      .matches(/^[A-Z0-9]+$/)
      .withMessage('Roll number can only contain letters and numbers')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const certificate = await Certificate.findById(req.params.id);
      if (!certificate) {
        return res.status(404).json({ success: false, message: 'Certificate not found' });
      }

      if (req.body.rollNumber) {
        const existing = await Certificate.findOne({
          rollNumber: req.body.rollNumber.toUpperCase().trim(),
          _id: { $ne: req.params.id }
        });
        if (existing) {
          return res.status(400).json({
            success: false,
            message: 'Certificate with this roll number already exists'
          });
        }

        certificate.rollNumber = req.body.rollNumber.toUpperCase().trim();
        await certificate.save();
      }

      await certificate.populate('uploadedBy', 'username');
      res.status(200).json({
        success: true,
        message: 'Certificate updated successfully',
        data: { certificate }
      });
    } catch (error) {
      console.error('Update certificate error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// Delete certificate
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    if (certificate.cloudinaryId) {
      await deleteFromCloudinary(certificate.cloudinaryId);
    }

    await Certificate.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error('Delete certificate error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Stats route
router.get('/stats/overview', authenticateToken, async (req, res) => {
  try {
    const totalCertificates = await Certificate.countDocuments();
    res.status(200).json({ success: true, data: { totalCertificates } });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
