import React, { useState, useEffect } from 'react';
import { ShoppingBag, Moon, Clock, MapPin, Menu, X, ShieldCheck, Zap, Sparkles, Compass } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useInsideHub } from '../context/InsideHubContext';

export const Navbar = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { openHub } = useInsideHub();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('02:17:42 AM');

  // Simulated atmospheric late night clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#06060a]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3' 
        : 'bg-transparent py-4'
    }`}>
      {/* Top micro-banner for operating hours & pilot */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 mb-2 text-xs font-mono">
        <div className="flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1.5 text-[#a3e635] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-[#a3e635] -ml-3.5"></span>
            9 PM — 6 AM OPERATIONAL
          </span>
          <span className="text-white/20">|</span>
          <button 
            onClick={() => openHub('pilot')}
            className="flex items-center gap-1 text-slate-300 hover:text-[#bef264] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#a3e635]" />
            PILOT ZONE: <strong className="text-white underline decoration-dotted">GREATER NOIDA</strong>
          </button>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5 bg-[#10101c] px-2.5 py-0.5 rounded-full border border-white/10 text-slate-300">
            <Clock className="w-3 h-3 text-[#a78bfa]" />
            NIGHT CLOCK: <span className="text-[#bef264] font-bold">{currentTime}</span>
          </span>
          <button 
            onClick={() => openHub('trust')}
            className="text-emerald-400 flex items-center gap-1 hover:underline"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Open-Box Doorstep Verification
          </button>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo with distinctive stylized '9' symbol */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center">
            <span className="font-display font-black text-2xl tracking-tighter text-white uppercase group-hover:text-slate-100 transition-colors">
              AFTER
            </span>
            <span className="ml-1.5 relative inline-flex items-center justify-center">
              <span className="brand-nine text-2xl font-black px-2 py-0.5 rounded-lg bg-[#a3e635] text-[#06060a] shadow-lime-glow group-hover:scale-105 group-hover:bg-[#bef264] transition-transform">
                9
              </span>
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-[#a78bfa] bg-[#a78bfa]/10 px-2 py-0.5 rounded border border-[#a78bfa]/30">
            Night Commerce
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-[#0f0f1c]/80 border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-md">
          <a href="#store" className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-[#bef264] hover:bg-white/[0.04] transition-all">
            🌙 Midnight Store
          </a>
          <a href="#open-box-usp" className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#a3e635] hover:bg-[#a3e635]/10 transition-all flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Open-Box USP
          </a>
          <a href="#coverage" className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-[#bef264] hover:bg-white/[0.04] transition-all">
            📍 Greater Noida Pilot
          </a>
          <span className="text-white/15 px-1">|</span>
          <button
            onClick={() => openHub('manifesto')}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-purple-300 hover:text-white hover:bg-purple-950/50 transition-all flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#a78bfa]" />
            Inside Hub
          </button>
        </div>

        {/* Right CTAs: Cart Drawer trigger + Quick Order */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#121220] hover:bg-[#18182a] text-white px-3.5 py-2 rounded-xl border border-white/10 hover:border-[#a3e635]/50 transition-all shadow-md group"
            aria-label="Open Midnight Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#a3e635] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold font-mono tracking-wide hidden sm:inline">MIDNIGHT BAG</span>
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-black font-mono bg-[#a3e635] text-[#06060a] rounded-full shadow-sm">
              {totalItemsCount}
            </span>
          </button>

          <a
            href="#store"
            className="hidden sm:inline-flex items-center gap-2 btn-primary px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            Order After 9
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#121220] text-slate-300 border border-white/10 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080810]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-[#a3e635] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></span>
              9 PM — 6 AM • PILOT LIVE
            </span>
            <span className="text-xs font-mono text-slate-400">Greater Noida</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <a
              href="#store"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#10101c] rounded-xl text-slate-200 hover:text-[#bef264] flex items-center gap-2"
            >
              🌙 Midnight Store
            </a>
            <a
              href="#open-box-usp"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#10101c] rounded-xl text-[#a3e635] flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Open-Box USP
            </a>
            <a
              href="#coverage"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#10101c] rounded-xl text-slate-200 flex items-center gap-2"
            >
              📍 Greater Noida Map
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openHub('manifesto');
              }}
              className="p-3 bg-purple-950/40 text-purple-300 rounded-xl flex items-center gap-2 text-left"
            >
              <Sparkles className="w-4 h-4 text-[#a3e635]" /> Inside Hub & Story
            </button>
          </div>

          <a
            href="#store"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full btn-primary py-3 rounded-xl text-center block text-xs uppercase tracking-widest font-black"
          >
            ORDER AFTER 9 NOW →
          </a>
        </div>
      )}
    </header>
  );
};
