import React from "react";
import { Link } from 'react-scroll';
import './hero.css';
import Tree from "../../assets/tree.png";
import Bird from "../../assets/image.png";
import Water from "../../assets/water-home.png";
import Sleep from "../../assets/sleep-home.png";
import Food from "../../assets/food-home.png";
import Fitness from "../../assets/fitness-home.png";
import About from "../../components/About/about";

const HeroSection = () => {

    return (
        <section id="Home">
            <div className="circle-container">
            <div className="quarter-circle top-left food-water">
                <img src={Water} alt="water" className="quarter-img" />
                <div className="text-box">
                        <span className="text">Water💧 helps keep your energy up⬆️, supports digestion, and keeps your body working well. Drinking 2L of water a day prevents problems like headaches🤕 and tiredness😩 by helping your body flush out toxins💩.</span>
                    </div>
            </div>
            <div className="quarter-circle top-right sleep-fitness">
                <img src={Sleep} alt="sleep" className="quarter-img" />
                <div className="text-box">
                        <span className="text">Getting enough sleep😴 helps your body and mind recharge🔋, boosting energy, focus, and mood. 8 hours of sleep per night also supports your immune system, memory, and overall health👩🏻‍⚕️.                        </span>
                    </div>
            </div>
            <div className="quarter-circle bottom-left food-water">
                <img src={Food} alt="sleep" className="quarter-img" />
                <div className="text-box">
                        <span className="text">Good nutrition🥬 gives your body the nutrients🥑 it needs for energy, growth, and repair, helping you feel and perform your best💃🏻. Eating three balanced meals a day also reduces the risk of chronic diseases like heart disease❤️ and diabetes.                        </span>
                    </div>
            </div>
            <div className="quarter-circle bottom-right sleep-fitness">
                <img src={Fitness} alt="sleep" className="quarter-img" />
                <div className="text-box">
                        <span className="text">Regular exercise🏃🏻‍♀️ strengthens your muscles💪🏻, boosts energy🔋, and supports mental well-being🤗. Staying active for 30 minutes a day also improves heart health❤️, helps manage weight, and reduces the risk of chronic diseases 🤧.                        </span>
                    </div>
            </div>
            <div className="main-circle">
                    <Link to="About" smooth={true} duration={500}>
                        <img src={Tree} alt="tree" className="tree" style={{ cursor: 'pointer' }} />
                    </Link>
            </div>
            <div className="bird">
                <img src={Bird} alt="bird" className="bird-img" />
            </div>
        </div>
        </section>
    );
}

export default HeroSection;