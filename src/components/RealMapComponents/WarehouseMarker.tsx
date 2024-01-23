import { Warehouse } from "@mui/icons-material";
import { LatLngExpression, divIcon } from "leaflet";
import { FC, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";

interface Props {
   position: LatLngExpression;
   popupText: string;
}

export const WarehouseMarker: FC<Props> = (
   { position, popupText }
) => {

   const markerRef = useRef(null);

   const iconMarkup = renderToStaticMarkup(
      <Warehouse />
   );
   
   const warehouseIcon = divIcon({
      html: iconMarkup
   });
   return (
      <Marker
         position={position} 
         ref={markerRef}
         icon={warehouseIcon}
      >
      <Popup>
         { popupText }
      </Popup>
   </Marker>
   );
}