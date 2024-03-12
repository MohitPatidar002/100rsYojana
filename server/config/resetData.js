const cron = require('node-cron');
const Payment = require('../models/payment.model.js')

async function resetDataForNextMonth() {
  const currentDate = new Date();
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  // Perform data reset operations for the next month
  try {
    await Payment.updateMany(
      
      { $set: {
        paymentStatus: false,
      } }
    );
    console.log("Data reset for the next month completed successfully.");
  } catch (error) {
    console.error("Error resetting data for the next month:", error);
  }
}


cron.schedule('0 0 1 * *', async () => {
    console.log('Resetting data for the next month...');
    await resetDataForNextMonth();
  });

// module.exports =  resetDataForNextMonth;
// resetDataForNextMonth();
