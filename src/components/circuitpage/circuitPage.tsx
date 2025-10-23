'use client'
import React, { useState, useEffect, useRef } from 'react';
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

// Function to remove border elements from SVG
const removeSvgBorders = (svgElement: SVGSVGElement) => {
  if (!svgElement) return;

  // Remove border frame paths (typically the outermost rectangles)
  const borderPaths = svgElement.querySelectorAll('path[id*="border"], path[id*="frame"], path[markerEnd*="arrow"], path[markerStart*="arrow"]');
  borderPaths.forEach(path => {
    // Check if it's a border by examining attributes or position
    const d = path.getAttribute('d');
    if (d && (d.includes('M1190.6 841.9V0H0v841.9h1190.6') || 
              d.includes('M1162.2 813.6V28.4H28.4v785.2h1133.8') ||
              d.match(/^M\d+\.?\d*\s+\d+\.?\d*[VH].*[vh].*[H]?.*$/))) {
      path.remove();
    }
  });

  // Remove coordinate labels (A, B, C, D, E, F and 1, 2, 3, 4, 5, 6, 7, 8)
  const coordinateGroups = svgElement.querySelectorAll('g[id*="text"]');
  coordinateGroups.forEach(group => {
    const textElement = group.querySelector('text');
    if (textElement) {
      const textContent = textElement.textContent?.trim();
      // Remove single letter/number coordinates
      if (textContent && textContent.match(/^[A-F]$|^[1-8]$|^(DESCRIPTION|PART NUMBER|SIZE|SHEET|DRAWN BY|REV)$/)) {
        group.remove();
      }
    }
  });

  // Remove description box and related elements
  const descriptionElements = svgElement.querySelectorAll('text');
  descriptionElements.forEach(text => {
    const content = text.textContent?.trim();
    if (content && (
      content.includes('Sheet 1') ||
      content.includes('DESCRIPTION') ||
      content.includes('PART NUMBER') ||
      content.includes('SIZE') ||
      content.includes('DRAWN BY') ||
      content.includes('REV') ||
      content.includes('INEOS-') ||
      content.includes('George Barnes') ||
      content.includes('A3') ||
      content.match(/^\d+\s+OF\s+\d+$/) ||
      content === 'OF' ||
      content === '1'
    )) {
      text.remove();
    }
  });

  // Remove grid lines and arrows
  const arrowPaths = svgElement.querySelectorAll('path[marker-end], path[marker-start]');
  arrowPaths.forEach(path => path.remove());

  // Remove any remaining coordinate system elements
  const coordinateLines = svgElement.querySelectorAll('path[d*="14.2"], path[d*="14.3"], path[d*="26.8"], path[d*="26.9"]');
  coordinateLines.forEach(line => line.remove());

  // Adjust viewBox to remove border padding
  const viewBox = svgElement.getAttribute('viewBox');
  if (viewBox) {
    const [x, y, width, height] = viewBox.split(' ').map(Number);
    // Add some padding but remove the border area
    const newX = x + 30;
    const newY = y + 30;
    const newWidth = width - 60;
    const newHeight = height - 60;
    svgElement.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
  }
};

const CircuitPageContent: React.FC = () => {
  // State declarations
  const [activeTab, setActiveTab] = useState('schematics');
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [selectedSchematic, setSelectedSchematic] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showModal, setShowModal] = useState(false);
  const [highlightedText, setHighlightedText] = useState<string | null>(null);
  const [isProcessingSvg, setIsProcessingSvg] = useState(false);
  
  // Refs to access SVG elements
  const svg1Ref = useRef<SVGSVGElement>(null);
  const svg2Ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    axios.get('https://publication-portal-be.onrender.com/api/connectors')
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

  // Effect to remove borders after SVG renders
  useEffect(() => {
    if (selectedSchematic) {
      setIsProcessingSvg(true);
      
      const timer = setTimeout(() => {
        if (selectedSchematic === 'door-circuit-module-1' && svg1Ref.current) {
          removeSvgBorders(svg1Ref.current);
        } else if (selectedSchematic === 'door-circuit-module-2' && svg2Ref.current) {
          removeSvgBorders(svg2Ref.current);
        }
        setIsProcessingSvg(false);
      }, 200); // Small delay to ensure SVG is fully rendered

      return () => clearTimeout(timer);
    }
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
        <h1>Circuit Schematics</h1>
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
            <div className="schematic-image" style={{ position: 'relative' }}>
              {isProcessingSvg && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    border: '3px solid #f3f3f3',
                    borderTop: '3px solid #3498db',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span>Processing schematic...</span>
                </div>
              )}
              <div style={{ 
                transform: `scale(${zoomLevel / 100})`, 
                transformOrigin: 'top left',
                opacity: isProcessingSvg ? 0.3 : 1,
                transition: 'opacity 0.3s ease'
              }}>
                <SvgDoorCircuit1
                        ref={svg1Ref}
                        connectors={connectors}
                        onConnectorClick={handleConnectorClick}
                        onTextClick={handleTextClick}
                      />
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
            <div className="schematic-image" style={{ position: 'relative' }}>
              {isProcessingSvg && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  width: '250px',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    border: '3px solid #f3f3f3',
                    borderTop: '3px solid #3498db',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span>Processing schematic...</span>
                </div>
              )}
              <div style={{ 
                transform: `scale(${zoomLevel / 100})`, 
                transformOrigin: 'top left',
                visibility: isProcessingSvg ? 'hidden' : 'visible',
                transition: 'opacity 0.5s ease'
              }}>
                <SvgDoorCircuit2
                        ref={svg2Ref}
                        connectors={connectors}
                        onConnectorClick={handleConnectorClick}
                        highlightedText={highlightedText}
                      />
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
      
      {/* CSS for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CircuitPageContent;