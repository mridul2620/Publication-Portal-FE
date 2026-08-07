import React, { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import PartsCatalogPage from '../dtc-page/PartsCatalog';
import CircuitPopup from '../dtc-page/circuitpopup';

interface DTCData {
  code: string;
  name?: string;
  description: string;
  possible_causes: Array<{
    cause: string;
    reportedBy: number;
    trend: "up" | "down" | "stable";
  }>;
  action: Array<{
    step: string;
    reportedBy: number;
    trend: "up" | "down" | "stable";
  }>;
}

interface RelatedDtcModalProps {
  show: boolean;
  onClose: () => void;
  connectorName: string;
}

const RelatedDtcModal: React.FC<RelatedDtcModalProps> = ({ show, onClose, connectorName }) => {
  const [dtcs, setDtcs] = useState<DTCData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDtcCode, setSelectedDtcCode] = useState<string>('');
  const [showPartsCatalog, setShowPartsCatalog] = useState(false);
  const [popupConfig, setPopupConfig] = useState<{show: boolean, type: 'direct' | 'selection', initialSchematic: string}>({
    show: false,
    type: 'direct',
    initialSchematic: 'door-circuit-module-1'
  });

  useEffect(() => {
    if (show) {
      fetchDTCData();
    } else {
      // Reset state when hiding
      setDtcs([]);
      setLoading(true);
      setShowPartsCatalog(false);
      setSelectedDtcCode('');
    }
  }, [show]);

  const fetchDTCData = async () => {
    try {
      const response = await fetch('/DTCs.json');
      const data = await response.json();
      
      const transformedData = data.map((dtc: any) => ({
        ...dtc,
        possible_causes: dtc.possible_causes.map((cause: any) => {
          if (typeof cause === 'string') {
            return {
              cause: cause,
              reportedBy: Math.floor(Math.random() * 150) + 10,
              trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
            };
          }
          return cause;
        }),
        action: dtc.action.map((act: any) => {
          if (typeof act === 'string') {
            return {
              step: act,
              reportedBy: Math.floor(Math.random() * 150) + 10,
              trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
            };
          }
          return act;
        })
      }));
      
      // Shuffle array and take 4-5 items (let's say 4 for consistency)
      const shuffled = transformedData.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4);
      
      setDtcs(selected);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching DTC data:', error);
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch(trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-slate-400" />;
    }
  };

  const handleDtcCodeClick = (code: string) => {
    setSelectedDtcCode(code);
    setShowPartsCatalog(true);
  };

  const handleCloseCatalog = () => {
    setShowPartsCatalog(false);
    setSelectedDtcCode('');
  };

  const isCircuitRelatedCause = (causeText: string): boolean => {
    const circuitKeywords = [
      'short circuit to ground',
      'open circuit',
      'high resistance',
      'short to ground',
      'circuit fault',
      'wiring issue'
    ];
    
    const lowerCauseText = causeText.toLowerCase();
    return circuitKeywords.some(keyword => lowerCauseText.includes(keyword));
  };

  const handleCauseClick = (causeText: string) => {
    if (isCircuitRelatedCause(causeText)) {
      setPopupConfig({
        show: true,
        type: 'direct',
        initialSchematic: 'door-circuit-module-1'
      });
    } else {
      setPopupConfig({
        show: true,
        type: 'selection',
        initialSchematic: 'door-circuit-module-1'
      });
    }
  };

  const closePopup = () => {
    setPopupConfig({
      show: false,
      type: 'direct',
      initialSchematic: 'door-circuit-module-1'
    });
  };

  if (!show) return null;

  // If showing parts catalog, it takes over the screen completely (rendered in a portal or fixed overlay)
  if (showPartsCatalog) {
    return (
      <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
        <PartsCatalogPage 
          dtcCode={selectedDtcCode}
          onClose={handleCloseCatalog}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Related DTCs
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Diagnostic Trouble Codes potentially related to connector <span className="font-semibold">{connectorName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-300">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                  <thead className="text-left text-xs font-bold uppercase tracking-wider bg-slate-800 text-white">
                    <tr>
                      <th className="px-6 py-4 border-r border-slate-600 w-40">Code</th>
                      <th className="px-6 py-4 border-r border-slate-600">Description</th>
                      <th className="px-6 py-4 border-r border-slate-600">Possible Causes</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dtcs.map((dtc, index) => (
                      <tr 
                        key={dtc.code}
                        className={`border-b border-slate-300 hover:bg-slate-50 transition-all duration-200 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                        }`}
                      >
                        <td className="px-6 py-5 border-r border-slate-300 align-top">
                          <span className="inline-flex items-center px-4 py-2 rounded-md text-sm font-bold text-slate-700 whitespace-nowrap bg-slate-100">
                            {dtc.code}
                          </span>
                        </td>
                        <td className="px-6 py-5 border-r border-slate-300 align-top">
                          <span className="text-sm text-slate-900 font-semibold leading-relaxed">
                            {dtc.description}
                          </span>
                        </td>
                        <td className="px-6 py-5 border-r border-slate-300 align-top">
                          <div className="space-y-3">
                            {dtc.possible_causes.map((causeObj: any, idx: number) => (
                              <div 
                                key={idx} 
                                className="flex items-start gap-3 group cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-all duration-200 -ml-2"
                                onClick={() => handleCauseClick(causeObj.cause || causeObj)}
                                style={{ border: '1px solid transparent' }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                              >
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-amber-200 transition-colors">
                                  {idx + 1}
                                </span>
                                <div className="flex-1">
                                  <span className="text-sm text-slate-700 leading-relaxed block mb-1 group-hover:text-blue-700 group-hover:font-medium transition-all">
                                    {causeObj.cause || causeObj}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 shadow-sm">
                                      {getTrendIcon(causeObj.trend || 'stable')}
                                      <span>Reported by {causeObj.reportedBy || 0} technicians</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <div className="space-y-3">
                            {dtc.action.map((actObj: any, idx: number) => (
                              <div key={idx} className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs font-bold flex-shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <div className="flex-1">
                                  <span className="text-sm text-slate-700 leading-relaxed">{actObj.step || actObj}</span>
                                </div>
                              </div>
                            ))}
                            
                            {/* Related Parts Button */}
                            <div className="mt-5 pt-4 border-t border-slate-200">
                              <button
                                onClick={() => handleDtcCodeClick(dtc.code)}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                <svg 
                                  className="w-4 h-4" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
                                  />
                                </svg>
                                Related Parts
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Circuit Popup */}
      {popupConfig.show && (
        <div className="fixed inset-0 z-[110]">
          <CircuitPopup
            show={popupConfig.show}
            onClose={closePopup}
            type={popupConfig.type}
            initialSchematic={popupConfig.initialSchematic}
          />
        </div>
      )}
    </div>
  );
};

export default RelatedDtcModal;
