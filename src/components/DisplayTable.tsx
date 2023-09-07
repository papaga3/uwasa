import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { FC } from "react";

import _data from "../data/data.json";
import { DataRow } from "../types";

interface Props {};

const columns: GridColDef[] = [
   {field: 'Täytttöpiste', headerName: 'Täytttöpiste', width: 200},
   {field: 'Kontti', headerName: 'Kontti', width: 200},
   {field: 'Tuote', headerName: 'Tuote', width: 200},
   {field: 'Ulostuloaika', headerName: 'Ulostuloaika', width: 200},
   {field: 'tunti', headerName: 'tunti', width: 200},
];

export const DisplayTable: FC<Props> = () => {
   const data: DataRow[] = _data as DataRow[];
   data.forEach((item, index) => {
      if(item.index === undefined) {
         item.index = index;
      }
   });
   console.log(data);
   return (
      <div>
         <h1> Demo table </h1>
         <DataGrid 
            rows={data} 
            columns={columns}  
            initialState={{
               pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            slots={{toolbar: GridToolbar}}
            pageSizeOptions={[5, 10]} 
            getRowId={(row: DataRow) => `${row["Täytttöpiste"]}_${row.Ulostuloaika}_${row.tunti}_${row.index}`}
         />
      </div>
   );
}