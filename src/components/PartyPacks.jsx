import React from 'react';
import { BUNDLES } from '../data/products';
import { useCart } from '../context/CartContext';
import { Sparkles, Plus, Check } from 'lucide-react';

export const PartyPacks = () => {
  const { addToCart } = useCart();

  return (
    <section id="party-packs" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#06060a] via-[#0b0b14] to-[#06060a]">
      
      {/* Glow shapes */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#a78bfa]/06 blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#a3e635]/04 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#a78bfa]/15 border border-[#a78bfa]/40 text-purple-300 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#bef264]" /> 1-TAP VALUE COMBOS
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white uppercase leading-[0.95]">
            PLANS CHANGED? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#c084fc] to-[#38bdf8]">
              WE MADE THE MIDNIGHT BUNDLES.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            More in one tap. Better value. Zero awkward kitchen scavenging.
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUNDLES.map((bundle) => {
            const savings = bundle.mrp - bundle.price;
            return (
              <div
                key={bundle.id}
                className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-[#a3e635]/50 relative group transition-all"
              >
                {/* Header Tag */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-black text-[#bef264] bg-[#a3e635]/10 border border-[#a3e635]/30 px-3 py-1 rounded-full">
                      {bundle.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Save ₹{savings}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight mb-1 group-hover:text-[#bef264] transition-colors">
                    {bundle.title}
                  </h3>

                  <p className="text-xs font-mono text-purple-300 font-semibold mb-3">
                    {bundle.subtitle}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {bundle.description}
                  </p>

                  {/* Included items checklist */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-[#090912] border border-white/5 mb-6">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                      Includes {bundle.itemsCount} Essentials:
                    </p>
                    <ul className="space-y-1.5">
                      {bundle.itemsList.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#a3e635] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & Add to Cart button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-black text-3xl text-white">₹{bundle.price}</span>
                      <span className="text-sm font-mono text-slate-500 line-through">₹{bundle.mrp}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Delivery in {bundle.deliveryEstimate}</span>
                  </div>

                  <button
                    onClick={() => addToCart({
                      id: bundle.id,
                      name: bundle.title,
                      price: bundle.price,
                      mrp: bundle.mrp,
                      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60',
                      unit: `${bundle.itemsCount} Pack Combo`
                    })}
                    className="btn-primary px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lime-glow"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>GRAB BUNDLE</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
