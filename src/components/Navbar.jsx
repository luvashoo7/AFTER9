import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Moon, Clock, MapPin, Menu, X, ShieldCheck, 
  Zap, Sparkles, Compass, Search, Heart, Bell, User, Gift, Info, HelpCircle 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useInsideHub } from '../context/InsideHubContext';

export const Navbar = () => {
  const { 
    totalItemsCount, setIsCartOpen, searchQuery, setSearchQuery, 
    unreadNotificationsCount, setIsPaymentModalOpen 
  } = useCart();
  const { 
    user, activeAddress, setIsAddressModalOpen, setIsAuthModalOpen, 
    setIsProfileModalOpen, setIsOrdersModalOpen, setIsNotificationsModalOpen, 
    setIsShareModalOpen, setIsAboutModalOpen, setIsHelpModalOpen, openInfoModal 
  } = useAuth();
  const { wishlistCount, setIsWishlistModalOpen } = useWishlist();
  const { openHub } = useInsideHub();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('02:17:42 AM');

  // Simulated atmospheric late night clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      const storeEl = document.getElementById('store');
      if (storeEl && window.scrollY < storeEl.offsetTop - 200) {
        storeEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleUserClick = () => {
    if (user?.isLoggedIn) {
      setIsProfileModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#06060a]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-2' 
        : 'bg-[#06060a]/75 backdrop-blur-md py-2.5'
    }`}>
      {/* Top micro-banner for operating hours, address & pilot */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 mb-1.5 text-xs font-mono">
        <div className="flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1.5 text-[#a3e635] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-[#a3e635] -ml-3.5"></span>
            9 PM — 6 AM OPERATIONAL
          </span>
          <span className="text-white/20">|</span>
          <button 
            onClick={() => setIsAddressModalOpen(true)}
            className="flex items-center gap-1 text-slate-300 hover:text-[#bef264] transition-colors"
            title="Change Delivery Sector"
          >
            <MapPin className="w-3.5 h-3.5 text-[#a3e635]" />
            <span>DROP: <strong className="text-white underline decoration-dotted">{activeAddress?.sector || 'Pari Chowk Hub'}</strong></span>
          </button>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5 bg-[#10101c] px-2.5 py-0.5 rounded-full border border-white/10 text-slate-300">
            <Clock className="w-3 h-3 text-[#a78bfa]" />
            NIGHT CLOCK: <span className="text-[#bef264] font-bold">{currentTime}</span>
          </span>
          <button 
            onClick={() => openInfoModal('openbox')}
            className="text-emerald-400 flex items-center gap-1 hover:underline"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Open-Box Inspection
          </button>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Brand Logo with distinctive stylized '9' symbol */}
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <div className="relative flex items-center">
            <span className="font-display font-black text-2xl tracking-tighter text-white uppercase group-hover:text-slate-100 transition-colors">
              AFTER
            </span>
            <span className="ml-1.5 relative inline-flex items-center justify-center">
              <span className="brand-nine text-2xl font-black px-2 py-0.5 rounded-lg bg-[#a3e635] text-[#06060a] shadow-lime-glow group-hover:scale-105 group-hover:bg-[#bef264] transition-transform">
                9
              </span>
            </span>
          </div>
          <span className="hidden xl:inline-block text-[10px] font-mono uppercase tracking-widest text-[#a78bfa] bg-[#a78bfa]/10 px-2 py-0.5 rounded border border-[#a78bfa]/30">
            Night Commerce
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-[#0f0f1c]/80 border border-white/[0.08] px-2.5 py-1.5 rounded-full backdrop-blur-md shrink-0">
          <a href="#store" className="px-3 py-1 rounded-full text-xs font-semibold text-slate-300 hover:text-[#bef264] hover:bg-white/[0.04] transition-all">
            🌙 Store
          </a>
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="px-3 py-1 rounded-full text-xs font-semibold text-[#bef264] hover:bg-[#a3e635]/15 transition-all flex items-center gap-1"
          >
            💳 Payment
          </button>
          <button
            onClick={() => setIsOrdersModalOpen(true)}
            className="px-3 py-1 rounded-full text-xs font-semibold text-slate-300 hover:text-[#bef264] hover:bg-white/[0.04] transition-all"
          >
            Orders
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3 py-1 rounded-full text-xs font-semibold text-purple-300 hover:text-white hover:bg-purple-950/40 transition-all flex items-center gap-1"
          >
            <Gift className="w-3 h-3 text-[#a78bfa]" />
            Refer & ₹50
          </button>
          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="px-3 py-1 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] transition-all"
          >
            About Us
          </button>
          <button
            onClick={() => openHub('manifesto')}
            className="px-3 py-1 rounded-full text-xs font-mono font-bold text-purple-300 hover:text-white hover:bg-purple-950/40 transition-all flex items-center gap-1"
          >
            <Compass className="w-3 h-3 text-[#a78bfa]" />
            Inside Hub
          </button>
        </div>

        {/* Right CTAs: Wishlist, Notifications, Auth Avatar, Cart */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Wishlist Stash Button */}
          <button
            onClick={() => setIsWishlistModalOpen(true)}
            className="relative p-2.5 rounded-xl bg-[#121220] hover:bg-[#18182a] text-slate-300 hover:text-rose-400 border border-white/10 transition-all"
            title="Midnight Stash"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[9.5px] font-black font-mono bg-rose-500 text-white rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setIsNotificationsModalOpen(true)}
            className="relative p-2.5 rounded-xl bg-[#121220] hover:bg-[#18182a] text-slate-300 hover:text-[#bef264] border border-white/10 transition-all"
            title="Midnight Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[9.5px] font-black font-mono bg-[#a3e635] text-black rounded-full">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* User Profile / Login Avatar */}
          <button
            onClick={handleUserClick}
            className="flex items-center gap-1.5 p-2 px-2.5 rounded-xl bg-[#121220] hover:bg-[#18182a] text-slate-200 border border-white/10 hover:border-[#a3e635]/40 transition-all"
            title={user?.isLoggedIn ? 'View Profile' : 'Login / Sign Up'}
          >
            <span className="text-sm">{user?.isLoggedIn ? user.avatar || '🌙' : '👤'}</span>
            <span className="text-xs font-mono font-bold hidden md:inline truncate max-w-[80px]">
              {user?.isLoggedIn ? user.name?.split(' ')[0] : 'Login'}
            </span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#121220] hover:bg-[#18182a] text-white px-3 py-2 rounded-xl border border-white/10 hover:border-[#a3e635]/50 transition-all shadow-md group"
            aria-label="Open Midnight Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#a3e635] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold font-mono tracking-wide hidden md:inline">BAG</span>
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-black font-mono bg-[#a3e635] text-[#06060a] rounded-full shadow-sm">
              {totalItemsCount}
            </span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#121220] text-slate-300 border border-white/10 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080810]/98 backdrop-blur-2xl border-b border-white/10 px-4 py-5 space-y-4 animate-in slide-in-from-top duration-200">
          
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
            <span className="text-[#a3e635] flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></span>
              9 PM — 6 AM • PILOT LIVE
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAddressModalOpen(true);
              }}
              className="text-slate-300 underline"
            >
              {activeAddress?.sector?.split(' ')[0] || 'Greater Noida'} ▾
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <a
              href="#store"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-[#10101c] rounded-xl text-slate-200 hover:text-[#bef264] flex items-center gap-2 text-xs"
            >
              🌙 Midnight Store
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsPaymentModalOpen(true);
              }}
              className="p-3 bg-[#10101c] rounded-xl text-[#bef264] flex items-center gap-2 text-left text-xs"
            >
              💳 Payment Sheet
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsOrdersModalOpen(true);
              }}
              className="p-3 bg-[#10101c] rounded-xl text-slate-200 flex items-center gap-2 text-left text-xs"
            >
              📦 Past Orders
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsWishlistModalOpen(true);
              }}
              className="p-3 bg-[#10101c] rounded-xl text-rose-300 flex items-center gap-2 text-left text-xs"
            >
              ❤️ Midnight Stash ({wishlistCount})
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsShareModalOpen(true);
              }}
              className="p-3 bg-purple-950/40 text-purple-300 rounded-xl flex items-center gap-2 text-left text-xs"
            >
              <Gift className="w-4 h-4 text-[#a78bfa]" /> Refer & Earn ₹50
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAboutModalOpen(true);
              }}
              className="p-3 bg-[#10101c] rounded-xl text-slate-200 flex items-center gap-2 text-left text-xs"
            >
              <Info className="w-4 h-4 text-[#a3e635]" /> About Us
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsHelpModalOpen(true);
              }}
              className="p-3 bg-[#10101c] rounded-xl text-slate-200 flex items-center gap-2 text-left text-xs col-span-2"
            >
              <HelpCircle className="w-4 h-4 text-blue-400" /> 24/7 Help & Night Support
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="w-full btn-primary py-3 rounded-xl text-center block text-xs uppercase tracking-widest font-black"
          >
            OPEN MIDNIGHT BAG ({totalItemsCount}) →
          </button>
        </div>
      )}
    </header>
  );
};
