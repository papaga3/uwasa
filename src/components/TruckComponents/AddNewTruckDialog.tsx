import { 
   Button, 
   Dialog, 
   DialogActions, 
   DialogContent, 
   DialogTitle, 
   FormControl, 
   FormLabel, 
   InputLabel, 
   MenuItem, 
   Select, 
   SelectChangeEvent, 
   TextField 
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { FC, useState } from "react";

import _stationData from "../../data/station.json";
import { Station, Truck } from "types";
import dayjs, { Dayjs } from "dayjs";
import { useSetRecoilState } from "recoil";
import { truckListAtom } from "atom";

interface Props {
   open: boolean;
   handleClose: () => void;
};

export const AddNewTruckDialog: FC<Props> = (
   { open, handleClose }
) => {
   const stationData: Station[] = _stationData as Station[];

   const setTruckList = useSetRecoilState(truckListAtom);

   const [truckName, setTruckName] = useState("");
   const [startPoint, setStartPoint] = useState("");
   const [startTime, setStartTime] = useState<Dayjs | null>(null);
   
   const handleChange = (event: SelectChangeEvent) => {
      setStartPoint(event.target.value);
   };

   const saveButtonOnClick = () => {
      let inputTime = startTime;
      if(inputTime === null) {
         inputTime = dayjs();
      }

      const truck: Truck = {
         ID: truckName,
         startPostion: startPoint,
         startTime: inputTime,
         schedule: [],
      };

      setTruckList((oldTruckList) => {
         return (
            [
               ...oldTruckList, truck
            ]
         );
      });

      handleClose();
   }

   return (
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle> Add new truck </DialogTitle>
         <DialogContent>
            <form>
               <div>
                  <TextField 
                     label="Truck Name"
                     required={true}
                     sx={{mb: 3}}
                     onChange={(event) => setTruckName(event.target.value)}
                     value={truckName}
                  />
               </div>
               <div>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                     <InputLabel id="select-start-point-label">Start Point</InputLabel>
                     <Select
                        labelId="select-start-point-label"
                        id="select-start-point"
                        value={startPoint}
                        label="Age"
                        onChange={handleChange}
                     > 
                        { 
                           stationData.map((item, index) => {
                              // console.log("tt");
                              return (
                                 <MenuItem 
                                    key={`select-start-point-${index}`} 
                                    value={item.name}
                                 >
                                    {item.name}
                                 </MenuItem>
                              );
                           })
                        }
                     </Select>
                  </FormControl>
               </div>
               <div>
                  <FormLabel>Start time</FormLabel>
                  <DateTimePicker
                     value={startTime}
                     onChange={setStartTime}
                     referenceDate={dayjs('2023-04-17T15:30')}
                     format="DD.MM.YYYY HH:mm:ss"
                  />
               </div>
               
            </form>
         </DialogContent>
         <DialogActions>
            <Button onClick={saveButtonOnClick}> Save </Button>
         </DialogActions>
      </Dialog>
   );
}
