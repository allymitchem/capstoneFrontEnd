import React from "react";
import { adminUserData } from "../api/users";

const Admin =()=> {
    

    async function getUsers (){
        const allUsers = await adminUserData()
        console.log(allUsers, "admin comp")
    }
    getUsers()

    return (
        <div>
            I am admin
        </div>
    )

}

export default Admin