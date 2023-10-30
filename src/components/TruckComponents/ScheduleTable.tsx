import styled from "@emotion/styled";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import { TruckSchedule } from "types";

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

interface Props {
   schedule: TruckSchedule[];
}

const columns: GridColDef[] = [
   {field: 'stopID', headerName: 'Stop ID', width: 100},
   {field: 'packageID', headerName: 'Package ID', width: 100},
   {field: 'ArriveTime', headerName: 'Arrive Time', width: 100},
   {field: 'DepartureTime', headerName: 'Departure Time', width: 100},
];

export const ScheduleTable: FC<Props> = (
   { schedule  }
) => {
   const rows = schedule;
   console.log(rows);
   return (
      <StyledDiv>
         {
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
            />
         }
      </StyledDiv>
   );
}