const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        paymentStatus: {
            type: Boolean,
            required: true
        },
        totalMonths: {
            type: Number,
            required: true
        },
        totalYears: {
            type: Number,
            required: true
        },
        totalMoney: {
            type: Number,
            required: true
        }
    }, 
    {timestamps: true});

module.exports = mongoose.model("Payment", paymentSchema);