import * as UserApi from "../api/UserRequest.js";

export const UpdateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.UpdateUserApi(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPDATING_FAILED" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER" });
  try {
    await UserApi.followUserApi(id, data);
  } catch (error) {
    console.log(error);
  }
};

export const unFollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER" });

  try {
    await UserApi.unFollowUserApi(id, data);
  } catch (error) {
    console.log(error);
  }
};
