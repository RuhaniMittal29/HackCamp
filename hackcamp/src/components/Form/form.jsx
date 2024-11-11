import React, { useState, useRef } from "react";
import Navbar from "../Navbar/navbar";
import "./form.css";

const CustomForm = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        water: '',
        exercise: '',
        sleep: '',
        meals: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        ['water', 'exercise', 'sleep', 'meals'].forEach(type => {
            const lsValue = JSON.parse(localStorage.getItem(type)) || [];
            const updatedArray = [...lsValue, formData[type]];
            localStorage.setItem(type, JSON.stringify(updatedArray));
        });
    };

    return (
        <div>
            <Navbar />
            <div className="form-page">
                <h2 className="form-tagline">Track your wellness journey – enter your daily stats below!</h2>
                <div className="form-container">
                    <h2 className="form-title">Daily Wellness Form</h2>
                    <form className="form-content" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="water"
                            value={formData.water}
                            onChange={handleInputChange}
                            placeholder="Water Intake (liters)"
                            className="form-input"
                        />
                        <input
                            type="text"
                            name="exercise"
                            value={formData.exercise}
                            onChange={handleInputChange}
                            placeholder="Exercise (minutes)"
                            className="form-input"
                        />
                        <input
                            type="text"
                            name="sleep"
                            value={formData.sleep}
                            onChange={handleInputChange}
                            placeholder="Sleep (hours)"
                            className="form-input"
                        />
                        <input
                            type="text"
                            name="meals"
                            value={formData.meals}
                            onChange={handleInputChange}
                            placeholder="Meals (count)"
                            className="form-input"
                        />
                        <button type="submit" className="form-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomForm;
