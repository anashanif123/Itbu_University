import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import certificateRoutes from './routes/certificates.js';
import resultRoutes from './routes/results.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ---------------- Security Middleware ----------------
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Allow PDFs, images, etc.
  })
);
app.use(compression());

// ---------------- Rate Limiting ----------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
});

// Only apply rate limiting to API routes (not health check)
app.use('/api', limiter);

// ---------------- CORS Configuration ----------------
const allowedOrigins =
  NODE_ENV === 'production'
    ? [
        'https://itbu-university.vercel.app',
        'https://your-custom-domain.com', // add custom domain here if needed
      ]
    : ['http://localhost:3000', 'http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    },
    credentials: true,
  })
);

// ---------------- Body Parsers ----------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ---------------- Health Check ----------------
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'ITBU University Backend API is running',
    timestamp: new Date().toISOString(),
  });
});

// ---------------- API Routes ----------------
app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/results', resultRoutes);

// ---------------- 404 Handler ----------------
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  });
});

// ---------------- Global Error Handler ----------------
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const isProd = NODE_ENV === 'production';

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: isProd
      ? 'Something went wrong, please try again later.'
      : err.message || 'Internal Server Error',
  });
});

// ---------------- Database Connection ----------------
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI ||
        'mongodb://localhost:27017/itbu_university'
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

// ---------------- Start Server ----------------
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  });
};

startServer().catch(console.error);

export default app;
