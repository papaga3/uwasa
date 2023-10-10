import { 
   DataGrid,
   GridColDef, 
   GridToolbar 
} from "@mui/x-data-grid";
import { FC, ReactEventHandler, useState } from "react";

import _data from "../data/data.json";
import _stationData from "../data/station.json";
import { DataRow, Station } from "../types";
import { NavBar } from "./NavBar";
import { 
   InputLabel, 
   MenuItem, 
   Select,
   SelectChangeEvent 
} from "@mui/material";

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

   const stationData: Station[] = _stationData as Station[];

   const [filterText, setFilterText] = useState("");
   const [rows, setRows] = useState(data);

   const onFilterTextChange = (event: SelectChangeEvent) => {
      setFilterText(event.target.value);
      const newRow = data.filter(
         (item, index) => (item.Täytttöpiste.includes(event.target.value))
      );
      setRows(newRow);
   }

   return (
      <div>
         <NavBar />
         <div>
            <InputLabel id="filter-text-select-label">Täyttöpiste</InputLabel>
            <Select 
               labelId="filter-text-select-label"
               id="filter-text-select"
               value={filterText}
               label="Täyttöpiste"
               onChange={onFilterTextChange}
               sx={{ width: 500 }}
            >
               {
                  stationData.map((item, index) => (
                     <MenuItem 
                        key={`filter-text-select-menu-item${index}`}
                        value={item.name} >
                           {item.name}
                     </MenuItem>
                  ))
               }
            </Select>
         </div>
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