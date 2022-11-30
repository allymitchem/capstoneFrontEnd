import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const Navbar = ({user, setUser}) => {
   
    return (
        <>
            <div id='navbar'>
                <h2>I am navbar</h2>
                <Link to="products"><button className= "nav_buttons">Products</button></Link>
               
                {user ? (<Link
                onClick={()=>{
                    localStorage.removeItem("token");
                    localStorage.removeItem("user")  
                    setUser(null) 
                }}>Log Out</Link>) :(
               <LoginForm user={user} setUser={setUser}/>)}
            </div>
            <Outlet />
        </>
    );
};

export default Navbar