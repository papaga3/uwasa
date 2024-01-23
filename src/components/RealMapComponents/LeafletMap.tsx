import { LatLngExpression } from "leaflet";
import { FC, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents } from "react-leaflet";
import { LocationMarker } from "./LocationMarker";
import { NavBar } from "components/NavBar";

interface Props {}

export const LeafletMap: FC<Props> = () => {
   const mapRef = useRef(null);
   const centerPosition: LatLngExpression = { 
      lat: 63.0951, 
      lng :21.6165
   }

   return (
      <div>
         <NavBar />
         <MapContainer
            center={centerPosition}
            ref={mapRef}
            style={{height: "800px", width: "1200px"}}
            zoom={8}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
               <LocationMarker centerPosition={centerPosition}/>
         </MapContainer>
      </div>
   );
}
