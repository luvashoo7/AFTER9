import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { InsideHubProvider, useInsideHub } from './context/InsideHubContext';
import { NightSkyBackground } from './components/NightSkyBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OpenBoxUSP } from './components/OpenBoxUSP';
import { ProductCatalog } from './components/ProductCatalog';
import { PilotZone } from './components/PilotZone';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderSimulatorModal } from './components/OrderSimulatorModal';
import { InsideHubModal } from './components/InsideHubModal';
import { Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';

function AppContent() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ambientSound, setAmbientSound] = useState(false);
  const { openHub } = useInsideHub();

  // Subtle cursor moonlight follower
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#06060a] text-[#f8fafc] selection:bg-[#a3e635] selection:text-[#06060a] overflow-x-hidden font-sans pb-16 md:pb-0">
      
      {/* Dynamic Animated Starfield & Nebula Background */}
      <NightSkyBackground />

      {/* Subtle Film Grain Noise Texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Dynamic Subtle Moonlight Cursor Glow */}
      <div
        className="pointer-events-none fixed z-30 w-80 h-80 rounded-full bg-[#a3e635]/04 blur-3xl transition-transform duration-100 ease-out hidden lg:block"
        style={{
          transform: `translate(${cursorPos.x - 160}px, ${cursorPos.y - 160}px)`,
        }}
        aria-hidden="true"
      />

      {/* Floating Midnight Ambient & Hub Trigger Widget */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2.5 bg-[#0e0e18]/90 backdrop-blur-xl border border-white/10 px-3.5 py-2 rounded-2xl shadow-2xl text-xs font-mono text-slate-300">
        <div className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></div>
        <button
          onClick={() => openHub('pilot')}
          className="hover:text-white transition-colors"
          title="View Pilot Zones"
        >
          GREATER NOIDA PILOT
        </button>
        <span className="text-white/20">|</span>
        <button
          onClick={() => openHub('manifesto')}
          className="flex items-center gap-1 text-purple-300 hover:text-white transition-colors"
          title="Open Inside Hub"
        >
          <Compass className="w-3.5 h-3.5 text-[#a78bfa]" />
          <span>Inside Hub</span>
        </button>
        <span className="text-white/20">|</span>
        <button
          onClick={() => setAmbientSound(!ambientSound)}
          className="flex items-center gap-1 text-slate-400 hover:text-[#bef264] transition-colors"
          title="Toggle Night Synth Vibe"
        >
          {ambientSound ? <Volume2 className="w-3.5 h-3.5 text-[#a3e635]" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{ambientSound ? 'Synth: ON' : 'Synth: OFF'}</span>
        </button>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Streamlined Content */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Flagship USP Spotlight: "OPEN. CHECK. ACCEPT." Doorstep Simulator */}
        <OpenBoxUSP />

        {/* 3. Unified Midnight Store (Drops, ₹10 Corner, Bundles, Cravings) */}
        <ProductCatalog />

        {/* 4. Pilot Coverage: Greater Noida Radar & Waitlist */}
        <PilotZone />
      </main>

      {/* 5. Footer & Final Unforgettable CTA */}
      <Footer />

      {/* Grouped Inside Hub (Night Shift, Trust Guide, 2 AM Group Chat, Pilot Radar) */}
      <InsideHubModal />

      {/* Sliding Cart Drawer */}
      <CartDrawer />

      {/* Live Order Dispatch & Inspection Simulator Modal */}
      <OrderSimulatorModal />

    </div>
  );
}

export function App() {
  return (
    <CartProvider>
      <InsideHubProvider>
        <AppContent />
      </InsideHubProvider>
    </CartProvider>
  );
}

export default App;
