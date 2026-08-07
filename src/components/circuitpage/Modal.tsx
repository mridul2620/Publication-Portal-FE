// Modal.tsx
import React from 'react';
import './Modal.css'; // Add styles for the modal

interface ModalProps {
  show: boolean;
  onClose: () => void;
  connector: {
    connectorName: string;
    description: string;
    partNumber: string;
    color: string;
    numberOfPins: number;
    powerSupply: string,
  location: string
    imageUrl: string;
  } | null;
  onOpenRelatedDtcs?: (connectorName: string) => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, connector, onOpenRelatedDtcs }) => {
  if (!show || !connector) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{connector.connectorName}</h2>
        <div className="connector-image">
          <img src={'/graphics.jpg'} alt={connector.connectorName} />
        </div>
        <p><strong>Description:</strong> {connector.description}</p>
        <p><strong>Location:</strong> {connector.location}</p>
        <p><strong>Part Number:</strong> {connector.partNumber}</p>
        <p><strong>Color:</strong> {connector.color}</p>
        <p><strong>Number of Pins:</strong> {connector.numberOfPins}</p>
        <p><strong>Power Supply:</strong> {connector.powerSupply}</p>
        
        {onOpenRelatedDtcs && (
          <div className="mt-6 border-t border-gray-200 pt-4 flex justify-start">
            <button
              onClick={() => {
                onClose();
                onOpenRelatedDtcs(connector.connectorName);
              }}
              className="inline-flex bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 items-center justify-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Related DTCs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
