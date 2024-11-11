import React, {useState} from "react";
import './navbar.css';
import { Link } from 'react-scroll';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    // const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="navbar fixed-top">
            <span className="title">WellSpring</span>
                <div className="desktopMenu">
                    <Link activeClass="active" onClick={()=>navigate("/")} className="desktopMenuListItem">HOME</Link>
                    <Link activeClass="active" onClick={()=>navigate("/dashboard")} className="desktopMenuListItem">DASHBOARD</Link>
                    <Link activeClass="active" onClick={()=>navigate("/resources")} className="desktopMenuListItem">RESOURCES</Link>
                </div>
            <div className="button">
                <span className="Sign-in">SIGN IN</span>
            </div>
        </nav>
    )
}

export default Navbar;