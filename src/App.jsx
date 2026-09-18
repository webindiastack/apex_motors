import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import InquiryModal from './components/InquiryModal';
import FavoritesDrawer from './components/FavoritesDrawer';

import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';

import { 
  getStoredVehicles, 
  saveVehicles, 
  getStoredInquiries, 
  saveInquiries 
} from './data/vehicles';

export default function App() {
  // Vehicles State (Persisted in LocalStorage)
  const [vehicles, setVehicles] = useState(() => getStoredVehicles());
  
  // Inquiries State (Persisted in LocalStorage)
  const [inquiries, setInquiries] = useState(() => getStoredInquiries());

  // Page Routing State (Persisted in Hash + LocalStorage)
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '').split('?')[0];
    if (['home', 'vehicles', 'details', 'about', 'contact', 'admin'].includes(hash)) {
      return hash;
    }
    const saved = localStorage.getItem('apex_active_page');
    return saved || 'home';
  });

  // Selected Vehicle State for Details Page (Persisted across Refresh)
  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    const hash = window.location.hash;
    let vehId = null;
    if (hash.includes('id=')) {
      vehId = hash.split('id=')[1]?.split('&')[0];
    }
    if (!vehId) {
      vehId = localStorage.getItem('apex_selected_veh_id');
    }
    if (vehId) {
      const found = getStoredVehicles().find(v => v.id === vehId);
      if (found) return found;
    }
    return getStoredVehicles()[0] || null;
  });

  // Inventory Filters State (Persisted in LocalStorage across Refresh)
  const [filters, setFilters] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_filters');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      make: 'All Makes',
      bodyType: 'All Types',
      fuelType: 'All Fuels',
      transmission: 'All Transmissions',
      maxPrice: 150000,
      maxMileage: 100000
    };
  });

  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('apex_search_term') || '';
  });

  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem('apex_sort_by') || 'newest';
  });

  // Modals & Drawers
  const [inquiryVehicle, setInquiryVehicle] = useState(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  // Sync state to LocalStorage & Hash whenever routing / filters change
  useEffect(() => {
    try {
      localStorage.setItem('apex_active_page', activePage);
      if (selectedVehicle) {
        localStorage.setItem('apex_selected_veh_id', selectedVehicle.id);
      }
      localStorage.setItem('apex_filters', JSON.stringify(filters));
      localStorage.setItem('apex_search_term', searchTerm);
      localStorage.setItem('apex_sort_by', sortBy);

      // Update Hash
      if (activePage === 'details' && selectedVehicle) {
        window.location.hash = `details?id=${selectedVehicle.id}`;
      } else {
        window.location.hash = activePage;
      }
    } catch (e) {
      console.error("Failed to sync navigation state", e);
    }
  }, [activePage, selectedVehicle, filters, searchTerm, sortBy]);

  // Listen to browser hash navigation (Back / Forward button)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').split('?')[0];
      if (['home', 'vehicles', 'details', 'about', 'contact', 'admin'].includes(hash)) {
        setActivePage(hash);
        if (hash === 'details' && window.location.hash.includes('id=')) {
          const vehId = window.location.hash.split('id=')[1]?.split('&')[0];
          const found = vehicles.find(v => v.id === vehId);
          if (found) setSelectedVehicle(found);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [vehicles]);

  // CRUD Operations for Vehicles
  const handleAddVehicle = (newVehicle) => {
    const updated = [newVehicle, ...vehicles];
    setVehicles(updated);
    saveVehicles(updated);
  };

  const handleUpdateVehicle = (id, updatedData) => {
    const updated = vehicles.map(v => v.id === id ? { ...v, ...updatedData } : v);
    setVehicles(updated);
    saveVehicles(updated);
    if (selectedVehicle && selectedVehicle.id === id) {
      setSelectedVehicle({ ...selectedVehicle, ...updatedData });
    }
  };

  const handleDeleteVehicle = (id) => {
    const updated = vehicles.filter(v => v.id !== id);
    setVehicles(updated);
    saveVehicles(updated);
  };

  // CRUD Operations for Inquiries
  const handleSubmitInquiry = (inquiryRecord) => {
    const updated = [inquiryRecord, ...inquiries];
    setInquiries(updated);
    saveInquiries(updated);
  };

  const handleUpdateInquiryStatus = (id, newStatus) => {
    const updated = inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i);
    setInquiries(updated);
    saveInquiries(updated);
  };

  const handleDeleteInquiry = (id) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    saveInquiries(updated);
  };

  // View Details trigger
  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Inquiry modal
  const handleOpenInquiry = (vehicle) => {
    setInquiryVehicle(vehicle);
    setInquiryOpen(true);
  };

  return (
    <FavoritesProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-brand-500 selection:text-white">
          
          <ToastContainer />

          {/* Header Navbar */}
          <Navbar
            activePage={activePage}
            setActivePage={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenFavorites={() => setFavoritesOpen(true)}
          />

          {/* Main Content Router */}
          <main className="flex-grow">
            {activePage === 'home' && (
              <HomePage
                vehicles={vehicles}
                onViewDetails={handleViewDetails}
                onInquire={handleOpenInquiry}
                setActivePage={setActivePage}
                setFilters={setFilters}
              />
            )}

            {activePage === 'vehicles' && (
              <VehiclesPage
                vehicles={vehicles}
                onViewDetails={handleViewDetails}
                onInquire={handleOpenInquiry}
                filters={filters}
                setFilters={setFilters}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            )}

            {activePage === 'details' && (
              <VehicleDetailsPage
                vehicle={selectedVehicle}
                vehicles={vehicles}
                onBack={() => setActivePage('vehicles')}
                onInquire={handleOpenInquiry}
                onViewDetails={handleViewDetails}
              />
            )}

            {activePage === 'about' && (
              <AboutPage setActivePage={setActivePage} />
            )}

            {activePage === 'contact' && (
              <ContactPage />
            )}

            {activePage === 'admin' && (
              <AdminPage
                vehicles={vehicles}
                inquiries={inquiries}
                onAddVehicle={handleAddVehicle}
                onUpdateVehicle={handleUpdateVehicle}
                onDeleteVehicle={handleDeleteVehicle}
                onUpdateInquiryStatus={handleUpdateInquiryStatus}
                onDeleteInquiry={handleDeleteInquiry}
                onViewDetails={handleViewDetails}
              />
            )}
          </main>

          {/* Footer */}
          <Footer setActivePage={setActivePage} />

          {/* Vehicle Inquiry Modal */}
          <InquiryModal
            vehicle={inquiryVehicle}
            isOpen={inquiryOpen}
            onClose={() => setInquiryOpen(false)}
            onSubmitInquiry={handleSubmitInquiry}
          />

          {/* Favorites Wishlist Drawer */}
          <FavoritesDrawer
            isOpen={favoritesOpen}
            onClose={() => setFavoritesOpen(false)}
            onViewDetails={handleViewDetails}
            onInquire={handleOpenInquiry}
            vehicles={vehicles}
          />

        </div>
      </ToastProvider>
    </FavoritesProvider>
  );
}
