import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useState } from "react";
import { DataRow, TruckSchedule } from "types";

import _data from "../../data/data.json";

interface Props {
   open: boolean;
   rows: TruckSchedule[];
   setRows: React.Dispatch<React.SetStateAction<TruckSchedule[]>>;
   handleClose: () => void;
}

export const AddScheduleDialog: FC<Props> = (
   { open, handleClose }
) => {

   const data: DataRow[] = _data as DataRow[];
   const [kontti, setKontti] = useState(data[0].Kontti);
   
   const saveButtonOnClick = () => {

   }

   const handleChange = (event: SelectChangeEvent) => {
      setKontti(parseInt(event.target.value));
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
                  value={kontti.toString()}
                  label="Kontti"
                  onChange={handleChange}
               >
                  { 
                     data.map((item, index) => {
                        return (
                           <MenuItem key={`kontti-${index}`} value={item.Kontti}>
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