import React, {useEffect, useState} from "react";
import {OrderHistory} from "./"
import { pastCarts } from "../api/carts";

const UserDashboard =  ({user}) => {


    return (
        <div className="user_dashboard">
            I am user dashboard

            <OrderHistory  user={user}/>
        </div>
    )
}

export default UserDashboard