import React, {useState} from "react";
import { updateUser } from "../api/users";
import UpdateUserForm from "./UpdateUserForm";

const UserInfo =({user, setUser})=>{
    const [readyToEdit, setReadyToEdit] = useState(false)
    console.log(user, "this is user")
    return(
        <div>
            I am user info
            <div className="user_profile_info">
                <div>Username: {user.username}</div>
                <div>Password: {user.password}</div>
                <div>Email: {user.email}</div>
                <div>First Name: {user.firstName}</div>
                <div>Last Name: {user.lastName}</div>
                <div>Shipping Address: {user.shippingAddress}</div>
                <div>Billing Address: {user.billingAddress}</div>
                <div>Credit Card Number: {user.cardNumber}</div>
                <div>Card Expiration Date: {user.expiration}</div>
                </div>
            <button
            className="edit_user_button"
                  onClick={() => {
                    setReadyToEdit(!readyToEdit);
                  }}>
                  <span className="material-symbols-outlined">edit</span>
                </button>
              
            {readyToEdit ? 
            <UpdateUserForm user={user} setUser={setUser} readyToEdit={readyToEdit} setReadyToEdit={setReadyToEdit}/>
              : null } 
               
        </div>
    )

}




export default UserInfo