import { Accordion, AccordionDetails, AccordionSummary, Button, styled } from "@mui/material";
import { FC, useState } from "react";

import  _truckData from "../../data/truckData.json";
import { ExpandMore } from "@mui/icons-material";
import { ScheduleTable } from "./ScheduleTable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"
import { AddNewTruckDialog } from "./AddNewTruckDialog";
import { useRecoilState, useRecoilValue } from "recoil";
import { truckDataAtom, truckListAtom } from "atom";
import { LatLng } from "leaflet";
import { TruckData } from "types";

interface Props {}

const PREFIX = "TruckTable";

const classes = {
   root: `${PREFIX}-root`,
   titleDiv: `${PREFIX}-titleDiv`,
   title: `${PREFIX}-title`,
   addNewTruckButton: `${PREFIX}-addNewTruck`,
}


const StyledDiv = styled("div")(() => ({
   [`&.${classes.root}`]: {
      position: "absolute",
      left: "700px",
      top: "800px",
      border: "2px dotted blue",
      display: "block",
      width: "800px",
      height: "400px",
   },
   [`& .${classes.titleDiv}`]: {
      display: "grid",
      gridTemplateColumns: "400px 400px",
   },
   [`& .${classes.title}`]: {
   },
   [`& .${classes.addNewTruckButton}`]: {
   }
}));

export const TruckTable: FC<Props> = () => {
   dayjs.extend(customParseFormat);
   
   const [openAddNewTruckDialog, setOpenAddNewTruckDialog] = useState(false);

   const truckList = useRecoilValue(truckListAtom);

   const [truckData, setTruckData] = useRecoilState(truckDataAtom);

   const handleTruckChange = (truckID: string) => (event: React.SyntheticEvent, isExpanded: boolean) => 
   {
      if(truckID !== truckData.truckID) {

         const truckWithID = truckList.find((truck, index) => {
            return (truck.ID === truckID)
         });
         if(truckWithID === undefined) {
            console.error("Error in getting truck with this ID: " + truckID);
         } else {
            const waypoints = truckWithID.schedule.map((item, index) => {
               return ( { name: item.stopID, position: item.stopPosition } );
            });
            const newTruckData: TruckData = { truckID: truckID, waypoints: waypoints};
            setTruckData(newTruckData);
         }
      }
   }

   const handleClose = () => {
      setOpenAddNewTruckDialog(false);
   }

   return (
      <StyledDiv className={classes.root}>
         <div className={classes.titleDiv}>
            <h3 className={classes.title}> Truck Schedule </h3>
            <div className={classes.addNewTruckButton}>
               <Button onClick={() => setOpenAddNewTruckDialog(true)}> 
                  Add new truck 
               </Button> 
            </div>
         </div>
         <AddNewTruckDialog open={openAddNewTruckDialog} handleClose={handleClose}/>
         {
            truckList.map((item, index) => {
               return(
                  <Accordion 
                     key={`truck-${index}-${item.ID}`}
                     expanded={truckData.truckID === item.ID}
                     onChange={handleTruckChange(item.ID)}
                  >
                     <AccordionSummary
                        expandIcon={<ExpandMore />}
                        id={`truck-${index}`}
                     >
                          <p><b>truck ID:</b> {item.ID} </p>
                     </AccordionSummary>
                     <AccordionDetails>
                        <p><b>start postion:</b> {item.startPostion} </p>
                        <p><b>start time:</b> {item.startTime.format("DD.MM.YYYY HH:mm:ss")}</p>
                        <ScheduleTable  
                           truckStartPositon={item.startPostion} 
                           schedule={item.schedule} 
                           truckStartTime={item.startTime}
                        />
                     </AccordionDetails>
                  </Accordion>
               );
            })
         }
         <Button></Button>
      </StyledDiv>
   );
}