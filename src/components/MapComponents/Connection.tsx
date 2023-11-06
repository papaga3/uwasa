import { FC } from "react";
import Xarrow, { labelsType } from "react-xarrows";
import { ConnectionType } from "types";

interface Props {
   start: string;
   end: string;
   distance: number;
};

// Used to render connection between class
export const Connection: FC<Props> = ({ 
   start, end, distance
}) => {
   const labels: labelsType = {
      middle: <div> {distance}km </div>
    };
   return (
      <Xarrow
         start={start}
         end={end}
         labels={labels}
         showHead={false}
      />
   );
}