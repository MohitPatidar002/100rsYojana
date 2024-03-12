const User = require('../models/user.model.js');



// get singal user full detail
exports.getUserDetail = async (req, res) => {
    try{
        // console.log('ye chala?')
        const userId = req.user.id;

        // console.log(userId)
        const userDetail = await User.findById(userId).populate("payment").exec();

        return res.status(200).json({
            success: true,
            message: "User data received",
            userDetail
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User Data fetching failed"
        })
    }
}


// fetch all the member of yojana
exports.fetchAllUser = async (req, res) => {
    try{
        const allUser = await User.find({},
            {
                name: true,
                email: true,
                contactNumber: true,
                image: true,
                payment: true,
            },
            {new: true}).populate("payment")
       
        return res.status(200).json({
            success: true,
            message: "All User data fetched Successfully",
            allUser
        })
        
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "All User data fetched failed",
            
        })
    }
}