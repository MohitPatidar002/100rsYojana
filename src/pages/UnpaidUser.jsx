import React, { useState, useEffect } from 'react'
import { apiConnector } from '../services/apiConnector';
import { getAllUser } from '../services/apis';
import { IoClose } from "react-icons/io5";
import Spinner from './Spinner'
import { useSelector } from 'react-redux';


const PaidUser = () => {

    const [unPaidUser, setUnpaidUser] = useState([]);
    const  [loading, setLoading] = useState(true);

    async function fetchData(){
        try{
          const response = await apiConnector("GET", getAllUser.GET_ALL_USER_DETAIL_API)
        //   console.log("get user detail", response)
          const data = response.data.allUser;
        //   console.log(data)
        
            const unpaidUserData = data.filter((user) => user.payment.paymentStatus === false);
            
            setUnpaidUser(unpaidUserData);
            setLoading(false)
          
        }
        catch(error){
            console.log("error while fetching user data from backend")
        }
      }
    //   console.log("Unpaid user", unPaidUser.length)

    useEffect(()=> {
        fetchData();
    },[])

  return (
    <div>
        <div className='w-11/12 md:w-6/12 mx-auto justify-center mt-10  overflow-hidden mb-20'>

            <h1 className='text-3xl text-richblack-5 font-semibold mb-10'>Unpaid Member</h1>

            {
                loading ? (
                    <div className='w-[100%] h-full flex justify-center items-center'>
                        <Spinner/>
                    </div>
                ) : 
                (
                <div className='flex flex-col gap-3'>
                    {
                        unPaidUser.length > 0 
                        ? (
                            unPaidUser.map((user, index) =>  {
                                return (

                                    <div className='text-white bg-richblack-800 px-5 py-2 rounded-md flex justify-between items-center' key={index}>
                                        <div className='flex gap-2 items-center'>
                                            <div className='aspect-w-1 aspect-h-1'>
                                                <img src={user.image} className='rounded-full object-cover w-[50px] h-[50px]' alt='profileImageUser' />
                                            </div>
                                            
                                            <p>{user.name}</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <p>No paid</p>
                                            <IoClose className=' bg-red font-bold text-white text-lg rounded-sm'/>
                                        </div>
                                    </div>


                                    /* <div className='bg-richblack-800 px-5 py-3 rounded-md  text-richblack-25 flex justify-between items-center gap-5' 
                                    key={index}>
                                    
                                        <div className='flex items-center  gap-2 md:gap-4'>
                                            <img src={user.image} className='w-[30%] aspect-square 
                                            rounded-full' alt='profileImage' loading='lazy'/>
                                            <p>{user.name}</p>
                                        </div>
                                        <div className='flex gap-1 justify-center items-center'>
                                            <p>No paid</p>
                                            <p>
                                                <RxCross2 className=' bg-red text-white '/>
                                            </p>
                                            
                                        </div> 
                                    
                                    </div> */   
                                )
                            })
                            
                            )
                        : (
                            <div className='text-richblack-25 text-center mt-[170px]'>No Due Member</div>
                        )
                    }
                </div>
                )
            }
            

        </div>
    </div>
  )
}

export default PaidUser
