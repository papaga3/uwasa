import { FC } from "react";
import { Link } from "react-router-dom";
import { RouteEnum } from "routes";


export const MainPage: FC = () => {
   const displayLinkString = `/${RouteEnum.displayTable}`;
   return (
      <div>
         <Link to={displayLinkString}> Display Table </Link>
         
         <Link to="/">Home</Link>
      </div>
   );
}