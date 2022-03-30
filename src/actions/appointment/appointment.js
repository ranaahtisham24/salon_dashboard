import {
    addAppointmentServices,
    editAppointmentServices,
    getAppointmentServices,
} from '../../services/appointment';
import ErrorToaster from '../../utils/toaster/ErrorToaster';
import SuccessToaster from '../../utils/toaster/SuccessToaster';
import {
    APPOINTMENT_ADD_APPOINTMENT,
    APPOINTMENT_EDIT_APPOINTMENT,
    APPOINTMENT_ERROR,
    APPOINTMENT_GET_APPOINTMENT,
    APPOINTMENT_LOADING,
} from './constant';

export const getAppointment = (data, toast, nav) => async dispatch => {
    try {
        // dispatch({ type: APPOINTMENT_LOADING });
        const res = await getAppointmentServices(data);
        console.log(res.data);
        dispatch({
            type: APPOINTMENT_GET_APPOINTMENT,
            payload: res.data.bookingDetail,
        });
    } catch (error) {
        dispatch({
            type: APPOINTMENT_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        // ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const addAppointment = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: APPOINTMENT_LOADING });
        const res = await addAppointmentServices(data);
        console.log(res.data);
        dispatch({ type: APPOINTMENT_ADD_APPOINTMENT, payload: res.data });
        SuccessToaster(toast, 'Appointment is added succesfully');
        nav('/appointment');
    } catch (error) {
        dispatch({
            type: APPOINTMENT_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

// export const getAppointmentbyId = (data, toast, nav) => async dispatch => {
//     try {
//         dispatch({ type: APPOINTMENT_LOADING });
//         const res = await getAppointmentByIdServices(data);
//         console.log(res.data);
//         dispatch({ type: EMPL_GET_EMPLOYEE_BY_ID, payload: res.data.employee.employeeData[0] });

//     } catch (error) {
//         dispatch({
//             type: APPOINTMENT_ERROR,
//             payload: error?.response?.data?.error || error?.message,
//         });
//         ErrorToaster(toast, error?.response?.data?.error || error?.message);
//     }
// };

export const editAppointment = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: APPOINTMENT_LOADING });
        const res = await editAppointmentServices(data);
        console.log(res.data);
        dispatch({ type: APPOINTMENT_EDIT_APPOINTMENT });
        SuccessToaster(toast, 'Appointment is updated succesfully');
    } catch (error) {
        dispatch({
            type: APPOINTMENT_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};


