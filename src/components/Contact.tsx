import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Navigation, Sparkles, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Contact: React.FC = () => {
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name.trim() || !inquiryForm.message.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryForm({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF7F2] text-[#3D2B1F] relative border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <Sparkles size={14} /> Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F] mt-2 mb-4">
            Visit Us in Hubballi
          </h2>
          <p className="text-sm sm:text-base text-[#7D6E63]">
            We look forward to welcoming you for an extraordinary multi-cuisine feast. Feel free to contact our team for bookings, catering inquiries, or feedback.
          </p>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Contact Grid: Info Cards & Google Map / Inquiry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm p-5 hover:border-[#D4AF37] transition-colors shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-[#FAF7F2] text-[#D4AF37] shrink-0 border border-[#E5E0D8]">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#3D2B1F] mb-1">
                    Restaurant Address
                  </h4>
                  <p className="text-xs sm:text-sm text-[#7D6E63] leading-relaxed">
                    {RESTAURANT_INFO.name} <br />
                    {RESTAURANT_INFO.address.line1} <br />
                    {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} – {RESTAURANT_INFO.address.pincode}
                  </p>
                  <p className="text-[11px] text-[#D4AF37] mt-1 font-bold">
                    Landmark: {RESTAURANT_INFO.address.landmark}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm p-5 hover:border-[#D4AF37] transition-colors shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-[#FAF7F2] text-[#D4AF37] shrink-0 border border-[#E5E0D8]">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#3D2B1F] mb-1">
                    Phone & WhatsApp
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p>
                      <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#3D2B1F] hover:text-[#D4AF37] font-semibold transition-colors">
                        {RESTAURANT_INFO.phone} (Front Desk)
                      </a>
                    </p>
                    <p>
                      <a href={`tel:${RESTAURANT_INFO.secondaryPhone}`} className="text-[#7D6E63] hover:text-[#D4AF37] transition-colors">
                        {RESTAURANT_INFO.secondaryPhone} (Takeaway & Events)
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm p-5 hover:border-[#D4AF37] transition-colors shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-[#FAF7F2] text-[#D4AF37] shrink-0 border border-[#E5E0D8]">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#3D2B1F] mb-1">
                    Email Inquiries
                  </h4>
                  <p className="text-xs sm:text-sm">
                    <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-[#3D2B1F] hover:text-[#D4AF37] transition-colors">
                      {RESTAURANT_INFO.email}
                    </a>
                  </p>
                  <p className="text-xs sm:text-sm text-[#7D6E63] mt-0.5">
                    Reservations: {RESTAURANT_INFO.reservationEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm p-5 hover:border-[#D4AF37] transition-colors shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-[#FAF7F2] text-[#D4AF37] shrink-0 border border-[#E5E0D8]">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#3D2B1F] mb-1">
                    Opening Hours
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-[#D4AF37]">
                    {RESTAURANT_INFO.hours.days}: {RESTAURANT_INFO.hours.timings}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#7D6E63] mt-2">
                    <div>
                      <span className="block text-[#3D2B1F] font-bold">Lunch Service</span>
                      <span>{RESTAURANT_INFO.hours.lunch}</span>
                    </div>
                    <div>
                      <span className="block text-[#3D2B1F] font-bold">Dinner Service</span>
                      <span>{RESTAURANT_INFO.hours.dinner}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-sm bg-[#3D2B1F] text-[#FAF7F2] hover:bg-[#2C1E15] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <MessageCircle size={16} className="text-[#D4AF37]" />
                <span>Chat WhatsApp</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="py-3 px-4 rounded-sm bg-[#FAF7F2] border border-[#E5E0D8] hover:border-[#D4AF37] text-[#3D2B1F] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <Phone size={16} className="text-[#D4AF37]" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Placeholder & Send Message Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Styled Google Maps Location Placeholder */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm overflow-hidden shadow-sm">
              <div className="p-4 bg-[#FAF7F2] border-b border-[#E5E0D8] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3D2B1F]">
                  <MapPin size={15} className="text-[#D4AF37]" />
                  <span>Spice Garden Restaurant • Hubballi</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Hubballi+Karnataka"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#D4AF37] hover:underline font-bold uppercase tracking-wider"
                >
                  <Navigation size={12} />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Map Canvas Visual Placeholder */}
              <div className="relative h-60 w-full bg-[#FAF7F2] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&auto=format&fit=crop&q=80"
                  alt="Hubballi city road map area"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/80 via-transparent to-black/20" />

                {/* Map Pin Landmark Card */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="bg-[#3D2B1F] border border-[#D4AF37] p-4 rounded-sm shadow-xl max-w-xs text-center text-[#F5F5F0]">
                    <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#3D2B1F] flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <MapPin size={18} className="fill-[#3D2B1F]" />
                    </div>
                    <h5 className="font-serif font-bold text-sm text-[#F5F5F0]">Spice Garden Restaurant</h5>
                    <p className="text-[11px] text-[#E5E0D8]/80 mt-0.5">Gokul Road, Near New Bus Stand, Hubballi</p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 bg-[#2C1E15] text-[#D4AF37] text-[10px] font-bold rounded-sm border border-[#4A382B]">
                      ⭐ 4.8 Rating (1.2k+ reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#3D2B1F] mb-1">
                Send Us a Quick Message
              </h3>
              <p className="text-xs text-[#7D6E63] mb-5">
                Have questions about bulk catering, party bookings, or private halls? Send us a note.
              </p>

              {submitted ? (
                <div className="bg-[#FAF7F2] border border-[#D4AF37] rounded-sm p-5 text-center space-y-2">
                  <CheckCircle2 size={32} className="text-[#D4AF37] mx-auto" />
                  <h4 className="font-serif font-bold text-[#3D2B1F]">Message Sent Successfully!</h4>
                  <p className="text-xs text-[#7D6E63]">
                    Thank you for reaching out. Our manager will reply to your phone/email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inq-name" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1">Your Name *</label>
                      <input
                        id="inq-name"
                        type="text"
                        required
                        placeholder="e.g. Anand"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5E0D8] rounded-sm text-xs text-[#3D2B1F] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label htmlFor="inq-phone" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1">Phone Number</label>
                      <input
                        id="inq-phone"
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5E0D8] rounded-sm text-xs text-[#3D2B1F] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inq-email" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1">Email Address</label>
                    <input
                      id="inq-email"
                      type="email"
                      placeholder="e.g. anand@gmail.com"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5E0D8] rounded-sm text-xs text-[#3D2B1F] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label htmlFor="inq-message" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1">Your Message *</label>
                    <textarea
                      id="inq-message"
                      required
                      rows={3}
                      placeholder="Write your catering requirement, celebration query, or feedback..."
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E5E0D8] rounded-sm text-xs text-[#3D2B1F] focus:outline-none focus:border-[#D4AF37] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full py-2.5 rounded-sm bg-[#D4AF37] text-[#3D2B1F] font-bold text-xs uppercase tracking-widest hover:bg-[#E5C358] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Send size={15} />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
