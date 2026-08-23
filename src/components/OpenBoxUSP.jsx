import React, { useState } from 'react';
import { Package, ShieldCheck, Check, RotateCcw, Box, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OpenBoxUSP = () => {
  const [boxState, setBoxState] = useState('closed'); // 'closed', 'opened', 'accepted', 'returned'

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

  return (
    <section id="open-box-usp" className="py-24 relative overflow-hidden bg-[#06060a]">
      
      {/* Background neon glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#a3e635]/04 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a78bfa]/06 blur-[130px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#121220] border border-[#a3e635]/30 text-[#bef264] px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4" /> THE BIGGEST USP IN NIGHT COMMERCE
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[0.95]">
            OPEN. CHECK. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#bef264] to-[#10b981]">
              ACCEPT.
            </span>
          </h2>

          <p className="text-xl sm:text-2xl font-display font-black tracking-wide text-[#bef264] uppercase">
            NO BLIND ACCEPTANCE.
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Wrong item? Damaged pack? Missing product? <br />
            <strong className="text-white">Don’t accept it. Return it instantly right with the delivery partner at your doorstep.</strong>
          </p>
        </div>

        {/* 3 Core Large Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden group border border-white/10 hover:border-[#a3e635]/40">
            <div className="text-5xl font-mono font-black text-[#a3e635]/20 group-hover:text-[#a3e635]/40 transition-colors mb-4">
              01
            </div>
            <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight mb-2 flex items-center justify-between">
              <span>OPEN</span>
              <Box className="w-6 h-6 text-[#a3e635]" />
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Open your package at the doorstep while the AFTER 9 rider waits.
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-400">
              ⚡ No rush • Full customer right
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden group border border-white/10 hover:border-purple-400/40">
            <div className="text-5xl font-mono font-black text-purple-400/20 group-hover:text-purple-400/40 transition-colors mb-4">
              02
            </div>
            <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight mb-2 flex items-center justify-between">
              <span>CHECK</span>
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Verify the items, expiry dates, temperature and condition before accepting.
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 text-[11px] font-mono text-purple-300">
              🔍 100% visual match & count
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden group border border-white/10 hover:border-emerald-400/40">
            <div className="text-5xl font-mono font-black text-emerald-400/20 group-hover:text-emerald-400/40 transition-colors mb-4">
              03
            </div>
            <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight mb-2 flex items-center justify-between">
              <span>ACCEPT OR RETURN</span>
              <RotateCcw className="w-6 h-6 text-emerald-400" />
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Something wrong? Return it instantly. The rider takes it back on the spot with 0 waiting.
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 text-[11px] font-mono text-emerald-300">
              ⚡ Instant doorstep resolution
            </div>
          </div>

        </div>

        {/* Interactive Doorstep Unboxing & Verification Simulator Widget */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#101020] to-[#07070e] border-2 border-[#a3e635]/35 p-6 sm:p-10 shadow-lime-glow relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
                <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                  Try The Interactive Doorstep Simulator
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Experience how AFTER 9 puts control back into your hands.
              </p>
            </div>
            <span className="text-xs font-mono bg-[#a3e635]/10 text-[#bef264] px-3 py-1 rounded-full border border-[#a3e635]/30 font-bold">
              DOORSTEP INSPECTION MODE
            </span>
          </div>

          {/* Interactive State Area */}
          <div className="py-8">
            
            {boxState === 'closed' && (
              <div className="text-center space-y-6 py-6">
                <div className="w-32 h-32 mx-auto rounded-3xl bg-[#141424] border-2 border-dashed border-[#a3e635]/50 flex items-center justify-center p-4 shadow-2xl hover:scale-105 transition-transform cursor-pointer" onClick={handleOpenBox}>
                  <Package className="w-16 h-16 text-[#a3e635] animate-bounce" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-mono text-[#bef264] font-bold">
                    📦 AFTER 9 SEALED DELIVERY ARRIVED AT YOUR GREATER NOIDA DOORSTEP
                  </p>
                  <p className="text-xs text-slate-400">
                    The rider is with you. Click below to unbox and inspect the products before accepting.
                  </p>
                </div>
                <button
                  onClick={handleOpenBox}
                  className="btn-primary px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lime-glow"
                >
                  Unbox & Inspect Doorstep Package →
                </button>
              </div>
            )}

            {boxState === 'opened' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                    📋 Doorstep Item Inspection (Check each item):
                  </p>
                  <span className="text-xs font-mono text-[#bef264]">3 of 3 Verified</span>
                </div>

                {/* Inspectable items checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Item 1 */}
                  <div className="p-4 rounded-2xl bg-[#090912] border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Thums Up Charged 750ml</p>
                      <p className="text-[10px] text-emerald-400 font-mono">✓ Chilled • Sealed Cap</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#a3e635]" />
                  </div>

                  {/* Item 2 */}
                  <div className="p-4 rounded-2xl bg-[#090912] border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Maggi 2-Min Special (4s)</p>
                      <p className="text-[10px] text-emerald-400 font-mono">✓ Unbroken • Fresh Batch</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#a3e635]" />
                  </div>

                  {/* Item 3 */}
                  <div className="p-4 rounded-2xl bg-[#090912] border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">₹10 Catch Chaat Masala</p>
                      <p className="text-[10px] text-emerald-400 font-mono">✓ Mini Sachet Correct</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#a3e635]" />
                  </div>

                </div>

                {/* Action buttons: Accept vs Return */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={handleAccept}
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-[#06060a] font-black px-8 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
                  >
                    <Check className="w-4 h-4" />
                    Accept Order (Everything Perfect)
                  </button>

                  <button
                    onClick={handleReturn}
                    className="w-full sm:w-auto bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-4 h-4 text-rose-400" />
                    Instant Return (Item Mismatch)
                  </button>
                </div>
              </div>
            )}

            {boxState === 'accepted' && (
              <div className="text-center space-y-4 py-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lime-glow">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="font-display font-black text-2xl text-white uppercase">
                  Order Accepted With 100% Confidence!
                </h4>
                <p className="text-xs font-mono text-slate-300 max-w-md mx-auto">
                  You verified all items at the doorstep before acceptance. No unpleasant surprises after the rider left.
                </p>
                <button
                  onClick={handleReset}
                  className="btn-secondary px-6 py-2.5 rounded-xl text-xs font-mono"
                >
                  ↺ Try Simulator Again
                </button>
              </div>
            )}

            {boxState === 'returned' && (
              <div className="text-center space-y-4 py-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 text-rose-400 flex items-center justify-center mx-auto">
                  <RotateCcw className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h4 className="font-display font-black text-2xl text-white uppercase">
                  Doorstep Return Handled Instantly!
                </h4>
                <p className="text-xs font-mono text-slate-300 max-w-md mx-auto">
                  Package handed back to the rider right away. ₹0 deduction. Zero hassle with customer support chatbots.
                </p>
                <button
                  onClick={handleReset}
                  className="btn-secondary px-6 py-2.5 rounded-xl text-xs font-mono"
                >
                  ↺ Try Simulator Again
                </button>
              </div>
            )}

          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>“See it. Check it. Accept it.”</span>
            <span className="text-[#a3e635]">AFTER 9 TRUST GUARANTEE</span>
          </div>

        </div>

      </div>
    </section>
  );
};
