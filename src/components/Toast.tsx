import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  onViewCart?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, onViewCart }) => {
  if (!isVisible) return null;

  return (
    <div
      id="app-toast-notification"
      className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm p-4 shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 max-w-sm"
    >
      <div className="p-2 rounded-sm bg-[#FAF7F2] text-[#D4AF37] border border-[#E5E0D8] shrink-0">
        <CheckCircle2 size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-semibold text-[#3D2B1F] leading-tight">
          {message}
        </p>
      </div>

      {onViewCart && (
        <button
          onClick={onViewCart}
          className="px-2.5 py-1 rounded-sm bg-[#D4AF37] hover:bg-[#E5C358] text-[#3D2B1F] text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
        >
          View Cart
        </button>
      )}

      <button
        onClick={onClose}
        className="text-[#7D6E63] hover:text-[#3D2B1F] p-1 transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};
