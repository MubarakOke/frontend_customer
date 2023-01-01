import * as type from "./types";
import baseApi from "../../Api/baseApi";
import toast from "react-hot-toast";
import { showSpinner, hideSpinner } from "./spinnerAction";

export const SignupAction = (navigate, formData) => {
  return async (dispatch) => {
    try {
      dispatch({type: type.errorSignup, payload: null})
      dispatch(showSpinner())
      const response= await baseApi.post("/customer/signup/", formData)
      dispatch({ type: type.signupType, payload: response.data })
      navigate("/")
      dispatch(hideSpinner())
      toast.success("Account created successfully, check your email for verification link", {duration:5});
    } catch (error) {
      dispatch({type: type.errorLogin, payload: {"signup": error.response.data.error}})
      dispatch(hideSpinner())
    }
  };
};