const { instance } = require("../config/razorpayInstance.js");
const User = require("../models/user.model.js");
const mailSender = require("../utils/mailSender.js");
const {paymentSuccessEmail} = require('../mail/templates/paymentSuccessful.js')
const Payment = require("../models/payment.model.js");
const crypto = require("crypto")
require("dotenv").config();

// initialize the payment
exports.capturePayment = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log('Caputer payment Backend')
    // console.log("user id:", userId)
    if (!userId) {
      return res.status(500).json({
        success: false,
        message: "User ID not fount in capture payment",
      });
    }

    const options = {
      amount: 100 * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
    };

    try {
      const paymentResponse = await instance.orders.create(options);
      return res.json({
        success: true,
        message: "Order created",
        paymentResponse,
      });
    } catch (error) {
      console.log("Error creating order", error);
      return res.json({
        success: false,
        messsage: "Error while creating order",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Error while capturing the payment",
    });
  }
};

// verify the payment
exports.verifyPayment = async (req, res) => {
  try {
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const userId = req.user.id;

        // console.log("order id in backend ", razorpay_order_id)
        if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !userId
        ) {
        return res.json({
            success: false,
            message: "Missing fields in request body while verifying payment",
        });
        }
        // console.log("Befor generate the signature")
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        
        // generated_signature = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_SECRET);

        // console.log("After generate the signature")

        // console.log("Expected signature ", expectedSignature)

        if (expectedSignature === razorpay_signature) {
        // user ka account update karo
        
            // write additional logic here......
            const userDetail = await User.findById(userId);
            // console.log("user Detail after razorpay signature matched", userDetail);

            const paymentDetail = userDetail.payment;
            // console.log("payment -> ", paymentDetail);

            const payment = await Payment.findById(paymentDetail);
          
            paymentStatus = true;
            totalMoney = payment.totalMoney + 100;
            totalMonths = payment.totalMonths + 1;
            if (totalMonths > 12) {
                totalMonths = 1;
                totalYears = payment.totalYears + 1;
            }
            else{
              totalYears = payment.totalYears ;
            }
            
            try {
              const updated = await Payment.findByIdAndUpdate(
                  paymentDetail,
                  {
                      $set: {
                          paymentStatus: paymentStatus,
                          totalMonths: totalMonths,
                          totalYears: totalYears,
                          totalMoney: totalMoney,
                      }
                  },
                  { new: true }
              );
              // console.log('Documents updated successfully:', updated);
              return res.status(200).json({
                success:true,
                message: "Payment Successful",
                data: updated
                
              })
              // Handle successful update
            } catch (err) {
              console.error('Error updating documents:', err);
              // Handle error
            }
            
           
        }
        else{
            return res.status(403).json({
                success: false,
                message: "razorpay signature verification failed"
            })
        }

        
    } 
    catch (error) {
        return res.json({
            success: false,
            message: "Payment Verified Failed"
        })
    }
  
};


exports.sendSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id
  // console.log("payment email")

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const userDetail = await User.findById(userId)

    await mailSender(
      userDetail.email,
      `Payment Received`,
      paymentSuccessEmail(
        userDetail.name,
        amount/100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}



// initiate the payment
// exports.capturePayment = async (req, res) => {
//     try{

//         // fetch the course id and user id

//         const userId = req.user.id;

//         // create amount, currency and options
//         const amount = 100;
//         const currency = "INR";

//         const options = {
//             amount : amount * 100,
//             currency,
//             receipt : Math.random(Date.now()).toString(),
//             notes: {
//                 userId,
//             }
//         }

//         // create option with instance
//         const paymentResponse = await instance.orders.create(options);

//         console.log(paymentResponse);

//         return res.status(200).json({
//             success: true,
//             amount : paymentResponse.amount,
//             currency: paymentResponse.currency,
//             orderId: paymentResponse.id
//         })
//     }
//     catch(error){
//         return res.json({
//             success: false,
//             message:"could not initiate the payment",
//         })
//     }
// }

// // verify the signature
// exports.verifySignature = async (req, res) => {

//         // verify the signature
//         const webhookSecret = "12345";

//         // razorpay recived secret
//         const signature = req.headers["x-razorpay-signature"];

//         // webhookSecret encryption steps
//         const shasum = crypto.createHmac("sha256", webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         // comparison
//         if(digest === signature){
//             console.log("Payment is Authorised");

//             const {userId} = req.body.payload.payment.entity.notes;

//             try{

//                 // write additional logic here......
//                 const userDetail = await User.findById(userId);
//                 console.log(userDetail)

//                 const paymentDetail = userDetail.payment;
//                 console.log("payment -> ", paymentDetail)

//                 const payment = await Payment.findById(paymentDetail);

//                 paymentStatus = true;
//                 totalMoney = payment.totalMoney + 100;
//                 totalMonths = payment.totalMonths + 1;
//                 if(totalMonths > 12){
//                     totalMonths = 1;
//                     totalYears = payment.totalYears + 1;
//                 }
//                 // totalMoney = payment.totalMoney + 100;

//                 const update = await Payment.findByIdAndUpdate(
//                     paymentDetail._id,
//                     {
//                         $set: {
//                             paymentStatus,
//                             totalMonths,
//                             totalYears,
//                             totalMoney,
//                         }
//                     },
//                     {new: true}
//                 )

//                 return res.json({
//                     success: true,
//                     message: "Payment Successful",
//                     data:update
//                 })

//                 // mail send krdo successful course buy ka
//                 const emailResponse = mailSender(
//                     userId.email,
//                     "Congratulations from StudyNotion",
//                     "Congratulations, you are onboarded into new StudyNotion Course"
//                 )

//                 console.log(emailResponse);
//                 return res.status(200).json({
//                     success:true,
//                     message:"Signature Verified and Course Added",
//                 });

//             }
//             catch(error){
//                 return res.status(500).json({
//                     success:false,
//                     message:error.message,
//                 });
//             }

//         }
//         else {
//             return res.status(400).json({
//                 success:false,
//                 message:'Invalid request',
//             });
//         }

// }

// get the payment detail
exports.paymentDetail = async (req, res) => {
  try {
    // console.log("yaha tak pahucha?");
    const { id } = req.user;
    
    const userDetail = await User.findById(id);
    // console.log("UserDetails :", userDetail);

    const paymentId = userDetail.payment;
    

    const paymentDetail = await Payment.findById(paymentId);
    // console.log("payment detail ", paymentDetail);

    return res.json({
      success: true,
      message: "Fetch payment detail successful",
      paymentDetail,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "unable to get payment detail, ye fatt gaya",
    });
  }
};
