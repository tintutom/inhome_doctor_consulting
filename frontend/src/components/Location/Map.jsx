import React from 'react'
import {MapContainer,TileLayer} from 'react-leaflet';
import GeoCoderMarker from '../Location/GeoCoderMarker';

const Map = ({address,city}) => {
  return (
  <MapContainer
  center={[53.35,18.8]}
  zoom={1}
  scrollWheelZoom={false}
  style={{
    height:"60vh",
    width:"60%",
    marginTop:"20px",
    marginLeft:"20rem",
    zIndex:0,
    
  }}
  >
  <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
  <GeoCoderMarker address={`${address} ${city}`}/>
  </MapContainer>
  )
}

export default Map