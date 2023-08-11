const express = require('express');
const admin = require('firebase-admin');
const userModel = require('../model/users');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();



const router = express.Router();

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

async function sendOTP(phNum) {
  const phoneNumber = phNum;

  try {

    //const userRecord = await admin.auth().getUserByPhoneNumber(formattedPhoneNumber);

    // Generate OTP and store it in the database
    const otp = generateOTP();
    
    // await userModel.updateOne(
    //   { phoneNumber: phNum },
    //   { $set: { otp } },
    //   { upsert: true }
    // );

    // Send OTP to the user via SMS
    // Implement this part using Twilio or another SMS service

    return 0
  } catch (error) {
    console.error(error);
    // You should throw the error instead of sending a response here
    throw new Error('Failed to send OTP.');
  }
}

async function verifyOTP(req, res) {
  const phoneNumber = req.body.phoneNumber;
  const otp = req.body.otp;

  try {
    const user = await userModel.findOne({ phoneNumber, otp });

    if (user) {
      // Authenticate the user using Firebase Authentication
      const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
      const credential = admin.auth.PhoneAuthProvider.credential(
        userRecord.uid,
        otp
      );
      const authResult = await admin.auth().signInWithCredential(credential);

      // Update the user's phone number in the database
      await userModel.updateOne(
        { phoneNumber },
        { $set: { uid: authResult.user.uid } }
      );

      res.json({ message: 'Authentication successful.' });
    } else {
      res.status(401).json({ error: 'Invalid OTP.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to verify OTP.' });
  }
}

module.exports = { sendOTP, verifyOTP };