import React from "react";
import UserInfo from "./UserInfo";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const UserDashboard =  ({user, setUser }) => {

    return (
        <div className="user_tabs">
        <Tabs>
            <TabList >
                <Tab>User Info</Tab>
                <Tab>Order History</Tab>  
            </TabList>
            <TabPanel>
                <UserInfo user={user} setUser={setUser}/>
            </TabPanel>
            <TabPanel>

            </TabPanel>
        </Tabs>
      
           
        </div>
        
    )
}

export default UserDashboard
