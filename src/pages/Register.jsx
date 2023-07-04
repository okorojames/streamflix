import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  // checking if user details already exists
  const users_data_exists = JSON.parse(localStorage.getItem("users_details"));
  useEffect(() => {
    if (users_data_exists) {
      navigate("/");
    }
  }, []);

  //
  const navigate = useNavigate();
  // states
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // state contexts
  const { passwordType, changePassType } = useContext(AuthContext);

  //
  const userDetails = { firstName, lastName, email, password };

  // handle registration function
  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch(
        "https://streamflix-server.onrender.com/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );
      const data = await res.json();
      if (res) {
        setLoading(false);
      }
      if (res.ok) {
        localStorage.setItem("users_details", JSON.stringify(data));
        navigate("/");
      }
      if (!res.ok) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //
  return (
    <div className="register_section">
      <form className="register_form" onSubmit={handleRegister}>
        {error && <p className="register_err">{error}</p>}
        <input
          type="text"
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password_input_wrapper">
          <input
            type={passwordType === true ? "password" : "text"}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="passsword_eye"
            onClick={changePassType}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        <button type="submit">
          {loading === false ? "Register" : "Loading..."}
        </button>
      </form>
      <p className="register_footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
