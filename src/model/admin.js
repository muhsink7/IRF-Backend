const { Admin } = require('mongodb');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: 'admin',
    password: 'irfadmin123'
    
  // Add more fields as needed
});

const User = mongoose.model('Admin', adminSchema);

module.exports = Admin;