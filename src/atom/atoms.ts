import { atom } from "recoil";
import _data from "../data/data.json";
import { DataRow } from "types";

function pisteBoxDataRowsDefault(): DataRow[] {
   const data: DataRow[] = _data as DataRow[];
   data.forEach((item, index) => {
      if(item.isSelected === undefined) {
         item.isSelected = false;
      }
   });
   return data;
}

export const pisteIdAtom = atom({
   key: "pisteID",
   default: "",
});

export const truckPositionAtom = atom({
   key: "truckPosition",
   default: "RONKMI",
});

export const pisteBoxDataRows = atom({
   key: "pisteBoxDataRows",
   default: pisteBoxDataRowsDefault(),
});