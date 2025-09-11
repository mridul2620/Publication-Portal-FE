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
}

const Modal: React.FC<ModalProps> = ({ show, onClose, connector }) => {
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
      </div>
    </div>
  );
};

export default Modal;
