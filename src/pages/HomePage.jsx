import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, Award, ThumbsUp, Users, Car, Sliders, Star, CheckCircle, Flame, Sparkles } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import { MAKES, BODY_TYPES, FUEL_TYPES } from '../data/vehicles';

export default function HomePage({ vehicles, onViewDetails, onInquire, setActivePage, setFilters }) {
  // Quick hero filter state
  const [selectedMake, setSelectedMake] = useState('All Makes');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedFuel, setSelectedFuel] = useState('All Fuels');

  // Featured tab state
  const [featuredTab, setFeaturedTab] = useState('All');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      make: selectedMake,
      bodyType: selectedType,
      fuelType: selectedFuel
    }));
    setActivePage('vehicles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredFeatured = vehicles.filter(v => {
    if (featuredTab === 'All') return true;
    if (featuredTab === 'Luxury Sedans') return v.bodyType === 'Sedan';
    if (featuredTab === 'Performance SUVs') return v.bodyType === 'SUV';
    if (featuredTab === 'Electric & Hybrid') return v.fuelType === 'Electric' || v.fuelType === 'Hybrid';
    return true;
  }).slice(0, 6);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 text-white min-h-[85vh] flex items-center pt-8 pb-16 overflow-hidden">
        {/* Background Image with Ambient Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85" 
            alt="Luxury Sportscar Hero" 
            className="w-full h-full object-cover object-center opacity-40 transform scale-105 animate-pulse-subtle"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 animate-slide-up">
              <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-brand-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span className="text-xs font-semibold text-brand-300 tracking-wide uppercase">
                  Apex Motors 2026 Fleet Collection
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-400 to-cyan-300">Perfect Vehicle</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                Browse hand-inspected luxury sedans, sports coupes, rugged 4x4 SUVs, and next-generation EVs. Backed by nationwide 150-point certified warranties.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => { setActivePage('vehicles'); window.scrollTo(0,0); }}
                  className="bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white font-bold px-7 py-4 rounded-2xl shadow-glow-blue transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base"
                >
                  <span>Browse Full Inventory</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { setActivePage('contact'); window.scrollTo(0,0); }}
                  className="bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-6 py-4 rounded-2xl backdrop-blur-md transition-all text-sm sm:text-base"
                >
                  Visit Showroom
                </button>
              </div>
            </div>

            {/* Quick Filter Box */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2 text-white font-heading font-bold text-lg">
                    <Sliders className="w-5 h-5 text-brand-400" />
                    <span>Quick Vehicle Search</span>
                  </div>
                  <span className="text-xs text-brand-400 font-medium">{vehicles.length} Models Available</span>
                </div>

                <form onSubmit={handleHeroSearch} className="space-y-4">
                  {/* Make */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Select Make
                    </label>
                    <select
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                    >
                      {MAKES.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Body Type */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Body Type
                      </label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                      >
                        {BODY_TYPES.map(bt => (
                          <option key={bt} value={bt}>{bt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Fuel Type */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Fuel Type
                      </label>
                      <select
                        value={selectedFuel}
                        onChange={(e) => setSelectedFuel(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                      >
                        {FUEL_TYPES.map(ft => (
                          <option key={ft} value={ft}>{ft}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center space-x-2 text-sm"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Matching Vehicles</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ASSURANCE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-sm">150-Point Inspection</h4>
              <p className="text-xs text-slate-500 mt-0.5">Rigorous mechanical certification</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-sm">Clean History Guaranteed</h4>
              <p className="text-xs text-slate-500 mt-0.5">Verified CARFAX & AutoCheck reports</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-sm">Comprehensive Warranty</h4>
              <p className="text-xs text-slate-500 mt-0.5">Included on all certified vehicles</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-sm">Transparent Pricing</h4>
              <p className="text-xs text-slate-500 mt-0.5">Zero hidden administrative fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VEHICLES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-brand-600" />
              <span>Handpicked Vehicles</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Featured Showroom Arrivals
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {['All', 'Luxury Sedans', 'Performance SUVs', 'Electric & Hybrid'].map(tab => (
              <button
                key={tab}
                onClick={() => setFeaturedTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  featuredTab === tab 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFeatured.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onViewDetails={onViewDetails}
              onInquire={onInquire}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => { setActivePage('vehicles'); window.scrollTo(0,0); }}
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-brand-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-all duration-300 shadow-md text-sm"
          >
            <span>Explore All {vehicles.length} Vehicles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="bg-slate-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
              The Apex Difference
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Why Discerning Drivers Choose Us
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              We combine transparent pricing, pristine vehicles, and white-glove customer support to deliver an exceptional car buying experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 border border-slate-700/60 p-8 rounded-3xl space-y-4 hover:border-brand-500/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center">
                <Car className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">Curated Luxury Inventory</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every vehicle in our collection undergoes strict cosmetic and mechanical verification before entering our showroom.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 p-8 rounded-3xl space-y-4 hover:border-brand-500/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">No-Haggle Fair Pricing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transparent market-aligned pricing with zero hidden dealer fees or unexpected add-ons at paperwork signing.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 p-8 rounded-3xl space-y-4 hover:border-brand-500/50 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">Dedicated Vehicle Specialist</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Work 1-on-1 with a knowledgeable product specialist focused on matching your exact lifestyle needs rather than high-pressure sales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-700 rounded-3xl p-5 sm:p-8 lg:p-10 text-white shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center">
            
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center space-y-1 hover:bg-white/20 transition-all duration-300">
              <div className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">150+</div>
              <div className="text-[10px] sm:text-xs font-bold text-blue-100 uppercase tracking-wider">Vehicles Available</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center space-y-1 hover:bg-white/20 transition-all duration-300">
              <div className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">2,400+</div>
              <div className="text-[10px] sm:text-xs font-bold text-blue-100 uppercase tracking-wider">Vehicles Sold</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center space-y-1 hover:bg-white/20 transition-all duration-300">
              <div className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">99.4%</div>
              <div className="text-[10px] sm:text-xs font-bold text-blue-100 uppercase tracking-wider">Happy Customers</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center space-y-1 hover:bg-white/20 transition-all duration-300">
              <div className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">18 Yrs</div>
              <div className="text-[10px] sm:text-xs font-bold text-blue-100 uppercase tracking-wider">Showroom Legacy</div>
            </div>

          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
            Client Testimonials
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            What Our Buyers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "Buying my BMW 3 Series from Apex Motors was seamless. No pressure, completely transparent inspection reports, and they delivered the vehicle right to my home!"
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Sarah J." className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm">Sarah Jenkins</h4>
                <p className="text-xs text-slate-400">BMW 3 Series Buyer</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "Outstanding service! I purchased my Porsche 911 through their digital portal and received a flawless vehicle with full documentation within 24 hours."
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Marcus V." className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm">Marcus Vance</h4>
                <p className="text-xs text-slate-400">Porsche 911 Owner</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "The inquiry and test drive process was exceptionally professional. Their EV specialist walked me through every detail of the Tesla Model Y."
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Elena R." className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm">Elena Rostova</h4>
                <p className="text-xs text-slate-400">Tesla Model Y Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
