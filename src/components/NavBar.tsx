import { FC } from "react";
import { AppBar, Box, CssBaseline, Toolbar, Typography, styled } from "@mui/material";
import { RouteEnum } from "routes";
import {  NavLink } from "react-router-dom";

interface Props {};

const PREFIX = "NavBar";

const classes = {
  root: `${PREFIX}-toolBar`,
  navLinks: `${PREFIX}-navLink`,
  logo: `${PREFIX}-logo`,
  link: `${PREFIX}-link`,
  leafletPage: `${PREFIX}-leafletPage`
};

const StyledToolbar = styled(Toolbar)(() => ({
  [`&.${classes.root}`]: {},
  [`& .${classes.navLinks}`]: {
      marginLeft: "20px",
      display: "flex",
  },
  [`& .${classes.logo}`]: {
      flexGrow: "1",
      cursor: "pointer",
  },
  [`& .${classes.link}`]: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: "40px",
      "&:hover": {
         color: "yellow",
         borderBottom: "1px solid white",
      },
  },
}));


export const NavBar: FC<Props> = () => {
   return (
      <Box sx={{flexGrow: 1}}>
         <AppBar position="static">
            <CssBaseline />
            <StyledToolbar className={classes.root}>
               <Typography variant="h4" className={classes.logo}>
                  Transportation Planning
               </Typography>
               <div>
                  <NavLink to={RouteEnum.mainPage} end className={classes.link}> Home </NavLink>
                  <NavLink to={RouteEnum.displayTable} end className={classes.link}> Display Table </NavLink>
                  <NavLink to={RouteEnum.mapPage} end className={classes.link}> Map Page </NavLink>
                  <NavLink to={RouteEnum.leafletPage} end className={classes.link}>Leaflet Page</NavLink>
               </div>
            </StyledToolbar>
         </AppBar>
      </Box>
   );
}