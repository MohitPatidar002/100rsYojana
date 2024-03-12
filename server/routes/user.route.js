const express = require('express');
const router = express.Router();


// import the handlers
const {signup, login, sendOTP} = require('../controllers/Auth.controller.js');
const { resetPasswordToken, resetPassword } = require('../controllers/ResetPassword.controller.js')



// **************** User Authentication ******************
// signup route
router.post('/signup', signup);

// login route
router.post('/login', login);

// sendotp route
router.post('/sendotp', sendOTP);



//**************** Reset Password ****************

// reset-password token route
router.post('/reset-password-token', resetPasswordToken);

// reset password route
router.put('/reset-password', resetPassword);


module.exports = router;
