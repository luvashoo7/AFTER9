import React, { useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Plus, Star, Clock } from 'lucide-react';

export const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart, cart, updateQuantity } = useCart();

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const getItemQuantityInCart = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <section id="categories" className="py-24 relative overflow-hidden bg-[#06060a]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        
        {/* Section Heading from AGENTS.md */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#bef264]">
              <Clock className="w-4 h-4" /> 02:13 AM CURATED INVENTORY
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white uppercase leading-[0.95]">
              WHAT DO YOU NEED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#bef264] to-[#a78bfa]">
                AT 2:13 AM?
              </span>
            </h2>
          </div>

          <div className="text-right hidden md:block">
            <p className="text-xs font-mono text-slate-400">
              ⚡ All items stored in chilled/dry Greater Noida pilot hubs
            </p>
            <p className="text-xs font-mono text-[#bef264]">
              Doorstep Open-Box Inspection on every single delivery
            </p>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2 border-y border-white/10">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-mono whitespace-nowrap transition-all duration-200 flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-[#a3e635] text-[#06060a] shadow-lime-glow font-black scale-102'
                    : 'bg-[#0f0f1c] text-slate-300 border border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="uppercase">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const qty = getItemQuantityInCart(product.id);
            return (
              <div
                key={product.id}
                className="glass-card rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between group border border-white/10 hover:border-[#a3e635]/40 relative overflow-hidden"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-3.5 bg-[#0b0b14]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-2.5 left-2.5 bg-[#06060a]/90 border border-white/10 text-[9px] font-mono font-bold text-[#bef264] px-2 py-0.5 rounded-md backdrop-blur-md">
                        {product.badge}
                      </div>
                    )}

                    {/* Rating */}
                    <div className="absolute bottom-2 left-2 bg-[#06060a]/80 border border-white/10 text-[10px] font-mono text-slate-200 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>

                    <div className="absolute bottom-2 right-2 bg-[#06060a]/80 border border-white/10 text-[10px] font-mono text-slate-300 px-1.5 py-0.5 rounded-md">
                      {product.deliveryMins}
                    </div>
                  </div>

                  {/* Product Title & Info */}
                  <h3 className="font-display font-bold text-sm text-white line-clamp-2 mb-1 group-hover:text-[#bef264] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  
                  <p className="text-[11px] font-mono text-slate-400 mb-1.5">{product.unit}</p>
                  
                  <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price and Cart Action */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-black text-lg text-white">₹{product.price}</span>
                      {product.mrp > product.price && (
                        <span className="text-xs font-mono text-slate-500 line-through">₹{product.mrp}</span>
                      )}
                    </div>
                  </div>

                  {/* Quantity selector or Add button */}
                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#a3e635] hover:bg-[#bef264] text-[#06060a] font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-lime-glow transition-all hover:scale-105 active:scale-95"
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
    </section>
  );
};
