# ITBU University Backend API

A comprehensive backend API for ITBU University's result management system, built with Node.js, Express, and MongoDB.

## Features

- 🔐 **Admin Authentication**: Secure JWT-based authentication system
- 📄 **Certificate Management**: Upload, view, update, and delete student certificates
- 🔍 **Result Search**: Public API for students to search their results
- 📁 **File Upload**: Cloudinary integration for PDF certificate storage
- 🛡️ **Security**: Rate limiting, CORS, helmet, and input validation
- 📊 **Statistics**: Comprehensive analytics and reporting
- 🗄️ **Database**: MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Installation

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
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/itbu_university
   JWT_SECRET=your_super_secret_jwt_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

4. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in your `.env` file

5. **Cloudinary Setup** (Optional for file uploads)
   - Create a Cloudinary account
   - Get your cloud name, API key, and API secret
   - Update the Cloudinary credentials in your `.env` file

6. **Seed Database** (Optional)
   ```bash
   node utils/seedDatabase.js
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /login` - Admin login
- `POST /register` - Register new admin (super admin only)
- `GET /me` - Get current admin profile
- `PUT /profile` - Update admin profile
- `POST /change-password` - Change password
- `POST /logout` - Admin logout

### Certificate Routes (`/api/certificates`)
- `POST /upload` - Upload new certificate
- `GET /` - Get all certificates (with pagination and filtering)
- `GET /:id` - Get single certificate
- `PUT /:id` - Update certificate
- `DELETE /:id` - Delete certificate (soft delete)
- `POST /:id/verify` - Verify certificate
- `GET /stats/overview` - Get certificate statistics

### Result Routes (`/api/results`)
- `GET /search?rollNumber=ROLL123` - Search result by roll number
- `GET /search/:rollNumber` - Alternative search endpoint
- `GET /categories` - Get available categories
- `GET /stats/public` - Get public statistics
- `GET /recent` - Get recent results
- `POST /verify-roll` - Verify if roll number exists

### Health Check
- `GET /health` - Server health status

## API Usage Examples

### Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Search Result
```bash
curl -X GET "http://localhost:5000/api/results/search?rollNumber=ITBU2024001"
```

### Upload Certificate (with authentication)
```bash
curl -X POST http://localhost:5000/api/certificates/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "certificate=@certificate.pdf" \
  -F "rollNumber=ITBU2024006" \
  -F "category=madrasa" \
  -F "studentName=John Doe" \
  -F "course=Islamic Studies" \
  -F "year=2024"
```

## Database Models

### Admin Model
- `username`: Unique admin username
- `email`: Admin email address
- `password`: Hashed password
- `role`: Admin role (admin/super_admin)
- `isActive`: Account status
- `lastLogin`: Last login timestamp

### Certificate Model
- `rollNumber`: Unique student roll number
- `category`: Certificate category (madrasa/school/coaching/college)
- `studentName`: Student's full name
- `course`: Course name
- `year`: Academic year
- `semester`: Semester information
- `grade`: Student grade
- `percentage`: Student percentage
- `pdfUrl`: Cloudinary URL for certificate PDF
- `fileName`: Original file name
- `isVerified`: Verification status
- `uploadedBy`: Admin who uploaded the certificate

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Comprehensive request validation
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **File Upload Security**: PDF-only uploads with size limits

## Error Handling

The API includes comprehensive error handling:
- Validation errors with detailed messages
- Authentication and authorization errors
- Database connection errors
- File upload errors
- Custom error responses with appropriate HTTP status codes

## Development

### Project Structure
```
Backend/
├── config/
│   └── cloudinary.js
├── middleware/
│   ├── auth.js
│   └── upload.js
├── models/
│   ├── Admin.js
│   └── Certificate.js
├── routes/
│   ├── auth.js
│   ├── certificates.js
│   └── results.js
├── utils/
│   └── seedDatabase.js
├── uploads/
├── server.js
├── package.json
└── README.md
```

### Adding New Features

1. Create new models in `models/` directory
2. Add routes in `routes/` directory
3. Update middleware as needed
4. Test endpoints thoroughly
5. Update documentation

## Deployment

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET`
- Configure production MongoDB URI
- Set up Cloudinary credentials
- Configure CORS origins for your frontend domain

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
