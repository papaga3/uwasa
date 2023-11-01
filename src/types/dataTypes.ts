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
   ArriveTime: string;
   DepartureTime: string;
}

export interface Truck {
   ID: string;
   schedule: TruckSchedule[];
}