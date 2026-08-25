import React, { useState, useEffect } from 'react';
import { useInsideHub } from '../context/InsideHubContext';
import { 
  X, Moon, ShieldCheck, MessageSquare, MapPin, Clock, 
  Sparkles, Zap, CheckCircle2, XCircle, RotateCcw, Check, 
  Smartphone, Package, Layers, Truck, ShoppingCart, ArrowRight, Radio, Box
} from 'lucide-react';
import { PILOT_ZONES } from '../data/products';
import confetti from 'canvas-confetti';

export const InsideHubModal = () => {
  const { isHubOpen, activeTab, setActiveTab, closeHub } = useInsideHub();
  
  // Timeline State
  const [activeHourIndex, setActiveHourIndex] = useState(2); // 12 AM / 2 AM default
  
  // Doorstep Unboxing Simulator State in Trust Tab
  const [boxState, setBoxState] = useState('closed'); // 'closed', 'opened', 'accepted', 'returned'
  
  // App Preview State
  const [activeAppScreen, setActiveAppScreen] = useState('openbox');

  // Pilot Radar State
  const [selectedZone, setSelectedZone] = useState(PILOT_ZONES[0]);
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeHub();
    };
    if (isHubOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isHubOpen]);

  if (!isHubOpen) return null;

  const handleOpenBox = () => {
    setBoxState('opened');
  };

  const handleAccept = () => {
    setBoxState('accepted');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#a3e635', '#10b981', '#ffffff']
    });
  };

  const handleReturn = () => {
    setBoxState('returned');
  };

  const handleReset = () => {
    setBoxState('closed');
  };

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

  const whyPillars = [
    {
      title: 'NIGHT-FIRST',
      desc: '“We exist for the hours when everyone else slows down.”',
      icon: Moon,
    },
    {
      title: 'INSTANT',
      desc: '“Get everyday essentials delivered while you’re still awake.”',
      icon: Zap,
    },
    {
      title: 'OPEN-BOX',
      desc: '“See what you’re getting before you accept it.”',
      icon: ShieldCheck,
    },
    {
      title: 'ACCESSIBLE',
      desc: '“From ₹10 sachets to party packs.”',
      icon: Layers,
    },
    {
      title: 'LOCAL → NATIONAL',
      desc: '“Starting in Greater Noida. Built for India.”',
      icon: MapPin,
    }
  ];

  const steps = [
    { num: '01', title: 'OPEN THE APP', desc: 'Browse curated night inventory between 9 PM and 6 AM.', icon: Smartphone },
    { num: '02', title: 'PICK WHAT YOU NEED', desc: 'From ₹10 spice sachets to full midnight party packs with 1-tap add.', icon: ShoppingCart },
    { num: '03', title: 'GET IT AT NIGHT', desc: 'Instant delivery in supported zones while the rest of the city is asleep.', icon: Truck },
    { num: '04', title: 'OPEN. CHECK. ACCEPT.', desc: 'Inspect your order at the doorstep. Accept only when 100% satisfied.', icon: ShieldCheck }
  ];

  const trustPillars = [
    { title: 'OPEN BEFORE ACCEPTING', desc: 'Unbox and inspect your items at the doorstep before OTP acceptance.', icon: ShieldCheck },
    { title: 'INSTANT RETURN', desc: 'Wrong flavor or damaged pack? Hand it right back to the rider. 0 waiting.', icon: RotateCcw },
    { title: 'REAL-TIME ORDER STATUS', desc: 'Live rider radar and active dispatch telemetry across Greater Noida.', icon: Zap },
    { title: 'SECURE PAYMENTS', desc: 'UPI, Cards, Netbanking & Cash-On-Acceptance at the doorstep.', icon: Sparkles }
  ];

  const chatMessages = [
    { sender: 'Aman (KP-3)', time: '02:04 AM', avatar: '🧑‍💻', text: 'bro we\'re out of chips and cold drinks 💀 who forgot to stock up??', side: 'left', reaction: '💀 4' },
    { sender: 'Riya (Alpha 1)', time: '02:05 AM', avatar: '🎨', text: 'who finished all the Red Bulls?? I have an exam presentation in 6 hours 😭', side: 'left', reaction: '😭 3' },
    { sender: 'Kabir (Hostel 4)', time: '02:06 AM', avatar: '⚡', text: 'need ice cubes + tonic + Maggi packets RIGHT NOW... every store is closed bro', side: 'left', reaction: '👀 2' },
    { sender: 'Tanmay (Gaur City)', time: '02:07 AM', avatar: '👑', text: 'Chill everyone. Just AFTER 9 IT. 🛵⚡ Doorstep open-box in 12 mins.', side: 'right', isHero: true, reaction: '🔥 8' }
  ];

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
    confetti({
      particleCount: 45,
      spread: 55,
      origin: { y: 0.7 },
      colors: ['#a3e635', '#a78bfa', '#38bdf8']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={closeHub}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl" 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#090912] border border-white/15 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col z-10">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#0e0e1a]/95 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl text-white uppercase tracking-tighter">AFTER</span>
              <span className="brand-nine text-lg font-black px-1.5 py-0.2 rounded bg-[#a3e635] text-[#06060a]">9</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#bef264]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INSIDE HUB & GUIDES</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-full hidden md:inline">
              ESC to close
            </span>
            <button
              onClick={closeHub}
              className="p-2 rounded-xl bg-[#141424] hover:bg-white/10 text-slate-300 hover:text-white transition-all"
              aria-label="Close Hub"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="px-4 sm:px-6 py-3 bg-[#0c0c16] border-b border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('trust')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'trust'
                ? 'bg-[#a3e635] text-[#06060a] shadow-lime-glow font-black'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>📦 OPEN-BOX & TRUST HUB</span>
          </button>

          <button
            onClick={() => setActiveTab('manifesto')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'manifesto'
                ? 'bg-[#a3e635] text-[#06060a] shadow-lime-glow font-black'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>🌙 NIGHT SHIFT & WHY AFTER 9</span>
          </button>

          <button
            onClick={() => setActiveTab('pilot')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'pilot'
                ? 'bg-[#a3e635] text-[#06060a] shadow-lime-glow font-black'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>📍 PILOT RADAR & SECTORS</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'chat'
                ? 'bg-[#a3e635] text-[#06060a] shadow-lime-glow font-black'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>💬 2 AM GROUP CHAT</span>
          </button>
        </div>

        {/* Tab Content Area (Scrollable) */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-10 custom-scrollbar flex-1 bg-gradient-to-b from-[#090912] to-[#06060a]">
          
          {/* TAB 1: OPEN-BOX & TRUST HUB */}
          {activeTab === 'trust' && (
            <div className="space-y-10 animate-in fade-in duration-200">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#a3e635] uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> OPEN-BOX DELIVERY POLICY
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
                  SEE IT. CHECK IT. <span className="text-[#a3e635]">ACCEPT IT.</span>
                </h3>
                <p className="text-slate-300 text-sm max-w-2xl">
                  “We don't want you wondering what arrived after the rider leaves. With open-box delivery, you get the chance to check your order right at the doorstep.”
                </p>
              </div>

              {/* Interactive Doorstep Unboxing & Verification Simulator Widget */}
              <div className="rounded-3xl bg-gradient-to-b from-[#101020] to-[#07070e] border-2 border-[#a3e635]/35 p-6 sm:p-8 shadow-lime-glow relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <h4 className="font-display font-black text-lg text-white uppercase">
                      Interactive Doorstep Inspection Simulator
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Experience how AFTER 9 puts control back into your hands:
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-[#a3e635]/10 text-[#bef264] px-3 py-1 rounded-full border border-[#a3e635]/30 font-bold">
                    DOORSTEP INSPECTION MODE
                  </span>
                </div>

                <div className="py-6">
                  {boxState === 'closed' && (
                    <div className="text-center space-y-4 py-4">
                      <div 
                        className="w-28 h-28 mx-auto rounded-3xl bg-[#141424] border-2 border-dashed border-[#a3e635]/50 flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer"
                        onClick={handleOpenBox}
                      >
                        <Package className="w-12 h-12 text-[#a3e635] animate-bounce" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-mono text-[#bef264] font-bold">
                          📦 AFTER 9 SEALED DELIVERY ARRIVED AT DOORSTEP
                        </p>
                        <p className="text-xs text-slate-400">
                          Click below to unbox and visually check the items before accepting.
                        </p>
                      </div>
                      <button
                        onClick={handleOpenBox}
                        className="btn-primary px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lime-glow"
                      >
                        Unbox & Inspect Doorstep Package →
                      </button>
                    </div>
                  )}

                  {boxState === 'opened' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                        <span className="font-bold">📋 Check Doorstep Items:</span>
                        <span className="text-[#bef264]">3 of 3 Verified</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-[#090912] border border-white/10 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white">Thums Up 750ml</p>
                            <p className="text-[10px] text-emerald-400 font-mono">✓ Chilled • Sealed</p>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-[#a3e635]" />
                        </div>
                        <div className="p-3 rounded-xl bg-[#090912] border border-white/10 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white">Doritos Flamin Hot</p>
                            <p className="text-[10px] text-emerald-400 font-mono">✓ Intact Pack</p>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-[#a3e635]" />
                        </div>
                        <div className="p-3 rounded-xl bg-[#090912] border border-white/10 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white">₹10 Chaat Masala</p>
                            <p className="text-[10px] text-emerald-400 font-mono">✓ Mini Sachet Correct</p>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-[#a3e635]" />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 border-t border-white/10">
                        <button
                          onClick={handleAccept}
                          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg"
                        >
                          <Check className="w-4 h-4" />
                          Accept Order (Everything Perfect)
                        </button>
                        <button
                          onClick={handleReturn}
                          className="w-full sm:w-auto bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                        >
                          <RotateCcw className="w-4 h-4 text-rose-400" />
                          Instant Return (Item Mismatch)
                        </button>
                      </div>
                    </div>
                  )}

                  {boxState === 'accepted' && (
                    <div className="text-center space-y-3 py-2 animate-in zoom-in-95">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <h5 className="font-display font-black text-lg text-white uppercase">
                        Order Accepted With 100% Confidence!
                      </h5>
                      <p className="text-xs font-mono text-slate-300 max-w-sm mx-auto">
                        You verified all items at the doorstep before acceptance. No unpleasant surprises after the rider left.
                      </p>
                      <button onClick={handleReset} className="btn-secondary px-4 py-1.5 rounded-lg text-xs font-mono">
                        ↺ Try Simulator Again
                      </button>
                    </div>
                  )}

                  {boxState === 'returned' && (
                    <div className="text-center space-y-3 py-2 animate-in zoom-in-95">
                      <div className="w-12 h-12 rounded-full bg-rose-500/20 border-2 border-rose-500 text-rose-400 flex items-center justify-center mx-auto">
                        <RotateCcw className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <h5 className="font-display font-black text-lg text-white uppercase">
                        Doorstep Return Handled Instantly!
                      </h5>
                      <p className="text-xs font-mono text-slate-300 max-w-sm mx-auto">
                        Package handed back to the rider right away. ₹0 deduction. Zero hassle with customer support chatbots.
                      </p>
                      <button onClick={handleReset} className="btn-secondary px-4 py-1.5 rounded-lg text-xs font-mono">
                        ↺ Try Simulator Again
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 4 Trust Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {trustPillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.title} className="p-4 rounded-2xl bg-[#0d0d18] border border-white/10 space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-[#141424] text-[#a3e635] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h5 className="font-display font-bold text-xs text-white uppercase">{p.title}</h5>
                      <p className="text-[11px] text-slate-400 font-mono leading-relaxed">{p.desc}</p>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: NIGHT SHIFT & MANIFESTO */}
          {activeTab === 'manifesto' && (
            <div className="space-y-10 animate-in fade-in duration-200">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#a78bfa] uppercase tracking-widest flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-[#a3e635]" /> NIGHT-COMMERCE MANIFESTO
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase leading-tight">
                  THE CITY SLEEPS. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#bef264] to-[#a78bfa]">
                    YOUR NEEDS DON'T.
                  </span>
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                  Late-night cravings don’t follow store timings. Neither should your essentials.
                  AFTER 9 brings everyday essentials to your doorstep when most places have already called it a night.
                </p>
              </div>

              {/* Interactive Night Timeline */}
              <div className="p-6 rounded-2xl bg-[#0e0e1a] border border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#a3e635]" /> 9 PM — 6 AM Night Shift Timeline
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Click any hour to compare daytime stores vs AFTER 9 night fleet:
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-rose-400 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Daytime Apps: Offline
                    </span>
                    <span className="text-[#bef264] flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> AFTER 9: Active
                    </span>
                  </div>
                </div>

                {/* Timeline Buttons */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {timelineHours.map((slot, index) => {
                    const isSelected = activeHourIndex === index;
                    return (
                      <button
                        key={slot.time}
                        onClick={() => setActiveHourIndex(index)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-[#a3e635] text-[#06060a] border-[#a3e635] font-black scale-102 shadow-lime-glow'
                            : 'bg-[#121220] text-slate-300 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <p className="text-xs font-mono uppercase font-bold">{slot.time}</p>
                        <p className={`text-[9px] truncate ${isSelected ? 'text-[#06060a]' : 'text-slate-500'}`}>
                          {slot.status}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Comparative Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[#06060c] border border-white/5">
                  <div className="p-3.5 rounded-lg bg-[#0d0d16] border border-rose-500/20 space-y-1 text-xs">
                    <div className="text-rose-400 font-mono font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> REGULAR GROCERY & 10-MIN APPS
                    </div>
                    <p className="text-slate-400 italic">"{timelineHours[activeHourIndex].otherStores}"</p>
                    <p className="text-slate-500 text-[11px]">Dark stores offline or charging massive night surge.</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-gradient-to-r from-[#121222] to-[#0e0e1a] border border-[#a3e635]/40 space-y-1 text-xs shadow-lime-glow">
                    <div className="text-[#bef264] font-mono font-bold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[#a3e635] fill-current" /> AFTER 9 NIGHT FLEET
                    </div>
                    <p className="text-white font-bold">{timelineHours[activeHourIndex].after9}</p>
                    <p className="text-slate-300 text-[11px]">Active inventory & doorstep open-box inspection ready.</p>
                  </div>
                </div>
              </div>

              {/* 5 Core Pillars */}
              <div className="space-y-4">
                <h4 className="font-display font-black text-lg text-white uppercase">
                  WHY <span className="text-[#a3e635]">AFTER 9</span> (THE 5 PILLARS)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {whyPillars.map((pillar, idx) => {
                    const Icon = pillar.icon;
                    return (
                      <div key={pillar.title} className="p-4 rounded-2xl bg-[#0d0d18] border border-white/10 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="w-9 h-9 rounded-xl bg-[#151525] border border-white/10 flex items-center justify-center text-[#a3e635]">
                            <Icon className="w-4 h-4" />
                          </div>
                          <h5 className="font-display font-black text-xs text-white uppercase">{pillar.title}</h5>
                          <p className="text-[11px] text-slate-400 font-mono leading-relaxed">{pillar.desc}</p>
                        </div>
                        <span className="text-[9px] font-mono text-[#a3e635] pt-2 mt-3 border-t border-white/5">
                          Pillar 0{idx + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PILOT RADAR & SECTORS */}
          {activeTab === 'pilot' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-widest flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#a3e635] animate-pulse" /> GREATER NOIDA RADAR
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
                  SECTOR RADAR & <span className="text-[#a3e635]">COVERAGE.</span>
                </h3>
                <p className="text-slate-300 text-sm">
                  “Greater Noida is our first playground. Noida is next. Delhi NCR after that. And then… wherever the night needs us.”
                </p>
              </div>

              {/* Interactive Radar Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Radar map graphic */}
                <div className="lg:col-span-7 bg-[#090912] rounded-3xl p-5 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-display font-bold text-white text-xs uppercase">
                      Live Fleet Radar: Greater Noida
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                      10-15m ETA Active
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] rounded-2xl bg-[#06060c] border border-white/5 overflow-hidden flex items-center justify-center p-4">
                    {/* Rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-[85%] h-[85%] rounded-full border border-[#a3e635]/15"></div>
                      <div className="w-[60%] h-[60%] rounded-full border border-white/10"></div>
                      <div className="w-[35%] h-[35%] rounded-full border border-[#a3e635]/20"></div>
                    </div>

                    {/* Nodes */}
                    <div className="relative z-10 w-full h-full">
                      <button
                        onClick={() => setSelectedZone(PILOT_ZONES[0])}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#a3e635] text-black font-black text-xs flex items-center justify-center mx-auto shadow-lime-glow">
                          <MapPin className="w-4 h-4 fill-current" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-white bg-black/90 px-1.5 py-0.2 rounded border border-[#a3e635]/40 mt-1 block">
                          Pari Chowk
                        </span>
                      </button>

                      <button
                        onClick={() => setSelectedZone(PILOT_ZONES[1])}
                        className="absolute top-1/4 left-1/4 text-center"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#a78bfa] text-white flex items-center justify-center mx-auto">
                          <MapPin className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="text-[9px] font-mono text-slate-300 bg-black/90 px-1 rounded border border-white/10 mt-0.5 block">
                          KP 1-3
                        </span>
                      </button>

                      <button
                        onClick={() => setSelectedZone(PILOT_ZONES[2])}
                        className="absolute top-1/3 right-1/4 text-center"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#38bdf8] text-black flex items-center justify-center mx-auto">
                          <MapPin className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="text-[9px] font-mono text-slate-300 bg-black/90 px-1 rounded border border-white/10 mt-0.5 block">
                          Alpha 1-2
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#121220] border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#bef264]">Selected: {selectedZone.name}</p>
                      <p className="text-slate-400 font-mono text-[11px]">ETA: {selectedZone.eta} • Status: {selectedZone.status}</p>
                    </div>
                  </div>
                </div>

                {/* Expansion Waitlist */}
                <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0d0d18] border border-white/10 space-y-4">
                  <h4 className="font-display font-black text-base text-white uppercase">
                    EXPANDING ACROSS DELHI NCR
                  </h4>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    Living outside our pilot sectors? Drop your mobile number to get an instant alert & ₹100 launch credit when your pin code goes live.
                  </p>

                  {!isSubmitted ? (
                    <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                      <input
                        type="tel"
                        maxLength="10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 10-digit mobile"
                        className="w-full bg-[#06060c] border border-white/15 focus:border-[#a3e635] rounded-xl px-3.5 py-3 text-xs font-mono text-white outline-none"
                      />
                      {errorMsg && <p className="text-xs text-rose-400 font-mono">{errorMsg}</p>}
                      <button
                        type="submit"
                        className="w-full btn-primary py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lime-glow"
                      >
                        <span>JOIN THE NIGHT WAITLIST</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1 animate-in zoom-in-95">
                      <CheckCircle2 className="w-8 h-8 text-[#a3e635] mx-auto" />
                      <p className="text-xs font-bold text-white">You're on the Night List!</p>
                      <p className="text-[11px] font-mono text-slate-300">We'll alert +91 {phone} with ₹100 credit on launch.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: 2 AM GROUP CHAT */}
          {activeTab === 'chat' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#a78bfa] uppercase tracking-widest flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> 2:07 AM REAL GROUP BANTER
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
                  THE NIGHT HAS A <span className="text-[#a3e635]">GROUP CHAT.</span>
                </h3>
                <p className="text-slate-300 text-sm">
                  Every late-night plan hits a wall when someone finishes the drinks or chips. That's when you call in AFTER 9.
                </p>
              </div>

              <div className="max-w-2xl mx-auto rounded-3xl bg-[#0e0e1a] border border-white/10 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌙</span>
                    <div>
                      <p className="font-bold text-white">The 2 AM Crisis Council 💬</p>
                      <p className="text-[10px] font-mono text-emerald-400">● 7 members online • Greater Noida Hub</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">
                    End-to-End Despair
                  </span>
                </div>

                <div className="space-y-3.5 py-2">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.side === 'right' ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono text-slate-400">
                        <span>{msg.avatar}</span>
                        <span className="font-bold text-slate-300">{msg.sender}</span>
                        <span className="text-slate-500 text-[9px]">{msg.time}</span>
                      </div>
                      <div className={`p-3 rounded-2xl max-w-sm text-xs font-medium relative ${
                        msg.isHero 
                          ? 'bg-gradient-to-r from-[#a3e635] to-[#bef264] text-black font-extrabold shadow-lime-glow' 
                          : 'bg-[#171728] text-slate-200 border border-white/5'
                      }`}>
                        <p>{msg.text}</p>
                        <span className="absolute -bottom-2 right-2 bg-[#0a0a14] border border-white/15 text-[9px] px-1.5 py-0.2 rounded-full shadow">
                          {msg.reaction}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 text-center space-y-1">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">DON'T PANIC AT 2 AM.</p>
                  <p className="font-display font-black text-2xl text-white">
                    “<span className="text-[#a3e635]">AFTER 9</span> IT.”
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 border-t border-white/10 bg-[#080810] flex items-center justify-between text-xs font-mono shrink-0">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></span>
            <span>Operating 9 PM — 6 AM • Greater Noida Pilot</span>
          </div>
          <button
            onClick={closeHub}
            className="btn-secondary px-4 py-1.5 rounded-xl text-xs font-mono font-bold hover:border-[#a3e635]/50"
          >
            Back to Store
          </button>
        </div>

      </div>
    </div>
  );
};
