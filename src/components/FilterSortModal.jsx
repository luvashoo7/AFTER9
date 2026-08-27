import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, AVAILABLE_PRODUCT_TAGS, SORT_OPTIONS_CONFIG, PRODUCTS } from '../data/products';
import { X, SlidersHorizontal, Check, RotateCcw, Zap, Sparkles } from 'lucide-react';

export const FilterSortModal = ({
  visible,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  selectedCategory,
  onSelectCategory,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [localCategory, setLocalCategory] = useState(selectedCategory || 'all');

  useEffect(() => {
    setLocalFilters(filters);
    setLocalCategory(selectedCategory || 'all');
  }, [filters, selectedCategory, visible]);

  // Realtime Matching Products Count based on local choices
  const previewCount = useMemo(() => {
    let list = PRODUCTS;

    if (localCategory && localCategory !== 'all') {
      list = list.filter((p) => p.category === localCategory);
    }

    if (localFilters.tags.length > 0) {
      list = list.filter((p) => {
        const pTags = Array.isArray(p.tags) ? p.tags.map((t) => t.toLowerCase()) : [];
        if (p.tag) pTags.push(p.tag.toLowerCase());
        return localFilters.tags.some((reqTag) =>
          pTags.some((pt) => pt.includes(reqTag.toLowerCase()))
        );
      });
    }

    if (localFilters.priceRange !== 'all') {
      list = list.filter((p) => {
        const price = p.price || 0;
        if (localFilters.priceRange === 'under_50') return price <= 50;
        if (localFilters.priceRange === '50_150') return price >= 50 && price <= 150;
        if (localFilters.priceRange === '150_300') return price >= 150 && price <= 300;
        if (localFilters.priceRange === '300_plus') return price >= 300;
        return true;
      });
    }

    if (localFilters.minRating !== null) {
      list = list.filter((p) => (p.rating || 0) >= localFilters.minRating);
    }

    if (localFilters.fastDeliveryOnly) {
      list = list.filter((p) => {
        const mins = parseInt(p.deliveryMins?.match(/\d+/)?.[0] || '15', 10);
        return mins <= 10;
      });
    }

    if (localFilters.inStockOnly) {
      list = list.filter((p) => p.inStock !== false);
    }

    return list.length;
  }, [localFilters, localCategory]);

  if (!visible) return null;

  const handleToggleTag = (tag) => {
    setLocalFilters((prev) => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
      };
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    if (onSelectCategory && localCategory) {
      onSelectCategory(localCategory);
    }
    onClose();
  };

  const handleReset = () => {
    onResetFilters();
    setLocalCategory('all');
    if (onSelectCategory) {
      onSelectCategory('all');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleApply}
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
                FILTERS & SORTING
              </span>
            </div>
            <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight flex items-center gap-2">
              <SlidersHorizontal className="w-6 h-6 text-[#a3e635]" />
              Refine Night Store
            </h3>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-mono text-slate-400 hover:text-rose-400 flex items-center gap-1 p-2 rounded-xl bg-[#121224]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>

        {/* Scrollable Filters Body */}
        <div className="py-4 space-y-5 max-h-[60vh] overflow-y-auto pr-1">
          
          {/* 1. SORT BY */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              1. SORT PRODUCTS BY
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SORT_OPTIONS_CONFIG.map((opt) => {
                const isSelected = localFilters.sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLocalFilters((prev) => ({ ...prev, sortBy: opt.id }))}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-[#a3e635] text-black font-black border-[#a3e635] shadow-lime-glow'
                        : 'bg-[#0f0f1c] text-slate-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-mono">{opt.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. CATEGORY SELECTOR */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              2. SELECT CATEGORY
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = localCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setLocalCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-purple-950/60 text-purple-200 font-bold border-[#a78bfa] shadow-purple-glow'
                        : 'bg-[#0f0f1c] text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. PRODUCT TAGS */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              3. POPULAR NIGHT TAGS
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_PRODUCT_TAGS.map((tag) => {
                const isSelected = localFilters.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleTag(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                      isSelected
                        ? 'bg-[#a3e635]/20 text-[#bef264] font-bold border-[#a3e635]'
                        : 'bg-[#0f0f1c] text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. PRICE RANGE */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              4. PRICE RANGE
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'under_50', label: '< ₹50' },
                { id: '50_150', label: '₹50-₹150' },
                { id: '150_300', label: '₹150-₹300' },
                { id: '300_plus', label: '₹300+' },
              ].map((p) => {
                const isSelected = localFilters.priceRange === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setLocalFilters((prev) => ({ ...prev, priceRange: p.id }))}
                    className={`py-2 rounded-xl text-xs font-mono border transition-all text-center ${
                      isSelected
                        ? 'bg-[#a3e635] text-black font-black border-[#a3e635]'
                        : 'bg-[#0f0f1c] text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. MINIMUM RATING & SPEED TOGGLES */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              5. SPECIAL CRITERIA
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    fastDeliveryOnly: !prev.fastDeliveryOnly,
                  }))
                }
                className={`p-3 rounded-xl text-xs font-mono border text-left flex items-center justify-between ${
                  localFilters.fastDeliveryOnly
                    ? 'bg-[#a3e635]/20 text-[#bef264] font-bold border-[#a3e635]'
                    : 'bg-[#0f0f1c] text-slate-400 border-white/10'
                }`}
              >
                <span>⚡ &lt;10m Fast ETA</span>
                {localFilters.fastDeliveryOnly && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    minRating: prev.minRating === 4.5 ? null : 4.5,
                  }))
                }
                className={`p-3 rounded-xl text-xs font-mono border text-left flex items-center justify-between ${
                  localFilters.minRating === 4.5
                    ? 'bg-[#a3e635]/20 text-[#bef264] font-bold border-[#a3e635]'
                    : 'bg-[#0f0f1c] text-slate-400 border-white/10'
                }`}
              >
                <span>⭐ 4.5+ Rating</span>
                {localFilters.minRating === 4.5 && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-white/10">
          <button
            onClick={handleApply}
            className="w-full btn-primary py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lime-glow"
          >
            <span>SHOW {previewCount} PRODUCTS →</span>
          </button>
        </div>

      </div>
    </div>
  );
};
