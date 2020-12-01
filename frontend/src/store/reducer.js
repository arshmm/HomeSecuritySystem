import * as actionsTypes from "./constants";

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SIGNUP_REQUEST:
      return { loading: true };
    case actionsTypes.SIGNUP_SUCCESS:
      return { loading: false, id: action.id, token: action.token };
    case actionsTypes.SIGNUP_FAILURE:
      return { loading: false, error: action.payload };
    case actionsTypes.LOGIN_REQUEST:
      return { loading: true };
    case actionsTypes.LOGIN_SUCCESS:
      return { loading: false, id: action.id, token: action.token };
    case actionsTypes.LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case actionsTypes.LOGOUT_REQUEST:
      return { loading: true };
    case actionsTypes.LOGOUT_SUCCESS:
      return { loading: false, id: action.id, token: action.token };
    case actionsTypes.LOGOUT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const detectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.DETECTION_REQUEST:
      return { loading: true };
    case actionsTypes.DETECTION_SUCCESS:
      return { loading: false, data: action.data };
    case actionsTypes.DETECTION_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export { authReducer, detectionReducer };
