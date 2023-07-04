import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";

const App = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <Navbar />
      <main className="main_sections">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie_details/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<Movies />} />
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
