import React, { useState } from "react";
import "./PlantSuggestion.css";


// Example plant data
const plants = [
  { name: "Tomato", phMin: 6, phMax: 7, tempMin: 18, tempMax: 27 },
  { name: "Potato", phMin: 5, phMax: 6, tempMin: 15, tempMax: 20 },
  { name: "Wheat", phMin: 6, phMax: 7.5, tempMin: 12, tempMax: 25 },
  // Add more plants as needed
];

export default function PlantSuggestion() {
  const [ph, setPh] = useState("");
  const [temp, setTemp] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const phValue = parseFloat(ph);
    const tempValue = parseFloat(temp);
    const suitablePlants = plants.filter(
      (plant) =>
        phValue >= plant.phMin &&
        phValue <= plant.phMax &&
        tempValue >= plant.tempMin &&
        tempValue <= plant.tempMax
    );
    setSuggestions(suitablePlants);
  };

  return (
    <div className="plant-suggestion-container">
      
      <h2>Find Suitable Plants</h2>
      <form className="plant-suggestion-form" onSubmit={handleSubmit}>
      {/* ...inputs... */}
        <label>
          Soil pH:
          <input
            type="number"
            step="0.1"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Temperature (°C):
          <input
            type="number"
            step="0.1"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Suggest Plants</button>
      </form>
      <div className="suitable-plants-list">
      <h3>Suitable Plants:</h3>
      <ul>
        {suggestions.length === 0 && <li>No suitable plants found.</li>}
        {suggestions.map((plant) => (
          <li key={plant.name}>{plant.name}</li>
        ))}
      </ul>
    </div>
  </div>
  );
}