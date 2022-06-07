// import { Route, Routes } from "react-router";
import {
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import { Category } from "./component/category/category";
import { Navbar } from "./component/navbar/navbar";
import { Item } from "./component/category/item";

const Home = () => {
  return (
    <>
    <Navbar/>
     <Category />
    </>
  );
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Item />} />
      </Routes>
    </div>
  );
};



export default App
