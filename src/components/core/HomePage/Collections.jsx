import React from 'react'
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const Collections = () => {
  return (
    <div className='w-11/12 mx-auto mt-20'>
      
        <div className="flex flex-col md:flex-row bg-richblack-800 text-white py-6
                            uppercase justify-center items-center rounded-md">
                <div className="flex flex-col w-[50%] md:w-[33%] md:px-28 gap-5 items-center border-b-2 md:border-r-2 md:border-b-0 border-black pb-8 md:pb-0">
                    <RiTeamFill  className='text-4xl'/>
                    <p className="text-3xl font-bold">37</p>
                    <p className="text-sm text-richblack-100">Members</p>
                </div>

                <div className="flex flex-col w-[50%] md:w-[33%] md:px-28 gap-5 items-center border-b-2 md:border-r-2 md:border-b-0 border-black pt-8 pb-8 md:pt-0 md:pb-0">
                    <MdOutlineCalendarMonth className='text-4xl'/>
                    <p className="text-3xl font-bold">18</p>
                    <p className="text-sm text-richblack-100">Total Months</p>
                </div>

                <div className="flex flex-col w-[50%] md:w-[33%] md:px-28 gap-5 items-center pt-8 md:pt-0">
                    <FaMoneyBillTrendUp className='text-4xl' />
                    <p className="text-3xl font-bold">65,000 +</p>
                    <p className="text-sm text-richblack-100">total Money</p>
                </div>
        </div>

    </div>
  )
}

export default Collections
