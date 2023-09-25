import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FC } from "react";

interface Props {
   open: boolean;
   points: string[];
   handleClose: () => void;
}

export const PointDialog: FC<Props> = ({
   open, points, handleClose
}) => {
   return (
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle> Täyttöpiste </DialogTitle>
         <DialogContent>
            { points.map((item, index) => {
               return <div key={index}> {item} </div>
            }) }
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}> Close </Button>
         </DialogActions>
      </Dialog>
   );
}