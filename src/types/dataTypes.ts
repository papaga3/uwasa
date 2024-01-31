import dayjs, { Dayjs } from "dayjs";
import { LatLng } from "leaflet";

/**
 * Position of a draggable div on screen
 * @member x: x position
 * @member y: y position
 */
export interface PositionType {
   x: number;
   y: number;
}

/**
 * DataRow for package 
 * @member index: index of the package
 * @member Täytttöpiste: the station that the package is currently at
 * @member Kontti: package number
 * @member Tuote: product type
 * @member Ulostuloaika: coming time
 * @member tunti: hour
 */
export interface DataRow {
   index?: number;
   "Täytttöpiste": string;
   Kontti: number;
   Tuote: string;
   Ulostuloaika: string;
   tunti: string;
   isSelected?: boolean;
}

/**
 * Station data type
 * @member name: name of the station
 * @member points: pick up points (täyttöpiste) at this station
 * @member position: position of the current station on the screen
 */
export interface Station {
   name: string;
   points: string[];
   position?: PositionType
}

/**
 * Data type for destination
 * @member name: name of the destination
 * @member distance: distance (in km) to the destination
 */
export interface DestinationType {
   name: string;
   distance: number;
}

/**
 * Connection data type
 * it is a part of a adjacent list
 * @member name: name of the current station (vertex)
 * @member connections: list of stations (vertices) connected to the current vertex
 */
export interface ConnectionType {
   name: string;
   connections: DestinationType[];
}

/**
 * Package data type
 * @member ID: ID of the package
 */
export interface Package {
   ID: string;
}

/**
 * Truck schedule
 * @member stopID: the ID of the station (Täyttöpiste)
 * @member packageID: ID of the current package (Kontti)
 * @member arriveTime: the time the truck will arrive at the stop
 * @member numberOfContainer: number of container CURRENTLY in the truck
 * @member distance: distance the truck have to travel to THIS stop
 */
export interface TruckSchedule {
   stopID: string;
   packageID: number;
   arriveTime: string;
   // DepartureTime: string;
   numberOfContainer: number;
   distance: number;
   cost: number;
}

/**
 * Raw data of a truck
 * @member ID: truck ID
 * @member startPostion: ID of the station the truck start at
 * @member startTime: the time the truck is going to start type STRING
 * @member schedule: the schedule of this truck
 */
export interface RawTruck {
   ID: string;
   startPostion: string;
   startTime: string;
   schedule: TruckSchedule[];
}

/** 
 * Processed data of a truck
 * @member ID: truck ID
 * @member startPostion: ID of the station the truck start at
 * @member startTime: the time the truck is going to start type Dayjs
 * @member schedule: the schedule of this truck
*/
export interface Truck {
   ID: string;
   startPostion: string;
   startTime: Dayjs;
   schedule: TruckSchedule[];
}

/**
 * Graph edge used for an edge list
 * @member v1: name of the first vertex
 * @member v2: name of the second vertex
 * @member distance: distance between the vertices. 
 * */
export interface Edge {
   v1: string;
   v2: string;
   distance: number;
}

/**
 * Data used for current selected truck
 */
export interface TruckData {
   truckID: string;
   waypoints: {
      name: string;
      position: LatLng;
   }[];
}