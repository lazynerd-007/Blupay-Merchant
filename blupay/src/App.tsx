import React, { useState } from "react";
import { BuilderComponent, builder } from "@builder.io/react";
import "./App.css";
import SignIn from "./pages/SignIn";

builder.init("26f75009eb984fdf84e8a5f10f28c4b7");

function App() {
  const [showSignIn, setShowSignIn] = useState(false);

  if (showSignIn) {
    return <SignIn />;
  }

  return (
    <div className="App">
      <button
        onClick={() => setShowSignIn(true)}
        className="px-4 py-2 mt-4 bg-blue-700 text-white rounded-full"
      >
        Go to Sign In
      </button>
      <div className="mt-4">
        <BuilderComponent model="page" />
      </div>
    </div>
  );
}

export default App;
