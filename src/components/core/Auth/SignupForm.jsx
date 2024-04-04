import React, { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendotp } from '../../../services/operations/authAPI';
import { setSignupData } from '../../../slices/authSlice';

const SignupForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(
        {
            name: "",
            email:"",
            password:"",
            contactNumber:""
        }
    )

    const [showPassword, setShowPassword] = useState(false);
    

    const {name, email, password, contactNumber} = formData;

    function changeHandler(event){
        setFormData((prev) => ({
            
                ...prev,
        
                [event.target.name] : event.target.value,
            
        }));
    }

    function submitHandler(event) {
        event.preventDefault();

        const signupData = {...formData}

        // console.log("signup data : ", signupData)

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))

        // Send OTP to user for verification
        dispatch(sendotp(formData.email, navigate))

        // Reset
        setFormData({
            name: "",
            email: "",
            password: "",
            contactNumber: "",
      })
    }

  return (
    <div>

      <form onSubmit={submitHandler} className='mt-2 mb-8 md:mb-0 flex flex-col gap-2'>

      
            <label className='w-full'>
                <p className='md:text-[1.1rem] md:mb-1 text-richblack-5'>Name<sup> *</sup></p>

                <input
                    type='text'
                    required
                    name="name"
                    value={name}
                    onChange={changeHandler}
                    placeholder='Enter Your Name'
                    className='text-richblack-5 w-full p-2 outline-none rounded-md pl-3 bg-richblack-700'
                />
            </label>

            <label className='w-full'>
                <p className='md:text-[1.1rem] md:mb-1 text-richblack-5'>Contact No.<sup> *</sup></p>

                <input
                    type='text'
                    required
                    name="contactNumber"
                    value={contactNumber}
                    onChange={changeHandler}
                    placeholder='Enter Contact Number'
                    className='text-richblack-5 w-full p-2 outline-none rounded-md pl-3 bg-richblack-700'
                />
            </label>


        <label className='md:w-full'>
            <p className='md:text-[1.1rem] md:mb-1 text-richblack-5'>Email Address<sup> *</sup></p>

            <input 
                type='email'
                required
                name="email"
                value={email}
                onChange={changeHandler}
                placeholder='Enter Email Address'
                className='text-richblack-5 w-full p-2 outline-none rounded-md pl-3 bg-richblack-700'
            />
        </label>

        
            <label>
                <p className='md:text-[1.1rem] md:mb-1 text-richblack-5'>Password<sup> *</sup></p>

                <div className='flex bg-richblack-700 text-richblack-5 border-none rounded-md px-[5px] py-[2px] border-2'>
                    <input 
                        type={
                            showPassword ? 'text' : 'password'
                        }
                        required
                        name="password"
                        value={password}
                        onChange={changeHandler}
                        placeholder='Enter Password'
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

            
    

        <button type='submit'
        className='bg-yellow-50 text-[1.2rem] rounded-sm py-[2px] mt-4 font-semibold'>Sign Up</button>

      </form>

    </div>
  )
}

export default SignupForm
