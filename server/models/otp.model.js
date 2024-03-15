const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender.js');
const emailTemplate = require('../mail/templates/emailVerificationTemplate.js')

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 60 * 5,
        },
    })


async function verificationEmail(email, otp){
    try{
        const emailResponse = await mailSender(email, "Verification email by - 100 रु वाली योजना", emailTemplate(otp));
        // console.log("Email Send Successfully ",emailResponse);
    }
    catch(err){
        console.log("Error Occured while sending mail: ", err.message)
    }
}

otpSchema.pre("save", async function(next){
    await verificationEmail(this.email, this.otp);
    next();
})


module.exports = mongoose.model("Otp", otpSchema)