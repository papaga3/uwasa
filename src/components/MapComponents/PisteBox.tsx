import { FC, useState } from "react";
import { styled } from "@mui/material";
import { useRecoilValue } from "recoil";
import { pisteIdAtom } from "atom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import _data from "../../data/data.json";
import { DataRow } from "types";

const PREFIX = "PisteBox";

const classes = {
   root: `${PREFIX}-root`
}

const StyledDiv = styled("div")(() => ({
   [`&.${classes.root}`]: {
      position: "absolute",
      left: "100px",
      top: "800px",
      border: "2px dotted blue",
      display: "block",
      width: "500px",
      height: "1000px"
   },
}));

const columns: GridColDef[] = [
   {field: 'Täytttöpiste', headerName: 'Täytttöpiste', width: 100},
   {field: 'Kontti', headerName: 'Kontti', width: 100},
   {field: 'Tuote', headerName: 'Tuote', width: 100},
   {field: 'Ulostuloaika', headerName: 'Ulostuloaika', width: 100},
   {field: 'tunti', headerName: 'tunti', width: 100},
];

interface Props {
}

export const PisteBox: FC<Props> = (
) => {
   const pisteID = useRecoilValue(pisteIdAtom);

   const data: DataRow[] = _data as DataRow[];
   data.forEach((item, index) => {
      if(item.isSelected === undefined) {
         item.isSelected === false;
      }
   });

   let rows: DataRow[];

   if(pisteID === "" || pisteID === undefined) {
      rows = [];
   } else {
      rows = data.filter(
         (item, index) => (item.Täytttöpiste.includes(pisteID))
      );
   }

   return (
      <StyledDiv className={classes.root}>
         <h3> Täyttöpiste: {pisteID} </h3>
         <DataGrid 
            rows={rows} 
            columns={columns}  
            initialState={{
               pagination: {
                  paginationModel: { page: 0, pageSize: 20 },
                },
            }}
            pageSizeOptions={[20, 25]} 
            getRowId={(row: DataRow) => `${row["Täytttöpiste"]}_${row.Ulostuloaika}_${row.tunti}_${row.index}`}
         />

      </StyledDiv>
   )
}