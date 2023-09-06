import { FC } from "react";

import data from "../data/data.json";

interface Props {};

export const DisplayTable: FC<Props> = () => {
   console.log(data);
   return (
      <h1> Demo </h1>
   );
}