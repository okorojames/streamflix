import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import MoviesContextProvider from "./contexts/MoviesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <MoviesContextProvider>
        <App />
      </MoviesContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
