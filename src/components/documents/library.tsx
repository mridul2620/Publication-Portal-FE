import React, { useState } from 'react';
import { LogOut, FileText, Download, ExternalLink } from 'lucide-react';

interface TabData {
  id: string;
  label: string;
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

  const tabsData: TabData[] = [
    {
      id: 'user-reference-guides',
      label: 'User Reference Guides',
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
      documents: [
        { id: '1', title: 'Battery Care Instructions', type: 'pdf' },
        { id: '2', title: 'Charging Best Practices', type: 'doc' },
        { id: '3', title: 'Storage Guidelines', type: 'pdf' },
        { id: '4', title: 'Troubleshooting Guide', type: 'doc' },
      ]
    },
    {
      id: 'system-software',
      label: 'System Software',
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
      documents: [
        { id: '1', title: 'Complete Service Manual', type: 'pdf' },
        { id: '2', title: 'Parts Catalog', type: 'doc' },
        { id: '3', title: 'Repair Procedures', type: 'pdf' },
        { id: '4', title: 'Technical Specifications', type: 'doc' },
      ]
    },
    {
      id: 'electrical-diagrams',
      label: 'Electrical Diagrams',
      documents: [
        { id: '1', title: 'Wiring Schematic', type: 'link', isClickable: true, route: '/circuit-page', description: 'Interactive wiring diagrams' },
        { id: '2', title: 'Connector Reference Guide', type: 'pdf', description: 'Detailed connector specifications' },
        { id: '3', title: 'Fuse and Relay Listings', type: 'doc', description: 'Complete fuse and relay information' },
        { id: '4', title: 'Splice Locations', type: 'pdf', description: 'Wire splice location diagrams' },
      ]
    },
    {
      id: 'service-notices',
      label: 'Service Notices',
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
      documents: [
        { id: '1', title: 'Check Sheet', type: 'pdf', description: 'Comprehensive diagnostic checklist' },
        { id: '2', title: 'DTC Codes', type: 'doc', description: 'Diagnostic trouble code reference' },
        { id: '3', title: 'History', type: 'pdf', description: 'Historical diagnostic data' },
      ]
    },
    {
      id: 'dealer-standards',
      label: 'Dealer Standards & Training',
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
      // Handle download or view action for regular documents
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

  const activeTabData = tabsData.find(tab => tab.id === activeTab);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col overflow-hidden">
      {/* Header - Same as existing pages */}
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 flex items-center justify-center bg-gray-800 rounded">
                <img src="/logo.png" alt="Company Logo" className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Chartsign</h1>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex min-0">
        <aside className="w-[25%] bg-white border-r border-gray-200 flex flex-col">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Document Library</h2>
            <p className="text-sm text-gray-600 mt-1">Select a category to view documents</p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="p-2">
              {tabsData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-900 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right Content Area - 70% */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h3 className="text-xl font-bold text-gray-900">
              {activeTabData?.label}
            </h3>
            <p className="text-gray-600 mt-2">
              {activeTabData?.documents.length} document(s) available
            </p>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="grid gap-4 max-w-4xl">
              {activeTabData?.documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleDocumentClick(doc)}
                  className={`bg-white rounded-lg border border-gray-200 p-4 transition-all duration-200 ${
                    doc.isClickable 
                      ? 'hover:border-blue-300 hover:shadow-md cursor-pointer transform hover:-translate-y-0.5' 
                      : 'hover:border-gray-300 hover:shadow-sm cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`flex-shrink-0 mt-0.5 ${
                        doc.isClickable ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold ${
                          doc.isClickable ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {doc.title}
                          {doc.isClickable && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              Interactive
                            </span>
                          )}
                        </h4>
                        {doc.description && (
                          <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span className="capitalize">{doc.type || 'document'}</span>
                          <span>•</span>
                          <span>Updated recently</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {!doc.isClickable && (
                        <Download className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentLibrary;