import React, { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/streamflix-logo.png";

const Navbar = () => {
  // const refs
  const nav_links = useRef();
  const burger_one = useRef();
  const burger_two = useRef();
  const burger_three = useRef();
  // handle toggle nav
  const handle_toggle_nav = () => {
    nav_links.current.classList.toggle("nav_toggle");
    burger_one.current.classList.toggle("nav_toggle");
    burger_two.current.classList.toggle("nav_toggle");
    burger_three.current.classList.toggle("nav_toggle");
  };

  //
  return (
    <nav>
      <Link to="/" className="nav_logo">
        <img src={logo} alt="logo" />
      </Link>
      <div className="nav_links" ref={nav_links}>
        <Link to="/" className="nav_link">
          Home
        </Link>
        <Link to="/all-movies" className="nav_link">
          Movies/Tv-Shows
        </Link>
        <button className="nav_link logout_btn">Logout</button>
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
