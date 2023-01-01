import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

const AddOrderButton= () => {
  const [addbuttonscroll, setAddbuttonscroll]= useState({visibility:'visible', scrollposition:0})

  const handleScrolling= ()=>{
    var pageLocation = addbuttonscroll.scrollposition
    if (window.pageYOffset > pageLocation){
        setAddbuttonscroll({visibility:'hidden', scrollposition:window.pageYOffset})
    }
    else{
      setAddbuttonscroll({visibility:'visible', scrollposition:window.pageYOffset})
    }
  }

  useEffect(()=>{
    document.addEventListener('scroll', handleScrolling)

    return ()=>{
      document.removeEventListener('scroll', handleScrolling)
    }
  })

  return (
    <div className="flex items-center justify-center" >
        <div className={`rounded-full fixed bottom-[10px] z-30 ${addbuttonscroll.visibility} bg-[#D7EBE2] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] p-5 mt-12 mb-12 cursor-pointer flex items-center justify-center h-[70px] w-[70px]`}>      
          <Link to="/createOrder">
            <BsPlusLg className="text-[32px] text-[#0E4E48]" />
          </Link>
        </div>
    </div>
  )
}

export default AddOrderButton