import { toast } from "react-hot-toast";
import * as AuthApi from "../api/AuthRequest";

export const login = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.loginApi(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    toast.success("Login Successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILED" });
    toast.error(error.response.data.message);
  }
};

export const Signup = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.SignUpApi(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    toast.success("Account Created Successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILED" });
    toast.error(error.response.data.message);
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
