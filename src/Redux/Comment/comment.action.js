import { api } from "../../config/api";
import { getAllPostAction, getUsersPostAction } from "../Post/post.action";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
} from "./comment.actionType";

export const createCommentAction = (reqData, isProfile) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });

  try {
    const { data } = await api.post(
      `/api/comments/post/${reqData.postId}`,
      reqData.data
    );
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
    console.log("comments", data);

    if (isProfile) {
      dispatch(getUsersPostAction(reqData.userId));
    } else {
      dispatch(getAllPostAction());
    }
  } catch (error) {
    dispatch({ type: CREATE_COMMENT_FAILURE, payload: error });
  }
};
