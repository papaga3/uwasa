import { LatLng, LatLngExpression } from "leaflet";
import { FC, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import  _stationMapData from "../../data/realStationMapData.json";
import { LocationMarker } from "./LocationMarker";
import { NavBar } from "components/NavBar";
import { WarehouseMarker } from "./WarehouseMarker";
import RoutingMachine from "./RoutingMachine";
import { StationMapData } from "types";

interface Props {}

export const LeafletMap: FC<Props> = () => {
   const mapRef = useRef(null);
   const centerPosition: LatLngExpression = { 
      lat: 63.0951, 
      lng :21.6165
   }
   const stationMapDataList: StationMapData[] = _stationMapData as StationMapData[];

   return (
      <div>
         <MapContainer
            center={centerPosition}
            ref={mapRef}
            style={{height: "1000px", width: "1000px"}}
            zoom={7}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
               <LocationMarker centerPosition={centerPosition}/>
               { 
                  stationMapDataList.map((item, index) => (
                     <WarehouseMarker 
                        key={`warehouse-${index}`}
                        popupText={item.popupText} 
                        position={item.position}
                     />
                  )) 
               }
               <RoutingMachine waypoints={[stationMapDataList[0].position, stationMapDataList[1].position]}/>
         </MapContainer>
      </div>
   );
}
