import React from "react";

const AllUsersList = ({userList}) => {
return (
    <div>
    {" "}
    Current Users
    {userList.map((user) => {
      return (
        <div className="all_users_list" key={`userList-id${user.id}`}>
          <div>
            <b>ID: </b>
            {user.id}
          </div>
          <div>
            <b>Username: </b>
            {user.username}
          </div>
          <div>
            <b>Email: </b> {user.email}
          </div>
        </div>
      );
    })}
    </div>

)

}

export default AllUsersList