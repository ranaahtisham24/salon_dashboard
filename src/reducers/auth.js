import {
    AUTH_CHANGE_PASSWORD,
    AUTH_CLOSE_MODAL,
    AUTH_ERROR,
    AUTH_LOADING,
    AUTH_PROFILE_PIC,
    AUTH_RESEND_OTP,
    AUTH_RESET_PASSWORD,
    AUTH_SIGNIN,
    AUTH_ADMIN_SIGNIN,
    AUTH_SIGNUP,
    AUTH_UPDATE_EMAIL,
    AUTH_UPDATE_PHONE,
    AUTH_USER_NAME,
} from '../actions/auth/constant';

const initialState = {
    loading: false,
    isModalOpen: false,
    user: null,
    email: null,
    error: null,
};

export const Auth = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_LOADING:
            return { ...state, loading: true };

        case AUTH_SIGNUP:
            return { ...state, loading: false, email: payload };

        case AUTH_SIGNIN:
            console.log('-1-1-1',payload)
            return { ...state, loading: false, user: payload };

        case AUTH_ADMIN_SIGNIN:
            return { ...state, loading: false, user: payload }

        case AUTH_RESEND_OTP:
            return { ...state, loading: false };

        case AUTH_RESET_PASSWORD:
            return { ...state, loading: false };

        case AUTH_PROFILE_PIC:
            return { ...state, loading: false, user: { data: { ...state.user.data, user: payload } } };

        case AUTH_USER_NAME:
            return { ...state, loading: false, isModalOpen: true ,
            user: {...state.user , data : { ...state.user.data , user : { ...state.user.data.user, lastName: payload.lastName  ,firstName: payload.firstName} }}};

        case AUTH_UPDATE_EMAIL:
            return { ...state, loading: false, user: payload, isModalOpen: true ,
                // user: {...state.user , data : { ...state.user.data , user : { ...state.user.data.user, email: payload.email } }}
            };

            
        case AUTH_UPDATE_PHONE:
            return { ...state, loading: false, user: payload, isModalOpen: true ,
                // user: {...state.user , data : { ...state.user.data , user : { ...state.user.data.user, phoneNumber: payload.phoneNumber } }}
            };

        case AUTH_CHANGE_PASSWORD:
            return { ...state, loading: false, user: payload, isModalOpen: true };

        case AUTH_CLOSE_MODAL:
            return { ...state, loading: false, isModalOpen: false };

        case AUTH_ERROR:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};
