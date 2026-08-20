import React from 'react';
import { Utensils, Calendar, Star, Sparkles, Clock, Flame, ShieldCheck, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onViewMenu: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewMenu, onBookTable }) => {
  return (
    <section id="home" className="relative min-h-[85vh] flex flex-col justify-between bg-[#3D2B1F] text-[#F5F5F0] overflow-hidden">
      {/* Background Image with Deep Espresso & Gold Radial Glow Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&auto=format&fit=crop&q=85"
          alt="Spice Garden Restaurant fine dining interior and ambient lighting"
          className="w-full h-full object-cover object-center scale-105 transform opacity-25"
          loading="eager"
        />
        {/* Sleek radial and linear gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D2B1F] via-[#3D2B1F]/95 to-[#2C1E15]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#D4AF37_0%,_transparent_60%)] opacity-20 pointer-events-none" />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Sleek Location & Category Pill */}
          <div
            id="hero-badge"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#2C1E15] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm"
          >
            <Sparkles size={13} className="text-[#D4AF37]" />
            <span>Hubballi's Celebrated Multi-Cuisine Dining</span>
          </div>

          {/* Main Restaurant Title & Tagline */}
          <h1
            id="hero-title"
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#F5F5F0] tracking-tight leading-[1.1] mb-4"
          >
            Delicious Food, <br />
            <span className="text-[#D4AF37] italic font-normal">Memorable</span> Moments.
          </h1>

          {/* Description */}
          <p
            id="hero-description"
            className="text-sm sm:text-base md:text-lg text-[#E5E0D8]/90 font-normal max-w-2xl leading-relaxed mb-8"
          >
            Experience authentic North Indian tandoor, fragrant biryanis, sizzlers, and handcrafted desserts at Spice Garden Restaurant in Hubballi, Karnataka.
          </p>

          {/* Hero Two Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12" id="hero-action-buttons">
            <button
              id="hero-view-menu-btn"
              onClick={onViewMenu}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C358] text-[#3D2B1F] font-bold text-xs uppercase tracking-widest rounded-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Utensils size={15} />
              <span>View Menu</span>
            </button>

            <button
              id="hero-book-table-btn"
              onClick={onBookTable}
              className="px-6 py-3 bg-transparent hover:bg-[#2C1E15] border border-[#F5F5F0]/80 hover:border-[#D4AF37] text-[#F5F5F0] hover:text-[#D4AF37] font-bold text-xs uppercase tracking-widest rounded-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Calendar size={15} className="text-[#D4AF37]" />
              <span>Book a Table</span>
            </button>
          </div>

          {/* Quick Metrics / Key Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg" id="hero-metrics">
            <div className="bg-[#2C1E15]/90 border border-[#4A382B] rounded-sm p-3">
              <div className="flex items-center gap-1.5 text-[#D4AF37] font-serif font-bold text-lg">
                <Star size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
                <span>4.8 / 5.0</span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-[#E5E0D8]/70 mt-0.5">1,200+ Guest Reviews</p>
            </div>

            <div className="bg-[#2C1E15]/90 border border-[#4A382B] rounded-sm p-3">
              <div className="flex items-center gap-1.5 text-[#D4AF37] font-serif font-bold text-lg">
                <Flame size={16} />
                <span>50+ Dishes</span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-[#E5E0D8]/70 mt-0.5">Multi-Cuisine Variety</p>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-[#2C1E15]/90 border border-[#4A382B] rounded-sm p-3">
              <div className="flex items-center gap-1.5 text-[#D4AF37] font-serif font-bold text-lg">
                <Clock size={16} />
                <span>11 AM – 10:30 PM</span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-[#E5E0D8]/70 mt-0.5">Open All 7 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section Banner below Hero Area */}
      <div id="welcome-section" className="relative z-10 bg-[#2C1E15] border-t border-[#4A382B] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-[#3D2B1F] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#F5F5F0] uppercase tracking-wide mb-1">100% Fresh & Authentic</h3>
              <p className="text-xs text-[#E5E0D8]/80 leading-relaxed">
                Handpicked farm vegetables, premium cuts, pure desi ghee, and whole spices ground in-house every morning.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-[#3D2B1F] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Heart size={20} />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#F5F5F0] uppercase tracking-wide mb-1">Family & Couple Friendly</h3>
              <p className="text-xs text-[#E5E0D8]/80 leading-relaxed">
                Spacious air-conditioned dining halls, cozy private booths, courteous service, and a warm welcoming atmosphere.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-[#3D2B1F] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Utensils size={20} />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#F5F5F0] uppercase tracking-wide mb-1">Dine-In, Takeaway & Delivery</h3>
              <p className="text-xs text-[#E5E0D8]/80 leading-relaxed">
                Enjoy hot gourmet meals at our Gokul Road restaurant, or order online for fast, hygienic home delivery across Hubballi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
