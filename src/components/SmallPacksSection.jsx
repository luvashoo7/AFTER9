import React from 'react';
import { Sparkles, Coins, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const SmallPacksSection = () => {
  const { addToCart } = useCart();
  
  // Filter products in ₹10 Corner
  const tenRupeeItems = PRODUCTS.filter((p) => p.category === 'ten-rupee');

  return (
    <section id="ten-rupee" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#06060a] via-[#0b0b14] to-[#06060a]">
      
      {/* Background radial blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#a3e635]/05 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#bef264] px-3.5 py-1 rounded-full text-xs font-mono font-black uppercase">
              <Coins className="w-3.5 h-3.5" /> A CLEVER MARKET INSIGHT
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white uppercase leading-[1.05]">
              SMALL PACKS. SMALL PRICES. <br />
              <span className="text-[#bef264]">BIG CONVENIENCE.</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg">
              “Need just one small thing at 2 AM? <br className="hidden sm:inline" />
              <strong className="text-white">You shouldn't have to buy the ₹250 family pack.</strong>”
            </p>
          </div>

          <div className="bg-[#10101c] border border-white/10 p-4 rounded-2xl max-w-xs text-xs text-slate-300 space-y-1.5 shadow-xl">
            <p className="font-bold text-white flex items-center gap-1 text-[#bef264]">
              <Sparkles className="w-3.5 h-3.5" /> Single-Use Sachets & Minis
            </p>
            <p className="text-slate-400">
              Chaat masala for midnight eggs, garam masala for Maggi hacks, ₹10 chocolates for single sweet cravings.
            </p>
          </div>
        </div>

        {/* Product Cards Grid for ₹10 Corner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {tenRupeeItems.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-4 flex flex-col justify-between group border border-white/10 hover:border-[#a3e635]/50 transition-all shadow-lg"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-[#080810]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-[#a3e635] text-[#06060a] font-mono font-black text-[10px] px-2 py-0.5 rounded shadow">
                    ₹10 ONLY
                  </div>
                </div>

                <h3 className="font-display font-bold text-sm text-white line-clamp-2 mb-1 group-hover:text-[#bef264] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[11px] font-mono text-slate-400 mb-2">{item.unit}</p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between mt-auto">
                <div>
                  <span className="font-display font-black text-lg text-white">₹{item.price}</span>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-[#a3e635] hover:bg-[#bef264] text-[#06060a] p-2 rounded-xl font-black transition-all hover:scale-105 active:scale-95 shadow-lime-glow"
                  title="Add to Midnight Bag"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why this matters banner */}
        <div className="rounded-2xl bg-[#0d0d16] border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#a3e635]"></span>
            <span className="text-slate-300">
              AFTER 9 curates exact-need portions for students, roommates, and midnight cooks across Greater Noida.
            </span>
          </div>
          <a href="#categories" className="text-[#bef264] font-bold hover:underline flex items-center gap-1 shrink-0">
            View All Categories <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
