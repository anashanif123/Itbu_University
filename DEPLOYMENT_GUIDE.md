# ITBU University - Deployment Guide

This guide will help you deploy the ITBU University application with the backend on Render and the frontend on Vercel.

## 🚀 Quick Overview

- **Backend**: Deploy on Render (Node.js service)
- **Frontend**: Deploy on Vercel (React/Vite application)
- **Database**: MongoDB Atlas (cloud database)
- **File Storage**: Cloudinary (image/document hosting)

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Account** - Both services deploy from Git repositories
2. **MongoDB Atlas Account** - For production database
3. **Cloudinary Account** - For file storage
4. **Render Account** - For backend hosting
5. **Vercel Account** - For frontend hosting

## 🗃️ Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. Push your backend code to a GitHub repository
2. Ensure the `render.yaml` file is in your Backend directory

### Step 2: Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist all IP addresses (`0.0.0.0/0`) for Render
5. Get your connection string (it should look like: `mongodb+srv://username:password@cluster.mongodb.net/database_name`)

### Step 3: Set Up Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up/login and get your credentials:
   - Cloud Name
   - API Key
   - API Secret

### Step 4: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `itbu-university-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 5: Set Environment Variables

In your Render service settings, add these environment variables:

```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secure_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_admin_password
```

**Important Security Notes:**
- Use a strong, unique JWT_SECRET (at least 32 characters)
- Use a secure admin password
- Never commit these values to your repository

### Step 6: Deploy and Verify

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Your backend URL will be: `https://your-service-name.onrender.com`
4. Test the health endpoint: `https://your-service-name.onrender.com/health`

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Ensure your frontend code is in a GitHub repository
2. Note your Render backend URL from the previous step

### Step 2: Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Set Environment Variables

In Vercel project settings, add this environment variable:

```
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api
```

Replace `your-render-backend-url` with your actual Render service URL.

### Step 4: Deploy and Configure

1. Click "Deploy"
2. After deployment, your frontend URL will be: `https://your-project-name.vercel.app`
3. Update your backend CORS settings if needed (the current config should work)

## 🔧 Post-Deployment Configuration

### Update Backend CORS (if needed)

If you're using a custom domain or different Vercel URL, update the CORS configuration in `Backend/server.js`:

```javascript
origin: process.env.NODE_ENV === 'production'
  ? [
      'https://your-actual-vercel-domain.vercel.app',
      /\.vercel\.app$/
    ]
  : [
      'http://localhost:3000',
      'http://localhost:5173'
    ],
```

### Initialize Admin Account

After deployment, you'll need to create the admin account:

1. The backend includes a setup script that runs automatically
2. Use the admin credentials you set in environment variables
3. Access the admin panel at: `https://your-vercel-app.vercel.app/admin`

## 🧪 Testing Your Deployment

### Test Backend API

```bash
# Health check
curl https://your-render-backend.onrender.com/health

# Test API endpoint
curl https://your-render-backend.onrender.com/api/results/categories
```

### Test Frontend

1. Visit your Vercel URL
2. Try searching for results
3. Test admin login functionality
4. Upload a certificate (admin required)

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check your backend CORS configuration
   - Ensure frontend environment variable is correct

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has proper permissions

3. **File Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits

4. **Environment Variables Not Working**
   - Ensure variables are set in the correct deployment platform
   - Variables need to be redeployed on Vercel after changes
   - Render automatically restarts with new environment variables

### Logs and Debugging

- **Render**: Check logs in your service dashboard
- **Vercel**: Check function logs and build logs
- **Browser**: Use developer tools to check network requests

## 🔄 Updating Your Application

### Backend Updates

1. Push changes to your GitHub repository
2. Render will automatically redeploy from the connected branch

### Frontend Updates

1. Push changes to your GitHub repository
2. Vercel will automatically redeploy from the connected branch

## 📊 Monitoring

### Render Monitoring

- Use Render's built-in metrics
- Set up alerts for downtime
- Monitor resource usage

### Vercel Monitoring

- Use Vercel Analytics
- Monitor Core Web Vitals
- Check function execution times

## 💰 Cost Considerations

### Free Tier Limits

- **Render**: 750 hours/month, sleeps after 15 minutes of inactivity
- **Vercel**: 100GB bandwidth, 100GB-hours build time
- **MongoDB Atlas**: 512MB storage, M0 cluster
- **Cloudinary**: 25 monthly credits, 25GB monthly bandwidth

### Production Recommendations

For production use, consider upgrading to paid plans for:
- Better performance
- No sleep mode
- Increased limits
- Professional support

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit secrets to repository
2. **HTTPS**: Both platforms provide HTTPS by default
3. **CORS**: Keep CORS settings restrictive
4. **JWT Secret**: Use a strong, unique secret
5. **Admin Credentials**: Use strong passwords
6. **Database**: Use MongoDB Atlas security features
7. **File Uploads**: Validate file types and sizes

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review deployment logs
3. Verify all environment variables
4. Test API endpoints individually
5. Check CORS and network connectivity

Good luck with your deployment! 🚀
