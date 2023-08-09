const express = require('express');
const { sendOTP, verifyOTP } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/sendOTP', sendOTP);

userRouter.post('/verifyOTP', verifyOTP);

module.exports = userRouter;