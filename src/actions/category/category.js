import {
    addCategoryServices,
    deleteCategoryServices,
    editCategoryServices,
    getCategoryByIdServices,
    getCategoryServices,
} from '../../services/category';
import ErrorToaster from '../../utils/toaster/ErrorToaster';
import SuccessToaster from '../../utils/toaster/SuccessToaster';
import {
    CATEGORY_ADD_CATEGORY,
    CATEGORY_EDIT_CATEGORY,
    CATEGORY_ERROR,
    CATEGORY_GET_CATEGORY,
    CATEGORY_GET_CATEGORY_BY_ID,
    CATEGORY_LOADING,
} from './constant';

export const getallCategory = (data, toast) => async dispatch => {
    try {
        dispatch({ type: CATEGORY_LOADING });
        const res = await getCategoryServices(data);
        console.log(res.data);
        dispatch({ type: CATEGORY_GET_CATEGORY, payload: res.data.data });
    } catch (error) {
        dispatch({ type: CATEGORY_ERROR, payload: error?.message });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const addCategory = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: CATEGORY_LOADING });
        console.log('🚀 ~ file: category.js ~ line 23 ~ CATEGORY_LOADING', data);
        const res = await addCategoryServices(data);
        console.log(res.data);
        dispatch({ type: CATEGORY_ADD_CATEGORY, payload: res.data });
        SuccessToaster(toast, 'Category is added succesfully');
        nav('/services');
    } catch (error) {
        dispatch({ type: CATEGORY_ERROR, payload: error?.message });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const getCategorybyId = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: CATEGORY_LOADING });
        const res = await getCategoryByIdServices(data);
        console.log(res.data);
        dispatch({
            type: CATEGORY_GET_CATEGORY_BY_ID,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const editCategory = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: CATEGORY_LOADING });
        const res = await editCategoryServices(data);
        console.log(res.data);
        dispatch({
            type: CATEGORY_EDIT_CATEGORY,
            payload: res.data,
        });
        SuccessToaster(toast, 'Category is updated succesfully');
        nav('/employee');
    } catch (error) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};

export const deleteCategory = (data, toast, nav) => async dispatch => {
    try {
        dispatch({ type: CATEGORY_LOADING });
        const res = await deleteCategoryServices(data);
        console.log(res.data);
        dispatch({ type: CATEGORY_EDIT_CATEGORY });
        SuccessToaster(toast, 'Category is deleted succesfully');
    } catch (error) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: error?.response?.data?.error || error?.message,
        });
        ErrorToaster(toast, error?.response?.data?.error || error?.message);
    }
};
