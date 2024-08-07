import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  SAVE_POST_SUCCESS,
  SAVE_POST_REQUEST,
  SAVE_POST_FAILURE,
} from "./post.actionType";

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  userPosts: [],
  like: null,
  commentList: [],
  newComment: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case GET_USERS_POST_REQUEST:
    case SAVE_POST_REQUEST:
      return { ...state, error: null, loading: true };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      };

    // case SAVE_POST_SUCCESS:
    //   return {
    //     ...state,
    //     user: action.payload,
    //     loading: false,
    //   };

    case SAVE_POST_SUCCESS:
      const { postId, saved } = action.payload;
      return {
        ...state,
        savedPosts: saved
          ? [
              ...state.savedPosts,
              state.userPosts.find((post) => post.id === postId),
            ]
          : state.savedPosts.filter((post) => post.id !== postId),
        loading: false,
      };

    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        commentList: action.payload.commentList,
        loading: false,
        error: null,
      };

    case GET_USERS_POST_SUCCESS:
      return {
        ...state,
        userPosts: action.payload,
        commentList: action.payload.commentList,
        loading: false,
        error: null,
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        like: action.payload,
        posts: state.posts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      };

    case CREATE_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case GET_USERS_POST_FAILURE:
    case SAVE_POST_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
