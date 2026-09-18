import React, { useState } from 'react';
import { Car, MapPin, Phone, Mail, Clock, Send, ShieldCheck, Award } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Footer({ setActivePage }) {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    addToast('Thank you for subscribing to Apex Motors VIP updates!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Car className="w-6 h-6" />
              </div>
              <span className="font-heading font-black text-2xl text-white tracking-tight">
                APEX <span className="text-brand-500">MOTORS</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Elevating the luxury car buying experience. Certified pre-owned and new performance vehicles with comprehensive warranties and white-glove service.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <span className="inline-flex items-center space-x-1 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>Certified Dealer</span>
              </span>
              <span className="inline-flex items-center space-x-1 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Award className="w-4 h-4 text-amber-400" />
                <span>5-Star Rated</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { setActivePage('home'); window.scrollTo(0,0); }} className="hover:text-brand-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('vehicles'); window.scrollTo(0,0); }} className="hover:text-brand-400 transition-colors">
                  Explore Inventory
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('about'); window.scrollTo(0,0); }} className="hover:text-brand-400 transition-colors">
                  About Our Dealership
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('contact'); window.scrollTo(0,0); }} className="hover:text-brand-400 transition-colors">
                  Contact & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Hours & Location */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase">
              Showroom Hours
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Monday - Saturday</div>
                  <div className="text-xs text-slate-400">9:00 AM - 8:00 PM</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Sunday</div>
                  <div className="text-xs text-slate-400">11:00 AM - 5:00 PM</div>
                </div>
              </li>
              <li className="flex items-start space-x-3 pt-2">
                <MapPin className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs leading-relaxed">
                  100 Apex Boulevard, Automobile District, CA 90210
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase">
              VIP Inventory Alerts
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to get immediate notifications on newly listed rare and luxury arrivals before anyone else.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-brand-600 hover:bg-brand-500 text-white px-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} Apex Motors Inc. All rights reserved. Premium Vehicle Marketplace.
          </div>
          <div className="flex space-x-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
