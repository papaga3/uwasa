import { 
   Button, 
   Dialog, 
   DialogActions, 
   DialogContent, 
   DialogTitle, 
   FormLabel, 
   TextField 
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { FC, useState } from "react";

import _stationData from "../../data/station.json";
import { Station } from "types";

interface Props {
   open: boolean;
   handleClose: () => void;
};

export const AddNewTruckDialog: FC<Props> = (
   { open, handleClose }
) => {
   const stationData: Station[] = _stationData as Station[];

   const [truckName, setTruckName] = useState("");
   const [startPoint, setStartPoint] = useState("");
   
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
                  />
               </div>
               <div>
                  <FormLabel>Start Point</FormLabel>
                  
               </div>
               <div>
                  <FormLabel>Start time</FormLabel>
                  <DateTimePicker />
               </div>
               
            </form>
         </DialogContent>
         <DialogActions>
            <Button onClick={() => {}}> Save </Button>
         </DialogActions>
      </Dialog>
   );
}
