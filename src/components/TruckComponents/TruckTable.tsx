import { Accordion, AccordionDetails, AccordionSummary, Typography, styled } from "@mui/material";
import { FC } from "react";

import { Truck } from "types";
import  _truckData from "../../data/truckData.json";
import { ExpandMore } from "@mui/icons-material";
import { ScheduleTable } from "./ScheduleTable";

interface Props {}

const PREFIX = "TruckTable";

const classes = {
   root: `${PREFIX}-root`
}


const StyledDiv = styled("div")(() => ({
   [`&.${classes.root}`]: {
      position: "absolute",
      left: "1000px",
      top: "1000px",
      border: "2px dotted black",
      display: "block",
      width: "500px",
      height: "400px"
   },
}));

export const TruckTable: FC<Props> = () => {

   const truckData: Truck[] = _truckData as Truck[];

   return (
      <StyledDiv className={classes.root}>
         <h3> Truck Schedule </h3>
         {
            truckData.map((item, index) => {
               return(
                  <Accordion key={`truck-${index}-${item.ID}`}>
                     <AccordionSummary
                        expandIcon={<ExpandMore />}
                        id={`truck-${index}`}
                     >
                        <Typography>{item.ID}</Typography>
                     </AccordionSummary>
                     <AccordionDetails>
                        <ScheduleTable schedule={item.schedule} />
                     </AccordionDetails>
                  </Accordion>
               );
            })
         }
      </StyledDiv>
   );
}