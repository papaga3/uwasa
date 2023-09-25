import { FC } from "react";

import { NavBar } from "components/NavBar";
import _stationData from "../../data/station.json";
import { Station } from "types";
import { StationBox } from "./StationBox";

interface Props {};

export const StationMap: FC<Props> = () => {
   const stationData: Station[] = _stationData as Station[];

   return ( 
      <div>
         <NavBar />
         <h1> Station map </h1>
         { 
            stationData.map((item) => {
               return <StationBox station={item} />
            })
         }
      </div>
   )
}