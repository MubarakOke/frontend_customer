import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Components/navbar";


const Home = () => {
  const [hamburger, setHamburger] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState();
  const location = useLocation();


  return (
    <div>
      {/* --------------Navigation begins------------------ */}
      <Navbar title="Home" hamburger={hamburger} setHamburger={setHamburger}/> 
      {/* --------------Navigation ends------------------ */}
      {/* --------------Blurring div starts------------------ */}
      <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
      <div className={`${hamburger ? "blur-sm" : ""} h-screen`}>
      {/* --------------Home navigation begins------------------ */}
      <div className={"z-50 tablet:pt-[70px] pt-[87px]"}>
        <div className=" px-6 tablet:w-[calc(100%-220px)] w-full fixed bg-[#F4F4F4] flex justify-center">
          <div className="tablet:w-[50%]  w-[80%] flex items-center justify-between">
            <Link
              onClick={()=>{setActiveTab(0)}}
              to="/home/order"
              className={`${
                location.pathname.includes("/home/order")
                  ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                  : "text-[#999A9A]"
              } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
            >
              Order
            </Link>
            <Link
              to="/home/running"
              onClick={()=>{setActiveTab(1)}}
              className={`${
                location.pathname.includes("/home/running")
                  ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                  : "text-[#999A9A]"
              } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
            >
              Running
            </Link>
            <Link
              to="/home/history"
              onClick={()=>{setActiveTab(2)}}
              className={`${
                location.pathname.includes("/home/history")
                  ? "text-[#0E4E48] font-semibold border-b-2 border-[#0E4E48]"
                  : "text-[#999A9A]"
              } cursor-pointer transition duration-300 font-[Roboto] font-bold text-[18px]`}
            >
              History
            </Link>
          </div>
        </div>
      </div>
      {/* --------------Home navigation ends------------------ */}
      {/* --------------page content starts------------------- */}
        <div className="font-[Roboto]">
          <Outlet />
        </div>
      {/* --------------page content ends------------------- */}
        </div>
        </div>
      {/* --------------Blurring div ends------------------ */}
    </div>
  );
};

export default Home;
