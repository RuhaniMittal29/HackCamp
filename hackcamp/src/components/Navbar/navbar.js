// src/components/Navbar/navbar.js
import React from "react";
import './navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import "./../Form/form.css";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar fixed-top">
            <span className="title" onClick={() => navigate("/")}>WellSpring</span>
            <div className="desktopMenu">
                <NavLink to="/" className="desktopMenuListItem" activeClassName="active">HOME</NavLink>
                <NavLink to="/dashboard" className="desktopMenuListItem" activeClassName="active">DASHBOARD</NavLink>
                <NavLink to="/resources" className="desktopMenuListItem" activeClassName="active">RESOURCES</NavLink>
                <NavLink to="/contact" className="desktopMenuListItem" activeClassName="active">SAY HELLO ;)</NavLink>
                <NavLink to="/form" className="desktopMenuListItem" activeClassName="active">FORM</NavLink>
            </div>
            <div className="button" onClick={() => navigate("/signin")}>
                <span className="Sign-in">SIGN IN</span>
            </div>
        </nav>
    );
};

export default Navbar;
