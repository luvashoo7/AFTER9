import React, { useState, useMemo } from 'react';
import { CATEGORIES, PRODUCTS, TONIGHT_DROPS, BUNDLES } from '../data/products';
import { useCart } from '../context/CartContext';
import { useInsideHub } from '../context/InsideHubContext';
import { 
  Plus, Star, Clock, Flame, Coins, Sparkles, Check, 
  Search, ShieldCheck, ArrowRight, Layers, Tag 
} from 'lucide-react';

export const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart, cart, updateQuantity, searchQuery, setSearchQuery } = useCart();
  const { openHub } = useInsideHub();

  const getItemQuantityInCart = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  // Custom Category Tabs
  const allTabs = [
    { id: 'all', name: 'All Night Drops', icon: '✨' },
    { id: 'drops', name: "Tonight's Drops", icon: '🔥', highlight: 'drops' },
    { id: 'ten-rupee', name: '₹10 Corner', icon: '🪙', highlight: 'ten' },
    { id: 'party', name: 'Midnight Bundles', icon: '🎉', highlight: 'bundle' },
    { id: 'cravings', name: '2 AM Cravings', icon: '🌙' },
    { id: 'snacks', name: 'Snack Attack', icon: '🍟' },
    { id: 'drinks', name: 'Cold & Refreshing', icon: '🥤' },
    { id: 'breakfast', name: 'Breakfast Emergency', icon: '🍳' },
    { id: 'personal', name: 'Personal Care', icon: '🧴' },
    { id: 'essentials', name: 'Home Essentials', icon: '🏠' },
    { id: 'random', name: 'Just Because', icon: '🔮' }
  ];

  // Filtered standard products
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    if (selectedCategory !== 'all' && selectedCategory !== 'drops' && selectedCategory !== 'party') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => 
        p.name.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const getDropBadgeColor = (color) => {
    switch (color) {
      case 'lime': return 'bg-[#a3e635] text-[#06060a] font-black shadow-lime-glow';
      case 'purple': return 'bg-[#a78bfa] text-white font-bold shadow-purple-glow';
      case 'cyan': return 'bg-[#38bdf8] text-[#06060a] font-bold';
      default: return 'bg-white text-black font-bold';
    }
  };

  return (
    <section id="store" className="py-16 relative overflow-hidden bg-[#06060a]">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#a3e635]/04 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        
        {/* Section Header with Live Search */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#bef264]">
              <Clock className="w-3.5 h-3.5" /> 02:13 AM LIVE INVENTORY
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white uppercase leading-[0.95]">
              MIDNIGHT <span className="text-[#a3e635]">STORE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Curated everyday packaged items, snacks, and bundles delivered instantly across Greater Noida.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chips, eggs, ₹10 spices, Red Bull..."
                className="w-full bg-[#0d0d18] border border-white/15 focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-2xl pl-10 pr-4 py-3 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-y border-white/10">
          {allTabs.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-mono whitespace-nowrap transition-all duration-200 flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-[#a3e635] text-[#06060a] shadow-lime-glow font-black scale-102'
                    : cat.highlight === 'drops'
                    ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:border-rose-500/60'
                    : cat.highlight === 'ten'
                    ? 'bg-[#a3e635]/10 text-[#bef264] border border-[#a3e635]/30 hover:border-[#a3e635]/60'
                    : cat.highlight === 'bundle'
                    ? 'bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:border-purple-500/60'
                    : 'bg-[#0f0f1c] text-slate-300 border border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="uppercase">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* VIEW 1: TONIGHT'S DROPS TAB */}
        {selectedCategory === 'drops' && !searchQuery && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <h3 className="font-display font-black text-xl text-white uppercase tracking-tight flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500 fill-rose-500" /> Tonight's Limited Flash Drops
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Available between 9 PM — 6 AM</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TONIGHT_DROPS.map((drop) => (
                <div
                  key={drop.id}
                  className="glass-card rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-white/10 hover:border-[#a3e635]/40 group transition-all"
                >
                  <div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3.5 bg-[#080810]">
                      <img
                        src={drop.image}
                        alt={drop.title}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06060a]/80 via-transparent to-transparent"></div>
                      <div className={`absolute top-2.5 left-2.5 text-[9px] font-mono uppercase px-2 py-0.5 rounded-md ${getDropBadgeColor(drop.badgeColor)}`}>
                        {drop.badge}
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-slate-300 bg-[#06060a]/85 px-2 py-0.5 rounded-md">
                        <span>{drop.timeLeft}</span>
                        <span className="text-rose-400 font-bold">{drop.stockLeft} left</span>
                      </div>
                    </div>

                    <h4 className="font-display font-black text-lg text-white uppercase tracking-tight mb-1 group-hover:text-[#bef264] transition-colors">
                      {drop.title}
                    </h4>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">{drop.items}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-black text-xl text-white">₹{drop.price}</span>
                      <span className="text-xs font-mono text-slate-500 line-through">₹{drop.mrp}</span>
                    </div>

                    <button
                      onClick={() => addToCart({
                        id: drop.id,
                        name: drop.title,
                        price: drop.price,
                        mrp: drop.mrp,
                        image: drop.image,
                        unit: 'Limited Night Drop'
                      })}
                      className="bg-[#a3e635] hover:bg-[#bef264] text-[#06060a] font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-lime-glow transition-all hover:scale-105"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>CLAIM</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: MIDNIGHT BUNDLES TAB */}
        {selectedCategory === 'party' && !searchQuery && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-300" />
                <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                  Midnight Bundles & Party Packs
                </h3>
              </div>
              <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
                1-Tap Value Combos • Save up to ₹180
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {BUNDLES.map((bundle) => {
                const savings = bundle.mrp - bundle.price;
                return (
                  <div
                    key={bundle.id}
                    className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between border border-white/10 hover:border-[#a3e635]/40 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono font-black text-[#bef264] bg-[#a3e635]/10 border border-[#a3e635]/30 px-2.5 py-0.5 rounded-full">
                          {bundle.tag}
                        </span>
                        <span className="text-xs font-mono text-slate-400">Save ₹{savings}</span>
                      </div>

                      <h4 className="font-display font-black text-xl text-white uppercase tracking-tight mb-1">
                        {bundle.title}
                      </h4>
                      <p className="text-xs text-slate-400 mb-4">{bundle.description}</p>

                      <div className="p-3 rounded-xl bg-[#090912] border border-white/5 space-y-1 mb-4 text-xs font-mono text-slate-300">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Includes:</p>
                        {bundle.itemsList.map((it, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-[#a3e635]" />
                            <span>{it}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-black text-2xl text-white">₹{bundle.price}</span>
                        <span className="text-xs font-mono text-slate-500 line-through">₹{bundle.mrp}</span>
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
                        className="btn-primary px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider"
                      >
                        Grab Bundle
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: REGULAR CATEGORIES OR ALL DROPS GRID */}
        {selectedCategory !== 'drops' && selectedCategory !== 'party' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                {selectedCategory === 'all' 
                  ? 'All Items' 
                  : allTabs.find(t => t.id === selectedCategory)?.name || 'Curated Night Items'}
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {filteredProducts.length} items available
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
              {filteredProducts.map((product) => {
                const qty = getItemQuantityInCart(product.id);
                return (
                  <div
                    key={product.id}
                    className="glass-card rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between group border border-white/10 hover:border-[#a3e635]/40 relative overflow-hidden"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-[#0b0b14]">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                        />

                        {product.badge && (
                          <div className="absolute top-2 left-2 bg-[#06060a]/90 border border-white/10 text-[9px] font-mono font-bold text-[#bef264] px-1.5 py-0.5 rounded backdrop-blur-md">
                            {product.badge}
                          </div>
                        )}

                        <div className="absolute bottom-2 left-2 bg-[#06060a]/80 border border-white/10 text-[10px] font-mono text-slate-200 px-1.5 py-0.2 rounded flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h4 className="font-display font-bold text-sm text-white line-clamp-2 mb-1 group-hover:text-[#bef264] transition-colors leading-snug">
                        {product.name}
                      </h4>
                      
                      <p className="text-[11px] font-mono text-slate-400 mb-1">{product.unit}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">{product.description}</p>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-black text-lg text-white">₹{product.price}</span>
                        {product.mrp > product.price && (
                          <span className="text-xs font-mono text-slate-500 line-through">₹{product.mrp}</span>
                        )}
                      </div>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-[#a3e635] hover:bg-[#bef264] text-[#06060a] font-black text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-lime-glow transition-all hover:scale-105 active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>ADD</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-[#171728] border border-[#a3e635]/60 rounded-xl px-2 py-1">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="text-xs font-bold text-white hover:text-rose-400 px-1"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono font-black text-[#bef264] px-1">{qty}</span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="text-xs font-bold text-white hover:text-[#bef264] px-1"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
