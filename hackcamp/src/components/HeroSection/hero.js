import React, {useState} from "react";
import './hero.css';
import { Link } from 'react-scroll';
import Tree from "../../assets/tree.png";
import Bird from "../../assets/image.png";
import Water from "../../assets/water-home.png";
import Sleep from "../../assets/sleep-home.png";
import Food from "../../assets/food-home.png";
import Fitness from "../../assets/fitness-home.png";

const HeroSection = () => {

    return (
        <section id="Home">
            <div className="circle-container">
            <div className="quarter-circle top-left">
                <img src={Water} alt="water" className="quarter-img" />
            </div>
            <div className="quarter-circle top-right">
                <img src={Sleep} alt="sleep" className="quarter-img" />
            </div>
            <div className="quarter-circle bottom-left">
                <img src={Food} alt="sleep" className="quarter-img" />
            </div>
            <div className="quarter-circle bottom-right">
                <img src={Fitness} alt="sleep" className="quarter-img" />
            </div>
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