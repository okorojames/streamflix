import {
  Link,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";

const App = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <Navbar />
      <GetToTop />
      <main className="main_sections">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie_details/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer className="footer_section">
        <p>
          Built by&nbsp;
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

// scroll to top component

export const GetToTop = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, searchParams]);
};
