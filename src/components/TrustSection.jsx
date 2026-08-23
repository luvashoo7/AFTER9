import React from 'react';
import { ShieldCheck, RotateCcw, Activity, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const TrustSection = () => {
  const trustPillars = [
    {
      title: 'OPEN BEFORE ACCEPTING',
      desc: 'Unbox and inspect your items at the doorstep before OTP acceptance.',
      icon: ShieldCheck,
      color: 'lime'
    },
    {
      title: 'INSTANT RETURN',
      desc: 'Wrong flavor or damaged packaging? Hand it right back to the rider. 0 waiting.',
      icon: RotateCcw,
      color: 'purple'
    },
    {
      title: 'REAL-TIME ORDER STATUS',
      desc: 'Live rider radar and active dispatch telemetry across Greater Noida.',
      icon: Activity,
      color: 'cyan'
    },
    {
      title: 'SECURE PAYMENTS',
      desc: 'UPI, Cards, Netbanking & Cash-On-Acceptance at the doorstep.',
      icon: Lock,
      color: 'lime'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#07070b] via-[#0e0e1a] to-[#07070b]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#171728] border border-[#ccff00]/30 text-[#ccff00] px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> NO BLIND DELIVERIES
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white uppercase leading-[0.95]">
            FAST IS GOOD. <br />
            <span className="text-[#ccff00]">TRUST IS BETTER.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            “We don't want you wondering what arrived after the rider leaves. <br className="hidden sm:inline" />
            <strong className="text-white">With open-box delivery, you get the chance to check your order right at the doorstep.</strong>”
          </p>
        </div>

        {/* 4 Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="glass-card rounded-3xl p-7 flex flex-col justify-between border border-white/10 hover:border-[#ccff00]/40 group transition-all"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#151526] border border-white/10 flex items-center justify-center text-[#ccff00] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed by AFTER 9</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
