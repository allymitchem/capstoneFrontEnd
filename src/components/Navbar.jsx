import React from 'react'
import { Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <div id='navbar'>
                <h2>I am navbar</h2>
            </div>
            <Outlet />
        </>
    );
};

export default Navbar