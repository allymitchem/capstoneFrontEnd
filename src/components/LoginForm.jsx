import React, { useState } from "react";
import { loginUser } from "../api/users";
import { Link, useNavigate } from "react-router-dom";
const LoginForm = ({ user, setUser }) => {
    const [errorMessage, setErrorMessage]= useState("")
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const username = formData.username;
        const password = formData.password;
        const loggedUser = await loginUser(username, password);

        const token = loggedUser.token;

        if (token) {
            console.log(token);
            localStorage.removeItem("token");
            localStorage.setItem("token", token);
            localStorage.removeItem("username");
            localStorage.setItem("username", username);
            setUser(loggedUser.user);
            navigate("/products");
        }
        if (loggedUser){
         
          setErrorMessage("")
        }
        if (!token) {
          console.log(loggedUser)
          setErrorMessage(loggedUser.message)
        
        }
        setFormData({ username: "", password: "" })
        

        
    }


  async function logOutButton () {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setFormData({username: "", password: ""})
    setUser({id: 0, username: "guest"})
    navigate("/products")

  }


    return (
        <div>
            {user.id ? (
                <button onClick={logOutButton}>Logout</button>
            ) : (
                <form className="login_form" onSubmit={handleSubmit}>
                    <input
                        placeholder="Username"
                        type="text"
                        className="login_input"
                        required
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                username: e.target.value,
                            })
                        }
                        value={formData.username}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        className="login_input"
                        required
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        value={formData.password}
                    />
                    <button type="submit">Submit</button>
                    <Link className="register_link" to="register">
                        Not a member? Sign up
                    </Link>
                </form>
                
                
            )}
            {errorMessage ? errorMessage : null}


        </div>
    );
};

export default LoginForm;
