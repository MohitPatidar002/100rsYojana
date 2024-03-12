import toast from 'react-hot-toast'
import {setLoading, setToken} from '../../slices/authSlice'
import { setUser } from '../../slices/profileSlice'
import { apiConnector } from '../apiConnector'
import {endPoints} from '../apis'


const { 
        SENDOTP_API,
        SIGNUP_API,
        LOGIN_API, 
        RESET_PASSWORD_TOKEN_API,
        RESET_PASSWORD_API,
        
    }  = endPoints; 



// SEND OTP CALL
export const sendotp = (email, navigate) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = apiConnector("POST", SENDOTP_API, {
                email
            })

            console.log("response", response)

            toast.success("Otp sent successfully")
            navigate("/verify-email")
        }
        catch(err){
            console.log("Error while send the otp : ", err);
            toast.error("Could not send Otp")
        }
        dispatch(setLoading(false))
    }
}

// SIGNUP CALL
export const signup = (name, email, password, contactNumber, otp, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", SIGNUP_API, {
                name, email, password, contactNumber, otp
            })

            console.log("Signup response : ", response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Signup Successfully")
            navigate('/login');
        }
        catch(error){
            console.log('Error in Sign Up: ', error);
            toast.error("You can't SignUp because You are not Member of Yojana")
        }
        dispatch(setLoading(false))
    }
}



// login call
export const login = (email, password, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true))

        try{
            let res = await apiConnector("POST", LOGIN_API, {
                email, password
            })

            console.log("Login response: ",res);

            if(!res.data.success){
                throw new Error(res.data.message)
            }

            toast.success("login successful")
            dispatch(setToken(res.data.user.token))

            const userImage = res.data?.user?.image 
                ? res.data.user.image 
                : `https://api.dicebear.com/5.x/initials/svg?seed=${res.data.user.name} `

            dispatch(setUser({ ...res.data.user, image: userImage }))

            localStorage.setItem("token", JSON.stringify(res.data.user.token))
            localStorage.setItem("user", JSON.stringify(res.data.user))
            navigate('/home')
        }
        catch(error){
            console.log('Login failed')
            toast.error("Email or Password is Incorrect")
        }

        dispatch(setLoading(false))
    }
}


// logout call
export const logout = (navigate)=> {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out")
        navigate('/login')
    }
}

// forgot password call
export const forgotPasswordToken = (email, setEmailSent) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", RESET_PASSWORD_TOKEN_API, {email})
            console.log("Reset password token response...", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Reset Password Link Sent Successfully")
            setEmailSent(true);
        }
        catch(error){
            console.log("reset password token error")
            toast.error("Invalid Email Address")
        }

        dispatch(setLoading(false))
    }
}


// RESET PASSWORD
export const updatePassword = (newPassword, confirmPassword, token, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("PUT", RESET_PASSWORD_API, {
                newPassword, confirmPassword, token
            })

            console.log("Password Reset Response: ", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password Update Successfully")
            navigate("/login");
        }
        catch(error){
            console.log("Reset Password failed", error)
            toast.error("Failed To Update Password")
        }

        dispatch(setLoading(false))
    }
}