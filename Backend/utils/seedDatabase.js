import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import Certificate from '../models/Certificate.js';
import dotenv from 'dotenv';

dotenv.config();

// Sample admin data
const sampleAdmins = [
  {
    username: 'admin',
    email: 'admin@itbu.edu',
    password: 'admin123',
    role: 'super_admin'
  },
  {
    username: 'manager',
    email: 'manager@itbu.edu',
    password: 'manager123',
    role: 'admin'
  }
];

// Sample certificate data
const sampleCertificates = [
  {
    rollNumber: 'ITBU2024001',
    category: 'madrasa',
    studentName: 'Ahmed Hassan',
    course: 'Islamic Studies - Advanced Level',
    year: 2024,
    semester: 'Final',
    grade: 'A+',
    percentage: 95.5,
    pdfUrl: 'https://res.cloudinary.com/demo/sample.pdf',
    fileName: 'ahmed_hassan_certificate.pdf',
    fileSize: 1024000,
    isVerified: true,
    remarks: 'Excellent performance in Islamic studies'
  },
  {
    rollNumber: 'ITBU2024002',
    category: 'school',
    studentName: 'Fatima Ali',
    course: 'Secondary School Certificate',
    year: 2024,
    semester: 'Annual',
    grade: 'A',
    percentage: 88.5,
    pdfUrl: 'https://res.cloudinary.com/demo/sample.pdf',
    fileName: 'fatima_ali_certificate.pdf',
    fileSize: 980000,
    isVerified: true,
    remarks: 'Outstanding academic performance'
  },
  {
    rollNumber: 'ITBU2024003',
    category: 'coaching',
    studentName: 'Muhammad Khan',
    course: 'Professional Development Program',
    year: 2024,
    semester: 'Intensive',
    grade: 'B+',
    percentage: 82.0,
    pdfUrl: 'https://res.cloudinary.com/demo/sample.pdf',
    fileName: 'muhammad_khan_certificate.pdf',
    fileSize: 1100000,
    isVerified: false,
    remarks: 'Good progress in professional skills'
  },
  {
    rollNumber: 'ITBU2024004',
    category: 'college',
    studentName: 'Aisha Rahman',
    course: 'Bachelor of Business Administration',
    year: 2024,
    semester: '8th Semester',
    grade: 'A-',
    percentage: 90.2,
    pdfUrl: 'https://res.cloudinary.com/demo/sample.pdf',
    fileName: 'aisha_rahman_certificate.pdf',
    fileSize: 1200000,
    isVerified: true,
    remarks: 'Excellent leadership and academic skills'
  },
  {
    rollNumber: 'ITBU2024005',
    category: 'madrasa',
    studentName: 'Omar Abdullah',
    course: 'Quranic Studies - Memorization',
    year: 2024,
    semester: 'Complete',
    grade: 'A+',
    percentage: 98.0,
    pdfUrl: 'https://res.cloudinary.com/demo/sample.pdf',
    fileName: 'omar_abdullah_certificate.pdf',
    fileSize: 950000,
    isVerified: true,
    remarks: 'Perfect memorization of the Holy Quran'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/itbu_university');
    console.log('Connected to database');

    // Clear existing data
    await Admin.deleteMany({});
    await Certificate.deleteMany({});
    console.log('Cleared existing data');

    // Create admins
    const createdAdmins = [];
    for (const adminData of sampleAdmins) {
      const admin = new Admin(adminData);
      await admin.save();
      createdAdmins.push(admin);
      console.log(`Created admin: ${admin.username}`);
    }

    // Create certificates
    for (const certData of sampleCertificates) {
      const certificate = new Certificate({
        ...certData,
        uploadedBy: createdAdmins[0]._id, // Assign to first admin
        verifiedBy: certData.isVerified ? createdAdmins[0]._id : null,
        verifiedAt: certData.isVerified ? new Date() : null
      });
      await certificate.save();
      console.log(`Created certificate: ${certificate.rollNumber}`);
    }

    console.log('Database seeded successfully!');
    console.log('\nSample Admin Credentials:');
    console.log('Username: admin, Password: admin123');
    console.log('Username: manager, Password: manager123');
    console.log('\nSample Roll Numbers for testing:');
    sampleCertificates.forEach(cert => {
      console.log(`- ${cert.rollNumber} (${cert.category})`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
};

// Run seeder if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;
