import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FC } from "react";
import { useRecoilState } from "recoil";

import { pisteIdAtom } from "atom";

interface Props {
   parentPoint: string;
   open: boolean;
   points: string[];
   handleClose: () => void;
}

export const PointDialog: FC<Props> = ({
   parentPoint, open, points, handleClose
}) => {

   const [pisteID, setPisteID] = useRecoilState(pisteIdAtom);

   return (
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle> Täyttöpiste </DialogTitle>
         <DialogContent>
            { points.map((item, index) => {
               return (
                  <div
                     style={{ backgroundColor: "aqua" }}
                     key={index}
                     onClick={ () => setPisteID(`${parentPoint}${item}`) }
                  >
                     {item}
                  </div>
               )
            }) }
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}> Close </Button>
         </DialogActions>
      </Dialog>
   );
}