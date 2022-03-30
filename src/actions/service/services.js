import {
    addServiceServices,
    deleteSalonServiceServices,
    editSalonServiceServices,
    getSalonServiceByIdServices,
    getSalonServices,
    updateServicePicServices,
} from '../../services/services';
import ErrorToaster from '../../utils/toaster/ErrorToaster';
import SuccessToaster from '../../utils/toaster/SuccessToaster';
import {
    SERVICE_ADD_SERVICE,
    SERVICE_EDIT_SERVICE,
    SERVICE_ERROR,
    SERVICE_GET_SERVICE,
    SERVICE_GET_SERVICE_BY_ID,
    SERVICE_LOADING,
    SERVICE_RESET_SERVICE_BY_ID,
} from './constants';

export const getallServices = (data, toast) => async dispatch => {
    try {
        dispatch({ type: SERVICE_LOADING });
        const res = await getSalonServices(data);
        console.log(res.data);
        dispatch({ type: SERVICE_GET_SERVICE, payload: res.data.service.serviceData });

    } catch (error) {
        dispatch({ type: SERVICE_ERROR, payload: error?.message });
        // ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const addService = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: SERVICE_LOADING });
        const res = await addServiceServices(data);
        console.log(res.data);
        dispatch({ type: SERVICE_ADD_SERVICE, payload: res.data });
        SuccessToaster(toast, 'Service is added succesfully');
        nav('/services');
    } catch (error) {
        dispatch({ type: SERVICE_ERROR, payload: error?.message });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const getServicebyId = (data, toast) => async dispatch => {
    try {
        dispatch({ type: SERVICE_LOADING });
        const res = await getSalonServiceByIdServices(data);
        console.log(res.data);
        dispatch({
            type: SERVICE_GET_SERVICE_BY_ID,
            payload: res.data.service.serviceData,
        });
    } catch (error) {
        dispatch({
            type: SERVICE_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const editService = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: SERVICE_LOADING });
        const res = await editSalonServiceServices(data);
        console.log(res.data);
        dispatch({
            type: SERVICE_EDIT_SERVICE,
        });
        SuccessToaster(toast, 'Service is updated succesfully');
        nav('/services');
    } catch (error) {
        dispatch({
            type: SERVICE_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const updateServicePic = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: SERVICE_LOADING });
        const res = await updateServicePicServices(data);
        console.log(res.data);
        dispatch({ type: SERVICE_EDIT_SERVICE, payload: res.data.employee.employeeData[0] });
        SuccessToaster(toast, 'Service pic is updated succesfully');
        nav('/employee');
    } catch (error) {
        dispatch({
            type: SERVICE_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const resetServiceById = (data, toast, nav) => async dispatch => {
    try {


        dispatch({ type: SERVICE_RESET_SERVICE_BY_ID });

    } catch (error) {
        dispatch({
            type: SERVICE_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const deleteService = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: SERVICE_LOADING });
        const res = await deleteSalonServiceServices(data);
        console.log(res.data);
        dispatch({ type: SERVICE_EDIT_SERVICE });
        SuccessToaster(toast, 'Service is deleted succesfully');
    } catch (error) {
        dispatch({
            type: SERVICE_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};
