import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { X, Clock, ShoppingBag, RotateCcw, CheckCircle2, ShieldCheck, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

export const OrderHistoryModal = () => {
  const { isOrdersModalOpen, setIsOrdersModalOpen, user } = useAuth();
  const { pastOrders, reorderItems } = useCart();
  const [liveOrders, setLiveOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!user?.isLoggedIn) return;
    setLoading(true);
    try {
      const res = await orderService.listOrders();
      const list = res?.orders || res?.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(list)) {
        setLiveOrders(list);
      }
    } catch (err) {
      console.warn('Live orders fetch notification:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOrdersModalOpen && user?.isLoggedIn) {
      fetchOrders();
    }
  }, [isOrdersModalOpen, user?.isLoggedIn]);

  if (!isOrdersModalOpen) return null;

  // Use live MySQL orders if available, else fall back to local pastOrders
  const displayOrders = liveOrders.length > 0 ? liveOrders : pastOrders;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={() => setIsOrdersModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
              <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
                NOCTURNAL ORDER LEDGER
              </span>
            </div>
            {user?.isLoggedIn && (
              <button
                onClick={fetchOrders}
                disabled={loading}
                className="text-[11px] font-mono text-slate-400 hover:text-[#a3e635] flex items-center gap-1 pr-8"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>
            )}
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight flex items-center gap-2">
            <Clock className="w-6 h-6 text-[#a3e635]" />
            Midnight Orders ({displayOrders.length})
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Past midnight deliveries, open-box verification receipts & re-orders
          </p>
        </div>

        {/* Orders List */}
        <div className="py-4 space-y-4 overflow-y-auto pr-1 flex-1">
          {loading && displayOrders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Loader2 className="w-7 h-7 text-[#a3e635] animate-spin mx-auto" />
              <p className="text-xs text-slate-400 font-mono">Fetching your orders from database...</p>
            </div>
          ) : displayOrders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <span className="text-4xl">🌙</span>
              <p className="text-sm font-bold text-slate-300 font-display">No Midnight Orders Yet</p>
              <p className="text-xs text-slate-500 font-mono">Your late night cravings history will appear here.</p>
            </div>
          ) : (
            displayOrders.map((order) => {
              const isReturned = String(order.status || '').toUpperCase().includes('RETURN');
              const orderId = order.orderNumber || order.orderId || order.id;
              const totalAmount = order.totalAmount !== undefined ? order.totalAmount : (order.total || 0);
              const items = order.items || [];
              const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : (order.date || 'Recently');
              const sectorStr = order.serviceZone?.name || order.sector || 'Pari Chowk Central Hub';

              return (
                <div
                  key={order.id || orderId}
                  className="p-5 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-3 hover:border-white/20 transition-all"
                >
                  {/* Order Header Row */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-sm text-white">
                          #{orderId}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isReturned
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-[#a3e635]/15 text-[#bef264] border border-[#a3e635]/30'
                        }`}>
                          {order.status || 'CONFIRMED'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {dateStr} • {sectorStr}
                      </p>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-sm font-black text-white">₹{totalAmount}</span>
                      <p className="text-[10px] text-slate-500">{order.paymentMethod || 'UPI'}</p>
                    </div>
                  </div>

                  {/* Items Summary */}
                  <div className="space-y-1.5 font-mono text-xs text-slate-300">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px]">
                        <span>{item.quantity || item.qty || 1}x {item.title || item.name}</span>
                        <span className="text-slate-400">₹{(item.unitPrice || item.price || 0) * (item.quantity || item.qty || 1)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Open-Box Status Receipt */}
                  <div className="p-2.5 rounded-xl bg-[#090a12] border border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
                      {order.inspection?.status === 'COMPLETED' ? 'Doorstep Inspected & Accepted' : 'Doorstep Open-Box Verified'}
                    </span>
                    {order.inspection?.totalRefundAmount > 0 && (
                      <span className="text-emerald-400 font-bold">
                        Refunded ₹{order.inspection.totalRefundAmount}
                      </span>
                    )}
                  </div>

                  {/* Re-order Button */}
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => {
                        reorderItems(order);
                        setIsOrdersModalOpen(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#a3e635]/10 hover:bg-[#a3e635] text-[#bef264] hover:text-black font-mono text-xs font-bold flex items-center gap-1.5 transition-all border border-[#a3e635]/30"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Re-order to Midnight Bag</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 text-center text-[11px] font-mono text-slate-500">
          Greater Noida Central Dark Store • Live Telemetry MySQL Ledger
        </div>

      </div>
    </div>
  );
};
