import { FC } from "react";
import { Link } from "react-router-dom";
import { RouteConstant } from "routes";

export const MainPage: FC = () => {
   return (
      <div>
         <Link to={RouteConstant.displayTable}> Display Table </Link>
         <Link to="/">Home</Link>
      </div>
   );
}