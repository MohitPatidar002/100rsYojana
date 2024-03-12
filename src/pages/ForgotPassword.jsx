import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner'
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { forgotPasswordToken } from '../services/operations/authAPI';


const ForgotPassword = () => {

    const dispatch = useDispatch();
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth)

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPasswordToken(email, setEmailSent));
    }

  return (
    <div className='text-richblack-5 flex flex-col place-items-center w-11/12 mx-auto '>
      {
        loading ? (
            <div>
                <Spinner/>
            </div>
        ) : 
        (
            <div className='w-[100%] md:w-[60%] lg:w-[30%] flex flex-col gap-3 mt-[140px]'>
                <h1 className='text-4xl font-semibold'>
                    {
                        !emailSent ? "Reset Your Password" : "Check Your Email"
                    }
                </h1>

                <p className='text-richblack-100'>
                    {
                        !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                    }
                </p>

                <form onSubmit={handleOnSubmit} className='space-y-5'>
                    {
                        !emailSent && (<div>
                            <label>
                                <p>Email Address <sup>*</sup></p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter Your email address'
                                    className='text-richblack-5 w-full p-2 rounded-md pl-3 bg-richblack-700'
                                />
                            </label>
                        </div>)
                    }

                    
                        <button type='submit' className='bg-yellow-50 text-richblack-900 text-sm font-semibold text-center py-2 rounded-md w-full'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    
                </form>

                <div>
                    <Link to="/login" className='flex gap-2 items-center w-fit'>
                        <FaLongArrowAltLeft/>
                        Back to login
                    </Link>
                </div>

            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
