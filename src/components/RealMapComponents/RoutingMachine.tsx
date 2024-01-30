import L from "leaflet";
import { createControlComponent } from '@react-leaflet/core'
import "leaflet-routing-machine";
import { FC } from "react";


interface Props {}

const createRoutingMachine = () => {
  const formatter = new L.Routing.Formatter({
    language: "en",
    units: "metric",
    distanceTemplate: "{value} {unit}",
  });

  
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(65.77927720642425,24.556295824516706),
      L.latLng(62.84221910580991, 22.955672671164827),
    ],
    lineOptions: {
      styles: [{color: 'black', weight: 4}],
      missingRouteTolerance: 1,
      extendToWaypoints: true,
      missingRouteStyles: [{color: 'red', weight: 3}]
    },
    show: false,
    //@ts-ignore
    createMarker: function () {
      return null;
    }
  });
  return instance;
}

const RoutingMachine = createControlComponent(createRoutingMachine);

export default RoutingMachine;