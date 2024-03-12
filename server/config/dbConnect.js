const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB Connect Successfully");
    } 
    catch (error) {
        console.log("DB Connection Failed", error);
        process.exit(1);
    }
}

module.exports = dbConnect;