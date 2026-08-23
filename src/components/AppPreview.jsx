import React, { useState } from 'react';
import { Smartphone, ShieldCheck, Check, RotateCcw, Package, Clock, MapPin, Zap, Star, Sparkles } from 'lucide-react';

export const AppPreview = () => {
  const [activeScreen, setActiveScreen] = useState('openbox'); // 'home', 'tracking', 'openbox'

  return (
    <section className="py-24 relative overflow-hidden bg-[#07070b]">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#ccff00]/06 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#171728] border border-white/10 text-purple-300 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
            <Smartphone className="w-3.5 h-3.5" /> APP EXPERIENCE PREVIEW
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white uppercase leading-[0.95]">
            NATIVE NIGHT COMMERCE <br />
            <span className="text-[#ccff00]">IN YOUR POCKET.</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Engineered specifically for low-light bedtime ordering, live rider radar, and doorstep open-box resolution.
          </p>
        </div>

        {/* Screen Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto p-1.5 rounded-2xl bg-[#11111e] border border-white/10">
          <button
            onClick={() => setActiveScreen('home')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeScreen === 'home'
                ? 'bg-[#ccff00] text-[#07070b] shadow-lime-glow font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏠 Home Drops
          </button>
          <button
            onClick={() => setActiveScreen('tracking')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeScreen === 'tracking'
                ? 'bg-[#ccff00] text-[#07070b] shadow-lime-glow font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🛵 Live Radar
          </button>
          <button
            onClick={() => setActiveScreen('openbox')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeScreen === 'openbox'
                ? 'bg-[#ccff00] text-[#07070b] shadow-lime-glow font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📦 Open-Box UI
          </button>
        </div>

        {/* Realistic Mobile Device Mockup */}
        <div className="relative max-w-sm sm:max-w-md mx-auto">
          
          {/* Phone Shell */}
          <div className="relative rounded-[42px] p-3 bg-gradient-to-b from-[#2a2a3e] via-[#151522] to-[#0c0c16] shadow-2xl border-4 border-[#2d2d42]">
            
            {/* Phone Screen Glass */}
            <div className="relative rounded-[32px] bg-[#07070c] overflow-hidden min-h-[580px] border border-white/10 flex flex-col justify-between p-4 sm:p-5">
              
              {/* Dynamic Island / Top Notch */}
              <div className="flex items-center justify-between pb-3 text-[10px] font-mono text-slate-400">
                <span>02:17 AM</span>
                <div className="w-20 h-4 bg-black rounded-full mx-auto border border-white/10 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
                </div>
                <span>5G • 100%</span>
              </div>

              {/* SCREEN CONTENT SWITCHER */}
              
              {/* 1. HOME SCREEN */}
              {activeScreen === 'home' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-slate-400">DELIVERING TO</p>
                      <p className="text-xs font-bold text-white flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#ccff00]" /> Pari Chowk, Gr. Noida
                      </p>
                    </div>
                    <div className="brand-nine text-sm font-black px-2 py-0.5 rounded-lg bg-[#ccff00] text-[#07070b]">
                      9
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-gradient-to-r from-[#1b1b2d] to-[#121220] border border-[#ccff00]/30 space-y-1">
                    <span className="text-[9px] font-mono text-[#ccff00] font-black uppercase">
                      MIDNIGHT FLASH DROP
                    </span>
                    <p className="text-xs font-black text-white">
                      The Craving Pack @ ₹219 (Save ₹56)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Top 2 AM Picks</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-[#11111c] border border-white/5 space-y-1">
                        <span className="text-xl">🍜</span>
                        <p className="text-xs font-bold text-white">Shin Ramyun</p>
                        <p className="text-[10px] text-[#ccff00] font-mono">₹120</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#11111c] border border-white/5 space-y-1">
                        <span className="text-xl">⚡</span>
                        <p className="text-xs font-bold text-white">Red Bull 4-Pack</p>
                        <p className="text-[10px] text-[#ccff00] font-mono">₹460</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. LIVE RADAR TRACKING */}
              {activeScreen === 'tracking' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-3 rounded-2xl bg-[#131322] border border-white/10 text-center space-y-1">
                    <p className="text-[10px] font-mono text-emerald-400 font-bold">RIDER ASSIGNED & ON ROUTE</p>
                    <p className="text-lg font-black text-white">Arriving in 3 Mins</p>
                    <p className="text-[10px] text-slate-400 font-mono">Rider: Vikram S. • Hero Electric Scooter</p>
                  </div>

                  <div className="relative aspect-[4/3] rounded-2xl bg-[#090912] border border-white/5 flex items-center justify-center p-4">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-[#ccff00]/20 border border-[#ccff00] text-[#ccff00] flex items-center justify-center mx-auto animate-radar">
                        <Zap className="w-6 h-6 fill-current" />
                      </div>
                      <p className="text-[11px] font-mono text-slate-300">Approaching Alpha 1 Main Gate</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0a0a14] border border-white/10 text-[10px] font-mono text-purple-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#a855f7] shrink-0" />
                    <span>Prepare to unbox & verify at doorstep before OTP</span>
                  </div>
                </div>
              )}

              {/* 3. OPEN-BOX DOORSTEP RETURN SCREEN (Key specification from AGENTS.md) */}
              {activeScreen === 'openbox' && (
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-0.5">
                    <p className="text-[11px] font-mono text-[#ccff00] font-black uppercase">
                      DELIVERY ARRIVED AT DOORSTEP
                    </p>
                    <p className="text-xs text-slate-300">
                      Rider is waiting for your visual check
                    </p>
                  </div>

                  {/* OPEN PACKAGE step */}
                  <div className="p-3 rounded-2xl bg-[#121222] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>OPEN PACKAGE</span>
                      <span className="text-[10px] font-mono text-emerald-400">Box Sealed ✓</span>
                    </div>

                    <div className="space-y-1 text-[11px] font-mono text-slate-300">
                      <div className="flex items-center justify-between">
                        <span>• Thums Up 750ml</span>
                        <span className="text-emerald-400">Chilled ✓</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Doritos Flamin Hot</span>
                        <span className="text-emerald-400">Intact ✓</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• ₹10 Chaat Masala</span>
                        <span className="text-emerald-400">Correct ✓</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons from AGENTS.md */}
                  <div className="space-y-2 pt-1">
                    <button className="w-full bg-[#ccff00] text-[#07070b] font-black text-xs py-3 rounded-xl uppercase tracking-wider shadow-lime-glow flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4 stroke-[3]" />
                      EVERYTHING'S GOOD (ACCEPT)
                    </button>

                    <button className="w-full bg-rose-500/10 text-rose-300 border border-rose-500/40 font-bold text-xs py-2.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5" />
                      RETURN ITEM (INSTANT REFUND)
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Nav Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-around text-[10px] font-mono text-slate-400">
                <span className="text-[#ccff00] font-bold">● Drops</span>
                <span>● Search</span>
                <span>● Bag (3)</span>
                <span>● Profile</span>
              </div>

            </div>

          </div>

          {/* Decorative side badge */}
          <div className="absolute -bottom-4 -left-4 bg-[#a855f7] text-white px-3.5 py-1.5 rounded-full text-xs font-mono font-black uppercase shadow-purple-glow">
            ⚡ 0-WAITING RETURN
          </div>

        </div>

      </div>
    </section>
  );
};
