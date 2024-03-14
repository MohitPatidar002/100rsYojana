const express = require('express');
const router = express.Router();


const {auth} = require('../middlewares/Auth.middleware.js');
const { sendContactInfo } = require('../controllers/Profile.controller');

// send contact detail
router.post('/sendContactInfo', auth, sendContactInfo)

module.exports = router;