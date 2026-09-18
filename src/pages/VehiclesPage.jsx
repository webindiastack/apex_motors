import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw, X, Car, ArrowUpDown } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import VehicleSkeleton from '../components/VehicleSkeleton';
import { MAKES, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS } from '../data/vehicles';

export default function VehiclesPage({ vehicles = [], onViewDetails, onInquire, filters, setFilters, searchTerm, setSearchTerm, sortBy, setSortBy }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    triggerLoading();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSortBy('newest');
    setFilters({
      make: 'All Makes',
      bodyType: 'All Types',
      fuelType: 'All Fuels',
      transmission: 'All Transmissions',
      maxPrice: 150000,
      maxMileage: 100000
    });
    triggerLoading();
  };

  // Filter & Sort Logic against passed dynamic vehicles array
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Keyword search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesName = `${v.year} ${v.make} ${v.model}`.toLowerCase().includes(term);
        const matchesType = (v.bodyType || '').toLowerCase().includes(term);
        const matchesFuel = (v.fuelType || '').toLowerCase().includes(term);
        if (!matchesName && !matchesType && !matchesFuel) return false;
      }

      // Make
      if (filters.make !== 'All Makes' && v.make !== filters.make) return false;
      // Body Type
      if (filters.bodyType !== 'All Types' && v.bodyType !== filters.bodyType) return false;
      // Fuel Type
      if (filters.fuelType !== 'All Fuels' && v.fuelType !== filters.fuelType) return false;
      // Transmission
      if (filters.transmission !== 'All Transmissions' && v.transmission !== filters.transmission) return false;
      // Price
      if (filters.maxPrice && v.price > filters.maxPrice) return false;
      // Mileage
      if (filters.maxMileage && v.mileage > filters.maxMileage) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'mileage') return a.mileage - b.mileage;
      if (sortBy === 'newest') return b.year - a.year;
      return 0;
    });
  }, [vehicles, searchTerm, filters, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.make !== 'All Makes') count++;
    if (filters.bodyType !== 'All Types') count++;
    if (filters.fuelType !== 'All Fuels') count++;
    if (filters.transmission !== 'All Transmissions') count++;
    if (filters.maxPrice < 150000) count++;
    if (filters.maxMileage < 100000) count++;
    if (searchTerm) count++;
    return count;
  }, [filters, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Explore Our Vehicles
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Showing <span className="font-bold text-slate-900">{filteredVehicles.length}</span> certified vehicles matching your criteria
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 inline-flex items-center justify-center space-x-2 bg-slate-900 text-white font-bold py-3 rounded-xl text-xs"
          >
            <Filter className="w-4 h-4" />
            <span>Filters ({activeFilterCount})</span>
          </button>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2 font-heading font-bold text-slate-900 text-base">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              <span>Filter Inventory</span>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-brand-600 hover:text-brand-700 font-bold flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Make Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Make</label>
            <select
              value={filters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-brand-500"
            >
              {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Body Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Body Type</label>
            <select
              value={filters.bodyType}
              onChange={(e) => handleFilterChange('bodyType', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-brand-500"
            >
              {BODY_TYPES.map(bt => <option key={bt} value={bt}>{bt}</option>)}
            </select>
          </div>

          {/* Fuel Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Fuel Type</label>
            <select
              value={filters.fuelType}
              onChange={(e) => handleFilterChange('fuelType', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-brand-500"
            >
              {FUEL_TYPES.map(ft => <option key={ft} value={ft}>{ft}</option>)}
            </select>
          </div>

          {/* Transmission */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Transmission</label>
            <select
              value={filters.transmission}
              onChange={(e) => handleFilterChange('transmission', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-brand-500"
            >
              {TRANSMISSIONS.map(tr => <option key={tr} value={tr}>{tr}</option>)}
            </select>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider">Max Price</span>
              <span className="font-mono font-bold text-brand-600">${filters.maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="20000"
              max="150000"
              step="5000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          {/* Max Mileage Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider">Max Mileage</span>
              <span className="font-mono font-bold text-brand-600">{filters.maxMileage.toLocaleString()} mi</span>
            </div>
            <input
              type="range"
              min="5000"
              max="100000"
              step="5000"
              value={filters.maxMileage}
              onChange={(e) => handleFilterChange('maxMileage', Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>

        </aside>

        {/* RIGHT CONTENT COLUMN */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Bar: Primary Search Input & Sort Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Primary Search Input */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); triggerLoading(); }}
                placeholder="Search by make, model, or fuel..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap flex items-center space-x-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort By:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); triggerLoading(); }}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-brand-500"
              >
                <option value="newest">Newest Year</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="mileage">Lowest Mileage</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Active Filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center space-x-1 bg-brand-50 text-brand-700 text-xs px-2.5 py-1 rounded-lg border border-brand-200">
                  <span>Search: "{searchTerm}"</span>
                  <button onClick={() => { setSearchTerm(''); triggerLoading(); }}><X className="w-3 h-3 ml-1" /></button>
                </span>
              )}
              {filters.make !== 'All Makes' && (
                <span className="inline-flex items-center space-x-1 bg-brand-50 text-brand-700 text-xs px-2.5 py-1 rounded-lg border border-brand-200">
                  <span>Make: {filters.make}</span>
                  <button onClick={() => handleFilterChange('make', 'All Makes')}><X className="w-3 h-3 ml-1" /></button>
                </span>
              )}
              {filters.bodyType !== 'All Types' && (
                <span className="inline-flex items-center space-x-1 bg-brand-50 text-brand-700 text-xs px-2.5 py-1 rounded-lg border border-brand-200">
                  <span>Type: {filters.bodyType}</span>
                  <button onClick={() => handleFilterChange('bodyType', 'All Types')}><X className="w-3 h-3 ml-1" /></button>
                </span>
              )}
              {filters.fuelType !== 'All Fuels' && (
                <span className="inline-flex items-center space-x-1 bg-brand-50 text-brand-700 text-xs px-2.5 py-1 rounded-lg border border-brand-200">
                  <span>Fuel: {filters.fuelType}</span>
                  <button onClick={() => handleFilterChange('fuelType', 'All Fuels')}><X className="w-3 h-3 ml-1" /></button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-500 hover:text-slate-800 underline ml-2 font-medium"
              >
                Clear All
              </button>
            </div>
          )}

          {/* VEHICLE GRID & STATES */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <VehicleSkeleton key={i} />)}
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
                <Car className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-slate-800 mb-1">
                  No Vehicles Found Matching Your Criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting your price range, fuel type, or make filters to expand your search.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all inline-flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onViewDetails={onViewDetails}
                  onInquire={onInquire}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col p-6 space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-heading font-bold text-lg text-slate-900">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {/* Mobile Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Make</label>
                  <select
                    value={filters.make}
                    onChange={(e) => handleFilterChange('make', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                  >
                    {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Body Type</label>
                  <select
                    value={filters.bodyType}
                    onChange={(e) => handleFilterChange('bodyType', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                  >
                    {BODY_TYPES.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fuel Type</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                  >
                    {FUEL_TYPES.map(ft => <option key={ft} value={ft}>{ft}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Transmission</label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => handleFilterChange('transmission', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                  >
                    {TRANSMISSIONS.map(tr => <option key={tr} value={tr}>{tr}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl text-xs"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 bg-brand-600 text-white font-bold py-3 rounded-xl text-xs"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
