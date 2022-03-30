import axios from "axios";


export const registerUserServices = async (data) => await axios.post('api/email_register', data)

export const loginUserServices = async (data) => await axios.post('api/login', data)

export const adminLoginUserServices = async (data) => await axios.post('api/admin_login', data)

export const activateUserServices = async (data) => await axios.post('api/activation', data)

export const resentOTPServices = async (data) => await axios.post('api/resend_otp', data)

export const forgetPasswordServices = async (data) => await axios.post('api/forget_password', data)

export const resetPasswordServices = async (data) => await axios.post('api/reset_password', data)

export const updateProfilePicService = async (data) => await axios.post('api/update_profile_image', data)

export const updateUsernameService = async (data) => await axios.post('api/update_user_name', data)

export const activationEmailService = async (data) => await axios.post('api/send_verification_email', data)

export const updateEmailService = async (data) => await axios.post('api/update_email_address', data)

export const changePhoneService = async (data) => await axios.post('api/update_phone_number', data)

export const changePasswordService = async (data) => await axios.post('api/update_email_address', data)


