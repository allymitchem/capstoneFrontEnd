import React, {useState} from "react";
import { registerUser } from "../api/users";

const Register = () => {
    const [formData, setFormData] = useState({
        username:"",
        password: "",
        email:""
    })

    async function handleSubmit(event){
        event.preventDefault()
        const username = formData.username
        const password = formData.password
        const email = formData.email

        const registeringUser = await registerUser(username, password, email)
        const token = registeringUser.token

        
        localStorage.removeItem("token")
        localStorage.setItem("token", token)
        localStorage.removeItem("username")
        localStorage.setItem("username", username)

        if (!token) {
            alert(registeringUser.message)
          } else {
            alert(registeringUser.message)
          }

        localStorage.removeItem("token")
        localStorage.removeItem("username")
    }


    return(
        <div>
            <form className="register_form" onSubmit={handleSubmit}>
                <input 
                placeholder= "username"
                type = "text"
                className = "register_input"
                required
                onChange={(event) => {
                    setFormData({...formData, username:event.target.value})
                }}
                value={formData.username}
                />
                <input 
                placeholder= "email"
                type = "text"
                className = "register_input"
                required
                onChange={(event) => {
                    setFormData({...formData, email:event.target.value})
                }}
                value={formData.email}
                />
                <input 
                placeholder= "password"
                type = "password"
                className = "register_input"
                required
                onChange={(event) => {
                    setFormData({...formData, password:event.target.value})
                }}
                value={formData.password}
                />
                <button type="submit">Register Account</button>
            </form>
        </div>
    )

}

export default Register