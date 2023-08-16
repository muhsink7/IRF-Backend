const express = require('express');
const twilioClient = require('twilio');
const admin = require('firebase-admin');
const userModel = require('../model/users');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();



const router = express.Router();

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC9d52d616166e69a9aad5bd77a996d90d";
const authToken = "d376b6bf0a102b224f6a00808ce289df";
const verifySid = "VA84bc2664455077e59e5242641e1b57cb";
const client = require("twilio")(accountSid, authToken);



function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const sendOTP = async function sendOTP(phNum) {
  const phoneNumber = phNum;
   console.log(phoneNumber);
  try {

    client.verify.v2
  .services(verifySid)
  .verifications.create({ to: phoneNumber, channel: "sms" })
  .then((verification) => console.log(verification.status))
  .catch((error) => console.log(error)); 
    // res.json({ message: 'OTP sent successfully.' });
    
  } catch (error) {
    console.error(error);
    // You should throw the error instead of sending a response here
    throw new Error('Failed to send OTP.');
  }
}

const verifyOTP = async function verifyOTP(phoneNumber, otp) {

  try {
    const user = await userModel.findOne({ phoneNumber, otp });

      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: phoneNumber, code: otp })
        .then((verification_check) => console.log(verification_check.status,"asd"))
        .catch((error) => console.log(error));
 
    // if (user) {
    //   // Authenticate the user using Firebase Authentication
    //   const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
    //   const credential = admin.auth.PhoneAuthProvider.credential(
    //     userRecord.uid,
    //     otp
    //   );
    //   const authResult = await admin.auth().signInWithCredential(credential);

    //   // Update the user's phone number in the database
    //   await userModel.updateOne(
    //     { phoneNumber },
    //     { $set: { uid: authResult.user.uid } }
    //   );

    //   res.json({ message: 'Authentication successful.' });
    // } else {
    //   res.status(401).json({ error: 'Invalid OTP.' });
    // }
  } catch (error) {
    console.error(error);
    return{ error: 'Failed to verify OTP.' }
  }
}

module.exports = { sendOTP, verifyOTP };