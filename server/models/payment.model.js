const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        paymentStatus: {
            type: Boolean,
        
        },
        totalMonths: {
            type: Number,
            
        },
        totalYears: {
            type: Number,
            
        },
        totalMoney: {
            type: Number,
            
        }
    }, 
    {timestamps: true});

module.exports = mongoose.model("Payment", paymentSchema);