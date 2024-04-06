import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  //
  const navigate = useNavigate();

  // check if user isi logged in
  const users_data_exists = JSON.parse(localStorage.getItem("users_details"));
  useEffect(() => {
    if (users_data_exists) {
      navigate("/");
    }
  }, []);

  //
  const [email, setEmail] = useState("johndeo@gmail.com");
  const [password, setPassword] = useState("John1234");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // state context
  const { passwordType, changePassType } = useContext(AuthContext);

  // user details
  const user_details = { email, password };

  // handle Login user
  const handleLoginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://streamflix-server.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user_details),
        }
      );
      const data = await res.json();
      if (res) {
        setLoading(false);
      }
      if (!res.ok) {
        setError(data.msg);
      }
      if (res.ok) {
        localStorage.setItem("users_details", JSON.stringify(data));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //
  return (
    <div className="register_section">
      <form className="register_form" onSubmit={handleLoginUser}>
        {error && <p className="register_err">{error}</p>}
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="password_input_wrapper">
          <input
            type={passwordType === true ? "password" : "text"}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
          {loading === false ? "Login" : "Loading ..."}
        </button>
      </form>
      <p className="register_footer">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
