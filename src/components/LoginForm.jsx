import React, { useState } from "react";
import { loginUser } from "../api/users";
import { Link, useNavigate } from "react-router-dom";
const LoginForm = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
const navigate = useNavigate()
  
  const userToken = localStorage.getItem("token");

  async function handleSubmit(event) {
    event.preventDefault();
    const username = formData.username;
    const password = formData.password;
    const loggedUser = await loginUser(username, password);
    // console.log(loggedUser.user)
    
    const token = loggedUser.token;

    if (token) {
    // console.log(token);
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    localStorage.removeItem("username");
    localStorage.setItem("username", username); 
    navigate("/products")
    }

    setFormData({ username: "", password: "" });
    setUser(loggedUser.user);
  
    console.log(token, "line 29 component");
    if (!token) {
      alert(loggedUser.message);
    }
  }

  async function logOutButton () {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setFormData({username: "", password: ""})
  }

  return ( userToken ?
    <button onClick={logOutButton}>Logout</button> :
    <div>
      <form className="login_form" onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          type="text"
          className="login_input"
          required
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          value={formData.username}
        />
        <input
          placeholder="Password"
          type="password"
          className="login_input"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
        />
        <button type="submit">Submit</button>
        <Link className="register_link" to="register">
          Not a member? Sign up
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
