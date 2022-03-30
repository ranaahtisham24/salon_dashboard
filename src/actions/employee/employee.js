import {
    addEmployeeServices,
    deleteEmployeeServices,
    editEmployeeServices,
    getEmployeeByIdServices,
    getEmployeeServices,
} from '../../services/employee';
import ErrorToaster from '../../utils/toaster/ErrorToaster';
import SuccessToaster from '../../utils/toaster/SuccessToaster';
import {
    EMPL_ADD_EMPLOYEE,
    EMPL_EDIT_EMPLOYEE,
    EMPL_ERROR,
    EMPL_GET_EMPLOYEE,
    EMPL_GET_EMPLOYEE_BY_ID,
    EMPL_LOADING,
    EMPL_RESET_EMPLOYEE_BY_ID,
} from './constants';

export const getEmployee = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: EMPL_LOADING });
        const res = await getEmployeeServices(data);
        console.log(res.data);
        dispatch({
            type: EMPL_GET_EMPLOYEE,
            payload: res.data.employee.employeeData,
        });
    } catch (error) {
        dispatch({
            type: EMPL_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const addEmployee = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: EMPL_LOADING });
        const res = await addEmployeeServices(data);
        console.log(res.data);
        dispatch({ type: EMPL_ADD_EMPLOYEE, payload: res.data.service.data });
        SuccessToaster(toast, 'Employee is added succesfully');
        nav('/employee');
    } catch (error) {
        dispatch({
            type: EMPL_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const getEmployeebyId = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: EMPL_LOADING });
        const res = await getEmployeeByIdServices(data);
        console.log(res.data);
        dispatch({
            type: EMPL_GET_EMPLOYEE_BY_ID,
            payload: res.data.employee.employeeData[0],
        });
    } catch (error) {
        dispatch({
            type: EMPL_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const editEmployee = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: EMPL_LOADING });
        const res = await editEmployeeServices(data);
        console.log(res.data);
        dispatch({
            type: EMPL_EDIT_EMPLOYEE,

        });
        SuccessToaster(toast, 'Employee is updated succesfully');
        nav('/employee');
    } catch (error) {
        dispatch({
            type: EMPL_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const updateEmployeePic = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: EMPL_LOADING });
        const res = await editEmployeeServices(data);
        console.log(res.data);
        dispatch({
            type: EMPL_EDIT_EMPLOYEE,
            payload: res.data.employee.employeeData[0],
        });
        SuccessToaster(toast, 'Employee is updated succesfully');
        nav('/employee');
    } catch (error) {
        dispatch({
            type: EMPL_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const resetEmployeeById = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: EMPL_RESET_EMPLOYEE_BY_ID });
    } catch (error) {
        dispatch({
            type: EMPL_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
    }
};

export const deleteEmployee = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: EMPL_LOADING });
        const res = await deleteEmployeeServices(data);
        console.log(res.data);
        dispatch({ type: EMPL_ADD_EMPLOYEE });
        SuccessToaster(toast, 'Employee is deleted succesfully');
    } catch (error) {
        dispatch({
            type: EMPL_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};
