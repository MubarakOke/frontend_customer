import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./Pages/login";
import Home from "./Pages/home/home";
import Profile from "./Pages/profile/profile";
import ProfileEdit from "./Pages/profile/profileEdit";
import SignUp from "./Pages/signUp";
import CreateOrder from "./Pages/createOrder";
import Order from "./Pages/home/order";
import Running from "./Pages/home/running";
import History from "./Pages/home/history";
import Blog from "./Pages/blog";
import PostDetail from "./Pages/postDetail";
import ForgetPassword from "./Pages/forgetPassword";
import ForgetPasswordReset from "./Pages/forgetPasswordReset";

import LoadingOverlay from 'react-loading-overlay'
import SyncLoader from 'react-spinners/SyncLoader'
import { Toaster } from "react-hot-toast";
import { useSelector} from "react-redux";
import { RequireAuth } from "./Utils/requireAuth";


const App = () => {
  const spinnerState= useSelector((state)=>state.spinner)
  return (
    <div>
      {/* ----------------Notification Begins------------- */}
      <LoadingOverlay
        active={spinnerState}
        spinner={<SyncLoader color={'#0E4E48'}/>}
        styles={{
          overlay: (base) => ({
            ...base,
            position: 'fixed'
            })
          }}
       >

      <div>
        <Toaster
          toastOptions={{
            success: {
              duration: 5000,
              position: "top-center",
              style: { background: "#0E4E48", color: "white" },
            },
            error: {
              duration: 5000,
              position: "top-center",
              style: { background: "red", color: "white" },
            },
          }}
          containerStyle={{ top: 50 }}
        />
      </div>
      {/* ----------------Notification Ends------------- */}
      {/* -----------Routes Begins--------------- */}
      <Routes>
        <Route path="/home" element={<RequireAuth loginPath="/"><Home /></RequireAuth> }>
          <Route index element={<Navigate to="/home/order" />} />
          <Route path="/home/order" element={<Order />} />
          <Route path="/home/running" element={<Running />} />
          <Route path="/home/history" element={<History />} />
        </Route>
        <Route path="/profile" element={<RequireAuth loginPath="/"><Profile /></RequireAuth>} />
        <Route path="/profile/edit" element={<RequireAuth loginPath="/"><ProfileEdit /></RequireAuth>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<PostDetail />} />
        <Route path="/createorder" element={<CreateOrder />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/change-forget-password/:token/:user" element={<ForgetPasswordReset />} />
        <Route path="/" element={<Login />} />
      </Routes>
      {/* -----------Routes Ends--------------- */}
      </LoadingOverlay>
    </div>
  );
};

export default App;
