import { useState } from "react";
import L, { ControlOptions, LatLng, LatLngExpression } from "leaflet";
import { createControlComponent } from '@react-leaflet/core'
import "leaflet-routing-machine";

interface Props extends ControlOptions {
  waypoints: LatLng[];
}

const createRoutingMachine = (props: Props) => {
  const instance = L.Routing.control({
    waypoints: props.waypoints,
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
  instance.on('routesfound', function(e) {
    var routes = e.routes;
    var summary = routes[0].summary;
    console.log(routes);
    console.log(summary);
    // alert distance and time in km and minutes
    alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
  });
 
  return instance;
}

const RoutingMachine = createControlComponent(createRoutingMachine);

export default RoutingMachine;