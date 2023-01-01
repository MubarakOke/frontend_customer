import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import NoCompletedOrder from "../../Components/noCompletedOrder";
import FooterButton from "../../Components/footerbutton";
import CompletedOrderModal from "../../Components/completedOrderModal";
import {FetchCompletedOrderAction} from "../../Redux/actionCreators/orderAction";



const Order = () => {
  const completedOrders = useSelector((state) => state.completedOrder);
  const dispatch= useDispatch();

  useEffect(()=>{
      dispatch(FetchCompletedOrderAction())
  }, []);


  const renderOrderModal= (order, index, margin)=>{
        return (
          <div className="laptop:w-[70]">
            <CompletedOrderModal key={index} order={order} print={true} arrowVisible={1} />
          </div>
        );
  }

  const renderList = () => {
    if (completedOrders){
      const ordersArr=Object.values(completedOrders)
      return ordersArr.map((order, index) => {
        return renderOrderModal(order, index)
      });
    }
    else{
      return
    }
  };

  const renderContent = () => {
    const list = renderList();
    if (list && list.length === 0) {
      return (
        <NoCompletedOrder
          title1="You have no completed order"
          title2=""
        />
      );
    }

    return (
      <div className="tablet:grid tablet:grid-cols-1 laptop:grid-cols-2 bigscreen:grid-cols-3 tablet:gap-2">
      {list}
      </div>);
  };

  return (<div className="">
    <div className="px-6 z-5 tablet:mb-[50px] mb-[95px] mt-[50px]">
    {renderContent()}
    </div>
    <FooterButton />
    </div>);
};

export default Order;
 