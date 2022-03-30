import {
    EMPL_ADD_EMPLOYEE,
    EMPL_EDIT_EMPLOYEE,
    EMPL_ERROR,
    EMPL_GET_EMPLOYEE,
    EMPL_GET_EMPLOYEE_BY_ID,
    EMPL_LOADING,
    EMPL_RESET_EMPLOYEE_BY_ID,
} from '../actions/employee/constants';

const initialState = {
    loading: false,
    employee: null,
    employeeById: null,
    error: null,
};

export const Employee = (state = initialState, { type, payload }) => {
    switch (type) {
        case EMPL_LOADING:
            return { ...state, loading: true };

        case EMPL_GET_EMPLOYEE:
            return { ...state, loading: false, employee: payload };

        case EMPL_ADD_EMPLOYEE:
            return {
                ...state,
                loading: false,
                employee: [{ ...state.employee, ...payload }],
            };

        case EMPL_GET_EMPLOYEE_BY_ID:
            return { ...state, loading: false, employeeById: payload };

        case EMPL_EDIT_EMPLOYEE:
            return {
                ...state,
                loading: false,

            };

        case EMPL_RESET_EMPLOYEE_BY_ID:
            return {
                ...state,
                loading: false,
                employeeById: null
            };

        case EMPL_ERROR:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};
