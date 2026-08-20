import React from 'react';
import { ChefHat, Leaf, Sparkles, Award, Users, CheckCircle2, Quote } from 'lucide-react';
import { CHEF_INFO } from '../data/restaurantData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#FAF7F2] text-[#3D2B1F] relative overflow-hidden border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <Sparkles size={14} /> Our Heritage & Vision
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F] mt-2 mb-4">
            Passionate About Authentic Taste & Warm Hospitality
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {/* Story & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Visual Story Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-sm overflow-hidden border border-[#E5E0D8] shadow-md bg-white">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80"
                alt="Spice Garden Restaurant elegant interior and dining ambiance in Hubballi"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/80 via-transparent to-transparent" />
              
              {/* Floating Experience Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#3D2B1F] border border-[#D4AF37] p-4 rounded-sm text-[#F5F5F0] flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#D4AF37] text-[#3D2B1F] flex items-center justify-center font-bold">
                    <Award size={22} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#D4AF37] uppercase tracking-wide">Hubballi's Culinary Pride</h4>
                    <p className="text-xs text-[#E5E0D8]/80">Ranked Top Multi-Cuisine Dining Destination</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-[#D4AF37] font-serif font-bold text-lg">20+</span>
                  <p className="text-[10px] uppercase tracking-wider text-[#E5E0D8]/80">Years Legacy</p>
                </div>
              </div>
            </div>

            {/* Accent image box */}
            <div className="hidden sm:block absolute -bottom-5 -right-5 w-40 h-40 rounded-sm overflow-hidden border-2 border-[#D4AF37] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=80"
                alt="Fresh Paneer Tikka roasted in clay oven"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Story & Commitments */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D2B1F] mb-3">
                Where Tradition Meets Modern Gastronomy
              </h3>
              <p className="text-sm sm:text-base text-[#7D6E63] leading-relaxed">
                Founded with a dream to bring unforgettable dining memories to the heart of Hubballi, <strong className="text-[#3D2B1F]">Spice Garden Restaurant</strong> has grown into the city’s favorite destination for families, foodies, university students, and business gatherings.
              </p>
              <p className="text-sm sm:text-base text-[#7D6E63] leading-relaxed mt-3">
                Our kitchen balances time-honored Indian recipes with modern flair — offering flavorful North Indian curries, aromatic slow-cooked Dum Biryanis, sizzling clay oven tandoor starters, Indo-Chinese wok specialties, and indulgent desserts.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#FFFFFF] p-4 rounded-sm border border-[#E5E0D8] shadow-sm">
                <div className="flex items-center gap-2 text-[#3D2B1F] font-bold text-xs uppercase tracking-wider mb-1.5">
                  <Leaf size={16} className="text-[#D4AF37]" />
                  <span>Fresh & Pure Ingredients</span>
                </div>
                <p className="text-xs text-[#7D6E63] leading-relaxed">
                  Zero artificial colors or chemical preservatives. Only pure desi ghee, premium spices, and daily farm harvests.
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-4 rounded-sm border border-[#E5E0D8] shadow-sm">
                <div className="flex items-center gap-2 text-[#3D2B1F] font-bold text-xs uppercase tracking-wider mb-1.5">
                  <Users size={16} className="text-[#D4AF37]" />
                  <span>Family-First Ambience</span>
                </div>
                <p className="text-xs text-[#7D6E63] leading-relaxed">
                  Immaculate air-conditioned seating, high chairs for toddlers, spacious family banquet areas, and wheelchair accessibility.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5 pt-2">
              {[
                'Strict kitchen hygiene, open prep zones & sanitization protocols',
                'Dedicated separate vegetarian preparation utensils and counters',
                'Custom spice customization: mild for kids to authentic spicy for connoisseurs',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#3D2B1F] font-medium">
                  <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chef Section */}
        <div id="chef-spotlight" className="bg-[#3D2B1F] text-[#F5F5F0] rounded-sm border border-[#4A382B] p-6 sm:p-10 shadow-xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl">
                  <img
                    src={CHEF_INFO.image}
                    alt={CHEF_INFO.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-1 right-1 bg-[#D4AF37] p-2.5 rounded-full text-[#3D2B1F] shadow-lg">
                  <ChefHat size={22} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#2C1E15] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                <Sparkles size={13} /> Master Chef Spotlight
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F0]">
                {CHEF_INFO.name}
              </h3>
              <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                {CHEF_INFO.role} • {CHEF_INFO.experience}
              </p>
              <p className="text-xs sm:text-sm text-[#E5E0D8]/90 leading-relaxed">
                {CHEF_INFO.bio}
              </p>

              {/* Quote */}
              <div className="bg-[#2C1E15] p-4 rounded-sm border-l-4 border-[#D4AF37] flex items-start gap-3 mt-4">
                <Quote size={22} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#E5E0D8] italic font-serif leading-relaxed">
                  "{CHEF_INFO.quote}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
