import React, {useEffect, useState} from "react";
import { adminUserData } from "../api/users";

const Admin =()=> {
    
    const [userList, setUserList]= useState([])
    useEffect(()=>{
        async function getUsers (){
            const allUsers = await adminUserData()
            console.log(allUsers, "admin comp")
            setUserList(allUsers)

        }
        getUsers()
    }, [])

    return (
        <div>
            {userList.map((user) => {
                return (
                    <div className="all_users_list" key={`userList-id${user.id}`}>
                        <div><b>ID: </b>{user.id}</div>
                        <div><b>Username: </b>{user.username}</div>
                        <div><b>Email: </b> {user.email}</div>
                    </div>
                )
            })

            }
        </div>
    )

}

export default Admin