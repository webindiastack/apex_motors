import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage({ setActivePage }) {
  const teamMembers = [
    {
      name: "Arthur Vance",
      role: "Founder & Managing Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces,top&w=800&q=80",
      bio: "Over 22 years of automotive leadership, passionate about curating the finest performance vehicles."
    },
    {
      name: "Victoria Hayes",
      role: "Head of Client Relations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces,top&w=800&q=80",
      bio: "Ensures every client enjoys an effortless VIP experience from initial inquiry to vehicle handover."
    },
    {
      name: "David Sterling",
      role: "Chief Technical Inspector",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces,top&w=800&q=80",
      bio: "Master Master Tech with 15+ years certifying luxury European and domestic performance drivetrains."
    }
  ];

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      
      {/* About Hero */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80" 
            alt="Showroom background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
            Established 2008
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Redefining Luxury Automotive Dealerships
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Apex Motors was founded on a simple principle: buying a luxury vehicle should be as exhilarating as driving one.
          </p>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Our Story</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Driven by Passion, Defined by Trust
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Starting as a boutique showroom specializing in rare sports coupes, Apex Motors has grown into a premier automotive landmark. Today, we manage a multi-location inventory of over 150 hand-certified luxury sedans, SUVs, and electric vehicles.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              We reject high-pressure dealer tactics. Every vehicle is thoroughly inspected by certified master technicians, backed by comprehensive warranties, and priced transparently without hidden administrative surcharges.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <span>150-Point Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <span>Home Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <span>7-Day Return Policy</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80" 
              alt="Apex Showroom Floor" 
              className="rounded-3xl shadow-xl border border-slate-200"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Pillars of Excellence</span>
            <h2 className="font-heading font-extrabold text-3xl text-slate-900">Our Core Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900">Radical Transparency</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Full disclosure on every car’s historical inspection report, service logs, and pricing breakdown before you make a commitment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900">Uncompromising Standards</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Only top-tier, low-mileage vehicles meeting our rigorous cosmetic and technical benchmarks earn a place in our inventory.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900">Client-First Philosophy</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We measure success by long-term client relationships and word-of-mouth referrals, not short-term sales quotas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Leadership</span>
          <h2 className="font-heading font-extrabold text-3xl text-slate-900">Meet Our Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm group hover:shadow-md transition-all">
              <div className="h-72 sm:h-80 overflow-hidden bg-slate-900 relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-heading font-bold text-lg text-slate-900">{member.name}</h3>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block">{member.role}</span>
                <p className="text-xs text-slate-500 leading-relaxed pt-2">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-10 sm:p-14 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Ready to Discover Your Next Car?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Schedule an appointment at our showroom or explore our live digital inventory from the comfort of your home.
          </p>
          <div className="pt-2">
            <button
              onClick={() => { setActivePage('vehicles'); window.scrollTo(0,0); }}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-4 rounded-2xl shadow-glow-blue transition-all inline-flex items-center space-x-2 text-sm"
            >
              <span>Explore Certified Vehicles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
