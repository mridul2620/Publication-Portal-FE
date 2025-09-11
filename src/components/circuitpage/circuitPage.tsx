'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './circuitPage.css';
import { useSearchParams } from 'next/navigation';
import SvgDoorCircuit2 from './circuitSVG2'; 
import Modal from './Modal';
import SvgDoorCircuit1 from './circuitSVG1';

export interface Connector {
  _id: string;
  connectorName: string;
  description: string;
  numberOfPins: number;
  color: string;
  partNumber: string;
  powerSupply: string,
  location: string
  imageUrl: string;
}


const CircuitPageContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('schematics');
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [selectedSchematic, setSelectedSchematic] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showModal, setShowModal] = useState(false);
  const [highlightedText, setHighlightedText] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/connectors')
      .then(response => {
        setConnectors(response.data.connectors);
      })
      .catch(error => {
        console.error('Error fetching connectors', error);
      });
  }, []);

  useEffect(() => {
    setZoomLevel(100); // Reset zoom level to default (100%)
  }, [selectedSchematic]);

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
    connector.connectorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    connector.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort connectors by connectorName in ascending order
  const sortedConnectors = [...filteredConnectors].sort((a, b) => 
    a.connectorName.localeCompare(b.connectorName) || a.description.localeCompare(b.description)
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
    setSelectedSchematic('door-circuit-module-1'); // Reset schematic when switching tabs
    setSelectedConnector(sortedConnectors[0]);
    setHighlightedText(null);  // Reset connector when switching tabs
  };

  const handleConnectorClick = (connector: Connector) => {
    // Show the modal with the clicked connector's details
    setSelectedConnector(connector);
    setShowModal(true); // Show the modal
  };

  const handleSchematicChange = (schematic: string) => {
    setSelectedSchematic(schematic);
    setHighlightedText(null); // Reset the highlighted text when changing schematics
  };

  const handleTextClick = (textValue: string) => {
    setHighlightedText(textValue);  // Set the text to be highlighted in Svg2
    setSelectedSchematic('door-circuit-module-2'); // Switch to Svg2
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
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
                <li onClick={() => handleSchematicChange('door-circuit-module-1')}
                    style={{ color: selectedSchematic === 'door-circuit-module-1' ? 'blue' : 'inherit' }}
                    >
                  Door Circuit Module - 1
                </li>
                <li onClick={() => handleSchematicChange('door-circuit-module-2')}
                    style={{ color: selectedSchematic === 'door-circuit-module-2' ? 'blue' : 'inherit' }}
                    >
                  Door Circuit Module - 2
                </li>
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
                    style={{ color: selectedConnector?._id === connector._id ? 'blue' : 'inherit' }}
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
        {selectedSchematic === 'door-circuit-module-1' && activeTab === 'schematics' && (
          <div className="schematic-image">
          <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
          <SvgDoorCircuit1
                  connectors={connectors} // Pass connectors to the SVG component
                  onConnectorClick={handleConnectorClick}
                  onTextClick={handleTextClick} // Pass the click handler to the SVG component
                /> {/* Use the imported SVG component */}
          </div>
            <div className="zoom-controls">
              <button className="zoom-button" onClick={() => handleZoom('in')}>+</button>
              <button className="zoom-button" onClick={() => handleZoom('out')}>-</button>
            </div>
          </div>
        )}
        <Modal 
          show={showModal} 
          onClose={closeModal} 
          connector={selectedConnector} 
        />
        {/* Schematic Image */}
        {selectedSchematic === 'door-circuit-module-2' && activeTab === 'schematics' && (
          <div className="schematic-image">
          <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
          <SvgDoorCircuit2
                  connectors={connectors} // Pass connectors to the SVG component
                  onConnectorClick={handleConnectorClick}
                  highlightedText={highlightedText}
                   // Pass the click handler to the SVG component
                /> {/* Use the imported SVG component */}
          </div>
            <div className="zoom-controls">
              <button className="zoom-button" onClick={() => handleZoom('in')}>+</button>
              <button className="zoom-button" onClick={() => handleZoom('out')}>-</button>
            </div>
          </div>
        )}
        <Modal 
          show={showModal} 
          onClose={closeModal} 
          connector={selectedConnector} 
        />
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
            <p><strong>Location:</strong> {selectedConnector.location}</p>
            <p><strong>Part Number:</strong> {selectedConnector.partNumber}</p>
            <p><strong>Color:</strong> {selectedConnector.color}</p>
            <p><strong>Number of Pins:</strong> {selectedConnector.numberOfPins}</p>
            <p><strong>Power Supply:</strong> {selectedConnector.powerSupply}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default CircuitPageContent;
