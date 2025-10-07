import express from 'express';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { uploadMultiple, handleUploadError } from '../middleware/upload.js';
import Certificate from '../models/Certificate.js'; // your mongoose model

const router = express.Router();

// 📤 Upload multiple images → merge → save PDF
router.post('/upload', uploadMultiple, handleUploadError, async (req, res) => {
  try {
    const { rollNumber } = req.body;
    const files = req.files;

    if (!rollNumber || !files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Roll number and at least one image are required'
      });
    }

    // Create a PDF from uploaded images
    const pdfPath = path.join('uploads', `certificate-${Date.now()}.pdf`);
    const doc = new PDFDocument({ autoFirstPage: false });
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    for (const file of files) {
      const imagePath = file.path;
      const image = doc.openImage(imagePath);
      doc.addPage({ size: [image.width, image.height] });
      doc.image(imagePath, 0, 0, { width: image.width, height: image.height });
    }

    doc.end();

    await new Promise((resolve) => writeStream.on('finish', resolve));

    // Remove temporary image files
    for (const file of files) fs.unlinkSync(file.path);

    // Save record in MongoDB
    const certificate = await Certificate.create({
      rollNumber,
      fileName: path.basename(pdfPath),
      pdfUrl: `/${pdfPath}`
    });

    return res.status(201).json({
      success: true,
      message: 'Certificate PDF created successfully',
      data: certificate
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload or generate PDF',
      error: error.message
    });
  }
});

export default router;
