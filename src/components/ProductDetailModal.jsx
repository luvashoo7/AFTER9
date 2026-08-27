import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SAMPLE_REVIEWS } from '../data/products';
import { 
  X, Star, ShieldCheck, Clock, ShoppingBag, Heart, 
  Check, ThumbsUp, Send, Sparkles, Tag, Plus, Minus 
} from 'lucide-react';

export const ProductDetailModal = () => {
  const { selectedProductDetail, closeProductDetail } = useAuth();
  const { addToCart, cart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = selectedProductDetail;

  // Selected Variant State
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Review Submission State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [userReviews, setUserReviews] = useState([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Initialize or reset variant when product changes
  React.useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
    setQuantity(1);
    setReviewSubmitted(false);
  }, [product]);

  const activePrice = selectedVariant ? selectedVariant.price : (product?.price || 0);
  const activeMrp = selectedVariant ? selectedVariant.mrp : (product?.mrp || 0);
  const activeUnit = selectedVariant ? selectedVariant.unit : (product?.unit || '');
  const activeDiscount = activeMrp > activePrice ? Math.round(((activeMrp - activePrice) / activeMrp) * 100) : 0;

  // All Reviews for this product
  const allReviews = useMemo(() => {
    if (!product) return [];
    const defaults = SAMPLE_REVIEWS[product.id] || [];
    return [...userReviews.filter((r) => r.productId === product.id), ...defaults];
  }, [product, userReviews]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev = {
      id: `rev-user-${Date.now()}`,
      productId: product.id,
      userName: reviewerName.trim() || 'Verified Night Owl',
      rating: newRating,
      date: 'Just Now',
      comment: newComment.trim(),
      verifiedNightBuyer: true,
      buyerLocation: 'Greater Noida Resident',
      tags: ['Verified Inspection', 'Night Delivery'],
      likes: 1,
    };

    setUserReviews((prev) => [newRev, ...prev]);
    setNewComment('');
    setReviewerName('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Scroll Content */}
        <div className="py-2 space-y-6 max-h-[80vh] overflow-y-auto pr-1">
          
          {/* Top Product Hero Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            
            {/* Image Box */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0d0d1a] border border-white/10 aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name || product.title}
                className="w-full h-full object-cover"
              />

              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-black bg-[#a3e635] text-black shadow-lime-glow uppercase">
                  {product.badge}
                </span>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
                  isFavorited
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-black/60 border-white/15 text-white hover:text-rose-400'
                }`}
                title="Save to Midnight Stash"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Product Meta & Pricing */}
            <div className="space-y-4">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#bef264]">⚡ {product.deliveryMins || '10-15 mins'}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs font-mono text-slate-400">{activeUnit}</span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase leading-tight">
                  {product.name || product.title}
                </h3>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {(product.tags || [product.tag || 'Bestseller']).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#141428] text-slate-300 border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Price & Savings */}
              <div className="p-3 rounded-2xl bg-[#0f0f1c] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#a3e635] font-display">₹{activePrice}</span>
                    {activeMrp > activePrice && (
                      <span className="text-xs text-slate-500 line-through font-mono">MRP ₹{activeMrp}</span>
                    )}
                  </div>
                  {activeDiscount > 0 && (
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      SAVE {activeDiscount}% OFF MRP
                    </span>
                  )}
                </div>

                {/* Add to Bag action */}
                <button
                  onClick={() => {
                    addToCart(product, quantity, selectedVariant);
                    closeProductDetail();
                  }}
                  className="btn-primary px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lime-glow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>
              </div>

              {/* VARIANTS SELECTOR (If applicable) */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                    PACK SIZE & OPTIONS
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((v) => {
                      const isVarSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`p-2.5 rounded-xl text-left border transition-all ${
                            isVarSelected
                              ? 'bg-[#a3e635]/15 border-[#a3e635] text-white shadow-lime-glow'
                              : 'bg-[#101020] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-mono font-bold">{v.name}</div>
                          <div className="text-[11px] font-mono text-[#bef264]">₹{v.price}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                {product.description || 'Verified fresh midnight delivery with 100% Zero-Blind Open-Box Guarantee.'}
              </p>

            </div>

          </div>

          {/* RATING & REVIEWS SECTION */}
          <div className="pt-6 border-t border-white/10 space-y-5">
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  Verified Nocturnal Reviews ({allReviews.length})
                </h4>
                <p className="text-xs font-mono text-slate-400">
                  Real feedback from Greater Noida students and night residents
                </p>
              </div>
            </div>

            {/* Rating Breakdown Bar Chart */}
            <div className="p-4 rounded-2xl bg-[#0e0e1a] border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="text-center sm:text-left space-y-1">
                <div className="text-3xl font-black text-white font-display flex items-center justify-center sm:justify-start gap-2">
                  <span>{product.rating || 4.9}</span>
                  <div className="flex text-amber-400">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i} className="text-base">{s}</span>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] font-mono text-slate-400">Based on 50+ midnight doorstep inspections</p>
              </div>

              <div className="space-y-1.5 text-[10px] font-mono text-slate-400">
                {[
                  { star: '5 ★', pct: '88%', count: 44 },
                  { star: '4 ★', pct: '10%', count: 5 },
                  { star: '3 ★', pct: '2%', count: 1 },
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-2">
                    <span className="w-6">{row.star}</span>
                    <div className="flex-1 h-2 rounded-full bg-[#18182e] overflow-hidden">
                      <div className="h-full bg-[#a3e635]" style={{ width: row.pct }} />
                    </div>
                    <span className="w-6 text-right">{row.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-3">
              {allReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs font-mono">{rev.userName}</span>
                        <span className="px-2 py-0.2 rounded text-[9px] font-mono font-bold bg-[#a3e635]/15 text-[#bef264] flex items-center gap-1">
                          <ShieldCheck className="w-2.5 h-2.5" /> VERIFIED NIGHT BUYER
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono">{rev.buyerLocation} • {rev.date}</p>
                    </div>

                    <div className="flex text-amber-400 text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-mono leading-relaxed">
                    "{rev.comment}"
                  </p>

                  {rev.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {rev.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-[9.5px] font-mono bg-[#141426] text-slate-400 border border-white/5"
                        >
                          ✓ {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* INTERACTIVE WRITE A REVIEW FORM */}
            <form onSubmit={handleAddReview} className="p-4 rounded-2xl bg-[#0c0c16] border border-white/10 space-y-3">
              <h5 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#a3e635]" />
                Write a Verified Review
              </h5>

              {/* Star Rating Picker */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNewRating(num)}
                      className={`text-base transition-transform hover:scale-125 ${
                        num <= newRating ? 'text-amber-400' : 'text-slate-600'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Your Name (e.g. Aryan S., KP-3)"
                className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-3.5 py-2.5 outline-none"
              />

              <textarea
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="How was the temperature, packaging, and doorstep inspection?"
                className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-3.5 py-2.5 outline-none"
                required
              />

              {reviewSubmitted && (
                <p className="text-xs font-mono text-[#bef264]">
                  ✓ Review submitted and verified at Greater Noida hub!
                </p>
              )}

              <button
                type="submit"
                className="btn-primary py-2.5 px-5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Night Review</span>
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
