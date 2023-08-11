const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
    otpExpiry: {
        type: Date,
        required: true,
    },
    
  // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;