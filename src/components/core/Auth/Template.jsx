import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
// import frameImg from '../../../assets/images/pot.jpeg'
import { FcGoogle } from "react-icons/fc";

const Template = ({title, desc1, desc2, image, formtype}) => {
  return (
    <div className='flex justify-evenly mt-10 items-center w-11/12 mx-auto'>
      
        <div className='md:w-[500px]'>
            <h1 className='text-[2rem] font-bold leading-10 text-richblack-5'>{title}</h1>

            <div>
                <p className='text-richblack-5'>{desc1}</p>
                <p className='text-richblack-100'>{desc2}</p>
            </div>

            {
                formtype === "signup" ? 
                (<SignupForm />) : (<LoginForm />)
            }

            {/* <div className='flex justify-center items-center mt-4 w-[400px]'>
                <div className='bg-white w-[40%] h-[1px]'></div>
                <p className='px-2 text-richblack-100'>OR</p>
                <div className='bg-white w-[40%] h-[1px]'></div>
            </div>

            <button className='mt-4 border py-[5px] w-[450px] flex justify-center items-center gap-2 bg-richblack-25'><FcGoogle/>Sign in with Google</button> */}
        </div>

        <div className='hidden md:block relative'>

            {/* <div>
                <img src={frameImg} alt='background img' width={488} height={408} loading='lazy'/>
            </div> */}
            <div className=' z-[10] top-0 right-[15px]'>
                <img src={image} alt='' width={488} height={408} loading='lazy'/>
            </div>
            
        </div>

    </div>
  )
}

export default Template
