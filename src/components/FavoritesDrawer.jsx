import React, { useEffect } from 'react';
import { X, Heart, Trash2, ArrowRight, Car } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';

export default function FavoritesDrawer({ isOpen, onClose, onViewDetails, onInquire, vehicles = [] }) {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { addToast } = useToast();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const favoriteVehicles = vehicles.filter(v => favorites.includes(v.id));

  const handleRemove = (vehicle, e) => {
    e.stopPropagation();
    toggleFavorite(vehicle.id);
    addToast(`Removed ${vehicle.make} ${vehicle.model} from favorites`, 'info');
  };

  const handleClear = () => {
    clearFavorites();
    addToast('Cleared all favorite vehicles', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Saved Vehicles ({favoriteVehicles.length})
                </h3>
                <p className="text-xs text-slate-400">Compare and manage your saved inventory</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Favorites List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favoriteVehicles.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
                  <Car className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-800 text-lg mb-1">
                    No Saved Vehicles Yet
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Click the heart icon on any vehicle card to save it for easy comparison later.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Your Wishlist</span>
                  <button
                    onClick={handleClear}
                    className="text-xs text-rose-500 hover:text-rose-600 font-semibold flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>

                {favoriteVehicles.map(vehicle => (
                  <div
                    key={vehicle.id}
                    onClick={() => {
                      onViewDetails(vehicle);
                      onClose();
                    }}
                    className="group bg-slate-50 hover:bg-slate-100/80 rounded-2xl p-3 border border-slate-200/80 transition-all flex gap-3 cursor-pointer relative"
                  >
                    <img
                      src={vehicle.images[0]}
                      alt={vehicle.model}
                      className="w-24 h-20 rounded-xl object-cover flex-shrink-0 bg-slate-900"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-heading font-bold text-slate-900 text-sm truncate group-hover:text-brand-600 transition-colors">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500">
                          {vehicle.mileage.toLocaleString()} mi &bull; {vehicle.fuelType}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-heading font-extrabold text-sm text-brand-600">
                          ${vehicle.price.toLocaleString()}
                        </span>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onInquire(vehicle);
                              onClose();
                            }}
                            className="text-[11px] font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 px-2.5 py-1 rounded-lg transition-colors"
                          >
                            Inquire
                          </button>
                          <button
                            onClick={(e) => handleRemove(vehicle, e)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer Action */}
          {favoriteVehicles.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <button
                onClick={onClose}
                className="w-full bg-slate-900 hover:bg-brand-600 text-white font-bold text-sm py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <span>Continue Browsing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
