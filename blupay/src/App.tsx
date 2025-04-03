import React from "react";
import { BuilderComponent, builder } from "@builder.io/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";

builder.init("26f75009eb984fdf84e8a5f10f28c4b7");

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to sign in */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        
        {/* Authentication routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Dashboard route - will be implemented later */}
        <Route path="/dashboard" element={
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-4">Coming soon...</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
