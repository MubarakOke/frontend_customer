import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NoInitiatedOrRunningOrder from "../../Components/noInitiatedOrRunningOrder";
import { useSelector } from "react-redux";
import FooterButton from "../../Components/footerAndAddOderButtons";
import InitiatedOrderModal from "../../Components/initiatedOrderModal";
import RunningOrderModal from "../../Components/runningOrderModal";
import CompletedOrderModal from "../../Components/completedOrderModal";
import { FetchInitiatedAndRunningOrderAction} from "../../Redux/actionCreators/orderAction";


const Order = () => {
  const initiatedAndRunningOrders = useSelector((state) => state.initiatedAndRunningOrder);
  const dispatch= useDispatch();

  useEffect(()=>{
      dispatch(FetchInitiatedAndRunningOrderAction())
  }, []);

  const renderOrderModal= (order, index, margin)=>{
    switch(order.status){
      case "initiated":
        return (
          <div className="laptop:w-[70]">
          <InitiatedOrderModal
            key={index}
            order={order}
            arrowVisible={1}
          />
          </div>
        );
      case "running":
        return (
          <div className="laptop:w-[70]">
            <RunningOrderModal 
              key={index}
              order={order}
              arrowVisible={1}
            />
          </div>)
      case "completed":
        return <CompletedOrderModal />
      default:
        return
    }
  }

  const renderList = () => {
    if(initiatedAndRunningOrders){
      const ordersArr=Object.values(initiatedAndRunningOrders)
      return ordersArr.map((order, index) => {
        var margin
        if (index===ordersArr.length-1){
          margin="50px"
        }
        return renderOrderModal(order, index, margin)
      });
    }
    else{return}
  };


  const renderContent = () => {
    const list = renderList();
    if (list && list.length === 0) {
      return (
        <NoInitiatedOrRunningOrder
          title1="You have no order!"
          title2="Create order(s) now."
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
    </div>)
};

export default Order;
