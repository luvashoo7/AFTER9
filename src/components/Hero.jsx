import React from 'react';
import { ArrowRight, Sparkles, Clock, MapPin, Zap, ShieldCheck, CheckCircle2, Compass } from 'lucide-react';
import { useInsideHub } from '../context/InsideHubContext';

export const Hero = () => {
  const { openHub } = useInsideHub();

  return (
    <section className="relative min-h-[88vh] pt-32 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-[#a3e635]/08 via-[#a78bfa]/08 to-transparent blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Gen-Z copy, and CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Pill badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-[#0f0f1c] border border-white/10 px-4 py-2 rounded-full shadow-lg backdrop-blur-md">
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#a3e635]">
                <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-radar"></span>
                9 PM — 5/6 AM
              </span>
              <span className="text-white/20">•</span>
              <button 
                onClick={() => openHub('pilot')}
                className="text-xs font-mono text-slate-300 flex items-center gap-1 hover:text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#a3e635]" /> Currently serving Greater Noida
              </button>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-500/30">
                Pilot Phase 1
              </span>
            </div>

            {/* Main Headline with high-impact bold typography */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#a78bfa] uppercase font-bold flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-[#a3e635]" /> NIGHT COMMERCE. DELIVERED INSTANTLY.
              </p>
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white">
                NEED IT <br />
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#bef264] to-[#a78bfa] drop-shadow-[0_0_30px_rgba(163,230,53,0.25)]">
                  AFTER 9?
                </span>
              </h1>
            </div>

            {/* Subheadline from AGENTS.md */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Snacks. Essentials. Party packs. Midnight cravings. <br className="hidden sm:inline" />
              <span className="text-white font-semibold">Delivered instantly while the city sleeps.</span>
            </p>

            {/* Core USP micro-callout */}
            <a
              href="#open-box-usp"
              className="p-3.5 rounded-2xl bg-[#0d0d18]/80 border border-[#a3e635]/20 flex items-center gap-3 text-left max-w-xl mx-auto lg:mx-0 shadow-xl backdrop-blur-md hover:border-[#a3e635]/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#a3e635]" />
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-[#bef264]">SEE IT. CHECK IT. ACCEPT IT.</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#a78bfa]/20 text-purple-300">Open-Box</span>
                </p>
                <p className="text-slate-400 text-xs">
                  Inspect your package right at the doorstep. Don't like it? Return it instantly.
                </p>
              </div>
            </a>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#store"
                className="w-full sm:w-auto btn-primary px-8 py-4 rounded-2xl text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-3 shadow-lime-glow group"
              >
                <span>ORDER AFTER 9</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => openHub('manifesto')}
                className="w-full sm:w-auto btn-secondary px-7 py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:border-[#a3e635]/50"
              >
                <Compass className="w-4 h-4 text-[#a78bfa]" />
                <span>EXPLORE THE NIGHT SHIFT</span>
                <span className="text-xs bg-[#a3e635]/20 text-[#bef264] font-mono px-2 py-0.5 rounded-full">HUB</span>
              </button>
            </div>

            {/* Micro stats counter */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0 border-t border-white/[0.08] text-center lg:text-left">
              <div>
                <p className="font-display font-black text-2xl text-white">9 PM-6 AM</p>
                <p className="text-[11px] font-mono text-slate-400 uppercase">Operational Window</p>
              </div>
              <div>
                <p className="font-display font-black text-2xl text-[#bef264]">10-15m</p>
                <p className="text-[11px] font-mono text-slate-400 uppercase">Instant Doorstep ETA</p>
              </div>
              <div>
                <p className="font-display font-black text-2xl text-[#a78bfa]">100%</p>
                <p className="text-[11px] font-mono text-slate-400 uppercase">Open-Box Guarantee</p>
              </div>
            </div>

          </div>

          {/* Right Column: Cinematic Night Visual & Live Order Floating Cards */}
          <div className="lg:col-span-5 relative">
            
            {/* Frame Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer glowing border */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#a3e635]/30 via-white/10 to-[#a78bfa]/30 shadow-2xl overflow-hidden">
                
                {/* Visual Canvas Card */}
                <div className="relative rounded-[22px] bg-[#0a0a14] overflow-hidden aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex flex-col justify-between p-6">
                  
                  {/* Atmospheric Night Background Image with overlay */}
                  <img
                    src="/hero-rider.jpg"
                    alt="AFTER 9 Rider in Greater Noida Night"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen scale-105 transition-transform duration-1000 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-[#06060a]/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(163,230,53,0.15),transparent_60%)]"></div>

                  {/* Rider Scooter Neon Graphic Overlay */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-[#06060c]/90 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="text-xs font-mono font-bold text-slate-200">LIVE RIDER RADAR</span>
                    </div>
                    <div className="bg-[#a3e635] text-[#06060a] text-xs font-mono font-black px-2.5 py-1 rounded-lg shadow-lime-glow flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 02:17 AM
                    </div>
                  </div>

                  {/* Center Hero Artwork: Branded AFTER 9 Night Bag */}
                  <div className="relative z-10 my-auto text-center space-y-3 py-6">
                    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#a3e635]/25 to-[#a78bfa]/25 blur-xl animate-pulse"></div>
                      
                      <div className="relative w-40 h-40 rounded-2xl bg-gradient-to-b from-[#141424] to-[#080810] border-2 border-[#a3e635]/50 p-4 shadow-2xl flex flex-col justify-between transform -rotate-2 hover:rotate-0 transition-transform">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#bef264] font-bold">AFTER 9 FLEET</span>
                          <span className="w-2 h-2 rounded-full bg-[#a3e635]"></span>
                        </div>
                        <div className="text-center py-1">
                          <div className="text-3xl font-black text-white tracking-tighter">AFTER <span className="text-[#a3e635]">9</span></div>
                          <div className="text-[9px] font-mono text-slate-400 tracking-wider uppercase">NIGHT COMMERCE</div>
                        </div>
                        <div className="flex justify-between items-center bg-[#06060a]/90 px-2 py-1 rounded-lg border border-white/5 text-[10px] text-slate-300">
                          <span>🍟 Chips & Cold Brew</span>
                          <span className="text-[#bef264] font-bold">READY</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs font-mono text-slate-300 font-semibold tracking-wide">
                      “Everyone else is asleep. We’re still delivering.”
                    </p>
                  </div>

                  {/* Floating live simulated order status chips */}
                  <div className="relative z-10 space-y-2">
                    
                    {/* Chip 1: Rider nearby */}
                    <div className="bg-[#0e0e1c]/95 border border-[#a3e635]/35 p-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#a3e635]/15 border border-[#a3e635]/35 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-[#a3e635]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white flex items-center gap-1.5">
                            Rider Nearby <span className="text-[#bef264] font-mono text-[10px]">• 3 min away</span>
                          </p>
                          <p className="text-[11px] text-slate-400">Pari Chowk → Alpha 1 Sector</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-[#a3e635]/10 text-[#bef264] px-2 py-0.5 rounded border border-[#a3e635]/30">
                        LIVE
                      </span>
                    </div>

                    {/* Chip 2: Open-Box Verification */}
                    <div className="bg-[#0e0e1c]/90 border border-white/10 p-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#a78bfa]/20 border border-[#a78bfa]/40 flex items-center justify-center">
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
                        </div>
                        <span className="text-xs text-slate-200 font-medium">Doorstep Open-Box Return Ready</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-[#a3e635]" />
                    </div>

                  </div>

                </div>
              </div>

              {/* Floating decorative badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#a3e635] to-[#bef264] text-[#06060a] px-4 py-1.5 rounded-full text-xs font-black uppercase font-mono shadow-lime-glow tracking-wider transform rotate-3">
                🌙 GREATER NOIDA PILOT
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
