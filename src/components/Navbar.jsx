import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Admin from './Admin'

const Navbar = ({user, setUser}) => {
    return (
        <>
            <div id='navbar'>
                <h2>SHEDS & DIGNITY</h2>
                <Link to="products"><button className= "nav_buttons">Products</button></Link>
               <LoginForm user={user} setUser={setUser}/>
               {user.id == 1 ? 
               <Link to="admin"><button>Admin</button></Link> : null}
               <Link to="cart"><button>Cart 🛒</button></Link>
            </div>
            <Outlet />
        </>
    );
};

export default Navbar