import {
    DASHBOARD_ADD_SALON,
    DASHBOARD_ERROR,
    DASHBOARD_GET_SALOON,
    DASHBOARD_LOADING,
    DASHBOARD_UPDATE_SALON,
    DASHBOARD_UPDATE_SALON_LOGO,
    DASHBOARD_GET_SALOON_LIST
} from '../actions/dashboard/constant';

const initialState = {
    loading: false,
    userSalon: null,
    error: null,
    salonList: []
};

export const Dashboard = (state = initialState, { type, payload }) => {
    switch (type) {
        case DASHBOARD_LOADING:
            return { ...state, loading: true };

        case DASHBOARD_GET_SALOON_LIST:
            return { ...state, loading: false, salonList: payload }

        case DASHBOARD_GET_SALOON:
            return { ...state, loading: false, userSalon: payload };

        case DASHBOARD_ADD_SALON:
            return { ...state, loading: false, userSalon: payload };

        case DASHBOARD_UPDATE_SALON:
            return { ...state, loading: false };

        case DASHBOARD_UPDATE_SALON_LOGO:
            return {
                ...state,
                loading: false,
                userSalon: { data: { ...state.userSalon.data, salon_logo: payload } },
            };

        case DASHBOARD_ERROR:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};
