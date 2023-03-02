import * as PostApi from "../api/PostRequest";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostApi.getTimeLinePostApi(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAILED" });
  }
};

// export const likePost = (postId, userId) => async (dispatch) => {
//   dispatch({ type: "LIKED_POST" });
//   try {
//     await PostApi.likePostApi(postId, userId);
//   } catch (error) {}
// };
