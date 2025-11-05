import React, { useState } from 'react';
import { LogOut, FileText, Download, ExternalLink, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TabData {
  id: string;
  label: string;
  icon: string;
  documents: DocumentItem[];
}

interface DocumentItem {
  id: string;
  title: string;
  type?: 'pdf' | 'doc' | 'link';
  description?: string;
  isClickable?: boolean;
  route?: string;
}

const DocumentLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('user-reference-guides');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Array<DocumentItem & { category: string }>>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabsData: TabData[] = [
    {
      id: 'user-reference-guides',
      label: 'User Reference Guides',
      icon: '📚',
      documents: [
        { id: '1', title: 'Quick Start Guide', type: 'pdf', description: 'Essential setup and operation instructions' },
        { id: '2', title: 'User Manual v2.1', type: 'pdf', description: 'Complete user documentation' },
        { id: '3', title: 'Safety Guidelines', type: 'pdf', description: 'Important safety information' },
        { id: '4', title: 'Feature Overview', type: 'doc', description: 'Detailed feature explanations' },
      ]
    },
    {
      id: 'accessory-installation',
      label: 'Accessory Installation',
      icon: '🔧',
      documents: [
        { id: '1', title: 'Installation Guide - Standard', type: 'pdf' },
        { id: '2', title: 'Installation Guide - Premium', type: 'pdf' },
        { id: '3', title: 'Mounting Hardware Specifications', type: 'doc' },
        { id: '4', title: 'Compatibility Chart', type: 'pdf' },
      ]
    },
    {
      id: 'battery-maintenance',
      label: 'Battery Maintenance',
      icon: '🔋',
      documents: [
        { id: '1', title: 'Battery Care Instructions', type: 'pdf' },
        { id: '2', title: 'Charging Best Practices', type: 'doc' },
        { id: '3', title: 'Storage Guidelines', type: 'pdf' },
        { id: '4', title: 'Troubleshooting Guide', type: 'doc' },
      ]
    },
    {
      id: 'electrical-diagrams',
      label: 'Electrical Diagrams',
      icon: '⚡',
      documents: [
        { id: '1', title: 'Wiring Schematic', type: 'link', isClickable: true, route: '/circuit-page', description: 'Interactive wiring diagrams' },
        { id: '2', title: 'System Diagrams', type: 'link', isClickable: true, route: '/system-diagram', description: 'Detailed electrical system components diagrams' },
        { id: '3', title: 'Fuse and Relay Listings', type: 'doc', description: 'Complete fuse and relay information' },
        { id: '4', title: 'Splice Locations', type: 'pdf', description: 'Wire splice location diagrams' },
      ]
    },
    {
      id: 'system-software',
      label: 'System Software',
      icon: '💻',
      documents: [
        { id: '1', title: 'Software Update Guide', type: 'pdf' },
        { id: '2', title: 'Configuration Manual', type: 'doc' },
        { id: '3', title: 'API Documentation', type: 'pdf' },
        { id: '4', title: 'Integration Specifications', type: 'doc' },
      ]
    },
    {
      id: 'vehicle-maintenance',
      label: 'Vehicle Maintenance & Storage',
      icon: '🚗',
      documents: [
        { id: '1', title: 'Maintenance Schedule', type: 'pdf' },
        { id: '2', title: 'Storage Procedures', type: 'doc' },
        { id: '3', title: 'Inspection Checklist', type: 'pdf' },
        { id: '4', title: 'Seasonal Care Guide', type: 'doc' },
      ]
    },
    {
      id: 'service-manual',
      label: 'Service Manual',
      icon: '📖',
      documents: [
        { id: '1', title: 'Complete Service Manual', type: 'pdf' },
        { id: '2', title: 'Parts Catalog', type: 'doc' },
        { id: '3', title: 'Repair Procedures', type: 'pdf' },
        { id: '4', title: 'Technical Specifications', type: 'doc' },
      ]
    },
    {
      id: 'service-notices',
      label: 'Service Notices',
      icon: '📢',
      documents: [
        { id: '1', title: 'Current Service Bulletins', type: 'pdf' },
        { id: '2', title: 'Safety Recalls', type: 'doc' },
        { id: '3', title: 'Technical Updates', type: 'pdf' },
        { id: '4', title: 'Field Fixes', type: 'doc' },
      ]
    },
    {
      id: 'system-diagnostics',
      label: 'System Diagnostics',
      icon: '🔍',
      documents: [
        { id: '1', title: 'Check Sheet', type: 'pdf', description: 'Comprehensive diagnostic checklist' },
        { id: '2', title: 'DTC Codes', type: 'doc', description: 'Diagnostic trouble code reference' },
        { id: '3', title: 'History', type: 'pdf', description: 'Historical diagnostic data' },
      ]
    },
    {
      id: 'dealer-standards',
      label: 'Dealer Standards & Training',
      icon: '🎓',
      documents: [
        { id: '1', title: 'Training Materials', type: 'pdf' },
        { id: '2', title: 'Certification Requirements', type: 'doc' },
        { id: '3', title: 'Quality Standards', type: 'pdf' },
        { id: '4', title: 'Best Practices Guide', type: 'doc' },
      ]
    },
    {
      id: 'owner-resources',
      label: 'Owner Resources',
      icon: '👤',
      documents: [
        { id: '1', title: 'Owner Portal Guide', type: 'pdf' },
        { id: '2', title: 'Mobile App Instructions', type: 'doc' },
        { id: '3', title: 'FAQ Document', type: 'pdf' },
        { id: '4', title: 'Contact Directory', type: 'doc' },
      ]
    },
    {
      id: 'breakdown-assistance',
      label: 'Breakdown Assistance',
      icon: '🆘',
      documents: [
        { id: '1', title: 'Emergency Procedures', type: 'pdf' },
        { id: '2', title: 'Roadside Assistance Guide', type: 'doc' },
        { id: '3', title: 'Emergency Contacts', type: 'pdf' },
        { id: '4', title: 'Self-Help Troubleshooting', type: 'doc' },
      ]
    },
    {
      id: 'ev-resources',
      label: 'EV Resources',
      icon: '🔌',
      documents: [
        { id: '1', title: 'EV Operating Manual', type: 'pdf' },
        { id: '2', title: 'Charging Infrastructure', type: 'doc' },
        { id: '3', title: 'Battery Technology Guide', type: 'pdf' },
        { id: '4', title: 'EV Maintenance Schedule', type: 'doc' },
      ]
    },
    {
      id: 'bodywork-paint',
      label: 'Bodywork & Paint',
      icon: '🎨',
      documents: [
        { id: '1', title: 'Paint Code Reference', type: 'pdf' },
        { id: '2', title: 'Body Repair Manual', type: 'doc' },
        { id: '3', title: 'Paint Application Guide', type: 'pdf' },
        { id: '4', title: 'Refinish Procedures', type: 'doc' },
      ]
    },
    {
      id: 'warranty-guide',
      label: 'Warranty Guide',
      icon: '🛡️',
      documents: [
        { id: '1', title: 'Warranty Terms', type: 'pdf' },
        { id: '2', title: 'Claims Process', type: 'doc' },
        { id: '3', title: 'Coverage Details', type: 'pdf' },
        { id: '4', title: 'Extended Warranty Options', type: 'doc' },
      ]
    },
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleDocumentClick = (doc: DocumentItem) => {
    if (doc.isClickable && doc.route) {
      window.location.href = doc.route;
    } else {
      console.log(`Opening document: ${doc.title}`);
    }
  };

  const getDocumentIcon = (type?: string) => {
    switch (type) {
      case 'link':
        return <ExternalLink className="h-4 w-4" />;
      case 'pdf':
      case 'doc':
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveTab(tabId);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const navigateCarousel = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    const currentIndex = tabsData.findIndex(tab => tab.id === activeTab);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex === tabsData.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? tabsData.length - 1 : currentIndex - 1;
    }
    
    handleTabChange(tabsData[newIndex].id);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results: Array<DocumentItem & { category: string }> = [];
    const lowerQuery = query.toLowerCase();

    tabsData.forEach(tab => {
      tab.documents.forEach(doc => {
        if (
          doc.title.toLowerCase().includes(lowerQuery) ||
          doc.description?.toLowerCase().includes(lowerQuery) ||
          tab.label.toLowerCase().includes(lowerQuery)
        ) {
          results.push({ ...doc, category: tab.label });
        }
      });
    });

    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
  };

  const activeTabData = tabsData.find(tab => tab.id === activeTab);
  const activeIndex = tabsData.findIndex(tab => tab.id === activeTab);

  const getCarouselItems = () => {
    const items = [];
    for (let i = -2; i <= 2; i++) {
      let index = activeIndex + i;
      if (index < 0) index = tabsData.length + index;
      if (index >= tabsData.length) index = index - tabsData.length;
      items.push({ ...tabsData[index], position: i });
    }
    return items;
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-blob-delayed"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-blob-more-delayed"></div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
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

      {/* Search Bar */}
      <div className="bg-white/40 backdrop-blur-md border-b border-white/20 py-3 px-6 relative">
        <div className="container mx-auto max-w-3xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search across all documents, manuals, and categories..."
              className="w-full pl-12 pr-12 py-2.5 rounded-xl border-2 border-slate-200/50 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-200 text-slate-700 placeholder-slate-400 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-slate-400" />
              </button>
            )}
          </div>
          {isSearching && (
            <p className="mt-2 text-sm text-slate-600 animate-fadeIn">
              Found <span className="font-semibold text-blue-600">{searchResults.length}</span> result{searchResults.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative pb-52">
        {!isSearching ? (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="container mx-auto max-w-7xl">
              <div className="mb-4">
                <div className={`transition-all duration-300 ease-out ${isTransitioning ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-1">
                    {activeTabData?.label}
                  </h2>
                  <p className="text-slate-600 text-sm">
                    {activeTabData?.documents.length} document{activeTabData?.documents.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 transition-all duration-300 ease-out ${isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
                {activeTabData?.documents.map((doc, index) => (
                  <div
                    key={doc.id}
                    onClick={() => handleDocumentClick(doc)}
                    className="group bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 p-4 transition-all duration-300 cursor-pointer hover:bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ 
                      animationDelay: `${index * 30}ms`,
                      animation: isTransitioning ? 'none' : 'slideInUp 0.3s ease-out forwards'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 p-2.5 rounded-lg transition-all duration-300 ${
                        doc.isClickable
                          ? 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 group-hover:scale-110'
                          : 'bg-gradient-to-br from-slate-100 to-slate-50 text-slate-600 group-hover:scale-110'
                      }`}>
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-semibold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                            {doc.title}
                          </h4>
                          {doc.isClickable && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              Interactive
                            </span>
                          )}
                        </div>
                        {doc.description && (
                          <p className="text-slate-600 text-sm mb-1.5 line-clamp-1">{doc.description}</p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="capitalize font-medium">{doc.type || 'document'}</span>
                          <span>•</span>
                          <span>Updated recently</span>
                        </div>
                      </div>
                      {!doc.isClickable && (
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Download className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="container mx-auto max-w-7xl">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Search Results
                </h2>
                <p className="text-slate-600 text-sm">
                  Showing {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-16 animate-fadeIn">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">No results found</h3>
                  <p className="text-slate-500">Try adjusting your search terms</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {searchResults.map((doc, index) => (
                    <div
                      key={`${doc.category}-${doc.id}`}
                      onClick={() => handleDocumentClick(doc)}
                      className="group bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 p-4 transition-all duration-300 cursor-pointer hover:bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5"
                      style={{ 
                        animationDelay: `${index * 40}ms`,
                        animation: 'slideInUp 0.4s ease-out forwards'
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 p-2.5 rounded-lg transition-all duration-300 ${
                          doc.isClickable
                            ? 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 group-hover:scale-110'
                            : 'bg-gradient-to-br from-slate-100 to-slate-50 text-slate-600 group-hover:scale-110'
                        }`}>
                          {getDocumentIcon(doc.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              {doc.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="font-semibold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                              {doc.title}
                            </h4>
                            {doc.isClickable && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                Interactive
                              </span>
                            )}
                          </div>
                          {doc.description && (
                            <p className="text-slate-600 text-sm mb-1.5 line-clamp-1">{doc.description}</p>
                          )}
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="capitalize font-medium">{doc.type || 'document'}</span>
                            <span>•</span>
                            <span>Updated recently</span>
                          </div>
                        </div>
                        {!doc.isClickable && (
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Download className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Carousel - Card Style with Overlapping */}
        {!isSearching && (
          <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none flex items-center justify-center">
            <div className="relative flex items-center pointer-events-auto perspective-1000 gap-6">
              {/* Navigation Arrow - Left */}
              <button
                onClick={() => navigateCarousel('prev')}
                disabled={isTransitioning}
                className="z-30 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <ChevronLeft className="h-6 w-6 text-teal-700" />
              </button>

              {/* Carousel Items - Overlapping */}
              <div className="flex items-end justify-center pb-8 relative" style={{ width: '900px', height: '180px' }}>
                {getCarouselItems().map((item) => {
                  const isActive = item.position === 0;
                  const isAdjacent = Math.abs(item.position) === 1;
                  const isFar = Math.abs(item.position) === 2;
                  
                  // Calculate overlapping positions
                  let xOffset = 0;
                  if (item.position === -2) xOffset = 0;
                  else if (item.position === -1) xOffset = 140;
                  else if (item.position === 0) xOffset = 320;
                  else if (item.position === 1) xOffset = 500;
                  else if (item.position === 2) xOffset = 640;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      disabled={isTransitioning}
                      className={`absolute transition-all duration-800 ease-in-out ${
                        isActive ? 'z-20' : isAdjacent ? 'z-10' : 'z-0'
                      } ${isTransitioning ? 'pointer-events-none' : ''}`}
                      style={{
                        left: `${xOffset}px`,
                        transform: `scale(${isActive ? 1.05 : isAdjacent ? 0.92 : 0.82}) rotateY(${item.position * -8}deg)`,
                        opacity: isActive ? 1 : isAdjacent ? 0.85 : 0.5,
                      }}
                    >
                      <div className={`w-56 h-40 rounded-3xl overflow-hidden transition-all duration-800 ${
                        isActive ? 'shadow-xl shadow-cyan-500/30' : 'shadow-lg shadow-slate-300/50'
                      }`}
                        style={{
                          background: isActive 
                            ? 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
                            : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                        }}
                      >
                        <div className="relative h-full flex flex-col p-5">
                          {/* Top Section with Icon/Image */}
                          <div className="flex-1 flex items-center justify-center mb-3">
                            <div className={`text-6xl transition-all duration-800 ${
                              isActive ? 'scale-110 drop-shadow-lg' : 'scale-100'
                            }`}>
                              {item.icon}
                            </div>
                          </div>
                          
                          {/* Bottom Section with Text */}
                          <div className="text-center">
                            <h3 className={`font-bold text-sm leading-tight mb-1 transition-colors duration-800 ${
                              isActive ? 'text-white' : 'text-teal-900'
                            }`}>
                              {item.label.toUpperCase()}
                            </h3>
                            <p className={`text-xs transition-colors duration-800 ${
                              isActive ? 'text-cyan-100' : 'text-slate-600'
                            }`}>
                              {isActive ? `Go to ${item.label}` : `${item.documents.length} documents`}
                            </p>
                          </div>

                          {/* Top Corner Indicator */}
                          {isActive && (
                            <div className="absolute top-3 right-3">
                              <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                              <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-white"></div>
                            </div>
                          )}

                          {/* Card Border Effect */}
                          <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-800 ${
                            isActive 
                              ? 'border-4 border-white/20' 
                              : 'border-2 border-slate-200/50'
                          }`}></div>
                        </div>
                      </div>
                      
                      {/* Top Arrow Indicator */}
                      {isActive && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-cyan-500 animate-gentleBounce drop-shadow-lg" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Arrow - Right */}
              <button
                onClick={() => navigateCarousel('next')}
                disabled={isTransitioning}
                className="z-30 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <ChevronRight className="h-6 w-6 text-teal-700" />
              </button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes gentleBounce {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-8px) translateX(-50%);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-blob-delayed {
          animation: blob 7s infinite 2s;
        }

        .animate-blob-more-delayed {
          animation: blob 7s infinite 4s;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-gentleBounce {
          animation: gentleBounce 2s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default DocumentLibrary;