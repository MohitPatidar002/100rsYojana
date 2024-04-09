// import React from 'react'
// import { RiTeamFill } from "react-icons/ri";
// import { MdOutlineCalendarMonth } from "react-icons/md";
// import { FaMoneyBillTrendUp } from "react-icons/fa6";

// const Collections = () => {
//   return (
//     <div className='w-11/12 mx-auto mt-20'>
      
//         <div className="flex flex-col md:flex-row bg-richblack-800 text-white py-6
//                             uppercase justify-center items-center rounded-md">
//                 <div className="flex flex-col w-[50%] md:w-[33%] md:px-28 gap-5 items-center border-b-2 md:border-r-2 md:border-b-0 border-black pb-8 md:pb-0">
//                     <RiTeamFill  className='text-4xl'/>
//                     <p className="text-3xl font-bold">37</p>
//                     <p className="text-sm text-richblack-100">Members</p>
//                 </div>

//                 <div className="flex flex-col w-[50%] md:w-[33%] md:px-28 gap-5 items-center border-b-2 md:border-r-2 md:border-b-0 border-black pt-8 pb-8 md:pt-0 md:pb-0">
//                     <MdOutlineCalendarMonth className='text-4xl'/>
//                     <p className="text-3xl font-bold">18</p>
//                     <p className="text-sm text-richblack-100">Total Months</p>
//                 </div>

//                 <div className="flex flex-col w-[50%] md:w-[33%] md:px-28 gap-5 items-center pt-8 md:pt-0">
//                     <FaMoneyBillTrendUp className='text-4xl' />
//                     <p className="text-3xl font-bold">65,000 +</p>
//                     <p className="text-sm text-richblack-100">total Money</p>
//                 </div>
//         </div>

//     </div>
//   )
// }

// export default Collections





import React, { useState, useEffect } from 'react';
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import CountUp from 'react-countup';
import teamImage from '../../../assets/images/teamPeople.jpg'
import calender from '../../../assets/images/calender.png'
import money from '../../../assets/images/money.png'

const Collections = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const windowHeight = window.innerHeight;
      const section = document.querySelector('.collections');
      const sectionTop = section.getBoundingClientRect().top;
      setVisible(sectionTop < windowHeight);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className='w-11/12 mx-auto mt-20 collections'>
      
        <div className={`flex flex-col md:flex-row bg-richblack-800 text-white py-6
                            uppercase justify-center items-center rounded-md ${visible ? 'animate-counters' : ''}`}>
                <div className="flex flex-col w-[50%] md:w-[33%] md:px-28 gap-10 items-center border-b-2 md:border-r-2 md:border-b-0 border-black pb-8 md:pb-0">
                    <RiTeamFill  className='text-8xl'/>
                    <div className='flex flex-col justify-center items-center gap-3'>
                      <CountUp end={37} duration={2} start={visible ? 0 : null}>
                        {({ countUpRef }) => (
                          <p className="text-3xl font-bold" ref={countUpRef}></p>
                        )}
                      </CountUp>
                      <p className="text-sm text-richblack-100">Members</p>
                    </div>
                    
                </div>

                <div className="flex flex-col w-[50%] md:w-[33%] md:px-28 gap-8 items-center border-b-2 md:border-r-2 md:border-b-0 border-black pt-8 pb-8 md:pt-0 md:pb-0">
                    <MdOutlineCalendarMonth className='text-8xl'/>
                    <div className='flex flex-col justify-center items-center gap-3'>
                      <CountUp end={18} duration={2} start={visible ? 0 : null}>
                        {({ countUpRef }) => (
                          <p className="text-3xl font-bold" ref={countUpRef}></p>
                        )}
                      </CountUp>
                      <p className="text-sm text-richblack-100">Total Months</p>
                    </div>
                    
                </div>

                <div className="flex flex-col w-[50%] md:w-[33%] md:px-28 gap-8 items-center pt-8 md:pt-0">
                    <FaMoneyBillTrendUp className='text-8xl' />
                    <div className='flex flex-col justify-center items-center gap-3'>
                      <CountUp end={65000} duration={2} start={visible ? 0 : null}>
                        {({ countUpRef }) => (
                          <p className="text-3xl font-bold" ref={countUpRef}></p>
                        )}
                      </CountUp>
                      <p className="text-sm text-richblack-100">total Money</p>
                    </div>
                    
                </div>
        </div>

    </div>
  );
};

export default Collections;

