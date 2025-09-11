import React, { useState, useEffect } from "react";
import axios from "axios";
import { LogOut } from 'lucide-react';

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
  const [vinNumber, setVinNumber] = useState<string>("");
  const [lastVinNumber, setLastVinNumber] = useState<string>("");

  // Your existing useEffect hooks - keeping all functionality intact
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

  // Your existing handlers - keeping all functionality intact
  const handleVehicleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedBrand || !selectedModel || !selectedYear) {
      alert("Please select a brand, model, and year.");
      return;
    }
    // Using window.location instead of router for compatibility
    window.location.href = `/circuit-page?brand=${selectedBrand}&model=${selectedModel}&year=${selectedYear}`;
  };

  const handleVinSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if ((vinNumber.length !== 17) && (lastVinNumber.length !== 8)){
      alert("Please enter a valid VIN number.");
      return;
    }
    // Navigate to the same circuit page with VIN parameter
    window.location.href = `/documents`;
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col overflow-hidden">
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 flex items-center justify-center bg-gray-800 rounded">
              <img src="/logo.png" alt="Company Logo" className="h-6 w-6" />
             </div>
              <h1 className="text-xl font-bold text-gray-900">Chartsign</h1>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Flex container to fill remaining space */}
      <main className="flex-1 flex items-center justify-center px-4 py-6 min-h-0">
        <div className="w-full max-w-6xl">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Vehicle Search
            </h2>
            <p className="text-gray-600">
              Find your vehicle using model selection or VIN number
            </p>
          </div>

          {/* Search Methods Container */}
          <div className="grid lg:grid-cols-3 gap-6 items-start">

            {/* VIN Search Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                <h3 className="text-lg font-semibold text-white text-center">VIN Search</h3>
              </div>
              
              <form onSubmit={handleVinSubmit} className="p-4 space-y-4">
                <div>
                  <label htmlFor="vin" className="block text-xs font-medium text-gray-700 mb-1">
                    Vehicle Identification Number
                  </label>
                  <input
                    id="vin"
                    type="text"
                    value={vinNumber}
                    onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                    placeholder="Enter 17-character VIN"
                    maxLength={17}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 font-mono"
                    
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    {vinNumber.length}/17 characters
                  </div>
                </div>

                <div>
                  <label htmlFor="lastVin" className="block text-xs font-medium text-gray-700 mb-1">
                    Vehicle Identification Number
                  </label>
                  <input
                    id="lastVin"
                    type="text"
                    value={lastVinNumber}
                    onChange={(e) => setLastVinNumber(e.target.value.toUpperCase())}
                    placeholder="Or enter the last 8-characters"
                    maxLength={8}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 font-mono"
                    
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    {lastVinNumber.length}/8 characters
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <h4 className="text-sm font-semibold text-green-900 mb-1">
                    Quick & Accurate
                  </h4>
                  <p className="text-xs text-black-300">
                    Enter your VIN for instant vehicle identification and detailed specifications.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 text-sm"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* OR Divider */}
            <div className="flex items-center justify-center lg:flex-col lg:h-full">
              <div className="flex items-center lg:flex-col lg:space-y-2 lg:space-x-0 space-x-4">
                <div className="h-px lg:h-16 lg:w-px w-16 bg-gray-300"></div>
                <div className="bg-white px-3 py-1 rounded-full border border-gray-300 text-gray-600 font-medium text-sm whitespace-nowrap">
                  OR
                </div>
                <div className="h-px lg:h-16 lg:w-px w-16 bg-gray-300"></div>
              </div>
            </div>
            
            {/* Vehicle Selection Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                <h3 className="text-lg font-semibold text-white text-center">Model Selection</h3>
              </div>
              
              <form onSubmit={handleVehicleSubmit} className="p-4 space-y-3">
                {/* Brand Selection */}
                <div>
                  <label htmlFor="brand" className="block text-xs font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select
                    id="brand"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
                    required
                  >
                    <option value="">- Select brand -</option>
                    {[...new Set(vehicles.map(vehicle => vehicle.brand))].map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Model Selection */}
                <div>
                  <label htmlFor="model" className="block text-xs font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <select
                    id="model"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedBrand}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 disabled:bg-gray-50 disabled:text-gray-400"
                    required
                  >
                    <option value="">- Select model -</option>
                    {availableModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>

                {/* Year Selection */}
                <div>
                  <label htmlFor="year" className="block text-xs font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    id="year"
                    value={selectedYear?.toString() || ""}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    disabled={!selectedModel}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 disabled:bg-gray-50 disabled:text-gray-400"
                    required
                  >
                    <option value="">- Select year -</option>
                    {availableYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Engine Selection */}
                <div>
                  <label htmlFor="engine" className="block text-xs font-medium text-gray-700 mb-1">
                    Engine
                  </label>
                  <select
                    id="engine"
                    disabled={!selectedYear}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">- Select engine -</option>
                    {availableEngines.map(engine => (
                      <option key={engine} value={engine}>{engine}</option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm"
                  >
                    Find Vehicle
                  </button>
                </div>
              </form>
            </div>

            

            {/* VIN Search Card
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3">
                <h3 className="text-lg font-semibold text-white text-center">VIN Search</h3>
              </div>
              
              <form onSubmit={handleVinSubmit} className="p-4 space-y-4">
                <div>
                  <label htmlFor="vin" className="block text-xs font-medium text-gray-700 mb-1">
                    Vehicle Identification Number
                  </label>
                  <input
                    id="vin"
                    type="text"
                    value={vinNumber}
                    onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                    placeholder="Enter 17-character VIN"
                    maxLength={17}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 font-mono"
                    
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    {vinNumber.length}/17 characters
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                  <h4 className="text-sm font-semibold text-green-900 mb-1">
                    Quick & Accurate
                  </h4>
                  <p className="text-xs text-green-800">
                    Enter your 17-character VIN for instant vehicle identification and detailed specifications.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 text-sm"
                  >
                    Search by VIN
                  </button>
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomepageContent;