import React from 'react'
import PaymentStepCard from './PaymentStepCard'
import { FaArrowCircleDown, FaArrowCircleRight } from 'react-icons/fa'
import paymentPageImage from '../../../assets/images/paymentPageImages.png'
import makePayment from '../../../assets/images/makePayment.png'
import completePayment from '../../../assets/images/completePayment.png'

const PaymentSteps = () => {
  return (
    <div>
      <div className='w-11/12 mx-auto mt-20 text-white flex flex-col gap-10 justify-center items-center'>
        <h2 className='text-4xl text-center'><span className='italic text-[#f76aba]'>3-Easy Steps</span> To Payment</h2>

        {/* PaymentSteps */}
        <div className='flex flex-col lg:flex-row justify-between items-center gap-3'>
              <PaymentStepCard
                borderColor="#25256d"
                image={paymentPageImage}
                heading = "Go to Payment Page"
                description="Go to the payment page for make payment which have in Navbar."
              />
              <FaArrowCircleRight className='text-3xl hidden lg:block'/>
              <FaArrowCircleDown className='text-3xl lg:hidden'/>

              <PaymentStepCard
                borderColor="#5e1982"
                image={makePayment}
                heading = "Make Payment"
                description="Click on Pay Now button and choose the payment option whatever you like."
              />
              <FaArrowCircleRight className='text-3xl hidden lg:block'/>
              <FaArrowCircleDown className='text-3xl lg:hidden'/>

              <PaymentStepCard
                borderColor="#d94599"
                image={completePayment}
                heading = "Complete"
                description="Your payment has been Successfully Paid. Now you can logout."
              />
              
              
            </div>
      </div>
    </div>
  )
}

export default PaymentSteps
