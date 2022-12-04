import React from "react";

const AllUsersList = ({userList}) => {
return (
    <div>
    {" "}
    All Users
    {userList.map((user) => {
      return (
        <div className="all_users_list" key={`userList-id${user.id}`}>
          <div className="user_info">
            <b>ID: </b>
            {user.id}
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