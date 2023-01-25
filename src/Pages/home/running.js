import React, {useState, useEffect} from "react";
import { useSelector} from "react-redux";
import toast from "react-hot-toast";
import FooterButton from "../../Components/footerbutton";
import NoRunningOrder from "../../Components/noRunningOrder";
import Map from "../../Components/map";


const Running = ({google}) => {
  const activeOrder= useSelector((state)=>state.activeOrder)
  const [webSocket, setWebSocket]= useState(null)
  const webSocketRef = React.useRef(webSocket)
  const [webSocketConnected, setWebSocketConnected]= useState(false) 
  const [position, setPosition]= useState({lat: null, long: null })
  const [toastID, setToastID]= useState(null)
  const toastIDRef = React.useRef(toastID)

  // create websockect connection when there is active order
  useEffect(()=>{
    if (!position.lat && !position.long && activeOrder){
      let toastID= toast.loading("Getting errander location", {position: "top-center", style: { color: "#0E4E48" }});
      setToastID(toastID)
      toastIDRef.current= toastID
    }

    if(activeOrder && activeOrder.errander && !webSocketConnected){
      let websocketConnection= new WebSocket(`ws://${process.env.REACT_APP_BACKEND_BASE_URL}/ws/errander/${activeOrder.errander.id}/`)
      setWebSocket(websocketConnection)
      setWebSocketConnected(true)
      webSocketRef.current= websocketConnection
      }
  }, [activeOrder])

  // disconnect from websocket when user navigates away from page
  useEffect(() => {
    return ()=>{
      if (webSocketRef.current){
        webSocketRef.current.close()
        setWebSocketConnected(false)
        setWebSocket(null)
        webSocketRef.current= null
      }

      if (toastIDRef){
        toast.dismiss(toastIDRef)
        setToastID(null)
        toastIDRef.current= null
      }
    }
  }, [])

  if (webSocket){
    webSocket.onopen= (e)=>{
      setWebSocketConnected(true)
    }
    webSocket.onmessage = (e)=> {
      setPosition(JSON.parse(e.data).coordinates)
      if (toastID){
        toast.dismiss(toastID);
      }
    }
    webSocket.onerror= ()=>{
      if (toastID){
        toast.dismiss(toastID)
        toast.error("Unable to get errander location")
      }
    }
    webSocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
      setWebSocketConnected(false)
      if (toastID){
        toast.dismiss(toastID)
      }
    }
  }
 
  return (
    <div>
      <div className="px-6 z-5 tablet:mb-[50px] mt-[40px]">
          {activeOrder? <Map position={{lat: position.lat, lng: position.long}} />:<NoRunningOrder />}
      </div>
      <FooterButton/>
    </div>)
};

export default Running

