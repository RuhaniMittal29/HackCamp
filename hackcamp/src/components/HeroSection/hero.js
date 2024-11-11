// import React, {useState} from "react";
import './hero.css';
// import { Link } from 'react-scroll';
import Tree from "../../assets/tree.png";
import Bird from "../../assets/image.png";

const HeroSection = () => {

    return (
        <section id="Home">
            <div className="circle-container">
            <div className="quarter-circle top-left"></div>
            <div className="quarter-circle top-right"></div>
            <div className="quarter-circle bottom-left"></div>
            <div className="quarter-circle bottom-right"></div>
            <div className="main-circle">
                <img src={Tree} alt="tree" className="tree" />
            </div>
            <div className="bird">
                <img src={Bird} alt="bird" className="bird-img" />
            </div>
        </div>
        </section>
    );
}

export default HeroSection;