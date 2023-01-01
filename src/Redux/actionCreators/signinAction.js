import * as type from "./types";
import baseApi from "../../Api/baseApi";
import { FetchInitiatedAndRunningOrderAction } from "./orderAction";
import { showSpinner, hideSpinner } from "./spinnerAction";

export const SignInAction = (navigate, formData) => {
  
  return async (dispatch) => {
    try {
      dispatch({type: type.errorLogin, payload: null})
      dispatch(showSpinner())
      const res= await baseApi.post("/account/auth/customer/", formData)
      dispatch({ type: type.signinType, payload: res.data }) 
      // dispatch(FetchInitiatedAndRunningOrderAction())
      navigate("/home/order");
      dispatch(hideSpinner())
      
    } catch (error) {
      dispatch(hideSpinner())
      dispatch({type: type.errorLogin, payload: {"login": error.response.data.error}})
    }
  };
};