import React from "react";

import "./App.css";
import Create from "./components/create";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./components/Edit";
import ViewDetails from "./components/ViewDetails";
import List from "./components/list";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/view/:id" element={<ViewDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
