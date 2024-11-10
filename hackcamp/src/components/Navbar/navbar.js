import React, {useState} from "react";
import './navbar.css';
import { Link } from 'react-scroll';

const Navbar = () => {

    // const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="navbar fixed-top">
                <div className="desktopMenu">
                    <Link activeClass="active" to="" className="desktopMenuListItem">RESOURCES</Link>
                    <Link activeClass="active" to="" className="desktopMenuListItem">SAY HELLO ;)</Link>
                </div>
        </nav>
    )
}

export default Navbar;