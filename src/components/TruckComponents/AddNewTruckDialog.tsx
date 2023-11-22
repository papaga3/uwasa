import { Dialog, DialogContent, DialogTitle, FormLabel, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { FC, useState } from "react";

interface Props {
   open: boolean;
   handleClose: () => void;
};

export const AddNewTruckDialog: FC<Props> = (
   { open, handleClose }
) => {
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
      </Dialog>
   );
}
