import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { NightSkyBackground } from './components/NightSkyBackground';
import { CelestialScrollTransition } from './components/CelestialScrollTransition';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStatement } from './components/BrandStatement';
import { OpenBoxUSP } from './components/OpenBoxUSP';
import { NightDrops } from './components/NightDrops';
import { SmallPacksSection } from './components/SmallPacksSection';
import { ProductCatalog } from './components/ProductCatalog';
import { PartyPacks } from './components/PartyPacks';
import { PilotZone } from './components/PilotZone';
import { HowItWorks } from './components/HowItWorks';
import { SocialChat } from './components/SocialChat';
import { AppPreview } from './components/AppPreview';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderSimulatorModal } from './components/OrderSimulatorModal';
import { Volume2, VolumeX, Moon, Sparkles } from 'lucide-react';

export function App() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ambientSound, setAmbientSound] = useState(false);

  // Subtle cursor moonlight follower
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <CartProvider>
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

        {/* Floating Midnight Ambient Toggle Widget */}
        <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2 bg-[#0e0e18]/90 backdrop-blur-xl border border-white/10 px-3.5 py-2 rounded-2xl shadow-2xl text-xs font-mono text-slate-300">
          <div className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></div>
          <span>GREATER NOIDA PILOT</span>
          <span className="text-white/20">|</span>
          <button
            onClick={() => setAmbientSound(!ambientSound)}
            className="flex items-center gap-1 text-slate-400 hover:text-[#bef264] transition-colors"
            title="Night Vibe Mode"
          >
            {ambientSound ? <Volume2 className="w-3.5 h-3.5 text-[#a3e635]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{ambientSound ? 'Synth Vibe: ON' : 'Synth Vibe: OFF'}</span>
          </button>
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          {/* Hero Section */}
          <Hero />

          {/* Interactive Celestial Sun -> Moon Vertical Transition on Scroll */}
          <CelestialScrollTransition />

          {/* Brand Manifesto & Night Timeline (9 PM -> 5 AM) */}
          <BrandStatement />

          {/* Flagship USP: "OPEN. CHECK. ACCEPT." Doorstep Simulator */}
          <OpenBoxUSP />

          {/* Limited Tonight's Drops */}
          <NightDrops />

          {/* Differentiator Section: ₹10 Corner & Small Packs */}
          <SmallPacksSection />

          {/* Product Discovery: "WHAT DO YOU NEED AT 2:13 AM?" */}
          <ProductCatalog />

          {/* Party Packs & Midnight Bundles */}
          <PartyPacks />

          {/* Pilot Coverage: Greater Noida Radar & Waitlist */}
          <PilotZone />

          {/* How It Works (4 Steps) & Why AFTER 9 (5 Pillars) */}
          <HowItWorks />

          {/* Gen-Z Group Chat Social Proof */}
          <SocialChat />

          {/* Native Mobile App Previews with Doorstep UI */}
          <AppPreview />

          {/* Trust & Guarantee Section */}
          <TrustSection />
        </main>

        {/* Footer & Final Unforgettable CTA */}
        <Footer />

        {/* Sliding Cart Drawer */}
        <CartDrawer />

        {/* Live Order Dispatch & Inspection Simulator Modal */}
        <OrderSimulatorModal />

      </div>
    </CartProvider>
  );
}

export default App;
