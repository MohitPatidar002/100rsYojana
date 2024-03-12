import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdditionalInfo } from '../../../services/operations/profileAPI';


const AdditionDetail = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();


      const submitHandler = async (data) => {
        
        try{
          await dispatch(updateAdditionalInfo(data,token))
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
                <p className='text-richblack-5 text-xl font-semibold'>Profile Information</p>

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
                      className='text-richblack-900 bg-yellow-50  font-semibold flex gap-1 md:gap-3 items-center px-2 py-1 md:px-4 md:py-2 rounded-md'>
                      <p>Edit</p>
                    </button>
                  )
                }
                
              </div>

              <div className='flex flex-col gap-4 mb-3'>
                <label className='flex flex-col gap-1 w-[70%] lg:w-[50%]'>
                    <p className='text-richblack-5'>Name </p>
                    <input
                    type='text'
                    name="name"
                    readOnly={!isEdit}
                    placeholder='Enter Your Name'
                    className="outline-none text-richblack-5 px-4 py-1 bg-richblack-600 rounded-md"
                    {...register("name", { required: true })}
                    defaultValue={user?.name}
                    />
                </label>

                <label className='flex flex-col gap-1 w-[70%] lg:w-[50%]'>
                    <p className='text-richblack-5'>Email </p>
                    <input
                    type='email'
                    name="email"
                    readOnly={!isEdit}
                    placeholder="Enter Your Email"
                    className='outline-none text-richblack-5 px-4 py-1 bg-richblack-600 rounded-md'
                    {...register("email", { required: true })}
                    defaultValue={user?.email}
                    />
                </label>

                <label className='flex flex-col gap-1 w-[70%] lg:w-[50%]'>
                    <p className='text-richblack-5'>Contact No  </p>
                    <input
                    type='text'
                    name="contactNumber"
                    readOnly={!isEdit}
                    placeholder="Enter Your Contact Number"
                    className='outline-none text-richblack-5 px-4 py-1 bg-richblack-600 rounded-md'
                    {...register("contactNumber", { required: true,
                    maxLength: { value: 12, message: "Invalid Contact Number" },
                    minLength: { value: 10, message: "Invalid Contact Number" },
                    })}
                    defaultValue={user?.contactNumber}
                    />
                </label>
              </div>
            </form>
            
            

        </div>
    </div>
  )
}

export default AdditionDetail
