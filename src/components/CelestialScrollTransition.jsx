import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, Clock, ArrowDown } from 'lucide-react';

export const CelestialScrollTransition = () => {
  const [scrollProgress, setScrollProgress] = useState(0); // 0 (top) to 1 (scrolled)
  const [nightTime, setNightTime] = useState('8:59 PM');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / 1200));
      setScrollProgress(progress);

      // Interpolate time from 8:45 PM to 2:17 AM based on scroll
      if (progress < 0.2) {
        setNightTime('8:45 PM — Sunset');
      } else if (progress < 0.4) {
        setNightTime('8:59 PM — Shutter Down');
      } else if (progress < 0.7) {
        setNightTime('9:00 PM — AFTER 9 LIVE 🌙');
      } else {
        setNightTime('02:17 AM — Peak Night Commerce ⚡');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate vertical positions:
  // Sun starts high (e.g. translateY: 0%), and descends downwards past the horizon (translateY: 160%)
  const sunTranslateY = scrollProgress * 150;
  const sunOpacity = Math.max(0, 1 - scrollProgress * 1.6);
  const sunScale = Math.max(0.6, 1 - scrollProgress * 0.4);

  // Moon starts below horizon (translateY: 150%), and rises upwards to center/high (translateY: 0%)
  const moonTranslateY = Math.max(0, (1 - scrollProgress) * 150);
  const moonOpacity = Math.min(1, scrollProgress * 1.5);
  const moonScale = Math.min(1.1, 0.7 + scrollProgress * 0.4);

  return (
    <div className="relative max-w-4xl mx-auto my-12 px-4">
      {/* Container Frame */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0e0e18] via-[#090912] to-[#06060a] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Dynamic Sky Ambient Background */}
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            background: scrollProgress > 0.4
              ? 'radial-gradient(ellipse at 50% 30%, rgba(167, 139, 250, 0.12), transparent 70%)'
              : 'radial-gradient(ellipse at 50% 30%, rgba(245, 158, 11, 0.15), transparent 70%)',
          }}
        />

        {/* Header & Scroll Prompt */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#a3e635] font-bold flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> CELESTIAL TRANSITION
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase mt-0.5">
              From Sunset to Midnight Commerce
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-[#121220] border border-white/10 px-3.5 py-1.5 rounded-full font-mono text-xs text-slate-200">
            <Clock className="w-3.5 h-3.5 text-[#a3e635]" />
            <span className="font-bold">{nightTime}</span>
          </div>
        </div>

        {/* Celestial Stage Viewport */}
        <div className="relative h-56 sm:h-64 my-6 rounded-2xl bg-[#07070d] border border-white/5 overflow-hidden flex items-center justify-center">
          
          {/* Horizon Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-10 flex items-center justify-center">
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 bg-[#07070d] px-3">
              9:00 PM HORIZON
            </span>
          </div>

          {/* Star particles in stage */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

          {/* THE SUN (Descending on Scroll) */}
          <div
            className="absolute transition-transform duration-300 ease-out flex flex-col items-center justify-center"
            style={{
              transform: `translateY(${sunTranslateY}px) scale(${sunScale})`,
              opacity: sunOpacity,
            }}
          >
            {/* Glowing Sun Orb */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_50px_rgba(245,158,11,0.6)] flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 animate-pulse"></div>
              <Sun className="w-10 h-10 text-amber-950 absolute" />
            </div>
            <span className="text-[10px] font-mono text-amber-300 mt-2 font-bold bg-[#07070d]/80 px-2 py-0.5 rounded border border-amber-500/20">
              DAYTIME STORES ACTIVE
            </span>
          </div>

          {/* THE MOON (Ascending on Scroll) */}
          <div
            className="absolute transition-transform duration-300 ease-out flex flex-col items-center justify-center z-20"
            style={{
              transform: `translateY(${moonTranslateY}px) scale(${moonScale})`,
              opacity: moonOpacity,
            }}
          >
            {/* Glowing Moon Orb with soft lunar glow & crater texture */}
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-slate-200 via-slate-100 to-white shadow-[0_0_45px_rgba(163,230,53,0.35),0_0_80px_rgba(167,139,250,0.25)] flex items-center justify-center">
              {/* Moon craters */}
              <div className="absolute top-4 left-6 w-5 h-5 rounded-full bg-slate-300/40"></div>
              <div className="absolute bottom-6 right-7 w-6 h-6 rounded-full bg-slate-300/50"></div>
              <div className="absolute top-10 right-5 w-3 h-3 rounded-full bg-slate-300/30"></div>
              <div className="absolute bottom-8 left-8 w-4 h-4 rounded-full bg-slate-300/30"></div>
              
              {/* Distinctive '9' watermark badge inside moon */}
              <span className="font-display font-black text-2xl text-[#0a0a14] opacity-85 tracking-tighter">
                9
              </span>
            </div>
            
            <span className="text-[10px] font-mono text-[#bef264] mt-2 font-black bg-[#0a0a16]/90 px-2.5 py-0.5 rounded-full border border-[#a3e635]/30 shadow-md">
              AFTER 9 COMMERCE TAKES OVER 🌙
            </span>
          </div>

        </div>

        {/* Scroll Instruction / Explanation Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-2">
          <div className="flex items-center gap-2">
            <ArrowDown className="w-4 h-4 text-[#a3e635] animate-bounce" />
            <span>Scroll down to see the sun set & AFTER 9 moonlight delivery activate</span>
          </div>
          <span className="text-[#a3e635] font-semibold">
            {scrollProgress > 0.5 ? '✓ Night Shift In Full Effect' : '↓ Keep Scrolling'}
          </span>
        </div>

      </div>
    </div>
  );
};
