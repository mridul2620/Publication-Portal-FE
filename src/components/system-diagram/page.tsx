import React, { useState, useEffect, useRef } from 'react';
import { LogOut, ChevronLeft, ChevronRight, X, Search, FileText, Package, AlertCircle, Zap } from 'lucide-react';

interface CategoryData {
  id: string;
  label: string;
  image: string;
  icon: string;
  hasSvg?: boolean;
}

interface SubCategory {
  id: string;
  label: string;
  icon: string;
  fileType: 'image' | 'json' | 'pdf' | 'none';
  fileName: string;
}

interface Hotspot {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

interface CatalogData {
  [key: string]: {
    [section: string]: any[];
  };
}

interface DTCData {
  [key: string]: {
    DTCs: Array<{
      code: string;
      name: string;
      description: string;
      possibleCauses: string[];
    }>;
  };
}

const ConnectorReferencePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('body-harness');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [activeSubCategory, setActiveSubCategory] = useState<string>('');
  const [isSubTransitioning, setIsSubTransitioning] = useState(false);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [contentData, setContentData] = useState<any>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [globalSearchResults, setGlobalSearchResults] = useState<any[]>([]);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const categoriesData: CategoryData[] = [
    { id: 'body-harness', label: 'Body Harness', image: '/body-harness.jpg', icon: '🔌', hasSvg: false },
    { id: 'body', label: 'Body', image: '/body.jpg', icon: '🚗', hasSvg: false },
    { id: 'cabin-harness', label: 'Cabin Harness', image: '/cabin-harness.svg', icon: '🎛️', hasSvg: true },
    { id: 'brakes', label: 'Brakes', image: '/Brakes.svg', icon: '🛑', hasSvg: true },
    { id: 'climate-control', label: 'Climate Control', image: '/engine-climate-control.svg', icon: '❄️', hasSvg: true },
    { id: 'engine-parts', label: 'Engine Parts', image: '/engine-parts.svg', icon: '⚙️', hasSvg: true },
    { id: 'engine-sensors', label: 'Engine Sensors', image: '/engine-sensors.svg', icon: '📡', hasSvg: true },
    { id: 'fuel-system', label: 'Fuel System', image: '/fuel-system.svg', icon: '⛽', hasSvg: true },
    { id: 'transmission-system', label: 'Transmission System', image: '/transmission-system.svg', icon: '🔧', hasSvg: true },
  ];

  const getSubCategories = (categoryId: string): SubCategory[] => {
    const folderName = categoryId === 'brakes' ? 'Brakes' : categoryId;
    
    return [
      { id: 'components', label: 'Components', icon: '🔩', fileType: 'image', fileName: `/${folderName}/components.jpg` },
      { id: 'workshop-manual', label: 'Workshop Manual', icon: '📖', fileType: 'pdf', fileName: `/${folderName}/workshopmanual.pdf` },
      { id: 'schematics', label: 'Schematics', icon: '📐', fileType: 'none', fileName: '' },
      { id: 'd-and-o', label: 'D&O', icon: '📋', fileType: 'json', fileName: `/${folderName}/d&o.json` },
      { id: 'wiring-harness', label: 'Wiring Harness', icon: '🔌', fileType: 'image', fileName: `/${folderName}/wiringharness.jpg` },
      { id: 'parts-catalog', label: 'Parts Catalog', icon: '📦', fileType: 'json', fileName: `/${folderName}/catalog.json` },
    ];
  };

  const subCategories = getSubCategories(activeCategory);
  const activeCategoryData = categoriesData.find(cat => cat.id === activeCategory);
  const activeSubCategoryData = subCategories.find(sub => sub.id === activeSubCategory);

  // Convert camelCase to Title Case with spaces
  const camelToTitle = (str: string): string => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Extract hotspots from SVG
  useEffect(() => {
    if (activeCategoryData?.hasSvg && !showSubCategories) {
      extractHotspotsFromSvg(activeCategoryData.image);
    } else {
      setHotspots([]);
    }
  }, [activeCategory, activeCategoryData, showSubCategories]);

  // Load content when sub-category changes
  useEffect(() => {
    if (showSubCategories && activeSubCategoryData) {
      loadSubCategoryContent(activeSubCategoryData);
    }
  }, [activeSubCategory, showSubCategories]);

  const extractHotspotsFromSvg = async (svgPath: string) => {
    try {
      const response = await fetch(svgPath);
      const svgText = await response.text();
      
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      const svgElement = svgDoc.querySelector('svg');
      
      if (!svgElement) return;

      const viewBox = svgElement.getAttribute('viewBox');
      let svgWidth = 0, svgHeight = 0;
      
      if (viewBox) {
        const [, , width, height] = viewBox.split(' ').map(Number);
        svgWidth = width;
        svgHeight = height;
      } else {
        svgWidth = parseFloat(svgElement.getAttribute('width') || '800');
        svgHeight = parseFloat(svgElement.getAttribute('height') || '600');
      }
      
      setSvgDimensions({ width: svgWidth, height: svgHeight });

      const images = svgDoc.querySelectorAll('image[transform]');
      const extractedHotspots: Hotspot[] = [];

      images.forEach((img, index) => {
        const transform = img.getAttribute('transform');
        const width = parseFloat(img.getAttribute('width') || '100');
        const height = parseFloat(img.getAttribute('height') || '100');

        if (transform) {
          const translateMatch = transform.match(/translate\s*\(\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s*\)/);
          
          if (translateMatch) {
            const x = parseFloat(translateMatch[1]);
            const y = parseFloat(translateMatch[2]);
            
            extractedHotspots.push({
              x, y, width, height,
              id: `hotspot-${index}`
            });
          }
        }
      });

      setHotspots(extractedHotspots);
    } catch (error) {
      console.error('Error extracting hotspots:', error);
    }
  };

  const loadSubCategoryContent = async (subCategory: SubCategory) => {
    if (subCategory.fileType === 'none') {
      setContentData(null);
      return;
    }

    setIsLoadingContent(true);
    
    try {
      if (subCategory.fileType === 'json') {
        const response = await fetch(subCategory.fileName);
        const data = await response.json();
        setContentData(data);
      } else if (subCategory.fileType === 'image' || subCategory.fileType === 'pdf') {
        setContentData({ url: subCategory.fileName, type: subCategory.fileType });
      }
    } catch (error) {
      console.error('Error loading content:', error);
      setContentData(null);
    } finally {
      setIsLoadingContent(false);
    }
  };

  const handleHotspotClick = (hotspotId: string) => {
    setTimeout(() => {
      setShowSubCategories(true);
      setActiveSubCategory('components');
    }, 300);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory || isTransitioning) return;
    
    setIsTransitioning(true);
    setShowSubCategories(false);
    setActiveSubCategory('');
    setContentData(null);
    setSearchTerm('');
    setActiveCategory(categoryId);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const handleSubCategoryChange = (subCategoryId: string) => {
    if (subCategoryId === activeSubCategory || isSubTransitioning) return;
    
    setIsSubTransitioning(true);
    setSearchTerm('');
    setShowGlobalSearch(false);
    setActiveSubCategory(subCategoryId);
    
    setTimeout(() => {
      setIsSubTransitioning(false);
    }, 400);
  };

  // Global search across all sub-categories
  const performGlobalSearch = async (query: string) => {
    if (!query.trim()) {
      setGlobalSearchResults([]);
      return;
    }

    const results: any[] = [];
    const folderName = activeCategory === 'brakes' ? 'Brakes' : activeCategory;
    const lowerQuery = query.toLowerCase();

    // Search in Parts Catalog
    try {
      const catalogResponse = await fetch(`/${folderName}/catalog.json`);
      const catalogData: CatalogData = await catalogResponse.json();
      const systemKey = Object.keys(catalogData)[0];
      const sections = catalogData[systemKey] || {};

      Object.entries(sections).forEach(([sectionName, items]) => {
        if (Array.isArray(items)) {
          items.forEach(item => {
            if (
              item.partNumber?.toLowerCase().includes(lowerQuery) ||
              item.name?.toLowerCase().includes(lowerQuery) ||
              item.description?.toLowerCase().includes(lowerQuery) ||
              item.material?.toLowerCase().includes(lowerQuery)
            ) {
              results.push({
                type: 'Parts Catalog',
                subCategory: 'parts-catalog',
                title: item.name,
                subtitle: item.partNumber,
                description: item.description,
                icon: '📦'
              });
            }
          });
        } else if (typeof items === 'object') {
          Object.entries(items).forEach(([subSection, subItems]: [string, any]) => {
            if (Array.isArray(subItems)) {
              subItems.forEach(item => {
                if (
                  item.partNumber?.toLowerCase().includes(lowerQuery) ||
                  item.name?.toLowerCase().includes(lowerQuery) ||
                  item.description?.toLowerCase().includes(lowerQuery) ||
                  item.material?.toLowerCase().includes(lowerQuery)
                ) {
                  results.push({
                    type: 'Parts Catalog',
                    subCategory: 'parts-catalog',
                    title: item.name,
                    subtitle: item.partNumber,
                    description: item.description,
                    icon: '📦'
                  });
                }
              });
            }
          });
        }
      });
    } catch (error) {
      console.error('Error searching catalog:', error);
    }

    // Search in D&O
    try {
      const dtcResponse = await fetch(`/${folderName}/d&o.json`);
      const dtcData: DTCData = await dtcResponse.json();
      const systemKey = Object.keys(dtcData)[0];
      const dtcs = dtcData[systemKey]?.DTCs || [];

      dtcs.forEach(dtc => {
        if (
          dtc.code.toLowerCase().includes(lowerQuery) ||
          dtc.name.toLowerCase().includes(lowerQuery) ||
          dtc.description.toLowerCase().includes(lowerQuery) ||
          dtc.possibleCauses.some(cause => cause.toLowerCase().includes(lowerQuery))
        ) {
          results.push({
            type: 'D&O',
            subCategory: 'd-and-o',
            title: dtc.name,
            subtitle: dtc.code,
            description: dtc.description,
            icon: '📋'
          });
        }
      });
    } catch (error) {
      console.error('Error searching D&O:', error);
    }

    // Add other sub-categories as searchable items
    const otherCategories = [
      { id: 'components', label: 'Components', icon: '🔩' },
      { id: 'workshop-manual', label: 'Workshop Manual', icon: '📖' },
      { id: 'wiring-harness', label: 'Wiring Harness', icon: '🔌' },
      { id: 'schematics', label: 'Schematics', icon: '📐' }
    ];

    otherCategories.forEach(cat => {
      if (cat.label.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'Section',
          subCategory: cat.id,
          title: cat.label,
          subtitle: activeCategoryData?.label || '',
          description: `View ${cat.label.toLowerCase()} information`,
          icon: cat.icon
        });
      }
    });

    setGlobalSearchResults(results);
  };

  const handleBackToMain = () => {
    setShowSubCategories(false);
    setActiveSubCategory('');
    setContentData(null);
    setSearchTerm('');
    setGlobalSearchTerm('');
    setGlobalSearchResults([]);
    setShowGlobalSearch(false);
  };

  const navigateCarousel = (direction: 'prev' | 'next') => {
    if (isTransitioning || isSubTransitioning) return;
    
    const currentData = showSubCategories ? subCategories : categoriesData;
    const currentActive = showSubCategories ? activeSubCategory : activeCategory;
    const currentIndex = currentData.findIndex(cat => cat.id === currentActive);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex === currentData.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? currentData.length - 1 : currentIndex - 1;
    }
    
    if (showSubCategories) {
      handleSubCategoryChange(currentData[newIndex].id);
    } else {
      handleCategoryChange(currentData[newIndex].id);
    }
  };

  const activeIndex = showSubCategories 
    ? subCategories.findIndex(sub => sub.id === activeSubCategory)
    : categoriesData.findIndex(cat => cat.id === activeCategory);

  const getCarouselItems = () => {
    const currentData = showSubCategories ? subCategories : categoriesData;
    const items = [];
    for (let i = -2; i <= 2; i++) {
      let index = activeIndex + i;
      if (index < 0) index = currentData.length + index;
      if (index >= currentData.length) index = index - currentData.length;
      items.push({ ...currentData[index], position: i });
    }
    return items;
  };

  const renderMainImage = () => {
    if (!activeCategoryData) return null;

    if (activeCategoryData.hasSvg) {
      return (
        <div className="flex items-center justify-center">
          <div ref={svgContainerRef} className="relative inline-block">
            <img 
              src={activeCategoryData.image} 
              alt={activeCategoryData.label}
              className="max-w-full h-auto object-contain block"
              style={{ 
                maxHeight: 'calc(100vh - 380px)',
                minHeight: '400px'
              }}
            />
            
            {svgContainerRef.current && hotspots.length > 0 && hotspots.map((hotspot) => {
              const container = svgContainerRef.current;
              if (!container) return null;
              
              const imgElement = container.querySelector('img');
              if (!imgElement || svgDimensions.width === 0) return null;
              
              const scaleX = imgElement.clientWidth / svgDimensions.width;
              const scaleY = imgElement.clientHeight / svgDimensions.height;
              
              const scaledX = hotspot.x * scaleX;
              const scaledY = hotspot.y * scaleY;
              const scaledWidth = hotspot.width * scaleX;
              const scaledHeight = hotspot.height * scaleY;
              
              const isHovered = hoveredHotspot === hotspot.id;

              return (
                <div
                  key={hotspot.id}
                  onClick={() => handleHotspotClick(hotspot.id)}
                  onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    left: `${scaledX}px`,
                    top: `${scaledY}px`,
                    width: `${scaledWidth}px`,
                    height: `${scaledHeight}px`,
                    border: isHovered ? '3px solid rgba(6, 182, 212, 0.9)' : '2px solid rgba(6, 182, 212, 0.3)',
                    backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.05)',
                    boxShadow: isHovered ? '0 0 25px rgba(6, 182, 212, 0.7)' : 'none',
                    borderRadius: '8px',
                    zIndex: isHovered ? 20 : 10
                  }}
                >
                  {isHovered && (
                    <>
                      <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg animate-ping opacity-75" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white shadow-lg" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center">
        <img 
          src={activeCategoryData.image} 
          alt={activeCategoryData.label}
          className="max-w-full h-auto object-contain"
          style={{ maxHeight: 'calc(100vh - 380px)' }}
        />
      </div>
    );
  };

  const renderSubCategoryContent = () => {
    if (isLoadingContent) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading content...</p>
          </div>
        </div>
      );
    }

    if (!contentData && activeSubCategoryData?.fileType !== 'none') {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center p-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border-2 border-dashed border-red-300">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Content Not Found</h3>
            <p className="text-slate-600">Unable to load {activeSubCategoryData?.label}</p>
          </div>
        </div>
      );
    }

    // Image content
    if (contentData?.type === 'image') {
      return (
        <div className="flex items-center justify-center">
          <img 
            src={contentData.url} 
            alt={activeSubCategoryData?.label}
            className="max-w-full h-auto object-contain"
            style={{ maxHeight: 'calc(100vh - 240px)' }}
          />
        </div>
      );
    }

    // PDF content
    if (contentData?.type === 'pdf') {
      return (
        <div className="flex items-center justify-center">
          <div className="w-full max-w-6xl bg-white overflow-hidden">
            <iframe
              src={contentData.url}
              className="w-full border-0"
              style={{ height: 'calc(100vh - 240px)', minHeight: '600px' }}
              title={activeSubCategoryData?.label}
            />
          </div>
        </div>
      );
    }

    // D&O JSON content
    if (activeSubCategoryData?.id === 'd-and-o' && contentData) {
      const dtcData = contentData as DTCData;
      const systemKey = Object.keys(dtcData)[0];
      const dtcs = dtcData[systemKey]?.DTCs || [];

      const filteredDTCs = dtcs.filter(dtc => 
        searchTerm === '' ||
        dtc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dtc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dtc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <div className="p-6 max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search diagnostic codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* DTC Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDTCs.map((dtc, index) => (
              <div 
                key={dtc.code}
                className="bg-white rounded-xl border-2 border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all duration-300 p-5"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                        {dtc.code}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">{dtc.name}</h3>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-4">{dtc.description}</p>
                
                <div>
                  <h4 className="font-semibold text-slate-700 text-sm mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-500" />
                    Possible Causes
                  </h4>
                  <ul className="space-y-1">
                    {dtc.possibleCauses.map((cause, idx) => (
                      <li key={idx} className="text-slate-600 text-sm flex items-start gap-2">
                        <span className="text-cyan-500 mt-1">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {filteredDTCs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No diagnostic codes found matching your search.</p>
            </div>
          )}
        </div>
      );
    }

    // Parts Catalog JSON content
    if (activeSubCategoryData?.id === 'parts-catalog' && contentData) {
      const catalogData = contentData as CatalogData;
      const systemKey = Object.keys(catalogData)[0];
      const sections = catalogData[systemKey] || {};

      const allParts: any[] = [];
      Object.entries(sections).forEach(([sectionName, items]) => {
        if (Array.isArray(items)) {
          items.forEach(item => allParts.push({ ...item, section: sectionName }));
        } else if (typeof items === 'object') {
          Object.entries(items).forEach(([subSection, subItems]: [string, any]) => {
            if (Array.isArray(subItems)) {
              subItems.forEach(item => allParts.push({ ...item, section: sectionName, subSection }));
            }
          });
        }
      });

      const filteredParts = allParts.filter(part =>
        searchTerm === '' ||
        part.partNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <div className="p-6 max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search parts by number, name, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Parts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParts.map((part, index) => (
              <div 
                key={part.partNumber || index}
                className="bg-white rounded-xl border-2 border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all duration-300 p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold">
                      {part.partNumber}
                    </span>
                    {part.subSection && (
                      <div className="mt-1">
                        <span className="text-xs text-slate-500">{camelToTitle(part.subSection)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="font-bold text-slate-800 text-lg mb-2">{part.name}</h3>
                <p className="text-slate-600 text-sm mb-3">{part.description}</p>
                
                {part.material && (
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-xs font-semibold text-slate-500">Material:</span>
                    <span className="text-xs text-slate-700 ml-2">{part.material}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredParts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No parts found matching your search.</p>
            </div>
          )}
        </div>
      );
    }

    // Schematics placeholder
    if (activeSubCategoryData?.id === 'schematics') {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center p-12 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl border-2 border-dashed border-slate-300">
            <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Schematics</h3>
            <p className="text-slate-600">Coming soon...</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative pb-32">
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="container mx-auto max-w-7xl">
            {/* Title */}
            <div className="mb-4">
              <div className={`transition-all duration-300 ease-out ${isTransitioning || isSubTransitioning ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
                <div className="flex items-center gap-3">
                  {showSubCategories && (
                    <button onClick={handleBackToMain} className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                      <X className="h-5 w-5 text-slate-600" />
                    </button>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                      {showSubCategories 
                        ? `${activeCategoryData?.label} - ${activeSubCategoryData?.label || 'Select a section'}`
                        : activeCategoryData?.label
                      }
                    </h2>
                    <p className="text-slate-600 text-xs mt-1">
                      {showSubCategories 
                        ? 'Detailed information and resources'
                        : activeCategoryData?.hasSvg 
                          ? `💡 Hover and click on highlighted components (${hotspots.length} interactive areas)`
                          : 'Connector reference diagram'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Display */}
            <div className={`transition-all duration-300 ease-out ${isTransitioning || isSubTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
              {!showSubCategories ? renderMainImage() : renderSubCategoryContent()}
            </div>
          </div>
        </div>

        {/* Bottom Carousel */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none flex items-center justify-center">
          <div className="relative flex items-center pointer-events-auto perspective-1000 gap-6">
            <button
              onClick={() => navigateCarousel('prev')}
              disabled={isTransitioning || isSubTransitioning}
              className="z-30 bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 border border-slate-200"
            >
              <ChevronLeft className="h-5 w-5 text-teal-700" />
            </button>

            {/* Carousel Items */}
            <div className="flex items-end justify-center pb-4 relative" style={{ width: '900px', height: '140px' }}>
              {getCarouselItems().map((item) => {
                const isActive = item.position === 0;
                const isAdjacent = Math.abs(item.position) === 1;
                
                let xOffset = 0;
                if (item.position === -2) xOffset = 0;
                else if (item.position === -1) xOffset = 140;
                else if (item.position === 0) xOffset = 320;
                else if (item.position === 1) xOffset = 500;
                else if (item.position === 2) xOffset = 640;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => showSubCategories ? handleSubCategoryChange(item.id) : handleCategoryChange(item.id)}
                    disabled={isTransitioning || isSubTransitioning}
                    className={`absolute transition-all duration-800 ease-in-out ${
                      isActive ? 'z-20' : isAdjacent ? 'z-10' : 'z-0'
                    } ${(isTransitioning || isSubTransitioning) ? 'pointer-events-none' : ''}`}
                    style={{
                      left: `${xOffset}px`,
                      transform: `scale(${isActive ? 1.05 : isAdjacent ? 0.92 : 0.82}) rotateY(${item.position * -8}deg)`,
                      opacity: isActive ? 1 : isAdjacent ? 0.85 : 0.5,
                    }}
                  >
                    <div className={`w-52 h-28 rounded-2xl overflow-hidden transition-all duration-800 backdrop-blur-sm ${
                      isActive 
                        ? 'bg-gradient-to-br from-cyan-500 to-teal-600 shadow-xl shadow-cyan-500/30' 
                        : 'bg-white/80 shadow-lg shadow-slate-300/50 border border-slate-200'
                    }`}>
                      <div className="relative h-full flex flex-col items-center justify-center p-3">
                        <div className={`text-4xl mb-2 transition-all duration-800 ${
                          isActive ? 'scale-110 drop-shadow-lg' : 'scale-100'
                        }`}>
                          {item.icon}
                        </div>
                        
                        <div className="text-center">
                          <h3 className={`font-bold text-xs leading-tight transition-colors duration-800 ${
                            isActive ? 'text-white' : 'text-slate-800'
                          }`}>
                            {item.label.toUpperCase()}
                          </h3>
                        </div>

                        {isActive && (
                          <div className="absolute top-2 right-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
                            <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-cyan-500 animate-gentleBounce drop-shadow-lg" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => navigateCarousel('next')}
              disabled={isTransitioning || isSubTransitioning}
              className="z-30 bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 border border-slate-200"
            >
              <ChevronRight className="h-5 w-5 text-teal-700" />
            </button>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes gentleBounce {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-8px) translateX(-50%);
          }
        }

        .animate-gentleBounce {
          animation: gentleBounce 2s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default ConnectorReferencePage;