import React, { useState } from 'react';
import { UtensilsCrossed, MapPin, Phone, Mail, Clock, ArrowUp, Instagram, Facebook, MessageCircle, Heart, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer id="main-footer" className="bg-[#3D2B1F] text-[#F5F5F0] border-t border-[#4A382B] relative">
      {/* Newsletter / Loyalty Box */}
      <div className="border-b border-[#4A382B] bg-[#2C1E15] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] font-bold uppercase tracking-wider mb-1">
              <Sparkles size={14} /> Spice Garden VIP Club
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F5F0]">
              Get Exclusive Weekend Offers & Seasonal Menus
            </h3>
            <p className="text-xs sm:text-sm text-[#E5E0D8]/80 mt-1">
              Join 5,000+ food lovers in Hubballi. Never miss our Chef’s seasonal food festivals!
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="bg-[#3D2B1F] border border-[#D4AF37] px-4 py-2.5 rounded-sm text-[#D4AF37] text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Subscribed! Check your inbox for ₹100 welcome voucher.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md w-full">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2.5 bg-[#3D2B1F] border border-[#4A382B] focus:border-[#D4AF37] rounded-sm text-xs sm:text-sm text-[#F5F5F0] placeholder-[#E5E0D8]/60 focus:outline-none flex-1 min-w-0"
                />
                <button
                  type="submit"
                  id="newsletter-subscribe-btn"
                  className="px-5 py-2.5 rounded-sm bg-[#D4AF37] hover:bg-[#E5C358] text-[#3D2B1F] font-bold text-xs uppercase tracking-widest transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Send size={14} />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-sm bg-[#D4AF37] flex items-center justify-center text-[#3D2B1F] shadow-sm">
                <UtensilsCrossed size={20} className="stroke-[2.2]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#F5F5F0] block leading-none">
                  Spice Garden
                </span>
                <span className="text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase block mt-0.5">
                  Restaurant • Hubballi
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#E5E0D8]/80 leading-relaxed max-w-sm">
              "{RESTAURANT_INFO.tagline}" — Serving authentic North Indian, Tandoori, Dum Biryani, Indo-Chinese and gourmet desserts in the heart of Hubballi, Karnataka.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2" id="footer-social-icons">
              <a
                href={RESTAURANT_INFO.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-[#2C1E15] border border-[#4A382B] text-[#E5E0D8] hover:text-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Follow on Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href={RESTAURANT_INFO.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-[#2C1E15] border border-[#4A382B] text-[#E5E0D8] hover:text-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Follow on Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href={RESTAURANT_INFO.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-[#2C1E15] border border-[#4A382B] text-[#E5E0D8] hover:text-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-xs text-[#D4AF37] tracking-widest uppercase mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E5E0D8]/80">
              <li>
                <a href="#home" className="hover:text-[#D4AF37] transition-colors">Home Page</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us & Chef</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D4AF37] transition-colors">Full Multi-Cuisine Menu</a>
              </li>
              <li>
                <a href="#specials" className="hover:text-[#D4AF37] transition-colors">Today's Specials</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Ambiance Gallery</a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-[#D4AF37] transition-colors">Book a Table</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#D4AF37] transition-colors">Customer Reviews</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Cuisines & Specialities */}
          <div>
            <h4 className="font-serif font-bold text-xs text-[#D4AF37] tracking-widest uppercase mb-4">
              Our Specialities
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E5E0D8]/80">
              <li>North Indian Curries</li>
              <li>Clay Oven Tandoori Tikka</li>
              <li>Authentic Dum Biryanis</li>
              <li>Indo-Chinese Sizzlers</li>
              <li>Hand-tossed Naans & Rotis</li>
              <li>Warm Sizzling Desserts</li>
              <li>Special Event Catering</li>
            </ul>
          </div>

          {/* Col 5: Contact & Timings Summary */}
          <div>
            <h4 className="font-serif font-bold text-xs text-[#D4AF37] tracking-widest uppercase mb-4">
              Location & Hours
            </h4>
            <div className="space-y-3 text-xs text-[#E5E0D8]/80">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address.line1}, {RESTAURANT_INFO.address.city}, Karnataka {RESTAURANT_INFO.address.pincode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-[#D4AF37] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#D4AF37]">{RESTAURANT_INFO.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-[#D4AF37] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#D4AF37] truncate">{RESTAURANT_INFO.email}</a>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-[#4A382B]">
                <Clock size={15} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#F5F5F0] font-bold block">{RESTAURANT_INFO.hours.days}</span>
                  <span>{RESTAURANT_INFO.hours.timings}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-14 pt-8 border-t border-[#4A382B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5E0D8]/70">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved. Hubballi, Karnataka.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[#E5E0D8]/80">
              Crafted with <Heart size={13} className="text-[#D4AF37] fill-[#D4AF37]" /> for food lovers in Hubballi
            </span>

            {/* Back to top button */}
            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="p-2 rounded-sm bg-[#2C1E15] border border-[#4A382B] hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#3D2B1F] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Back to top"
            >
              <ArrowUp size={15} />
              <span className="hidden sm:inline font-bold uppercase text-[10px] tracking-wider">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
