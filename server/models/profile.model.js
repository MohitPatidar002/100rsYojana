const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
    {
        
    }, 
    {timestamps: true});

module.exports = mongoose.model("Profile", profileSchema);