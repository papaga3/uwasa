import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FC } from "react";

interface Props {
   open: boolean;
   handleClose: () => void;
}

export const AddScheduleDialog: FC<Props> = (
   { open, handleClose }
) => {
   return (
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle> Add new truck schedule </DialogTitle>
         <DialogContent>
            
         </DialogContent>
      </Dialog>
   );
}