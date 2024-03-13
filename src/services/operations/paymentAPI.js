import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { paymentEndPoints } from "../apis";
import logo from '../../assets/images/100रु वाली योजना.png'
// import { verifyPayment } from "../../../server/controllers/Payment.controller";



const {
    GET_PAYMENT_DETAIL_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
    CAPTURE_PAYMENT_API,
    VERIFY_PAYMENT_API
} = paymentEndPoints



const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src;

        script.onload = () => {
            resolve(true)
        }

        script.onerror = () => {
            resolve(false)
        }

        document.body.appendChild(script);
    })
}


export async function payNow(token, userDetail) {
    const toastId = toast.loading("Loading...");
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        
        if(!res) {
            toast.error("Razorpay SDK Failed to load")
            return
        }
        
        const orderResponse = await apiConnector("POST", CAPTURE_PAYMENT_API, null,
        {
            Authorization: `Bearer ${token}`,
          }
        )

        console.log("order res :", orderResponse)
        let options = {
            key: process.env.RAZORPAY_KEY,
            amount: orderResponse.data.paymentResponse.amount,
            currency: orderResponse.data.paymentResponse.currency,
            order_id: orderResponse.data.paymentResponse.id,
            name : "100 रु वाली योजना",
            description : "Thank You for your support!",
            image: logo,
            prefill: {
                name: userDetail.name,
                email: userDetail.email,
            },
            handler: function(response) {
                // verify payment
                verifyPayment({...response}, token)


                // send success wala msg
                sendPaymentSuccessEmail(response, orderResponse.data.paymentResponse.amount, token)   
            }
        }

        const paymentObject = new window.Razorpay(options)
        console.log("options created", paymentObject)
        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.")
        console.log(response.error)
        })
    }
    catch(error){
        console.log('Error in Pay Now Function');
        toast.error("Could not make payment");
    }

    toast.dismiss(toastId);
}



// Send the Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
      await apiConnector(
        "POST",
        SEND_PAYMENT_SUCCESS_EMAIL_API,
        {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          amount,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
    } catch (error) {
      console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
    }
  }
  


async function verifyPayment(bodyData, token){
    const toastId = toast.loading("Verifying Payment...");
    
    try{
        // console.log("bodyData :", bodyData);
        // console.log("token in verify payment :", token)
        const response = await apiConnector("PUT", VERIFY_PAYMENT_API, bodyData,
        {
            Authorization: `Bearer ${token}`,
        }
        )

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Payment Successful, ThankYou")
    }
    catch(error){
        console.log("Error while verifying the payment")
        toast.error("Payment verify Failed")
    }
    toast.dismiss(toastId);
    
}




export async function userPaymentDetail(token) {
    
        let result ;
        try{
            
            const response = await apiConnector("GET", GET_PAYMENT_DETAIL_API, null, 
            {
                Authorization: `Bearer ${token}`,
            }
            )

            console.log("user payment detail action : ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response.data.paymentDetail;
        }
        catch(error){
            console.log("error while fetching payment detail from backend", error)
        }

        return result

}

