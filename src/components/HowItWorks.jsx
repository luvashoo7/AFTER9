import React from 'react';
import { Smartphone, ShoppingCart, Truck, ShieldCheck, Moon, Zap, Layers, MapPin, Sparkles } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'OPEN THE APP',
      desc: 'Browse curated night inventory between 9 PM and 6 AM.',
      icon: Smartphone,
      accent: 'lime'
    },
    {
      num: '02',
      title: 'PICK WHAT YOU NEED',
      desc: 'From ₹10 spice sachets to full midnight party packs with 1-tap add.',
      icon: ShoppingCart,
      accent: 'purple'
    },
    {
      num: '03',
      title: 'GET IT AT NIGHT',
      desc: 'Instant delivery in supported zones while the rest of the city is asleep.',
      icon: Truck,
      accent: 'cyan'
    },
    {
      num: '04',
      title: 'OPEN. CHECK. ACCEPT.',
      desc: 'Inspect your order at the doorstep. Accept only when 100% satisfied.',
      icon: ShieldCheck,
      accent: 'lime'
    }
  ];

  const whyPillars = [
    {
      title: 'NIGHT-FIRST',
      desc: '“We exist for the hours when everyone else slows down.”',
      icon: Moon,
      color: 'lime'
    },
    {
      title: 'INSTANT',
      desc: '“Get everyday essentials delivered while you’re still awake.”',
      icon: Zap,
      color: 'purple'
    },
    {
      title: 'OPEN-BOX',
      desc: '“See what you’re getting before you accept it.”',
      icon: ShieldCheck,
      color: 'cyan'
    },
    {
      title: 'ACCESSIBLE',
      desc: '“From ₹10 sachets to party packs.”',
      icon: Layers,
      color: 'lime'
    },
    {
      title: 'LOCAL → NATIONAL',
      desc: '“Starting in Greater Noida. Built for India.”',
      icon: MapPin,
      color: 'purple'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#07070b]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-24">
        
        {/* HOW IT WORKS (4 Simple Steps) */}
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#171728] border border-white/10 text-slate-300 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" /> SIMPLE 4-STEP NIGHT COMMERCE
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white uppercase leading-[0.95]">
              HOW IT <span className="text-[#ccff00]">WORKS</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base">
              No complicated ordering. Fast night fulfillment with doorstep verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#ccff00]/40 flex flex-col justify-between group transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono font-black text-3xl text-slate-600 group-hover:text-[#ccff00] transition-colors">
                        {s.num}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#141424] border border-white/10 flex items-center justify-center text-[#ccff00] group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-display font-black text-xl text-white uppercase tracking-tight mb-2">
                      {s.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/5 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
                    <span>Step {idx + 1} of 4</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* WHY AFTER 9 (5 Feature Pillars) */}
        <div className="space-y-12 pt-12 border-t border-white/10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white uppercase">
              WHY <span className="text-[#ccff00]">AFTER 9</span>
            </h2>
            <p className="text-slate-400 text-sm">
              We are not another daytime supermarket with late fees. We are built ground-up for the night.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {whyPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-3xl bg-[#0d0d16] border border-white/10 hover:border-white/25 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#151525] border border-white/10 flex items-center justify-center text-[#ccff00] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-mono">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 text-[10px] font-mono text-[#ccff00]">
                    Pillar 0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
