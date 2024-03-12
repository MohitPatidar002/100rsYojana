const User = require('../models/user.model.js');
require('dotenv').config();
const {uploadFileOnCloud} = require('../utils/uploadFileOnCloud.js');

// update the user profile
exports.updateProfile = async (req, res) => {
    try{
        // fetch the data from body
        const {name, email, contactNumber} = req.body;

        // validation
        if(!name || !email || !contactNumber){
            return res.status(200).json({
                success: false,
                message: "All fields required"
            }) 
        }

        // find the user 
        const id = req.user.id;

        // update in db
        const updatedProfile = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: name,
                    email: email,
                    contactNumber: contactNumber,
                }
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "User Profile Updated Successfully",
            updatedProfile
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while updating the user profile"
        })
    }
}


// profile picture update
exports.updateUserImage = async (req, res) => {
    try{

        
        const imageUrl = req.files.displayPicture;

        if(!imageUrl){
            return res.status(400).json({
                success: false,
                message: 'image not found'
            })
        }

        // first find the user 
        const id = req.user.id;

        const userDetail = await User.findById(id);

        const imageUploaded = await uploadFileOnCloud(imageUrl, process.env.FOLDER_NAME)

        // update in db
        const updatedImage = await User.findByIdAndUpdate(
            userDetail._id,
            {
                $set: {
                    image: imageUploaded.secure_url,
                }
            },
            {new: true}
        )


        return res.status(200).json({
            success: true,
            message: 'Image Updated Successfully',
            updatedImage
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: 'Unable to update image'
        })
    }
}