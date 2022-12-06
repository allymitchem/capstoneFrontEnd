import React from "react";
import UserInfo from "./UserInfo";

const UserDashboard =  ({user, setUser }) => {

    return (
        <div>
            I am user dashboard
            <UserInfo user={user} setUser={setUser}/>
        </div>
        
    )
}

export default UserDashboard
