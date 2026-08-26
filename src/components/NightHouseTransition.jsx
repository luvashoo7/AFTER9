import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, Clock, Zap, Sparkles, Volume2, VolumeX, 
  Tv, Music, Gamepad2, BookOpen, Coffee, Flame, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { useInsideHub } from '../context/InsideHubContext';
import confetti from 'canvas-confetti';

export const NightHouseTransition = () => {
  const { openHub } = useInsideHub();
  const [selectedHour, setSelectedHour] = useState(2); // 0: 9 PM, 1: 11 PM, 2: 1 AM, 3: 2:17 AM (Peak), 4: 4:30 AM
  const [activeWindow, setActiveWindow] = useState('party'); // 'gamer', 'party', 'chef', 'study'
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [riderMoving, setRiderMoving] = useState(true);

  const hoursData = [
    {
      time: '09:00 PM',
      title: 'City Shutters Down → AFTER 9 Activates',
      vibe: 'Night Shift Kickoff',
      skyGradient: 'from-[#0e0c1f] via-[#090814] to-[#06060a]',
      streetLightColor: '#f59e0b',
      neonGlow: 'rgba(163, 230, 53, 0.4)',
      activity: 'Regular grocery apps offline. AFTER 9 hubs go live across Greater Noida.',
      ordersCount: 42
    },
    {
      time: '11:00 PM',
      title: 'Midnight Prep & Snack Rush',
      vibe: 'Couch & Movie Streamers',
      skyGradient: 'from-[#0b0a1a] via-[#070610] to-[#06060a]',
      streetLightColor: '#a78bfa',
      neonGlow: 'rgba(167, 139, 250, 0.5)',
      activity: 'Chips, cold drinks, and popcorn packs flying out to Alpha & Beta sectors.',
      ordersCount: 118
    },
    {
      time: '01:00 AM',
      title: 'House Party & High Energy',
      vibe: 'Music, Ice & Mixers',
      skyGradient: 'from-[#080816] via-[#06060e] to-[#06060a]',
      streetLightColor: '#38bdf8',
      neonGlow: 'rgba(56, 189, 248, 0.5)',
      activity: 'House Party bundles, ice cubes, Red Bull 4-packs, and plastic cups dispatching.',
      ordersCount: 240
    },
    {
      time: '02:17 AM',
      title: 'PEAK NIGHT COMMERCE 🔥',
      vibe: '2 AM Cravings & ₹10 Hacks',
      skyGradient: 'from-[#0a0818] via-[#070712] to-[#06060a]',
      streetLightColor: '#a3e635',
      neonGlow: 'rgba(163, 230, 53, 0.8)',
      activity: 'Shin Ramyun, Maggi 4-packs, ₹10 Catch Chaat Masala & chocolates delivering in 12 mins.',
      ordersCount: 385
    },
    {
      time: '04:30 AM',
      title: 'Dawn Prep & Breakfast Emergencies',
      vibe: 'All-Nighters & Fresh Eggs',
      skyGradient: 'from-[#141026] via-[#0a0816] to-[#06060a]',
      streetLightColor: '#bef264',
      neonGlow: 'rgba(190, 242, 100, 0.5)',
      activity: 'Brown eggs 6s, fresh bread, butter, and Sleepy Owl cold brews arriving at doorsteps.',
      ordersCount: 94
    }
  ];

  const currentHour = hoursData[selectedHour];

  const windowStories = {
    gamer: {
      title: 'Flat 302: 4-Player Gaming Marathon',
      icon: Gamepad2,
      tag: 'CRAVING DETECTED',
      text: '“Down 2-0 in Valorant. Red Bull ran out at 2:03 AM. AFTER 9 delivered 4 chilled cans + Doritos in 11 mins.”',
      order: '⚡ 4x Red Bull + Doritos Flamin Hot',
      status: 'Delivered & Open-Box Verified ✓'
    },
    party: {
      title: 'Flat 504: The Unexpected House Party',
      icon: Music,
      tag: 'PARTY PACK DISPATCHED',
      text: '“10 friends showed up unannounced. Zero mixer, no ice cubes. Ordered The House Party Pack with 1-tap.”',
      order: '🎉 House Party Pack + 1kg Ice Cubes',
      status: 'Rider at Main Gate (2 mins away)'
    },
    chef: {
      title: 'Flat 201: Midnight Egg & Maggi Hack',
      icon: Flame,
      tag: '₹10 FIX ORDERED',
      text: '“Making 2 AM scrambled eggs with Maggi. Needed chaat masala. Bought the ₹10 mini sachet without buying a ₹250 jar.”',
      order: '🍳 6x Brown Eggs + ₹10 Catch Chaat Masala',
      status: 'Accepted at Doorstep ✓'
    },
    study: {
      title: 'Flat 405: 8 AM Semester Exam Prep',
      icon: BookOpen,
      tag: 'EXAM SAVER',
      text: '“Studying 3 chapters before 7 AM viva. Cold coffee and chocolate saved the GPA.”',
      order: '🧠 The Exam Night Pack + Dark Fantasy',
      status: 'Dispatched from Pari Chowk Hub'
    }
  };

  const currentStory = windowStories[activeWindow];

  const triggerRiderSprint = () => {
    setRiderMoving(false);
    setTimeout(() => setRiderMoving(true), 50);
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#a3e635', '#a78bfa']
    });
  };

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-[#06060a] via-[#090814] to-[#06060a]">
      
      {/* Dynamic ambient sky backdrop according to selected hour */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b ${currentHour.skyGradient} transition-colors duration-700 opacity-80`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#121220] border border-[#a3e635]/30 text-[#bef264] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#a3e635] animate-pulse" />
              NIGHT-HOUSE ATMOSPHERIC SIMULATION
            </div>
            
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white uppercase leading-[0.95]">
              WHEN THE CITY SLEEPS, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#bef264] to-[#a78bfa]">
                THE NIGHT HOUSE LIGHTS UP.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-mono max-w-2xl">
              Slide the time of night to experience how AFTER 9 powers late-night apartments, study grinds, and impromptu parties across Greater Noida.
            </p>
          </div>

          {/* Time Selector Pills */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#0e0e1c] border border-white/10 rounded-2xl overflow-x-auto no-scrollbar">
            {hoursData.map((h, idx) => {
              const isSelected = selectedHour === idx;
              return (
                <button
                  key={h.time}
                  onClick={() => setSelectedHour(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#a3e635] text-[#06060a] font-black shadow-lime-glow scale-105'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{h.time}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Animated Night House & Street Canvas */}
        <div className="relative rounded-3xl bg-[#080812] border-2 border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          {/* Animated Night Sky Stars & Moon in canvas */}
          <div className="absolute top-6 right-10 flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-slate-200 to-white shadow-[0_0_30px_rgba(163,230,53,0.3)] flex items-center justify-center animate-pulse">
              <span className="font-display font-black text-xl text-[#080812]">9</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: The Stylized Night House Building (Interactive Windows) */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#bef264] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping"></span>
                  ALPHA-1 SECTOR • RESIDENTIAL APARTMENTS
                </span>
                <span className="text-[11px] font-mono text-slate-400">Click any lit window to inspect</span>
              </div>

              {/* Building Facade Graphic */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#141424] to-[#0a0a14] border-2 border-white/10 p-6 shadow-2xl space-y-5">
                
                {/* Rooftop Neon Sign */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#a3e635] animate-pulse"></span>
                    <span className="font-display font-black text-sm text-white tracking-widest uppercase">
                      AFTER <span className="text-[#a3e635]">9</span> NIGHT NETWORK ACTIVE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {currentHour.ordersCount} Live Orders in Sector
                  </span>
                </div>

                {/* 4 Interactive Apartments Windows Grid */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Window 1: Party Mode */}
                  <button
                    onClick={() => setActiveWindow('party')}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      activeWindow === 'party'
                        ? 'bg-purple-950/50 border-[#a78bfa] shadow-purple-glow scale-102'
                        : 'bg-[#10101e] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">🎉</span>
                      <span className="text-[10px] font-mono text-purple-300 font-bold">FLAT 504</span>
                    </div>
                    <p className="text-xs font-bold text-white">The House Party</p>
                    <p className="text-[10px] text-slate-400 font-mono">Mixers & Ice Cubes</p>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500/20 blur-lg pointer-events-none"></div>
                  </button>

                  {/* Window 2: Gamer Room */}
                  <button
                    onClick={() => setActiveWindow('gamer')}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      activeWindow === 'gamer'
                        ? 'bg-[#121c0e] border-[#a3e635] shadow-lime-glow scale-102'
                        : 'bg-[#10101e] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">🎮</span>
                      <span className="text-[10px] font-mono text-[#bef264] font-bold">FLAT 302</span>
                    </div>
                    <p className="text-xs font-bold text-white">Gamer Marathon</p>
                    <p className="text-[10px] text-slate-400 font-mono">Red Bull & Doritos</p>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#a3e635]/20 blur-lg pointer-events-none"></div>
                  </button>

                  {/* Window 3: Midnight Chef */}
                  <button
                    onClick={() => setActiveWindow('chef')}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      activeWindow === 'chef'
                        ? 'bg-amber-950/40 border-amber-400 shadow-md scale-102'
                        : 'bg-[#10101e] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">🍳</span>
                      <span className="text-[10px] font-mono text-amber-300 font-bold">FLAT 201</span>
                    </div>
                    <p className="text-xs font-bold text-white">Midnight Chef</p>
                    <p className="text-[10px] text-slate-400 font-mono">Eggs & ₹10 Spices</p>
                  </button>

                  {/* Window 4: Exam Night */}
                  <button
                    onClick={() => setActiveWindow('study')}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      activeWindow === 'study'
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-md scale-102'
                        : 'bg-[#10101e] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">📚</span>
                      <span className="text-[10px] font-mono text-cyan-300 font-bold">FLAT 405</span>
                    </div>
                    <p className="text-xs font-bold text-white">Exam All-Nighter</p>
                    <p className="text-[10px] text-slate-400 font-mono">Cold Brew & Maggi</p>
                  </button>

                </div>

                {/* Animated Street & Electric Rider Road */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>🛵 AFTER 9 ELECTRIC FLEET DISPATCH</span>
                    <button
                      onClick={triggerRiderSprint}
                      className="text-[#a3e635] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Simulate Dispatch Sprint</span>
                      <Zap className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Road Asphalt with animated neon sprint */}
                  <div className="relative h-12 rounded-xl bg-[#06060a] border border-white/10 overflow-hidden flex items-center px-4">
                    {/* Road markings */}
                    <div className="absolute inset-x-0 top-1/2 h-0.5 border-t border-dashed border-white/20"></div>

                    {/* Animated moving scooter */}
                    <div 
                      className={`relative z-10 flex items-center gap-2 transition-all duration-1000 ${
                        riderMoving ? 'translate-x-full duration-[3500ms]' : 'translate-x-0'
                      }`}
                      style={{ animation: 'scooterSprint 4s linear infinite' }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#a3e635] text-black flex items-center justify-center font-black text-xs shadow-lime-glow">
                        🛵
                      </div>
                      <div className="bg-[#0e0e1c]/90 px-2 py-0.5 rounded border border-[#a3e635]/40 text-[10px] font-mono text-[#bef264] whitespace-nowrap">
                        12-min Doorstep ETA ⚡
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right: Selected Window Story Details & Instant Order CTA */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="p-6 sm:p-7 rounded-3xl bg-[#0d0d1a] border border-white/10 space-y-5 shadow-xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#161628] border border-white/10 flex items-center justify-center text-xl">
                      <currentStory.icon className="w-5 h-5 text-[#a3e635]" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-base text-white">
                        {currentStory.title}
                      </h4>
                      <p className="text-[10px] font-mono text-[#a3e635] font-bold">
                        {currentStory.tag} • {currentHour.time}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-full">
                    {currentHour.vibe}
                  </span>
                </div>

                <blockquote className="text-xs sm:text-sm text-slate-300 font-mono italic leading-relaxed bg-[#07070e] p-4 rounded-2xl border border-white/5">
                  {currentStory.text}
                </blockquote>

                <div className="p-3.5 rounded-2xl bg-[#121222] border border-[#a3e635]/30 space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between text-white font-bold">
                    <span>Order Contents:</span>
                    <span className="text-emerald-400 text-[11px]">{currentStory.status}</span>
                  </div>
                  <p className="text-slate-300">{currentStory.order}</p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="#store"
                    className="w-full sm:flex-1 btn-primary py-3 rounded-xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lime-glow"
                  >
                    <span>Order This Midnight Combo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => openHub('trust')}
                    className="w-full sm:w-auto btn-secondary px-4 py-3 rounded-xl text-xs font-mono font-bold hover:border-[#a3e635]/50 whitespace-nowrap"
                  >
                    Open-Box Policy
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
