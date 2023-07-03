import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <Navbar />
      <main className="main_sections">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <footer className="footer_section">
        <p>
          Built by{" "}
          <Link to="https://okorojames.netlify.app" target="_blank">
            JamexTech
          </Link>
        </p>
        <p>CopyRight &copy; {date}</p>
      </footer>
    </>
  );
};

export default App;
