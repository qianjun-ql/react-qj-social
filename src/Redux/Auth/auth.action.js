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
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  GET_RECOMMENDED_USERS_REQUEST,
  GET_RECOMMENDED_USERS_SUCCESS,
  GET_RECOMMENDED_USERS_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  GET_USER_SAVED_POSTS_REQUEST,
  GET_USER_SAVED_POSTS_SUCCESS,
  GET_USER_SAVED_POSTS_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILURE,
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

export const getProfileAction = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });

  try {
    const jwt = localStorage.getItem("jwt");
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROFILE_FAILURE, payload: error.response.data });
  }
};

export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const { data } = await api.put(`${API_BASE_URL}/api/users`, reqData);

    console.log("upadte profile", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error:");
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
  }
};

export const searchUserAction = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });

  try {
    const { data } = await api.get(`/api/users/search?query=${query}`);

    console.log("saerch user: ", data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error:");
    dispatch({ type: SEARCH_USER_FAILURE, payload: error });
  }
};

export const getRecommendedUsersAction = () => async (dispatch) => {
  dispatch({ type: GET_RECOMMENDED_USERS_REQUEST });
  try {
    const jwt = localStorage.getItem("jwt");
    const { data } = await api.get("/api/users", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_RECOMMENDED_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RECOMMENDED_USERS_FAILURE, payload: error });
  }
};

export const followUserAction =
  (loggedInUserId, userIdToFollow) => async (dispatch) => {
    dispatch({ type: FOLLOW_USER_REQUEST });
    try {
      const { data } = await api.put(`/api/users/follow/${userIdToFollow}`, {
        loggedInUserId,
      });
      dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FOLLOW_USER_FAILURE, payload: error });
    }
  };

export const getUserSavedPosts = () => async (dispatch) => {
  dispatch({ type: GET_USER_SAVED_POSTS_REQUEST });

  try {
    const jwt = localStorage.getItem("jwt");
    const { data } = await api.get(`/api/users/saved-posts`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("saved posts", data);
    dispatch({ type: GET_USER_SAVED_POSTS_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error:", error.response ? error.response.data : error.message);
    dispatch({
      type: GET_USER_SAVED_POSTS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getUserById = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_BY_ID_REQUEST });

  try {
    const jwt = localStorage.getItem("jwt");
    const { data } = await api.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("get userid", data);
    dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error:", error.response ? error.response.data : error.message);
    dispatch({
      type: GET_USER_BY_ID_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const logOutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_REQUEST });

  try {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAILURE, payload: error.message });
  }
};
