import React from 'react';
import { Sparkles, ShoppingBag, Tag, Check, Flame } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data/restaurantData';
import { SpecialOffer } from '../types';

interface SpecialsProps {
  onOrderSpecial: (special: SpecialOffer) => void;
}

export const Specials: React.FC<SpecialsProps> = ({ onOrderSpecial }) => {
  return (
    <section id="specials" className="py-20 bg-[#FAF7F2] text-[#3D2B1F] relative border-b border-[#E5E0D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#3D2B1F] text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Sparkles size={14} />
            <span>Limited Daily Deals</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F] mb-4">
            Today's Chef Specials & Combos
          </h2>
          <p className="text-sm sm:text-base text-[#7D6E63]">
            Curated gourmet platters and family feast combos at exclusive celebratory prices, freshly crafted today in our Hubballi kitchen.
          </p>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* 3 Attractive Special Food Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="specials-cards-grid">
          {SPECIAL_OFFERS.map((special) => (
            <div
              key={special.id}
              id={`special-card-${special.id}`}
              className="bg-[#FFFFFF] rounded-sm border border-[#E5E0D8] hover:border-[#D4AF37] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Image & Discount Badge */}
              <div className="relative h-56 overflow-hidden bg-[#FAF7F2]">
                <img
                  src={special.image}
                  alt={special.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Floating Discount Tag */}
                <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#3D2B1F] font-extrabold text-[11px] px-2.5 py-1 rounded-sm shadow-sm flex items-center gap-1 uppercase tracking-wider">
                  <Tag size={12} />
                  <span>{special.discountTag}</span>
                </div>

                {/* Veg / Non-veg indicator */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-sm border border-[#E5E0D8] shadow-sm">
                  <div
                    className={`w-3 h-3 border flex items-center justify-center ${
                      special.type === 'veg' ? 'border-green-600' : 'border-red-600'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        special.type === 'veg' ? 'bg-green-600' : 'bg-red-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Tagline Pill */}
                <div className="absolute bottom-3 left-3 right-3 text-xs font-bold text-[#D4AF37] bg-[#3D2B1F]/90 px-3 py-1 rounded-sm border border-[#D4AF37]/40 uppercase tracking-wider">
                  {special.tagline}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#3D2B1F] mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {special.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7D6E63] leading-relaxed mb-4">
                    {special.description}
                  </p>

                  {/* Included items checklist */}
                  <div className="bg-[#FAF7F2] rounded-sm p-3.5 border border-[#E5E0D8] mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D2B1F] block mb-2">
                      Combo Includes:
                    </span>
                    <ul className="space-y-1.5">
                      {special.includes.map((inc, i) => (
                        <li key={i} className="text-xs text-[#3D2B1F] flex items-center gap-2">
                          <Check size={13} className="text-[#D4AF37] shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & Order Button */}
                <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7D6E63] block">Special Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-[#3D2B1F]">
                        ₹{special.discountedPrice}
                      </span>
                      <span className="text-xs text-[#7D6E63] line-through">
                        ₹{special.originalPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    id={`order-special-btn-${special.id}`}
                    onClick={() => onOrderSpecial(special)}
                    className="px-5 py-2.5 rounded-sm bg-[#D4AF37] hover:bg-[#E5C358] text-[#3D2B1F] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <ShoppingBag size={14} />
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
