import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "./constants";

const signup = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });
    const { data } = await axios.post("/api/auth/signup", {
      name,
      email,
      password,
    });
    const { id, token } = data;
    dispatch({ type: SIGNUP_SUCCESS, id: id, token: token });
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post("/api/auth/login", {
      email,
      password,
    });
    const { id, token } = data;
    dispatch({ type: LOGIN_SUCCESS, id: id, token: token });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    const { data } = await axios.get("/api/auth/logout");
    const { id, token } = data;
    dispatch({ type: LOGOUT_SUCCESS, id: id, token: token });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.message });
  }
};

export { signup, login, logout };
