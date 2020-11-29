import * as actionsTypes from "./constants";

const initialState = {};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SIGNUP_REQUEST:
      return { loading: true };
    case actionsTypes.SIGNUP_SUCCESS:
      return { loading: false, user: action.payload };
    case actionsTypes.SIGNUP_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.LOGIN_REQUEST:
      return { loading: true };
    case actionsTypes.LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case actionsTypes.LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { signupReducer, loginReducer };
