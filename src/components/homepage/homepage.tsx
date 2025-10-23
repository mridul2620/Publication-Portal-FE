import React, { useState, useEffect } from "react";
import axios from "axios";
import { LogOut, Search, Car, Hash } from "lucide-react";

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

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "https://publication-portal-be.onrender.com/api/vehicles/getVehicles"
        );
        setVehicles(response.data.data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    const models = vehicles
      .filter((vehicle) => vehicle.brand === selectedBrand)
      .map((vehicle) => vehicle.model.name);
    setAvailableModels([...new Set(models)]);
    setSelectedModel("");
  }, [selectedBrand, vehicles]);

  useEffect(() => {
    const years = vehicles
      .filter(
        (vehicle) =>
          vehicle.brand === selectedBrand &&
          vehicle.model.name === selectedModel
      )
      .map((vehicle) => vehicle.model.year);
    setAvailableYears([...new Set(years)]);
    setSelectedYear(null);
  }, [selectedModel, selectedBrand, vehicles]);

  useEffect(() => {
    const engines = vehicles
      .filter(
        (vehicle) =>
          vehicle.brand === selectedBrand &&
          vehicle.model.name === selectedModel &&
          vehicle.model.year === selectedYear
      )
      .map((vehicle) => vehicle.model.engine);
    setAvailableEngines([...new Set(engines)]);
  }, [selectedYear, selectedModel, selectedBrand, vehicles]);

  const handleVehicleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedBrand || !selectedModel || !selectedYear) {
      alert("Please select a brand, model, and year.");
      return;
    }
    window.location.href = `/documents`;
  };

  const handleVinSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (vinNumber.length !== 17 && lastVinNumber.length !== 8) {
      alert("Please enter a valid VIN number.");
      return;
    }
    window.location.href = `/documents`;
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  const brandOptions = [...new Set(vehicles.map((vehicle) => vehicle.brand))];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer"
             onClick={() => window.location.href = '/home-page'}>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <img src="/logo.png" alt="Company Logo" className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Chartsign</h1>
                <p className="text-xs text-slate-600">
                  Industry Publication Portal
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 transition-all duration-200 shadow-sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Vehicle Documentation Search
            </h2>
            <p className="text-slate-600">
              Find technical documentation using VIN or vehicle specifications
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto w-full">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* VIN Search Card */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-br from-slate-50 to-white p-6 border-b border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Hash className="h-5 w-5 text-blue-500" />
                    <h3 className="text-2xl font-semibold leading-none tracking-tight text-slate-900">VIN Search</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Quick search using Vehicle Identification Number
                  </p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleVinSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="vin" className="text-sm font-medium leading-none text-slate-900">
                        Full VIN (17 characters)
                      </label>
                      <input
                        id="vin"
                        type="text"
                        value={vinNumber}
                        onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                        placeholder="Enter 17-character VIN"
                        maxLength={17}
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 font-mono transition-all duration-200"
                      />
                      <p className="text-xs text-slate-600">
                        {vinNumber.length}/17 characters
                      </p>
                    </div>
                    <div className="text-center text-sm text-slate-500 font-medium">
                      OR
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastVin" className="text-sm font-medium leading-none text-slate-900">
                        Last 8 Characters of VIN
                      </label>
                      <input
                        id="lastVin"
                        type="text"
                        value={lastVinNumber}
                        onChange={(e) => setLastVinNumber(e.target.value.toUpperCase())}
                        placeholder="Last 8 characters"
                        maxLength={8}
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 font-mono transition-all duration-200"
                      />
                      <p className="text-xs text-slate-600">
                        {lastVinNumber.length}/8 characters
                      </p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                      <h4 className="text-sm font-semibold text-slate-900 mb-1">
                        Fast & Accurate
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Enter your VIN for instant vehicle identification and
                        detailed technical specifications.
                      </p>
                    </div>                                    
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 w-full transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <Search className="h-4 w-4" />
                      Search by VIN
                    </button>
                  </form>
                </div>
              </div>

              {/* Model Selection Card */}
              <div className="rounded-xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-br from-slate-50 to-white p-6 border-b border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Car className="h-5 w-5 text-blue-500" />
                    <h3 className="text-2xl font-semibold leading-none tracking-tight text-slate-900">Model Selection</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Search by vehicle brand, model, and year
                  </p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleVehicleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="brand" className="text-sm font-medium leading-none text-slate-900">
                        Brand
                      </label>
                      <select
                        id="brand"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        required
                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      >
                        <option value="">Select brand</option>
                        {brandOptions.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="model" className="text-sm font-medium leading-none text-slate-900">
                        Model
                      </label>
                      <select
                        id="model"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        disabled={!selectedBrand}
                        required
                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      >
                        <option value="">Select model</option>
                        {availableModels.map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="year" className="text-sm font-medium leading-none text-slate-900">
                        Year
                      </label>
                      <select
                        id="year"
                        value={selectedYear?.toString() || ""}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        disabled={!selectedModel}
                        required
                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      >
                        <option value="">Select year</option>
                        {availableYears.map((year) => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="engine" className="text-sm font-medium leading-none text-slate-900">
                        Engine
                      </label>
                      <select
                        id="engine"
                        disabled={!selectedYear}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      >
                        <option value="">Select engine</option>
                        {availableEngines.map((engine) => (
                          <option key={engine} value={engine}>
                            {engine}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 w-full transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <Search className="h-4 w-4" />
                      Find Documentation
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* OR Divider between cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
              <div className="bg-white border-2 border-blue-500 rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                <span className="text-blue-500 font-bold text-lg">OR</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomepageContent;