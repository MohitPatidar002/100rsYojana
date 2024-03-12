import {React, useRef, useState} from 'react'
import { FiUpload } from "react-icons/fi";
import { uploadProfilePicture } from '../../../services/operations/profileAPI'
import { useDispatch, useSelector } from 'react-redux';


const DisplayPicture = () => {

    const {token} = useSelector( (state) => state.auth)
    const {user} = useSelector( (state) => state.profile)
    const [image, setImage] = useState(null)
    const dispatch = useDispatch();

    
    const fileInputRef = useRef(null)

    const handleClick = () => {
      fileInputRef.current.click()
    }

    const changeHandler = (e) => {
        const file = e.target.files[0];
        console.log("file in select button ", file)
        if(file){
            setImage(file);
            
        }
    }

    const uploadImage = () => {
        try{
            const formData = new FormData()
            formData.append("displayPicture", image)
            dispatch(uploadProfilePicture(token, formData))
        }
        catch(error){
            console.log("Error while uploading the image : ", error.message)
        }
    }
    

  return (
    <div>
      <div className='flex flex-row items-center bg-richblack-800 px-5 py-3 rounded-md justify-between'>
            <img src={user?.image} alt="Profile" className='aspect-square w-[30%] md:w-[15%] rounded-full '/>

            
            <div className='flex gap-3'>

              <input
                type="file"
                ref={fileInputRef}
                onChange={changeHandler}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                // disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-900 py-1 px-3 md:py-2 md:px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
                
                <button onClick={uploadImage}
                className='text-richblack-900 bg-yellow-50  font-semibold flex gap-1 md:gap-3 items-center px-2 py-1 md:px-4 md:py-2 rounded-md'>
                    <p>Upload</p>
                    <FiUpload />     
                </button>
            </div>
            
            
            
        </div>
    </div>
  )
}

export default DisplayPicture
