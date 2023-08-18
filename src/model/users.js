const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  balanceAmount: {
    type: Number,
    default: 0,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  bankName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  ifscCode: {
    type: String,
  },
  upiId: {
    type: String,
  },
  kycStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  kycAdharCardNumber: {
    type: String,
  },
  kycPancardNumber: {
    type: String,
  },
  kycPancardFront: {
    type: String,
  },
  kycAdharFront: {
    type: String,
  },
  kycAdharBack: {
    type: String,
  },
});

userSchema.statics.updateDetails = async function(userId, updateData) {
  try {
    const updatedUser = await this.findOneAndUpdate({ userId }, updateData, { new: true });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;