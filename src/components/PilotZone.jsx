import React, { useState } from 'react';
import { MapPin, Radio, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useInsideHub } from '../context/InsideHubContext';
import confetti from 'canvas-confetti';

export const PilotZone = () => {
  const { openHub } = useInsideHub();
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMsg('Enter valid 10-digit number');
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
    <section id="coverage" className="py-12 relative overflow-hidden bg-[#06060a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Compact Pilot Zone Spotlight */}
        <div className="rounded-3xl bg-[#0b0b14] border border-white/10 p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#121220] border border-[#a3e635]/30 text-[#bef264] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 text-[#a3e635] animate-pulse" />
                PILOT PHASE 1 LIVE
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                SERVING <span className="text-[#a3e635]">GREATER NOIDA</span> (9 PM — 6 AM)
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 font-mono">
                Active hubs in Pari Chowk, Knowledge Park (1, 2, 3), Alpha, Beta, Gamma, Delta & Techzone 4.
                Average doorstep ETA: <strong className="text-[#bef264]">10-15 mins</strong>.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openHub('pilot')}
                className="btn-secondary px-5 py-3 rounded-2xl text-xs font-mono font-bold flex items-center gap-2 hover:border-[#a3e635]/50"
              >
                <MapPin className="w-4 h-4 text-[#a3e635]" />
                <span>View Full Sector Radar Map</span>
              </button>

              <a
                href="#store"
                className="btn-primary px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider"
              >
                Order to My Sector →
              </a>
            </div>

          </div>

          {/* Quick Notify Strip for outside users */}
          <div className="p-4 rounded-2xl bg-[#07070e] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300 font-mono text-center md:text-left">
              <span className="w-2 h-2 rounded-full bg-[#a78bfa] shrink-0"></span>
              <span>Living outside Greater Noida? Get notified when Noida / Delhi NCR goes live + ₹100 credit.</span>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleWaitlistSubmit} className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="tel"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit mobile"
                  className="bg-[#121220] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 outline-none w-full md:w-44 focus:border-[#a3e635]"
                />
                <button
                  type="submit"
                  className="btn-primary px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap"
                >
                  Notify Me
                </button>
              </form>
            ) : (
              <span className="text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> You're on the list (+91 {phone})
              </span>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
