import { Warehouse } from "@mui/icons-material";
import { Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import { LatLngExpression, divIcon } from "leaflet";
import { FC, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";

interface Props {
   position: LatLngExpression;
   popupText: string[];
}

export const WarehouseMarker: FC<Props> = (
   { position, popupText }
) => {

   const markerRef = useRef(null);

   const iconMarkup = renderToStaticMarkup(
      <Warehouse />
   );
   
   const warehouseIcon = divIcon({
      html: iconMarkup,
      iconSize: [30, 30]
   });

   console.log(warehouseIcon);

   return (
      <Marker
         position={position} 
         ref={markerRef}
         icon={warehouseIcon}
      >
      <Popup>
         { 
            popupText.map(
               (item, index) => (
                  <Button key={`warehouse-popup-${index}`}>{item}</Button>
               )
            ) 
         }
      </Popup>
   </Marker>
   );
}