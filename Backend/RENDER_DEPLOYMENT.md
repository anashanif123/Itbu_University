# Backend Deployment on Render

## Quick Setup Guide

### 1. Environment Variables Required

Set these in your Render service environment variables:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_admin_password
```

### 2. Render Service Configuration

- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: `Node`
- **Root Directory**: `Backend`
- **Health Check Path**: `/health`

### 3. Important Notes

- The service will automatically handle CORS for Vercel domains
- Health check endpoint is available at `/health`
- Admin setup runs automatically on first start
- File uploads are handled via Cloudinary

### 4. Post-Deployment

1. Test health endpoint: `https://your-service.onrender.com/health`
2. Note your service URL for frontend configuration
3. Admin panel will be available via frontend deployment

### 5. File Structure

```
Backend/
├── render.yaml          # Render deployment config
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
├── routes/              # API routes
├── models/              # Database models
├── middleware/          # Authentication & upload middleware
└── uploads/             # Local upload directory (not used in production)
```
