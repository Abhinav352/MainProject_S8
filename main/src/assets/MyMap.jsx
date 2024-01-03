import React from "react"
import { Map, Marker } from "pigeon-maps"
import { useParams } from 'react-router-dom';

export function MyMap() {
    const { latitude, longitude } = useParams();
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
  return (
    <div>
        
    <Map height={300} width={600} defaultCenter={[lat, lng]} defaultZoom={11}>
      <Marker width={50} anchor={[lat, lng]} />
    </Map>
    </div>
  )
}