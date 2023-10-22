import { FC, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from "react-draggable";
import { useXarrow } from "react-xarrows";

import { PositionType, Station } from "types";
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
   const updateArrows = useXarrow();

   const nodeRef = useRef(null);

   const [isDragging, setIsDragging] = useState<boolean>(false);
   const [openDialog, setOpenDialog] = useState<boolean>(false);

   const initPosition: PositionType = station.position === undefined ? {x: 0, y: 0} : station.position;

   const [position, setPosition] = useState<PositionType>(initPosition);

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
      updateArrows();
      setIsDragging(true);
   }

   const customOnDrop: DraggableEventHandler = (
      e: DraggableEvent,
      d: DraggableData
   ) => {
      setPosition({x: d.x, y: d.y});
   }

   const customOnStop: DraggableEventHandler = (
      e: DraggableEvent,
      d: DraggableData
    ) => {
      if (isDragging) {
        customOnDrop(e, d);
      } else {
        handleOnClick();
        updateArrows();
      }
      setIsDragging(false);
    };

   return (
      <Draggable 
         onDrag={customOnDrag}
         onStop={customOnStop}
         position={ position }
         nodeRef={nodeRef}
         bounds="#mapZone"
      >
         <StyledDiv className={classes.root} id={station.name} ref={nodeRef}>
            <Typography> {station.name} </Typography>
            <PointDialog 
               parentPoint={station.name}
               open={openDialog} 
               points={station.points}
               handleClose={handleCloseDialog}
            />
         </StyledDiv>
      </Draggable>
   );
}