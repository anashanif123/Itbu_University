import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Certificate from '../models/Certificate.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { uploadSingle, handleUploadError, cleanupFile } from '../middleware/upload.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

const router = express.Router();

// Validation rules
const certificateValidation = [
  body('rollNumber')
    .trim()
    .notEmpty()
    .withMessage('Roll number is required')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('Roll number can only contain letters and numbers')
];

// @route   POST /api/certificates/upload
// @desc    Upload a new certificate
// @access  Private (Admin)
router.post('/upload', 
  authenticateToken,
  uploadSingle,
  handleUploadError,
  certificateValidation,
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Clean up uploaded file if validation fails
        if (req.file) {
          cleanupFile(req.file.path);
        }
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Certificate file is required'
        });
      }

      const { rollNumber } = req.body;

      // Check if certificate with this roll number already exists
      const existingCertificate = await Certificate.findOne({
        rollNumber: rollNumber.toUpperCase().trim()
      });

      if (existingCertificate) {
        cleanupFile(req.file.path);
        return res.status(400).json({
          success: false,
          message: 'Certificate with this roll number already exists'
        });
      }

      // Upload file to Cloudinary
      const uploadResult = await uploadToCloudinary(req.file, 'itbu-certificates');
      
      if (!uploadResult.success) {
        cleanupFile(req.file.path);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload file to cloud storage',
          error: uploadResult.error
        });
      }

      // Clean up local file
      cleanupFile(req.file.path);

      // Create certificate record
      const certificate = new Certificate({
        rollNumber: rollNumber.toUpperCase().trim(),
        pdfUrl: uploadResult.url,
        fileName: req.file.originalname,
        uploadedBy: req.admin._id
      });

      await certificate.save();

      // Populate uploadedBy field
      await certificate.populate('uploadedBy', 'username');

      res.status(201).json({
        success: true,
        message: 'Certificate uploaded successfully',
        data: {
          certificate
        }
      });

    } catch (error) {
      // Clean up file if error occurs
      if (req.file) {
        cleanupFile(req.file.path);
      }
      
      console.error('Upload certificate error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during certificate upload'
      });
    }
  }
);

// @route   GET /api/certificates
// @desc    Get all certificates with pagination and filtering
// @access  Private (Admin)
router.get('/', 
  authenticateToken,
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('search').optional().trim().isLength({ max: 100 }).withMessage('Search term too long')
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

      // Build filter object
      const filter = {};

      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        filter.rollNumber = searchRegex;
      }

      // Get certificates with pagination
      const certificates = await Certificate.find(filter)
        .populate('uploadedBy', 'username')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      // Get total count for pagination
      const total = await Certificate.countDocuments(filter);
      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        success: true,
        data: {
          certificates,
          pagination: {
            currentPage: page,
            totalPages,
            totalCertificates: total,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
          }
        }
      });

    } catch (error) {
      console.error('Get certificates error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
);

// @route   GET /api/certificates/:id
// @desc    Get single certificate by ID
// @access  Private (Admin)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('uploadedBy', 'username');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        certificate
      }
    });

  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/certificates/:id
// @desc    Update certificate roll number
// @access  Private (Admin)
router.put('/:id', 
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
        return res.status(404).json({
          success: false,
          message: 'Certificate not found'
        });
      }

      // Update roll number if provided
      if (req.body.rollNumber) {
        // Check if new roll number already exists
        const existingCertificate = await Certificate.findOne({
          rollNumber: req.body.rollNumber.toUpperCase().trim(),
          _id: { $ne: req.params.id }
        });

        if (existingCertificate) {
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
        data: {
          certificate
        }
      });

    } catch (error) {
      console.error('Update certificate error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
);

// @route   DELETE /api/certificates/:id
// @desc    Delete certificate
// @access  Private (Admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Delete from Cloudinary first
    if (certificate.cloudinaryId) {
      await deleteFromCloudinary(certificate.cloudinaryId);
    }

    // Hard delete the certificate
    await Certificate.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Certificate deleted successfully'
    });

  } catch (error) {
    console.error('Delete certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/certificates/stats/overview
// @desc    Get certificate statistics
// @access  Private (Admin)
router.get('/stats/overview', authenticateToken, async (req, res) => {
  try {
    const totalCertificates = await Certificate.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalCertificates
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
