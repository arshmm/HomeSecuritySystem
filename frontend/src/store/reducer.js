import * as actionsTypes from "./constants";

const authReducer = (
  state = { loading: false, token: null, id: null },
  action
) => {
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
const detectionReducer = (state = { loading: false, data: [] }, action) => {
  switch (action.type) {
    case actionsTypes.DETECTION_REQUEST:
      return { loading: true };
    case actionsTypes.DETECTION_SUCCESS:
      return { loading: false, data: action.data };
    case actionsTypes.DETECTION_FAILURE:
      return { loading: false, error: action.payload };
    case actionsTypes.CLEAR_HISTORY_REQUEST:
      return { loading: true };
    case actionsTypes.CLEAR_HISTORY_RESPONSE:
      return { ...state, loading: false, data: [] };
    case actionsTypes.CLEAR_HISTORY_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userReducer = (state = { loading: false, data: [] }, action) => {
  switch (action.type) {
    case actionsTypes.GETUSER_REQUEST:
      return { loading: true };
    case actionsTypes.GETUSER_SUCCESS:
      return { loading: false, data: action.data };
    case actionsTypes.GETUSER_FAILURE:
      return { loading: false, error: action.payload };
    case actionsTypes.POSTUSER_REQUEST:
      return { loading: true };
    case actionsTypes.POSTUSER_SUCCESS:
      return { ...state, loading: false, postdata: action.postdata };
    case actionsTypes.POSTUSER_FAILURE:
      return { loading: false, error: action.payload };
    case actionsTypes.DELETEUSER_REQUEST:
      return { loading: true };
    case actionsTypes.DELETEUSER_SUCCESS:
      return { ...state, loading: false, deletedata: action.postdata };
    case actionsTypes.DETECTION_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const snackbarReducer = (
  state = { snackbarOpen: false, snackbarType: "", snackbarMessage: "" },
  action
) => {
  switch (action.type) {
    case actionsTypes.SET_SNACKBAR:
      return {
        snackbarOpen: action.snackbarOpen,
        snackbarType: action.snackbarType,
        snackbarMessage: action.snackbarMessage,
      };
    default:
      return state;
  }
};

export { authReducer, detectionReducer, userReducer, snackbarReducer };
