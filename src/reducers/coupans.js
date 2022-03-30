import {
    COUPANS_ADD_COUPANS,
    COUPANS_EDIT_COUPANS,
    COUPANS_ERROR,
    COUPANS_GET_COUPANS,
    COUPANS_GET_COUPANS_BY_ID,
    COUPANS_LOADING,
    COUPANS_RESET_COUPANS_BY_ID,
    GET_SALON_BY_ID,
    RESET_SALON_BY_ID
} from '../actions/coupans/constant';

const initialState = {
    loading: false,
    coupans: null,
    coupansById: null,
    error: null,
    salonData: null,
    salonById: null
};

export const Coupans = (state = initialState, { type, payload }) => {
    switch (type) {
        case COUPANS_LOADING:
            return { ...state, loading: true };

        case COUPANS_GET_COUPANS:
            return { ...state, loading: false, coupans: payload };

        case COUPANS_ADD_COUPANS:
            return {
                ...state,
                loading: false,
            };

        case COUPANS_GET_COUPANS_BY_ID:
            return { ...state, loading: false, coupansById: payload };

        case COUPANS_EDIT_COUPANS:
            return {
                ...state,
                loading: false,
                coupansById: null,
            };

        case COUPANS_RESET_COUPANS_BY_ID:
            return {
                ...state,
                loading: false,
                coupansById: null,
            };

        case RESET_SALON_BY_ID:
            return {
                ...state,
                loading: false,
                salonData: null,
            };

        case GET_SALON_BY_ID:
            return {
                ...state,
                loading: false,
                salonData: payload
            }

        case COUPANS_ERROR:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};
