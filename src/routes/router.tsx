import { createHashRouter } from "react-router-dom";

import { DisplayTable, NavBar } from "components";
import { RouteEnum } from "./routeConstant";
import { StationMap } from "components/MapComponents";

const router = createHashRouter([
   {
      path: RouteEnum.mainPage,
      element: <div> <NavBar /> </div>,
      
   },
   {
      path: RouteEnum.displayTable,
      element: <DisplayTable />
   },
   {
      path: RouteEnum.mapPage,
      element: <StationMap />
   }
]);

export default router;