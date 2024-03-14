const jwt = require('jsonwebtoken');
require('dotenv').config();

// check Authentication
exports.auth = async (req, res, next) => {
    try {
        // get the token from req.cookies
        // console.log("token for caputer payment")
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        // console.log("Auth token for contactInfo", token)
        if(!token){
            return res.status(401).json({
                success: false,
                message: "token is missing"
            })
        }
    
        // verify the token
        try{
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            // console.log("decoded Info ", decode);
            req.user = decode;
        }
        catch{
            return res.staus(401).json({
                success: false,
                message: "token is invalid"
            })
        }
        
        next();
    } 
    catch (error) {
        return res.staus(401).json({
            success: false,
            message: "Issue while fetch the token from cookies"
        })
    }
}


 
// for isAdmin portal
exports.isAdmin = async (req, res, next) => {
    try {
        // check it is student or not
        if(req.user.email !== 'mohitpatidar002@gmail.com'){
            return res.status(401).json({
                success: false,
                message: "It is safe portal for Admin"
            })
        }
    
        next();
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified, please try again"
        })
    }
}