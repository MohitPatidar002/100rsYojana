import React, { useEffect, useState } from 'react'
import {apiConnector} from '../../../services/apiConnector'
import { getAllUser } from '../../../services/apis'
import { Swiper, SwiperSlide } from "swiper/react"


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

// import 'swiper/css/pagination';
// import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
// import "../../App.css"

// Import required modules
import { Autoplay, EffectCoverflow, Navigation, FreeMode} from 'swiper/modules';

const ImageSlider = () => {

    const [user, setUser] = useState([]);

    async function fetchData(){
      try{
        const response = await apiConnector("GET", getAllUser.GET_ALL_USER_DETAIL_API)
        console.log("get user detail", response)
        setUser(response.data.allUser)
      }
      catch(error){
          console.log("error while fetching user data from backend")
      }
    }

    useEffect(()=> {
        fetchData();
    },[])


  return (
    <div className='my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        freeMode={true}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          680: {slidesPerView: 2},
          1024: {slidesPerView: 3}
        }}

        

        effect={'coverflow'}
        grabCursor={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}

        navigation={true}
        modules={[Autoplay, EffectCoverflow, Navigation, FreeMode]}
          
          className="w-[100%] text-white flex items-center justify-center"

      >
        {
          user.map((element, index) => (
            <SwiperSlide key={index}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 
                text-[14px] text-richblack-25 ">
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={
                        element?.image
                          ? element?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${element?.name} `
                      }
                      alt=""
                      className="h-40 w-40  object-cover"
                    />
                    <p className="flex flex-col">
                      {element?.name}
                    </p>
                  </div>
                  
                </div>
              </SwiperSlide>
          ))
        }


      </Swiper>


    </div>
  )
}

export default ImageSlider




