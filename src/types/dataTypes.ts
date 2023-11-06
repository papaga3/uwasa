import dayjs, { Dayjs } from "dayjs";

export interface PositionType {
   x: number;
   y: number;
}

export interface DataRow {
   index?: number;
   "Täytttöpiste": string;
   Kontti: number;
   Tuote: string;
   Ulostuloaika: string;
   tunti: string; 
}

export interface Station {
   name: string;
   points: string[];
   position?: PositionType
}

export interface DestinationType {
   name: string;
   distance: number;
}

export interface ConnectionType {
   name: string;
   connections: DestinationType[];
}

export interface Package {
   ID: string;
}

export interface TruckSchedule {
   stopID: string;
   packageID: number;
   arriveTime: Dayjs;
   // DepartureTime: string;
   numberOfContainer: number;
   distance: number;

}

export interface RawTruck {
   ID: string;
   startPostion: string;
   startTime: string;
   schedule: TruckSchedule[];
}

export interface Truck {
   ID: string;
   startPostion: string;
   startTime: Dayjs;
   schedule: TruckSchedule[];
}

export interface Edge {
   v1: string;
   v2: string;
   distance: number;
}