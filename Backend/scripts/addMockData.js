import mongoose from 'mongoose';
import Certificate from '../models/Certificate.js';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const mockCertificates = [
  {
    rollNumber: 'ITBU2024001',
    pdfUrl: 'https://example.com/cert1.pdf',
    fileName: 'certificate_ITBU2024001.pdf'
  },
  {
    rollNumber: 'ITBU2024002',
    pdfUrl: 'https://example.com/cert2.pdf',
    fileName: 'certificate_ITBU2024002.pdf'
  },
  {
    rollNumber: 'ITBU2024003',
    pdfUrl: 'https://example.com/cert3.pdf',
    fileName: 'certificate_ITBU2024003.pdf'
  },
  {
    rollNumber: 'ITBU2024004',
    pdfUrl: 'https://example.com/cert4.pdf',
    fileName: 'certificate_ITBU2024004.pdf'
  },
  {
    rollNumber: 'ITBU2024005',
    pdfUrl: 'https://example.com/cert5.pdf',
    fileName: 'certificate_ITBU2024005.pdf'
  }
];

const addMockData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get admin user
    const admin = await Admin.findOne({ username: 'admin' });
    if (!admin) {
      console.error('Admin user not found. Please run "npm run add-admin" first.');
      return;
    }

    // Clear existing certificates
    await Certificate.deleteMany({});
    console.log('Cleared existing certificates');

    // Add uploadedBy field to all mock certificates
    const certificatesWithAdmin = mockCertificates.map(cert => ({
      ...cert,
      uploadedBy: admin._id
    }));

    // Add mock certificates
    const certificates = await Certificate.insertMany(certificatesWithAdmin);
    console.log(`✅ Added ${certificates.length} mock certificates!`);
    
    console.log('\n📋 Mock Data Added:');
    certificates.forEach(cert => {
      console.log(`- ${cert.rollNumber}: ${cert.fileName}`);
    });

    console.log('\n🔍 You can now test with these roll numbers:');
    console.log('ITBU2024001, ITBU2024002, ITBU2024003, ITBU2024004, ITBU2024005');

  } catch (error) {
    console.error('Error adding mock data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
};

addMockData();