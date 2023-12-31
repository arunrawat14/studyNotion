//THIS FILE IS USED TO DEFINE THE URL FOR CALLING TH EBACKEND 

const BASE_URL = process.env.REACT_APP_BASE_URL 

console.log(BASE_URL)

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const catogories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories"
}

export const contactUsEndPoint = {
    CONTACT_US_API: BASE_URL + ""
}