import {
    APPOINTMENT_ADD_APPOINTMENT,
    APPOINTMENT_ERROR,
    APPOINTMENT_GET_APPOINTMENT,
    APPOINTMENT_LOADING,
} from '../actions/appointment/constant';

const initialState = {
    loading: false,
    appointment: null,
    appointmentById: null,
    error: null,
};

export const Appointment = (state = initialState, { type, payload }) => {
    switch (type) {
        case APPOINTMENT_LOADING:
            return { ...state, loading: true };

        case APPOINTMENT_GET_APPOINTMENT:
            return { ...state, loading: false, appointment: payload };

        case APPOINTMENT_ADD_APPOINTMENT:
            return {
                ...state,
                loading: false,

            };

        // case EMPL_GET_EMPLOYEE_BY_ID:
        //     return { ...state, loading: false, appointmentById: payload };

        // case EMPL_EDIT_EMPLOYEE:
        //     return {
        //         ...state,
        //         loading: false,

        //     };

        case APPOINTMENT_ERROR:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};
