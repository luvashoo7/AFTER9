import React from 'react';
import { ShieldCheck, ArrowRight, RotateCcw, Box, CheckCircle2, Sparkles } from 'lucide-react';
import { useInsideHub } from '../context/InsideHubContext';

export const OpenBoxUSP = () => {
  const { openHub } = useInsideHub();

  return (
    <section id="open-box-usp" className="py-12 relative overflow-hidden bg-[#06060a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Sleek Compact Open-Box Spotlight Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#101022] via-[#0c0c18] to-[#080812] border-2 border-[#a3e635]/35 p-6 sm:p-8 shadow-2xl overflow-hidden">
          
          {/* Subtle glow orb */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#a3e635]/06 blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            
            {/* Left Info & Steps */}
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#bef264] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#a3e635]" />
                THE AFTER 9 FLAGSHIP PROMISE
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                  SEE IT. CHECK IT. <span className="text-[#a3e635]">ACCEPT IT.</span>
                </h3>
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Open your order before you accept it.</strong> Wrong item, damaged packaging, or missing product? Return it instantly with the delivery partner at your doorstep. Zero waiting for pickup.
                </p>
              </div>

              {/* 3 Quick Micro-Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
                <div className="flex items-center gap-1.5 bg-[#141426] px-3 py-1.5 rounded-xl border border-white/10 text-slate-200">
                  <span className="font-black text-[#a3e635]">01</span>
                  <span>Open at Doorstep</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#141426] px-3 py-1.5 rounded-xl border border-white/10 text-slate-200">
                  <span className="font-black text-purple-300">02</span>
                  <span>Inspect Items</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#141426] px-3 py-1.5 rounded-xl border border-white/10 text-slate-200">
                  <span className="font-black text-emerald-400">03</span>
                  <span>Accept or Return</span>
                </div>
              </div>
            </div>

            {/* Right Action Button to launch interactive unboxing simulator inside modal */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => openHub('trust')}
                className="btn-primary px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lime-glow group"
              >
                <span>TEST DOORSTEP SIMULATOR</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-[11px] font-mono text-slate-400 text-center lg:text-right">
                ⚡ 100% No Blind Deliveries
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
