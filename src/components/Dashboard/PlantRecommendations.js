export function PlantRecommendations({ pH, temperature, plants }) {
  const getCompatiblePlants = () => {
    return plants.filter(plant => {
      const pHMatch = pH >= plant.optimal_pH.min && pH <= plant.optimal_pH.max;
      const tempMatch = temperature >= plant.optimal_temp.min && temperature <= plant.optimal_temp.max;
      return pHMatch && tempMatch;
    });
  };

  const compatiblePlants = getCompatiblePlants();

  return (
    <div className="plant-recommendations">
      <h3>Recommended Plants</h3>
      {compatiblePlants.length > 0 ? (
        <div className="plant-grid">
          {compatiblePlants.map(plant => (
            <div key={plant.id} className="plant-card">
              <img src={plant.image} alt={plant.name} />
              <h4>{plant.name}</h4>
              <p>pH: {plant.optimal_pH.min}-{plant.optimal_pH.max}</p>
              <p>Temp: {plant.optimal_temp.min}-{plant.optimal_temp.max}°C</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-plants">No compatible plants found for current conditions</p>
      )}
    </div>
  );
}