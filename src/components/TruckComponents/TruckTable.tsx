import { styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import { TruckSchedule } from "types";

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

const columns: GridColDef[] = [
   {field: 'Truck ID', headerName: 'Truck ID', width: 100},
   {field: 'start point', headerName: 'start point', width: 100},
   {field: 'start time', headerName: 'start time', width: 100},
   {field: 'package ID', headerName: 'package ID', width: 100},
];

export const TruckTable: FC<Props> = () => {

   const truckData: TruckSchedule[] = [];
   let rows: TruckSchedule[] = truckData;

   return (
      <StyledDiv className={classes.root}>
         <h3> Truck Schedule </h3>
         <DataGrid 
            rows={rows} 
            columns={columns}  
            initialState={{
               pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]} 
            getRowId={(row: TruckSchedule) => `${row.truck.ID}_${row.startPoint}_${row.startTime}_${row.package.ID}`}
         />

      </StyledDiv>
   );
}