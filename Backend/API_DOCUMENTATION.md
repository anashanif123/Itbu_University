# ITBU University Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most admin endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Login
**POST** `/auth/login`

Login with admin credentials.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "username": "admin",
      "email": "admin@itbu.edu",
      "role": "super_admin",
      "lastLogin": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### Get Profile
**GET** `/auth/me`

Get current admin profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "admin": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "username": "admin",
      "email": "admin@itbu.edu",
      "role": "super_admin",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

## Certificate Management Endpoints

### Upload Certificate
**POST** `/certificates/upload`

Upload a new student certificate.

**Headers:** `Authorization: Bearer <token>`

**Request (multipart/form-data):**
- `certificate`: PDF file
- `rollNumber`: Student roll number
- `category`: Certificate category (madrasa/school/coaching/college)
- `studentName`: Student's full name
- `course`: Course name
- `year`: Academic year
- `semester`: Semester (optional)
- `grade`: Grade (optional)
- `percentage`: Percentage (optional)
- `remarks`: Remarks (optional)

**Response:**
```json
{
  "success": true,
  "message": "Certificate uploaded successfully",
  "data": {
    "certificate": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "rollNumber": "ITBU2024006",
      "category": "madrasa",
      "studentName": "John Doe",
      "course": "Islamic Studies",
      "year": 2024,
      "pdfUrl": "https://res.cloudinary.com/...",
      "fileName": "certificate.pdf",
      "isVerified": false,
      "uploadedBy": "64f1a2b3c4d5e6f7g8h9i0j1",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### Get All Certificates
**GET** `/certificates`

Get all certificates with pagination and filtering.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `category`: Filter by category
- `year`: Filter by year
- `search`: Search in roll number, student name, or course

**Example:** `/certificates?page=1&limit=10&category=madrasa&search=ITBU`

**Response:**
```json
{
  "success": true,
  "data": {
    "certificates": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
        "rollNumber": "ITBU2024001",
        "category": "madrasa",
        "studentName": "Ahmed Hassan",
        "course": "Islamic Studies",
        "year": 2024,
        "grade": "A+",
        "percentage": 95.5,
        "isVerified": true,
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCertificates": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### Get Single Certificate
**GET** `/certificates/:id`

Get a specific certificate by ID.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "certificate": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "rollNumber": "ITBU2024001",
      "category": "madrasa",
      "studentName": "Ahmed Hassan",
      "course": "Islamic Studies - Advanced Level",
      "year": 2024,
      "semester": "Final",
      "grade": "A+",
      "percentage": 95.5,
      "pdfUrl": "https://res.cloudinary.com/...",
      "fileName": "ahmed_hassan_certificate.pdf",
      "isVerified": true,
      "verifiedAt": "2024-01-15T10:30:00.000Z",
      "uploadedBy": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "username": "admin",
        "email": "admin@itbu.edu"
      },
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### Update Certificate
**PUT** `/certificates/:id`

Update certificate information.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "studentName": "Ahmed Hassan Updated",
  "grade": "A++",
  "percentage": 98.0,
  "remarks": "Updated remarks"
}
```

### Delete Certificate
**DELETE** `/certificates/:id`

Soft delete a certificate.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Certificate deleted successfully"
}
```

### Verify Certificate
**POST** `/certificates/:id/verify`

Mark a certificate as verified.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Certificate verified successfully",
  "data": {
    "certificate": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "isVerified": true,
      "verifiedBy": "64f1a2b3c4d5e6f7g8h9i0j1",
      "verifiedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

## Result Search Endpoints (Public)

### Search Result by Roll Number
**GET** `/results/search`

Search for a student's result by roll number.

**Query Parameters:**
- `rollNumber`: Student roll number (required)

**Example:** `/results/search?rollNumber=ITBU2024001`

**Response:**
```json
{
  "success": true,
  "message": "Result found successfully",
  "data": {
    "result": {
      "rollNumber": "ITBU2024001",
      "studentName": "Ahmed Hassan",
      "category": "madrasa",
      "categoryDisplay": "Madrasa",
      "course": "Islamic Studies - Advanced Level",
      "year": 2024,
      "semester": "Final",
      "grade": "A+",
      "percentage": 95.5,
      "pdfUrl": "https://res.cloudinary.com/...",
      "fileName": "ahmed_hassan_certificate.pdf",
      "isVerified": true,
      "verifiedAt": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### Alternative Search Endpoint
**GET** `/results/search/:rollNumber`

Alternative endpoint for searching results.

**Example:** `/results/search/ITBU2024001`

### Get Available Categories
**GET** `/results/categories`

Get all available certificate categories.

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "value": "madrasa",
        "label": "Madrasa",
        "icon": "🕌",
        "description": "Traditional Islamic education with modern approach"
      },
      {
        "value": "school",
        "label": "School",
        "icon": "🏫",
        "description": "Comprehensive primary and secondary education"
      },
      {
        "value": "coaching",
        "label": "Coaching",
        "icon": "📚",
        "description": "Specialized coaching and skill development"
      },
      {
        "value": "college",
        "label": "College",
        "icon": "🎓",
        "description": "Higher education with diverse courses and career opportunities"
      }
    ]
  }
}
```

### Get Public Statistics
**GET** `/results/stats/public`

Get public statistics about certificates.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalResults": 150,
    "verifiedResults": 120,
    "recentResults": 25,
    "categoryBreakdown": [
      { "_id": "madrasa", "count": 50 },
      { "_id": "school", "count": 40 },
      { "_id": "coaching", "count": 35 },
      { "_id": "college", "count": 25 }
    ],
    "lastUpdated": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get Recent Results
**GET** `/results/recent`

Get recently added verified results.

**Query Parameters:**
- `limit`: Number of results to return (default: 10, max: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "recentResults": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
        "rollNumber": "ITBU2024001",
        "studentName": "Ahmed Hassan",
        "category": "madrasa",
        "course": "Islamic Studies",
        "year": 2024,
        "grade": "A+",
        "percentage": 95.5,
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "rollNumber",
      "message": "Roll number is required"
    }
  ]
}
```

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

---

## Rate Limiting

The API implements rate limiting:
- **Limit**: 100 requests per 15 minutes per IP
- **Response**: 429 Too Many Requests when limit exceeded

## File Upload Limits

- **File Type**: PDF only
- **File Size**: Maximum 10MB
- **Storage**: Cloudinary cloud storage

## Sample Data

After running the database seeder, you can test with these sample roll numbers:
- `ITBU2024001` (Madrasa)
- `ITBU2024002` (School)
- `ITBU2024003` (Coaching)
- `ITBU2024004` (College)
- `ITBU2024005` (Madrasa)
