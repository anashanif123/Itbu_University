# ITBU University - Frontend

## 🎓 Overview
Modern, secure, and responsive frontend for ITBU University result management system. Built with React, Vite, and Tailwind CSS.

## ✨ Features

### 🔒 Security Features
- **Input Sanitization** - XSS protection
- **Rate Limiting** - Login attempt limiting (5 attempts per 15 minutes)
- **Secure Storage** - Safe localStorage operations
- **Error Boundaries** - Graceful error handling
- **Environment-based Logging** - Production-safe logging

### ⚡ Performance Features
- **Lazy Loading** - Components load only when needed
- **Code Splitting** - Optimized bundle size
- **Suspense Boundaries** - Better loading states
- **Optimized Imports** - Reduced bundle size

### 🎨 UI/UX Features
- **Responsive Design** - Works on all devices
- **Modern UI** - Beautiful and intuitive interface
- **Loading States** - Smooth user experience
- **Error Handling** - User-friendly error messages
- **Animations** - Smooth transitions with Framer Motion

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create `.env` file in the root directory:
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:5001/api

# Environment
VITE_NODE_ENV=development

# App Information
VITE_APP_NAME=ITBU University
VITE_APP_VERSION=1.0.0
```

4. **Start Development Server**
```bash
npm run dev
```

5. **Open in Browser**
```
http://localhost:5173
```

## 📁 Project Structure

```
Frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SectionHeading.jsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Landing.jsx
│   │   ├── ResultPage.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/          # API services
│   │   └── api.js
│   ├── config/            # Configuration files
│   │   └── security.js
│   ├── assets/            # Images and icons
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Production
npm run build        # Create optimized build
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5001/api` |
| `VITE_NODE_ENV` | Environment | `development` |
| `VITE_APP_NAME` | Application name | `ITBU University` |
| `VITE_APP_VERSION` | App version | `1.0.0` |

### Security Configuration

The app includes comprehensive security features:

- **Input Sanitization**: All user inputs are sanitized
- **Rate Limiting**: Login attempts are limited
- **Secure Storage**: Safe localStorage operations
- **Error Boundaries**: Graceful error handling

## 📱 Pages

### 1. Landing Page (`/`)
- Hero section with university information
- Course sections (Madrasa, School, Coaching, College)
- Features and statistics
- Call-to-action buttons

### 2. Result Page (`/result`)
- Student result search
- Roll number input
- PDF certificate display
- Mobile-friendly interface

### 3. Admin Login (`/admin`)
- Secure admin authentication
- Rate limiting protection
- User-friendly error messages
- Security notices

### 4. Admin Dashboard (`/dashboard`)
- Certificate upload functionality
- Certificate management
- File validation
- Responsive design

## 🎨 Styling

### Tailwind CSS
- Utility-first CSS framework
- Responsive design
- Custom color scheme
- Component-based styling

### Framer Motion
- Smooth animations
- Page transitions
- Interactive elements
- Performance optimized

## 🔒 Security Features

### Input Validation
```javascript
// All inputs are sanitized
const sanitizedInput = sanitizeInput(userInput);
```

### Rate Limiting
```javascript
// Login attempts are limited
if (!rateLimiter.canAttempt('login_' + username)) {
  setMessage("Too many login attempts. Please try again later.");
  return;
}
```

### Secure Storage
```javascript
// Safe localStorage operations
secureStorage.setItem('authToken', token);
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set environment variables

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your server
```

## 🔧 Troubleshooting

### Common Issues

1. **CORS Error**
   - Check if backend CORS is configured for your domain
   - Verify API_BASE_URL is correct

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check for TypeScript errors

3. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names (must start with VITE_)

### Development Tips

- Use browser dev tools for debugging
- Check console for error messages
- Verify API endpoints are working
- Test on different screen sizes

## 📊 Performance

### Optimization Features
- **Lazy Loading**: Components load on demand
- **Code Splitting**: Smaller bundle sizes
- **Image Optimization**: Optimized assets
- **Caching**: Efficient resource caching

### Bundle Analysis
```bash
npm run build
# Check dist/ folder for optimized files
```

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