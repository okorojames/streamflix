import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="register_section">
      <form className="register_form">
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button type="submit">Register</button>
      </form>
      <p className="register_footer">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
