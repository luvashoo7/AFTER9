import React, { useState, useMemo } from 'react';
import { CATEGORIES, PRODUCTS, TONIGHT_DROPS, SORT_OPTIONS_CONFIG, AVAILABLE_PRODUCT_TAGS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { FilterSortModal } from './FilterSortModal';
import { 
  Plus, Minus, Star, Clock, Flame, Coins, Sparkles, Check, 
  Search, ShieldCheck, ArrowRight, Layers, Tag, Heart, SlidersHorizontal, ShoppingBag 
} from 'lucide-react';

const INITIAL_FILTERS = {
  sortBy: 'popular',
  tags: [],
  priceRange: 'all',
  minRating: null,
  fastDeliveryOnly: false,
  inStockOnly: false,
};

export const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { addToCart, cart, updateQuantity, searchQuery, setSearchQuery } = useCart();
  const { openProductDetail } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Active filter count calculation
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.sortBy !== 'popular') count++;
    if (filters.tags.length > 0) count += filters.tags.length;
    if (filters.priceRange !== 'all') count++;
    if (filters.minRating !== null) count++;
    if (filters.fastDeliveryOnly) count++;
    if (filters.inStockOnly) count++;
    return count;
  }, [filters]);

  // Cycle 1-tap quick sort
  const handleCycleSort = () => {
    const sortOrder = ['popular', 'speed', 'price_asc', 'price_desc', 'rating', 'discount'];
    const currIdx = sortOrder.indexOf(filters.sortBy);
    const nextSort = sortOrder[(currIdx + 1) % sortOrder.length];
    setFilters((prev) => ({ ...prev, sortBy: nextSort }));
  };

  const handleToggleQuickTag = (tag) => {
    setFilters((prev) => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
      };
    });
  };

  // Filtered and Sorted Products List
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;

    // Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        p.name?.toLowerCase().includes(q) ||
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        (Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(q))) ||
        (p.tag && p.tag.toLowerCase().includes(q))
      );
    }

    // Tags Filter
    if (filters.tags.length > 0) {
      list = list.filter((p) => {
        const pTags = Array.isArray(p.tags) ? p.tags.map((t) => t.toLowerCase()) : [];
        if (p.tag) pTags.push(p.tag.toLowerCase());
        return filters.tags.some((reqTag) =>
          pTags.some((pt) => pt.includes(reqTag.toLowerCase()))
        );
      });
    }

    // Price Range Filter
    if (filters.priceRange !== 'all') {
      list = list.filter((p) => {
        const price = p.price || 0;
        if (filters.priceRange === 'under_50') return price <= 50;
        if (filters.priceRange === '50_150') return price >= 50 && price <= 150;
        if (filters.priceRange === '150_300') return price >= 150 && price <= 300;
        if (filters.priceRange === '300_plus') return price >= 300;
        return true;
      });
    }

    // Min Rating Filter
    if (filters.minRating !== null) {
      list = list.filter((p) => (p.rating || 0) >= filters.minRating);
    }

    // Fast Delivery (<10m) Filter
    if (filters.fastDeliveryOnly) {
      list = list.filter((p) => {
        const mins = parseInt(p.deliveryMins?.match(/\d+/)?.[0] || '15', 10);
        return mins <= 10;
      });
    }

    // In Stock Only Filter
    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock !== false);
    }

    // Sorting
    const sorted = [...list];
    switch (filters.sortBy) {
      case 'speed':
        sorted.sort((a, b) => {
          const minsA = parseInt(a.deliveryMins?.match(/\d+/)?.[0] || '15', 10);
          const minsB = parseInt(b.deliveryMins?.match(/\d+/)?.[0] || '15', 10);
          return minsA - minsB;
        });
        break;
      case 'price_asc':
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price_desc':
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'discount':
        sorted.sort((a, b) => {
          const discA = a.mrp && a.price ? (a.mrp - a.price) / a.mrp : 0;
          const discB = b.mrp && b.price ? (b.mrp - b.price) / b.mrp : 0;
          return discB - discA;
        });
        break;
      case 'popular':
      default:
        sorted.sort((a, b) => {
          const scoreA = (a.reviewsCount || 10) * 10 + (a.rating || 4.5);
          const scoreB = (b.reviewsCount || 10) * 10 + (b.rating || 4.5);
          return scoreB - scoreA;
        });
        break;
    }

    return sorted;
  }, [selectedCategory, searchQuery, filters]);

  const getItemQuantityInCart = (id) => {
    const item = cart.find((i) => i.id === id || i.cartKey?.startsWith(id));
    return item ? item.quantity : 0;
  };

  return (
    <section id="store" className="py-16 relative overflow-hidden bg-[#06060a]">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#a3e635]/04 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#bef264]">
              <Clock className="w-3.5 h-3.5" /> 9 PM — 6 AM LIVE NOCTURNAL STORE
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white uppercase leading-[0.95]">
              MIDNIGHT <span className="text-[#a3e635]">STORE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Curated midnight snacks, cold drinks, ₹10 spices & party bundles with 100% Zero-Blind Open-Box inspection.
            </p>
          </div>
        </div>

        {/* 1. ULTRA-CLEAN SEARCH & FILTER BAR (ROW 1) */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search snacks, ₹10 spices, Red Bull, Maggi, Ice Cubes..."
              className="w-full bg-[#0b0e1e] border border-white/15 focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-full pl-11 pr-9 py-3 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Integrated Filter Button with active count badge */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className={`flex items-center gap-2 px-4 py-3 rounded-full border text-xs font-mono font-bold transition-all shrink-0 ${
              activeFilterCount > 0
                ? 'bg-[#a3e635]/15 border-[#a3e635] text-[#bef264] shadow-lime-glow'
                : 'bg-[#0e1124] border-white/15 text-slate-300 hover:border-white/30 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#a3e635]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#a3e635] text-black font-black text-[10px] flex items-center justify-center -mr-1">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* 2. UNIFIED DISCOVERY & QUICK FILTER STRIP (ROW 2) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* 1-Tap Quick Sort Cycle Pill */}
          <button
            onClick={handleCycleSort}
            className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
              filters.sortBy !== 'popular'
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-[#0c0f20] text-slate-300 border-white/10 hover:border-white/20'
            }`}
          >
            {SORT_OPTIONS_CONFIG.find((s) => s.id === filters.sortBy)?.label || 'Sort'} ▾
          </button>

          {/* Active Category Chip */}
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap bg-[#a3e635]/15 text-[#bef264] border border-[#a3e635] flex items-center gap-1.5 shrink-0"
            >
              <span>📁 {CATEGORIES.find((c) => c.id === selectedCategory)?.name} ✕</span>
            </button>
          )}

          {/* Quick Tag Pills */}
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                fastDeliveryOnly: !prev.fastDeliveryOnly,
              }))
            }
            className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
              filters.fastDeliveryOnly
                ? 'bg-[#a3e635]/20 text-[#bef264] border-[#a3e635]'
                : 'bg-[#0c0f20] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            ⚡ &lt;10m ETA
          </button>

          <button
            onClick={() => handleToggleQuickTag('₹10 Only')}
            className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
              filters.tags.includes('₹10 Only')
                ? 'bg-[#a3e635]/20 text-[#bef264] border-[#a3e635]'
                : 'bg-[#0c0f20] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            🪙 ₹10 Only
          </button>

          <button
            onClick={() => handleToggleQuickTag('Night Saver')}
            className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
              filters.tags.includes('Night Saver')
                ? 'bg-[#a3e635]/20 text-[#bef264] border-[#a3e635]'
                : 'bg-[#0c0f20] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            🌙 Night Saver
          </button>

          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                minRating: prev.minRating === 4.5 ? null : 4.5,
              }))
            }
            className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
              filters.minRating === 4.5
                ? 'bg-[#a3e635]/20 text-[#bef264] border-[#a3e635]'
                : 'bg-[#0c0f20] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            ⭐ 4.5+ ★
          </button>

          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                priceRange: prev.priceRange === 'under_50' ? 'all' : 'under_50',
              }))
            }
            className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
              filters.priceRange === 'under_50'
                ? 'bg-[#a3e635]/20 text-[#bef264] border-[#a3e635]'
                : 'bg-[#0c0f20] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            💰 &lt; ₹50
          </button>

          <button
            onClick={() => handleToggleQuickTag('Ice Cold')}
            className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
              filters.tags.includes('Ice Cold')
                ? 'bg-[#a3e635]/20 text-[#bef264] border-[#a3e635]'
                : 'bg-[#0c0f20] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            🧊 Ice Cold
          </button>

          <button
            onClick={() => handleToggleQuickTag('High Protein')}
            className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
              filters.tags.includes('High Protein')
                ? 'bg-[#a3e635]/20 text-[#bef264] border-[#a3e635]'
                : 'bg-[#0c0f20] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            🍗 High Protein
          </button>

          <button
            onClick={() => handleToggleQuickTag('Party Favorite')}
            className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
              filters.tags.includes('Party Favorite')
                ? 'bg-[#a3e635]/20 text-[#bef264] border-[#a3e635]'
                : 'bg-[#0c0f20] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            🎉 Party Fav
          </button>

          {/* Quick Search Chips */}
          <button
            onClick={() => setSearchQuery('Red Bull')}
            className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
              searchQuery === 'Red Bull'
                ? 'bg-[#a3e635]/20 text-[#bef264] border-[#a3e635]'
                : 'bg-[#0c0f20] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            ⚡ Red Bull
          </button>

          <button
            onClick={() => setSearchQuery('Eggs')}
            className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
              searchQuery === 'Eggs'
                ? 'bg-[#a3e635]/20 text-[#bef264] border-[#a3e635]'
                : 'bg-[#0c0f20] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            🍳 Eggs
          </button>

          {/* Reset Chip (if active) */}
          {(activeFilterCount > 0 || searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setFilters(INITIAL_FILTERS);
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 shrink-0"
            >
              ✕ Reset
            </button>
          )}
        </div>

        {/* 3. CATEGORY PILLS STRIP */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-y border-white/10">
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

        {/* 4. PRODUCTS GRID */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>
              Showing <strong className="text-white">{filteredProducts.length}</strong> items • Sorted by <span className="text-[#bef264]">{SORT_OPTIONS_CONFIG.find((s) => s.id === filters.sortBy)?.label || 'Popular'}</span>
            </span>
            <span className="text-[#a3e635] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Doorstep Open-Box
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 rounded-3xl bg-[#090a14] border border-white/10 space-y-4">
              <span className="text-4xl">🌙</span>
              <p className="font-display font-bold text-white text-base">NO ITEMS FOUND</p>
              <p className="text-xs text-slate-400 font-mono max-w-sm mx-auto">
                Try searching for other cravings, adjust price/rating filters, or reset filters to browse all drops.
              </p>
              <button
                onClick={() => {
                  setFilters(INITIAL_FILTERS);
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="btn-primary px-6 py-2.5 rounded-xl text-xs font-black uppercase"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredProducts.map((prod) => {
                const qty = getItemQuantityInCart(prod.id);
                const isFav = isInWishlist(prod.id);
                const hasVariants = prod.variants && prod.variants.length > 0;

                return (
                  <div
                    key={prod.id}
                    onClick={() => openProductDetail(prod)}
                    className="glass-card rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between border border-white/10 hover:border-[#a3e635]/50 group transition-all cursor-pointer relative"
                  >
                    {/* Top Image & Badges */}
                    <div className="space-y-3">
                      <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#0c0d18] border border-white/5 flex items-center justify-center">
                        <img
                          src={prod.image}
                          alt={prod.name || prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {prod.badge && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-mono font-black bg-[#a3e635] text-black shadow-lime-glow uppercase">
                            {prod.badge}
                          </span>
                        )}

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(prod);
                          }}
                          className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                            isFav
                              ? 'bg-rose-500/30 border-rose-500 text-rose-400'
                              : 'bg-black/60 border-white/10 text-white hover:text-rose-400'
                          }`}
                          title="Save to Stash"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>

                      {/* Product Meta */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span className="text-[#bef264]">⚡ {prod.deliveryMins || '10-15m'}</span>
                          <span>{prod.unit}</span>
                        </div>

                        <h3 className="font-display font-bold text-xs sm:text-sm text-white uppercase line-clamp-2 leading-tight">
                          {prod.name || prod.title}
                        </h3>

                        {/* Tag Badges */}
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {(prod.tags || [prod.tag || 'Bestseller']).slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#141426] text-slate-300 border border-white/5"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Action */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-3">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display font-black text-base text-[#a3e635]">₹{prod.price}</span>
                          {prod.mrp && prod.mrp > prod.price && (
                            <span className="text-[10px] text-slate-500 line-through font-mono">₹{prod.mrp}</span>
                          )}
                        </div>
                        {hasVariants && (
                          <span className="text-[9px] font-mono text-purple-300">
                            {prod.variants.length} options
                          </span>
                        )}
                      </div>

                      {/* Add Button or Stepper */}
                      {qty > 0 ? (
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 bg-[#141424] border border-[#a3e635]/40 rounded-xl px-2 py-1"
                        >
                          <button
                            onClick={() => updateQuantity(prod.id, -1)}
                            className="text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black font-mono text-[#a3e635] min-w-[12px] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(prod.id, 1)}
                            className="text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (hasVariants) {
                              openProductDetail(prod);
                            } else {
                              addToCart(prod);
                            }
                          }}
                          className="btn-primary p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-black uppercase flex items-center gap-1 shadow-lime-glow"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{hasVariants ? 'Options' : 'ADD'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* FILTER & SORT BOTTOM SHEET / MODAL */}
      <FilterSortModal
        visible={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={(newF) => setFilters(newF)}
        onResetFilters={() => {
          setFilters(INITIAL_FILTERS);
          setSelectedCategory('all');
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    </section>
  );
};
