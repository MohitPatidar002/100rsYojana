const User = require('../models/user.model.js');
const mailSender = require('../utils/mailSender.js');
const bcrypt = require('bcrypt');


// generate url link for reset password and send to the user mail
exports.resetPasswordToken = async (req, res) => {
    try {
        // fetch the email from body
        const {email} = req.body;
    
        // validation for exists user
        if(!email){
            return res.status(400).json({
                success: false,
                message: "Please enter email"
            })
        }
    
        const user = await User.findOne({email});
    
        if(!user){
            return res.status(400).json({
                success: false,
                message: "please signup first"
            })
        }
    
    
        // generate token by crypto 
        const token = crypto.randomUUID();
    
        // put token and expire time in db
        const updateDetails = await User.findOneAndUpdate(
            {email},
            {
                token: token,
                resetPasswordExpires: Date.now() + 5*60*1000
            },
            {new : true}
        )
    
        // create url and put token him
        const url = `https://100rsyojana.vercel.app/update-password/${token}`;
    
        // send url link to the user by mailSender
        const mailSend = mailSender(email, "Password reset link", `Reset Password Link : ${url}`)
    
        // return res
        return res.status(200).json({
            success: true,
            message: "reset link sent successfully",
            token
        })
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "reset link generation failed"
        })
    }

}


// new password update to the db
exports.resetPassword = async (req, res) => {
    try {
        // fetch newpassword and confirm password to the body and token also
        const {newPassword, confirmPassword, token} = req.body;
    
        // check newPassword and confirmPassword same or not
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "newPassword and ConfirmPassword does not match"
            })
        }
    
        // hash password and update the newPassword into db
        const user = await User.findOne({token});
    
        if(!user){
            return res.status(400).json({
                success: false,
                message: "token is Invalid"
            })
        }

        if(user.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success: false,
                message: "token has been expired, please regenerate"
            })
        }
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    // console.log(hashedPassword)
        const updatePassword = await User.findByIdAndUpdate(
            user._id, 
            {
                $set: {
                    password: hashedPassword,
                }
            },
            {new : true}
        )
    
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    } 
    catch (error) {
        return res.status(500).json({
            success: true,
            message: "Error while updating the password"
        })
    }
}