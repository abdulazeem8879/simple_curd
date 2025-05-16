import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<div className="p-8"><Home /></div>} />
            <Route path="/search" element={<div className="p-8">Search Page</div>} />
            <Route path="/profile" element={<div className="p-8">Profile Page</div>} />
            <Route path="/cart" element={<div className="p-8">Cart Page</div>} />
            <Route path="/about" element={<div className="p-8"><About /></div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
