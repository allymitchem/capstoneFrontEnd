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

    //On change of the input fields, the formData state is updated. On submission, username and password are sent to the middleware for verification of if the user exists. If token is true, we remove any previous token and username from local storage and reset those. Then, we navigate to products. If token is not true, we set and error message below the form.
    async function handleSubmit(event) {
        event.preventDefault();
        const username = formData.username;
        const password = formData.password;
        const loggedUser = await loginUser(username, password);

        const token = loggedUser.token;

        if (token) {
            localStorage.removeItem("token");
            localStorage.setItem("token", token);
            setUser(loggedUser.user);
            navigate("/products");
        }
        if (loggedUser){
         
          setErrorMessage("")
        }
        if (!token) {
          setErrorMessage(loggedUser.message)
        
        }
        setFormData({ username: "", password: "" }) 
    }


    function logOutButton () {
        localStorage.removeItem("token")
        setFormData({username: "", password: ""})
        setUser({id: 0, username: "guest"})
        navigate("/products")
    }


    return (
        <div className="login_box">
            {user.id ? (
                <div id="logout_button">
                <button className="logout"  onClick={logOutButton}>Logout</button>
                </div>
            ) : (
                <form className="login_form" onSubmit={handleSubmit}>
                    <div>
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
                    <button className="login_button" type="submit">Submit</button>
                    </div>
                    <Link className="register_link" to="register">
                        Not a member? Sign up
                    </Link>
                </form>
                
                
            )}
            <div className="login_error_message">
            {errorMessage ? errorMessage : null}
            </div>

        </div>
    );
};

export default LoginForm;
