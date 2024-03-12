const express = require('express');
const router = express.Router();


// import handlers
const { updateProfile, updateUserImage } = require('../controllers/Profile.controller.js');
const { auth } = require('../middlewares/Auth.middleware.js');
const { changePassword } = require('../controllers/Auth.controller.js');
const { getUserDetail, fetchAllUser } = require('../controllers/userDetail.controller.js');



// *************** Update User Profile **********************

// update profile
router.put('/updateProfile', auth, updateProfile);

// update profile picture
router.put('/updateProfilePicture', auth, updateUserImage)

// update password
router.put('/changePassword', auth, changePassword)



// **************** Get Users Data ************************

// get single user data
router.get('/getUserDetail', auth, getUserDetail);

// get all users data
router.get('/getAllUserData', fetchAllUser)


module.exports = router;