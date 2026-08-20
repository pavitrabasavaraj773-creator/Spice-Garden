import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Interior', 'Exterior', 'Food', 'Chef', 'Dining'];

  const filteredGallery = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#FAF7F2] text-[#3D2B1F] relative border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <Sparkles size={14} /> Visual Showcase
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F] mt-2 mb-4">
            Ambiance & Culinary Moments
          </h2>
          <p className="text-sm sm:text-base text-[#7D6E63]">
            Take a look inside Spice Garden Restaurant — from our cozy dining spaces and lively kitchens to handcrafted gourmet presentations.
          </p>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" id="gallery-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-tab-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#3D2B1F] text-[#D4AF37] shadow-sm'
                  : 'bg-[#FFFFFF] text-[#3D2B1F] hover:bg-[#F5F2ED] hover:text-[#D4AF37] border border-[#E5E0D8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="gallery-image-grid">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => openLightbox(index)}
              className="relative group rounded-sm overflow-hidden bg-white border border-[#E5E0D8] cursor-pointer shadow-sm hover:border-[#D4AF37] transition-all duration-300 h-64"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/90 via-[#3D2B1F]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <span className="p-2 rounded-sm bg-[#3D2B1F]/90 text-[#D4AF37] border border-[#D4AF37]/50">
                    <Maximize2 size={16} />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D2B1F] bg-[#D4AF37] px-2 py-0.5 rounded-sm inline-block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#F5F5F0] mt-1 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#E5E0D8]/90 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-[#3D2B1F]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            id="lightbox-close-btn"
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-3 rounded-sm bg-[#2C1E15] border border-[#D4AF37]/40 text-[#F5F5F0] hover:text-[#D4AF37] transition-colors z-50 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>

          {/* Previous Button */}
          <button
            id="lightbox-prev-btn"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-[#2C1E15]/90 hover:bg-[#2C1E15] border border-[#D4AF37]/40 text-[#F5F5F0] hover:text-[#D4AF37] transition-colors z-50 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Button */}
          <button
            id="lightbox-next-btn"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-[#2C1E15]/90 hover:bg-[#2C1E15] border border-[#D4AF37]/40 text-[#F5F5F0] hover:text-[#D4AF37] transition-colors z-50 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Lightbox Main Container */}
          <div
            className="max-w-4xl w-full bg-[#3D2B1F] rounded-sm overflow-hidden border border-[#D4AF37]/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[70vh] bg-black/40 flex items-center justify-center overflow-hidden">
              <img
                src={filteredGallery[activeLightboxIndex].image}
                alt={filteredGallery[activeLightboxIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#3D2B1F] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[#F5F5F0]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3D2B1F] bg-[#D4AF37] px-2.5 py-0.5 rounded-sm">
                    {filteredGallery[activeLightboxIndex].category}
                  </span>
                  <span className="text-xs text-[#E5E0D8]/80">
                    {activeLightboxIndex + 1} of {filteredGallery.length}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#F5F5F0]">
                  {filteredGallery[activeLightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E5E0D8]/90 mt-1">
                  {filteredGallery[activeLightboxIndex].description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevImage}
                  className="px-3 py-1.5 rounded-sm bg-[#2C1E15] border border-[#D4AF37]/40 text-xs font-bold uppercase text-[#F5F5F0] hover:text-[#D4AF37] cursor-pointer"
                >
                  Prev
                </button>
                <button
                  onClick={nextImage}
                  className="px-3 py-1.5 rounded-sm bg-[#D4AF37] text-[#3D2B1F] text-xs font-bold uppercase hover:bg-[#E5C358] cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
