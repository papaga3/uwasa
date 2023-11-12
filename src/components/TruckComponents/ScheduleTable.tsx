import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowModes, GridRowModesModel, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { FC, useState } from "react";
import { Add } from "@mui/icons-material";

import { TruckSchedule } from "types";
import { AddScheduleDialog } from "./AddScheduleDialog";
import { truckPositionAtom } from "atom";
import { Dayjs } from "dayjs";

const PREFIX = "TruckTable";

const classes = {
   root: `${PREFIX}-root`
}

/*const StyledDiv = styled("div")(() => ({
   [`&.${classes.root}`]: {
      position: "absolute",
      border: "2px dotted blue",
      display: "block",
      width: "1000px",
      height: "500px",
      left: "700px",
      top: "1000px",
   },
}));*/

interface EditToolBarProps {
   openAddScheduleDialog: boolean,
   setOpenAddScheduleDialog: React.Dispatch<React.SetStateAction<boolean>>
}

function EditToolBar(
   props: EditToolBarProps
) {
   const handleClick = () => {
      if(!props.openAddScheduleDialog) {
         props.setOpenAddScheduleDialog(true);
      }
   }
   return (
      <GridToolbarContainer>
         <Button color="primary" startIcon={<Add />} onClick={handleClick}>
            Add Schedule
         </Button>
      </GridToolbarContainer>
   );
}

const columns: GridColDef[] = [
   {field: 'stopID', headerName: 'Stop ID', width: 100},
   {field: 'packageID', headerName: 'Package ID', width: 100},
   {field: 'arriveTime', headerName: 'Arrive Time', width: 120},
   {field: 'distance', headerName: 'distance', width: 120},
   {field: 'numberOfContainer', headerName: 'Number of Container', width: 150}
];

interface Props {
   truckStartTime: Dayjs;
   truckStartPositon: string;
   schedule: TruckSchedule[];
}

export const ScheduleTable: FC<Props> = (
   { schedule, truckStartPositon, truckStartTime }
) => {
   const [rows, setRows] = useState<TruckSchedule[]>(schedule);
   const [openAddScheduleDialog, setOpenAddScheduleDialog] = useState(false);

   const handleScheduleDialogClose = () => {
      setOpenAddScheduleDialog(false);
   }

   return (
      <div className={classes.root}>
            <DataGrid 
            rows={rows} 
            columns={columns}  
            initialState={{
               pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
               },
            }}
            pageSizeOptions={[5, 10]} 
            getRowId={
                  (row: TruckSchedule) => 
                     `${row.stopID}_${row.packageID}_${row.arriveTime}_${row.distance}`
            }
            slots={{
               toolbar: EditToolBar
            }}
            slotProps={{
               toolbar: { openAddScheduleDialog, setOpenAddScheduleDialog }
            }}
         />
         <AddScheduleDialog
            open={openAddScheduleDialog}
            handleClose={handleScheduleDialogClose}
            rows={rows}
            setRows={setRows}
            truckStartPositon={truckStartPositon}
            truckStartTime={truckStartTime}
         />
      </div>
   );
}