import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Car, Phone, Mail, MessageSquare, ShieldCheck, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function InquiryModal({ vehicle, isOpen, onClose, onSubmitInquiry }) {
  const { addToast } = useToast();
  
  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    contactMethod: 'Phone',
    message: '',
    agreedToTerms: false
  });

  // Validation Errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  // Lock body scroll when modal is open
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

  useEffect(() => {
    if (vehicle) {
      setFormData(prev => ({
        ...prev,
        message: `Hello, I am interested in learning more about the ${vehicle.year} ${vehicle.make} ${vehicle.model} listed at $${vehicle.price.toLocaleString()}.`
      }));
      setErrors({});
      setIsSuccess(false);
    }
  }, [vehicle, isOpen]);

  if (!isOpen || !vehicle) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to be contacted regarding this vehicle.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const randomRef = 'INQ-' + Math.floor(100000 + Math.random() * 900000);

    const inquiryRecord = {
      id: randomRef,
      vehicleId: vehicle.id,
      vehicleTitle: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      vehiclePrice: vehicle.price,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      contactMethod: formData.contactMethod,
      message: formData.message,
      status: 'New',
      submittedAt: new Date().toISOString()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setRefNumber(randomRef);
      if (onSubmitInquiry) {
        onSubmitInquiry(inquiryRecord);
      }
      addToast('Inquiry submitted successfully to Apex Motors team!', 'success');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
              Vehicle Inquiry
            </span>
            <h2 className="text-xl font-heading font-bold text-white">
              Contact Dealership Team
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vehicle Mini Summary Bar */}
        <div className="bg-slate-50 p-4 border-b border-slate-200/80 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 min-w-0">
            <img 
              src={vehicle.images[0]} 
              alt={vehicle.model}
              className="w-16 h-12 rounded-lg object-cover flex-shrink-0 border border-slate-200 bg-slate-900"
            />
            <div className="min-w-0">
              <h4 className="font-heading font-bold text-slate-900 text-sm truncate">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h4>
              <p className="text-xs text-slate-500 truncate">
                Stock #: {vehicle.stockNumber} | {vehicle.location}
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="font-heading font-extrabold text-base text-brand-600">
              ${vehicle.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">
                Your Inquiry Has Been Sent!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for your interest in the <span className="font-semibold text-slate-800">{vehicle.year} {vehicle.make} {vehicle.model}</span>. Our senior sales advisor will contact you shortly.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Confirmation Ref:</span>
                <span className="font-mono font-bold text-slate-900">{refNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Method:</span>
                <span className="font-semibold text-slate-800">{formData.contactMethod}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-md"
              >
                Close & Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Alexander Vance"
                  className={`w-full bg-slate-50 border ${errors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alexander@example.com"
                  className={`w-full bg-slate-50 border ${errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500`}
                />
                {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 019-2834"
                  className={`w-full bg-slate-50 border ${errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500`}
                />
                {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Contact Method
                </label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Phone">Phone Call</option>
                  <option value="Email">Email</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message / Inquiry Details <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className={`w-full bg-slate-50 border ${errors.message ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'} rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500`}
              ></textarea>
              {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
            </div>

            {/* Consent Checkbox */}
            <div>
              <div className="flex items-start space-x-2.5">
                <input
                  type="checkbox"
                  id="agreedToTerms"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4 flex-shrink-0 cursor-pointer"
                />
                <label htmlFor="agreedToTerms" className="text-xs text-slate-600 leading-tight cursor-pointer">
                  I agree to be contacted by Apex Motors regarding this vehicle inquiry via my selected contact method. <span className="text-rose-500">*</span>
                </label>
              </div>
              {errors.agreedToTerms && <p className="text-[11px] text-rose-500 mt-1">{errors.agreedToTerms}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  <span>Send Inquiry Now</span>
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
