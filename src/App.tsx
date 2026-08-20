import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Menu } from './components/Menu';
import { Specials } from './components/Specials';
import { Gallery } from './components/Gallery';
import { Reservation } from './components/Reservation';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingActionBar } from './components/FloatingActionBar';
import { Toast } from './components/Toast';
import { MenuItem, SpecialOffer, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  // Calculate total cart items count
  const cartCount = useMemo(() => {
    return cartItems.reduce((total, ci) => total + ci.quantity, 0);
  }, [cartItems]);

  // Calculate total price
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, ci) => {
      const price = 'discountedPrice' in ci.item ? ci.item.discountedPrice : ci.item.price;
      return total + price * ci.quantity;
    }, 0);
  }, [cartItems]);

  // Map item ID to its current quantity in the cart for easy menu lookup
  const cartItemQuantities = useMemo(() => {
    const quantities: Record<string, number> = {};
    for (const ci of cartItems) {
      quantities[ci.item.id] = ci.quantity;
    }
    return quantities;
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastInfo({ message, visible: true });
    setTimeout(() => {
      setToastInfo((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  const handleAddToCart = (item: MenuItem | SpecialOffer) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`Added "${item.name}" to cart!`);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3D2B1F] flex flex-col justify-between selection:bg-[#D4AF37] selection:text-[#3D2B1F]">
      {/* Navigation Bar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservation')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onViewMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('reservation')}
        />

        {/* 2. About Section */}
        <About />

        {/* 3. Menu Section */}
        <Menu
          onAddToCart={handleAddToCart}
          cartItemQuantities={cartItemQuantities}
          onUpdateQuantity={handleUpdateQuantity}
        />

        {/* 4. Special Offers Section */}
        <Specials
          onOrderSpecial={(special) => {
            handleAddToCart(special);
            setIsCartOpen(true);
          }}
        />

        {/* 5. Gallery Section */}
        <Gallery />

        {/* 6. Table Reservation Section */}
        <Reservation />

        {/* 7. Customer Reviews Section */}
        <Reviews />

        {/* 8. Contact & Location Section */}
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Slide-out Shopping Cart & Online Ordering Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenMenu={() => scrollToSection('menu')}
      />

      {/* Mobile Floating Action Bar */}
      <FloatingActionBar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservation')}
        onOpenMenu={() => scrollToSection('menu')}
      />

      {/* Interactive Toast Notifications */}
      <Toast
        message={toastInfo.message}
        isVisible={toastInfo.visible}
        onClose={() => setToastInfo((prev) => ({ ...prev, visible: false }))}
        onViewCart={() => {
          setToastInfo((prev) => ({ ...prev, visible: false }));
          setIsCartOpen(true);
        }}
      />
    </div>
  );
}
