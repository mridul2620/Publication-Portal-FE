// CircuitPopup.tsx
import React, { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import CircuitViewer from './circuitViewer';

interface CircuitPopupProps {
  show: boolean;
  onClose: () => void;
  type: 'direct' | 'selection';
  initialSchematic?: string;
}

type ViewState = 'selection' | 'circuit';

const CircuitPopup: React.FC<CircuitPopupProps> = ({ 
  show, 
  onClose, 
  type, 
  initialSchematic = 'door-circuit-module-1' 
}) => {
  const [viewState, setViewState] = useState<ViewState>(type === 'direct' ? 'circuit' : 'selection');
  const [selectedSchematic, setSelectedSchematic] = useState<string>(initialSchematic);

  // Reset state when popup opens with new type
  useEffect(() => {
    if (show) {
      setViewState(type === 'direct' ? 'circuit' : 'selection');
      setSelectedSchematic(initialSchematic);
    }
  }, [show, type, initialSchematic]);

  if (!show) return null;

  const handleCircuitSelection = (schematic: string) => {
    setSelectedSchematic(schematic);
    setViewState('circuit');
  };

  const handleBackToSelection = () => {
    setViewState('selection');
  };

  const handleClose = () => {
    // Reset state when closing
    setViewState(type === 'direct' ? 'circuit' : 'selection');
    setSelectedSchematic(initialSchematic);
    onClose();
  };

  return (
    <div 
      className="circuit-popup-overlay" 
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div 
        className="circuit-popup-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          width: '90vw',
          height: '90vh',
          maxWidth: '1400px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            {viewState === 'circuit' && type === 'selection' && (
              <button
                onClick={handleBackToSelection}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <ArrowLeft size={20} color="#475569" />
              </button>
            )}
            <div style={{ flex: 1 }}>
              <h2 style={{ 
                margin: 0, 
                fontSize: '24px', 
                fontWeight: '700',
                color: '#1e293b',
              }}>
                {viewState === 'selection' ? 'Select Circuit Module' : 'Circuit Schematic'}
              </h2>
              {viewState === 'selection' && (
                <p style={{
                  margin: '8px 0 0 0',
                  fontSize: '14px',
                  color: '#64748b',
                  fontWeight: '400',
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '8px',
                }}>
                  The following module/component was found in the following circuits
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fee2e2';
              e.currentTarget.style.borderColor = '#fecaca';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <X size={20} color="#dc2626" />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {viewState === 'selection' ? (
            <div 
              style={{
                height: '100%',
                padding: '32px',
                overflowY: 'auto',
              }}
            >
              <div style={{ 
                maxWidth: '800px',
                margin: '0 auto',
              }}>
                {/* List of circuit modules */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Door Circuit Module 1 */}
                  <button
                    onClick={() => handleCircuitSelection('door-circuit-module-1')}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      borderRadius: '8px',
                      border: '2px solid #e2e8f0',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.backgroundColor = '#eff6ff';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      backgroundColor: '#dbeafe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="9" x2="15" y2="9"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: '0 0 4px 0',
                      }}>
                        Door Circuit Module 1
                      </h3>
                      <p style={{ 
                        fontSize: '14px',
                        color: '#64748b',
                        margin: 0,
                        lineHeight: '1.5',
                      }}>
                        View the first door circuit module schematic with interactive connectors
                      </p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>

                  {/* Door Circuit Module 2 */}
                  <button
                    onClick={() => handleCircuitSelection('door-circuit-module-2')}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      borderRadius: '8px',
                      border: '2px solid #e2e8f0',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#8b5cf6';
                      e.currentTarget.style.backgroundColor = '#faf5ff';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      backgroundColor: '#ede9fe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="9" x2="15" y2="9"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: '0 0 4px 0',
                      }}>
                        Door Circuit Module 2
                      </h3>
                      <p style={{ 
                        fontSize: '14px',
                        color: '#64748b',
                        margin: 0,
                        lineHeight: '1.5',
                      }}>
                        View the second door circuit module schematic with interactive connectors
                      </p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: '100%', width: '100%' }}>
              <CircuitViewer 
                selectedSchematic={selectedSchematic}
                showLeftPanel={false}
                initialZoom={80}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircuitPopup;