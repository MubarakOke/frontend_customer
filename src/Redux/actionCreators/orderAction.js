import * as type from "./types";
import baseApi from "../../Api/baseApi";
import toast from "react-hot-toast";
import { showSpinner, hideSpinner } from "./spinnerAction";

export const CreateOrderAction = (form, navigate) => {
  var data = JSON.stringify({
    stock_list: Object.values(form.stocks),
    address: form.relevant.address,
    relevant_detail: form.relevant.message,
    preferred_shop: form.preferred.shopName,
    preferred_shop_location: form.preferred.shopLocation,
  });

  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const toastID = toast.loading("Creating Order", {
      position: "top-center",
      style: { color: "#0E4E48" },
    });
    try {
      const response = await baseApi.post(
        "/order/",
        data,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: type.createorderType, payload: response.data });
      navigate("/home/order");
      toast.dismiss(toastID);
      toast.success("Order Created successfully");
    } catch {
      toast.dismiss(toastID);
      navigate("/home/order");
      toast.error("Order was not created");
    }
  };
};

export const DeleteOrderAction = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const toastID = toast.loading("Deleting Order", {
      position: "top-center",
      style: { color: "#0E4E48" },
    });
    try {
      const response = await baseApi.delete(
        `/order/${id}/`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: type.deleteorderType, payload: id });
      toast.dismiss(toastID);
      toast.success("Order deleted successfully");
    } catch (err) {
      toast.dismiss(toastID);
      toast.error(err.response.data.error.details);
    }
  };
};

export const FetchInitiatedAndRunningOrderAction = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      dispatch(showSpinner())
      const response = await baseApi.get(
        "/order/uncompleted/list/",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: type.fetchInitiatedAndRunningOrderType, payload: response.data.data.results });
      dispatch(hideSpinner());
    } catch {
      dispatch(hideSpinner());
      toast.error(
        "Cannot get your active orders, please check your internet connection"
      );
    }
  };
};

export const FetchCompletedOrderAction = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      dispatch(showSpinner())
      const response = await baseApi.get(
        "/order/completed/list/",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: type.fetchCompletedOrderType, payload: response.data.data.results });
      dispatch(hideSpinner());
    } catch {
      dispatch(hideSpinner());
      toast.error(
        "Cannot get your completed order, please check your internet connection"
      );
    }
  };
};

export const SetActiveOrder= (activeOrder)=>{
  return { type: type.activeOrder, payload: activeOrder }
}