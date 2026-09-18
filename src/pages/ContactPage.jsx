import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, Wifi, Coffee, BatteryCharging, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ContactPage() {
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Sales Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email address is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!formData.message.trim() || formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast('Message sent to Apex Motors team!', 'success');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-16 animate-fade-in">
      
      {/* Page Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Get In Touch</span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Visit Our Showroom or Contact Us
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Our sales advisors and service specialists are ready to assist you with vehicle selection and inquiry support.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards & Operating Hours */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-heading font-bold text-xl text-slate-900">Apex Central Showroom</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3 text-slate-600">
                <MapPin className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Address</strong>
                  <span>100 Apex Boulevard, Automobile District, CA 90210</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-600">
                <Phone className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Phone Lines</strong>
                  <span>Sales: (800) 555-APEX / (800) 555-2739</span><br />
                  <span>Service: (800) 555-SERV</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-600">
                <Mail className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block font-semibold">Email Enquiries</strong>
                  <span>sales@apexmotors.com</span><br />
                  <span>concierge@apexmotors.com</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-brand-600" />
                <span>Showroom & Service Hours</span>
              </h4>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="font-bold text-slate-900">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Saturday</span>
                  <span className="font-bold text-slate-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">Sunday</span>
                  <span className="font-bold text-slate-900">11:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Showroom Amenities */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 border border-slate-800">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Showroom Amenities
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Coffee className="w-4 h-4 text-brand-400" />
                <span>Executive Espresso Bar</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-brand-400" />
                <span>High-Speed Wi-Fi</span>
              </div>
              <div className="flex items-center space-x-2">
                <BatteryCharging className="w-4 h-4 text-brand-400" />
                <span>250kW EV Fast Charger</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>Valet Parking</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-heading font-bold text-xl text-slate-900">Send Us a Direct Message</h3>
            <p className="text-xs text-slate-500 mt-1">Fill out the form below and our team will respond within 24 hours.</p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-2xl text-slate-900">Thank You for Reaching Out!</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Your message has been assigned to our customer concierge team. We will get back to you shortly.
              </p>
              <button
                onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', topic: 'Sales Inquiry', message: '' }); }}
                className="bg-brand-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    className={`w-full bg-slate-50 border ${errors.name ? 'border-rose-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="eleanor@example.com"
                    className={`w-full bg-slate-50 border ${errors.email ? 'border-rose-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 019-2834"
                    className={`w-full bg-slate-50 border ${errors.phone ? 'border-rose-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Topic</label>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Sales Inquiry">Sales & Inventory Inquiry</option>
                    <option value="Schedule Service">Schedule Vehicle Service</option>
                    <option value="General Question">General Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can our dealership assist you today?"
                  className={`w-full bg-slate-50 border ${errors.message ? 'border-rose-500' : 'border-slate-300'} rounded-xl p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500`}
                ></textarea>
                {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Interactive Simulated Map Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-xl text-white">Interactive Showroom Location</h3>
            <p className="text-xs text-slate-400">100 Apex Boulevard, Automobile District, CA 90210</p>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>
        </div>

        <div className="h-64 sm:h-80 w-full bg-slate-950 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-800">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 text-center space-y-3 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 max-w-sm">
            <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center mx-auto shadow-glow-blue animate-bounce">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-sm">Apex Central Flagship Showroom</h4>
              <p className="text-xs text-slate-400 mt-0.5">Open Mon-Sat 9AM-8PM</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
