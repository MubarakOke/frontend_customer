import React from 'react'
import { AiOutlineMinusCircle } from "react-icons/ai";
import _ from 'lodash'



const stockForm= ({fields, setFields, i, stockcount, setStockcount})=> {

  const fieldsAvailable= (param)=>{
    if(fields.stocks[i]){
      return fields.stocks[i][param]
    }
    else{
      return ""
    }
  }

  const changeValue= ()=>{
    setStockcount({count: stockcount.count-1, index: i});
    const field= {...fields, stocks:{..._.omit(fields.stocks, i)}}
    for (const key in Object.keys(fields.stocks)){
      if (key>i){
       delete Object.assign(field.stocks, {[key-1]:field.stocks[key]})[key] 
      }
    }
    setFields(field);
  }
  

  return (<div className="relative top-0 left-0">
          {i>=1&&<div><AiOutlineMinusCircle onClick={()=>{ changeValue() }} size={32} className="text-[red] text-[26px] absolute z-[100] top-[-10px] right-[-5px]" /></div>}
          <div className="flex flex-col bg-[#fff] mb-6 shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)] rounded-[30px] px-6 py-5">
            <input
              placeholder={"Name"}
              type="text"
              className="outline-none  p-2 font-medium bg-[#F2F2F2] w-full rounded-[50px] text-[#8E8E8E]"
              value={fieldsAvailable('name')||""}
              onChange={(e)=>setFields({...fields, stocks:{...fields.stocks, [i]:{...fields.stocks[i], name:e.target.value}}})}
            />
            <input
              placeholder={"Quantity"}
              type="number"
              className="outline-none mt-4 p-2 font-medium bg-[#F2F2F2] w-full rounded-[50px] text-[#8E8E8E]"
              value={fieldsAvailable('quantity')||""}
              onChange={(e)=>setFields({...fields, stocks:{...fields.stocks, [i]:{...fields.stocks[i], quantity:e.target.value}}})}
            />
            <input
              placeholder={"Price"}
              type="number"
              className="outline-none mt-4 p-2 font-medium bg-[#F2F2F2] w-full rounded-[50px] text-[#8E8E8E]"
              value={fieldsAvailable('price')||""}
              onChange={(e)=>setFields({...fields, stocks:{...fields.stocks, [i]:{...fields.stocks[i], price:e.target.value}}})}
            />
            </div>
          </div>
  )
}

export default stockForm;