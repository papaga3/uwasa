import { createHashRouter } from "react-router-dom";

import { DisplayTable, NavBar } from "components";
import { RouteEnum } from "./routeConstant";

const router = createHashRouter([
   {
      path: RouteEnum.mainPage,
      element: <div> <NavBar /> </div>,
      
   },
   {
      path: RouteEnum.displayTable,
      element: <DisplayTable />
   }
]);

export default router;