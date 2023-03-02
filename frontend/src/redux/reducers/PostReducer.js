const PostReducer = (
  state = { posts: [], loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "UPLOAD_STARTED":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        loading: false,
        error: false,
      };

    case "UPLOAD_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    // belongs to Posts.jsx
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAILED":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default PostReducer;
