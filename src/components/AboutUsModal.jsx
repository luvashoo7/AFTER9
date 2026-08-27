import React from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Moon, ShieldCheck, Zap, Compass, MapPin, Heart } from 'lucide-react';

export const AboutUsModal = () => {
  const { isAboutModalOpen, setIsAboutModalOpen } = useAuth();

  if (!isAboutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAboutModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
            <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
              ABOUT AFTER 9 NIGHT COMMERCE
            </span>
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            BUILT FOR THE <span className="text-[#a3e635]">NIGHT SHIFT</span>
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Greater Noida's dedicated 9 PM — 6 AM emergency & cravings lifeline
          </p>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-xs font-mono text-slate-300 leading-relaxed">
          
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-display uppercase">Why AFTER 9 Exists</h4>
            <p>
              Daytime quick commerce shuts down right when Greater Noida’s students, software engineers, doctors, and exam crunchers need it most.
            </p>
            <p>
              We built AFTER 9 with dedicated nighttime dark stores in Pari Chowk, stocking ice-cold beverages, midnight cravings, ₹10 spices, tech lifelines, and emergency OTC essentials.
            </p>
          </div>

          {/* 4 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-white font-bold font-display text-xs">
                <Zap className="w-4 h-4 text-[#a3e635]" />
                <span>10-15m Dispatch</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Central hub strategically situated for lightning-fast routing across Knowledge Park & residential sectors.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-white font-bold font-display text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Open-Box Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-400">
                100% Zero-Blind delivery. Inspect every item on your doorstep before accepting. Reject anytime.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-white font-bold font-display text-xs">
                <Moon className="w-4 h-4 text-purple-400" />
                <span>Strictly 9 PM — 6 AM</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Laser-focused on late night convenience when other platforms are offline.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-white font-bold font-display text-xs">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Rider First</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Electric vehicle fleet, 100% direct tips, and night-shift transit bonuses for all electric riders.
              </p>
            </div>
          </div>

          {/* Dark Store Specs */}
          <div className="p-4 rounded-2xl bg-[#0a0a14] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-white font-bold font-display text-xs">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#a3e635]" /> Pari Chowk Dark Store Hub #01
              </span>
              <span className="text-[#a3e635] font-mono text-[10px]">LIVE NOW ⚡</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Capacity: 450+ nocturnal SKUs • Dual -18°C Ice Chillers • Automated Dispatch Corridor
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>“Whatever you need after 9.”</span>
          <span className="text-[#a3e635]">GREATER NOIDA PILOT</span>
        </div>

      </div>
    </div>
  );
};
