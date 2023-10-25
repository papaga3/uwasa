import { FC, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Xwrapper } from "react-xarrows";


import { NavBar } from "components/NavBar";
import { ConnectionType, Station } from "types";
import { truckPositionAtom } from "atom";

import { StationBox } from "./StationBox";
import { Connection } from "./Connection";
import { PisteBox } from "./PisteBox";

import _stationData from "../../data/station.json";
import _mapData from "../../data/mapData.json";
import { returnRandomPosition } from "components/TruckComponents/TruckLocation";
import { TruckTable } from "components/TruckComponents/TruckTable";

interface Props {};

export const StationMap: FC<Props> = () => {
   const stationData: Station[] = _stationData as Station[];
   const mapData: ConnectionType[] = _mapData as ConnectionType[];

   const [truckPosition, setTruckPosition] = useRecoilState(truckPositionAtom);

   const curConnection = mapData.find((item) => item.name === truckPosition);
   console.log("curConnection: ", curConnection?.name);

   useEffect(() => {
      const travelInterval: NodeJS.Timeout = setInterval(
         () => {
            if(curConnection !== undefined) {
               const nextDestination = returnRandomPosition(curConnection);
               if(nextDestination === "") {
                  return;
               }
               console.log("nextDestion:", nextDestination);
               setTruckPosition(nextDestination);
            }
         },
         5000
      );

      if(curConnection === undefined) {
         clearInterval(travelInterval);
      }

      return () => clearInterval(travelInterval);
   }, [truckPosition]);

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
               <TruckTable />
            </div>
         </div>
      </Xwrapper>
   )
}