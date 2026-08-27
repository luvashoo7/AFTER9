import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { X, Bell, Zap, Flame, CheckCheck, ShieldCheck, Wallet } from 'lucide-react';

export const NotificationsModal = () => {
  const { isNotificationsModalOpen, setIsNotificationsModalOpen, setIsOrdersModalOpen, setIsRefundsModalOpen } = useAuth();
  const { notifications, markNotificationRead, clearAllNotifications } = useCart();

  if (!isNotificationsModalOpen) return null;

  const handleAction = (notif) => {
    markNotificationRead(notif.id);
    if (notif.type === 'order') {
      setIsNotificationsModalOpen(false);
      setIsOrdersModalOpen(true);
    } else if (notif.type === 'refund') {
      setIsNotificationsModalOpen(false);
      setIsRefundsModalOpen(true);
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'drop': return <Flame className="w-4 h-4 text-rose-400" />;
      case 'order': return <Zap className="w-4 h-4 text-[#a3e635]" />;
      case 'refund': return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'reward': return <Wallet className="w-4 h-4 text-purple-400" />;
      default: return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsNotificationsModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
              <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
                MIDNIGHT ALERTS
              </span>
            </div>
            <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight flex items-center gap-2">
              <Bell className="w-6 h-6 text-[#a3e635]" />
              Notifications
            </h3>
          </div>

          <button
            onClick={clearAllNotifications}
            className="text-xs font-mono text-slate-400 hover:text-[#bef264] flex items-center gap-1 p-2 rounded-lg bg-[#121224]"
            title="Mark all as read"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark Read</span>
          </button>
        </div>

        {/* List */}
        <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <span className="text-4xl">🌙</span>
              <p className="text-sm font-bold text-slate-300 font-display">No Midnight Alerts</p>
              <p className="text-xs text-slate-500 font-mono">You are fully caught up with the night hub.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleAction(notif)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                  !notif.isRead
                    ? 'bg-[#121828] border-[#a3e635]/50 shadow-lime-glow'
                    : 'bg-[#0f0f1c] border-white/10 hover:border-white/20 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#18182e] border border-white/10">
                      {getNotifIcon(notif.type)}
                    </div>
                    <h4 className="text-xs font-bold text-white uppercase font-display">{notif.title}</h4>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</span>
                </div>

                <p className="text-xs text-slate-300 font-mono leading-relaxed pl-8">
                  {notif.message}
                </p>

                {notif.actionText && (
                  <div className="pl-8 pt-1">
                    <span className="text-[11px] font-mono font-bold text-[#bef264] hover:underline flex items-center gap-1">
                      {notif.actionText} →
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 text-center text-[11px] font-mono text-slate-500">
          Real-time Nocturnal Dispatch Hub • Greater Noida
        </div>

      </div>
    </div>
  );
};
