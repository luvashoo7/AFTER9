import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SAMPLE_ORDER_HISTORY, SAMPLE_REFUNDS, SAMPLE_NOTIFICATIONS } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('after9_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [tipAmount, setTipAmount] = useState(10); // Default ₹10 night rider tip
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [toast, setToast] = useState(null);

  // Past Orders, Refunds & Notifications State
  const [pastOrders, setPastOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('after9_orders');
      return saved ? JSON.parse(saved) : SAMPLE_ORDER_HISTORY;
    } catch {
      return SAMPLE_ORDER_HISTORY;
    }
  });

  const [refunds, setRefunds] = useState(() => {
    try {
      const saved = localStorage.getItem('after9_refunds');
      return saved ? JSON.parse(saved) : SAMPLE_REFUNDS;
    } catch {
      return SAMPLE_REFUNDS;
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('after9_notifications');
      return saved ? JSON.parse(saved) : SAMPLE_NOTIFICATIONS;
    } catch {
      return SAMPLE_NOTIFICATIONS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('after9_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('after9_orders', JSON.stringify(pastOrders));
    } catch {}
  }, [pastOrders]);

  useEffect(() => {
    try {
      localStorage.setItem('after9_refunds', JSON.stringify(refunds));
    } catch {}
  }, [refunds]);

  useEffect(() => {
    try {
      localStorage.setItem('after9_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

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

  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    const itemKey = selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id;
    const finalPrice = selectedVariant ? selectedVariant.price : product.price;
    const finalMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
    const finalName = selectedVariant ? `${product.name || product.title} (${selectedVariant.name})` : (product.name || product.title);

    setCart((prev) => {
      const existing = prev.find((item) => item.cartKey === itemKey || (!item.cartKey && item.id === product.id && !selectedVariant));
      if (existing) {
        return prev.map((item) =>
          (item.cartKey === itemKey || item.id === itemKey) ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          cartKey: itemKey,
          price: finalPrice,
          mrp: finalMrp,
          name: finalName,
          selectedVariant,
          quantity,
        },
      ];
    });
    showToast(`Added ${finalName} to Midnight Bag!`, '🛍️');
  };

  const updateQuantity = (idOrKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          const match = item.cartKey === idOrKey || item.id === idOrKey;
          if (match) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (idOrKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== idOrKey && item.id !== idOrKey));
    showToast('Item removed from bag', '🗑️');
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
      setPromoMessage('❌ Invalid coupon. Try AFTER9PILOT, MIDNIGHT or GENZ20');
      return false;
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 299 || appliedDiscount === 29 ? 0 : (subtotal > 0 ? 29 : 0);
  const total = Math.max(0, subtotal + deliveryFee + tipAmount - (appliedDiscount === 29 ? 0 : appliedDiscount));
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Trigger simulated order with doorstep open-box experience
  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `A9-${Math.floor(100000 + Math.random() * 900000)}`,
      orderId: `A9-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      total,
      subtotal,
      deliveryFee,
      tip: tipAmount,
      discount: appliedDiscount,
      date: 'Just Now, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrival: '10-15 mins',
      sector: orderDetails?.sector || 'Pari Chowk Central Hub',
      paymentMethod: orderDetails?.paymentMethod || 'UPI (Instant)',
      status: 'Dispatched & On Route',
      openBoxStatus: 'Doorstep Open-Box Inspection Active',
    };

    setActiveOrder(newOrder);
    setPastOrders((prev) => [newOrder, ...prev]);
    setIsCartOpen(false);
    setIsPaymentModalOpen(false);
    setIsCheckoutModalOpen(true);
    clearCart();

    // Trigger celebratory confetti
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#ccff00', '#a855f7', '#06b6d4', '#ffffff'],
    });

    // Add dispatch notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: `⚡ Order #${newOrder.id} Dispatched!`,
      message: `Your rider Vikram S. has picked up your midnight order from Greater Noida Hub. ETA 12 mins.`,
      timestamp: 'Just Now',
      isRead: false,
      type: 'order',
      actionText: 'Track Order',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Re-order past items
  const reorderItems = (order) => {
    order.items.forEach((item) => {
      addToCart(item, item.qty || item.quantity || 1);
    });
    setIsCartOpen(true);
    showToast(`Re-added ${order.items.length} items from Order #${order.id}!`, '✨');
  };

  // Return Entire Order at Doorstep Inspection with Return Delivery Charge
  const processDoorstepReturn = (reason = 'Customer rejected during doorstep inspection') => {
    if (!activeOrder) return;
    const returnDeliveryFee = 29; // Standard midnight trip transit compensation for electric rider
    const refundAmount = Math.max(0, activeOrder.subtotal - (activeOrder.discount || 0));

    const newRefund = {
      id: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      orderId: activeOrder.id || activeOrder.orderId,
      item: activeOrder.items.map((i) => i.name || i.title).join(', '),
      amount: refundAmount,
      returnDeliveryChargeDeducted: returnDeliveryFee,
      reason: `${reason} (₹${returnDeliveryFee} delivery trip charge retained for rider transit)`,
      timestamp: 'Just now (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')',
      status: 'Credited to Source UPI (Instant 90s)',
      utrNumber: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}/AFTER9`,
    };

    setRefunds((prev) => [newRefund, ...prev]);

    // Update status in past orders
    setPastOrders((prev) =>
      prev.map((o) =>
        o.id === activeOrder.id
          ? {
              ...o,
              status: 'Returned at Doorstep',
              openBoxStatus: 'Package Returned (Refund Credited)',
              refundAmount,
              returnDeliveryCharge: returnDeliveryFee,
            }
          : o
      )
    );

    // Add refund notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: `💸 Instant Refund Credited: ₹${refundAmount}`,
      message: `Doorstep return for #${activeOrder.id} processed. ₹${refundAmount} credited to UPI. ₹${returnDeliveryFee} rider transit fee deducted.`,
      timestamp: 'Just Now',
      isRead: false,
      type: 'refund',
      actionText: 'View Refund',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

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
        tipAmount,
        setTipAmount,
        total,
        totalItemsCount,
        promoCode,
        setPromoCode,
        applyPromo,
        appliedDiscount,
        promoMessage,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        activeOrder,
        setActiveOrder,
        placeOrder,
        reorderItems,
        processDoorstepReturn,
        pastOrders,
        refunds,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        clearAllNotifications,
        showToast,
        searchQuery,
        setSearchQuery,
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
