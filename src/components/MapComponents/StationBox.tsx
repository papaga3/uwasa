import { FC, useState } from "react";
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from "react-draggable";

import { Station } from "types";
import { Typography, styled } from "@mui/material";
import { PointDialog } from "./PointDialog";

interface Props {
   station: Station;
}

const PREFIX = "StationBox";

const classes = {
   root: `${PREFIX}-root`,
}

const StyledDiv = styled("div")(() => ({
   [`&.${classes.root}`]: {
      margin: "0px",
      display: "block",
      position: "absolute",
      height: "100px",
      width: "100px",
      textAlign: "center",
      borderRadius: "8px",
      border: "4px solid black",
      backgroundColor: "blue",
      color: "white",
   },
}));


export const StationBox: FC<Props> = ({ station }) => {
   const [isDragging, setIsDragging] = useState<boolean>(false);
   const [openDialog, setOpenDialog] = useState<boolean>(false);

   const handleCloseDialog = () => {
      setOpenDialog(false);
   }

   const handleOnClick = () => {
      if(!openDialog) {
         setOpenDialog(true);
      }
   }

   // Custom onDrag and onDrop functions.
   // These are used to differentiate between click and drag
   const customOnDrag: DraggableEventHandler = (
      e: DraggableEvent,
      d: DraggableData
   ) => {
      setIsDragging(true);
   }

   const customOnDrop: DraggableEventHandler = (
      e: DraggableEvent,
      d: DraggableData
   ) => {

   }

   const customOnStop: DraggableEventHandler = (
      e: DraggableEvent,
      d: DraggableData
    ) => {
      if (isDragging) {
        customOnDrop(e, d);
      } else {
        handleOnClick();
      }
      setIsDragging(false);
    };

   return (
      <Draggable onDrag={customOnDrag} onStop={customOnStop}>
         <StyledDiv className={classes.root}>
            <Typography> {station.name} </Typography>
            <PointDialog 
               open={openDialog} 
               points={station.points}
               handleClose={handleCloseDialog}
            />
         </StyledDiv>
      </Draggable>
   );
}