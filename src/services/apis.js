const BASE_URL = process.env.REACT_APP_BASE_URL


export const endPoints = {
    SENDOTP_API : BASE_URL + '/auth/sendotp',  
    SIGNUP_API : BASE_URL + '/auth/signup',
    LOGIN_API : BASE_URL + '/auth/login',
    RESET_PASSWORD_TOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD_API : BASE_URL + '/auth/reset-password'
}

export const profileEndPoints = {
    UPLOAD_PROFILE_PICTURE_API : BASE_URL + '/profile/updateProfilePicture',
    UPDATE_ADDITION_INFO_API : BASE_URL + '/profile/updateProfile',
    CHANGE_PASSWORD_API : BASE_URL + '/profile/changePassword',
}

export const paymentEndPoints = {
    GET_PAYMENT_DETAIL_API : BASE_URL + '/payment/paymentDetail',
    CAPTURE_PAYMENT_API : BASE_URL + '/payment/capturePayment',
    VERIFY_PAYMENT_API : BASE_URL + '/payment/verifyPayment',
    SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + '/payment/sendSuccessEmail', 
}

export const getAllUser = {
    GET_ALL_USER_DETAIL_API : BASE_URL + '/profile/getAllUserData'
}

export const contactEndPoint = {
    SEND_CONTACT_INFO : BASE_URL + '/contact/sendContactInfo'
}