import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, HelpCircle, Phone, MessageSquare, Send, ShieldCheck, ChevronDown } from 'lucide-react';

export const HelpSupportModal = () => {
  const { isHelpModalOpen, setIsHelpModalOpen } = useAuth();
  const [activeTab, setActiveTab] = useState('faq'); // 'faq' | 'chat' | 'hotline'
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hey night owl! 🌙 How can the Pari Chowk nocturnal dispatch team assist you tonight?', time: '2:15 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  if (!isHelpModalOpen) return null;

  const faqs = [
    {
      q: 'How does 100% Zero-Blind Open-Box Delivery work?',
      a: 'When our electric rider arrives, they will politely unseal the package and allow you to inspect items (freshness, temperature, packaging) before you accept or pay. If anything is wrong, reject on the spot.'
    },
    {
      q: 'What are your operational hours in Greater Noida?',
      a: 'We operate strictly between 9:00 PM and 6:00 AM every single night, 365 days a year, covering Knowledge Park 1/2/3, Alpha, Beta, Gamma, Delta, and Techzone 4.'
    },
    {
      q: 'What is the refund policy for returned items?',
      a: 'If you return any item at doorstep, 100% of the product subtotal is instantly reversed to your UPI source within 90 seconds. A nominal ₹29 trip fee covers rider midnight transit.'
    },
    {
      q: 'Are personal care and wellness deliveries discreet?',
      a: 'Yes, 100%. All personal wellness items are packed in opaque, non-transparent sealed security bags with zero branding on contents.'
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      const botResponses = [
        "Our Pari Chowk Hub dispatcher has received your message. A night agent will assist you in under 60 seconds.",
        "Your order is monitored by real-time GPS telemetry. Everything is running on schedule for 10-15m dispatch!",
        "Thanks for reaching out! You can also ping our direct WhatsApp night hotline at +91 99999 88888."
      ];
      const botMsg = {
        sender: 'bot',
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#090a14] border-2 border-[#a3e635]/30 p-6 sm:p-8 shadow-lime-glow-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsHelpModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141424] text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping"></span>
            <span className="text-xs font-mono font-bold text-[#bef264] uppercase">
              24/7 NOCTURNAL SUPPORT (9 PM — 6 AM)
            </span>
          </div>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#a3e635]" />
            Help & Night Support
          </h3>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-2 py-3 border-b border-white/10 text-xs font-mono">
          {[
            { id: 'faq', label: '❓ Instant FAQs' },
            { id: 'chat', label: '💬 Live Chat' },
            { id: 'hotline', label: '📞 Hotline' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`py-2 rounded-xl border transition-all ${
                activeTab === t.id
                  ? 'bg-[#a3e635] text-black font-black border-[#a3e635]'
                  : 'bg-[#101020] text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: FAQS */}
        {activeTab === 'faq' && (
          <div className="py-4 space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0f0f1c] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-slate-200 font-mono gap-2"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#a3e635] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs font-mono text-slate-400 border-t border-white/5 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: LIVE CHAT */}
        {activeTab === 'chat' && (
          <div className="py-3 space-y-3">
            <div className="h-56 overflow-y-auto space-y-2 p-3 rounded-2xl bg-[#0a0a14] border border-white/10 text-xs font-mono">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] ${
                      msg.sender === 'user'
                        ? 'bg-[#a3e635] text-black font-semibold rounded-tr-none'
                        : 'bg-[#18182a] text-slate-200 rounded-tl-none border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9.5px] text-slate-500 mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about orders, dispatch, refunds..."
                className="flex-1 bg-[#111122] border border-white/15 focus:border-[#a3e635] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-4 py-2.5 outline-none"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#a3e635] hover:bg-[#bef264] text-black rounded-xl"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: HOTLINE */}
        {activeTab === 'hotline' && (
          <div className="py-6 space-y-4 text-center font-mono">
            <div className="p-5 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase font-display">WhatsApp Night Hotline</h4>
                <p className="text-xs text-[#bef264] mt-1">+91 99999 AFTER9 (9 PM — 6 AM)</p>
              </div>
              <a
                href="https://wa.me/919999923837?text=Hi%20AFTER9%20Support,%20I%20need%20help%20with%20my%20order"
                target="_blank"
                rel="noreferrer"
                className="btn-primary py-2.5 px-6 rounded-xl text-xs uppercase font-black inline-block"
              >
                Open WhatsApp Chat →
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f0f1c] border border-white/10 space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                <Phone className="w-4 h-4 text-[#a3e635]" />
                <span>Pari Chowk Dispatch Hotline: <strong>0120-AFTER-99</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" /> Instant Human Escalation
          </span>
          <span className="text-[#a3e635]">GREATER NOIDA</span>
        </div>

      </div>
    </div>
  );
};
