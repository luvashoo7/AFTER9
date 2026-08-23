import React, { useState } from 'react';
import { PILOT_ZONES } from '../data/products';
import { MapPin, Radio, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PilotZone = () => {
  const [selectedZone, setSelectedZone] = useState(PILOT_ZONES[0]);
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#a3e635', '#a78bfa']
    });
  };

  return (
    <section id="coverage" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#06060a] via-[#0b0b14] to-[#06060a]">
      
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#38bdf8]/04 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#121220] border border-[#a3e635]/30 text-[#bef264] px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5 text-[#a3e635] animate-pulse" /> PILOT PHASE 1 LAUNCH
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white uppercase leading-[0.95]">
            WE'RE STARTING AFTER 9 — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#38bdf8] to-[#a78bfa]">
              IN GREATER NOIDA.
            </span>
          </h2>

          <div className="text-slate-300 text-base sm:text-lg font-mono space-y-1 max-w-2xl mx-auto pt-2">
            <p>“Greater Noida is our first playground.</p>
            <p>Noida is next. Delhi NCR after that.</p>
            <p className="text-[#bef264] font-bold">And then… wherever the night needs us.”</p>
          </div>
        </div>

        {/* Interactive Pilot Map & Zone Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Stylized Dark Radar Map */}
          <div className="lg:col-span-7 bg-[#090912] rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#a3e635] animate-radar"></span>
                <span className="font-display font-bold text-white text-sm uppercase">
                  Greater Noida Pilot Coverage Radar
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Hub Active • 10-15m ETA
              </span>
            </div>

            {/* Radar Grid Graphic */}
            <div className="relative aspect-[16/10] my-6 rounded-2xl bg-[#06060c] border border-white/5 overflow-hidden flex items-center justify-center p-6">
              
              {/* Radar Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[85%] h-[85%] rounded-full border border-[#a3e635]/15 animate-ping" style={{ animationDuration: '6s' }}></div>
                <div className="w-[65%] h-[65%] rounded-full border border-white/10"></div>
                <div className="w-[40%] h-[40%] rounded-full border border-[#a3e635]/20"></div>
                <div className="w-[15%] h-[15%] rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30"></div>
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

              {/* Interactive Sector Nodes */}
              <div className="relative z-10 w-full h-full">
                
                {/* Pari Chowk Central Node */}
                <button
                  onClick={() => setSelectedZone(PILOT_ZONES[0])}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group text-center"
                >
                  <div className="w-9 h-9 rounded-full bg-[#a3e635] text-[#06060a] font-black text-xs flex items-center justify-center mx-auto shadow-lime-glow group-hover:scale-125 transition-transform">
                    <MapPin className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-white bg-[#06060c]/90 px-2 py-0.5 rounded border border-[#a3e635]/40 mt-1 block">
                    Pari Chowk Hub ⚡
                  </span>
                </button>

                {/* Knowledge Park Node */}
                <button
                  onClick={() => setSelectedZone(PILOT_ZONES[1])}
                  className="absolute top-1/4 left-1/4 group text-center"
                >
                  <div className="w-6 h-6 rounded-full bg-[#a78bfa] text-white flex items-center justify-center mx-auto shadow-purple-glow group-hover:scale-125 transition-transform">
                    <MapPin className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 bg-[#06060c]/90 px-1.5 py-0.5 rounded border border-white/10 mt-1 block">
                    Knowledge Park 1-3
                  </span>
                </button>

                {/* Alpha & Beta Nodes */}
                <button
                  onClick={() => setSelectedZone(PILOT_ZONES[2])}
                  className="absolute top-1/3 right-1/4 group text-center"
                >
                  <div className="w-6 h-6 rounded-full bg-[#38bdf8] text-black flex items-center justify-center mx-auto group-hover:scale-125 transition-transform">
                    <MapPin className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 bg-[#06060c]/90 px-1.5 py-0.5 rounded border border-white/10 mt-1 block">
                    Alpha 1 & 2
                  </span>
                </button>

                {/* Techzone 4 / Gaur City Node */}
                <button
                  onClick={() => setSelectedZone(PILOT_ZONES[5])}
                  className="absolute bottom-1/4 right-1/3 group text-center"
                >
                  <div className="w-6 h-6 rounded-full bg-[#a3e635]/80 text-black flex items-center justify-center mx-auto group-hover:scale-125 transition-transform">
                    <MapPin className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 bg-[#06060c]/90 px-1.5 py-0.5 rounded border border-white/10 mt-1 block">
                    Techzone 4
                  </span>
                </button>

              </div>

            </div>

            {/* Selected Sector Details Box */}
            <div className="p-4 rounded-2xl bg-[#10101e] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-[#bef264] font-bold uppercase">
                  SELECTED SECTOR: {selectedZone.name}
                </p>
                <p className="text-xs text-slate-300">
                  Status: <strong className="text-emerald-400">{selectedZone.status}</strong> • Average ETA: <strong className="text-white">{selectedZone.eta}</strong>
                </p>
              </div>
              <a
                href="#categories"
                className="btn-primary text-xs font-mono font-bold px-4 py-2 rounded-xl shrink-0"
              >
                Order to This Zone →
              </a>
            </div>

          </div>

          {/* Right: Waitlist & Expansion Form */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
                  EXPANDING ACROSS DELHI NCR
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                  GET NOTIFIED WHEN WE ARRIVE IN YOUR SECTOR
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Living outside our current Greater Noida pilot zone? Drop your mobile number to get an instant alert & ₹100 launch credit when your pin code goes live.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 uppercase block mb-2">
                      Enter Your Mobile Number (10-Digit)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-mono text-sm">
                        +91
                      </div>
                      <input
                        type="tel"
                        maxLength="10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        className="w-full bg-[#080812] border border-white/15 focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635] rounded-2xl pl-14 pr-4 py-3.5 text-sm font-mono text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>
                    {errorMsg && <p className="text-xs text-rose-400 font-mono mt-1.5">{errorMsg}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lime-glow flex items-center justify-center gap-2 group"
                  >
                    <span>JOIN THE NIGHT</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-[#0b1a10] border border-emerald-500/40 text-center space-y-3 animate-in zoom-in-95">
                  <CheckCircle2 className="w-10 h-10 text-[#a3e635] mx-auto" />
                  <p className="font-display font-black text-lg text-white uppercase">
                    You're on the Night List!
                  </p>
                  <p className="text-xs text-slate-300 font-mono">
                    We'll notify +91 {phone} the minute your sector goes live with ₹100 credit.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#a3e635]" />
                <span>Zero spam. Only launch & midnight drop updates.</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
