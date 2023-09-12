import { createBrowserRouter } from "react-router-dom";

import { DisplayTable, MainPage } from "components";
import { RouteConstant } from "./routeConstant";

const router = createBrowserRouter([
   {
      path: RouteConstant.mainPage,
      element: <MainPage />,
      
   },
   {
      path: RouteConstant.displayTable,
      element: <DisplayTable />
   }
]);

export default router;