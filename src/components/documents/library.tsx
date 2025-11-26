import React, { useState, useEffect, useCallback } from 'react';
import { 
  LogOut, 
  FileText, 
  Download, 
  ExternalLink, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Menu,
  BookOpen,
  Zap,
  ScanSearch,
  Wrench,
  BatteryCharging,
  Monitor,
  Car,
  BookMarked,
  Bell,
  GraduationCap,
  User,
  LifeBuoy,
  Plug,
  Paintbrush,
  ShieldCheck
} from 'lucide-react';

interface TabData {
  id: string;
  label: string;
  icon: React.ReactNode;
  documents: DocumentItem[];
}

interface DocumentItem {
  id: string;
  title: string;
  type?: 'pdf' | 'doc' | 'link';
  description?: string;
  isClickable?: boolean;
  route?: string;
  pdfFileName?: string;
}

const DocumentLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('user-reference-guides');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Array<DocumentItem & { category: string }>>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // SSR-safe screen size detection
  useEffect(() => {
    setIsMounted(true);
    
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';

  const tabsData: TabData[] = [
    {
      id: 'user-reference-guides',
      label: 'User Reference Guides',
      icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Quick Start Guide', type: 'pdf', description: 'Essential setup and operation instructions', pdfFileName: 'Quick Setup Guide.pdf' },
        { id: '2', title: 'User Manual v2.1', type: 'pdf', description: 'Complete user documentation', pdfFileName: 'User Manual.pdf' },
        { id: '3', title: 'Safety Guidelines', type: 'pdf', description: 'Important safety information', pdfFileName: 'Safety Guidelines.pdf' },
        { id: '4', title: 'Feature Overview', type: 'pdf', description: 'Detailed feature explanations', pdfFileName: 'Feature Overview.pdf' },
      ]
    },
    {
      id: 'electrical-diagrams',
      label: 'Electrical Diagrams',
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Wiring Schematic', type: 'link', isClickable: true, route: '/circuit-page', description: 'Interactive wiring diagrams' },
        { id: '2', title: 'System Diagrams', type: 'link', isClickable: true, route: '/system-diagram', description: 'Detailed electrical system components diagrams' },
        { id: '3', title: 'Connector Quick Reference Guide', type: 'pdf', description: 'Quick connector information', pdfFileName: 'cqrg.pdf' },
        { id: '4', title: 'Splice Locations', type: 'pdf', description: 'Wire splice location diagrams', pdfFileName: 'splice-location.pdf' },
      ]
    },
    {
      id: 'system-diagnostics',
      label: 'System Diagnostics',
      icon: <ScanSearch className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Check Sheet', type: 'pdf', description: 'Comprehensive diagnostic checklist', pdfFileName: 'Check Sheet.pdf' },
        { id: '2', title: 'DTC Codes', type: 'link', route: '/dtc-page', description: 'Diagnostic trouble code reference' },
        { id: '3', title: 'DTC Codes History', type: 'link', route: '/dtc-history', description: 'Historical diagnostic data' },
      ]
    },
    {
      id: 'accessory-installation',
      label: 'Accessory Installation',
      icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Installation Guide - Standard', type: 'pdf', pdfFileName: 'Installation Guide - Standard.pdf' },
        { id: '2', title: 'Installation Guide - Premium', type: 'pdf', pdfFileName: 'Installation Guide - Premium.pdf' },
        { id: '3', title: 'Mounting Hardware Specifications', type: 'pdf', pdfFileName: 'Mounting Hardware Specifications.pdf' },
        { id: '4', title: 'Compatibility Chart', type: 'pdf', pdfFileName: 'Compatibility Chart.pdf' },
      ]
    },
    {
      id: 'battery-maintenance',
      label: 'Battery Maintenance',
      icon: <BatteryCharging className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Battery Care Instructions', type: 'pdf', pdfFileName: 'Battery Care Instructions.pdf' },
        { id: '2', title: 'Charging Best Practices', type: 'pdf', pdfFileName: 'Charging Best Practices.pdf' },
        { id: '3', title: 'Storage Guidelines', type: 'pdf', pdfFileName: 'Storage Guidelines.pdf' },
        { id: '4', title: 'Troubleshooting Guide', type: 'pdf', pdfFileName: 'Troubleshooting Guide.pdf' },
      ]
    },
    {
      id: 'system-software',
      label: 'System Software',
      icon: <Monitor className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Software Update Guide', type: 'pdf', pdfFileName: 'Software Update Guide.pdf' },
        { id: '2', title: 'Configuration Manual', type: 'pdf', pdfFileName: 'Configuration Manual.pdf' },
        { id: '3', title: 'API Documentation', type: 'pdf', pdfFileName: 'API Documentation.pdf' },
        { id: '4', title: 'Integration Specifications', type: 'pdf', pdfFileName: 'Integration Specifications.pdf' },
      ]
    },
    {
      id: 'vehicle-maintenance',
      label: 'Vehicle Maintenance & Storage',
      icon: <Car className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Maintenance Schedule', type: 'pdf', pdfFileName: 'Maintenance Schedule.pdf' },
        { id: '2', title: 'Storage Procedures', type: 'pdf', pdfFileName: 'Storage Procedures.pdf' },
        { id: '3', title: 'Inspection Checklist', type: 'pdf', pdfFileName: 'Inspection Checklist.pdf' },
        { id: '4', title: 'Seasonal Care Guide', type: 'pdf', pdfFileName: 'Seasonal Care Guide.pdf' },
      ]
    },
    {
      id: 'service-manual',
      label: 'Service Manual',
      icon: <BookMarked className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Complete Service Manual', type: 'pdf', pdfFileName: 'Complete Service Manual.pdf' },
        { id: '2', title: 'Parts Catalog', type: 'pdf', pdfFileName: 'Parts Catalog.pdf' },
        { id: '3', title: 'Repair Procedures', type: 'pdf', pdfFileName: 'Repair Procedures.pdf' },
        { id: '4', title: 'Technical Specifications', type: 'pdf', pdfFileName: 'Technical Specifications.pdf' },
      ]
    },
    {
      id: 'service-notices',
      label: 'Service Notices',
      icon: <Bell className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Current Service Bulletins', type: 'pdf', pdfFileName: 'Current Service Bulletins.pdf' },
        { id: '2', title: 'Safety Recalls', type: 'pdf', pdfFileName: 'Safety Recalls.pdf' },
        { id: '3', title: 'Technical Updates', type: 'pdf', pdfFileName: 'Technical Updates.pdf' },
        { id: '4', title: 'Field Fixes', type: 'pdf', pdfFileName: 'Field Fixes.pdf' },
      ]
    },
    {
      id: 'dealer-standards',
      label: 'Dealer Standards & Training',
      icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Training Materials', type: 'pdf', pdfFileName: 'Training Materials.pdf' },
        { id: '2', title: 'Certification Requirements', type: 'pdf', pdfFileName: 'Certification Requirements.pdf' },
        { id: '3', title: 'Quality Standards', type: 'pdf', pdfFileName: 'Quality Standards.pdf' },
        { id: '4', title: 'Best Practices Guide', type: 'pdf', pdfFileName: 'Best Practices Guide.pdf' },
      ]
    },
    {
      id: 'owner-resources',
      label: 'Owner Resources',
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Owner Portal Guide', type: 'pdf', pdfFileName: 'Owner Portal Guide.pdf' },
        { id: '2', title: 'Mobile App Instructions', type: 'pdf', pdfFileName: 'Mobile App Instructions.pdf' },
        { id: '3', title: 'FAQ Document', type: 'pdf', pdfFileName: 'FAQ Document.pdf' },
        { id: '4', title: 'Contact Directory', type: 'pdf', pdfFileName: 'Contact Directory.pdf' },
      ]
    },
    {
      id: 'breakdown-assistance',
      label: 'Breakdown Assistance',
      icon: <LifeBuoy className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Emergency Procedures', type: 'pdf', pdfFileName: 'Emergency Procedures.pdf' },
        { id: '2', title: 'Roadside Assistance Guide', type: 'pdf', pdfFileName: 'Roadside Assistance Guide.pdf' },
        { id: '3', title: 'Emergency Contacts', type: 'pdf', pdfFileName: 'Emergency Contacts.pdf' },
        { id: '4', title: 'Self-Help Troubleshooting', type: 'pdf', pdfFileName: 'Self-Help Troubleshooting.pdf' },
      ]
    },
    {
      id: 'ev-resources',
      label: 'EV Resources',
      icon: <Plug className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'EV Operating Manual', type: 'pdf', pdfFileName: 'EV Operating Manual.pdf' },
        { id: '2', title: 'Charging Infrastructure', type: 'pdf', pdfFileName: 'Charging Infrastructure.pdf' },
        { id: '3', title: 'Battery Technology Guide', type: 'pdf', pdfFileName: 'Battery Technology Guide.pdf' },
        { id: '4', title: 'EV Maintenance Schedule', type: 'pdf', pdfFileName: 'EV Maintenance Schedule.pdf' },
      ]
    },
    {
      id: 'bodywork-paint',
      label: 'Bodywork & Paint',
      icon: <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Paint Code Reference', type: 'pdf', pdfFileName: 'Paint Code Reference.pdf' },
        { id: '2', title: 'Body Repair Manual', type: 'pdf', pdfFileName: 'Body Repair Manual.pdf' },
        { id: '3', title: 'Paint Application Guide', type: 'pdf', pdfFileName: 'Paint Application Guide.pdf' },
        { id: '4', title: 'Refinish Procedures', type: 'pdf', pdfFileName: 'Refinish Procedures.pdf' },
      ]
    },
    {
      id: 'warranty-guide',
      label: 'Warranty Guide',
      icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
      documents: [
        { id: '1', title: 'Warranty Terms', type: 'pdf', pdfFileName: 'Warranty Terms.pdf' },
        { id: '2', title: 'Claims Process', type: 'pdf', pdfFileName: 'Claims Process.pdf' },
        { id: '3', title: 'Coverage Details', type: 'pdf', pdfFileName: 'Coverage Details.pdf' },
        { id: '4', title: 'Extended Warranty Options', type: 'pdf', pdfFileName: 'Extended Warranty Options.pdf' },
      ]
    },
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleDocumentClick = (doc: DocumentItem) => {
    if (doc.route) {
      window.location.href = doc.route;
    } else if (doc.type === 'pdf' && doc.pdfFileName) {
      setSelectedPdf(`/Data/${doc.pdfFileName}`);
      setPdfTitle(doc.title);
    } else {
      console.log(`Opening document: ${doc.title}`);
    }
  };

  const handleClosePdf = () => {
    setSelectedPdf(null);
    setPdfTitle('');
  };

  const handleDownloadPdf = () => {
    if (selectedPdf) {
      const link = document.createElement('a');
      link.href = selectedPdf;
      link.download = selectedPdf.split('/').pop() || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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

  const handleTabChange = useCallback((tabId: string) => {
    if (tabId === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }, [activeTab, isTransitioning]);

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
    const visibleCount = isMobile ? 1 : isTablet ? 3 : 5;
    const sideItems = Math.floor(visibleCount / 2);
    const items = [];
    
    for (let i = -sideItems; i <= sideItems; i++) {
      let index = activeIndex + i;
      if (index < 0) index = tabsData.length + index;
      if (index >= tabsData.length) index = index - tabsData.length;
      items.push({ ...tabsData[index], position: i });
    }
    return items;
  };

  // PDF Viewer - Full Screen
  if (selectedPdf) {
    return (
      <div className="h-screen bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="container mx-auto px-3 sm:px-4 lg:px-8">
            <div className="flex h-16 sm:h-20 lg:h-24 items-center justify-between">
              <div 
                className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                onClick={() => window.location.href = '/home-page'}
              >
                <img 
                  src="/logo_inverted.png" 
                  alt="Company Logo" 
                  className="h-12 sm:h-16 lg:h-24 w-auto" 
                />
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 transition-all duration-200 shadow-sm"
              >
                <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* PDF Viewer */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* PDF Header */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800 truncate">
                {pdfTitle}
              </h2>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={handleDownloadPdf}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 transition-colors"
                title="Download PDF"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </button>
              
              <button
                onClick={handleClosePdf}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 transition-colors"
                title="Close"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="flex-1 bg-slate-100">
            <iframe
              src={selectedPdf}
              className="w-full h-full border-0"
              title={pdfTitle}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 -right-4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-blob-delayed" />
        <div className="absolute -bottom-8 left-1/2 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-blob-more-delayed" />
      </div>

      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm relative z-20">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex h-14 sm:h-20 lg:h-24 items-center justify-between">
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer"
              onClick={() => window.location.href = '/home-page'}
            >
              <img 
                src="/logo_inverted.png" 
                alt="Company Logo" 
                className="h-10 sm:h-16 lg:h-24 w-auto" 
              />
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 transition-all duration-200 shadow-sm"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 transition-all duration-200 shadow-sm"
              >
                <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Category Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-14 sm:top-20 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg max-h-[60vh] overflow-y-auto">
          <div className="p-3 sm:p-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
              Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tabsData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className={`flex-shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-cyan-600'}`}>
                    {tab.icon}
                  </span>
                  <span className="text-xs font-medium truncate">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white/40 backdrop-blur-md border-b border-white/20 py-2 sm:py-3 px-3 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-3xl">
          <div className="relative group">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search across all documents, manuals, and categories..."
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-slate-200/50 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-200 text-sm sm:text-base text-slate-700 placeholder-slate-400 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 sm:p-1.5 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
              </button>
            )}
          </div>
          {isSearching && (
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 animate-fadeIn">
              Found <span className="font-semibold text-blue-600">{searchResults.length}</span> result{searchResults.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative pb-28 sm:pb-32 lg:pb-36">
        {!isSearching ? (
          <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6">
            <div className="container mx-auto max-w-7xl">
              {/* Category Header */}
              <div className="mb-3 sm:mb-4">
                <div className={`transition-all duration-300 ease-out ${isTransitioning ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-1">
                    <span className="text-cyan-600">
                      {activeTabData?.icon}
                    </span>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                      {activeTabData?.label}
                    </h2>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm ml-7 sm:ml-9">
                    {activeTabData?.documents.length} document{activeTabData?.documents.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              </div>

              {/* Document Grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 transition-all duration-300 ease-out ${isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
                {activeTabData?.documents.map((doc, index) => (
                  <div
                    key={doc.id}
                    onClick={() => handleDocumentClick(doc)}
                    className="group bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-slate-200/50 p-3 sm:p-4 transition-all duration-300 cursor-pointer hover:bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{ 
                      animationDelay: `${index * 30}ms`,
                      animation: isTransitioning ? 'none' : 'slideInUp 0.3s ease-out forwards'
                    }}
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className={`flex-shrink-0 p-2 sm:p-2.5 rounded-lg transition-all duration-300 ${
                        doc.isClickable || doc.route
                          ? 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 group-hover:scale-110'
                          : 'bg-gradient-to-br from-slate-100 to-slate-50 text-slate-600 group-hover:scale-110'
                      }`}>
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                          <h4 className="font-semibold text-slate-900 text-sm sm:text-base group-hover:text-blue-700 transition-colors truncate">
                            {doc.title}
                          </h4>
                          {doc.isClickable && (
                            <span className="hidden xs:inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-700 flex-shrink-0">
                              Interactive
                            </span>
                          )}
                        </div>
                        {doc.description && (
                          <p className="text-slate-600 text-xs sm:text-sm mb-1 sm:mb-1.5 line-clamp-1">{doc.description}</p>
                        )}
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-500">
                          <span className="capitalize font-medium">{doc.type || 'document'}</span>
                          <span>•</span>
                          <span className="hidden xs:inline">Updated recently</span>
                          <span className="xs:hidden">Recent</span>
                        </div>
                      </div>
                      {(!doc.isClickable && !doc.route) && (
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
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
          /* Search Results */
          <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6">
            <div className="container mx-auto max-w-7xl">
              <div className="mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-1">
                  Search Results
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Showing {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-12 sm:py-16 animate-fadeIn">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">No results found</h3>
                  <p className="text-slate-500 text-sm">Try adjusting your search terms</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3">
                  {searchResults.map((doc, index) => (
                    <div
                      key={`${doc.category}-${doc.id}`}
                      onClick={() => handleDocumentClick(doc)}
                      className="group bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-slate-200/50 p-3 sm:p-4 transition-all duration-300 cursor-pointer hover:bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                      style={{ 
                        animationDelay: `${index * 40}ms`,
                        animation: 'slideInUp 0.4s ease-out forwards'
                      }}
                    >
                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <div className={`flex-shrink-0 p-2 sm:p-2.5 rounded-lg transition-all duration-300 ${
                          doc.isClickable || doc.route
                            ? 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 group-hover:scale-110'
                            : 'bg-gradient-to-br from-slate-100 to-slate-50 text-slate-600 group-hover:scale-110'
                        }`}>
                          {getDocumentIcon(doc.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                            <span className="text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 truncate max-w-[120px] sm:max-w-none">
                              {doc.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                            <h4 className="font-semibold text-slate-900 text-sm sm:text-base group-hover:text-blue-700 transition-colors truncate">
                              {doc.title}
                            </h4>
                            {doc.isClickable && (
                              <span className="hidden sm:inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-700 flex-shrink-0">
                                Interactive
                              </span>
                            )}
                          </div>
                          {doc.description && (
                            <p className="text-slate-600 text-xs sm:text-sm mb-1 sm:mb-1.5 line-clamp-1">{doc.description}</p>
                          )}
                          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-500">
                            <span className="capitalize font-medium">{doc.type || 'document'}</span>
                            <span>•</span>
                            <span className="hidden xs:inline">Updated recently</span>
                            <span className="xs:hidden">Recent</span>
                          </div>
                        </div>
                        {(!doc.isClickable && !doc.route) && (
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
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

        {/* Bottom Carousel - Compact */}
        {!isSearching && isMounted && (
          <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-32 lg:h-36 pointer-events-none flex items-center justify-center bg-gradient-to-t from-white/80 to-transparent">
            <div className="relative flex items-center pointer-events-auto gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-4">
              {/* Navigation Arrow - Left */}
              <button
                onClick={() => navigateCarousel('prev')}
                disabled={isTransitioning}
                className="z-30 bg-white shadow-md rounded-full p-1.5 sm:p-2 hover:bg-slate-50 hover:shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-teal-700" />
              </button>

              {/* Carousel Items - Compact */}
              <div 
                className="flex items-end justify-center pb-2 sm:pb-3 relative"
                style={{ 
                  width: isMobile ? '200px' : isTablet ? '460px' : '780px',
                  height: isMobile ? '80px' : isTablet ? '100px' : '115px'
                }}
              >
                {getCarouselItems().map((item) => {
                  const isActive = item.position === 0;
                  const isAdjacent = Math.abs(item.position) === 1;
                  
                  // Calculate positions based on screen size - more compact
                  let xOffset = 0;
                  if (isMobile) {
                    xOffset = item.position === 0 ? 30 : (item.position < 0 ? -140 : 200);
                  } else if (isTablet) {
                    if (item.position === -1) xOffset = 0;
                    else if (item.position === 0) xOffset = 145;
                    else if (item.position === 1) xOffset = 290;
                    else xOffset = item.position < 0 ? -100 : 450;
                  } else {
                    // Desktop: Show 5 cards - wider spacing for full text
                    if (item.position === -2) xOffset = 0;
                    else if (item.position === -1) xOffset = 135;
                    else if (item.position === 0) xOffset = 305;
                    else if (item.position === 1) xOffset = 475;
                    else if (item.position === 2) xOffset = 610;
                  }

                  // Wider cards to fit text - increased height
                  const cardWidth = isMobile ? 'w-32' : isTablet ? 'w-36' : 'w-44';
                  const cardHeight = isMobile ? 'h-16' : isTablet ? 'h-20' : 'h-24';
                  
                  // Hide far items on smaller screens
                  if (isMobile && Math.abs(item.position) > 0) return null;
                  if (isTablet && Math.abs(item.position) > 1) return null;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      disabled={isTransitioning}
                      className={`absolute transition-all duration-500 ease-in-out ${
                        isActive ? 'z-20' : isAdjacent ? 'z-10' : 'z-0'
                      } ${isTransitioning ? 'pointer-events-none' : ''}`}
                      style={{
                        left: `${xOffset}px`,
                        transform: `scale(${isActive ? 1.08 : isAdjacent ? 0.88 : 0.78}) rotateY(${item.position * -5}deg)`,
                        opacity: isActive ? 1 : isAdjacent ? 0.75 : 0.45,
                      }}
                    >
                      <div 
                        className={`${cardWidth} ${cardHeight} rounded-xl overflow-hidden transition-all duration-500 ${
                          isActive ? 'shadow-lg shadow-cyan-500/25' : 'shadow-md shadow-slate-300/40'
                        }`}
                        style={{
                          background: isActive 
                            ? 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
                            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        }}
                      >
                        <div className="relative h-full flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3">
                          {/* Icon */}
                          <div className={`flex-shrink-0 transition-all duration-500 ${
                            isActive ? 'text-white drop-shadow-md' : 'text-cyan-600'
                          }`}>
                            {item.icon}
                          </div>
                          
                          {/* Text */}
                          <div className="flex-1 min-w-0 text-left">
                            <h3 className={`font-semibold text-[9px] sm:text-[10px] lg:text-xs leading-tight transition-colors duration-500 ${
                              isActive ? 'text-white' : 'text-slate-700'
                            }`}>
                              {item.label}
                            </h3>
                            <p className={`text-[8px] sm:text-[9px] mt-0.5 transition-colors duration-500 ${
                              isActive ? 'text-cyan-100' : 'text-slate-500'
                            }`}>
                              {isActive ? 'Selected' : `${item.documents.length} docs`}
                            </p>
                          </div>

                          {/* Active Indicator */}
                          {isActive && (
                            <div className="absolute top-1.5 right-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                            </div>
                          )}

                          {/* Border */}
                          <div className={`absolute inset-0 rounded-xl pointer-events-none transition-all duration-500 ${
                            isActive 
                              ? 'border-2 border-white/20' 
                              : 'border border-slate-200/60'
                          }`} />
                        </div>
                      </div>
                      
                      {/* Arrow Indicator */}
                      {isActive && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-cyan-500 animate-gentleBounce drop-shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Arrow - Right */}
              <button
                onClick={() => navigateCarousel('next')}
                disabled={isTransitioning}
                className="z-30 bg-white shadow-md rounded-full p-1.5 sm:p-2 hover:bg-slate-50 hover:shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-teal-700" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

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

        /* Custom breakpoint for extra small screens */
        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
          .xs\\:inline-flex {
            display: inline-flex;
          }
        }

        @media (max-width: 479px) {
          .xs\\:inline {
            display: none;
          }
          .xs\\:hidden {
            display: inline;
          }
          .xs\\:inline-flex {
            display: none;
          }
        }

        /* Touch-friendly hover states on mobile */
        @media (hover: none) {
          .group:hover .group-hover\\:opacity-100 {
            opacity: 0;
          }
          .group:hover .group-hover\\:scale-110 {
            transform: scale(1);
          }
          .group:active .group-hover\\:scale-110 {
            transform: scale(1.05);
          }
        }

        /* Smooth scrolling for the document list */
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }

        /* Better touch targets on mobile */
        @media (max-width: 640px) {
          button, [role="button"] {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
};

export default DocumentLibrary;