import React from "react";

const AllUsersList = ({userList}) => {
console.log(userList)
//This component gives the admin access to user information on the admin page.

return (
    <div>
    {" "}
    
    {userList.map((user) => {
      return (
        <div className="all_users_list" key={`userList-id${user.id}`}>
          <div className="user_info">
            <b>ID: </b>
            {user.id}
          </div>
          <div className="user_info">
            <b>First Name: </b>
            {user.firstName}
          </div>
          <div className="user_info">
            <b>Last Name: </b>
            {user.lastName}
          </div>
          <div className="user_info">
            <b>Username: </b>
            {user.username}
          </div>
          <div className="user_info">
            <b>Email: </b> {user.email}
          </div>
        </div>
      );
    })}
    </div>

)

}

export default AllUsersList