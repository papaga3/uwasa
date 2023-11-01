import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowModes, GridRowModesModel, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { FC, useState } from "react";
import { Add } from "@mui/icons-material";

import { TruckSchedule } from "types";
import { AddScheduleDialog } from "./AddScheduleDialog";

const PREFIX = "TruckTable";

const classes = {
   root: `${PREFIX}-root`
}

const StyledDiv = styled("div")(() => ({
   [`&.${classes.root}`]: {
      border: "2px dotted black",
      display: "block",
      width: "500px",
      height: "400px"
   },
}));

interface EditToolBarProps {
   openAddScheduleDialog: boolean,
   setOpenAddScheduleDialog: React.Dispatch<React.SetStateAction<boolean>>
}

function EditToolBar(
   props: EditToolBarProps
) {
   const handleClick = () => {
      console.log(props.openAddScheduleDialog);
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
   {field: 'ArriveTime', headerName: 'Arrive Time', width: 100},
   {field: 'DepartureTime', headerName: 'Departure Time', width: 100},
];

interface Props {
   schedule: TruckSchedule[];
}

export const ScheduleTable: FC<Props> = (
   { schedule  }
) => {
   const [rows, setRows] = useState<TruckSchedule[]>(schedule);
   const [openAddScheduleDialog, setOpenAddScheduleDialog] = useState(false);

   const handleScheduleDialogClose = () => {
      setOpenAddScheduleDialog(false);
   }

   return (
      <StyledDiv>
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
                     `${row.stopID}_${row.packageID}_${row.ArriveTime}_${row.DepartureTime}`
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
         />
      </StyledDiv>
   );
}