import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userPaymentDetail } from '../services/operations/paymentAPI';
// import { MdDone } from "react-icons/md";
import {payNow} from '../services/operations/paymentAPI'
import { FaCheck } from "react-icons/fa";
import { IoClose } from 'react-icons/io5';
import Spinner from './Spinner'

const PaymentPage = () => {

    const {user} = useSelector( (state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const  [loading, setLoading] = useState(true);
    const [payment, setPayment] = useState("");

    // get current month
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();


    const paymentDetail = async() => {
        try{
            const response = await userPaymentDetail(token);
            // console.log("payment response in paymentPage", response)
            setPayment(response)
            setLoading(false)
        }
        catch(error){
            console.log("error in payment page")
        }
    }

    const handlePayment = () => {
        // console.log("handle payment")
        if(token){
            payNow(token, user);
            return;
        }
    }

    useEffect(() => {
        paymentDetail();
    }, [])
  return (
    <div>
        <div className='w-11/12 md:w-6/12 mx-auto justify-center mt-10  overflow-hidden'>

            <h1 className='text-3xl text-richblack-5 font-semibold mb-10'>Payment Info</h1>

            {
                loading ? (
                    <div className='w-[100%] h-full flex justify-center items-center'>
                        <Spinner/>
                    </div>
                ) : 
                (
                    <div className='bg-richblack-800 px-5 py-3 rounded-md mt-10 mb-10 text-richblack-25 flex flex-col gap-5'>
                        <div className='flex justify-between items-center border-b-[1px] border-richblack-600 p-2'>
                            <p>Payment Status</p>
                            <p>
                                {
                                    !payment.paymentStatus  ? (
                                        <div className='flex gap-1 items-center'>
                                            <p className='font-bold text-red'>UnPaid</p>
                                            <IoClose className=' bg-red font-bold text-white text-lg rounded-sm'/>
                                        </div>
                                        ) : 
                                    (
                                        <div className='flex gap-1 items-center'>
                                            <p className='font-bold text-green'>Paid</p>
                                            <FaCheck className=' bg-green text-white text-lg p-[1px] rounded-sm'/>
                                        </div>        
                                    )
                                }
                            </p>
                            
                        </div>

                        <div className='flex justify-between items-center border-b-[1px] border-richblack-600 p-2'>
                            <p>Pay For</p>
                            <p className='font-semibold'>{currentMonth} {currentYear}</p>
                            
                        </div>

                        <div className='flex justify-between items-center border-b-[1px] border-richblack-600 p-2'>
                            <p>Total Time Duration</p>
                            <p className='font-semibold'>{payment.totalMonths} Months {payment.totalYears} Year</p>
                            
                        </div>

                        <div className='flex justify-between items-center border-b-[1px] border-richblack-600 p-2'>
                            <p>Amount Deposited by You</p>
                            <p className='font-semibold'>{payment.totalMoney} Rs</p>
                            
                        </div>

                        <button onClick={() => handlePayment()}
                            className='text-richblack-900 bg-yellow-50  font-bold items-center py-2 rounded-md text-center mt-4'>
                            Pay Now
                        </button>
                    </div>
                )
            }
            
        </div>
    </div>
  )
}

export default PaymentPage
