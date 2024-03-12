import toast from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndPoints } from "../apis"



const {
    UPLOAD_PROFILE_PICTURE_API,
    UPDATE_ADDITION_INFO_API,
    CHANGE_PASSWORD_API,
} = profileEndPoints

export function uploadProfilePicture(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector(
          "PUT",
          UPLOAD_PROFILE_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        )
        console.log(
          "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
          response
        )
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Display Picture Updated Successfully")
        dispatch(setUser(response.data.updatedImage))
        localStorage.setItem("user", JSON.stringify(response.data.updatedImage))
    
        
      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")
      }
      toast.dismiss(toastId)
    }
}

export function  updateAdditionalInfo(data, token){
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try{
      
      const response = await apiConnector("PUT", UPDATE_ADDITION_INFO_API, 
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      )


      console.log("Addition update response ", response);

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("Profile updated successfully");
      dispatch(setUser(response.data.updatedProfile))
      localStorage.setItem("user", JSON.stringify(response.data.updatedProfile))
      
    }
    catch(error){
      console.log("Error while updating addition detail ", error)
      toast.error("Unable to Update  Addition Detail ")
    }

    toast.dismiss(toastId);
  }
}


export function changePassword(data, token){
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try{
      
      const response = await apiConnector("PUT", CHANGE_PASSWORD_API, data, 
      {
        Authorization: `Bearer ${token}`,
      }
      )

      console.log("Change password response : ", response);

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Password Updated Successfully")
      
    }
    catch(error){
      console.log("Error while updating the password", error)
      toast.error("Failed to Update Password");
    }

    toast.dismiss(toastId)
  }
}