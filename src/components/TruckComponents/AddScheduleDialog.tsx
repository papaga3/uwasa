import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useState } from "react";
import { ConnectionType, DataRow, TruckSchedule } from "types";

import _data from "../../data/data.json";
import _mapData from "../../data/mapData.json";
import dayjs from "dayjs";

interface CalDistance {
   distance: number;
}

function calculateDistance(
   startPosition: string,
   mapData: ConnectionType[],
   endPosition: string): CalDistance {

   // Create distance map
   const distanceMap: Map<string, number> = new Map();
   mapData.forEach((item, index) => {
      distanceMap.set(item.name, Infinity);
   });
   distanceMap.set(mapData[0].name, 0);

   console.log(distanceMap);

   // Create visited map
   const visited: Map<string, boolean> = new Map();
   mapData.forEach((item, index) => {
      visited.set(item.name, false);
   });

   console.log(visited);

   console.log(endPosition);

   const queue: string[] = [];
   
   // begin dijsktra
   queue.push()

   return( { distance: 0 } );
}

interface Props {
   open: boolean;
   handleClose: () => void;
   rows: TruckSchedule[];
   setRows: React.Dispatch<React.SetStateAction<TruckSchedule[]>>;
   truckStartPositon: string;
}

export const AddScheduleDialog: FC<Props> = (
   { open, handleClose, rows, setRows, truckStartPositon }
) => {

   const data: DataRow[] = _data as DataRow[];
   const [selectItem, setSelectItem] = useState(data[0]);
   const mapData: ConnectionType[] = _mapData as ConnectionType[];

   const saveButtonOnClick = () => {
      const endPosition = selectItem.Täytttöpiste.substring(0, 6);
      const distance = calculateDistance(truckStartPositon, mapData, endPosition);
      const newTruckSchedule: TruckSchedule = {
         stopID: selectItem.Täytttöpiste,
         packageID: selectItem.Kontti,
         arriveTime: dayjs(),
         distance: 0,
         numberOfContainer: 0
      }
      setRows([...rows, newTruckSchedule]);
      handleClose();
   }

   return (
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle> Add new truck schedule </DialogTitle>
         <DialogContent>
            <FormControl fullWidth>
               <InputLabel id="input-kontti-numbe-label"> Kontti </InputLabel>
               <Select
                  labelId="input-kontti-number-label"
                  id="kontti-number-input"
                  value={selectItem.Kontti.toString()}
                  label="Kontti"
               >
                  { 
                     data.map((item, index) => {
                        return (
                           <MenuItem
                              key={`kontti-${index}`}
                              value={item.Kontti}
                              onClick={() => setSelectItem(item)}
                           >
                              {item.Kontti}
                           </MenuItem>
                        );
                     })
                  }
               </Select>
            </FormControl>
         </DialogContent>
         <DialogActions>
            <Button onClick={saveButtonOnClick}>Save</Button>
         </DialogActions>
      </Dialog>
   );
}