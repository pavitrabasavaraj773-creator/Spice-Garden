import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Phone, UtensilsCrossed, Calendar, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenReservation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'menu', 'specials', 'gallery', 'reservation', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: "Today's Specials", href: '#specials', id: 'specials' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Reservations', href: '#reservation', id: 'reservation' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div id="top-announcement-bar" className="bg-[#2C1E15] border-b border-[#4A382B] text-xs text-[#E5E0D8] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#D4AF37] font-medium">
              <MapPin size={13} /> {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} • {RESTAURANT_INFO.address.line1}
            </span>
            <span className="text-[#E5E0D8]/80 text-[11px] uppercase tracking-wider">🕒 Mon–Sun: 11:00 AM – 10:30 PM</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors text-[11px] uppercase tracking-wider">
              <Phone size={12} className="text-[#D4AF37]" /> Call: {RESTAURANT_INFO.phone}
            </a>
            <span className="text-[#3D2B1F] font-bold bg-[#D4AF37] px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-widest">
              Multi-Cuisine Dining
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 bg-[#3D2B1F] text-[#F5F5F0] border-b-4 border-[#D4AF37] transition-all duration-200 ${
          isScrolled ? 'py-3 shadow-xl' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group cursor-pointer"
            id="brand-logo-link"
          >
            <div className="w-10 h-10 rounded-sm bg-[#D4AF37] flex items-center justify-center text-[#3D2B1F] shadow-sm group-hover:scale-105 transition-transform font-bold">
              <UtensilsCrossed size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#D4AF37] uppercase leading-none">
                Spice Garden
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#E5E0D8]/80 mt-1">
                Hubballi, Karnataka
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold uppercase tracking-wider" id="desktop-nav-menu">
            {navLinks.map((link) => (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`py-1 transition-all ${
                  activeSection === link.id
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                    : 'text-[#F5F5F0]/90 hover:text-[#D4AF37]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Shopping Cart Button */}
            <button
              id="cart-trigger-button"
              onClick={onOpenCart}
              aria-label="View shopping cart"
              className="relative px-3 py-2 rounded-sm bg-[#2C1E15] hover:bg-[#4A382B] border border-[#D4AF37]/50 text-[#F5F5F0] hover:text-[#D4AF37] transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <>
                  <span className="bg-[#D4AF37] text-[#3D2B1F] text-[10px] font-extrabold px-1.5 py-0.2 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                  <span className="hidden sm:inline text-xs font-bold text-[#D4AF37]">
                    ₹{cartTotal}
                  </span>
                </>
              )}
            </button>

            {/* Book a Table CTA (Desktop) */}
            <button
              id="header-book-table-btn"
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#D4AF37] hover:text-[#3D2B1F] transition-all cursor-pointer"
            >
              <Calendar size={14} />
              <span>Book Table</span>
            </button>

            {/* Order Online CTA */}
            <button
              id="header-order-online-btn"
              onClick={onOpenCart}
              className="hidden md:inline-flex items-center px-4 py-2 bg-[#D4AF37] text-[#3D2B1F] text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#E5C358] transition-all cursor-pointer shadow-sm"
            >
              <span>Order Online</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm bg-[#2C1E15] border border-[#4A382B] text-[#F5F5F0] hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden mt-3 px-6 py-5 bg-[#2C1E15] border-t border-[#4A382B] shadow-2xl animate-in slide-in-from-top duration-200"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#3D2B1F] text-[#D4AF37] border-l-2 border-[#D4AF37]'
                      : 'text-[#F5F5F0]/85 hover:text-[#D4AF37]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#4A382B] flex flex-col gap-2.5">
              <button
                id="mobile-menu-reserve-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-2.5 rounded-sm bg-[#D4AF37] text-[#3D2B1F] font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar size={16} />
                <span>Book a Table Online</span>
              </button>

              <a
                id="mobile-menu-call-btn"
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full py-2 rounded-sm bg-[#3D2B1F] border border-[#D4AF37]/50 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
              >
                <Phone size={14} className="text-[#D4AF37]" />
                <span>Call {RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
