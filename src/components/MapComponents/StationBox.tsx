import { FC } from "react";
import Draggable from "react-draggable";

import { NavBar } from "components/NavBar";
import { Station } from "types";
import { Typography, styled } from "@mui/material";

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
   return (
      <Draggable>
         <StyledDiv className={classes.root}>
            <Typography> {station.name} </Typography>
         </StyledDiv>
      </Draggable>
   );
}