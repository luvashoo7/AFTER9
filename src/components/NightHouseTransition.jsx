import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, Clock, Zap, Sparkles, Volume2, VolumeX, 
  Play, Pause, Gamepad2, Music, Flame, BookOpen, 
  ShieldCheck, ArrowRight, Radio, Bell, CheckCircle2
} from 'lucide-react';
import { useInsideHub } from '../context/InsideHubContext';
import confetti from 'canvas-confetti';

export const NightHouseTransition = () => {
  const { openHub } = useInsideHub();
  const [selectedHour, setSelectedHour] = useState(3); // Default 02:17 AM Peak
  const [activeWindow, setActiveWindow] = useState('party'); // 'gamer', 'party', 'chef', 'study'
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [liveToastIndex, setLiveToastIndex] = useState(0);

  const hoursData = [
    {
      time: '09:00 PM',
      title: 'City Stores Close → AFTER 9 Starts',
      vibe: 'Night Shift Begins',
      tagColor: 'text-[#a3e635]',
      borderAccent: 'border-[#a3e635]/40',
      activity: 'Daytime grocery apps go offline. AFTER 9 night hubs activate across Greater Noida.',
      ordersCount: 48
    },
    {
      time: '11:00 PM',
      title: 'Midnight Prep & Snack Attack',
      vibe: 'Movie Nights & Drinks',
      tagColor: 'text-[#a78bfa]',
      borderAccent: 'border-[#a78bfa]/40',
      activity: 'Doritos, Kurkure, and cold drinks dispatching to Alpha & Beta sectors.',
      ordersCount: 135
    },
    {
      time: '01:00 AM',
      title: 'House Party & High Energy',
      vibe: 'Mixers, Ice & Munchies',
      tagColor: 'text-[#38bdf8]',
      borderAccent: 'border-[#38bdf8]/40',
      activity: 'House Party bundles, 1kg ice cubes, Red Bull 4-packs rolling out.',
      ordersCount: 268
    },
    {
      time: '02:17 AM',
      title: 'PEAK NIGHT COMMERCE 🔥',
      vibe: '2 AM Cravings & ₹10 Hacks',
      tagColor: 'text-[#a3e635]',
      borderAccent: 'border-[#a3e635]',
      activity: 'Shin Ramyun, Maggi 4-packs, ₹10 Catch Chaat Masala delivering in 11 mins.',
      ordersCount: 412
    },
    {
      time: '04:30 AM',
      title: 'Dawn Prep & Breakfast Emergencies',
      vibe: 'All-Nighters & Fresh Eggs',
      tagColor: 'text-[#bef264]',
      borderAccent: 'border-[#bef264]/40',
      activity: 'Farm fresh brown eggs, Amul butter, bread, and cold brew coffee at doorsteps.',
      ordersCount: 110
    }
  ];

  const currentHour = hoursData[selectedHour];

  // Auto-play timer
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setSelectedHour((prev) => (prev + 1) % hoursData.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Live order ticker rotation
  const liveToasts = [
    '🛵 Rider arriving at Flat 504 with House Party Pack (2m away)',
    '🎮 Flat 302 unboxed 4x Red Bull + Doritos Sizzlin Hot ✓',
    '🍳 Flat 201 ordered 6x Brown Eggs + ₹10 Catch Chaat Masala',
    '🧠 Flat 405 received The Exam Night Pack in 10 mins',
    '🍕 Dispatched: Shin Ramyun + Choco Fills to Knowledge Park-3'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveToastIndex((prev) => (prev + 1) % liveToasts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const windowStories = {
    gamer: {
      flat: 'FLAT 302',
      title: '4-Player Gaming Marathon',
      icon: Gamepad2,
      tag: 'CRAVING DETECTED',
      accentColor: 'text-[#a3e635]',
      badgeBg: 'bg-[#a3e635]/15 border-[#a3e635]/30 text-[#bef264]',
      windowBorder: 'border-[#a3e635] shadow-[0_0_15px_rgba(163,230,53,0.25)]',
      text: '“Down 2-0 in Valorant. Energy drinks ran out at 2:03 AM. AFTER 9 delivered 4 chilled cans + Doritos in 11 mins with doorstep check.”',
      order: '⚡ 4x Red Bull + Doritos Flamin Hot',
      status: 'Delivered & Verified ✓'
    },
    party: {
      flat: 'FLAT 504',
      title: 'The Unexpected House Party',
      icon: Music,
      tag: 'PARTY PACK DISPATCHED',
      accentColor: 'text-[#a78bfa]',
      badgeBg: 'bg-[#a78bfa]/15 border-[#a78bfa]/30 text-purple-300',
      windowBorder: 'border-[#a78bfa] shadow-[0_0_15px_rgba(167,139,250,0.25)]',
      text: '“10 friends showed up unannounced at 1 AM. Zero mixers, no ice cubes. Ordered The House Party Pack with 1-tap.”',
      order: '🎉 House Party Pack + 1kg Ice Cubes + Cups',
      status: 'Rider Nearby (2 mins away)'
    },
    chef: {
      flat: 'FLAT 201',
      title: 'Midnight Egg & Maggi Hack',
      icon: Flame,
      tag: '₹10 FIX ORDERED',
      accentColor: 'text-amber-400',
      badgeBg: 'bg-amber-400/15 border-amber-400/30 text-amber-300',
      windowBorder: 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
      text: '“Making 2 AM scrambled eggs with Maggi. Needed chaat masala. Bought the ₹10 mini sachet without buying a ₹250 jar.”',
      order: '🍳 6x Brown Eggs + ₹10 Catch Chaat Masala',
      status: 'Accepted at Doorstep ✓'
    },
    study: {
      flat: 'FLAT 405',
      title: '8 AM Semester Exam Prep',
      icon: BookOpen,
      tag: 'EXAM SAVER',
      accentColor: 'text-[#38bdf8]',
      badgeBg: 'bg-[#38bdf8]/15 border-[#38bdf8]/30 text-[#38bdf8]',
      windowBorder: 'border-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.25)]',
      text: '“Studying 3 chapters before 7 AM viva. Cold coffee and dark chocolate saved the semester.”',
      order: '🧠 The Exam Night Pack + Sleepy Owl Coffee',
      status: 'Dispatched from Pari Chowk Hub'
    }
  };

  const currentStory = windowStories[activeWindow];

  const triggerRiderSprint = () => {
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.75 },
      colors: ['#a3e635', '#a78bfa', '#38bdf8']
    });
  };

  return (
    <section className="py-16 relative overflow-hidden bg-[#06060a]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#0f0f1c] border border-white/10 text-[#bef264] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#a3e635]" />
              NIGHT SHIFT INTERACTIVE TIMELINE
            </div>
            
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white uppercase leading-[0.95]">
              THE NIGHT HAS <span className="text-[#a3e635]">STORIES.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#bef264] to-[#a78bfa]">
                AFTER 9 HAS THE FIX.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-mono max-w-2xl">
              Select any hour to see real late-night situations across Greater Noida apartments and how instant delivery resolves them.
            </p>
          </div>

          {/* Time Selector Pills & Auto-Play Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
                isAutoPlaying 
                  ? 'bg-[#a3e635] text-[#06060a] border-[#a3e635] shadow-lime-glow font-black' 
                  : 'bg-[#0f0f1c] text-slate-300 border-white/10 hover:border-white/25'
              }`}
              title="Toggle Auto-Cycle"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isAutoPlaying ? 'Auto: ON' : 'Play Cycle'}</span>
            </button>

            <div className="flex items-center gap-1 p-1 bg-[#0c0c16] border border-white/10 rounded-2xl overflow-x-auto no-scrollbar">
              {hoursData.map((h, idx) => {
                const isSelected = selectedHour === idx;
                return (
                  <button
                    key={h.time}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setSelectedHour(idx);
                    }}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
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
        </div>

        {/* Clean, Crisp Canvas Card */}
        <div className="relative rounded-3xl bg-[#090912] border border-white/10 p-5 sm:p-8 shadow-2xl">
          
          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#121220] border border-white/10 flex items-center justify-center text-white font-mono font-black text-sm">
                🌙 9
              </div>
              <div>
                <p className="font-display font-black text-sm text-white uppercase flex items-center gap-2">
                  <span>{currentHour.time} — {currentHour.title}</span>
                  <span className={`text-[10px] font-mono font-bold ${currentHour.tagColor}`}>• {currentHour.vibe}</span>
                </p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {currentHour.activity}
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30 whitespace-nowrap">
              ● {currentHour.ordersCount} Live Orders in Sector
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: 4 Interactive Clean Windows */}
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                Select Apartment Scenario:
              </p>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(windowStories).map(([key, story]) => {
                  const isSelected = activeWindow === key;
                  const Icon = story.icon;
                  const animName = 
                    key === 'party' ? 'subtlePartyPulse 3.2s ease-in-out infinite' :
                    key === 'gamer' ? 'subtleGamerPulse 3s ease-in-out infinite' :
                    key === 'chef' ? 'subtleChefPulse 3.4s ease-in-out infinite' :
                    'subtleStudyPulse 3.1s ease-in-out infinite';

                  return (
                    <button
                      key={key}
                      onClick={() => setActiveWindow(key)}
                      className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group hover:scale-[1.02] ${
                        isSelected
                          ? `bg-[#131326] ${story.windowBorder} ring-2 ring-white/15 scale-[1.02]`
                          : 'bg-[#0e0e1a] border-white/10 hover:border-white/30 text-slate-300'
                      }`}
                      style={{ animation: animName }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl bg-[#1a1a2e] flex items-center justify-center ${story.accentColor} shadow-sm`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded border border-white/10">
                          {story.flat}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white mb-0.5">{story.title}</p>
                      <p className={`text-[10px] font-mono font-bold ${story.accentColor}`}>{story.tag}</p>
                    </button>
                  );
                })}
              </div>

              {/* Crisp Animated Delivery Sprint Strip */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-[#a3e635] font-bold">
                    <Zap className="w-3.5 h-3.5 fill-current" /> AFTER 9 ELECTRIC FLEET DISPATCH
                  </span>
                  <button
                    onClick={triggerRiderSprint}
                    className="text-slate-300 hover:text-[#bef264] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Simulate Boost ⚡</span>
                  </button>
                </div>

                <div className="relative h-14 rounded-xl bg-[#06060c] border border-white/10 overflow-hidden flex items-center px-4">
                  <div className="absolute inset-x-0 top-1/2 h-0.5 border-t border-dashed border-white/20"></div>

                  {/* Animated rider unit: [ETA Pill (Back)] -> [🛵 Bike (Front)] -> [💡 Headlight Beam (Ahead)] */}
                  <div 
                    className="relative z-10 flex items-center gap-2"
                    style={{ animation: 'scooterSprint 4.5s linear infinite' }}
                  >
                    {/* Trailing ETA Badge at the back */}
                    <div className="flex items-center gap-1 bg-[#0e0e1c]/95 px-2.5 py-1 rounded-lg border border-[#a3e635]/40 text-[10px] font-mono text-[#bef264] font-bold whitespace-nowrap shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-ping"></span>
                      <span>10-15m Doorstep ETA</span>
                    </div>

                    {/* Bike in Front */}
                    <div className="w-8 h-8 rounded-xl bg-[#a3e635] text-black flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(163,230,53,0.7)] shrink-0">
                      🛵
                    </div>

                    {/* Realistic Bike Headlight Throw (Compact & Proportionate) */}
                    <div className="relative flex items-center -ml-0.5 pointer-events-none">
                      {/* Bright focal lens origin */}
                      <span className="w-1 h-2 rounded-full bg-yellow-100/90 blur-[0.5px] shadow-[0_0_6px_#fef08a] shrink-0 z-10"></span>

                      {/* Core Forward Headlight Beam */}
                      <div 
                        className="w-11 h-6 bg-gradient-to-r from-yellow-200/90 via-yellow-100/35 to-transparent blur-[1px] -ml-0.5"
                        style={{
                          borderRadius: '0 80% 80% 0 / 0 50% 50% 0'
                        }}
                      />

                      {/* Soft Ambient Road Throw Glow */}
                      <div 
                        className="absolute inset-0 w-14 h-7 bg-gradient-to-r from-amber-200/35 via-yellow-200/15 to-transparent blur-[2.5px] -top-0.5 -ml-0.5 pointer-events-none"
                        style={{
                          borderRadius: '0 90% 90% 0 / 0 60% 60% 0'
                        }}
                      />

                      {/* Road Surface Light Pool */}
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-3 bg-yellow-100/25 blur-[1.5px] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Selected Story Details & Order Action */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Dynamic Live Order Floating Ticker */}
              <div className="p-3 rounded-2xl bg-[#0e0e1c] border border-white/10 flex items-center gap-2.5 text-xs font-mono text-slate-300">
                <Bell className="w-4 h-4 text-[#a3e635] shrink-0" />
                <span className="text-white font-medium truncate">
                  {liveToasts[liveToastIndex]}
                </span>
              </div>

              {/* Story Details Card */}
              <div className="p-6 rounded-3xl bg-[#0c0c16] border border-white/10 space-y-5">
                
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-[#141424] border border-white/10 flex items-center justify-center ${currentStory.accentColor}`}>
                      <currentStory.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-base text-white">
                        {currentStory.title}
                      </h4>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${currentStory.badgeBg}`}>
                        {currentStory.tag}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    {currentHour.time}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed bg-[#07070e] p-4 rounded-2xl border border-white/5">
                  {currentStory.text}
                </p>

                <div className="p-3 rounded-xl bg-[#10101e] border border-white/10 space-y-1 text-xs font-mono">
                  <div className="flex items-center justify-between text-white font-bold">
                    <span>Order Contents:</span>
                    <span className="text-emerald-400 text-[11px] font-bold">{currentStory.status}</span>
                  </div>
                  <p className="text-slate-300">{currentStory.order}</p>
                </div>

                <div className="pt-1 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="#store"
                    className="w-full sm:flex-1 btn-primary py-3 rounded-xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lime-glow"
                  >
                    <span>Order In Midnight Store</span>
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
