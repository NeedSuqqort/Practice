// import { Route, Routes } from "react-router";
import {
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import { Item } from "./pages/item/item";
import {Home} from "./pages/home/home";


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<Item />} />
      </Routes>
  );
};



export default App
