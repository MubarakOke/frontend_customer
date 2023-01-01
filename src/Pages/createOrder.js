import React, { useState } from "react";
import Navbar from "../Components/navbar";
import OrderCreate from "../Components/orderCreate";
import OrderPreview from "../Components/orderPreview";
import FooterButton from "../Components/footerbutton";

const CreateOrder = () => {
  const [hamburger, setHamburger] = useState(0);
  const [content, setContent]= useState(0)
  const [stockcount, setStockcount] = useState({count:0, index:0});
  const [fields, setFields]= useState({
                                      stocks: {},
                                      relevant: {},
                                      preferred:{},
                                      })
  

  const RenderContent=()=>{
    switch (content){
      case 0:
        return (<div className="laptop:w-[755px] tablet:w-[410px] tablet:mx-auto">
          <OrderCreate stockcount={stockcount} setStockcount={setStockcount} fields={fields} setFields={setFields} setContent={setContent}/>
          </div>);
      case 1:
        return (<div className="laptop:w-[755px] tablet:w-[410px] tablet:mx-auto">
          <OrderPreview fields={fields} setContent={setContent}/>
          </div>);
      default:
        return;
    }
  };

  return (
    <div>
      {/* ---------------Navbar Starts--------------- */}
      <Navbar
        title={content===0?"Create Order":"Preview Order"}
        hamburger={hamburger}
        setHamburger={setHamburger}
        show="customer"
      />
      {/* ---------------Navbar Ends--------------- */}
      <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
      <div className={`${hamburger ? "blur-sm" : ""} h-screen pt-[100px] z-0 px-6`}>
      {/* ---------------Content Rendering Starts--------------- */}
        {RenderContent()}
      {/* ---------------Content Rendering Ends--------------- */}
      </div>
      <FooterButton/>
      </div>
    </div>
  );
};

export default CreateOrder;
