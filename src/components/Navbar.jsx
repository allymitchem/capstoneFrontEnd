import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Admin from './Admin'

const Navbar = ({user, setUser}) => {
   console.log(user, "usernav")
    return (
        <>
            <div id='navbar'>
                <h2>I am navbar</h2>
                <Link to="products"><button className= "nav_buttons">Products</button></Link>
               <LoginForm user={user} setUser={setUser}/>
               {user.id == 1 ? 
               <Link to="admin"><button>Admin</button></Link> : null}
            </div>
            <Outlet />
        </>
    );
};

export default Navbar