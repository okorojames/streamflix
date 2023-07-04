import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
  };

  //
  return (
    <div className="register_section">
      <form className="register_form" onSubmit={handleRegister}>
        <input type="text" placeholder="first name" />
        <input type="text" placeholder="last name" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button type="submit">Register</button>
      </form>
      <p className="register_footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
