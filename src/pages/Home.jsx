import React from "react";
import logo from "../assets/images/animate-gif.gif";
import HighlightText from "../components/core/HomePage/HighlightText";
import coin from "../assets/images/coin falling.gif";
import '../App.css'
import Collections from "../components/core/HomePage/Collections";
import Vision from "../components/core/HomePage/Vision";
import { useSelector } from "react-redux";
import ImageSlider from "../components/core/HomePage/ImageSlider";
import PaymentSteps from "../components/core/HomePage/PaymentSteps";

const Home = () => {

  
  return (
    <div>
      
      <div className='w-11/12 mx-auto'>

        {/* Section 1 */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between text-white  relative">
            <div className=' md:w-[50%] mt-12 md:mt-0 flex flex-col items-center'>
                <div>
                    <p className='text-4xl md:text-6xl font-bold'> 
                        <span className='text-6xl md:text-8xl '>100 </span> 
                        <HighlightText text="रु वाली योजना"/>
                    </p>
                    <p className='text-medium md:text-2xl font-mono'>Save for the Future</p>
                </div>
                
            </div>

            <div className='md:w-[50%] flex items-center justify-center relative'>
              {/* <div className="absolute w-full h-[100px] top-0 z-[10] background"></div> */}

                <img src={logo} alt='money image' width={500} className='mix-blend-screen'/>
                {/* <img src={coin} className='absolute top-2'/> */}

              {/* <div className="absolute w-full h-[250px] bottom-0 z-[20] backgroundBelow"></div> */}
            </div>
          
        </div>


        {/* Section 2 */}
        <Collections/>

        {/* Section 3 */}
        <PaymentSteps/>

        {/* Section 4 */}
        <Vision/>

        {/* Section 5 */}
        <ImageSlider/>

        {/* Created By */} 
        <div className="flex flex-col justify-center py-7 mt-28 mb-12 md:mb-0 text-richblack-100">
              <p className="font-bold">100 रु वाली योजना </p>
              <p className="text-sm">Created By - <span className="font-edu-sa">Mohit Patidar</span> </p>
        </div>


      </div>


      
      
    </div>
  );
};

export default Home;
