import React, {useState} from "react";
import { registerUser } from "../api/users";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        username:"",
        password: "",
        email:""
    })
    
    const [registerMessage, setRegisterMessage]= useState({})
    
    //On change, input fields get sent to the state. Then, we store that state into some variables. Then, those variables are sent to the registerUser function which makes a call to post a new user to our database. We then retrieve a token and set it to local storage. We then send the registeringUser object to the registerMessage state and render a message if the token is not true via an alert.
    async function handleSubmit(event){
        
        event.preventDefault()
        const firstName = formData.firstName
        const lastName = formData.lastName
        const username = formData.username
        const password = formData.password
        const email = formData.email

        const registeringUser = await registerUser(username, password, email, firstName, lastName)
        const token = registeringUser.token
        setRegisterMessage(registeringUser)

        localStorage.removeItem("token")
        localStorage.setItem("token", token)
        localStorage.removeItem("username")
        localStorage.setItem("username", username)

        if (!token) {

            alert(registeringUser.message)
          } 

        localStorage.removeItem("token")
        localStorage.removeItem("username")
    }


    return(registerMessage.user ? 
        <div className="register_message">
            {registerMessage.message}
        </div>
        :
        <div className="register_container">
            
            <form className="register_form" onSubmit={handleSubmit}>
                <h2 className="register_title">Registration Form</h2>

                <div className="input_container">
                <label className="register_label">First Name: </label>
                <input 
                placeholder= "First Name"
                type = "text"
                className = "register_input"
                required
                onChange={(event) => {
                    setFormData({...formData, firstName:event.target.value})
                }}
                value={formData.firstName}
                />
                </div>

                <div className="input_container">
                <label className="register_label">Last Name: </label>
                <input 
                placeholder= "Last Name"
                type = "text"
                className = "register_input"
                required
                onChange={(event) => {
                    setFormData({...formData, lastName:event.target.value})
                }}
                value={formData.lastName}
                />
                </div>

                <div className="input_container">
                <label className="register_label">Username: </label>
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
                </div>

                <div className="input_container">
                <label className="register_label">Email: </label>
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
                </div>

                <div className="input_container">
                <label className="register_label">Password: </label>
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
                </div>
                
                <button className="register_button" type="submit">Register Account</button>
            </form>
        </div>
    )

}

export default Register