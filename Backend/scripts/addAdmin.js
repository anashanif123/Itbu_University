import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const addAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists with username: admin');
      return;
    }

    // Create new admin
    const admin = new Admin({
      username: 'itbu',
      password: 'pakistanit3..'
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('Username: itbu');
    console.log('Password: pakistanit3..');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

addAdmin();
