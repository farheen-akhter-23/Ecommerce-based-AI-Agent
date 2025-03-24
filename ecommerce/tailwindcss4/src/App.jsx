import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardGrid from "./card";
import ProductDetail from "./ProductDetail";
import "./App.css"
import Login from "./Login";
import './index.css';
import { Navigate } from 'react-router-dom';

function App() {
  const isLoggedIn = !!localStorage.getItem("username"); // Check if user is logged in

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isLoggedIn ? <CardGrid /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/:id"
          element={isLoggedIn ? <ProductDetail /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;