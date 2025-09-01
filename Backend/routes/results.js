import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Certificate from '../models/Certificate.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/results/search
// @desc    Search for student result by roll number
// @access  Public
router.get('/search', 
  [
    query('rollNumber')
      .trim()
      .notEmpty()
      .withMessage('Roll number is required')
      .matches(/^[A-Z0-9]+$/)
      .withMessage('Roll number can only contain letters and numbers')
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { rollNumber } = req.query;

      // Search for certificate
      const certificate = await Certificate.searchByRollNumber(rollNumber);

      if (!certificate) {
        return res.status(404).json({
          success: false,
          message: 'No result found for the provided roll number'
        });
      }

      // Return result data (without sensitive admin information)
      const resultData = {
        rollNumber: certificate.rollNumber,
        studentName: certificate.studentName,
        category: certificate.category,
        categoryDisplay: certificate.categoryDisplay,
        course: certificate.course,
        year: certificate.year,
        semester: certificate.semester,
        grade: certificate.grade,
        percentage: certificate.percentage,
        pdfUrl: certificate.pdfUrl,
        fileName: certificate.fileName,
        isVerified: certificate.isVerified,
        verifiedAt: certificate.verifiedAt,
        createdAt: certificate.createdAt
      };

      res.status(200).json({
        success: true,
        message: 'Result found successfully',
        data: {
          result: resultData
        }
      });

    } catch (error) {
      console.error('Search result error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during result search'
      });
    }
  }
);

// @route   GET /api/results/search/:rollNumber
// @desc    Search for student result by roll number (alternative endpoint)
// @access  Public
router.get('/search/:rollNumber', async (req, res) => {
  try {
    const { rollNumber } = req.params;

    // Validate roll number format
    if (!rollNumber || !/^[A-Z0-9]+$/.test(rollNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid roll number format'
      });
    }

    // Search for certificate
    const certificate = await Certificate.searchByRollNumber(rollNumber);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'No result found for the provided roll number'
      });
    }

    // Return result data
    const resultData = {
      rollNumber: certificate.rollNumber,
      studentName: certificate.studentName,
      category: certificate.category,
      categoryDisplay: certificate.categoryDisplay,
      course: certificate.course,
      year: certificate.year,
      semester: certificate.semester,
      grade: certificate.grade,
      percentage: certificate.percentage,
      pdfUrl: certificate.pdfUrl,
      fileName: certificate.fileName,
      isVerified: certificate.isVerified,
      verifiedAt: certificate.verifiedAt,
      createdAt: certificate.createdAt
    };

    res.status(200).json({
      success: true,
      message: 'Result found successfully',
      data: {
        result: resultData
      }
    });

  } catch (error) {
    console.error('Search result error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during result search'
    });
  }
});

// @route   GET /api/results/categories
// @desc    Get available categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      {
        value: 'madrasa',
        label: 'Madrasa',
        icon: '🕌',
        description: 'Traditional Islamic education with modern approach'
      },
      {
        value: 'school',
        label: 'School',
        icon: '🏫',
        description: 'Comprehensive primary and secondary education'
      },
      {
        value: 'coaching',
        label: 'Coaching',
        icon: '📚',
        description: 'Specialized coaching and skill development'
      },
      {
        value: 'college',
        label: 'College',
        icon: '🎓',
        description: 'Higher education with diverse courses and career opportunities'
      }
    ];

    res.status(200).json({
      success: true,
      data: {
        categories
      }
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/results/stats/public
// @desc    Get public statistics
// @access  Public
router.get('/stats/public', async (req, res) => {
  try {
    // Get basic statistics
    const totalResults = await Certificate.countDocuments({ isActive: true });
    const verifiedResults = await Certificate.countDocuments({ 
      isActive: true, 
      isVerified: true 
    });

    // Get category breakdown
    const categoryStats = await Certificate.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get recent results count (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentResults = await Certificate.countDocuments({
      isActive: true,
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.status(200).json({
      success: true,
      data: {
        totalResults,
        verifiedResults,
        recentResults,
        categoryBreakdown: categoryStats,
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    console.error('Get public stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/results/recent
// @desc    Get recent results (for public display)
// @access  Public
router.get('/recent', 
  [
    query('limit')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Limit must be between 1 and 20')
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

      const limit = parseInt(req.query.limit) || 10;

      // Get recent verified results
      const recentResults = await Certificate.find({
        isActive: true,
        isVerified: true
      })
      .select('rollNumber studentName category course year grade percentage createdAt')
      .sort({ createdAt: -1 })
      .limit(limit);

      res.status(200).json({
        success: true,
        data: {
          recentResults
        }
      });

    } catch (error) {
      console.error('Get recent results error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
);

// @route   POST /api/results/verify-roll
// @desc    Verify if roll number exists (for frontend validation)
// @access  Public
router.post('/verify-roll', 
  [
    body('rollNumber')
      .trim()
      .notEmpty()
      .withMessage('Roll number is required')
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

      const { rollNumber } = req.body;

      // Check if roll number exists
      const exists = await Certificate.findOne({
        rollNumber: rollNumber.toUpperCase().trim(),
        isActive: true
      }).select('rollNumber category');

      if (exists) {
        res.status(200).json({
          success: true,
          message: 'Roll number exists',
          data: {
            exists: true,
            category: exists.category
          }
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Roll number does not exist',
          data: {
            exists: false
          }
        });
      }

    } catch (error) {
      console.error('Verify roll number error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
);

export default router;
