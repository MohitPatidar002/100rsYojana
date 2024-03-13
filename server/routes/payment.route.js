const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const Payment = require('../models/payment.model.js');


// Import handler 
const {capturePayment, verifyPayment, sendSuccessEmail, paymentDetail} = require('../controllers/Payment.controller.js');
const {auth} = require('../middlewares/Auth.middleware.js');


// payment initiate
router.post('/capturePayment', auth, capturePayment);

// verify signature
router.put('/verifyPayment', auth, verifyPayment);

// send success email
router.post('/sendSuccessEmail', auth, sendSuccessEmail)

// get the payment details
router.get('/paymentDetail', auth, paymentDetail);

// ************ Payment Updation After Transaction ***************
// Isme aur bhi update ho skte hai ------------
router.put('/update', async (req, res) => {
    const {userId} = req.body;

    const userDetail = await User.findById(userId);
    console.log(userDetail)

    const paymentDetail = userDetail.payment;
    console.log("payment -> ", paymentDetail)

    const payment = await Payment.findById(paymentDetail);

    paymentStatus = true;
    totalMoney = payment.totalMoney + 100;
    totalMonths = payment.totalMonths + 1;
    if(totalMonths > 12){
        totalMonths = 1;
        totalYears = payment.totalYears + 1;
    }
    // totalMoney = payment.totalMoney + 100;



    const update = await Payment.findByIdAndUpdate(
        paymentDetail._id,
        {
            $set: {
                paymentStatus,
                totalMonths,
                totalYears,
                totalMoney,
            }
        },
        {new: true}
    )
    
    
    return res.json({
        success: true,
        message: "Payment Successful",
        data:update
    })
})



module.exports = router;