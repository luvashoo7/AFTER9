import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, Moon, ShieldCheck, MapPin, Check, LogOut, Wallet, Heart, Bell } from 'lucide-react';

export const ProfileEditModal = () => {
  const { 
    isProfileModalOpen, setIsProfileModalOpen, user, updateProfile, 
    logout, setIsAddressModalOpen, setIsOrdersModalOpen, setIsNotificationsModalOpen 
  } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [nightTagline, setNightTagline] = useState(user?.nightTagline || '');
  const [deliveryInstructions, setDeliveryInstructions] = useState(user?.deliveryInstructions || '');
  const [dietaryPreference, setDietaryPreference] = useState(user?.dietaryPreference || 'all');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isProfileModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      nightTagline,
      deliveryInstructions,
      dietaryPreference,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleLogout = () => {
    logout();
    setIsProfileModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsProfileModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 pb-5 border-b border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-[#a3e635]/15 border-2 border-[#a3e635] text-2xl flex items-center justify-center shadow-lime-glow">
            {user?.avatar || '🌙'}
          </div>
          <div>
            <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
              {user?.name || 'Nocturnal Citizen'}
            </h3>
            <p className="text-xs font-mono text-[#bef264]">
              {user?.phone || 'Verified Greater Noida Night Owl'}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                <Wallet className="w-3 h-3" /> ₹{user?.walletBalance || 250} Wallet Cash
              </span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">FULL NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">PHONE NUMBER</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 outline-none"
              />
            </div>
          </div>

          {/* Night Owl Tagline */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300">NIGHT OWL STATUS / BIO</label>
            <input
              type="text"
              value={nightTagline}
              onChange={(e) => setNightTagline(e.target.value)}
              placeholder="e.g. Late Night Coder & Gamer"
              className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 outline-none"
            />
          </div>

          {/* Dietary Preferences */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300">DIETARY FILTER</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'All Items 🍟' },
                { id: 'veg', label: '100% Veg Only 🥬' },
                { id: 'egg', label: 'Eggitarian 🍳' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setDietaryPreference(p.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-mono border transition-all ${
                    dietaryPreference === p.id
                      ? 'bg-[#a3e635] text-black font-black border-[#a3e635]'
                      : 'bg-[#121222] text-slate-400 border-white/10'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Default Delivery Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300">DEFAULT NIGHT INSTRUCTIONS</label>
            <textarea
              rows={2}
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              placeholder="e.g. Call when reaching gate, do not ring bell after midnight."
              className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 outline-none"
            />
          </div>

          {/* Quick Hub Navigation Shortcuts */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setIsProfileModalOpen(false);
                setIsAddressModalOpen(true);
              }}
              className="p-3 bg-[#111122] hover:bg-[#181830] rounded-xl border border-white/10 text-left font-mono text-xs text-slate-200 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#a3e635]" /> Saved Addresses
              </span>
              <span>→</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsProfileModalOpen(false);
                setIsOrdersModalOpen(true);
              }}
              className="p-3 bg-[#111122] hover:bg-[#181830] rounded-xl border border-white/10 text-left font-mono text-xs text-slate-200 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-purple-400" /> Past Orders
              </span>
              <span>→</span>
            </button>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full btn-primary py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{savedSuccess ? 'PROFILE SAVED ✓' : 'SAVE PROFILE CHANGES'}</span>
            </button>
          </div>

          {/* Logout Action */}
          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs text-rose-400 hover:text-rose-300 font-mono flex items-center justify-center gap-1.5 mx-auto py-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout from this device</span>
            </button>
          </div>

        </form>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
          <span>AFTER 9 Nocturnal Verified ID</span>
        </div>

      </div>
    </div>
  );
};
