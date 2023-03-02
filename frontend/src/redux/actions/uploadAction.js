import * as UploadApi from "../api/UploadRequest";

export const UploadImage = (data) => async (dispatch) => {
  try {
    await UploadApi.UploadImageApi(data);
  } catch (error) {
    console.log("Error in Uploading Img", error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_STARTED" });
  try {
    const newPost = await UploadApi.UploadPostApi(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    dispatch({ type: "UPLOAD_FAILED" });
    console.log(error);
  }
};
