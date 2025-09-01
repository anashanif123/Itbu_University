# 🚀 Deployment Checklist

## Pre-Deployment Setup

### ☐ Database & Services Setup

- [ ] **MongoDB Atlas Account**
  - [ ] Create cluster (free M0 tier available)
  - [ ] Create database user with read/write permissions
  - [ ] Whitelist all IPs (`0.0.0.0/0`) for Render access
  - [ ] Get connection string

- [ ] **Cloudinary Account**
  - [ ] Sign up at cloudinary.com
  - [ ] Get Cloud Name, API Key, and API Secret from dashboard

### ☐ Repository Preparation

- [ ] **Backend Repository**
  - [ ] Push backend code to GitHub
  - [ ] Ensure `render.yaml` is in Backend directory
  - [ ] Verify `package.json` has correct start script

- [ ] **Frontend Repository**
  - [ ] Push frontend code to GitHub (can be same repo)
  - [ ] Ensure `vercel.json` is in Frontend directory
  - [ ] Verify build configuration in `vite.config.js`

## 🗄️ Backend Deployment (Render)

### ☐ Render Service Creation

- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Create new Web Service
- [ ] Set root directory to `Backend`
- [ ] Configure build and start commands

### ☐ Environment Variables

Copy these exactly to Render environment variables:

```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=create_a_secure_32_character_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_USERNAME=your_chosen_admin_username
ADMIN_PASSWORD=your_secure_admin_password
```

### ☐ Backend Verification

- [ ] Service deployed successfully
- [ ] Note your Render service URL: `https://______.onrender.com`
- [ ] Test health endpoint: `/health`
- [ ] Check logs for any errors

## 🌐 Frontend Deployment (Vercel)

### ☐ Vercel Project Creation

- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Set root directory to `Frontend`
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`

### ☐ Environment Variables

Set this in Vercel project settings:

```
VITE_API_BASE_URL=https://your-render-service-url.onrender.com/api
```

Replace with your actual Render URL from backend deployment.

### ☐ Frontend Verification

- [ ] Project deployed successfully
- [ ] Note your Vercel URL: `https://______.vercel.app`
- [ ] Test homepage loads
- [ ] Test API connectivity (try searching for results)

## ✅ Post-Deployment Testing

### ☐ Full Application Test

- [ ] **Homepage**: Loads without errors
- [ ] **Search Functionality**: Can search for results
- [ ] **Admin Login**: Can access `/admin` and login
- [ ] **File Upload**: Admin can upload certificates
- [ ] **API Health**: Backend health endpoint responds
- [ ] **Database**: Data persists between requests

### ☐ Performance & Security

- [ ] **HTTPS**: Both frontend and backend use HTTPS
- [ ] **CORS**: No CORS errors in browser console
- [ ] **Mobile**: Site works on mobile devices
- [ ] **Loading Speed**: Acceptable load times

## 🔧 Troubleshooting Checklist

### ☐ Common Issues

If something isn't working:

- [ ] **Check Environment Variables**
  - Verify all required variables are set
  - No typos in variable names
  - Values don't contain extra spaces

- [ ] **Check Logs**
  - Render: Service logs in dashboard
  - Vercel: Function logs and build logs
  - Browser: Developer console for errors

- [ ] **Network Issues**
  - Test API endpoints directly
  - Check CORS configuration
  - Verify database connectivity

- [ ] **Database Issues**
  - MongoDB Atlas IP whitelist includes `0.0.0.0/0`
  - Database user has correct permissions
  - Connection string is correct

## 📋 Final Steps

### ☐ Documentation

- [ ] Save deployment URLs
- [ ] Document admin credentials securely
- [ ] Share access with team members

### ☐ Monitoring Setup

- [ ] Set up Render service monitoring
- [ ] Enable Vercel analytics (optional)
- [ ] Set up uptime monitoring (optional)

## 🎉 Deployment Complete!

When all items are checked:

- **Frontend URL**: `https://______.vercel.app`
- **Backend URL**: `https://______.onrender.com`
- **Admin Panel**: `https://______.vercel.app/admin`

Your ITBU University application is now live! 🚀

---

## 📞 Need Help?

If you encounter issues:
1. Check this checklist again
2. Review deployment logs
3. Test individual components
4. Refer to `DEPLOYMENT_GUIDE.md` for detailed instructions
