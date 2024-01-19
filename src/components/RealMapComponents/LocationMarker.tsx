import { LatLngExpression, LeafletEventHandlerFnMap } from "leaflet";
import { FC, useMemo, useRef, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

import L from 'leaflet';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

interface Props {
   centerPosition: LatLngExpression;
}

export const LocationMarker: FC<Props> = ({
   centerPosition
}) => {

   const [markerPostion, setMarkerPosition] = useState(centerPosition);
   const [draggable, setDraggable] = useState(false);

   const markerRef = useRef(null);
   const eventHandler: LeafletEventHandlerFnMap = 
      useMemo(() => ({
         dragend() {
            const marker = markerRef.current;
            if(marker != null) {
               // @ts-ignore
               setMarkerPosition(marker.getLatLng())
            }
         }
      }), []);

   const mapEvents = useMapEvents({
      click() { mapEvents.locate() },
      locationfound(e) { 
         setMarkerPosition(e.latlng);
         mapEvents.flyTo(e.latlng, mapEvents.getZoom())
       }
   });

   return (
      <Marker
         draggable={true}
         position={markerPostion} 
         eventHandlers={eventHandler}
         ref={markerRef}
      >
         <Popup>
            <p>
               latitude: {
                  //@ts-ignore
                  parseFloat(markerPostion.lat).toFixed(5)
               }
            </p>
            <p>
               longitude: {
                  //@ts-ignore
                  parseFloat(markerPostion.lng).toFixed(5)
               }
            </p>
         </Popup>
      </Marker>
   );
}