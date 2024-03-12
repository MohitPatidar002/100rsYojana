const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        contactNumber: {
            type: Number,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },   
        image: {
            type: String,
            required: true,
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            required: true
        },
        token: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        chat: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Chat"
            }
        ]
    }, 
    {timestamps: true})

module.exports = mongoose.model("User", userSchema);