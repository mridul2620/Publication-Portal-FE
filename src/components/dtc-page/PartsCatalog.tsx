import React, { useState, useEffect } from 'react';
import { X, Search, Package } from 'lucide-react';

interface Part {
  partNumber: string;
  name: string;
  description: string;
  material: string;
}

interface CatalogEntry {
  dtcCode: string;
  parts: Part[];
}

interface PartsCatalogPageProps {
  dtcCode: string;
  onClose: () => void;
}

const PartsCatalogPage: React.FC<PartsCatalogPageProps> = ({ dtcCode, onClose }) => {
  const [catalogData, setCatalogData] = useState<CatalogEntry | null>(null);
  const [filteredParts, setFilteredParts] = useState<Part[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatalogData();
  }, [dtcCode]);

  useEffect(() => {
    filterParts();
  }, [searchTerm, catalogData]);

  const fetchCatalogData = async () => {
    try {
      const response = await fetch('/catalog.json');
      const data: CatalogEntry[] = await response.json();
      
      // Find the catalog entry for this DTC code
      const entry = data.find(item => item.dtcCode === dtcCode);
      
      if (entry) {
        setCatalogData(entry);
        setFilteredParts(entry.parts);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching catalog data:', error);
      setLoading(false);
    }
  };

  const filterParts = () => {
    if (!catalogData) return;
    
    if (!searchTerm.trim()) {
      setFilteredParts(catalogData.parts);
      return;
    }

    const filtered = catalogData.parts.filter(part =>
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredParts(filtered);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
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
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section with Close Button */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-200 transition-colors duration-200 group"
                aria-label="Go back"
              >
                <X className="h-6 w-6 text-slate-600 group-hover:text-slate-900" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Parts Catalogue
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Detailed information and resources for {dtcCode}
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search parts by number, name, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Results Count */}
        {!loading && catalogData && (
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-slate-600 font-medium">
              Showing {filteredParts.length} of {catalogData.parts.length} parts
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

        {/* Parts Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : !catalogData ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-slate-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Package className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-500 text-lg font-medium">No parts catalog found for this DTC code.</p>
            <p className="text-slate-400 text-sm mt-2">Code: {dtcCode}</p>
          </div>
        ) : filteredParts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-slate-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-500 text-lg font-medium">No parts found matching your search.</p>
            <p className="text-slate-400 text-sm mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParts.map((part, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden group"
              >
                {/* Card Header with Icon */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-blue-100 uppercase tracking-wider">
                        {part.partNumber}
                      </p>
                      <h3 className="text-lg font-bold text-white line-clamp-1">
                        {part.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="mb-4">
                    <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
                      {part.description}
                    </p>
                  </div>

                  {/* Material Badge */}
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-slate-500 mt-1">Material:</span>
                    <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full leading-relaxed flex-1">
                      {part.material}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-4">
                  <div className="h-px bg-slate-200 mb-3"></div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Part #{index + 1}</span>
                    <span className="text-blue-600 font-medium">In Stock</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartsCatalogPage;