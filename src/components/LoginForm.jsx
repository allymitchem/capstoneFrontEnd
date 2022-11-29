import React, { useState } from "react";
import { loginUser } from "../api/users";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

console.log(formData.password, "I am state")

const userToken = localStorage.getItem("token")
console.log(userToken, "userToken")

async function handleSubmit (event) {
  event.preventDefault()
  const username = formData.username
  const password = formData.password
  const loggedUser = await loginUser(username, password)
  const token = loggedUser.token
  localStorage.removeItem("token")
  localStorage.setItem("token", token)
  localStorage.removeItem("username")
  localStorage.setItem("username", username)

  setFormData({username: "", password: ""})

  if (!token) {
    alert(loggedUser.message)
  }
}

async function logOutButton () {
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  setFormData({username: "", password: ""})
}

  return ( userToken ? 
    <div>
      <button onClick={logOutButton}>Logout</button>
    </div>
    :
    <div className="login_form">
      <form onSubmit={handleSubmit}>
      <input
      placeholder="Username"
      type="text"
      className="login_input"
      required
      onChange={(e) =>
        setFormData({ ...formData, username: e.target.value })
      }
      value= {formData.username}
      />
      <input
      placeholder="Password"
      type="password"
      className="login_input"
      required
      onChange={(e) =>
        setFormData({ ...formData, password: e.target.value })
      }
      value= {formData.password}
      />
      <button type="submit">Submit</button>
      </form>
    </div>
  )

}

export default LoginForm