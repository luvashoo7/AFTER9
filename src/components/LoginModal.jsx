import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Moon, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useAuth();
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '9999' && otp.length !== 4) {
      setError('Invalid OTP. Use demo OTP 9999');
      return;
    }
    setError('');
    login(phone, name || 'Night Owl Resident');
    setStep('phone');
    setPhone('');
    setName('');
    setOtp('');
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-md rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pb-6 border-b border-white/10">
          <div className="w-14 h-14 rounded-2xl bg-[#a3e635]/10 border border-[#a3e635]/40 text-[#a3e635] flex items-center justify-center mx-auto shadow-lime-glow">
            <Moon className="w-7 h-7" />
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            NOCTURNAL <span className="text-[#a3e635]">LOGIN</span>
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Sign in for 10-15m midnight delivery across Greater Noida
          </p>
        </div>

        {/* STEP 1: PHONE NUMBER & NAME */}
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="py-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">YOUR NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aryan Sharma"
                className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">MOBILE NUMBER</label>
              <div className="flex items-center gap-2">
                <span className="bg-[#111122] border border-white/15 text-xs font-mono text-[#a3e635] font-bold px-3 py-3 rounded-xl">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none tracking-widest"
                  required
                />
              </div>
            </div>

            {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}

            <button
              type="submit"
              className="w-full btn-primary py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>SEND MIDNIGHT OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* STEP 2: OTP VERIFICATION */
          <form onSubmit={handleVerifyOtp} className="py-6 space-y-4">
            <div className="text-center space-y-1">
              <p className="text-xs text-slate-300 font-mono">
                OTP sent to <span className="text-[#a3e635] font-bold">+91 {phone}</span>
              </p>
              <button
                type="button"
                onClick={() => setOtp('9999')}
                className="text-[11px] text-[#a78bfa] hover:underline font-mono"
              >
                Auto-fill Demo OTP: <strong className="text-white">9999</strong>
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">ENTER 4-DIGIT OTP</label>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="9999"
                className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-center text-xl font-mono font-black text-[#a3e635] placeholder-slate-600 rounded-xl px-4 py-3 tracking-[1em] outline-none"
                required
              />
            </div>

            {error && <p className="text-xs text-rose-400 font-mono text-center">{error}</p>}

            <button
              type="submit"
              className="w-full btn-primary py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>VERIFY & ENTER AFTER 9</span>
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-xs text-slate-400 hover:text-white font-mono"
            >
              ← Change Phone Number
            </button>
          </form>
        )}

        {/* Footer Guarantee */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
          <span>100% Zero-Blind Open-Box Guaranteed</span>
        </div>

      </div>
    </div>
  );
};
