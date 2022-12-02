import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import LoginForm from './LoginForm';


const Navbar = ({user, setUser, cart}) => {

    return (
        <>
            <div id='navbar'>
                <h2>SHEDS & DIGNITY</h2>
                <Link to="products"><button className= "nav_buttons">Products</button></Link>
                <LoginForm user={user} setUser={setUser}/>
                {user && user.id == 1 ? 
                <Link to="admin"><button>Admin</button></Link> : null}
                {cart.items.length ?
                    <Link to="cart"><button>Cart 🛒 ({cart.items.length})</button></Link>
                : null}
            </div>
        </>
    );
};

export default Navbar