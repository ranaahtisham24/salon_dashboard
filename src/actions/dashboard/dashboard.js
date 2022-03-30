import { addSalonServices, getUserSalonServices, updateSalonLogoServices, updateSalonServices, getSalonListService } from "../../services/dashboard";
import ErrorToaster from "../../utils/toaster/ErrorToaster";
import SuccessToaster from "../../utils/toaster/SuccessToaster";
import { DASHBOARD_ADD_SALON,DASHBOARD_GET_SALOON_LIST, DASHBOARD_ERROR, DASHBOARD_GET_SALOON, DASHBOARD_LOADING, DASHBOARD_UPDATE_SALON, DASHBOARD_UPDATE_SALON_LOGO } from "./constant";



export const getAllSalonList = (data, toast, nav) => async dispatch => {

    try {
        dispatch({ type: DASHBOARD_LOADING });
        const res = await getSalonListService(data);
        console.log('777777',res.data);
        dispatch({ type: DASHBOARD_GET_SALOON_LIST, payload: res.data });
        // SuccessToaster(toast, 'An otp has been sent on your email address');
        // nav('/otp');
    } catch (error) {
        nav('/addsalon');
        dispatch({ type: DASHBOARD_ERROR, payload: error?.message });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};



export const getUserSalon = (data, toast, nav) => async dispatch => {

    try {
        dispatch({ type: DASHBOARD_LOADING });
        const res = await getUserSalonServices(data);
        console.log(res.data);
        dispatch({ type: DASHBOARD_GET_SALOON, payload: res.data });
        // SuccessToaster(toast, 'An otp has been sent on your email address');
        // nav('/otp');
    } catch (error) {
        nav('/addsalon');
        dispatch({ type: DASHBOARD_ERROR, payload: error?.message });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};



export const addSalon = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: DASHBOARD_LOADING });
        const res = await addSalonServices(data);
        console.log(res.data);
        dispatch({ type: DASHBOARD_ADD_SALON, payload: res.data });
        SuccessToaster(toast, 'Salon is registed successfully');
        nav('/');
    } catch (error) {
        dispatch({
            type: DASHBOARD_ERROR,
            payload: error?.response?.data?.message || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};


export const addAdminSalon = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: DASHBOARD_LOADING });
        const res = await addSalonServices(data);
        console.log(res.data);
        dispatch({ type: DASHBOARD_ADD_SALON, payload: res.data });
        SuccessToaster(toast, 'Salon is registed successfully');
        nav('/saloonlist');
    } catch (error) {
        dispatch({
            type: DASHBOARD_ERROR,
            payload: error?.response?.data?.message || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
        nav('/saloonlist')
    }
};


export const updateSalon = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: DASHBOARD_LOADING });
        const res = await updateSalonServices(data);
        console.log(res.data);
        dispatch({ type: DASHBOARD_UPDATE_SALON, payload: res.data });
        SuccessToaster(toast, 'Salon is updated successfully');
        nav('/saloonlist');
    } catch (error) {
        dispatch({
            type: DASHBOARD_ERROR,
            payload: error?.response?.data?.message || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const updateSalonLogo = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: DASHBOARD_LOADING });
        const res = await updateSalonLogoServices(data);
        console.log(res.data);
        dispatch({ type: DASHBOARD_UPDATE_SALON_LOGO, payload: res.data });
        SuccessToaster(toast, 'Salon logo is updated successfully');
    } catch (error) {
        dispatch({
            type: DASHBOARD_ERROR,
            payload: error?.response?.data?.message || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};
