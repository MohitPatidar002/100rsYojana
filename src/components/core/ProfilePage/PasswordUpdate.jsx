import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector} from 'react-redux';
import { changePassword } from '../../../services/operations/profileAPI';
import { LiaEdit } from "react-icons/lia";


const PasswordUpdate = () => {

  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data, e) => {
    e.preventDefault()
    try{
      await dispatch(changePassword(data,token))

      e.target.reset();
    }
    catch(error){
      console.log("failed to dispatch data from submit handler", error)
    }

  }


  return (
    <div>
      <div className='bg-richblack-800 px-5 py-3 rounded-md mt-10 mb-10'>
            
            <form onSubmit={handleSubmit(submitHandler)}>

              <div className='flex justify-between items-center mb-5'>
                <p className='text-richblack-5 text-xl font-semibold'>Password</p>

                {
                  isEdit ?
                  (
                    <button type='button' onClick={()=>setIsEdit((prev) => !prev)}
                      className='text-richblack-900 bg-yellow-50  font-semibold flex gap-1 md:gap-3 items-center px-2 py-1 md:px-4 md:py-2 rounded-md'>
                      <p>Save</p>
                    </button>
                  ) 
                  : (
                    <button type='submit' onClick={()=>setIsEdit((prev) => !prev)}
                      className='text-richblack-900 bg-yellow-50  font-semibold flex gap-1 md:gap-2 items-center px-2 py-1 md:px-4 md:py-2 rounded-md'>
                      <p>Edit</p>
                      <LiaEdit className='text-xl'/>
                    </button>
                  )
                }

              </div>


              <div className='flex flex-col md:flex-row gap-4 mb-3'>
              <label className='flex flex-col gap-1 w-[70%] lg:w-[50%]'>
                    <p className='text-richblack-5'>Old Password </p>
                    <input
                    type='text'
                    name="oldPassword"
                    readOnly={!isEdit}
                    placeholder='Enter Old Password'
                    className="outline-none text-richblack-5 px-4 py-1 bg-richblack-600 rounded-md"
                    {...register("oldPassword", { required: true })}
                    
                    />
                </label>

                <label className='flex flex-col gap-1 w-[70%] lg:w-[50%]'>
                    <p className='text-richblack-5'>New Password </p>
                    <input
                    type='text'
                    name="newPassword"
                    readOnly={!isEdit}
                    placeholder='Enter New Password'
                    className="outline-none text-richblack-5 px-4 py-1 bg-richblack-600 rounded-md"
                    {...register("newPassword", { required: true })}
                    
                    />
                </label>
                
              </div>
            </form>
            
            

        </div>
    </div>
  )
}

export default PasswordUpdate
