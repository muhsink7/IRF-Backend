const express = require('express');
const shortid = require('shortid');
const { sendOTP, verifyOTP } = require('../controllers/login');
delete require.cache[require.resolve('../model/users')];
const User = require('../model/users');
// const SuperAdmin = require('../model/admin');
const userRouter = express.Router();

function generateUniqueId() {
  const uniqueId = shortid.generate();
  return `IRF0${uniqueId}`;
}

userRouter.post('/admin/login',(req,res)=>{
  const {username,password}=req.body;
  console.log(username,password);
  if(username=== "admin" && password=== "irfadmin123"){
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

userRouter.post('/verifyOTP', async (req, res) => {
  try {
    await verifyOTP(req.body.phoneNumber, req.body.otp);

    const userId = generateUniqueId();
    const newUser = new User({
      userId: userId,
      phoneNumber: req.body.phoneNumber,
      otp: req.body.otp,
      otpExpiry: new Date(),
    });

    await newUser.save();

    res.status(200).json({
      message: 'OTP verified successfully.',
      userId: userId,
      newUserMessage: 'New User created!!!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to verify OTP.' });
  }
});


// Route to update user details
userRouter.put('/update/:userId', async (req, res) => {
  const userId = req.params.userId;
  const updateData = req.body; // Data from the request body
  console.log('Update User Endpoint Called. userId:', userId, 'updateData:', updateData);

  try {
    const updatedUser = await User.up(userId, updateData);
    console.log('User Details Updated:', updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error Updating User Details:', error);
    res.status(500).json({ error: 'Failed to update user details' });
  }
});



userRouter.post('/create-admin', async (req, res) => {
  const { username, password, accessLevel } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      accessLevel,
    });
    
    await newAdmin.save();
    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = userRouter;