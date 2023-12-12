import { atom } from "recoil";
import dayjs from "dayjs";

import { DataRow, RawTruck, Truck } from "types";
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