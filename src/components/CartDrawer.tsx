import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Bike,
  Store,
  Utensils,
  Tag,
  Sparkles,
  Database,
  CreditCard,
  ShieldCheck,
  Loader2,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderFormData, PlacedOrder } from '../types';
import { saveOrderToSupabase } from '../lib/supabase';
import { openRazorpayCheckout, RazorpayPaymentSuccessResponse } from '../lib/razorpay';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onOpenMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenMenu,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const [orderForm, setOrderForm] = useState<OrderFormData>({
    customerName: '',
    phone: '',
    deliveryType: 'delivery',
    deliveryAddress: '',
    tableNumber: '',
    notes: '',
    paymentMethod: 'razorpay_online',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Price calculations
  const subtotal = cartItems.reduce((sum, ci) => {
    const price = 'discountedPrice' in ci.item ? ci.item.discountedPrice : ci.item.price;
    return sum + price * ci.quantity;
  }, 0);

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = orderForm.deliveryType === 'delivery' ? (subtotal >= 500 ? 0 : 40) : 0;
  const gst = Math.round((subtotal - discountAmount) * 0.05); // 5% Restaurant GST
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + gst);

  const applyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'SPICE10') {
      setDiscountPercent(10);
      setCouponSuccess('10% Flat discount applied!');
    } else if (code === 'WELCOME50' && subtotal >= 300) {
      setDiscountPercent(15);
      setCouponSuccess('15% Welcome discount applied!');
    } else {
      setCouponError('Invalid coupon. Try "SPICE10" or "WELCOME50"');
    }
  };

  const validateOrderForm = (): boolean => {
    const errors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!orderForm.customerName.trim()) {
      errors.customerName = 'Please enter your name';
    }

    const phoneRegex = /^[0-9+\s-]{10,14}$/;
    if (!orderForm.phone.trim() || !phoneRegex.test(orderForm.phone.replace(/[\s-]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (orderForm.deliveryType === 'delivery' && !orderForm.deliveryAddress?.trim()) {
      errors.deliveryAddress = 'Please enter delivery address in Hubballi';
    }

    if (orderForm.deliveryType === 'dine-in' && !orderForm.tableNumber?.trim()) {
      errors.tableNumber = 'Please enter your table number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const finalizeOrder = (order: PlacedOrder) => {
    // Save order details to Supabase account
    saveOrderToSupabase(order).catch((err) => {
      console.warn('Supabase order save error:', err);
    });

    setPlacedOrder(order);
    setCheckoutStep('success');
    setIsProcessingPayment(false);
    onClearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#3D2B1F', '#22c55e', '#FAF7F2'],
      });
    } catch (err) {
      // Fallback
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOrderForm()) return;
    setPaymentError(null);

    const orderId = `ORD-HUB-${Math.floor(1000 + Math.random() * 9000)}`;

    if (orderForm.paymentMethod === 'razorpay_online') {
      setIsProcessingPayment(true);

      const checkoutSuccess = await openRazorpayCheckout({
        amount: grandTotal,
        orderId,
        customerName: orderForm.customerName,
        customerPhone: orderForm.phone,
        customerEmail: 'guest@spicegardenhubballi.com',
        description: `Spice Garden Hubballi - Order ${orderId}`,
        onSuccess: (razorpayResponse: RazorpayPaymentSuccessResponse) => {
          const completedOrder: PlacedOrder = {
            orderId,
            items: [...cartItems],
            subtotal,
            discount: discountAmount,
            gst,
            deliveryFee,
            total: grandTotal,
            customerDetails: { ...orderForm },
            placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            estimatedTime: orderForm.deliveryType === 'delivery' ? '30-40 mins' : '15-20 mins',
            paymentId: razorpayResponse.razorpay_payment_id,
            paymentStatus: 'Paid',
          };
          finalizeOrder(completedOrder);
        },
        onDismiss: () => {
          setIsProcessingPayment(false);
          setPaymentError('Payment window was closed. You can retry or choose another payment method.');
        },
        onError: (err: any) => {
          console.warn('Razorpay checkout notice:', err);
          setIsProcessingPayment(false);
          setPaymentError(
            err?.description || err?.message || 'Unable to open Razorpay. You may retry or select Cash on Delivery.'
          );
        },
      });

      if (!checkoutSuccess) {
        setIsProcessingPayment(false);
      }
    } else {
      // Offline / COD payment
      const offlineOrder: PlacedOrder = {
        orderId,
        items: [...cartItems],
        subtotal,
        discount: discountAmount,
        gst,
        deliveryFee,
        total: grandTotal,
        customerDetails: { ...orderForm },
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedTime: orderForm.deliveryType === 'delivery' ? '30-40 mins' : '15-20 mins',
        paymentStatus: orderForm.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Pending',
      };
      finalizeOrder(offlineOrder);
    }
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-[#3D2B1F]/80 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#FFFFFF] text-[#3D2B1F] h-full flex flex-col justify-between shadow-2xl border-l border-[#E5E0D8] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E5E0D8] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-sm bg-[#3D2B1F] text-[#D4AF37]">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#3D2B1F]">
                {checkoutStep === 'cart' && 'Your Dining Cart'}
                {checkoutStep === 'checkout' && 'Complete Your Order'}
                {checkoutStep === 'success' && 'Order Placed!'}
              </h3>
              <p className="text-xs text-[#7D6E63]">
                {checkoutStep === 'cart' && `${cartItems.length} unique items selected`}
                {checkoutStep === 'checkout' && 'Delivery & Contact Details'}
                {checkoutStep === 'success' && 'Thank you for dining with us'}
              </p>
            </div>
          </div>

          <button
            id="close-cart-btn"
            onClick={onClose}
            className="p-2 rounded-sm bg-[#FFFFFF] border border-[#E5E0D8] text-[#7D6E63] hover:text-[#3D2B1F] hover:border-[#D4AF37] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* STEP 1: CART ITEMS VIEW */}
        {checkoutStep === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E5E0D8] flex items-center justify-center text-[#7D6E63]">
                    <ShoppingBag size={32} />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#3D2B1F]">Your cart is empty</h4>
                  <p className="text-xs text-[#7D6E63] max-w-xs">
                    Explore our starters, tandoori grills, dum biryanis, and delicious desserts.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenMenu();
                    }}
                    className="px-5 py-2.5 rounded-sm bg-[#D4AF37] text-[#3D2B1F] font-bold text-xs uppercase tracking-widest hover:bg-[#E5C358] transition-colors mt-2 cursor-pointer shadow-sm"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {cartItems.map((cartItem) => {
                    const price = 'discountedPrice' in cartItem.item ? cartItem.item.discountedPrice : cartItem.item.price;
                    return (
                      <div
                        key={cartItem.item.id}
                        id={`cart-item-${cartItem.item.id}`}
                        className="bg-[#FAF7F2] rounded-sm p-3.5 border border-[#E5E0D8] flex items-center gap-3 shadow-sm"
                      >
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-16 h-16 rounded-sm object-cover shrink-0 border border-[#E5E0D8]"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                cartItem.item.type === 'veg' ? 'bg-green-600' : 'bg-red-600'
                              }`}
                            />
                            <h4 className="text-xs sm:text-sm font-bold text-[#3D2B1F] truncate">
                              {cartItem.item.name}
                            </h4>
                          </div>

                          <span className="font-serif text-xs font-bold text-[#D4AF37]">
                            ₹{price} each
                          </span>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                                className="w-6 h-6 rounded-sm bg-[#FAF7F2] text-[#3D2B1F] flex items-center justify-center hover:bg-[#E5E0D8] text-xs cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold text-[#3D2B1F] min-w-[16px] text-center">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                                className="w-6 h-6 rounded-sm bg-[#D4AF37] text-[#3D2B1F] flex items-center justify-center hover:bg-[#E5C358] text-xs font-bold cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-[#3D2B1F]">
                              ₹{price * cartItem.quantity}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(cartItem.item.id)}
                          className="p-2 text-[#7D6E63] hover:text-red-500 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    );
                  })}

                  {/* Coupon Code section */}
                  <div className="bg-[#FAF7F2] p-3.5 rounded-sm border border-[#E5E0D8] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3D2B1F]">
                      <Tag size={13} className="text-[#D4AF37]" />
                      <span>Have a promo code? (Try SPICE10)</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E0D8] rounded-sm text-xs text-[#3D2B1F] uppercase placeholder:normal-case placeholder-[#7D6E63] focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="px-3.5 py-1.5 bg-[#3D2B1F] hover:bg-[#2C1E15] text-[#D4AF37] rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponSuccess && <p className="text-green-600 font-bold text-xs">{couponSuccess}</p>}
                    {couponError && <p className="text-red-500 font-medium text-xs">{couponError}</p>}
                  </div>
                </>
              )}
            </div>

            {/* Bottom Summary & Proceed Button */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-[#E5E0D8] bg-[#FAF7F2] space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#7D6E63]">
                    <span>Item Subtotal</span>
                    <span className="text-[#3D2B1F] font-bold">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#7D6E63]">
                    <span>GST (5%)</span>
                    <span className="text-[#3D2B1F] font-semibold">₹{gst}</span>
                  </div>

                  <div className="flex justify-between text-[#7D6E63]">
                    <span>Delivery Fee</span>
                    <span className="text-[#3D2B1F]">
                      {deliveryFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#E5E0D8] flex justify-between text-sm font-bold text-[#3D2B1F]">
                    <span>Grand Total</span>
                    <span className="text-[#3D2B1F] font-serif text-lg">₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  id="proceed-to-checkout-btn"
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3 rounded-sm bg-[#D4AF37] hover:bg-[#E5C358] text-[#3D2B1F] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: CHECKOUT FORM */}
        {checkoutStep === 'checkout' && (
          <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Order Type Toggle */}
              <div>
                <label className="block text-xs font-bold text-[#3D2B1F] uppercase tracking-wider mb-2">
                  Order Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { type: 'delivery', label: 'Delivery', icon: Bike },
                    { type: 'pickup', label: 'Takeaway', icon: Store },
                    { type: 'dine-in', label: 'Dine-In', icon: Utensils },
                  ].map(({ type, label, icon: Icon }) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setOrderForm({ ...orderForm, deliveryType: type as any })}
                      className={`p-2.5 rounded-sm border text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                        orderForm.deliveryType === type
                          ? 'bg-[#3D2B1F] border-[#3D2B1F] text-[#D4AF37]'
                          : 'bg-[#FAF7F2] border-[#E5E0D8] text-[#7D6E63] hover:text-[#3D2B1F]'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="space-y-3">
                <div>
                  <label htmlFor="chk-name" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1">
                    Your Name *
                  </label>
                  <input
                    id="chk-name"
                    type="text"
                    placeholder="e.g. Ramesh Kulkarni"
                    value={orderForm.customerName}
                    onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5E0D8] focus:border-[#D4AF37] rounded-sm text-xs text-[#3D2B1F] focus:outline-none"
                  />
                  {formErrors.customerName && <p className="text-red-500 text-xs mt-1">{formErrors.customerName}</p>}
                </div>

                <div>
                  <label htmlFor="chk-phone" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="chk-phone"
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5E0D8] focus:border-[#D4AF37] rounded-sm text-xs text-[#3D2B1F] focus:outline-none"
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>

                {orderForm.deliveryType === 'delivery' && (
                  <div>
                    <label htmlFor="chk-address" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1">
                      Delivery Address in Hubballi *
                    </label>
                    <textarea
                      id="chk-address"
                      rows={2}
                      placeholder="e.g. Flat 302, Green Meadows Apt, Vidyanagar, Hubballi"
                      value={orderForm.deliveryAddress}
                      onChange={(e) => setOrderForm({ ...orderForm, deliveryAddress: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#E5E0D8] focus:border-[#D4AF37] rounded-sm text-xs text-[#3D2B1F] focus:outline-none resize-none"
                    />
                    {formErrors.deliveryAddress && <p className="text-red-500 text-xs mt-1">{formErrors.deliveryAddress}</p>}
                  </div>
                )}

                {orderForm.deliveryType === 'dine-in' && (
                  <div>
                    <label htmlFor="chk-table" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1">
                      Table Number *
                    </label>
                    <input
                      id="chk-table"
                      type="text"
                      placeholder="e.g. Table 07"
                      value={orderForm.tableNumber}
                      onChange={(e) => setOrderForm({ ...orderForm, tableNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5E0D8] focus:border-[#D4AF37] rounded-sm text-xs text-[#3D2B1F] focus:outline-none"
                    />
                    {formErrors.tableNumber && <p className="text-red-500 text-xs mt-1">{formErrors.tableNumber}</p>}
                  </div>
                )}

                <div>
                  <label htmlFor="chk-notes" className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F] mb-1">
                    Cooking / Delivery Instructions (Optional)
                  </label>
                  <input
                    id="chk-notes"
                    type="text"
                    placeholder="e.g. Less spicy, extra mint chutney, call on arrival"
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5E0D8] focus:border-[#D4AF37] rounded-sm text-xs text-[#3D2B1F] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B1F]">
                      Payment Method
                    </label>
                    <span className="text-[10px] font-semibold text-[#7D6E63] flex items-center gap-1">
                      <ShieldCheck size={12} className="text-green-600" /> 256-Bit SSL Encrypted
                    </span>
                  </div>

                  {paymentError && (
                    <div className="p-2.5 mb-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700 flex items-start gap-2">
                      <span className="font-bold">Notice:</span>
                      <span className="flex-1">{paymentError}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    {/* Razorpay Online Option */}
                    <label
                      className={`block p-3 rounded-sm border transition-all cursor-pointer ${
                        orderForm.paymentMethod === 'razorpay_online'
                          ? 'bg-[#FAF7F2] border-[#3D2B1F] shadow-sm'
                          : 'bg-[#FFFFFF] border-[#E5E0D8] hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={orderForm.paymentMethod === 'razorpay_online'}
                          onChange={() => {
                            setPaymentError(null);
                            setOrderForm({ ...orderForm, paymentMethod: 'razorpay_online' });
                          }}
                          className="accent-[#3D2B1F] mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 flex-wrap">
                            <span className="font-bold text-xs text-[#3D2B1F] flex items-center gap-1.5">
                              <CreditCard size={14} className="text-[#D4AF37]" />
                              Razorpay (UPI, GPay, Cards, NetBanking)
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                              Instant & Secure
                            </span>
                          </div>
                          <p className="text-[11px] text-[#7D6E63] mt-0.5">
                            Google Pay, PhonePe, Paytm, BHIM UPI, Visa, Mastercard, RuPay & all NetBanking
                          </p>
                        </div>
                      </div>
                    </label>

                    {/* Cash on Delivery */}
                    <label
                      className={`block p-2.5 rounded-sm border transition-all cursor-pointer ${
                        orderForm.paymentMethod === 'cash_on_delivery'
                          ? 'bg-[#FAF7F2] border-[#3D2B1F]'
                          : 'bg-[#FFFFFF] border-[#E5E0D8] hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={orderForm.paymentMethod === 'cash_on_delivery'}
                          onChange={() => {
                            setPaymentError(null);
                            setOrderForm({ ...orderForm, paymentMethod: 'cash_on_delivery' });
                          }}
                          className="accent-[#3D2B1F]"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-xs text-[#3D2B1F]">Cash on Delivery / Pay on Pickup</span>
                        </div>
                      </div>
                    </label>

                    {/* UPI QR on Delivery */}
                    <label
                      className={`block p-2.5 rounded-sm border transition-all cursor-pointer ${
                        orderForm.paymentMethod === 'upi_qr'
                          ? 'bg-[#FAF7F2] border-[#3D2B1F]'
                          : 'bg-[#FFFFFF] border-[#E5E0D8] hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={orderForm.paymentMethod === 'upi_qr'}
                          onChange={() => {
                            setPaymentError(null);
                            setOrderForm({ ...orderForm, paymentMethod: 'upi_qr' });
                          }}
                          className="accent-[#3D2B1F]"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-xs text-[#3D2B1F]">UPI / QR Code Scan at Doorstep</span>
                        </div>
                      </div>
                    </label>

                    {/* Card at counter / machine */}
                    <label
                      className={`block p-2.5 rounded-sm border transition-all cursor-pointer ${
                        orderForm.paymentMethod === 'card_at_counter'
                          ? 'bg-[#FAF7F2] border-[#3D2B1F]'
                          : 'bg-[#FFFFFF] border-[#E5E0D8] hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={orderForm.paymentMethod === 'card_at_counter'}
                          onChange={() => {
                            setPaymentError(null);
                            setOrderForm({ ...orderForm, paymentMethod: 'card_at_counter' });
                          }}
                          className="accent-[#3D2B1F]"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-xs text-[#3D2B1F]">Card swipe at counter / delivery machine</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 border-t border-[#E5E0D8] bg-[#FAF7F2] space-y-2">
              <div className="flex justify-between items-center text-sm font-bold text-[#3D2B1F]">
                <span>Total Payable:</span>
                <span className="text-[#3D2B1F] font-serif text-lg">₹{grandTotal}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => setCheckoutStep('cart')}
                  className="w-1/3 py-2.5 rounded-sm bg-[#FFFFFF] border border-[#E5E0D8] text-xs font-bold uppercase tracking-wider text-[#7D6E63] hover:text-[#3D2B1F] cursor-pointer disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  id="place-order-final-btn"
                  disabled={isProcessingPayment}
                  className="w-2/3 py-2.5 rounded-sm bg-[#D4AF37] hover:bg-[#E5C358] text-[#3D2B1F] font-bold text-xs uppercase tracking-widest shadow-sm cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-75"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Opening Razorpay...</span>
                    </>
                  ) : orderForm.paymentMethod === 'razorpay_online' ? (
                    <>
                      <Lock size={13} />
                      <span>Pay ₹{grandTotal} with Razorpay</span>
                    </>
                  ) : (
                    <span>Place Order Now</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 3: ORDER SUCCESS CONFIRMATION */}
        {checkoutStep === 'success' && placedOrder && (
          <div className="flex-1 flex flex-col justify-between p-6 text-center overflow-y-auto">
            <div className="my-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  Order Placed Successfully!
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3D2B1F] mt-1">
                  Thank You, {placedOrder.customerDetails.customerName}!
                </h3>
                <p className="text-xs text-[#7D6E63] mt-1">
                  Order ID: <strong className="text-[#3D2B1F]">{placedOrder.orderId}</strong>
                </p>
              </div>

              {/* Receipt card */}
              <div className="bg-[#FAF7F2] p-4 rounded-sm border border-[#E5E0D8] text-left text-xs space-y-2">
                <div className="flex justify-between pb-2 border-b border-[#E5E0D8]">
                  <span className="text-[#7D6E63]">Est. Delivery/Prep Time:</span>
                  <span className="font-bold text-[#3D2B1F]">{placedOrder.estimatedTime}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E5E0D8]">
                  <span className="text-[#7D6E63]">Total Paid/Due:</span>
                  <span className="font-bold text-[#3D2B1F]">₹{placedOrder.total}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E5E0D8]">
                  <span className="text-[#7D6E63]">Payment Status:</span>
                  {placedOrder.paymentId ? (
                    <span className="font-bold text-green-700 flex items-center gap-1">
                      <ShieldCheck size={13} className="text-green-600" />
                      Paid via Razorpay ({placedOrder.paymentId.substring(0, 14)}...)
                    </span>
                  ) : (
                    <span className="font-semibold text-[#3D2B1F]">
                      {placedOrder.customerDetails.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Pay at Counter'}
                    </span>
                  )}
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E5E0D8]">
                  <span className="text-[#7D6E63]">Items:</span>
                  <span className="text-[#3D2B1F] font-semibold">{placedOrder.items.length} items ordered</span>
                </div>
                <div className="flex justify-between items-center pt-0.5 text-[11px]">
                  <span className="text-[#7D6E63] flex items-center gap-1.5">
                    <Database size={12} className="text-[#D4AF37]" /> Supabase Sync:
                  </span>
                  <span className="font-bold text-[#3D2B1F] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Synced (kidxpaccsmankylxarzt)
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#7D6E63]">
                Our kitchen at Gokul Road Hubballi is preparing your meal with freshly ground spices. Contact us at {placedOrder.customerDetails.phone} for updates.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E0D8]">
              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  setPlacedOrder(null);
                  onClose();
                }}
                className="w-full py-3 rounded-sm bg-[#D4AF37] text-[#3D2B1F] font-bold text-xs uppercase tracking-widest hover:bg-[#E5C358] transition-colors cursor-pointer"
              >
                Done / Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
