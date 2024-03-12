
// install nodemailer
// import nodemailer
// create transporter 
// send mail 

require('dotenv').config();
const nodeMailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try{
        let transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        const info = await transporter.sendMail({
            from: `100 रु वाली योजना by Me`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

        // console.log(info);
    } 
    catch (error) {
        console.log('unable to send email by mailSender');
    }
}


module.exports = mailSender;









