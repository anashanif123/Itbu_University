# ITBU University - Backend API

## 🎓 Overview
Secure, scalable, and high-performance backend API for ITBU University result management system. Built with Node.js, Express, and MongoDB.

## ✨ Features

### 🔒 Security Features
- **Enhanced Security Headers** - CSP, HSTS, XSS protection
- **Rate Limiting** - API and authentication endpoint protection
- **Input Validation & Sanitization** - XSS and injection prevention
- **JWT Authentication** - Secure token-based auth
- **File Upload Security** - Type, size, and malicious pattern validation
- **CORS Configuration** - Environment-specific origin control

### ⚡ Performance Features
- **Compression** - Gzip compression enabled
- **Efficient Middleware** - Streamlined request processing
- **Database Optimization** - MongoDB with proper indexing
- **Error Handling** - Fast and informative error responses

### 🛡️ Production Ready
- **Environment Configuration** - Secure environment management
- **Logging** - Production-safe error logging
- **Health Checks** - API health monitoring
- **Scalable Architecture** - Ready for growth

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Copy `env.example` to `.env`:
```bash
cp env.example .env
```

Configure your `.env` file:
```bash
# Cloudinary Configuration
CLOUDINARY_API_KEY=your_cloudinary_api_key_here
CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name_here

# JWT Configuration - Use a strong, random secret (32+ characters)
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/itbu_university
# For production: mongodb+srv://username:password@cluster.mongodb.net/database_name

# Server Configuration
NODE_ENV=development
PORT=5001

# Admin Default Credentials (Change these in production!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Security Configuration
BCRYPT_ROUNDS=12
SESSION_SECRET=your_session_secret_here

# CORS Configuration (for production)
FRONTEND_URL=https://www.itbu.university
```

4. **Start the server**
```bash
# Development
npm run dev

# Production
npm start
```

5. **Test the API**
```bash
curl http://localhost:5001/health
```

## 📁 Project Structure

```
Backend/
├── config/                 # Configuration files
│   └── cloudinary.js
├── middleware/             # Custom middleware
│   ├── auth.js            # Authentication middleware
│   ├── security.js        # Security middleware
│   └── upload.js          # File upload middleware
├── models/                # Database models
│   ├── Admin.js
│   └── Certificate.js
├── routes/                # API routes
│   ├── auth.js           # Authentication routes
│   ├── certificates.js   # Certificate management
│   └── results.js        # Result search
├── scripts/              # Utility scripts
│   ├── addAdmin.js
│   ├── addMockData.js
│   └── setup.js
├── utils/                # Utility functions
│   └── seedDatabase.js
├── uploads/              # File uploads directory
├── server.js             # Main server file
├── package.json
└── README.md
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start with nodemon
npm start           # Start production server

# Database
npm run setup       # Initial database setup
npm run seed        # Seed database with sample data
npm run add-admin   # Add admin user

# Utilities
npm run add-mock    # Add mock data
```

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/login          # Admin login
POST /api/auth/register       # Register new admin (super admin only)
GET  /api/auth/me            # Get current admin profile
PUT  /api/auth/profile       # Update admin profile
POST /api/auth/change-password # Change password
POST /api/auth/logout        # Admin logout
```

### Results
```
GET  /api/results/search     # Search result by roll number
GET  /api/results/categories # Get available categories
GET  /api/results/stats/public # Get public statistics
GET  /api/results/recent     # Get recent results
POST /api/results/verify-roll # Verify roll number exists
```

### Certificates
```
POST   /api/certificates/upload    # Upload certificate
GET    /api/certificates          # Get all certificates
GET    /api/certificates/:id      # Get single certificate
PUT    /api/certificates/:id      # Update certificate
DELETE /api/certificates/:id      # Delete certificate
POST   /api/certificates/:id/verify # Verify certificate
GET    /api/certificates/stats/overview # Get statistics
```

### Health Check
```
GET /health                     # API health status
```

## 🔒 Security Configuration

### Rate Limiting
- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per IP
- **Health Check**: Excluded from rate limiting

### Security Headers
- **Helmet.js**: Comprehensive security headers
- **CSP**: Content Security Policy
- **HSTS**: HTTP Strict Transport Security
- **X-Frame-Options**: DENY
- **X-XSS-Protection**: Enabled

### Input Validation
- **Express-validator**: Server-side validation
- **Input Sanitization**: XSS prevention
- **File Upload Validation**: Type, size, malicious patterns

## 🗄️ Database Models

### Admin Model
```javascript
{
  username: String (required, unique)
  email: String (required, unique)
  password: String (required, hashed)
  role: String (admin, super_admin)
  createdAt: Date
  updatedAt: Date
}
```

### Certificate Model
```javascript
{
  rollNumber: String (required, unique)
  fileName: String
  pdfUrl: String (Cloudinary URL)
  uploadedBy: ObjectId (Admin reference)
  createdAt: Date
  updatedAt: Date
}
```

## 🚀 Deployment

### Render.com (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Configure build settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Deploy

### Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

### VPS/Server
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name "itbu-backend"

# Save PM2 configuration
pm2 save
pm2 startup
```

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment | Yes | `development` |
| `PORT` | Server port | No | `5001` |
| `MONGODB_URI` | Database URL | Yes | - |
| `JWT_SECRET` | JWT secret key | Yes | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes | - |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | - |
| `ADMIN_USERNAME` | Default admin username | No | `admin` |
| `ADMIN_PASSWORD` | Default admin password | No | `admin123` |
| `BCRYPT_ROUNDS` | Bcrypt rounds | No | `12` |
| `FRONTEND_URL` | Frontend URL for CORS | No | - |

## 🛡️ Security Checklist

### Pre-Deployment
- [ ] Strong JWT secret (32+ characters)
- [ ] Secure database credentials
- [ ] CORS origins configured
- [ ] Rate limiting enabled
- [ ] Security headers active
- [ ] File upload validation working
- [ ] Input sanitization active
- [ ] Error handling production-safe

### Post-Deployment
- [ ] HTTPS enabled
- [ ] Security headers present
- [ ] Rate limiting functioning
- [ ] Authentication flow secure
- [ ] File uploads validated
- [ ] Monitoring active

## 📊 Monitoring

### Health Check
```bash
curl https://your-api-domain.com/health
```

### Logs to Monitor
- Authentication failures
- Rate limit violations
- File upload attempts
- Database errors
- API errors

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MongoDB URI
   - Verify database credentials
   - Ensure database is accessible

2. **CORS Error**
   - Check CORS configuration
   - Verify frontend URL in allowed origins
   - Ensure HTTPS in production

3. **File Upload Issues**
   - Check Cloudinary configuration
   - Verify file size limits
   - Check file type validation

4. **Authentication Issues**
   - Verify JWT secret
   - Check token expiration
   - Ensure proper headers

### Development Tips
- Use Postman for API testing
- Check server logs for errors
- Verify environment variables
- Test all endpoints

## 📈 Performance

### Optimization Features
- **Compression**: Gzip compression
- **Database Indexing**: Optimized queries
- **Caching**: Efficient data caching
- **Rate Limiting**: Prevents abuse

### Monitoring
- **Health Checks**: API status monitoring
- **Error Logging**: Comprehensive error tracking
- **Performance Metrics**: Response time monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- **Email**: support@itbu.edu
- **Documentation**: Check the docs folder
- **Issues**: Create a GitHub issue

---

**Built with ❤️ for ITBU University**

*Last updated: December 2024*