import React from 'react';
import { Heart, Calendar, Gauge, Fuel, Sliders, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';

export default function VehicleCard({ vehicle, onViewDetails, onInquire }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();

  const fav = isFavorite(vehicle.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(vehicle.id);
    if (!fav) {
      addToast(`Added ${vehicle.make} ${vehicle.model} to your favorites!`, 'success');
    } else {
      addToast(`Removed ${vehicle.make} ${vehicle.model} from favorites`, 'info');
    }
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Featured':
        return 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md';
      case 'New Arrival':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md';
      case 'Certified Pre-Owned':
        return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md';
      case 'Hot Deal':
        return 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md';
      default:
        return 'bg-slate-800 text-slate-100';
    }
  };

  return (
    <div 
      onClick={() => onViewDetails(vehicle)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-brand-500/40 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col h-full cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image Container with Zoom */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-900">
        <img 
          src={vehicle.images[0]} 
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 opacity-70 group-hover:opacity-60 transition-opacity" />

        {/* Badge */}
        {vehicle.badge && (
          <span className={`absolute top-3.5 left-3.5 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full ${getBadgeStyle(vehicle.badge)}`}>
            {vehicle.badge}
          </span>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3.5 right-3.5 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            fav 
              ? 'bg-rose-500 text-white shadow-lg scale-110' 
              : 'bg-slate-900/60 text-white hover:bg-slate-900/90 hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Location Pill */}
        <div className="absolute bottom-3 left-3.5 text-xs text-slate-200 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md font-medium border border-slate-700/50">
          {vehicle.location}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Make & Year */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>{vehicle.make}</span>
            <span className="text-brand-600 font-bold">{vehicle.year}</span>
          </div>

          {/* Title & Price */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
              {vehicle.model}
            </h3>
            <span className="font-heading font-extrabold text-xl text-slate-900 flex-shrink-0">
              ${vehicle.price.toLocaleString()}
            </span>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 mb-4 border border-slate-100">
            <div className="flex items-center space-x-2">
              <Gauge className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{vehicle.mileage.toLocaleString()} mi</span>
            </div>
            <div className="flex items-center space-x-2">
              <Fuel className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sliders className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{vehicle.transmission}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{vehicle.bodyType}</span>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInquire(vehicle);
            }}
            className="text-xs font-semibold text-slate-600 hover:text-brand-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Quick Inquiry
          </button>

          <button
            onClick={() => onViewDetails(vehicle)}
            className="inline-flex items-center space-x-1.5 bg-slate-900 group-hover:bg-brand-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
