const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema(
    {
        chatBody: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true 
        }
    }, 
    {timestamps: true})

module.exports = mongoose.model("Chat", chatSchema)