const admin = require('firebase-admin');
const userModel = require('../model/users'); // Assuming you have this model defined somewhere
const credentials = require('./sample-irf-firebase-adminsdk-go66e-ab6a485b45.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

const sendOTP = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  try {
    const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);

    // Generate OTP and store it in the database
    const otp = generateOTP();
    await userModel.updateOne(
      { phoneNumber },
      { $set: { otp } },
      { upsert: true }
    );

    // Send OTP to the user via SMS
    // Implement this part using Twilio or another SMS service

    res.json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP.' });
  }
};

const verifyOTP = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const otp = req.body.otp;

  try {
    const user = await userModel.findOne({ phoneNumber, otp });

    if (user) {
      const updatedUser = await admin.auth().updateUser(user.uid, { smsCode: otp });

      // Successful OTP verification
      // You can implement further authentication logic here
      res.json({ message: 'OTP verification successful.' });
    } else {
      res.status(401).json({ error: 'Invalid OTP.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error verifying OTP.' });
  }
};

module.exports = { sendOTP, verifyOTP };
