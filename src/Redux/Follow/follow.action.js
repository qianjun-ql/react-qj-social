import {
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
} from "./follow.actionType";

export const followUserAction =
  (loggedInUserId, userIdToFollow) => async (dispatch) => {
    dispatch({ type: FOLLOW_USER_REQUEST });
    try {
      console.log(
        "Dispatching follow user request for user",
        loggedInUserId,
        "to follow",
        userIdToFollow
      );
      const response = await api.put(`/api/users/follow/${userIdToFollow}`, {
        loggedInUserId,
      });
      console.log("Follow user success by", loggedInUserId);
      dispatch({ type: FOLLOW_USER_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("Follow user failure:", error);
      dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
    }
  };
