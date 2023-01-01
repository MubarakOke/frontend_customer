import React, {useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";
import { RiLogoutCircleFill } from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";



const home = <AiFillHome />;
const profile = <FaUserAlt />;
const blog = <SiGooglemessages />;
const logout = <RiLogoutCircleFill />;

const FootbarContent = [
    {
      link: "/home",
      icon: home,
      title: "Home",
    },
    {
      link: "/blog",
      icon: blog,
      title: "Blog",
    },
    {
      link: "/profile",
      icon: profile,
      title: "Profile",
    }
  ];


function FooterButton() {
    const location = useLocation();

    const renderFootbarContent= ()=>{
        return FootbarContent.map((item, index)=>{
            return (
                    <Link
                    to={item.link}
                    key={index}
                    className={`justify-self-center text-[23px] p-8 flex hover:text-[#0E4E48] ${
                      location.pathname.includes(item.link)
                        ? "text-[#0E4E48]"
                        : "text-[#A6B7AF]"
                    }`}
                    >
                    {item.icon}
                    </Link>
                    )
        })
    }


    return (
    <div className="fixed bottom-[0px] tablet:w-[calc(100%-220px)] w-[100%] z-20">
        {/* -------------Add footer buttons start-------------- */}
        <div className="flex justify-evenly h-[75px] tablet:hidden items-center bg-[#F4F4F4]">
            {renderFootbarContent()}
        </div>
        {/* -------------Add footer buttons ends-------------- */}
    </div>
  )
}

export default FooterButton