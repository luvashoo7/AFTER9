import React from 'react';
import { ArrowRight, Moon, Sparkles, ShieldCheck, MapPin, Compass } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useInsideHub } from '../context/InsideHubContext';

export const Footer = () => {
  const { setIsCartOpen } = useCart();
  const { openHub } = useInsideHub();

  return (
    <footer className="relative bg-[#050508] border-t border-white/10 overflow-hidden">
      
      {/* FINAL UNFORGETTABLE CTA SECTION */}
      <div className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden border-b border-white/10">
        
        {/* Background glow canvas */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#a3e635]/10 via-[#a78bfa]/10 to-[#38bdf8]/10 blur-[160px] pointer-events-none rounded-full"></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-[#0e0e18] border border-[#a3e635]/30 text-[#bef264] px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest">
            <Moon className="w-3.5 h-3.5" /> 9 PM — 6 AM NIGHT COMMERCE
          </div>

          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.92]">
            IT'S AFTER 9. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#bef264] to-[#a78bfa] drop-shadow-[0_0_30px_rgba(163,230,53,0.25)]">
              WHAT DO YOU NEED?
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-xl max-w-xl mx-auto font-normal">
            Everyday essentials, snacks, and party packs at your doorstep with open-box verification.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#store"
              className="inline-flex items-center gap-3 btn-primary px-10 py-5 rounded-2xl text-base font-black uppercase tracking-wider shadow-lime-glow-lg hover:scale-105 transition-all group"
            >
              <span>ORDER AFTER 9 →</span>
            </a>

            <button
              onClick={() => openHub('manifesto')}
              className="inline-flex items-center gap-2 btn-secondary px-8 py-5 rounded-2xl text-sm font-bold hover:border-[#a3e635]/50"
            >
              <Compass className="w-4 h-4 text-[#a78bfa]" />
              <span>Explore Inside Hub</span>
            </button>
          </div>

          <p className="text-xs font-mono text-slate-400 tracking-wider uppercase">
            Starting in Greater Noida • See it. Check it. Accept it.
          </p>

        </div>
      </div>

      {/* FOOTER BOTTOM & LINKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-3xl tracking-tighter text-white uppercase">
                AFTER
              </span>
              <span className="brand-nine text-2xl font-black px-2 py-0.5 rounded-lg bg-[#a3e635] text-[#06060a]">
                9
              </span>
            </div>
            
            <p className="font-display font-bold text-slate-300 text-sm">
              “Whatever you need after 9.”
            </p>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              India's first dedicated night-commerce platform. Delivering packaged essentials, midnight cravings, and party packs during the hours everyone else sleeps.
            </p>

            <button 
              onClick={() => openHub('pilot')}
              className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/30 px-3 py-1.5 rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all text-left"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Currently piloting in Greater Noida (Click for radar)
            </button>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs font-mono">
            <div className="space-y-3">
              <p className="text-white font-bold tracking-wider uppercase">MIDNIGHT STORE</p>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#store" className="hover:text-[#bef264] transition-colors">All Night Drops</a></li>
                <li><a href="#open-box-usp" className="hover:text-[#bef264] transition-colors">Open-Box Guarantee</a></li>
                <li><a href="#coverage" className="hover:text-[#bef264] transition-colors">Greater Noida Map</a></li>
                <li>
                  <button onClick={() => setIsCartOpen(true)} className="hover:text-[#bef264] transition-colors text-left">
                    View Midnight Bag
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-white font-bold tracking-wider uppercase">INSIDE HUB</p>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button onClick={() => openHub('manifesto')} className="hover:text-[#bef264] transition-colors text-left">
                    🌙 9 PM-6 AM Shift & Story
                  </button>
                </li>
                <li>
                  <button onClick={() => openHub('trust')} className="hover:text-[#bef264] transition-colors text-left">
                    🛡️ Open-Box & Trust Guide
                  </button>
                </li>
                <li>
                  <button onClick={() => openHub('trust')} className="hover:text-[#bef264] transition-colors text-left">
                    📱 App Experience Screens
                  </button>
                </li>
                <li>
                  <button onClick={() => openHub('chat')} className="hover:text-[#bef264] transition-colors text-left">
                    💬 2 AM Group Chat
                  </button>
                </li>
                <li>
                  <button onClick={() => openHub('pilot')} className="hover:text-[#bef264] transition-colors text-left">
                    📍 Sector Radar & Waitlist
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Socials & Community */}
          <div className="md:col-span-3 space-y-4 text-xs font-mono">
            <p className="text-white font-bold tracking-wider uppercase">CONNECT WITH AFTER 9</p>
            <p className="text-slate-400">
              Follow our midnight drops and community stories on social media.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#121220] border border-white/10 hover:border-[#a3e635] hover:text-[#bef264] text-slate-300 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#121220] border border-white/10 hover:border-[#a3e635] hover:text-[#bef264] text-slate-300 flex items-center justify-center transition-all"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#121220] border border-white/10 hover:border-[#a3e635] hover:text-[#bef264] text-slate-300 flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer from AGENTS.md */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p className="text-center md:text-left max-w-2xl leading-relaxed">
            Product availability, delivery hours and service areas may vary. Certain products may be restricted or unavailable based on applicable laws and regulations.
          </p>
          <p className="text-slate-500 whitespace-nowrap">
            © {new Date().getFullYear()} AFTER 9 Technologies Pvt Ltd. All rights reserved.
          </p>
        </div>

      </div>

      {/* MOBILE STICKY BOTTOM CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#06060a]/90 backdrop-blur-xl border-t border-white/10 flex gap-2">
        <a
          href="#store"
          className="flex-1 btn-primary py-3.5 rounded-2xl text-center flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest shadow-lime-glow"
        >
          <Moon className="w-4 h-4" />
          <span>ORDER AFTER 9</span>
        </a>
        <button
          onClick={() => openHub('manifesto')}
          className="btn-secondary px-3.5 py-3.5 rounded-2xl text-xs font-bold"
          title="Inside Hub"
        >
          <Compass className="w-4 h-4 text-[#a78bfa]" />
        </button>
      </div>

    </footer>
  );
};
