import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff} from 'react-icons/io'
import { updatePassword } from '../services/operations/authAPI'


const ResetPassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const token = location.pathname.split('/').at(-1);

    const [resetPassword, setResetPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const {loading} = useSelector((state) => state.auth)

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePassword(newPassword, confirmPassword, token, navigate));
    }

  return (
    <div className='text-richblack-5 flex flex-col place-items-center'>
      {
        loading ? (
            <div>
                <Spinner/>
            </div>
        ) : 
        (
            <div className='w-[30%] flex flex-col gap-3 lg:mt-[140px]'>
                <h1 className='text-4xl font-semibold'>
                    {
                        !resetPassword ? "Choose New Password" : "Reset Complete!"
                    }
                </h1>

                <p className='text-richblack-100'>
                    {
                        !resetPassword ? "Almost done. Enter your new password and you are all set." : `All done! We have sent an email to confirm`
                    }
                </p>

                <form onSubmit={handleOnSubmit} className='space-y-5'>
                    {
                        !resetPassword && (<div>
                            <label>
                                <p>New Password <sup>*</sup></p>
                                <div className='flex bg-richblack-700 text-richblack-5           border-none  rounded-md px-[5px] py-[2px] border-2'>
                                    <input 
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        required
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder='Enter New Password'
                                        className='text-richblack-5 w-full p-2 border-none outline-none pl-3 bg-richblack-700'
                                    />

                                    <span onClick={() => {
                                        setShowPassword((prev) => !prev)
                                        }} className='text-richblack-25 text-[23px] flex justify-center items-center pr-1 cursor-pointer'>
                                        {
                                            showPassword ? (<IoMdEye/>) : (<IoMdEyeOff/>)
                                        }
                                    </span>
                                </div>
                            </label>

                            <label>
                                <p>Confirm New Password <sup>*</sup></p>
                                <div className='flex bg-richblack-700 text-richblack-5           border-none  rounded-md px-[5px] py-[2px] border-2'>
                                    <input 
                                        type={
                                            showConfirmPassword ? 'text' : 'password'
                                        }
                                        required
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder='Enter Confirm Password'
                                        className='text-richblack-5 w-full p-2 border-none outline-none pl-3 bg-richblack-700'
                                    />

                                    <span onClick={() => {
                                        setShowConfirmPassword((prev) => !prev)
                                        }} className='text-richblack-25 text-[23px] flex justify-center items-center pr-1 cursor-pointer'>
                                        {
                                            showConfirmPassword ? (<IoMdEye/>) : (<IoMdEyeOff/>)
                                        }
                                    </span>
                                </div>
                            </label>
                        </div>)
                    }


                    {
                        !resetPassword
                        ? (<button type='submit' className='bg-yellow-50 text-richblack-900 text-sm font-semibold text-center py-2 rounded-md w-full'>
                          Reset Password
                        </button>)
                        : (<button className='bg-yellow-50 text-richblack-900 text-sm font-semibold text-center py-2 rounded-md w-full'>
                          <Link to="/login">
                            Return to login
                          </Link>
                        </button>)
                    }
                    
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

export default ResetPassword
