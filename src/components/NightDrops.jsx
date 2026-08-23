import React from 'react';
import { TONIGHT_DROPS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Flame, Clock, Plus } from 'lucide-react';

export const NightDrops = () => {
  const { addToCart } = useCart();

  const getBadgeClass = (color) => {
    switch (color) {
      case 'lime':
        return 'bg-[#a3e635] text-[#06060a] font-black shadow-lime-glow';
      case 'purple':
        return 'bg-[#a78bfa] text-white font-bold shadow-purple-glow';
      case 'cyan':
        return 'bg-[#38bdf8] text-[#06060a] font-bold';
      default:
        return 'bg-white text-black font-bold';
    }
  };

  return (
    <section id="drops" className="py-20 relative overflow-hidden bg-[#06060a]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase">
              <Flame className="w-3.5 h-3.5 fill-rose-500" /> LIVE NIGHT-ONLY INVENTORY
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white uppercase leading-[0.95]">
              TONIGHT'S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-[#a3e635] to-[#a78bfa]">
                DROPS
              </span>
            </h2>
          </div>

          <div className="bg-[#10101c] border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-3 text-xs font-mono text-slate-300">
            <Clock className="w-4 h-4 text-[#a3e635] animate-spin" style={{ animationDuration: '8s' }} />
            <span>Drops refresh every night at <strong className="text-white">9:00 PM Sharp</strong></span>
          </div>
        </div>

        {/* Night Drops Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TONIGHT_DROPS.map((drop) => (
            <div
              key={drop.id}
              className="glass-card rounded-3xl p-5 flex flex-col justify-between border border-white/10 hover:border-white/25 group transition-all"
            >
              <div>
                {/* Image Container with Dynamic Badge */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#080810]">
                  <img
                    src={drop.image}
                    alt={drop.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06060a]/80 via-transparent to-transparent"></div>

                  <div className={`absolute top-3 left-3 text-[10px] font-mono uppercase px-2.5 py-1 rounded-lg ${getBadgeClass(drop.badgeColor)}`}>
                    {drop.badge}
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-slate-300 bg-[#06060a]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/5">
                    <span>{drop.timeLeft}</span>
                    <span className="text-rose-400 font-bold">{drop.stockLeft} packs left</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-xl text-white uppercase tracking-tight mb-1 group-hover:text-[#bef264] transition-colors">
                  {drop.title}
                </h3>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {drop.items}
                </p>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-2xl text-white">₹{drop.price}</span>
                  <span className="text-xs font-mono text-slate-500 line-through">₹{drop.mrp}</span>
                </div>

                <button
                  onClick={() => addToCart({
                    id: drop.id,
                    name: drop.title,
                    price: drop.price,
                    mrp: drop.mrp,
                    image: drop.image,
                    unit: 'Night Drop Pack'
                  })}
                  className="bg-[#a3e635] hover:bg-[#bef264] text-[#06060a] font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lime-glow transition-all hover:scale-105"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>CLAIM DROP</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
