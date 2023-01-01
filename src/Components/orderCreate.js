import React from 'react';
import { BsPlusLg } from "react-icons/bs";
import StockForm from "./stockForm";


const OrderCreate= ({stockcount, setStockcount, fields, setFields, setContent})=> {
  

  const StockForms=(index)=>{
    const stockList=[]
    if(index){
      stockList.splice(index, 1)
    }
    for(let i=0; i<=stockcount.count; i++ ){
      stockList.push(<StockForm key={i} stockcount={stockcount} setStockcount={setStockcount} setFields={setFields} fields={fields}  i={i}/>)
    }
    
    return stockList;
  }

 
  return (
    <div className="laptop:relative">
        {/* -------------------Stock Information Start----------------- */}
        <div className="laptop:relative laptop:right-0 laptop:top-0 laptop:w-[370px]">
        {
         StockForms(stockcount.index)
        }
        {/* -------------------Stock Information End----------------- */}
        {/* -------------------Add More Stock Button Start----------------- */}
        <div className="flex justify-center items-center mt-4">
          <div className="p-4 bg-[#D7EBE2] flex justify-center items-center w-[60px] h-[60px] rounded-full cursor-pointer">
            <BsPlusLg onClick={()=>{setStockcount({...stockcount, count: stockcount.count+1})}} className="text-[#0E4E48] text-[26px]" />
          </div>
        </div>
        </div>
        {/* -------------------Add More Stock Button End----------------- */}
        {/* -------------------Relevant Information Start----------------- */}
        <div className="laptop:absolute laptop:right-0 laptop:top-[-15px] laptop:w-[370px]">
        <div className="flex flex-col bg-[#fff] shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] rounded-[30px] px-6 py-5 mt-4">
          <input
            placeholder={"Address to deliver to"}
            type={"text"}
            value={fields.relevant.address||""}
            className="outline-none  p-2 font-medium bg-[#F2F2F2] w-full rounded-[50px] text-[#8E8E8E]"
            onChange={(e)=>setFields({...fields, relevant:{...fields.relevant, address:e.target.value}})}
          />
          <textarea
            rows="3"
            placeholder="Relevant details (optional)"
            className="w-full outline-none p-4 mt-4 rounded-[25px] text-[#8E8E8E] bg-[#F2F2F2] font-medium"
            value={fields.relevant.message||""}
            onChange={(e)=>setFields({...fields, relevant:{...fields.relevant, message:e.target.value}})}
          />
        </div>
        {/* -------------------Relevant Information End----------------- */}
        {/* -------------------Location Information Start----------------- */}
        <div className="flex flex-col bg-[#fff] shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] rounded-[30px] px-6 py-5 mt-4">
          <input
            placeholder={"Prefered Shop Name (Optional)"}
            type={"text"}
            className="outline-none  p-2 font-medium bg-[#F2F2F2] w-full rounded-[50px] text-[#8E8E8E]"
            value={fields.preferred.shopName||""}
            onChange={(e)=>setFields({...fields, preferred:{...fields.preferred, shopName:e.target.value}})}
          />
          <input
            placeholder={"Preferred Shop Location (Optional)"}
            type={"text"}
            className="outline-none mt-4 p-2 font-medium bg-[#F2F2F2] w-full rounded-[50px] text-[#8E8E8E]"
            value={fields.preferred.shopLocation||""}
            onChange={(e)=>setFields({...fields, preferred:{...fields.preferred, shopLocation:e.target.value}})}
          />
        </div>
        
        {/* -------------------Location Information Start----------------- */}
        {/* -------------------Preview Order Button Start----------------- */}
        <div className="mt-10 mb-[80px] flex items-center justify-end">
            <button onClick={()=>setContent(1)} className="mb-5 cursor-pointer  flex items-center justify-center bg-[#0E4E48] rounded-full p-3 text-[#fff] font-medium font-[Roboto] w-1/2"> 
            Preview Order
            </button>
        </div>
        </div>
        {/* -------------------Preview Order Button Start----------------- */}
    </div>
  )
}

export default OrderCreate;