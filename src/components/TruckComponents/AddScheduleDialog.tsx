import { 
   Button, 
   Dialog, 
   DialogActions, 
   DialogContent, 
   DialogTitle, 
   FormControl, 
   InputLabel, 
   MenuItem, 
   Select 
} from "@mui/material";
import { FC, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { SnackbarProvider, useSnackbar } from "notistack";

import { ConnectionType, DataRow, TruckSchedule } from "types";

import _data from "../../data/data.json";
import _mapData from "../../data/mapData.json";

interface CalDistance {
   path: string[];
   distance: number;
}

function calculateDistance(
   startPosition: string,
   mapData: ConnectionType[],
   endPosition: string): CalDistance {
   
   // Patch 
   if(endPosition === "ATRNMS") {
      endPosition = "ATRNMB";
   }   
   // console.log("end: ", endPosition);
   
   // Create distance map
   const distanceMap: Map<string, number> = new Map();
   mapData.forEach((item, index) => {
      distanceMap.set(item.name, Infinity);
   });
   distanceMap.set(startPosition, 0);

   // Create previous map
   const prev: Map<string, string | undefined> = new Map();
   mapData.forEach((item, index) => {
      prev.set(item.name, undefined);
   });

   // queue of vertexes
   // TODO: can be updated to priority queue
   let queue: {name: string, distance: number}[] =  [];
  
   queue.push({name: startPosition, distance: 0});

   const path: string[] = [];
   let returnDistance = 0;

   while(queue.length > 0) {
      // Find the smallest in queue
      let minDis = Infinity;
      let minKey = "";
      queue.forEach((item, index) => {
         if(item.distance < minDis) {
            minKey = item.name;
            minDis = item.distance;
         }
      });

      // console.log(minKey);
      // console.log(queue.toString());
      // console.log("endPosition: ", endPosition);

      if(minKey === endPosition) {
         // WE ARE DONE
         let curKey = minKey;
         returnDistance = minDis;
         while(prev.get(curKey) !== undefined) {
            const temp = prev.get(curKey);
            if(temp === undefined) {
               break;
            } else {
               path.push(curKey);
               curKey = temp;
            }
         }
         break;
      }
      queue = queue.filter((item) => item.name !== minKey);
      if(minKey !== "" || distanceMap.get(minKey) !== Infinity) {
         const minKeyMap = mapData.find((item) => item.name === minKey);
         if(minKeyMap === undefined) {
            console.error("Error");
         } else {
            minKeyMap.connections.forEach((item, index) => {
               let nextNode = item.name;
               let candidate = distanceMap.get(minKey) as number + item.distance;
               if(distanceMap.get(nextNode) as number > candidate) {
                  distanceMap.set(nextNode, candidate);
                  prev.set(nextNode, minKey);
                  queue.push({name: nextNode, distance: candidate});
               }
            });
         }
      }
   }

   return( 
      { 
         path: path.concat(startPosition).reverse(),
         distance: returnDistance 
      } 
   );
}

interface Props {
   open: boolean;
   handleClose: () => void;
   rows: TruckSchedule[];
   setRows: React.Dispatch<React.SetStateAction<TruckSchedule[]>>;
   truckStartPositon: string;
   truckStartTime: Dayjs;
}

export const AddScheduleDialog: FC<Props> = (
   { 
      open, 
      handleClose, 
      rows, 
      setRows, 
      truckStartPositon,
      truckStartTime
   }
) => {

   const data: DataRow[] = _data as DataRow[];
   const mapData: ConnectionType[] = _mapData as ConnectionType[];
   const [curStartPosition, setCurStartPositon] = useState(truckStartPositon);
   const [curTruckStartTime, setCurTruckStartTime] = useState(truckStartTime);

   const { enqueueSnackbar } = useSnackbar();
   const [selectItem, setSelectItem] = useState(data[0]);
   const [numberOfContainer, setNumberOfContainer] = useState(0);

   const saveButtonOnClick = () => {
      if(numberOfContainer === 3) {
         enqueueSnackbar("container is full");
         handleClose();
      } else {
         const endPosition = selectItem.Täytttöpiste.substring(0, 6);
         const result = calculateDistance(curStartPosition, mapData, endPosition);

         // Calculating driving time
         const drivingTime = result.distance / 60;
         const drivingTimeString = drivingTime.toString();
         const numArray = drivingTimeString.split('.');
         const hour = parseInt(numArray[0]);
         const minute = Math.round(parseFloat(`0.${numArray[1]}`) * 60);
         
         const newArriveTime = curTruckStartTime.add(hour, "hour").add(minute, "minute");

         console.log(result.path);
         const newTruckSchedule: TruckSchedule = {
            stopID: selectItem.Täytttöpiste,
            packageID: selectItem.Kontti,
            arriveTime: newArriveTime.format("DD.MM.YYYY HH:mm"),
            distance: result.distance,
            numberOfContainer: numberOfContainer + 1
         }
         console.log(result.path);
         setCurStartPositon(endPosition);
         setNumberOfContainer(numberOfContainer + 1);
         setCurTruckStartTime(newArriveTime);
         setRows([...rows, newTruckSchedule]);
         handleClose();
      }
   }

   return (
      <SnackbarProvider>
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
      </SnackbarProvider>
   );
}