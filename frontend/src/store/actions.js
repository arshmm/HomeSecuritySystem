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
  DETECTION_REQUEST,
  DETECTION_SUCCESS,
  DETECTION_FAILURE,
  GETUSER_REQUEST,
  GETUSER_SUCCESS,
  GETUSER_FAILURE,
  POSTUSER_REQUEST,
  POSTUSER_SUCCESS,
  POSTUSER_FAILURE,
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

const fetchDetections = (token) => async (dispatch) => {
  try {
    dispatch({ type: DETECTION_REQUEST });
    const res = await axios.request({
      method: "get",
      url: "/api/user/data",
      headers: {
        authenticationToken: token,
      },
    });
    dispatch({ type: DETECTION_SUCCESS, data: res.data });
  } catch (error) {
    dispatch({ type: DETECTION_FAILURE, payload: error.message });
  }
};
const getUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: GETUSER_REQUEST });
    const res = await axios.request({
      method: "get",
      url: "/api/user/",
      headers: {
        authenticationToken: token,
      },
    });
    dispatch({ type: GETUSER_SUCCESS, data: res.data });
  } catch (error) {
    dispatch({ type: GETUSER_FAILURE, payload: error.message });
  }
};
const postUser = (formData, token) => async (dispatch) => {
  try {
    dispatch({ type: POSTUSER_REQUEST });
    const headers = {
      authenticationToken: token,
    };
    const res = await axios.post("/api/user/", formData, { headers: headers });
    dispatch({ type: POSTUSER_SUCCESS, postdata: res.data });
  } catch (error) {
    dispatch({ type: POSTUSER_FAILURE, payload: error.message });
  }
};

export { signup, login, logout, fetchDetections, getUsers, postUser };
