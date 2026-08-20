import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Check, Flame, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, CuisineCategory, FoodType } from '../types';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemQuantities: Record<string, number>;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

export const Menu: React.FC<MenuProps> = ({
  onAddToCart,
  cartItemQuantities,
  onUpdateQuantity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CuisineCategory>('All');
  const [selectedDiet, setSelectedDiet] = useState<'all' | FoodType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CuisineCategory[] = ['All', 'Starters', 'Main Course', 'Desserts', 'Breads & Rice'];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      // Diet filter
      const matchesDiet = selectedDiet === 'all' || item.type === selectedDiet;
      // Search filter
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDiet && matchesSearch;
    });
  }, [selectedCategory, selectedDiet, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#FAF7F2] text-[#3D2B1F] relative border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <Sparkles size={14} /> Handcrafted Delicacies
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F] mt-2 mb-4">
            Explore Our Multi-Cuisine Menu
          </h2>
          <p className="text-sm sm:text-base text-[#7D6E63]">
            From fiery tandoori appetizers and fragrant dum biryanis to decadent warm desserts, every dish is prepared fresh to order.
          </p>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Filter Bar: Categories, Diet Toggle & Search */}
        <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-sm border border-[#E5E0D8] mb-10 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto" id="menu-category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`cat-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#3D2B1F] text-[#D4AF37] shadow-sm'
                      : 'bg-[#FAF7F2] text-[#3D2B1F] hover:bg-[#F5F2ED] hover:text-[#D4AF37] border border-[#E5E0D8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Diet Switcher (Veg / Non-Veg / All) & Search */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
              {/* Veg / Non-veg pills */}
              <div className="flex items-center bg-[#FAF7F2] border border-[#E5E0D8] p-1 rounded-sm shrink-0">
                <button
                  id="filter-diet-all"
                  onClick={() => setSelectedDiet('all')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors ${
                    selectedDiet === 'all'
                      ? 'bg-[#3D2B1F] text-[#D4AF37]'
                      : 'text-[#7D6E63] hover:text-[#3D2B1F]'
                  }`}
                >
                  All
                </button>
                <button
                  id="filter-diet-veg"
                  onClick={() => setSelectedDiet('veg')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                    selectedDiet === 'veg'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'text-[#7D6E63] hover:text-green-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-green-600 inline-block"></span>
                  Veg
                </button>
                <button
                  id="filter-diet-non-veg"
                  onClick={() => setSelectedDiet('non-veg')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                    selectedDiet === 'non-veg'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'text-[#7D6E63] hover:text-red-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
                  Non-Veg
                </button>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-60">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7D6E63]" />
                <input
                  id="menu-search-input"
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E5E0D8] rounded-sm text-xs sm:text-sm text-[#3D2B1F] placeholder-[#7D6E63] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="menu-items-grid">
            {filteredItems.map((item) => {
              const qty = cartItemQuantities[item.id] || 0;

              return (
                <div
                  key={item.id}
                  id={`menu-card-${item.id}`}
                  className="bg-[#FFFFFF] rounded-sm border border-[#E5E0D8] hover:border-[#D4AF37] transition-all duration-300 overflow-hidden group shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  {/* Card Header & Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Veg / Non-Veg Indicator */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-sm border border-[#E5E0D8] flex items-center gap-1.5 shadow-sm">
                      <div
                        className={`w-3 h-3 border flex items-center justify-center ${
                          item.type === 'veg' ? 'border-green-600' : 'border-red-600'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.type === 'veg' ? 'bg-green-600' : 'bg-red-600'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D2B1F]">
                        {item.type}
                      </span>
                    </div>

                    {/* Badges (Chef Special / Popular) */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                      {item.isChefSpecial && (
                        <span className="px-2 py-0.5 rounded-sm bg-[#D4AF37] text-[#3D2B1F] text-[10px] font-extrabold tracking-wider uppercase shadow-sm flex items-center gap-1">
                          <Sparkles size={11} /> Chef's Pick
                        </span>
                      )}
                      {item.isPopular && !item.isChefSpecial && (
                        <span className="px-2 py-0.5 rounded-sm bg-[#3D2B1F] text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase shadow-sm">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Prep time badge */}
                    {item.preparationTime && (
                      <div className="absolute bottom-2 right-3 text-[11px] text-white font-medium bg-[#3D2B1F]/80 px-2 py-0.5 rounded-sm flex items-center gap-1">
                        <Clock size={12} className="text-[#D4AF37]" />
                        <span>{item.preparationTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-serif text-lg font-bold text-[#3D2B1F] group-hover:text-[#D4AF37] transition-colors">
                          {item.name}
                        </h3>
                        {item.spiceLevel && (
                          <div className="flex items-center text-red-500 text-xs shrink-0" title={`Spice Level: ${item.spiceLevel}/3`}>
                            {Array.from({ length: item.spiceLevel }).map((_, i) => (
                              <Flame key={i} size={14} className="fill-red-500" />
                            ))}
                          </div>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-[#7D6E63] line-clamp-2 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Quantity / Add To Cart Controller */}
                    <div className="pt-3 border-t border-[#E5E0D8] flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-xl font-bold text-[#3D2B1F]">
                            ₹{item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-[#7D6E63] line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                        {item.calories && (
                          <span className="text-[10px] text-[#7D6E63] block">
                            {item.calories}
                          </span>
                        )}
                      </div>

                      {qty === 0 ? (
                        <button
                          id={`add-to-cart-btn-${item.id}`}
                          onClick={() => onAddToCart(item)}
                          className="px-4 py-2 rounded-sm bg-[#D4AF37] hover:bg-[#E5C358] text-[#3D2B1F] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Plus size={14} />
                          <span>Add to Cart</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#D4AF37] p-1 rounded-sm">
                          <button
                            id={`qty-minus-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-sm bg-white border border-[#E5E0D8] text-[#3D2B1F] hover:bg-[#F5F2ED] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="text-xs font-bold text-[#3D2B1F] min-w-[20px] text-center">
                            {qty}
                          </span>
                          <button
                            id={`qty-plus-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-sm bg-[#D4AF37] text-[#3D2B1F] hover:bg-[#E5C358] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-sm border border-[#E5E0D8] p-8 max-w-lg mx-auto shadow-sm">
            <AlertCircle size={36} className="text-[#D4AF37] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#3D2B1F] mb-1">No Dishes Found</h3>
            <p className="text-xs sm:text-sm text-[#7D6E63] mb-4">
              We couldn't find any dishes matching "{searchQuery}". Try selecting another category or dietary filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDiet('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-sm bg-[#3D2B1F] text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:bg-[#2C1E15]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
