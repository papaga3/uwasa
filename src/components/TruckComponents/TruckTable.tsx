import { Accordion, AccordionDetails, AccordionSummary, Typography, styled } from "@mui/material";
import { FC } from "react";

import { RawTruck, Truck } from "types";
import  _truckData from "../../data/truckData.json";
import { ExpandMore } from "@mui/icons-material";
import { ScheduleTable } from "./ScheduleTable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"

interface Props {}

const PREFIX = "TruckTable";

const classes = {
   root: `${PREFIX}-root`
}


const StyledDiv = styled("div")(() => ({
   [`&.${classes.root}`]: {
      position: "absolute",
      left: "700px",
      top: "1000px",
      border: "2px dotted blue",
      display: "block",
      width: "800px",
      height: "400px"
   },
}));

export const TruckTable: FC<Props> = () => {
   dayjs.extend(customParseFormat);
   const rawTruckData: RawTruck[] = _truckData as RawTruck[];

   const truckData: Truck[] = rawTruckData.map((item, index) => {
      console.log("item: " + item.startTime);
      console.log(dayjs(item.startTime, "DD.MM.YYYY HH:mm:ss").isValid());
      const truck: Truck = {
         ID: item.ID,
         startPostion: item.startPostion,
         startTime: dayjs(item.startTime, "DD.MM.YYYY HH:mm:ss"),
         schedule: item.schedule,
      };
      return truck;
   })

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
                        <p><b>truck ID:</b> {item.ID} / </p>
                        <p><b>start postion:</b> {item.startPostion} / </p>
                        <p><b>start time:</b> {item.startTime.toString()}</p>
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