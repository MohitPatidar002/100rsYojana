const User = require('../models/user.model.js');
const Otp = require('../models/otp.model.js');
const Payment = require('../models/payment.model.js');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender.js');
require('dotenv').config();


// generate otp and store in db
exports.sendOTP = async (req, res) => {

    try {
        // fetch email from req ki body
        const {email} = req.body;
    // console.log(email)
        // check user is already register or not
        const userExistence = await User.findOne({email});
    
        if(userExistence){
            return res.status(401).json({
                success: false,
                message: "User already exists"
            })
        }
    
        // generate otp
        let otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })
    
        // check otp unique or not
        let result = await Otp.findOne({otp:otp});
    
        while(result){
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            });
            result = await Otp.findOne({otp:otp});
        }
    
        const otpPayload = {email, otp}
    
        // unique otp mil gaya toh ab db me save krdo
        const otpBody = await Otp.create(otpPayload);
        // console.log(otpBody);

        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otpBody
        })
    } 
    catch (error) {
        console.log("Error while generating OTP ", error);
    }
} 

// special Email validation for Yojana member
let validEmail = (email) => {
    let validEmails = ['mohitpatidar002@gmail.com', 'meetpatidar002@gmail.com', 'admin@gmail.com',
'100rsyojana@gmail.com', 'purvesh@gmail.com', 'yuvraj@gmail.com', 'tanishk@gmail.com'];
    validEmails.forEach((element) => {
        if(email === element){
            return 0;
        }
    })
    return 1;
}

// signup
exports.signup = async (req,res) => {
    try{

        // fetch the data into body
        const {
            name,
            email,
            contactNumber,
            password,
            otp,
            image,
        } = req.body;

        // validation
        if(!name || !email || !password || !contactNumber || !otp){
            return res.status(403).json({
                success: false,
                message: "All fields Required",
            })
        }

        // special validation for YOJANA
        // const validRes = validEmail(email);
        // // console.log(validRes)

        // if(validRes === 0){
        //     return res.status(400).json({
        //         success: false,
        //         message: "You are not Yojana member, so You can't signup"
        //     })
        // }


        // check user already exists or not
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User already registered",
            })
        }


        // check otp is valid or not 
        const recentOTP = await Otp.find({email}).sort({createdAt:-1}).limit(1);

        // console.log(recentOTP);

        if(recentOTP.length == 0){
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            })
        }
        else if(otp !== recentOTP[0].otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP, Please try again",
            })
        }

        // hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("hash pass ", hashedPassword)

        const paymentDetails = await Payment.create({
            paymentStatus: false,
            totalMonths:6,
            totalYears: 1,
            totalMoney: 1800
        })

        // create entry in db
        const user = await User.create({
            name, email, contactNumber, 
            password:hashedPassword, 
            payment: paymentDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${name}`
        })

        // return res
        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Registration Failed, Please try again"
        })
    }
}


// login
exports.login = async (req, res) => {
    try {
        // fetch the data from body
        const {email, password} = req.body;

        // validation
        if(!email || !password){
            return res.status(401).json({
                success: false,
                message: "required all fields"
            }) 
        }

        // check user register or not
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "You can't login, please signup first"
            }) 
        }

        // compare password
        if(await bcrypt.compare(password, user.password)){

            const payload = {
                email: user.email,
                id: user._id,
            }

             // generate token
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h"});

            // console.log("token", token)

            user.token = token;
            user.password = undefined;

             // send cookies
            const options = {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 3*24*60*60*1000),
             }
            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User logged in Successfully",
                user
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Password is Incorrect"
            })
        }
       
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "login failure, please try again"
        }) 
    }
}



// change password
exports.changePassword = async (req,res) => {
    try{
        // fetch the data from body
        const { oldPassword, newPassword } = req.body;

        // validation
        // console.log("old Pass ", oldPassword)
        // console.log("new pass", newPassword)
        if(!oldPassword || !newPassword ){
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }

        // if(newPassword !== confirmPassword){
        //     return res.status(400).json({
        //         success: false,
        //         message: "new password and confirm password does not match"
        //     })
        // }
        
        // compare the old password to the db password
        const userDetail = await User.findById(req.user.id)
        // console.log(userDetail)

        if(await bcrypt.compare(oldPassword, userDetail.password)){
            // update new password into db
            console.log("matched")
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const updatePass = await User.findByIdAndUpdate(
                req.user.id, 
                {$set: {password: hashedPassword}},
                {new: true}
            )
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Old Password does not match"
            })
        }

        
        // send mail -> successful
        const passUpdateMail = mailSender(
            userDetail.email, 
            "100rs Yojana - Password Update", 
            "Your Password has been Updated Successfully")

        // return res
        return res.status(200).json({
            success: true,
            message: "Password Updated Successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "something went wrong , please try again"
        })
    }
}
