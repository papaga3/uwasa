import { Dialog, DialogTitle } from "@mui/material";
import { FC } from "react";

interface Props {
   open: boolean;
   handleClose: () => void;
};

export const AddNewTruckDialog: FC<Props> = (
   { open, handleClose }
) => {
   return (
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle> Add new truck </DialogTitle>
      </Dialog>
   );
}
