import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, ShieldCheck, FileText, Lock, RotateCcw, Moon, Sparkles } from 'lucide-react';

export const GeneralInfoModal = () => {
  const { isInfoModalOpen, setIsInfoModalOpen, infoModalTab, openInfoModal } = useAuth();
  const [activeTab, setActiveTab] = useState(infoModalTab || 'manifesto');

  if (!isInfoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsInfoModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
            <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
              POLICIES & LEGAL
            </span>
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            AFTER 9 <span className="text-[#a3e635]">LEGAL & TRUST</span>
          </h3>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 border-b border-white/10 text-xs font-mono">
          {[
            { id: 'manifesto', label: '🌙 Manifesto' },
            { id: 'openbox', label: '🛡️ Open-Box Guarantee' },
            { id: 'terms', label: '📜 Terms of Service' },
            { id: 'privacy', label: '🔒 Privacy Policy' },
            { id: 'refund', label: '💸 Refund Policy' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-2 rounded-xl border whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-[#a3e635] text-black font-black border-[#a3e635]'
                  : 'bg-[#101020] text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-4 space-y-4 max-h-[55vh] overflow-y-auto pr-1 text-xs font-mono text-slate-300 leading-relaxed">
          
          {/* TAB: MANIFESTO */}
          {activeTab === 'manifesto' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white font-display uppercase">The Nocturnal Manifesto</h4>
              <p>
                When daytime commerce closes at 9 PM, India’s student corridors, developers, gamers, doctors, and night-shift workers come alive.
              </p>
              <p>
                AFTER 9 was founded on one unshakeable principle: <strong>Night is not an afterthought</strong>. We operate dedicated 9 PM — 6 AM central dark stores equipped with temperature-controlled chillers and fast electric riders.
              </p>
              <div className="p-4 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-2">
                <p className="font-bold text-[#bef264]">Our 4 Night Commandments:</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-400">
                  <li>⚡ 10-15 Minutes Lightning Dispatch from Pari Chowk Hub.</li>
                  <li>🛡️ 100% Zero-Blind Open-Box Verification at Doorstep.</li>
                  <li>🔒 100% Discreet Packaging for Personal Care & Wellness.</li>
                  <li>💸 Instant 90-Second UPI Reversals for Any Rejected Item.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: OPEN BOX GUARANTEE */}
          {activeTab === 'openbox' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white font-display uppercase">100% Zero-Blind Open-Box Guarantee</h4>
              <p>
                No more surprises or damaged deliveries at 2 AM. With AFTER 9, every order is opened in your presence by the rider before final acceptance.
              </p>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#111122] border border-white/5">
                  <strong className="text-white">1. Doorstep Inspection:</strong> Unseal package with rider. Check cold temperatures on sodas and unbroken seal on snacks.
                </div>
                <div className="p-3 rounded-xl bg-[#111122] border border-white/5">
                  <strong className="text-white">2. Accept or Reject:</strong> If satisfied, accept the order. If unsatisfied with any item, hand it back to the rider.
                </div>
                <div className="p-3 rounded-xl bg-[#111122] border border-white/5">
                  <strong className="text-white">3. Instant UPI Reversal:</strong> 100% of the returned item subtotal is reversed to your source account in 90 seconds.
                </div>
              </div>
            </div>
          )}

          {/* TAB: TERMS */}
          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white font-display uppercase">Terms of Night Service</h4>
              <p>
                By placing an order on AFTER 9, you agree to our nocturnal terms of service operating exclusively within the Greater Noida pilot zone.
              </p>
              <p>
                Orders are dispatched between 9:00 PM and 6:00 AM. In the event of extreme weather or road blockades, ETA may adjust with real-time GPS notification.
              </p>
              <p>
                All prices include applicable taxes. Coupons apply once per user per midnight order session.
              </p>
            </div>
          )}

          {/* TAB: PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white font-display uppercase">Privacy & Discreet Delivery Policy</h4>
              <p>
                Your privacy during late hours is paramount. We do not share or monetize your mobile numbers, hostel room numbers, or order habits.
              </p>
              <p>
                Personal wellness and hygiene items are shipped in non-descript, black opaque sealed bags with zero content labeling to respect your discretion.
              </p>
            </div>
          )}

          {/* TAB: REFUND */}
          {activeTab === 'refund' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white font-display uppercase">Refund & Doorstep Return Policy</h4>
              <p>
                Items can be returned on the spot during the doorstep open-box inspection. Once accepted and rider has departed, unopened packaged goods with defects may be reported to 24/7 Night Support for same-night replacement.
              </p>
              <p>
                When returning an entire order at doorstep, 100% of product subtotal is refunded while a standard ₹29 fee is retained to compensate the electric rider's midnight transit.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 text-center text-[11px] font-mono text-slate-500">
          AFTER 9 Night Commerce Private Limited • Registered in Greater Noida, UP
        </div>

      </div>
    </div>
  );
};
