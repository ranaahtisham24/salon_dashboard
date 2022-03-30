import ErrorToaster from '../../utils/toaster/ErrorToaster';
import SuccessToaster from '../../utils/toaster/SuccessToaster';
import {
    activateUserServices,
    activationEmailService,
    addSalonServices,
    forgetPasswordServices,
    loginUserServices,
    adminLoginUserServices,
    registerUserServices,
    resentOTPServices,
    resetPasswordServices,
    updateEmailService,
    updateProfilePicService,
    updateUsernameService,
} from '../../services/auth';
import {
    AUTH_ADD_SALON,
    AUTH_CHANGE_PASSWORD,
    AUTH_CLOSE_MODAL,
    AUTH_EMAIL_VERIFICATION,
    AUTH_ERROR,
    AUTH_LOADING,
    AUTH_PROFILE_PIC,
    AUTH_RESEND_OTP,
    AUTH_RESET_PASSWORD,
    AUTH_SIGNIN,
    AUTH_ADMIN_SIGNIN,
    AUTH_SIGNUP,
    AUTH_UPDATE_EMAIL,
    AUTH_UPDATE_PHONE,
    AUTH_USER_NAME,
} from './constant';

export const registerUser = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await registerUserServices(data);
        console.log(res.data);
        dispatch({ type: AUTH_SIGNUP, payload: data?.email });
        SuccessToaster(toast, 'An otp has been sent on your email address');
        nav('/otp');
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error?.message });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};

export const loginUser = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await loginUserServices(data)
        console.log(res.data);
        dispatch({ type: AUTH_SIGNIN, payload: res.data });
        nav('/');
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error?.response?.data?.message || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};


export const adminLogin = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await adminLoginUserServices(data);
        console.log('9999999',res.data);
        dispatch({ type: AUTH_ADMIN_SIGNIN, payload: res.data });
        nav('/adminhome');
    } catch (error) {
        console.log("🚀 ~ file: auth.js ~ line 74 ~ error", error)
        dispatch({
            type: AUTH_ERROR,
            payload: error?.response?.data?.message || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};


export const activateAccount = (data, toast) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await activateUserServices(data);
        console.log(res.data);
        dispatch({ type: AUTH_SIGNIN, payload: res.data });
        SuccessToaster(toast, 'Account created successfully');
        window.location.href = '/';
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error?.response?.data?.message || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};

export const resendOTP = (data, toast) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await resentOTPServices(data);
        console.log(res.data);
        dispatch({ type: AUTH_RESEND_OTP, payload: res.data });
        SuccessToaster(toast, 'An otp has been sent on your email address');
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error?.response?.data?.message || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};

export const forgetPassword = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await forgetPasswordServices(data);
        console.log(res.data);
        dispatch({ type: AUTH_SIGNUP, payload: data?.email });
        SuccessToaster(toast, 'An otp has been sent on your email address');
        nav('/resetpassword');
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error?.response?.data?.message || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};

export const resetPassword = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await resetPasswordServices(data);
        console.log(res.data);
        dispatch({ type: AUTH_RESET_PASSWORD });
        SuccessToaster(toast, 'Password has been reset.');
        nav('/signin');
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error?.response?.data?.message || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};

export const updateProfilePic = (data, toast) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await updateProfilePicService(data);
        console.log(res.data);
        dispatch({ type: AUTH_PROFILE_PIC, payload: res.data.user });
        SuccessToaster(toast, 'Profile pic uploaded succesfully');
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error?.message });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};

export const updateUsername = (data, toast) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await updateUsernameService(data);
        console.log(data);
        dispatch({ type: AUTH_USER_NAME, payload: data });
        SuccessToaster(toast, 'User name updated succesfully');
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error?.message });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};

export const updateEmail = (data, toast) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await updateEmailService(data);
        console.log('2222222',res.data);
        dispatch({ type: AUTH_UPDATE_EMAIL, payload: res.data.user });
        SuccessToaster(toast, 'Email address updated successfully');
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error?.message });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};

export const updatePhone = (data, toast) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await updateEmailService(data);
        console.log(res.data);
        dispatch({ type: AUTH_UPDATE_PHONE, payload: res.data.user });
        SuccessToaster(toast, 'Email address updated successfully');
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error?.message });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};

export const changePassword = (data, toast) => async dispatch => {
    try {
        dispatch({ type: AUTH_LOADING });
        const res = await updateEmailService(data);
        console.log(res.data);
        dispatch({ type: AUTH_CHANGE_PASSWORD, payload: res.data.user });
        SuccessToaster(toast, 'Password changed successfully');
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error?.message });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};

export const closeModal = () => async dispatch => {
    try {
        dispatch({ type: AUTH_CLOSE_MODAL });
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error?.message });
    }
};
