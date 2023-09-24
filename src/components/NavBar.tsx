import { FC } from "react";
import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { RouteEnum, RouteEnumValues } from "routes";
import { Link, NavLink } from "react-router-dom";

interface Props {};

/* const useStyles = makeStyles((theme: any) => ({
   navlinks: {
     marginLeft: theme.spacing(10),
     display: "flex",
   },
  logo: {
     flexGrow: "1",
     cursor: "pointer",
   },
   link: {
     textDecoration: "none",
     color: "white",
     fontSize: "20px",
     marginLeft: theme.spacing(20),
     "&:hover": {
       color: "yellow",
       borderBottom: "1px solid white",
     },
   },
 })); */

export const NavBar: FC<Props> = () => {
   return (
      <Box sx={{flexGrow: 1}}>
         <AppBar position="static">
            <CssBaseline />
            <Toolbar >
               <Typography variant="h4">
                  NavBar
               </Typography>
               <div>
                  <NavLink to="/" end> Home </NavLink>
                  <NavLink to={RouteEnum.displayTable} end> Display Table </NavLink>
               </div>
            </Toolbar>
         </AppBar>
      </Box>
   );
}