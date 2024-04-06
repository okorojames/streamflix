import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/streamflix-logo.png";

const Navbar = () => {
  //
  const navigate = useNavigate();
  // const refs
  const nav_links = useRef(null);
  const burger_one = useRef(null);
  const burger_two = useRef(null);
  const burger_three = useRef(null);
  // handle toggle nav
  const handle_toggle_nav = () => {
    nav_links.current.classList.toggle("nav_toggle");
    burger_one.current.classList.toggle("nav_toggle");
    burger_two.current.classList.toggle("nav_toggle");
    burger_three.current.classList.toggle("nav_toggle");
  };

  // handleLogout
  const handleLogout = () => {
    localStorage.clear();
    nav_links.current.classList.remove("nav_toggle");
    burger_one.current.classList.remove("nav_toggle");
    burger_two.current.classList.remove("nav_toggle");
    burger_three.current.classList.remove("nav_toggle");
    navigate("/login");
  };
  const closeNav = () => {
    nav_links.current.classList.remove("nav_toggle");
    burger_one.current.classList.remove("nav_toggle");
    burger_two.current.classList.remove("nav_toggle");
    burger_three.current.classList.remove("nav_toggle");
  };

  //
  return (
    <nav>
      <Link to="/" className="nav_logo" onClick={closeNav}>
        <img src={logo} alt="logo" />
      </Link>
      <div className="nav_links" ref={nav_links}>
        <Link to="/" className="nav_link" onClick={closeNav}>
          Home
        </Link>
        <Link to="/movies" className="nav_link" onClick={closeNav}>
          Movies/Tv-Shows
        </Link>
        <button className="nav_link logout_btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="hamburger" onClick={handle_toggle_nav}>
        <div className="burger burger_one" ref={burger_one}></div>
        <div className="burger burger_two" ref={burger_two}></div>
        <div className="burger burger_three" ref={burger_three}></div>
      </div>
    </nav>
  );
};

export default Navbar;
