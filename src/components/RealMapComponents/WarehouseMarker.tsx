import { Warehouse } from "@mui/icons-material";
import { Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import { pisteIdAtom } from "atom";
import { LatLngExpression, divIcon } from "leaflet";
import { FC, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import { useRecoilState } from "recoil";

interface Props {
   position: LatLngExpression;
   popupText: string[];
}

export const WarehouseMarker: FC<Props> = (
   { position, popupText }
) => {

   const [pisteID, setPisteID] = useRecoilState(pisteIdAtom);

   const markerRef = useRef(null);

   const iconMarkup = renderToStaticMarkup(
      <Warehouse />
   );
   
   const warehouseIcon = divIcon({
      html: iconMarkup,
      iconSize: [30, 30]
   });

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
                  <Button 
                     key={`warehouse-popup-${index}`}
                     onClick={ () => setPisteID(`${item}`) }
                  >
                     {item}
                  </Button>
               )
            ) 
         }
      </Popup>
   </Marker>
   );
}