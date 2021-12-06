import React, { useState } from "react";
import Axios from "axios";
import "../styles/signup.css";
import { Link } from "react-router-dom";

function Signup() {
  const [regUserame, setUsername] = useState("");
  const [regPass, setPass] = useState("");

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", {
      username: regUserame,
      password: regPass,
    }).then((response) => {
      if (response) {
        localStorage.setItem("token", response.data.accessToken);
      }
      console.log(response);
    });
  };
  return (
    <>
      <div className="signup">
        <h1> Sign Up </h1>
        <label>Username </label>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <label>Password </label>
        <input
          type="password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          required
        />
        <Link to="/forms">
          <button onClick={signUp}>Sign Up </button>
        </Link>
      </div>
    </>
  );
}

export default Signup;
