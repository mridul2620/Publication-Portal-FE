// src/components/homepage/homepageContent.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./homePage.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; 
import { useRouter } from 'next/navigation'; 

interface VehicleData {
  _id: string;
  brand: string;
  model: {
    name: string;
    year: number;
    engine: string;
    bodyStyle: string;
    drive: string;
    transmission: string;
  };
}

const HomepageContent = () => {
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableEngines, setAvailableEngines] = useState<string[]>([]);
  const [availableBodyStyles, setAvailableBodyStyles] = useState<string[]>([]);
  const [availableDrives, setAvailableDrives] = useState<string[]>([]);
  const [availableTransmissions, setAvailableTransmissions] = useState<string[]>([]);
  const router=useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!selectedBrand || !selectedModel || !selectedYear) {
      alert("Please select a brand, model, and year.");
      return;
    }
    router.push(`/circuit-page?brand=${selectedBrand}&model=${selectedModel}&year=${selectedYear}`);
    //window.location.assign("http://localhost:3001/circuit-page");
  };
  


  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/vehicles/getVehicles");
        setVehicles(response.data.data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const models = vehicles
      .filter(vehicle => vehicle.brand === selectedBrand)
      .map(vehicle => vehicle.model.name);
    setAvailableModels([...new Set(models)]);
    setSelectedModel("");  // Reset the model selection
  }, [selectedBrand]);

  useEffect(() => {
    const years = vehicles
      .filter(vehicle => vehicle.brand === selectedBrand && vehicle.model.name === selectedModel)
      .map(vehicle => vehicle.model.year);
    setAvailableYears([...new Set(years)]);
    setSelectedYear(null);  // Reset the year selection
  }, [selectedModel]);

  useEffect(() => {
    const filteredVehicles = vehicles.filter(
      vehicle =>
        vehicle.brand === selectedBrand &&
        vehicle.model.name === selectedModel &&
        vehicle.model.year === selectedYear
    );
    setAvailableEngines([...new Set(filteredVehicles.map(vehicle => vehicle.model.engine))]);
    setAvailableBodyStyles([...new Set(filteredVehicles.map(vehicle => vehicle.model.bodyStyle))]);
    setAvailableDrives([...new Set(filteredVehicles.map(vehicle => vehicle.model.drive))]);
    setAvailableTransmissions([...new Set(filteredVehicles.map(vehicle => vehicle.model.transmission))]);
  }, [selectedYear]);

  const handleLogout = () => {
    window.location.replace('http://localhost:3000/');
  };

  return (
    <div className="container">
    <nav>
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1>Chartsign</h1>
        </div>
        <div className="logout-icon" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </div>
      </nav>
      <div className="flex">
        <div className="flex-1">
          <div className="model-selection-box">
          <h2>Model Selection</h2>
            <div className="mb-4">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">- Select brand -</option>
                {[...new Set(vehicles.map(vehicle => vehicle.brand))].map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={!selectedBrand}
              >
                <option value="">- Select model -</option>
                {availableModels.map(model => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <select
                value={selectedYear || ""}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                disabled={!selectedModel}
              >
                <option value="">- Select year -</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <select disabled={!selectedYear}>
                <option value="">- Select engine -</option>
                {availableEngines.map(engine => (
                  <option key={engine} value={engine}>
                    {engine}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="mb-4">
              <select disabled={!selectedYear}>
                <option value="">- Select body style -</option>
                {availableBodyStyles.map(style => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <select disabled={!selectedYear}>
                <option value="">- Select drive -</option>
                {availableDrives.map(drive => (
                  <option key={drive} value={drive}>
                    {drive}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <select disabled={!selectedYear}>
                <option value="">- Select transmission -</option>
                {availableTransmissions.map(transmission => (
                  <option key={transmission} value={transmission}>
                    {transmission}
                  </option>
                ))}
              </select>
            </div> */}
            <button type="submit" onClick={handleSubmit}>Find</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageContent;
