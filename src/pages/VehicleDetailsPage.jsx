import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Share2, Calendar, Gauge, Fuel, Sliders, ShieldCheck, Check, MapPin, Phone, Mail, Clock, ChevronRight, Award, Zap, Sparkles, Maximize2, X } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import VehicleCard from '../components/VehicleCard';

export default function VehicleDetailsPage({ vehicle, vehicles, onBack, onInquire, onViewDetails }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Lock body scroll when fullscreen image lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  if (!vehicle) return null;

  const fav = isFavorite(vehicle.id);

  const handleFavoriteClick = () => {
    toggleFavorite(vehicle.id);
    if (!fav) {
      addToast(`Added ${vehicle.make} ${vehicle.model} to favorites!`, 'success');
    } else {
      addToast(`Removed ${vehicle.make} ${vehicle.model} from favorites`, 'info');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Vehicle link copied to clipboard!', 'success');
    } else {
      addToast('Share URL ready', 'info');
    }
  };

  // Find similar vehicles from current vehicles list
  const similarVehicles = (vehicles || [])
    .filter(v => v.id !== vehicle.id && (v.make === vehicle.make || v.bodyType === vehicle.bodyType))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24 lg:pb-16 animate-fade-in">
      
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Vehicles</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
            title="Share Vehicle"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleFavoriteClick}
            className={`p-2.5 rounded-xl border transition-colors shadow-sm ${
              fav ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title="Save Vehicle"
          >
            <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Details Grid: Left Column (Gallery + Specs + Description + Features) / Right Column (Inquire & Price Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN (7 Cols on desktop): Gallery, Key Specs, Description & Features */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* GALLERY CONTAINER */}
          <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-lg relative border border-slate-800">
            <div className="relative h-[320px] sm:h-[440px] w-full bg-slate-900">
              <img
                src={vehicle.images[selectedImageIndex] || vehicle.images[0]}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              />

              {/* Lightbox Zoom Trigger */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-xl backdrop-blur-md transition-colors"
                title="View Fullscreen Lightbox"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Badge */}
              {vehicle.badge && (
                <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider bg-brand-600 text-white px-3.5 py-1.5 rounded-full shadow-md">
                  {vehicle.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Navigator */}
            {vehicle.images.length > 1 && (
              <div className="p-3 bg-slate-900 flex space-x-3 overflow-x-auto no-scrollbar">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-brand-500 scale-105 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specs Overview Matrix */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-brand-600" />
              <span>Key Specifications Matrix</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Engine</span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5">{vehicle.engine || 'N/A'}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Horsepower</span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5">{vehicle.horsepower || 'N/A'}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Drivetrain</span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5">{vehicle.drivetrain || 'N/A'}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Exterior Color</span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5">{vehicle.exteriorColor || 'N/A'}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Interior Color</span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5">{vehicle.interiorColor || 'N/A'}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">VIN Number</span>
                <span className="text-xs font-mono font-bold text-slate-900 block mt-0.5 truncate">{vehicle.vin || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-heading font-bold text-lg text-slate-900">Vehicle Description & Overview</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          {/* Features List */}
          {vehicle.features && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-heading font-bold text-lg text-slate-900">Installed Features & Options</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicle.features.safety && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-brand-600 uppercase tracking-wider">Safety & Assistance</h4>
                    <ul className="space-y-1.5">
                      {vehicle.features.safety.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {vehicle.features.comfort && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-brand-600 uppercase tracking-wider">Luxury & Comfort</h4>
                    <ul className="space-y-1.5">
                      {vehicle.features.comfort.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {vehicle.features.technology && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-brand-600 uppercase tracking-wider">Technology & Audio</h4>
                    <ul className="space-y-1.5">
                      {vehicle.features.technology.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {vehicle.features.performance && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-brand-600 uppercase tracking-wider">Performance & Styling</h4>
                    <ul className="space-y-1.5">
                      {vehicle.features.performance.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN (5 Cols on desktop, Sticky): Inquire & Price Card */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            
            {/* Title & Price Header */}
            <div className="border-b border-slate-100 pb-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>{vehicle.make}</span>
                <span>Stock #: {vehicle.stockNumber}</span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-snug">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              
              <div className="pt-2 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Listed Showroom Price</span>
                  <span className="font-heading font-black text-3xl sm:text-4xl text-brand-600">
                    ${vehicle.price.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  Est. ${(Math.round(vehicle.price / 60)).toLocaleString()}/mo
                </span>
              </div>
            </div>

            {/* Quick Specs Summary Strip */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Calendar className="w-4 h-4 text-brand-600" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Year</span>
                  <span className="font-bold text-slate-900">{vehicle.year}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Gauge className="w-4 h-4 text-brand-600" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Mileage</span>
                  <span className="font-bold text-slate-900">{vehicle.mileage.toLocaleString()} mi</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Fuel className="w-4 h-4 text-brand-600" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Fuel Type</span>
                  <span className="font-bold text-slate-900">{vehicle.fuelType}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Sliders className="w-4 h-4 text-brand-600" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Transmission</span>
                  <span className="font-bold text-slate-900">{vehicle.transmission}</span>
                </div>
              </div>
            </div>

            {/* Inquire CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => onInquire(vehicle)}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-2xl transition-all shadow-glow-blue flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <span>Inquire Now</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dealership Info Card */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Vehicle Location</span>
              
              <div className="flex items-start space-x-3 text-xs">
                <MapPin className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">{vehicle.location}</span>
                  <span className="text-slate-500">100 Apex Blvd, Automotive Row</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs pt-1">
                <Phone className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span className="font-semibold text-slate-700">Call Sales: (800) 555-APEX</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* SIMILAR VEHICLES SECTION */}
      {similarVehicles.length > 0 && (
        <div className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-2xl text-slate-900">
              Similar Vehicles You Might Like
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarVehicles.map(sim => (
              <VehicleCard
                key={sim.id}
                vehicle={sim}
                onViewDetails={onViewDetails}
                onInquire={onInquire}
              />
            ))}
          </div>
        </div>
      )}

      {/* MOBILE STICKY ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md p-3 border-t border-slate-800 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Vehicle Price</span>
          <span className="font-heading font-extrabold text-lg text-white">${vehicle.price.toLocaleString()}</span>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="tel:18005552739"
            className="p-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700"
            title="Call Dealership"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={() => onInquire(vehicle)}
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-glow-blue"
          >
            Inquire Now
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL WITH BODY SCROLL LOCK */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={vehicle.images[selectedImageIndex] || vehicle.images[0]}
            alt="Fullscreen view"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

    </div>
  );
}
