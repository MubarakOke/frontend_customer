import * as type from "./types";
import baseApi from "../../Api/baseApi";
import toast from "react-hot-toast";
import { showSpinner, hideSpinner } from "./spinnerAction";

export const FetchPublishedPostAction = (url, q) => {
    return async (dispatch, getState) => {
     
      let uri= "/blog/post-list/publish/"
      let headers={"Content-Type": "application/json"}

      if (q){
          uri += `?q=${q}`
      }
      try {
        dispatch(showSpinner())
        const response = await baseApi.get(url || uri,
          {
            headers
          }
        );
        dispatch({ type: type.fetchPublishedPost, payload: response.data });
        dispatch(hideSpinner());
      } catch {
        dispatch(hideSpinner());
        toast.error(
          "Cannot get published post, please check your internet connection"
        );
      }
    };
  };

  export const setActivePost= (post)=>{
    return { type: type.setActivePost, payload: post }
  }

  export const fetchActivePost= (id)=>{

    return async (dispatch)=>{
        let headers={"Content-Type": "application/json"}

        try {
            dispatch(showSpinner())
            const response = await baseApi.get(`/blog/post/${id}/`,{headers});
            dispatch({ type: type.setActivePost, payload: response.data });
            dispatch(hideSpinner());
          } catch {
            dispatch(hideSpinner());
            toast.error(
              "Cannot get post, please check your internet connection"
            );
          }
    }
  }