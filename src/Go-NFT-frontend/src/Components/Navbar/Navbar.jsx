import React from 'react';
import './Navbar.css';

const handleLogin = () => {
    alert('Login functionality will be added soon!');
};

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Go NFT</h1>
            </div>
            <button className="login-button" onClick={handleLogin}>Login</button>
        </nav>
    );
};

export default Navbar;