import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { X, Heart, ShoppingBag, Trash2, Zap, ArrowRight } from 'lucide-react';

export const WishlistModal = () => {
  const { wishlist, removeFromWishlist, isWishlistModalOpen, setIsWishlistModalOpen, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsWishlistModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
              <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
                SAVED CRAVINGS
              </span>
            </div>
            <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              Midnight Stash ({wishlist.length})
            </h3>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-mono text-slate-400 hover:text-rose-400 p-2"
            >
              Clear All
            </button>
          )}
        </div>

        {/* List */}
        <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <span className="text-4xl">🖤</span>
              <p className="text-sm font-bold text-slate-300 font-display">Your Stash Is Empty</p>
              <p className="text-xs text-slate-500 font-mono">
                Tap the heart icon on any midnight snack to save it here for later.
              </p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#0f0f1c] border border-white/10 flex items-center justify-between gap-3 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-bold text-white uppercase font-display truncate">
                      {item.name || item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-[#a3e635] font-black">₹{item.price}</span>
                      {item.mrp && <span className="text-slate-500 line-through text-[11px]">₹{item.mrp}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                    }}
                    className="px-3 py-2 rounded-xl bg-[#a3e635] hover:bg-[#bef264] text-black font-mono text-xs font-black uppercase flex items-center gap-1.5 shadow-lime-glow transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-rose-400 border border-white/10"
                    title="Remove from stash"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 text-center text-[11px] font-mono text-slate-500">
          Saved cravings sync across your Greater Noida nocturnal session
        </div>

      </div>
    </div>
  );
};
