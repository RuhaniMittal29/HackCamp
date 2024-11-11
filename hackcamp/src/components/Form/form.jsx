import { useState, useRef } from "react";

const CustomForm = () => {
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        water: '',
        exercise: '',
        sleep: '',
        meals: ''
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        ['water', 'exercise', 'sleep', 'meals'].forEach(type => {
            // Get the value from localStorage
            const lsValue = JSON.parse(localStorage.getItem(type)) || []; // Parse the stored JSON or default to an empty array
            
            // Update the array with the new value from formData
            const updatedArray = [...lsValue, formData[type]];
          
            // Store the updated array back to localStorage
            localStorage.setItem(type, JSON.stringify(updatedArray)); // Convert the array to JSON for storage
          });
    };

    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit}>
                <input type="text" name="water" value={formData.water}
            onChange={handleInputChange} placeholder="Water" />
                <input type="text" name="exercise" value={formData.exercise}
            onChange={handleInputChange} placeholder="Exercise" />
                <input type="text" name="sleep" value={formData.sleep}
            onChange={handleInputChange} placeholder="Sleep" />
                <input type="text" name="meals" value={formData.meals}
            onChange={handleInputChange} placeholder="Meals" />
            <button type="submit">submit</button>
            </form>
        </>
  )
}

export default CustomForm