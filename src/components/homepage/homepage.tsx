// src/components/homepage/homepageContent.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./homepage.css"; // Import the CSS file
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
  
  const HomepageContent: React.FC = () => {
    const [vehicles, setVehicles] = useState<VehicleData[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [availableModels, setAvailableModels] = useState<string[]>([]);
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [availableEngines, setAvailableEngines] = useState<string[]>([]);
    const router = useRouter();
  
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
      setSelectedModel("");
    }, [selectedBrand, vehicles]);
  
    useEffect(() => {
      const years = vehicles
        .filter(vehicle => vehicle.brand === selectedBrand && vehicle.model.name === selectedModel)
        .map(vehicle => vehicle.model.year);
      setAvailableYears([...new Set(years)]);
      setSelectedYear(null);
    }, [selectedModel, selectedBrand, vehicles]);
  
    useEffect(() => {
      const engines = vehicles
        .filter(vehicle =>
          vehicle.brand === selectedBrand &&
          vehicle.model.name === selectedModel &&
          vehicle.model.year === selectedYear
        )
        .map(vehicle => vehicle.model.engine);
      setAvailableEngines([...new Set(engines)]);
    }, [selectedYear, selectedModel, selectedBrand, vehicles]);
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (!selectedBrand || !selectedModel || !selectedYear) {
        alert("Please select a brand, model, and year.");
        return;
      }
      router.push(`/circuit-page?brand=${selectedBrand}&model=${selectedModel}&year=${selectedYear}`);
    };
  
    const handleLogout = () => {
      router.push('/');
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
        <div className="content-wrapper">
          <div className="model-selection-box">
            <h2>Model Selection</h2>
            <form onSubmit={handleSubmit}>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">- Select brand -</option>
                {[...new Set(vehicles.map(vehicle => vehicle.brand))].map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={!selectedBrand}
              >
                <option value="">- Select model -</option>
                {availableModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
              <select
                value={selectedYear?.toString() || ""}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                disabled={!selectedModel}
              >
                <option value="">- Select year -</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select disabled={!selectedYear}>
                <option value="">- Select engine -</option>
                {availableEngines.map(engine => (
                  <option key={engine} value={engine}>{engine}</option>
                ))}
              </select>
              <button type="submit">Find</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default HomepageContent;