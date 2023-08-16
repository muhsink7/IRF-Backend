const express = require('express');
const { sendOTP, verifyOTP } = require('../controllers/login');
const { Admin } = require('mongodb');
const userRouter = express.Router();

userRouter.post('/admin/login',(req,res)=>{
  const {username,password}=req.body;
  if(username=== Admin.username && password=== Admin.password){
    res.json({message:'Login successfull',token:'admin'});
  }else{
    res.status(401).json({error:'Invalid credentials'});
  }
})

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