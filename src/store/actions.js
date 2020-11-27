import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./constants";

const signup = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST, payload: { name, email, password } });
    const { data } = await axios.post("/api/auth/signup", {
      name,
      email,
      password,
    });
    dispatch({ type: SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};
const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST, payload: { email, password } });
    const { data } = await axios.post("/api/auth/login", {
      email,
      password,
    });
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export { signup, login };
