import React, { useState } from "react";
//import "./App.css";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import Forms from "./pages/Forms.js";
import Dashboard from "./pages/Dashboard.js";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
