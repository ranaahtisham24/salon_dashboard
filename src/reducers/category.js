import {
    CATEGORY_ADD_CATEGORY,
    CATEGORY_EDIT_CATEGORY,
    CATEGORY_ERROR,
    CATEGORY_GET_CATEGORY,
    CATEGORY_GET_CATEGORY_BY_ID,
    CATEGORY_LOADING,
} from '../actions/category/constant';

const initialState = {
    loading: false,
    category: null,
    categoryById: null,
    error: null,
};

export const Category = (state = initialState, { type, payload }) => {
    switch (type) {
        case CATEGORY_LOADING:
            return { ...state, loading: true };

        case CATEGORY_GET_CATEGORY:
            return { ...state, loading: false, category: payload };

        case CATEGORY_ADD_CATEGORY:
            return {
                ...state,
                loading: false,
            };

        case CATEGORY_GET_CATEGORY_BY_ID:
            return { ...state, loading: false, categoryById: payload };

        case CATEGORY_EDIT_CATEGORY:
            return {
                ...state,
                loading: false,
            };
        case CATEGORY_ERROR:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};
