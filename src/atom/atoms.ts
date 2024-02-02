import { atom } from "recoil";
import dayjs from "dayjs";

import { DataRow, RawTruck, Truck, TruckData } from "types";
import _data from "../data/data.json";
import  _truckData from "../data/truckData.json";

function pisteBoxDataRowsDefault(): DataRow[] {
   const data: DataRow[] = _data as DataRow[];
   data.forEach((item, index) => {
      if(item.isSelected === undefined) {
         item.isSelected = false;
      }
   });
   return data;
}

// Create a default truck list
// This should be replaced by an actual call to a database
function truckListDefault(): Truck[] {
   const rawTruckData: RawTruck[] = _truckData as RawTruck[];

   const truckData: Truck[] = rawTruckData.map((item, index) => {
      const truck: Truck = {
         ID: item.ID,
         startPostion: item.startPostion,
         startTime: dayjs(item.startTime, "DD.MM.YYYY HH:mm:ss"),
         schedule: item.schedule,
      };
      return truck;
   });
   return truckData;
}
// Create a default truck data
function truckDataDefault(): TruckData {
   return {
      truckID: undefined,
      waypoints: []
   }
}

export const pisteIdAtom = atom({
   key: "pisteID",
   default: "",
});

export const truckPositionAtom = atom({
   key: "truckPosition",
   default: "RONKMI",
});

export const pisteBoxDataRowsAtom = atom({
   key: "pisteBoxDataRows",
   default: pisteBoxDataRowsDefault(),
});

export const truckListAtom = atom({
   key: "truckList",
   default: truckListDefault(),
});

// truck data atom holds data of the current selected trucks
// It contains the truck name and a list of waypoints
export const truckDataAtom = atom({
   key: "truckData",
   default: truckDataDefault(),
});