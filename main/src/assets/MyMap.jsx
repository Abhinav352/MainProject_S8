import React from "react"
import { Map, Marker } from "pigeon-maps"
import { useParams } from 'react-router-dom';

export function MyMap() {
    const { latitude, longitude } = useParams();
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    return (
        <div style={{ width: '100vw', height: '100vh' }}> {/* Set width and height to fill the viewport */}
            <Map height={'100%'} defaultCenter={[lat, lng]} defaultZoom={11} provider={(x, y, z) => {
              const s = String.fromCharCode(97 + ((x + y + z) % 3))
              return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
            }}>
                <Marker width={50} anchor={[lat, lng]} />
            </Map>
        </div>
    )
}