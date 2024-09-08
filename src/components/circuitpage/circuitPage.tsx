import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './circuitPage.css';
import { useSearchParams } from 'next/navigation';

interface Connector {
  _id: string;
  connectorName: string;
  description: string;
  numberOfPins: number;
  color: string;
  partNumber: string;
  imageUrl: string;
}


const CircuitPageContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('schematics');
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [selectedSchematic, setSelectedSchematic] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    axios.get('http://localhost:3001/api/connectors')
      .then(response => {
        setConnectors(response.data.connectors);
      })
      .catch(error => {
        console.error('Error fetching connectors', error);
      });
  }, []);

  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const model = searchParams.get('model');
  const year = searchParams.get('year');

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prevZoom => {
      const newZoom = direction === 'in' ? prevZoom + 10 : prevZoom - 10;
      return Math.max(50, Math.min(200, newZoom)); // Limit zoom between 50% and 200%
    });
  };

  const filteredConnectors = connectors.filter(connector =>
    connector.connectorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort connectors by connectorName in ascending order
  const sortedConnectors = [...filteredConnectors].sort((a, b) => 
    a.connectorName.localeCompare(b.connectorName)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value.trim() !== '') {
      setActiveTab('connectors');
      setSelectedSchematic(null);  // Hide schematic when searching for connectors
    }
  };

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
    setSelectedSchematic('door-circuit-module'); // Reset schematic when switching tabs
    setSelectedConnector(sortedConnectors[0]); // Reset connector when switching tabs
  };

  return (
    <div className="circuit-page-container">
        <div className="vehicle-info-bar">
        <h1>{brand}-{model} {year}MY Schematics</h1>
      </div>
      <div className="panels-container">
      {/* Left Panel */}
      <div className="left-panel">
        <input
          type="text"
          placeholder="Search connectors..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />

        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'schematics' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('schematics')}
          >
            Circuit
          </button>
          <button
            className={`tab-button ${activeTab === 'connectors' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('connectors')}
          >
            Connectors
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'schematics' && (
            <div className="schematics-tab">
              <ul>
                <li onClick={() => setSelectedSchematic('door-circuit-module')}>
                  Door Circuit Module
                </li>
                {/* Add more schematic options here */}
              </ul>
            </div>
          )}

          {activeTab === 'connectors' && (
            <div className="connectors-tab">
              <ul>
                {sortedConnectors.map((connector) => (
                  <li
                    key={connector._id}
                    onClick={() => setSelectedConnector(connector)}
                  >
                    {connector.connectorName} : {connector.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        {/* Schematic Image */}
        {selectedSchematic === 'door-circuit-module' && activeTab === 'schematics' && (
          <div className="schematic-image">
            <img
              src="/door_circuit.svg"
              alt="Door Circuit Module"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left',
            }}
            />
            <div className="zoom-controls">
              <button className="zoom-button" onClick={() => handleZoom('in')}>+</button>
              <button className="zoom-button" onClick={() => handleZoom('out')}>-</button>
            </div>
          </div>
        )}

        {/* Connector Details */}
        {selectedConnector && activeTab === 'connectors' && (
          <div className="connector-details">
            <h3>{selectedConnector.connectorName} : {selectedConnector.description}</h3>
            <div className="connector-image">
              <img
                src="/graphics.jpg"
                alt={selectedConnector.connectorName}
              />
            </div>
            <p><strong>Description:</strong> {selectedConnector.description}</p>
            <p><strong>Part Number:</strong> {selectedConnector.partNumber}</p>
            <p><strong>Color:</strong> {selectedConnector.color}</p>
            <p><strong>Number of Pins:</strong> {selectedConnector.numberOfPins}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default CircuitPageContent;
