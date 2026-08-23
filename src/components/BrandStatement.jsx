import React, { useState } from 'react';
import { Moon, Sun, Clock, Zap, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

export const BrandStatement = () => {
  const [activeHourIndex, setActiveHourIndex] = useState(2); // default 2 AM

  const timelineHours = [
    { time: '9 PM', status: 'Stores Closing', otherStores: 'Shuttering down...', after9: '🚀 NIGHT SHIFT STARTS', energy: '100%' },
    { time: '11 PM', status: 'City Sleeping', otherStores: 'Most delivery closed', after9: '⚡ Full Inventory Active', energy: '100%' },
    { time: '12 AM', status: 'Midnight Peak', otherStores: 'Closed / Out of service', after9: '🍕 Midnight Cravings Dispatching', energy: '100%' },
    { time: '1 AM', status: 'Late Night', otherStores: 'Unavailable', after9: '🎉 Party Packs & Drinks Rolling', energy: '100%' },
    { time: '2 AM', status: 'Craving Hour', otherStores: 'Completely Dark', after9: '🔥 Peak Cravings & ₹10 Sachets', energy: '100%' },
    { time: '3 AM', status: 'Deep Night', otherStores: 'No options anywhere', after9: '🔋 Emergency Tech & Cold Brews', energy: '100%' },
    { time: '4 AM', status: 'Pre-Dawn', otherStores: 'Closed', after9: '🍳 Breakfast Emergencies & Eggs', energy: '100%' },
    { time: '5 AM', status: 'Dawn Transition', otherStores: 'Starting morning prep', after9: '🌙 Final Night Drops Running', energy: '100%' },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#06060a] via-[#090912] to-[#06060a]">
      
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a3e635]/15 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#10101c] border border-[#a78bfa]/30 text-purple-300 px-4 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider">
            <Moon className="w-3.5 h-3.5 text-[#a78bfa]" /> NIGHT-COMMERCE MANIFESTO
          </div>
          
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.05]">
            THE CITY SLEEPS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#bef264] to-[#a78bfa] drop-shadow-[0_0_20px_rgba(163,230,53,0.25)]">
              YOUR NEEDS DON'T.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed pt-2">
            Late-night cravings don’t follow store timings. Neither should your essentials. <br className="hidden sm:inline" />
            <strong className="text-white">AFTER 9</strong> brings everyday essentials to your doorstep when most places have already called it a night.
          </p>
        </div>

        {/* Interactive Night Timeline 9 PM -> 5 AM */}
        <div className="bg-[#0b0b14]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#a3e635]" /> 
                The 9 PM — 6 AM Night Timeline
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Click any hour to see why daytime quick commerce goes offline while AFTER 9 stays active.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-rose-400">
                <XCircle className="w-4 h-4" /> Other Apps: Offline
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5 text-[#bef264] font-bold">
                <CheckCircle2 className="w-4 h-4" /> AFTER 9: 100% Active
              </span>
            </div>
          </div>

          {/* Timeline Hour Selector Buttons */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {timelineHours.map((slot, index) => {
              const isSelected = activeHourIndex === index;
              return (
                <button
                  key={slot.time}
                  onClick={() => setActiveHourIndex(index)}
                  className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-[#a3e635] text-[#06060a] border-[#a3e635] shadow-lime-glow font-black scale-105'
                      : 'bg-[#10101e] text-slate-300 border-white/5 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-mono uppercase tracking-wider">{slot.time}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-[#06060a] font-bold' : 'text-slate-500'}`}>
                    {slot.status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Hour Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl bg-[#06060c] border border-white/5">
            
            {/* Left: Traditional Stores */}
            <div className="p-4 rounded-xl bg-[#0d0d16]/80 border border-rose-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-rose-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> REGULAR GROCERY & 10-MIN APPS
                </span>
                <span>STATUS: CLOSED</span>
              </div>
              <p className="text-slate-400 text-sm">
                "{timelineHours[activeHourIndex].otherStores}"
              </p>
              <p className="text-xs text-slate-500">
                Shutters down, dark stores offline, surging late fees, or 10-hour next morning delivery slots.
              </p>
            </div>

            {/* Right: AFTER 9 Active */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#121222] to-[#0e0e1a] border border-[#a3e635]/35 space-y-2 shadow-lime-glow">
              <div className="flex items-center justify-between text-xs font-mono text-[#bef264] font-bold">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#a3e635] fill-current" /> AFTER 9 NIGHT FLEET
                </span>
                <span className="bg-[#a3e635]/10 text-[#bef264] px-2 py-0.5 rounded border border-[#a3e635]/30">
                  {timelineHours[activeHourIndex].time} ACTIVE
                </span>
              </div>
              <p className="text-white font-bold text-sm">
                {timelineHours[activeHourIndex].after9}
              </p>
              <p className="text-xs text-slate-300">
                Fresh inventory, night riders on duty across Greater Noida, instant doorstep open-box inspection.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
