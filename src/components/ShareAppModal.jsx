import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Share2, Copy, Check, Gift, Sparkles, MessageCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ShareAppModal = () => {
  const { isShareModalOpen, setIsShareModalOpen } = useAuth();
  const [copied, setCopied] = useState(false);
  const referralCode = 'AFTER9-WEB-592';
  const shareText = `🌙 Craving midnight snacks, cold drinks or ₹10 spices in Greater Noida? Order on AFTER 9 between 9 PM — 6 AM for 10-15m dispatch and 100% Zero-Blind Open-Box inspection! Use my code ${referralCode} for ₹50 off: https://after9.in`;

  if (!isShareModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#a3e635', '#ffffff', '#a78bfa']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AFTER 9 - Night Commerce Greater Noida',
          text: shareText,
          url: 'https://after9.in',
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-md rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsShareModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pb-5 border-b border-white/10">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-[#a78bfa] border border-purple-500/40 flex items-center justify-center mx-auto shadow-purple-glow">
            <Gift className="w-7 h-7" />
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            SHARE <span className="text-[#a3e635]">AFTER 9</span>
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Invite fellow night owls & students in Greater Noida
          </p>
        </div>

        {/* Rewards Card */}
        <div className="py-4 space-y-4 font-mono text-xs">
          
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-[#0f0f1c] border border-purple-500/30 text-center space-y-1">
            <p className="text-sm font-black text-white font-display">GIVE ₹50, GET ₹50</p>
            <p className="text-[11px] text-purple-200">
              Your friend gets ₹50 OFF their first midnight order. You get ₹50 Night Wallet credit instantly!
            </p>
          </div>

          {/* Referral Code Box */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold uppercase text-[11px]">YOUR REFERRAL CODE</label>
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#111122] border border-white/15">
              <span className="flex-1 font-black text-center text-[#a3e635] text-sm tracking-widest">
                {referralCode}
              </span>
              <button
                onClick={handleCopy}
                className="btn-primary px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED!' : 'COPY'}</span>
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-center font-bold flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`https://t.me/share/url?url=${encodeURIComponent('https://after9.in')}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/40 text-blue-300 text-center font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </a>
          </div>

          {/* Native Web Share */}
          <button
            onClick={handleNativeShare}
            className="w-full btn-secondary py-3 rounded-xl font-bold uppercase flex items-center justify-center gap-2 text-xs"
          >
            <Share2 className="w-4 h-4 text-[#a3e635]" />
            <span>More Sharing Options</span>
          </button>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 text-center text-[11px] font-mono text-slate-500">
          Valid across all Greater Noida hostels, apartments & campuses
        </div>

      </div>
    </div>
  );
};
