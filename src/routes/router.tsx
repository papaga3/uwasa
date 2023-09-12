import { createBrowserRouter } from "react-router-dom";

import { DisplayTable, MainPage } from "components";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainPage />,
      
   },
   {
      path: "/productTable",
      element: <DisplayTable />
   }
]);

export default router;