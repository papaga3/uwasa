import { createBrowserRouter, createHashRouter } from "react-router-dom";

import { DisplayTable, MainPage } from "components";
import { RouteEnum } from "./routeConstant";

const router = createHashRouter([
   {
      path: RouteEnum.mainPage,
      element: <MainPage />,
      
   },
   {
      path: RouteEnum.displayTable,
      element: <DisplayTable />
   }
]);

export default router;