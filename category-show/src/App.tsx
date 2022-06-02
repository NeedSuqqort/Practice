import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { Category } from "./component/category/category";

const Home = () => {
  return (
    <>
     <Category />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
