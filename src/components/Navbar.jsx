import React, { useState, useEffect } from 'react';
import { Car, Heart, Menu, X, ShieldCheck, Phone } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar({ activePage, setActivePage, onOpenFavorites }) {
  const { favorites } = useFavorites();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-800 text-white py-3' 
        : 'bg-slate-900 text-white py-4 border-b border-slate-800/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-blue-500 flex items-center justify-center text-white shadow-glow-blue group-hover:scale-105 transition-transform duration-300">
              <Car className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-tight text-white group-hover:text-brand-400 transition-colors">
                APEX <span className="text-brand-500">MOTORS</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 font-medium uppercase -mt-1">
                Luxury & Performance
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Admin Button */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Favorites Icon Button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/50"
              title="View Favorites"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`inline-flex items-center space-x-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md ${
                activePage === 'admin' 
                  ? 'bg-emerald-600 text-white shadow-glow-cyan' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-lg bg-slate-800 text-slate-200"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-3 rounded-xl font-medium text-base ${
                  activePage === item.id 
                    ? 'bg-brand-600 text-white font-bold' 
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-center bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm"
            >
              Access Dealership Admin
            </button>
            
            <a 
              href="tel:+18005552739" 
              className="flex items-center justify-center space-x-2 text-slate-400 hover:text-white py-2 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Sales: (800) 555-APEX</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
