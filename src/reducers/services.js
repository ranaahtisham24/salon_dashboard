import {
    SERVICE_ADD_SERVICE,
    SERVICE_EDIT_SERVICE,
    SERVICE_ERROR,
    SERVICE_GET_SERVICE,
    SERVICE_GET_SERVICE_BY_ID,
    SERVICE_LOADING,
    SERVICE_RESET_SERVICE_BY_ID,
} from '../actions/service/constants';

const initialState = {
    loading: false,
    services: null,
    servicesById: null,
    error: null,
};

export const Services = (state = initialState, { type, payload }) => {
    switch (type) {
        case SERVICE_LOADING:
            return { ...state, loading: true };

      case SERVICE_GET_SERVICE:
            return { ...state, loading: false, services: payload };

      case SERVICE_ADD_SERVICE:
          return {
              ...state,
              loading: false,
          };

        case SERVICE_GET_SERVICE_BY_ID:
            return { ...state, loading: false, servicesById: payload };

        case SERVICE_EDIT_SERVICE:
            return {
                ...state,
                loading: false,
            };

        case SERVICE_RESET_SERVICE_BY_ID:
            return {
                ...state,
                loading: false,
                servicesById: null
            };
      case SERVICE_ERROR:
          return { ...state, loading: false, error: payload };

      default:
          return state;
  }
};
