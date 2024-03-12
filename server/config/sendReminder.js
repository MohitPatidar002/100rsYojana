const cron = require('node-cron');
const twilio = require('twilio');
const User = require('../models/user.model.js')
require('dotenv').config();

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

// Function to send SMS message
const sendSMS = (to, message) => {
    return twilioClient.messages.create({
        body: message,
        from: '+15122703371',
        to: `+${to}`
    });
};

// Function to fetch unpaid users from the database
const getUnpaidUsers = async() => {
    // Logic to fetch unpaid users from the database
    try {
        // Query the database for users with paymentStatus set to false (unpaid)
        const unpaidUsers = await User.aggregate([
            {
                $lookup: {
                    from: 'payments',
                    localField: 'payment',
                    foreignField: '_id',
                    as: 'payment'
                }
            },
            {
                $match: {
                    'payment.paymentStatus': false
                }
            }
        ]);
        // console.log("unpaid", unpaidUsers)
        return unpaidUsers;
    } catch (error) {
        console.error('Error fetching unpaid users:', error);
        return [];
    }
};

// Function to check payment status and send SMS
const sendReminderSMS = async () => {
    const unpaidUsers = await getUnpaidUsers();
    if(unpaidUsers == ''){
        return ;
    }
    // console.log("check2")
// console.log("get unpaid users", unpaidUsers)
    unpaidUsers.forEach(async (user) => {
        // Check payment status
        const isPaid = await user.payment.paymentStatus === true

        if (!isPaid) {
            // Send SMS
            const message = "Reminder: Your payment is pending. Please make the payment as soon as possible - 100 रु वाली योजना.";
            await sendSMS(user.contactNumber, message);
        }
    });
};

// Schedule SMS sending
const morningJob = cron.schedule('0 8 * * *', () => {
    console.log("morning job")
    sendReminderSMS();
    
});

const eveningJob = cron.schedule('0 18 * * *', () => {
    sendReminderSMS();
});

// Reset SMS sending at the beginning of each month
const resetMonthlySMS = cron.schedule('0 0 1 * *', () => {
    morningJob.reschedule('0 8 * * *');
    eveningJob.reschedule('0 18 * * *');
});
