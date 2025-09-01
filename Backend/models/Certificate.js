import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  pdfUrl: {
    type: String,
    required: [true, 'PDF URL is required']
  },
  fileName: {
    type: String,
    required: [true, 'File name is required'],
    trim: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Index for better search performance (rollNumber already indexed by unique:true)

// Static method to search certificates
certificateSchema.statics.searchByRollNumber = function(rollNumber) {
  return this.findOne({ 
    rollNumber: rollNumber.toUpperCase().trim()
  }).populate('uploadedBy', 'username');
};

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;