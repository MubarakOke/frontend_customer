import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {BsCalendar2DayFill, BsFillChatSquareTextFill, BsArrowRight,} from "react-icons/bs";
import { AiFillPhone, AiTwotoneShop } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch } from "react-redux";
import { DeleteOrderAction } from "../Redux/actionCreators/orderAction";

const Modal = ({order, arrowVisible}) => {
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();

  const deleteOrder = () => {
    dispatch(DeleteOrderAction(order.id));
  };

  return (
    <div> 
      {/* ====================Modal Start============================= */}
      <div className={`mt-5 pb-5 rounded-[30px] z-30 shadow-[1px_-2px_51px_-12px_rgba(0,0,0,0.25)]`}>
        {/* ---------------------Modal Header  Start---------------------------- */}
        <div>
          {/* ----------------------------Title--------------------  */}
          <div className="flex justify-between bg-[#fff] mb-3  rounded-t-[30px]">
            <div className="flex flex-row p-5 font-bold text-[#616262] tablet:text-[18px]">
              Order {order.id}
            </div>
            {dropdown ? (
              <div className="flex flex-row p-5">
                <IoIosArrowUp
                  className="text-[24px]"
                  onClick={() => setDropdown(false)}
                />
              </div>
            ) : (
              <div className="flex flex-row p-5">
                <IoIosArrowDown
                  className="text-[24px]"
                  onClick={() => setDropdown(true)}
                />
              </div>
            )}
             <div
        className={`flex items-center  justify-center bg-[#FDBC3F] w-2/5 p-5 rounded-tr-[30px] rounded-bl-[15px]`}>
          <span className="text-[15px] tablet:text-[18px] font-bold text-[white]">Initiated</span>
          <div className="ml-2 text-[20px] text-[red] cursor-pointer">
            <ImCancelCircle
              onClick={() => {
                deleteOrder();
              }}
              size="25px"
            />
          </div>
        </div>
          </div>
          {/* ----------------------------Direction--------------------  */}
          <div className="flex flex-col bg-[#fff] px-5 rounded-b-[30px]">
            <div className="flex justify-between py-4 px-6 font-medium bg-[#F2F2F2] items-center w-full rounded-[50px] text-[#2c2c2c]">
              <span className="tablet:text-[20px] text-[18px] w-[42%] break-words">{order.address}</span>{" "}
              {arrowVisible ? <div className="w-[16%] flex justify-center"><BsArrowRight className="text-[24px]" /></div> : ""}{" "}
              <span className="tablet:text-[20px] text-[18px] w-[42%] break-words">{order.preferred_shop_location}</span>
            </div>
          </div>
        </div>
        {/* ---------------------Modal Header End---------------------------- */}
        {/* ----------------------------Modal Body Start--------------------  */}
        <div
          className={`flex flex-col bg-[#fff] px-5 ${
            dropdown ? "" : "hidden"
          } rounded-b-[30px]`}
        >
          {/* ----------------------------content--------------------  */}
          {<div className="mt-4">
              <div class="table table-fixed w-full">
                <div class="table-header-group">
                    <div class="table-row">
                    <div class="table-cell tablet:text-[20px] w-[45%] font-bold text-[#0E4E48] text-[18px] pr-3">Order item(s)</div>
                    <div class="table-cell tablet:text-[20px] font-bold text-[#0E4E48] text-[18px] pr-3">Quantity</div>
                    <div class="table-cell tablet:text-[20px] font-bold text-[#0E4E48] text-[18px] pr-3">Price</div>
                    </div>
                </div>
                <div class="table-row-group">
                    {order.stock.map((value, id) => {
                        return (      
                                <div class="table-row">
                                    <div class="table-cell tablet:text-[20px] text-[18px] break-words pr-3">{value.name}</div>
                                    <div class="table-cell tablet:text-[20px] text-[18px] break-words pr-3">{value.quantity}</div>
                                    <div class="table-cell tablet:text-[20px] text-[18px] break-words pr-3">{value.price}</div>
                                </div>
                        );
                    })}   
                </div> 
              </div>  
            </div>}

          <div className="mt-4">
            <div className="flex flex-col items-start col-span-2">
              {order.date_created ? (
                <div className="flex items-center">
                  <div>
                    <BsCalendar2DayFill className="text-[#0E4E48] tablet:text-[18px]" />
                  </div>
                  <span className="ml-4 tablet:text-[20px] text-[18px] break-words">{order.date_completed}</span>
                </div>
              ) : (
                ""
              )}
              {order.preferred_shop ? (
                <div className="flex mt-2 items-center">
                  <div>
                    <AiTwotoneShop className="text-[#0E4E48] text-[17px] tablet:text-[19px]" />
                  </div>

                  <span className="ml-4 text-[18px] tablet:text-[18px] break-words">{order.preferred_shop}</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {order.relevant_detail ? (
                <div className="flex mt-2 items-start">
                  <div>
                    <BsFillChatSquareTextFill className="text-[#0E4E48] text-[15px] mt-2 tablet:text-[18px]" />
                  </div>

                  <span className="ml-4 tablet:text-[20px] break-words text-[18px]">{order.relevant_detail}</span>
                </div>
              ) : (
                ""
            )}
          {/* ----------------------------content end--------------------  */}
        </div>
        {/* ----------------------------Modal Body end--------------------  */}
      </div>
      {/* ====================Modal End============================= */}
    </div>
  );
};

export default Modal;
