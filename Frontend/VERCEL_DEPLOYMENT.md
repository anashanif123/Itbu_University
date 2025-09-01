# Frontend Deployment on Vercel

## Quick Setup Guide

### 1. Environment Variables Required

Set this in your Vercel project environment variables:

```
VITE_API_BASE_URL=https://your-render-backend-service.onrender.com/api
```

Replace `your-render-backend-service` with your actual Render service name.

### 2. Vercel Project Configuration

- **Framework Preset**: `Vite`
- **Root Directory**: `Frontend`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `dist` (default)
- **Install Command**: `npm install` (default)

### 3. Build Optimization

The project is configured with:
- **Code Splitting**: Separates vendor, router, and UI libraries
- **Minification**: esbuild for optimal bundle size and fast builds
- **SPA Routing**: All routes redirect to `/index.html`
- **CORS Headers**: Configured for API requests

### 4. Important Notes

- The app is a Single Page Application (SPA)
- All routing is handled client-side
- API calls go to your Render backend
- Static assets are served from Vercel CDN

### 5. Post-Deployment

1. Test your deployment URL
2. Verify API connectivity to backend
3. Test admin login functionality
4. Ensure file uploads work correctly

### 6. File Structure

```
Frontend/
├── vercel.json          # Vercel deployment config
├── vite.config.js       # Vite build configuration
├── package.json         # Dependencies and scripts
├── src/
│   ├── pages/           # React pages/routes
│   ├── components/      # Reusable components
│   ├── services/        # API service functions
│   └── assets/          # Static assets
└── dist/                # Build output (auto-generated)
```

### 7. Custom Domain (Optional)

To use a custom domain:
1. Go to Vercel project settings
2. Add your domain
3. Configure DNS records as instructed
4. Update backend CORS if needed
