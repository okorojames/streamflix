import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import MoviesContextProvider from "./contexts/MoviesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <MoviesContextProvider>
        <App />
      </MoviesContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
