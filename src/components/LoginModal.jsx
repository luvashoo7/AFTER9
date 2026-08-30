import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { authService } from '../services/authService';
import { PILOT_SECTORS } from '../data/products';
import {
  X,
  Moon,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Loader2,
  User,
  Phone,
  Mail,
  MapPin,
  Gift,
  KeyRound,
  UserPlus
} from 'lucide-react';

export const LoginModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login } = useAuth();
  const { cart, setIsPaymentModalOpen } = useCart();
  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [mode, setMode] = useState(authMode || 'login'); // 'login' | 'signup'

  // Form State
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sector, setSector] = useState(PILOT_SECTORS[0] || 'Knowledge Park 3');
  const [referralCode, setReferralCode] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authMode) {
      setMode(authMode);
    }
  }, [authMode]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phone.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name to create an account');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

      if (mode === 'signup') {
        await authService.signup({
          phone: formattedPhone,
          name,
          email,
          sector,
          referralCode,
        }).catch((err) => {
          console.warn('Signup request notice:', err.message);
        });
      } else {
        await authService.requestOtp(formattedPhone).catch((err) => {
          console.warn('Backend request-otp notice:', err.message);
        });
      }
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send verification OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

    try {
      let verifiedUser = null;
      try {
        const res = await authService.verifyOtp(formattedPhone, otp, {
          name: mode === 'signup' ? name : undefined,
          email: mode === 'signup' ? email : undefined,
          sector: mode === 'signup' ? sector : undefined,
          referralCode: mode === 'signup' ? referralCode : undefined,
        });
        verifiedUser = res?.user;
      } catch (backendErr) {
        // Offline demo fallback
        if (otp === '123456' || otp === '9999' || otp === '999999') {
          verifiedUser = {
            phone: formattedPhone,
            name: name || (mode === 'signup' ? 'New Night Owl' : 'Night Owl Resident'),
            email: email || `${phone}@after9.in`,
            role: 'CUSTOMER',
          };
        } else {
          throw backendErr;
        }
      }

      login(
        formattedPhone,
        verifiedUser?.name || name || (mode === 'signup' ? 'New Night Owl' : 'Night Owl Resident')
      );

      // Reset Form
      setStep('form');
      setPhone('');
      setName('');
      setEmail('');
      setReferralCode('');
      setOtp('');
      setIsAuthModalOpen(false);

      // Seamlessly resume checkout/payment if user was in booking journey
      if (cart && cart.length > 0) {
        setIsPaymentModalOpen(true);
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP. Use demo OTP 123456 or 9999.');
    } finally {
      setLoading(false);
    }
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
        <div className="text-center space-y-2 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-[#a3e635]/10 border border-[#a3e635]/40 text-[#a3e635] flex items-center justify-center mx-auto shadow-lime-glow">
            <Moon className="w-6 h-6" />
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            {mode === 'signup' ? (
              <>
                JOIN <span className="text-[#a3e635]">AFTER 9</span>
              </>
            ) : (
              <>
                NOCTURNAL <span className="text-[#a3e635]">LOGIN</span>
              </>
            )}
          </h3>
          <p className="text-xs font-mono text-slate-400">
            {mode === 'signup'
              ? 'Create your account for 10-15m midnight delivery & doorstep open-box'
              : 'Sign in to access live orders, night drops & your saved address'}
          </p>
        </div>

        {/* Tab Selector (Sign In vs Sign Up) */}
        {step === 'form' && (
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#111122] rounded-2xl border border-white/10 mt-4">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                mode === 'login'
                  ? 'bg-[#a3e635] text-black shadow-lime-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                mode === 'signup'
                  ? 'bg-[#a3e635] text-black shadow-lime-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up (New)</span>
            </button>
          </div>
        )}

        {/* STEP 1: FORM (SIGN IN OR SIGN UP) */}
        {step === 'form' ? (
          <form onSubmit={handleSendOtp} className="py-4 space-y-3.5">
            {mode === 'signup' && (
              <>
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#a3e635]" />
                    <span>FULL NAME *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aryan Sharma"
                    className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-3.5 py-2.5 outline-none"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#a3e635]" />
                    <span>EMAIL (OPTIONAL)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aryan@gmail.com"
                    className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-3.5 py-2.5 outline-none"
                  />
                </div>

                {/* Primary Delivery Sector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#a3e635]" />
                    <span>PRIMARY DELIVERY SECTOR</span>
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 outline-none"
                  >
                    {PILOT_SECTORS.map((s) => (
                      <option key={s} value={s}>
                        {s} (10-15 min SLA)
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#a3e635]" />
                <span>MOBILE NUMBER *</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="bg-[#111122] border border-white/15 text-xs font-mono text-[#a3e635] font-bold px-3 py-2.5 rounded-xl">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-3.5 py-2.5 outline-none tracking-widest"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              /* Referral / Invite Code */
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1">
                  <Gift className="w-3 h-3 text-purple-400" />
                  <span>REFERRAL CODE (OPTIONAL)</span>
                </label>
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  placeholder="e.g. AFTER9 (Get ₹50 Night Perk)"
                  className="w-full bg-[#111122] border border-purple-500/30 focus:border-purple-400 text-xs font-mono text-purple-300 placeholder-slate-500 rounded-xl px-3.5 py-2.5 outline-none uppercase"
                />
              </div>
            )}

            {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{mode === 'signup' ? 'SIGN UP & GET OTP' : 'SEND MIDNIGHT OTP'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Switch Text */}
            <div className="text-center pt-2">
              {mode === 'login' ? (
                <p className="text-xs font-mono text-slate-400">
                  New to AFTER 9?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setError('');
                    }}
                    className="text-[#a3e635] font-bold hover:underline"
                  >
                    Create Account →
                  </button>
                </p>
              ) : (
                <p className="text-xs font-mono text-slate-400">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError('');
                    }}
                    className="text-[#a3e635] font-bold hover:underline"
                  >
                    Log In →
                  </button>
                </p>
              )}
            </div>
          </form>
        ) : (
          /* STEP 2: OTP VERIFICATION */
          <form onSubmit={handleVerifyOtp} className="py-6 space-y-4">
            <div className="text-center space-y-1">
              <p className="text-xs text-slate-300 font-mono">
                OTP sent to <span className="text-[#a3e635] font-bold">+91 {phone}</span>
              </p>
              {mode === 'signup' && name && (
                <p className="text-[11px] text-slate-400 font-mono">
                  Welcome to the night owl clan, <strong className="text-white">{name}</strong>!
                </p>
              )}
              <button
                type="button"
                onClick={() => setOtp('123456')}
                className="text-[11px] text-[#a78bfa] hover:underline font-mono block mx-auto pt-1"
              >
                Auto-fill Demo OTP: <strong className="text-white">123456</strong>
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 text-center block">ENTER 6-DIGIT OTP</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full bg-[#111122] border border-white/15 focus:border-[#a3e635] text-center text-xl font-mono font-black text-[#a3e635] placeholder-slate-600 rounded-xl px-4 py-3 tracking-[0.5em] outline-none"
                required
                autoFocus
              />
            </div>

            {error && <p className="text-xs text-rose-400 font-mono text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{mode === 'signup' ? 'COMPLETE SIGNUP & ENTER' : 'VERIFY & ENTER AFTER 9'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep('form')}
              className="w-full text-center text-xs text-slate-400 hover:text-white font-mono"
            >
              ← Edit Details / Number
            </button>
          </form>
        )}

        {/* Footer Guarantee */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
          <span>100% Zero-Blind Open-Box Guaranteed</span>
        </div>

      </div>
    </div>
  );
};
