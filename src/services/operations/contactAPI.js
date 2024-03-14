import toast from "react-hot-toast";
import { contactEndPoint } from "../apis";
import { apiConnector } from "../apiConnector";


const {SEND_CONTACT_INFO} = contactEndPoint;

export function contactInfo(data, token) {
    return async (dispatch) => {

        const toastId = toast.loading("Sending...")
        // console.log("token in contact info", token)
        // console.log("data in contact info", data)
        try{
            await apiConnector("POST", SEND_CONTACT_INFO, 
            {
               name : data.name,
               email : data.email,
               contactNumber : data.contactNumber,
               message : data.message
            },
            {
                Authorization: `Bearer ${token}`,
            }
            )
            

            toast.success("Message Sent Successfully")
        }
        catch(err){
            console.log("Error while send contact info", err)
            toast.error("Failed to send Query")
        }
        toast.dismiss(toastId)
    } 
}