import React, {useState} from "react";
import { updateUser } from "../api/users";

const UpdateUserForm = ({user, setUser, readyToEdit, setReadyToEdit}) => {
    
    const [inputField, setInputField] =useState({
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        shippingAddress: user.shippingAddress,
        billingAddress: user.billingAddress,
        cardNumber: user.cardNumber,
        expiration: user.expiration
    })
    

    async function handleSubmit(event){
        event.preventDefault()

        const editedUser = await updateUser(inputField)
        console.log(editedUser, "this is edited user")
        console.log(setUser(editedUser, "this is set user"))
        if (editedUser){
        setUser(editedUser)
        setReadyToEdit(false)
        
        }
    }

    return(
    <div>
        <form className="update_user_form" onSubmit={handleSubmit} >
            <label>Username: </label>
                <input
                type="text"
                placeholder="username"
                required
                onChange={(event) =>
                        setInputField({ ...inputField, username: event.target.value })
                    }
                value={inputField.username}
                />
            <label>Password: </label>
                <input
                type="password"
                placeholder="password"
                required
                onChange={(event) =>
                        setInputField({ ...inputField, password: event.target.value })
                    }
                value={inputField.password}
                />
            <label>Email: </label>
                <input
                type="text"
                placeholder="email"
                required
                onChange={(event) =>
                        setInputField({ ...inputField, email: event.target.value })
                    }
                value={inputField.email}
                />
            <label>First Name: </label>
                <input
                type="text"
                placeholder="First Name"
               
                onChange={(event) =>
                        setInputField({ ...inputField, firstName: event.target.value })
                    }
                value={inputField.firstName}
                />
            <label>Last Name: </label>
                <input
                type="text"
                placeholder="Last Name"
                
                onChange={(event) =>
                        setInputField({ ...inputField, lastName: event.target.value })
                    }
                value={inputField.lastName}
                />
            <label>Shipping Address: </label>
                <input
                type="text"
                placeholder="Shipping Address"
            
                onChange={(event) =>
                        setInputField({ ...inputField, shippingAddress: event.target.value })
                    }
                value={inputField.shippingAddress}
                />
            <label>Billing Address: </label>
                <input
                type="text"
                placeholder="Billing Address"
            
                onChange={(event) =>
                        setInputField({ ...inputField, billingAddress: event.target.value })
                    }
                value={inputField.billingAddress}
                />
            <label>Credit Card Number: </label>
                <input
                type="text"
                placeholder="Credit Card Number"
            
                onChange={(event) =>
                        setInputField({ ...inputField, cardNumber: event.target.value })
                    }
                value={inputField.cardNumber}
                />
             <label>Card Expiration Date: </label>
                <input
                type="text"
                placeholder="Card Expiration Date"
            
                onChange={(event) =>
                        setInputField({ ...inputField, expiration: event.target.value })
                    }
                value={inputField.expiration}
                />
                 <button className="update_user_button" type="submit">Update</button>
        </form>
        
    </div>
    )
}

export default UpdateUserForm