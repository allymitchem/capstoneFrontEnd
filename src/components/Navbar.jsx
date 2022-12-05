import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import LoginForm from './LoginForm';


const Navbar = ({user, setUser, cart}) => {

    return (
        <div id='navbar'>
            <img  className="logo" src="https://res.cloudinary.com/fsa2/image/upload/v1670213973/Site%20Images/1_nljlde.png"/>
                
            <div className="navbar_box">
                <LoginForm user={user} setUser={setUser}/>
                <ul className='nav_links'>
                    <li><Link to="/" className="nav_buttons">Home</Link></li>
                    <li><Link to="products" className= "nav_buttons">Products</Link></li>
                    {user && user.id == 1 ? 
                        <li><Link to="admin" className= "nav_buttons">Admin</Link></li> 
                    : null}
                    {cart.items.length ?
                        <li><Link to="cart" className= "nav_buttons" id="cart_nav"><span className="material-symbols-outlined">
                        shopping_cart
                        </span>({cart.items.length})</Link></li>
                    : null} 
                </ul>
            </div>
        </div>
    );
};

export default Navbar