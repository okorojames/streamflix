import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  //
  const navigate = useNavigate();
  // check if user is logged in
  const users_data_exists = JSON.parse(localStorage.getItem("users_details"));
  useEffect(() => {
    if (!users_data_exists) {
      navigate("/login");
    }
  }, []);

  //
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        fontSize: "2.4rem",
        textAlign: "center",
      }}
    >
      Still under Development...
    </div>
  );
};

export default Movies;
