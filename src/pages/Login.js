import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../styles/login.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Loginn = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response) {
        localStorage.setItem("token", response.data.accessToken);
      }
      console.log(response);
    });
  };

  return (
    <>
      <div className="login">
        <h1>Login </h1>
        <input
          type="text"
          placeholder="username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <Link to="/forms">
          <button onClick={Loginn}> Login</button>{" "}
        </Link>
        <p>
          Doesn't have account <Link to="/signup">Sign Up </Link> here
        </p>
      </div>
    </>
  );
}

export default Login;
