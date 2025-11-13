import React, { useState, useEffect } from 'react';
import { LogOut, X, Search, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import CircuitPopup from './circuitpopup';
import PartsCatalogPage from './PartsCatalog';


interface DTCData {
  [key: string]: {
    DTCs: Array<{
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
    }>;
  };
}

interface PopupConfig {
  show: boolean;
  type: 'direct' | 'selection';
  initialSchematic: string;
}

const DTCPage: React.FC = () => {
  const [dtcData, setDtcData] = useState<DTCData['string']['DTCs']>([]);
  const [filteredData, setFilteredData] = useState<DTCData['string']['DTCs']>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [popupConfig, setPopupConfig] = useState<PopupConfig>({
    show: false,
    type: 'direct',
    initialSchematic: 'door-circuit-module-1'
  });
  const [showPartsCatalog, setShowPartsCatalog] = useState(false);
  const [selectedDtcCode, setSelectedDtcCode] = useState<string>('');

  useEffect(() => {
    fetchDTCData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, dtcData]);

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
      
      setDtcData(transformedData);
      setFilteredData(transformedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching DTC data:', error);
      setLoading(false);
    }
  };

  const filterData = () => {
    if (!searchTerm.trim()) {
      setFilteredData(dtcData);
      return;
    }

    const filtered = dtcData.filter(dtc => 
      dtc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dtc.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleNav = () => {
    window.location.href = '/documents';
  };

  const toggleRow = (code: string) => {
    setExpandedRow(expandedRow === code ? null : code);
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

  /**
   * Determines if a cause text contains circuit-related keywords
   * that should trigger the direct circuit view
   */
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

  /**
   * Handles click on a possible cause
   * Opens appropriate popup based on cause type
   */
  const handleCauseClick = (causeText: string) => {
    if (isCircuitRelatedCause(causeText)) {
      // Type 1: Direct circuit view (Door Circuit Module 1)
      setPopupConfig({
        show: true,
        type: 'direct',
        initialSchematic: 'door-circuit-module-1'
      });
    } else {
      // Type 2: Selection list view
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

  const handleDtcCodeClick = (code: string) => {
    setSelectedDtcCode(code);
    setShowPartsCatalog(true);
  };

  const handleCloseCatalog = () => {
    setShowPartsCatalog(false);
    setSelectedDtcCode('');
  };

  // If parts catalog is showing, render that instead
  if (showPartsCatalog) {
    return (
      <PartsCatalogPage 
        dtcCode={selectedDtcCode}
        onClose={handleCloseCatalog}
      />
    );
  }

  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer"
             onClick={() => window.location.href = '/home-page'}>
                <img src="/logo_inverted.png" alt="Company Logo" className="h-24 w-30" />
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and Search Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleNav}
              className="p-2 rounded-lg hover:bg-slate-200 transition-colors duration-200 group"
              aria-label="Go back"
            >
              <X className="h-6 w-6 text-slate-600 group-hover:text-slate-900" />
            </button>
            <h1 className="text-3xl font-bold text-slate-900">DTC Codes</h1>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by code or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-slate-600 font-medium">
              Showing {filteredData.length} of {dtcData.length} codes
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* DTC Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-slate-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-500 text-lg font-medium">No DTC codes found matching your search.</p>
            <p className="text-slate-400 text-sm mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-300">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider w-40 border-r border-slate-600 bg-slate-800">
                  <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider w-40 border-r border-slate-600">Code</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-r border-slate-600">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider border-r border-slate-600">Possible Causes</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((dtc, index) => (
                    <tr 
                      key={dtc.code}
                      className={`border-b border-slate-300 hover:bg-slate-50 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      }`}
                    >
                      <td className="px-6 py-5 border-r border-slate-300">
                        <button
                          onClick={() => handleDtcCodeClick(dtc.code)}
                          className="inline-flex items-center px-4 py-2 rounded-md text-sm font-bold text-slate-700 whitespace-nowrap hover:bg-blue-50 hover:text-blue-700 hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-blue-300"
                        >
                          {dtc.code}
                        </button>
                      </td>
                      <td className="px-6 py-5 border-r border-slate-300">
                        <span className="text-sm text-slate-900 font-semibold leading-relaxed">
                          {dtc.description}
                        </span>
                      </td>
                      <td className="px-6 py-5 border-r border-slate-300">
                        <div className="space-y-2">
                          {dtc.possible_causes.map((causeObj: any, idx: number) => (
                            <div 
                              key={idx} 
                              className="flex items-start gap-2 group cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
                              onClick={() => handleCauseClick(causeObj.cause || causeObj)}
                              style={{ 
                                border: '1px solid transparent',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#3b82f6';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'transparent';
                              }}
                            >
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-amber-200 transition-colors">
                                {idx + 1}
                              </span>
                              <div className="flex-1">
                                <span className="text-sm text-slate-700 leading-relaxed group-hover:text-blue-700 group-hover:font-medium transition-all">
                                  {causeObj.cause || causeObj}
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                                    {getTrendIcon(causeObj.trend || 'stable')}
                                    <span>Reported by {causeObj.reportedBy || 0} technicians</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          {dtc.action.map((actObj: any, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 group">
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-green-200 transition-colors">
                                {idx + 1}
                              </span>
                              <div className="flex-1">
                                <span className="text-sm text-slate-700 leading-relaxed">{actObj.step || actObj}</span>
                              </div>
                            </div>
                          ))}
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

      {/* Circuit Popup */}
      <CircuitPopup
        show={popupConfig.show}
        onClose={closePopup}
        type={popupConfig.type}
        initialSchematic={popupConfig.initialSchematic}
      />
    </div>
  );
};

export default DTCPage;