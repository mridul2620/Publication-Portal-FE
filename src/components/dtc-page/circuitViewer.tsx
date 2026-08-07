// CircuitViewer.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../circuitpage/circuitPage.css';
import SvgDoorCircuit1 from '../circuitpage/circuitSVG1';
import SvgDoorCircuit2 from '../circuitpage/circuitSVG2';
import Modal from '../circuitpage/Modal';

export interface Connector {
  _id: string;
  connectorName: string;
  description: string;
  numberOfPins: number;
  color: string;
  partNumber: string;
  powerSupply: string;
  location: string;
  imageUrl: string;
}

interface CircuitViewerProps {
  selectedSchematic: string;
  showLeftPanel?: boolean;
  onSchematicChange?: (schematic: string) => void;
  initialZoom?: number;
}

// Function to remove border elements from SVG
const removeSvgBorders = (svgElement: SVGSVGElement) => {
  if (!svgElement) return;

  const borderPaths = svgElement.querySelectorAll('path[id*="border"], path[id*="frame"], path[markerEnd*="arrow"], path[markerStart*="arrow"]');
  borderPaths.forEach(path => {
    const d = path.getAttribute('d');
    if (d && (d.includes('M1190.6 841.9V0H0v841.9h1190.6') || 
              d.includes('M1162.2 813.6V28.4H28.4v785.2h1133.8') ||
              d.match(/^M\d+\.?\d*\s+\d+\.?\d*[VH].*[vh].*[H]?.*$/))) {
      path.remove();
    }
  });

  const coordinateGroups = svgElement.querySelectorAll('g[id*="text"]');
  coordinateGroups.forEach(group => {
    const textElement = group.querySelector('text');
    if (textElement) {
      const textContent = textElement.textContent?.trim();
      if (textContent && textContent.match(/^[A-F]$|^[1-8]$|^(DESCRIPTION|PART NUMBER|SIZE|SHEET|DRAWN BY|REV)$/)) {
        group.remove();
      }
    }
  });

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

  const arrowPaths = svgElement.querySelectorAll('path[marker-end], path[marker-start]');
  arrowPaths.forEach(path => path.remove());

  const coordinateLines = svgElement.querySelectorAll('path[d*="14.2"], path[d*="14.3"], path[d*="26.8"], path[d*="26.9"]');
  coordinateLines.forEach(line => line.remove());

  const viewBox = svgElement.getAttribute('viewBox');
  if (viewBox) {
    const [x, y, width, height] = viewBox.split(' ').map(Number);
    const newX = x + 30;
    const newY = y + 30;
    const newWidth = width - 60;
    const newHeight = height - 60;
    svgElement.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
  }
};

const CircuitViewer: React.FC<CircuitViewerProps> = ({ 
  selectedSchematic, 
  showLeftPanel = true,
  onSchematicChange,
  initialZoom = 100 
}) => {
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const [showModal, setShowModal] = useState(false);
  const [highlightedText, setHighlightedText] = useState<string | null>(null);
  const [isProcessingSvg, setIsProcessingSvg] = useState(false);
  const [activeTab, setActiveTab] = useState('schematics');
  const [currentSchematic, setCurrentSchematic] = useState(selectedSchematic);
  
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
    setZoomLevel(initialZoom);
  }, [currentSchematic, initialZoom]);

  useEffect(() => {
    if (currentSchematic && activeTab === 'schematics') {
      setIsProcessingSvg(true);
      
      const timer = setTimeout(() => {
        if (currentSchematic === 'door-circuit-module-1' && svg1Ref.current) {
          removeSvgBorders(svg1Ref.current);
        } else if (currentSchematic === 'door-circuit-module-2' && svg2Ref.current) {
          removeSvgBorders(svg2Ref.current);
        }
        setIsProcessingSvg(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [currentSchematic, activeTab]);

  useEffect(() => {
    setCurrentSchematic(selectedSchematic);
  }, [selectedSchematic]);

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prevZoom => {
      const newZoom = direction === 'in' ? prevZoom + 10 : prevZoom - 10;
      return Math.max(50, Math.min(200, newZoom));
    });
  };

  const filteredConnectors = connectors.filter(connector =>
    connector.connectorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    connector.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedConnectors = [...filteredConnectors].sort((a, b) => 
    a.connectorName.localeCompare(b.connectorName) || a.description.localeCompare(b.description)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() !== '') {
      setActiveTab('connectors');
    }
  };

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
    const newSchematic = 'door-circuit-module-1';
    setCurrentSchematic(newSchematic);
    if (onSchematicChange) {
      onSchematicChange(newSchematic);
    }
    setSelectedConnector(sortedConnectors[0]);
    setHighlightedText(null);
  };

  const handleConnectorClick = (connector: Connector) => {
    setSelectedConnector(connector);
    setShowModal(true);
  };

  const handleSchematicChange = (schematic: string) => {
    setCurrentSchematic(schematic);
    if (onSchematicChange) {
      onSchematicChange(schematic);
    }
    setHighlightedText(null);
  };

  const handleTextClick = (textValue: string) => {
    setHighlightedText(textValue);
    const newSchematic = 'door-circuit-module-2';
    setCurrentSchematic(newSchematic);
    if (onSchematicChange) {
      onSchematicChange(newSchematic);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="circuit-viewer-container" style={{ display: 'flex', height: '100%', width: '100%' }}>
      {showLeftPanel && (
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
                  <li 
                    onClick={() => handleSchematicChange('door-circuit-module-1')}
                    style={{ color: currentSchematic === 'door-circuit-module-1' ? 'blue' : 'inherit' }}
                  >
                    Door Circuit Module - 1
                  </li>
                  <li 
                    onClick={() => handleSchematicChange('door-circuit-module-2')}
                    style={{ color: currentSchematic === 'door-circuit-module-2' ? 'blue' : 'inherit' }}
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
      )}

      <div className={showLeftPanel ? "right-panel" : "right-panel-full"} style={{ flex: 1, overflow: 'auto' }}>
        {currentSchematic === 'door-circuit-module-1' && (
          <div className="schematic-image" style={{ position: 'relative', minHeight: '100%' }}>
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
              opacity: isProcessingSvg ? 0 : 1,
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
        
        {currentSchematic === 'door-circuit-module-2' && (
          <div className="schematic-image" style={{ position: 'relative', minHeight: '100%' }}>
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
        
        {selectedConnector && activeTab === 'connectors' && showLeftPanel && (
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
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .right-panel-full {
          width: 100%;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default CircuitViewer;