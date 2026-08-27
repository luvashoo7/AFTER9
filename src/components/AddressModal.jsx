import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PILOT_SECTORS } from '../data/products';
import { X, MapPin, Plus, Check, Trash2, Home, Building2, School, Users, ShieldCheck } from 'lucide-react';

export const AddressModal = () => {
  const { isAddressModalOpen, setIsAddressModalOpen, addresses, activeAddress, selectAddress, addAddress, removeAddress } = useAuth();
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('hostel'); // 'hostel' | 'home' | 'office' | 'friend'
  const [sector, setSector] = useState(PILOT_SECTORS[0]);
  const [flatNo, setFlatNo] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  if (!isAddressModalOpen) return null;

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!flatNo.trim()) return;

    addAddress({
      title: title.trim() || (type === 'hostel' ? 'Hostel Room' : type === 'home' ? 'Apartment' : type === 'office' ? 'Late Lab' : "Friend's Place"),
      type,
      sector,
      flatNo,
      landmark,
      deliveryNotes: deliveryNotes || 'Call upon arrival at gate.',
    });

    setIsAddingNew(false);
    setTitle('');
    setFlatNo('');
    setLandmark('');
    setDeliveryNotes('');
  };

  const getTypeIcon = (t) => {
    switch (t) {
      case 'home': return <Home className="w-4 h-4 text-emerald-400" />;
      case 'office': return <Building2 className="w-4 h-4 text-blue-400" />;
      case 'friend': return <Users className="w-4 h-4 text-purple-400" />;
      default: return <School className="w-4 h-4 text-[#a3e635]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsAddressModalOpen(false);
            setIsAddingNew(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
            <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
              GREATER NOIDA PILOT ZONES
            </span>
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#a3e635]" />
            Delivery Addresses
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Select your midnight drop point or register a new hostel/room
          </p>
        </div>

        {/* CONTENT AREA */}
        <div className="py-5 space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {!isAddingNew ? (
            <>
              {/* Saved Addresses List */}
              <div className="space-y-3">
                {addresses.map((addr) => {
                  const isSelected = activeAddress?.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => selectAddress(addr)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#121824] border-[#a3e635] shadow-lime-glow'
                          : 'bg-[#0f0f1c] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2.5 rounded-xl bg-[#18182a] border border-white/10 shrink-0">
                          {getTypeIcon(addr.type)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white uppercase font-display">{addr.title}</h4>
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#a3e635] text-black">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#bef264] font-mono font-bold">{addr.sector}</p>
                          <p className="text-xs text-slate-300 font-mono">{addr.flatNo}</p>
                          {addr.landmark && (
                            <p className="text-[11px] text-slate-400 font-mono">Near {addr.landmark}</p>
                          )}
                          {addr.deliveryNotes && (
                            <p className="text-[10px] text-[#a78bfa] font-mono italic">
                              Note: {addr.deliveryNotes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-[#a3e635] text-black flex items-center justify-center">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              selectAddress(addr);
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#1c1c30] text-slate-300 hover:text-white"
                          >
                            Select
                          </button>
                        )}

                        {addresses.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeAddress(addr.id);
                            }}
                            className="text-slate-500 hover:text-rose-400 p-1"
                            title="Delete Address"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Address Button */}
              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full py-3.5 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#a3e635] text-slate-300 hover:text-[#bef264] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all bg-white/[0.02]"
              >
                <Plus className="w-4 h-4 text-[#a3e635]" />
                <span>+ ADD NEW GREATER NOIDA ADDRESS</span>
              </button>
            </>
          ) : (
            /* ADD NEW ADDRESS FORM */
            <form onSubmit={handleSaveNewAddress} className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-[#bef264] uppercase">New Address Details</span>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-slate-400 hover:text-white font-mono"
                >
                  ← Back to List
                </button>
              </div>

              {/* Type Selector */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'hostel', label: 'Hostel/PG', icon: '🏢' },
                  { id: 'home', label: 'Apartment', icon: '🏠' },
                  { id: 'office', label: 'Late Lab', icon: '🔬' },
                  { id: 'friend', label: 'Friend', icon: '🍕' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id)}
                    className={`p-2.5 rounded-xl border text-center text-xs font-mono transition-all ${
                      type === t.id
                        ? 'bg-[#a3e635] text-black font-black border-[#a3e635]'
                        : 'bg-[#101020] text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    <div>{t.icon}</div>
                    <div className="text-[10px] mt-1">{t.label}</div>
                  </button>
                ))}
              </div>

              {/* Sector Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">GREATER NOIDA SECTOR</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white rounded-xl px-3 py-3 outline-none"
                >
                  {PILOT_SECTORS.map((s) => (
                    <option key={s} value={s} className="bg-[#0e0e1a] text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Flat / Room No */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">
                  ROOM / FLAT / HOSTEL BLOCK <span className="text-[#a3e635]">*</span>
                </label>
                <input
                  type="text"
                  value={flatNo}
                  onChange={(e) => setFlatNo(e.target.value)}
                  placeholder="e.g. Room 204, Block C, Sharda Girls Hostel"
                  className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none"
                  required
                />
              </div>

              {/* Landmark */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">LANDMARK / ENTRY GATE</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Galgotias Gate 2 or Alpha 2 Commercial Center"
                  className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              {/* Delivery Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">NIGHT RIDER INSTRUCTIONS</label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Call when reaching gate, do not ring bell after midnight."
                  className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="w-1/3 py-3 rounded-xl bg-[#141424] text-slate-300 hover:text-white font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 btn-primary py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>SAVE & SELECT ADDRESS</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" /> Open-Box Inspection at Doorstep
          </span>
          <span className="text-[#a3e635]">10-15 MINS DISPATCH</span>
        </div>

      </div>
    </div>
  );
};
