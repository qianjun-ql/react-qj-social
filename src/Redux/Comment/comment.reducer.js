import { CREATE_COMMENT_SUCCESS } from "./comment.actionType";

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  like: null,
  commentList: [],
  newComment: null,
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT_SUCCESS:
      console.log("CREATE_COMMENT_SUCCESS action payload:", action.payload);
      return {
        ...state,
        newComment: action.payload,
        // commentList: [action.payload, ...state.commentList],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
