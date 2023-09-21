import { NavBar } from 'components';
import './App.css';
import React, { FC } from "react";
import { RouterProvider } from 'react-router-dom';
import router from 'routes/router';

const App: FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
      <NavBar />
    </React.StrictMode>
  );
}

export default App;
