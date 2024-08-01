import {
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
} from "./follow.actionType";

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
    case FOLLOW_USER_REQUEST:
      return { ...state, loading: true, error: null };

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

    case FOLLOW_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
