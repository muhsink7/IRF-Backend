const express = require('express');
const { sendOTP } = require('../controllers/login');
const userRouter = express.Router();

userRouter.post('/sendOTP', (req, res) => {
  sendOTP(req.body.phoneNumber)
    .then(() => {
      res.json({ message: 'OTP sent successfully.' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to send OTP.' });
    });
});

userRouter.post('/verifyOTP', (req, res) => {
  verifyOTP(req.body.phoneNumber, req.body.otp)
    .then(() => {
      res.json({ message: 'OTP verified successfully.' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to verify OTP.' });
    });
});

module.exports = userRouter;