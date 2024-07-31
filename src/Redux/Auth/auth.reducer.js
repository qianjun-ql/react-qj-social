import {
  FOLLOW_USER_FAIL,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_RECOMMENDED_USERS_FAILURE,
  GET_RECOMMENDED_USERS_REQUEST,
  GET_RECOMMENDED_USERS_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./auth.actionType";

const initialState = {
  jwt: localStorage.getItem("jwt") || null,
  error: null,
  loading: false,
  user: null,
  searchUser: [],
  recommendedUsers: [],
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case GET_RECOMMENDED_USERS_REQUEST:
    case FOLLOW_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, user: action.payload, error: null, loading: false };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, jwt: action.payload, loading: false, error: null };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: action.payload,
        loading: false,
        error: null,
      };

    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          followList: [...state.user.followList, action.payload.followedUserId],
        },
        error: null,
      };

    case GET_RECOMMENDED_USERS_SUCCESS:
      return {
        ...state,
        recommendedUsers: action.payload,
        loading: false,
        error: null,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_RECOMMENDED_USERS_FAILURE:
    case FOLLOW_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
