import React, { useState } from 'react';
import { 
  Car, Plus, Edit, Trash2, ShieldCheck, DollarSign, Users, Mail, Phone, Calendar, 
  Clock, Search, CheckCircle2, AlertCircle, Eye, LogOut, Lock, RefreshCw, X, Sliders, Filter
} from 'lucide-react';
import { MAKES, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS } from '../data/vehicles';
import { useToast } from '../context/ToastContext';

export default function AdminPage({ 
  vehicles, 
  inquiries, 
  onAddVehicle, 
  onUpdateVehicle, 
  onDeleteVehicle, 
  onUpdateInquiryStatus, 
  onDeleteInquiry,
  onViewDetails
}) {
  const { addToast } = useToast();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default logged-in for demo convenience
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState('inventory'); // 'overview' | 'inventory' | 'inquiries'

  // Vehicle Form Modal State
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehicleFormData, setVehicleFormData] = useState({
    make: 'BMW',
    model: '',
    year: 2024,
    price: 45000,
    mileage: 5000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    engine: '2.0L Turbocharged I4',
    horsepower: '255 hp',
    drivetrain: 'Rear-Wheel Drive (RWD)',
    exteriorColor: 'Black Metallic',
    interiorColor: 'Black Leather',
    location: 'Apex Central Showroom',
    badge: 'Featured',
    vin: 'WBA' + Math.floor(100000000 + Math.random() * 900000000),
    stockNumber: 'APX-' + Math.floor(1000 + Math.random() * 9000),
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Immaculate vehicle in pristine condition with complete service records and full warranty.',
    keySpecs: {
      acceleration: '0-60 mph in 5.5s',
      topSpeed: '150 mph',
      fuelEconomy: '25 City / 34 Hwy MPG',
      seating: '5 Passengers',
      warranty: '2 Years Apex Certified'
    },
    features: {
      safety: ['Active Safety Assist', 'Surround View Camera'],
      comfort: ['Leather Seats', 'Panoramic Sunroof'],
      technology: ['Touchscreen Infotainment', 'Apple CarPlay'],
      performance: ['Sport Suspension', 'Alloy Wheels']
    }
  });

  // Filters inside Admin
  const [inventorySearch, setInventorySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin' || passcode === 'apex2026' || passcode === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
      addToast('Authenticated as Dealership Administrator', 'success');
    } else {
      setAuthError('Invalid passcode. Try "admin" or "apex2026".');
    }
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingVehicle(null);
    setVehicleFormData({
      make: 'BMW',
      model: '',
      year: 2024,
      price: 45000,
      mileage: 5000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'Sedan',
      engine: '2.0L Turbocharged I4',
      horsepower: '255 hp',
      drivetrain: 'Rear-Wheel Drive (RWD)',
      exteriorColor: 'Black Metallic',
      interiorColor: 'Black Leather',
      location: 'Apex Central Showroom',
      badge: 'Featured',
      vin: 'WBA' + Math.floor(100000000 + Math.random() * 900000000),
      stockNumber: 'APX-' + Math.floor(1000 + Math.random() * 9000),
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Pristine luxury vehicle with complete inspection certification.',
      keySpecs: {
        acceleration: '0-60 mph in 5.5s',
        topSpeed: '150 mph',
        fuelEconomy: '25 MPG',
        seating: '5 Passengers',
        warranty: '2 Year Apex Certified'
      },
      features: {
        safety: ['Safety Assist', '360 Camera'],
        comfort: ['Heated Seats', 'Sunroof'],
        technology: ['Touchscreen', 'CarPlay'],
        performance: ['Sport Mode', 'Alloy Wheels']
      }
    });
    setIsVehicleModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setVehicleFormData({ ...vehicle });
    setIsVehicleModalOpen(true);
  };

  // Save Vehicle
  const handleSaveVehicle = (e) => {
    e.preventDefault();
    if (!vehicleFormData.model || !vehicleFormData.price) {
      addToast('Please specify vehicle model and price.', 'error');
      return;
    }

    if (editingVehicle) {
      onUpdateVehicle(editingVehicle.id, vehicleFormData);
      addToast(`Updated ${vehicleFormData.year} ${vehicleFormData.make} ${vehicleFormData.model}!`, 'success');
    } else {
      const newVehicle = {
        ...vehicleFormData,
        id: 'veh-' + Date.now()
      };
      onAddVehicle(newVehicle);
      addToast(`Added new vehicle: ${newVehicle.make} ${newVehicle.model}!`, 'success');
    }

    setIsVehicleModalOpen(false);
  };

  // Metrics calculation
  const totalValue = vehicles.reduce((sum, v) => sum + Number(v.price || 0), 0);
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const filteredVehicles = vehicles.filter(v => {
    if (!inventorySearch) return true;
    const term = inventorySearch.toLowerCase();
    return (
      v.make.toLowerCase().includes(term) ||
      v.model.toLowerCase().includes(term) ||
      v.stockNumber.toLowerCase().includes(term) ||
      v.bodyType.toLowerCase().includes(term)
    );
  });

  const filteredInquiries = inquiries.filter(i => {
    if (inquiryStatusFilter === 'All') return true;
    return i.status === inquiryStatusFilter;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-slate-950/90">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full text-white space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-glow-blue">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-white">Dealership Portal</h2>
            <p className="text-xs text-slate-400">Enter your passcode to access inventory management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter 'admin' or 'apex2026'"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
              />
              {authError && <p className="text-xs text-rose-500 mt-1">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm"
            >
              Authenticate Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in pb-16">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Showroom Management Portal</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Apex Dealership Admin
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Vehicle</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
            title="Lock Portal"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Total Inventory</span>
            <Car className="w-4 h-4 text-brand-600" />
          </div>
          <div className="font-heading font-black text-3xl text-slate-900">{vehicles.length} Units</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Ready for Showroom Sale</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Fleet Valuation</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-heading font-black text-3xl text-slate-900">${totalValue.toLocaleString()}</div>
          <span className="text-[11px] text-slate-500">Combined List Price</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Total Inquiries</span>
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-heading font-black text-3xl text-slate-900">{inquiries.length}</div>
          <span className="text-[11px] text-slate-500">Customer Messages Received</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>New Pending</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-heading font-black text-3xl text-amber-600">{newInquiriesCount} New</div>
          <span className="text-[11px] text-amber-600 font-semibold">Requires Staff Contact</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-4">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'inventory' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Manage Inventory ({vehicles.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'inquiries' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Customer Inquiries ({inquiries.length})</span>
          {newInquiriesCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {newInquiriesCount}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                placeholder="Filter by make, model, stock #..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <span className="text-xs text-slate-500 font-semibold">
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
            </span>
          </div>

          {/* Vehicles Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <th className="p-4">Vehicle</th>
                    <th className="p-4">Stock # / VIN</th>
                    <th className="p-4">Body / Fuel</th>
                    <th className="p-4">Mileage</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Badge</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {filteredVehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={v.images[0]} 
                            alt={v.model}
                            className="w-14 h-10 object-cover rounded-lg flex-shrink-0 bg-slate-900"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{v.year} {v.make} {v.model}</span>
                            <span className="text-[11px] text-slate-400">{v.location}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-medium text-slate-600">
                        {v.stockNumber}<br />
                        <span className="text-[10px] text-slate-400">{v.vin}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-800">{v.bodyType}</span>
                        <span className="text-slate-400 block text-[11px]">{v.fuelType}</span>
                      </td>
                      <td className="p-4 font-semibold">{v.mileage.toLocaleString()} mi</td>
                      <td className="p-4 font-heading font-extrabold text-sm text-brand-600">
                        ${v.price.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded text-[10px]">
                          {v.badge || 'Standard'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => onViewDetails(v)}
                          className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(v)}
                          className="p-1.5 text-brand-600 hover:text-brand-700 rounded-lg hover:bg-brand-50"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${v.year} ${v.make} ${v.model}?`)) {
                              onDeleteVehicle(v.id);
                              addToast(`Deleted ${v.make} ${v.model}`, 'info');
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INQUIRIES MANAGEMENT */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          
          {/* Status Filter */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-500">Filter Status:</span>
              {['All', 'New', 'Contacted', 'Closed'].map(st => (
                <button
                  key={st}
                  onClick={() => setInquiryStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    inquiryStatusFilter === st 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500 font-semibold">
              Showing {filteredInquiries.length} inquiries
            </span>
          </div>

          {/* Inquiries List */}
          <div className="space-y-4">
            {filteredInquiries.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
                No customer inquiries matching filter criteria.
              </div>
            ) : (
              filteredInquiries.map((inq) => (
                <div 
                  key={inq.id}
                  className={`bg-white rounded-2xl p-5 border shadow-sm transition-all space-y-4 ${
                    inq.status === 'New' ? 'border-brand-500/60 bg-brand-50/10' : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-heading font-bold text-slate-900 text-base">{inq.fullName}</span>
                        <span className="font-mono text-xs text-slate-400">({inq.id})</span>
                        {inq.status === 'New' && (
                          <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            New Lead
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Vehicle: <strong className="text-slate-800">{inq.vehicleTitle}</strong> (${inq.vehiclePrice?.toLocaleString()})
                      </p>
                    </div>

                    {/* Status Changer */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-500">Status:</span>
                      <select
                        value={inq.status}
                        onChange={(e) => {
                          onUpdateInquiryStatus(inq.id, e.target.value);
                          addToast(`Updated status to ${e.target.value}`, 'success');
                        }}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none ${
                          inq.status === 'New' ? 'bg-amber-50 text-amber-700 border-amber-300' :
                          inq.status === 'Contacted' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                          'bg-emerald-50 text-emerald-700 border-emerald-300'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>

                      <button
                        onClick={() => {
                          if (window.confirm("Delete this customer inquiry?")) {
                            onDeleteInquiry(inq.id);
                            addToast("Inquiry deleted", "info");
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px]">Email</span>
                      <a href={`mailto:${inq.email}`} className="text-brand-600 font-semibold hover:underline">{inq.email}</a>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px]">Phone ({inq.contactMethod})</span>
                      <a href={`tel:${inq.phone}`} className="text-slate-800 font-semibold">{inq.phone}</a>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px]">Submitted At</span>
                      <span className="text-slate-700">{new Date(inq.submittedAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Customer Message */}
                  <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100">
                    <strong className="text-slate-900 block mb-1">Customer Message:</strong>
                    <p className="italic">{inq.message}</p>
                    {inq.visitDate && (
                      <div className="mt-2 pt-2 border-t border-slate-100 text-brand-600 font-semibold flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Requested Visit: {inq.visitDate} at {inq.visitTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* VEHICLE ADD / EDIT MODAL */}
      {isVehicleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8 border border-slate-200">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingVehicle ? 'Edit Vehicle Specs' : 'Add New Showroom Vehicle'}
              </h3>
              <button onClick={() => setIsVehicleModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveVehicle} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Make *</label>
                  <select
                    value={vehicleFormData.make}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, make: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  >
                    {MAKES.filter(m => m !== 'All Makes').map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Model *</label>
                  <input
                    type="text"
                    required
                    value={vehicleFormData.model}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, model: e.target.value })}
                    placeholder="e.g. 3 Series M Sport"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={vehicleFormData.year}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, year: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    required
                    value={vehicleFormData.price}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mileage (mi)</label>
                  <input
                    type="number"
                    value={vehicleFormData.mileage}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, mileage: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Body Type</label>
                  <select
                    value={vehicleFormData.bodyType}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, bodyType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  >
                    {BODY_TYPES.filter(b => b !== 'All Types').map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fuel Type</label>
                  <select
                    value={vehicleFormData.fuelType}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, fuelType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  >
                    {FUEL_TYPES.filter(f => f !== 'All Fuels').map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Transmission</label>
                  <select
                    value={vehicleFormData.transmission}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, transmission: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  >
                    {TRANSMISSIONS.filter(t => t !== 'All Transmissions').map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Tag</label>
                  <select
                    value={vehicleFormData.badge}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, badge: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  >
                    <option value="Featured">Featured</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                    <option value="Hot Deal">Hot Deal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Main Image URL</label>
                  <input
                    type="url"
                    value={vehicleFormData.images[0] || ''}
                    onChange={(e) => {
                      const newImgs = [...vehicleFormData.images];
                      newImgs[0] = e.target.value;
                      setVehicleFormData({ ...vehicleFormData, images: newImgs });
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={vehicleFormData.description}
                  onChange={(e) => setVehicleFormData({ ...vehicleFormData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsVehicleModalOpen(false)}
                  className="bg-slate-100 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
