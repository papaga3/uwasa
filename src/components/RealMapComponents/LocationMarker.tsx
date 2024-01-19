import { LatLngExpression } from "leaflet";
import { FC, useState } from "react";
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

   const mapEvents = useMapEvents({
      click() { mapEvents.locate() },
      locationfound(e) { 
         setMarkerPosition(e.latlng);
         mapEvents.flyTo(e.latlng, mapEvents.getZoom())
       }
   });

   return (
      <Marker position={markerPostion} >
         <Popup> You are here </Popup>
      </Marker>
   );
}