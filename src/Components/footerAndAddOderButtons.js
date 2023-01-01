import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
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


function FooterAndAddOderButtons() {
    const [addbuttonscroll, setAddbuttonscroll]= useState({visibility:'visible', scrollposition:0})
    const navigate = useNavigate();
    const location = useLocation();

    const handleScrolling= ()=>{
        var pageLocation = addbuttonscroll.scrollposition
        if (window.pageYOffset > pageLocation){
            setAddbuttonscroll({visibility:'hidden', scrollposition:window.pageYOffset})
        }
        else{
        setAddbuttonscroll({visibility:'visible', scrollposition:window.pageYOffset})
        }
    }

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

    useEffect(()=>{
        document.addEventListener('scroll', handleScrolling)
    
        return ()=>{
          document.removeEventListener('scroll', handleScrolling)
        }
      })

    return (
    <div className="fixed bottom-[0px] tablet:w-[calc(100%-220px)] w-[100%] z-20">
       {/* -------------Add order button start-------------- */}
        <div className="flex flex-col">
        <div className="flex items-center justify-center relative top-3" >
        <Link to="/createorder">
            <div className={`rounded-full z-30 bg-[#D7EBE2] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] ${addbuttonscroll.visibility} p-5 cursor-pointer flex items-center justify-center h-[70px] w-[70px]`}>            
                    <BsPlusLg className="text-[32px] text-[#0E4E48]" />    
            </div>
            </Link>
        </div>
        {/* -------------Add order button ends-------------- */}
        {/* -------------Add footer buttons start-------------- */}
        <div className="flex justify-evenly h-[75px] tablet:invisible items-center bg-[#F4F4F4]">
            {renderFootbarContent()}
        </div>
        {/* -------------Add footer buttons ends-------------- */}
        </div>
    </div>
  )
}

export default FooterAndAddOderButtons