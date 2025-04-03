import React, { useState } from "react";
import { BuilderComponent, builder } from "@builder.io/react";
import "./App.css";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";

builder.init("26f75009eb984fdf84e8a5f10f28c4b7");

function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "signin" | "forgotPassword" | "signup"
  >("home");

  if (currentPage === "signin") {
    return (
      <SignIn
        onForgotPassword={() => setCurrentPage("forgotPassword")}
        onSignUp={() => setCurrentPage("signup")}
      />
    );
  }

  if (currentPage === "forgotPassword") {
    return <ForgotPassword onBackToLogin={() => setCurrentPage("signin")} />;
  }

  if (currentPage === "signup") {
    return <SignUp onBackToLogin={() => setCurrentPage("signin")} />;
  }

  return (
    <div className="App">
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setCurrentPage("signin")}
          className="px-4 py-2 mt-4 bg-blue-700 text-white rounded-full"
        >
          Go to Sign In
        </button>
        <button
          onClick={() => setCurrentPage("signup")}
          className="px-4 py-2 mt-4 bg-blue-700 text-white rounded-full"
        >
          Go to Sign Up
        </button>
      </div>
      <div className="mt-4">
        <BuilderComponent model="page" />
      </div>
    </div>
  );
}

export default App;
