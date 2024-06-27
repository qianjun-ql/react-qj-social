import axios from "axios";
import { API_BASE_URL, api } from "../../config/api";
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./auth.actionType";

export const logingUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/login`,
      loginData.data
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    console.log("login success", data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("Error:");
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const registerUserAction = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/register`,
      registerData.data
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    console.log("register success", data);
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("Error:");
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};

export const getProfileAction = (token) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("profile", data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error:");
    dispatch({ type: GET_PROFILE_FAILURE, payload: error });
  }
};

export const updateProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const { data } = await api.post(`${API_BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("upadte profile", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error:");
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
  }
};
