#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 ITBU University Backend Setup');
console.log('================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from env.example');
    console.log('📝 Please update the .env file with your configuration\n');
  } else {
    console.log('❌ env.example file not found');
    process.exit(1);
  }
} else {
  console.log('✅ .env file already exists\n');
}

// Create uploads directory
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
} else {
  console.log('✅ uploads directory already exists');
}

// Check package.json
const packagePath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packagePath)) {
  console.log('✅ package.json found');
} else {
  console.log('❌ package.json not found');
  process.exit(1);
}

console.log('\n📋 Next Steps:');
console.log('1. Update .env file with your configuration');
console.log('2. Install dependencies: npm install');
console.log('3. Start MongoDB service');
console.log('4. Run the application: npm run dev');
console.log('5. (Optional) Seed database: node utils/seedDatabase.js');

console.log('\n🔗 Default Admin Credentials (after seeding):');
console.log('Username: admin');
console.log('Password: admin123');

console.log('\n📚 API Documentation:');
console.log('- Health Check: GET http://localhost:5000/health');
console.log('- Admin Login: POST http://localhost:5000/api/auth/login');
console.log('- Search Result: GET http://localhost:5000/api/results/search?rollNumber=ITBU2024001');

console.log('\n✨ Setup completed successfully!');
