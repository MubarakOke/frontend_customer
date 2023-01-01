import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '570px',
  borderRadius: "15px",
  position: 'relative',
};

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
}


const GoogleMap = ({google, position}) => {
  return (
  <div className="boarder rounded-[5px]">
          <Map google={google} zoom={15} containerStyle={containerStyle} style={mapStyles} initialCenter={{ lat: 9.0579, lng: 7.4951}} center={position}> 
           <Marker
           title={'Errander'} 
           position={position} 
           icon={{}}>
             
           </Marker>
          </Map>
        
  </div>)
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBDsQd0v5dn1a9UI1eaM__-eFKRvrgaqbo'
})(GoogleMap);

