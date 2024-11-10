import React, {useState} from "react";
import './navbar.css';
import { Link } from 'react-scroll';

const Navbar = () => {

    // const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="navbar fixed-top">
            <span className="title">WellSpring</span>
                <div className="desktopMenu">
                    <Link activeClass="active" to="" className="desktopMenuListItem">HOME</Link>
                    <Link activeClass="active" to="" className="desktopMenuListItem">DASHBOARD</Link>
                    <Link activeClass="active" to="" className="desktopMenuListItem">RESOURCES</Link>
                    <Link activeClass="active" to="" className="desktopMenuListItem">SAY HELLO ;)</Link>
                </div>
            <div className="button">
                <span className="Sign-in">SIGN IN</span>
            </div>
        </nav>
    )
}

export default Navbar;