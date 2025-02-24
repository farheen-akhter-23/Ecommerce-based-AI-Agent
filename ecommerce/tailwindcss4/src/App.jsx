import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardGrid from "./card";
import ProductDetail from "./ProductDetail";
import "./App.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardGrid />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;