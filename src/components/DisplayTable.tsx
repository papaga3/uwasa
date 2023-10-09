import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { FC, ReactEventHandler, useState } from "react";

import _data from "../data/data.json";
import { DataRow } from "../types";
import { NavBar } from "./NavBar";
import { TextField } from "@mui/material";

interface Props {};

const columns: GridColDef[] = [
   {field: 'Täytttöpiste', headerName: 'Täytttöpiste', width: 200},
   {field: 'Kontti', headerName: 'Kontti', width: 200},
   {field: 'Tuote', headerName: 'Tuote', width: 200},
   {field: 'Ulostuloaika', headerName: 'Ulostuloaika', width: 200},
   {field: 'tunti', headerName: 'tunti', width: 200},
];

export const DisplayTable: FC<Props> = () => {
   const [filterText, setFilterText] = useState("");

   const data: DataRow[] = _data as DataRow[];
   data.forEach((item, index) => {
      if(item.index === undefined) {
         item.index = index;
      }
   });

   const [rows, setRows] = useState(data);

   const onFilterTextChange = (event: React.ChangeEvent<{ value: string }>) => {
      setFilterText(event.target.value);
      const newRow = data.filter(
         (item, index) => (item.Täytttöpiste.includes(event.target.value))
      );
      setRows(newRow);
   }

   return (
      <div>
         <NavBar />
         <h1> Demo table </h1>
         <TextField id="filterTextField" variant="outlined" value={filterText} onChange={onFilterTextChange}/>
         <DataGrid 
            rows={rows} 
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