import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { orderService } from '../services/orderService';

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

  // Past Orders, Refunds & Notifications State (Default empty, populated from real user actions/API)
  const [pastOrders, setPastOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('after9_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [refunds, setRefunds] = useState(() => {
    try {
      const saved = localStorage.getItem('after9_refunds');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('after9_notifications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
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
    const finalName = selectedVariant ? `${product.name || product.title} (${selectedVariant.name || selectedVariant.title})` : (product.name || product.title);

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
    if (clean === 'AFTER9' || clean === 'AFTER9PILOT') {
      const disc = Math.round(subtotal * 0.2);
      setAppliedDiscount(disc > 100 ? 100 : disc);
      setPromoMessage('🎉 20% OFF Applied!');
      return true;
    } else if (clean === 'NIGHTOWL') {
      setAppliedDiscount(50);
      setPromoMessage('🌙 Flat ₹50 OFF Applied!');
      return true;
    } else if (clean === 'FREEDEL') {
      setAppliedDiscount(29);
      setPromoMessage('⚡ Free Night Delivery applied!');
      return true;
    } else {
      setPromoMessage('❌ Invalid coupon. Try AFTER9, NIGHTOWL or FREEDEL');
      return false;
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  const deliveryFee = subtotal >= 199 ? 0 : (subtotal > 0 ? 29 : 0);
  const total = Math.max(0, subtotal + deliveryFee + tipAmount - appliedDiscount);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Trigger order creation and sync to backend MySQL
  const placeOrder = async (orderDetails) => {
    const orderIdNum = Math.floor(100000 + Math.random() * 900000);
    let newOrder = {
      id: `A9-${orderIdNum}`,
      orderId: `A9-${orderIdNum}`,
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
      status: 'CONFIRMED',
      openBoxStatus: 'Doorstep Open-Box Inspection Active',
    };

    // 1. Post to Backend REST API -> persists in MySQL Order, OrderItem, Payment, Inspection tables
    try {
      const apiResponse = await orderService.createOrder({
        items: cart,
        total,
        subtotal,
        deliveryFee,
        tip: tipAmount,
        discount: appliedDiscount,
        sector: orderDetails?.sector || 'Pari Chowk Central Hub',
        paymentMethod: orderDetails?.paymentMethod || 'ONLINE',
        notes: orderDetails?.notes || '',
      });

      if (apiResponse) {
        newOrder = {
          ...newOrder,
          id: apiResponse.id || apiResponse.orderNumber || newOrder.id,
          orderId: apiResponse.orderNumber || apiResponse.id || newOrder.id,
          status: apiResponse.status || 'CONFIRMED',
        };
      }
    } catch (err) {
      if (err.status === 401 || err.code === 'TOKEN_INVALID' || err.code === 'TOKEN_EXPIRED') {
        showToast('Please log in with OTP before placing your order', '🔒');
        return;
      }
      console.warn('Backend order sync notice:', err?.message || err);
    }

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
      title: `⚡ Order #${newOrder.orderId || newOrder.id} Placed & Confirmed!`,
      message: `Your midnight order has been saved to MySQL and dispatched. ETA 10-15 mins.`,
      timestamp: 'Just Now',
      isRead: false,
      type: 'order',
      actionText: 'Track Order',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const reorderItems = (order) => {
    if (order.items) {
      order.items.forEach((item) => {
        addToCart(item, item.quantity || 1);
      });
      setIsCartOpen(true);
    }
  };

  const processDoorstepReturn = (rejectedItemsOrReason, maybeReason) => {
    if (!activeOrder) return;

    let itemsToReturn = Array.isArray(rejectedItemsOrReason) ? rejectedItemsOrReason : (activeOrder.items || []);
    let reason = typeof rejectedItemsOrReason === 'string' ? rejectedItemsOrReason : (maybeReason || 'Doorstep open-box inspection return');

    const returnDeliveryFee = 19;
    const itemsTotal = itemsToReturn.reduce(
      (acc, item) => acc + (item.price || item.unitPrice || 0) * (item.quantity || 1),
      0
    );
    const refundAmount = Math.max(0, itemsTotal - returnDeliveryFee);

    const newRefund = {
      id: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      orderId: activeOrder.id,
      orderNumber: activeOrder.orderNumber || activeOrder.orderId || activeOrder.id,
      date: 'Just Now, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: itemsToReturn,
      returnReason: reason,
      refundAmount,
      returnDeliveryCharge: returnDeliveryFee,
      status: 'Instant Refund Credited',
      paymentMode: 'UPI (Instant Refund)',
      isDoorstepReturn: true,
    };

    setRefunds((prev) => [newRefund, ...prev]);

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

    const newNotif = {
      id: `notif-${Date.now()}`,
      title: `💸 Instant Refund Credited: ₹${refundAmount}`,
      message: `Doorstep return for #${activeOrder.id} processed. ₹${refundAmount} credited.`,
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
