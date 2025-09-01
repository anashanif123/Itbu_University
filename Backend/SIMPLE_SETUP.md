# Simple Setup Guide

## 🚀 Quick Start

### 1. Add Admin User
```bash
npm run add-admin
```
This creates an admin with:
- **Username**: `admin`
- **Password**: `admin123`

### 2. Add Mock Data (Optional)
```bash
npm run add-mock
```
This adds 5 sample certificates for testing.

### 3. Start Backend
```bash
npm run dev
```

### 4. Start Frontend
```bash
cd ../Frontend
npm run dev
```

## 🔑 Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

## 🧪 Test Roll Numbers
- `ITBU2024001` - Ahmed Ali (Madrasa)
- `ITBU2024002` - Fatima Khan (School)
- `ITBU2024003` - Muhammad Hassan (Coaching)
- `ITBU2024004` - Aisha Rahman (College)
- `ITBU2024005` - Omar Sheikh (Madrasa)

## 📱 Test Flow
1. Go to `http://localhost:5173`
2. Test result search with any roll number above
3. Go to `/admin` and login with admin credentials
4. Upload new certificates or manage existing ones

## 🗂️ Database Structure
- **Admin**: Simple username/password only
- **Certificates**: Only roll number and PDF file

## 📝 Simple Form
- **Upload**: Just roll number + PDF file
- **Search**: Enter roll number to find certificate
- **View**: Click PDF link to view/download

That's it! Your system is ready to use. 🎉
