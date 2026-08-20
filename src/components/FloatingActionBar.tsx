import React from 'react';
import { Phone, Utensils, Calendar, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FloatingActionBarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenMenu,
}) => {
  return (
    <div
      id="mobile-floating-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 border-t border-[#E5E0D8] backdrop-blur-md px-3 py-2 shadow-2xl"
    >
      <div className="grid grid-cols-4 gap-2">
        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="flex flex-col items-center justify-center p-1.5 rounded-sm bg-[#FFFFFF] border border-[#E5E0D8] text-[#7D6E63] hover:text-[#3D2B1F] transition-colors"
        >
          <Phone size={16} />
          <span className="text-[10px] font-bold mt-0.5 uppercase tracking-wider">Call</span>
        </a>

        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center p-1.5 rounded-sm bg-[#FFFFFF] border border-[#E5E0D8] text-[#7D6E63] hover:text-[#3D2B1F] transition-colors cursor-pointer"
        >
          <Utensils size={16} />
          <span className="text-[10px] font-bold mt-0.5 uppercase tracking-wider">Menu</span>
        </button>

        <button
          onClick={onOpenReservation}
          className="flex flex-col items-center justify-center p-1.5 rounded-sm bg-[#FFFFFF] border border-[#E5E0D8] text-[#7D6E63] hover:text-[#3D2B1F] transition-colors cursor-pointer"
        >
          <Calendar size={16} />
          <span className="text-[10px] font-bold mt-0.5 uppercase tracking-wider">Reserve</span>
        </button>

        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center p-1.5 rounded-sm bg-[#D4AF37] hover:bg-[#E5C358] text-[#3D2B1F] font-bold shadow-sm cursor-pointer"
        >
          <ShoppingBag size={16} />
          <span className="text-[10px] font-bold mt-0.5 uppercase tracking-wider">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1 bg-[#3D2B1F] text-[#D4AF37] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-[#FFFFFF]">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
