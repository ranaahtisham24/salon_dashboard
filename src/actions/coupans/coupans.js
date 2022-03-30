import {
    addCoupansServices,
    editCoupansServices,
    getCoupansByIdServices,
    getCoupansServices,
    getSalonbyIdServices
} from '../../services/coupans';
import ErrorToaster from '../../utils/toaster/ErrorToaster';
import SuccessToaster from '../../utils/toaster/SuccessToaster';
import {
    COUPANS_ADD_COUPANS,
    COUPANS_DELETE_COUPANS,
    COUPANS_EDIT_COUPANS,
    COUPANS_ERROR,
    COUPANS_GET_COUPANS,
    COUPANS_GET_COUPANS_BY_ID,
    COUPANS_LOADING,
    COUPANS_RESET_COUPANS_BY_ID,
    GET_SALON_BY_ID,
    RESET_SALON_BY_ID
} from './constant';

export const getCoupans = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: COUPANS_LOADING });
        const res = await getCoupansServices(data);
        console.log(res.data);
        dispatch({
            type: COUPANS_GET_COUPANS,
            payload: res.data.data,
        });
    } catch (error) {
        dispatch({
            type: COUPANS_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const addCoupans = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: COUPANS_LOADING });
        const res = await addCoupansServices(data);
        console.log(res.data);
        dispatch({ type: COUPANS_ADD_COUPANS, payload: res.data });
        SuccessToaster(toast, 'Coupans is added succesfully');
        nav('/coupons');
    } catch (error) {
        dispatch({
            type: COUPANS_ERROR,
            payload: error?.response?.data?.message || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.message || error?.message);
    }
};

export const getCoupansbyId = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: COUPANS_LOADING });
        const res = await getCoupansByIdServices(data);
        console.log(res.data);
        dispatch({ type: COUPANS_GET_COUPANS_BY_ID, payload: res.data.data });
    } catch (error) {
        dispatch({
            type: COUPANS_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};


export const getSalonbyId = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: COUPANS_LOADING });
        const res = await getSalonbyIdServices(data);
        console.log('444444444444',res.data.data);
        dispatch({ type: GET_SALON_BY_ID, payload: res.data.data });
    } catch (error) {
        dispatch({
            type: COUPANS_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};


export const resetSalonById = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: RESET_SALON_BY_ID });
    } catch (error) {
        dispatch({
            type: COUPANS_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const editCoupans = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: COUPANS_LOADING });
        const res = await editCoupansServices(data);
        console.log(res.data);
        dispatch({ type: COUPANS_EDIT_COUPANS });
        SuccessToaster(toast, 'Coupans is updated succesfully');
        nav('/coupons');
    } catch (error) {
        dispatch({
            type: COUPANS_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const resetCoupansById = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: COUPANS_RESET_COUPANS_BY_ID });
    } catch (error) {
        dispatch({
            type: COUPANS_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

// export const deleteCoupans = (data, toast, nav) => async dispatch => {
//     try {
//         dispatch({ type: COUPANS_LOADING });
//         const res = await deleteCoupansServices(data);
//         console.log(res.data);
//         dispatch({ type: COUPANS_DELETE_COUPANS });
//         SuccessToaster(toast, 'Coupans is deleted succesfully');
//     } catch (error) {
//         dispatch({
//             type: COUPANS_ERROR,
//             payload: error?.response?.data?.error || error?.message,
//         });
//         ErrorToaster(toast, error?.response?.data?.error || error?.message);
//     }
// };
