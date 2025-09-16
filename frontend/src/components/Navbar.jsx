import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">MyZone</Link>
                <ul className="nav-links">
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/products">products</Link></li>
                    <li><a href="#footer">about</a></li>
                    <li><Link to="/login"><img src="/assets/sign-in.ico" alt="" width="24" height="24" /></Link></li>
                    <li><Link to="/cart"><img src="/assets/shopping-cart.svg" alt="" width="24" height="24" /></Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

