import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner'
import { useForm } from 'react-hook-form';
import { contactInfo } from '../services/operations/contactAPI';

const ContactUs = () => {

    const {token, loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const submitHandler = async (data, e) => {
        e.preventDefault()
        try {
            // console.log("Submitting form data:", data); // Log form data
            await dispatch(contactInfo(data, token));

            e.target.reset(); // Reset form

        } catch (error) {
            console.log("Failed to dispatch data from submit handler", error);
        }
    };
    


  return (
    <div>
      <div className='w-11/12 md:w-6/12 mx-auto justify-center mt-10  overflow-hidden mb-20'>
        <h1 className='text-3xl text-richblack-5 font-semibold mb-10'>Contact Us</h1>
            {
                loading ?
                (
                    <div>
                        <Spinner/>
                    </div>
                ) :
                (
                    <form onSubmit={handleSubmit(submitHandler)}>
                      <div className='flex flex-col gap-4 mb-3'>
                        <label className='flex flex-col gap-1'>
                            <p className='text-richblack-5'>Name </p>
                            <input
                            type='text'
                            name="name"
                            placeholder='Enter Your Name'
                            className="outline-none text-richblack-5 px-4 py-1 bg-richblack-600 rounded-md"
                            {...register("name", { required: true })}
                            // defaultValue={user?.name}
                            />
                        </label>

                        <label className='flex flex-col gap-1'>
                            <p className='text-richblack-5'>Email </p>
                            <input
                            type='email'
                            name="email"
                            placeholder="Enter Your Email"
                            className='outline-none text-richblack-5 px-4 py-1 bg-richblack-600 rounded-md'
                            {...register("email", { required: true })}
                            // defaultValue={user?.email}
                            />
                        </label>

                        <label className='flex flex-col gap-1 '>
                            <p className='text-richblack-5'>Contact No  </p>
                            <input
                            type='text'
                            name="contactNumber"
                            placeholder="Enter Your Contact Number"
                            className='outline-none text-richblack-5 px-4 py-1 bg-richblack-600 rounded-md'
                            {...register("contactNumber", { required: true,
                            maxLength: { value: 12, message: "Invalid Contact Number" },
                            minLength: { value: 10, message: "Invalid Contact Number" },
                            })}
                            // defaultValue={user?.contactNumber}
                            />
                        </label>

                        <label className='flex flex-col gap-1 '>
                            <p className='text-richblack-5'>Message  </p>
                            <textarea
                            type='text'
                            name="message"
                            placeholder="Enter Your Query"
                            rows="6" cols="10"
                            className='outline-none text-richblack-5 px-4 py-1 bg-richblack-600 rounded-md'
                            {...register("message", { required: true})}
                            // defaultValue={user?.contactNumber}
                            ></textarea>
                        
                        </label>

                        <button type='submit'
                            className='text-richblack-900 bg-yellow-50  font-bold items-center py-2 rounded-md text-center mt-4'>
                            Send
                        </button>
                      </div>
                    </form>
                )
            }
      </div>
    </div>
  )
}

export default ContactUs
