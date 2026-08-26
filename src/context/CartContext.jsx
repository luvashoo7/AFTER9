import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [toast, setToast] = useState(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, icon = '⚡') => {
    setToast({ message, icon, id: Date.now() });
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added ${product.name || product.title} to Midnight Bag!`, '🛍️');
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart', '🗑️');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AFTER9PILOT') {
      setAppliedDiscount(50);
      setPromoMessage('🎉 ₹50 Pilot Launch discount applied!');
      return true;
    } else if (clean === 'MIDNIGHT') {
      setAppliedDiscount(29);
      setPromoMessage('🌙 Free Midnight Delivery applied!');
      return true;
    } else if (clean === 'GENZ20') {
      setAppliedDiscount(40);
      setPromoMessage('⚡ ₹40 Gen-Z Night Pass applied!');
      return true;
    } else {
      setPromoMessage('❌ Invalid coupon. Try AFTER9PILOT or MIDNIGHT');
      return false;
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 299 || appliedDiscount === 29 ? 0 : (subtotal > 0 ? 29 : 0);
  const total = Math.max(0, subtotal + deliveryFee - (appliedDiscount === 29 ? 0 : appliedDiscount));
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Trigger simulated order with doorstep open-box experience
  const placeOrder = (customerDetails) => {
    const orderData = {
      orderId: `A9-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      total,
      subtotal,
      deliveryFee,
      discount: appliedDiscount,
      customer: customerDetails,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrival: '12-15 mins',
      zone: customerDetails.sector || 'Pari Chowk, Greater Noida',
      status: 'dispatched' // dispatched -> nearby -> arrived -> open_box_inspect -> completed / returned
    };

    setActiveOrder(orderData);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
    clearCart();

    // Trigger celebratory confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ccff00', '#a855f7', '#06b6d4', '#ffffff']
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        deliveryFee,
        total,
        totalItemsCount,
        promoCode,
        setPromoCode,
        applyPromo,
        appliedDiscount,
        promoMessage,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        activeOrder,
        setActiveOrder,
        placeOrder,
        showToast,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-[#11111c]/95 border border-[#ccff00]/40 text-white px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-float transition-all duration-300">
          <span className="text-xl">{toast.icon}</span>
          <span className="text-sm font-semibold text-slate-100">{toast.message}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
