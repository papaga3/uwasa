import { FC } from "react";

import { NavBar } from "components/NavBar";
import _stationData from "../../data/station.json";
import _mapData from "../../data/mapData.json";
import { ConnectionType, Station } from "types";
import { StationBox } from "./StationBox";
import { Xwrapper } from "react-xarrows";
import { Connection } from "./Connection";
import { PisteBox } from "./PisteBox";

interface Props {};

export const StationMap: FC<Props> = () => {
   const stationData: Station[] = _stationData as Station[];
   const mapData: ConnectionType[] = _mapData as ConnectionType[];

   return ( 
      <Xwrapper>
         <div>
            <NavBar />
            <h1> Station map </h1>
            <div style={ { width: "100%", height: "1000px" } } id="mapZone">
               { 
                  stationData.map((item, index) => {
                     return <StationBox key={index} station={item} />
                  })
               }

               {
                  mapData.map((startPoint, startIndex) => {
                     const conn = startPoint.connections.map((endPoint, endIndex) => {
                        return <Connection 
                                 key={`${startIndex}-${endIndex}`}
                                 start={startPoint.name}
                                 end={endPoint.name}
                                 distance={endPoint.distance}
                              />
                     });
                     return conn;
                  })
               }
               <PisteBox />
            </div>
         </div>
      </Xwrapper>
   )
}