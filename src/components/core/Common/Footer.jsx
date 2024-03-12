import React from 'react'
import { MdHome } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineChat } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link, matchPath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {

  const {token} = useSelector((state) => state.auth);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }
  return (
    <>
    {
      token !== null && 
    
    <div className='w-full bg-richblack-900 border-t-[1px] border-richblack-700 md:hidden items-center justify-center text-white fixed bottom-0 z-20'>
      <div className='w-11/12 mx-auto h-16 flex gap-3 items-center justify-evenly'>
        <Link to="/home" className='flex flex-col text-center items-center'>
            <MdHome className='text-3xl'/>
            <p className='text-sm font-extralight'>Home</p>
        </Link>

        <Link to="/payment" className='flex flex-col text-center items-center'>
            <MdOutlinePayment className='text-3xl'/>
            <p className='text-sm'>Payment</p>
        </Link>

        <Link to="/chat" className='flex flex-col text-center items-center'>
            <MdOutlineChat className='text-3xl'/>
            <p className='text-sm'>Chat</p>
        </Link>

        <Link to="/profile" className='flex flex-col text-center items-center'>
            <CgProfile className='text-3xl'/>
            <p className='text-sm'>Profile</p>
        </Link>
        
      </div>
    </div>
    }
    </>
  )
}

export default Footer
