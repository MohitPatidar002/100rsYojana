import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState(
        {
            email:"", password:""
        }
    )

    const [showPassword, setShowPassword] = useState(false);

    const {email, password} = formData;

    function changeHandler(event){
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name] : event.target.value
            }
        });
    }

    function submitHandler(event){
        event.preventDefault();
        dispatch(login(email, password, navigate))
       
    }

  return (
    <form onSubmit={submitHandler} className='mt-3 flex flex-col gap-3'>
      
        <label >
            <p className='text-[1.1rem] mb-1 text-richblack-5'>Email Address<sup> *</sup></p>

            <input className='text-richblack-5 w-full p-2 outline-none rounded-md pl-3 bg-richblack-700' 
                type='email'
                required
                name="email"
                value={email}
                onChange={changeHandler}
                placeholder='Enter Email'
            />
        </label>

        <label>
            <p className='text-[1.1rem] mb-1 text-richblack-5'>Password<sup> *</sup></p>

            <div className='flex bg-richblack-700 text-richblack-5 border-none rounded-md px-[5px] py-[2px] border-2'>
                <input className='text-richblack-5 w-full p-2  outline-none pl-3 bg-richblack-700'
                    type={
                        showPassword ? 'text' : 'password'
                    }
                    required
                    name="password"
                    value={password}
                    onChange={changeHandler}
                    placeholder='Enter Password'
                />

                <span onClick={() => {
                    setShowPassword((prev) => !prev)
                    }} className='text-richblack-25 text-[23px] flex justify-center items-center pr-1 cursor-pointer'>
                    {
                        showPassword ? (<IoMdEye/>) : (<IoMdEyeOff/>)
                    }
                </span>
            </div>
            
            <div className='text-blue-200 text-right'>
                <NavLink to='/forgot-password'>Forgot Password</NavLink>
            </div>
            
            
        </label>

        <button type='submit'
            className='bg-yellow-50 text-[1.2rem] rounded-sm py-[2px] mt-1 font-semibold'>
            Log In
        </button>

    </form>
  )
}

export default LoginForm
