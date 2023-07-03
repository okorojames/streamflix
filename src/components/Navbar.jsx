import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/streamflix-logo.png";

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="nav_logo">
        <img src={logo} alt="logo" />
      </Link>
      <div className="nav_links">
        <Link to="/" className="nav_link">
          Home
        </Link>
        <Link to="/movies" className="nav_link">
          Movies
        </Link>
        <Link to="/tv-shows" className="nav_link">
          Tv-Shows
        </Link>
        <button className="nav_link logout_btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
