import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useState } from "react";
import { DataRow, TruckSchedule } from "types";

import _data from "../../data/data.json";

interface Props {
   open: boolean;
   handleClose: () => void;
   rows: TruckSchedule[];
   setRows: React.Dispatch<React.SetStateAction<TruckSchedule[]>>;
}

export const AddScheduleDialog: FC<Props> = (
   { open, handleClose, rows, setRows }
) => {

   const data: DataRow[] = _data as DataRow[];
   const [selectItem, setSelectItem] = useState(data[0]);
   
   const saveButtonOnClick = () => {
      const newTruckSchedule: TruckSchedule = {
         stopID: selectItem.Täytttöpiste,
         packageID: selectItem.Kontti,
         ArriveTime: "",
         DepartureTime: "",
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