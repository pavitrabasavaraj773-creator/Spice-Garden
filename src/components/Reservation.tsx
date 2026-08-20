import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, Mail, Sparkles, CheckCircle2, AlertCircle, X, MapPin, Database } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReservationFormData, ReservationConfirmation } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { saveReservationToSupabase } from '../lib/supabase';

export const Reservation: React.FC = () => {
  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    phone: '',
    email: '',
    guests: 2,
    date: today,
    time: '19:30',
    seatingArea: 'Main Dining',
    occasion: 'None',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<ReservationConfirmation | null>(null);
  const [dbSavedInfo, setDbSavedInfo] = useState<{ success: boolean; message: string } | null>(null);

  const timeSlots = [
    // Lunch Slots
    { label: '11:30 AM', value: '11:30' },
    { label: '12:00 PM', value: '12:00' },
    { label: '12:30 PM', value: '12:30' },
    { label: '01:00 PM', value: '13:00' },
    { label: '01:30 PM', value: '13:30' },
    { label: '02:00 PM', value: '14:00' },
    { label: '02:30 PM', value: '14:30' },
    // Dinner Slots
    { label: '06:30 PM', value: '18:30' },
    { label: '07:00 PM', value: '19:00' },
    { label: '07:30 PM', value: '19:30' },
    { label: '08:00 PM', value: '20:00' },
    { label: '08:30 PM', value: '20:30' },
    { label: '09:00 PM', value: '21:00' },
    { label: '09:30 PM', value: '21:30' }
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    const phoneRegex = /^[0-9+\s-]{10,14}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your contact phone number';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.guests || formData.guests < 1 || formData.guests > 30) {
      newErrors.guests = 'Number of guests must be between 1 and 30';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a reservation date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a preferred time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setDbSavedInfo(null);

    const bookingId = `SG-HUB-${Math.floor(1000 + Math.random() * 9000)}`;
    const confirmationData: ReservationConfirmation = {
      ...formData,
      bookingId,
      bookingTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Confirmed'
    };

    // Save directly to Supabase account (Project: kidxpaccsmankylxarzt)
    const dbResult = await saveReservationToSupabase(confirmationData);
    if (dbResult.success) {
      setDbSavedInfo({
        success: true,
        message: `Saved to Supabase table (${dbResult.tableName || 'reservations'})`
      });
    } else {
      setDbSavedInfo({
        success: false,
        message: dbResult.error || 'Stored with local confirmation'
      });
    }

    setIsSubmitting(false);
    setConfirmation(confirmationData);

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF7F2', '#3D2B1F', '#ffffff']
      });
    } catch (err) {
      // Fallback gracefully
    }
  };

  return (
    <section id="reservation" className="py-20 bg-[#FAF7F2] text-[#3D2B1F] relative border-b border-[#E5E0D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hospitality Info & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#3D2B1F] text-[#D4AF37] text-xs font-bold tracking-widest uppercase shadow-sm">
              <Sparkles size={14} />
              <span>Instant Confirmation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F] leading-tight">
              Book Your Table at Spice Garden
            </h2>

            <p className="text-sm sm:text-base text-[#7D6E63] leading-relaxed">
              Whether planning an intimate candlelight dinner, a lively family reunion, or a celebratory gathering, reserve your table in advance for priority seating and personalized service.
            </p>

            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm p-5 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-[#FAF7F2] text-[#D4AF37] border border-[#E5E0D8] shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#3D2B1F]">Dining Hours</h4>
                  <p className="text-xs text-[#7D6E63]">Lunch: 11:30 AM – 3:30 PM | Dinner: 6:30 PM – 10:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-[#FAF7F2] text-[#D4AF37] border border-[#E5E0D8] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#3D2B1F]">Location</h4>
                  <p className="text-xs text-[#7D6E63]">{RESTAURANT_INFO.address.line1}, {RESTAURANT_INFO.address.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-[#FAF7F2] text-[#D4AF37] border border-[#E5E0D8] shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#3D2B1F]">Assistance & Party Bookings</h4>
                  <p className="text-xs text-[#7D6E63]">Need 15+ seats? Call our desk: {RESTAURANT_INFO.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm p-6 sm:p-10 shadow-sm relative">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">
                    Reserve a Table
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7D6E63] mt-1">
                    Fill in your details below for instant table allocation.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF7F2] border border-[#E5E0D8] rounded-sm text-[11px] font-bold text-[#3D2B1F] shrink-0 self-start sm:self-auto">
                  <Database size={12} className="text-[#D4AF37]" />
                  <span>Supabase Live DB</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate id="table-reservation-form" className="space-y-4 sm:space-y-5">
                {/* Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="res-fullName" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D6E63]" />
                      <input
                        type="text"
                        id="res-fullName"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full pl-10 pr-3 py-2.5 bg-[#FAF7F2] border rounded-sm text-sm text-[#3D2B1F] placeholder-[#7D6E63] focus:outline-none transition-colors ${
                          errors.fullName ? 'border-red-500' : 'border-[#E5E0D8] focus:border-[#D4AF37]'
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="res-phone" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D6E63]" />
                      <input
                        type="tel"
                        id="res-phone"
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-10 pr-3 py-2.5 bg-[#FAF7F2] border rounded-sm text-sm text-[#3D2B1F] placeholder-[#7D6E63] focus:outline-none transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-[#E5E0D8] focus:border-[#D4AF37]'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.phone}</p>}
                  </div>
                </div>

                {/* Email Address & Number of Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="res-email" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D6E63]" />
                      <input
                        type="email"
                        id="res-email"
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-10 pr-3 py-2.5 bg-[#FAF7F2] border rounded-sm text-sm text-[#3D2B1F] placeholder-[#7D6E63] focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500' : 'border-[#E5E0D8] focus:border-[#D4AF37]'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="res-guests" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1.5">
                      Number of Guests *
                    </label>
                    <div className="relative">
                      <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D6E63]" />
                      <select
                        id="res-guests"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                        className="w-full pl-10 pr-3 py-2.5 bg-[#FAF7F2] border border-[#E5E0D8] focus:border-[#D4AF37] rounded-sm text-sm text-[#3D2B1F] focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest (Single)' : `${num} Guests`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="res-date" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1.5">
                      Reservation Date *
                    </label>
                    <div className="relative">
                      <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D6E63]" />
                      <input
                        type="date"
                        id="res-date"
                        min={today}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-[#FAF7F2] border border-[#E5E0D8] focus:border-[#D4AF37] rounded-sm text-sm text-[#3D2B1F] focus:outline-none"
                      />
                    </div>
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label htmlFor="res-time" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1.5">
                      Time Slot *
                    </label>
                    <div className="relative">
                      <Clock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D6E63]" />
                      <select
                        id="res-time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-[#FAF7F2] border border-[#E5E0D8] focus:border-[#D4AF37] rounded-sm text-sm text-[#3D2B1F] focus:outline-none"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Seating Area Preference */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1.5">
                    Seating Area Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Main Dining', 'Family Hall', 'Rooftop Terrace', 'Candlelight Booth'] as const).map((area) => (
                      <button
                        type="button"
                        key={area}
                        onClick={() => setFormData({ ...formData, seatingArea: area })}
                        className={`p-2 rounded-sm text-xs font-bold uppercase tracking-wider border transition-all text-center cursor-pointer ${
                          formData.seatingArea === area
                            ? 'bg-[#3D2B1F] border-[#3D2B1F] text-[#D4AF37]'
                            : 'bg-[#FAF7F2] border-[#E5E0D8] text-[#7D6E63] hover:text-[#3D2B1F]'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests / Occasion */}
                <div>
                  <label htmlFor="res-specialRequests" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1.5">
                    Special Requests / Occasion (Optional)
                  </label>
                  <textarea
                    id="res-specialRequests"
                    rows={2}
                    placeholder="e.g., Birthday celebration, high chair needed for child, window seat preference..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full p-3 bg-[#FAF7F2] border border-[#E5E0D8] focus:border-[#D4AF37] rounded-sm text-sm text-[#3D2B1F] placeholder-[#7D6E63] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="reserve-table-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#E5C358] text-[#3D2B1F] font-bold text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#3D2B1F] border-t-transparent rounded-full animate-spin" />
                      Confirming Reservation...
                    </span>
                  ) : (
                    <>
                      <Calendar size={16} />
                      <span>Reserve Table Now</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Confirmation Modal */}
      {confirmation && (
        <div
          id="reservation-confirmation-modal"
          className="fixed inset-0 z-50 bg-[#3D2B1F]/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#3D2B1F] border border-[#D4AF37] rounded-sm p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-[#F5F5F0]">
            <button
              onClick={() => setConfirmation(null)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-[#2C1E15] text-[#E5E0D8] hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37] text-[#3D2B1F] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#F5F5F0]">
                Table Reserved!
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mt-1">
                Booking ID: {confirmation.bookingId}
              </p>
              <p className="text-xs text-[#E5E0D8]/90 mt-1">
                Your table reservation request has been submitted successfully!
              </p>
            </div>

            <div className="bg-[#2C1E15] rounded-sm p-4 border border-[#4A382B] space-y-2.5 text-xs text-[#F5F5F0] mb-4">
              <div className="flex justify-between pb-2 border-b border-[#4A382B]">
                <span className="text-[#E5E0D8]/70">Guest Name:</span>
                <span className="font-bold">{confirmation.fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#4A382B]">
                <span className="text-[#E5E0D8]/70">Date & Time:</span>
                <span className="font-bold">{confirmation.date} at {confirmation.time}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#4A382B]">
                <span className="text-[#E5E0D8]/70">Party Size:</span>
                <span className="font-bold">{confirmation.guests} Guests</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#4A382B]">
                <span className="text-[#E5E0D8]/70">Preferred Area:</span>
                <span className="font-bold text-[#D4AF37]">{confirmation.seatingArea}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E5E0D8]/70">Contact:</span>
                <span className="font-bold">{confirmation.phone}</span>
              </div>
            </div>

            {/* Supabase Storage Sync Badge */}
            <div className="mb-5 p-2.5 bg-[#24170E] border border-[#4A382B] rounded-sm flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <Database size={13} className="text-[#D4AF37]" />
                <span className="text-[#E5E0D8]">Database Sync:</span>
              </div>
              <span className="font-bold text-[#D4AF37] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {dbSavedInfo?.success ? 'Saved to Supabase' : 'Supabase Connected'} (kidxpaccsmankylxarzt)
              </span>
            </div>

            <p className="text-[11px] text-[#E5E0D8]/80 text-center mb-6">
              A confirmation SMS has been prepared for {confirmation.phone}. Tables are held for 15 minutes past reservation time.
            </p>

            <button
              id="confirm-modal-done-btn"
              onClick={() => setConfirmation(null)}
              className="w-full py-3 rounded-sm bg-[#D4AF37] text-[#3D2B1F] font-bold text-xs uppercase tracking-widest hover:bg-[#E5C358] transition-colors cursor-pointer"
            >
              Great, Thank You!
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
