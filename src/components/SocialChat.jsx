import React from 'react';
import { MessageSquare, Flame, Sparkles, Send, Heart, Laugh } from 'lucide-react';

export const SocialChat = () => {
  const chatMessages = [
    {
      sender: 'Aman (KP-3)',
      time: '02:04 AM',
      avatar: '🧑‍💻',
      text: 'bro we\'re out of chips and cold drinks 💀 who forgot to stock up??',
      side: 'left',
      reaction: '💀 4'
    },
    {
      sender: 'Riya (Alpha 1)',
      time: '02:05 AM',
      avatar: '🎨',
      text: 'who finished all the Red Bulls?? I have an exam presentation in 6 hours 😭',
      side: 'left',
      reaction: '😭 3'
    },
    {
      sender: 'Kabir (Hostel 4)',
      time: '02:06 AM',
      avatar: '⚡',
      text: 'need ice cubes + tonic + Maggi packets RIGHT NOW... every store is closed bro',
      side: 'left',
      reaction: '👀 2'
    },
    {
      sender: 'Tanmay (Gaur City)',
      time: '02:07 AM',
      avatar: '👑',
      text: 'Chill everyone. Just AFTER 9 IT. 🛵⚡ Doorstep open-box in 12 mins.',
      side: 'right',
      isHero: true,
      reaction: '🔥 8'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#07070b] via-[#0d0d16] to-[#07070b]">
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#a855f7]/08 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#171728] border border-white/10 text-[#ccff00] px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5" /> 2:07 AM REAL GROUP BANTER
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white uppercase leading-[0.95]">
            THE NIGHT HAS A <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#c084fc] to-[#38bdf8]">
              GROUP CHAT.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Every late-night plan hits a wall. That's when you call in the night commerce cavalry.
          </p>
        </div>

        {/* Group Chat Mockup Box */}
        <div className="max-w-2xl mx-auto rounded-3xl bg-[#0e0e1a] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-5 backdrop-blur-xl">
          
          {/* Chat Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ccff00] to-[#a855f7] flex items-center justify-center text-lg">
                🌙
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-sm">
                  The 2 AM Crisis Council 💬
                </h3>
                <p className="text-[10px] font-mono text-emerald-400">
                  ● 7 members online • Greater Noida Hub
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2.5 py-1 rounded-full">
              End-to-End Despair
            </span>
          </div>

          {/* Chat Bubbles */}
          <div className="space-y-4 py-2">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.side === 'right' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 text-[11px] font-mono text-slate-400">
                  <span>{msg.avatar}</span>
                  <span className="font-bold text-slate-300">{msg.sender}</span>
                  <span className="text-slate-500 text-[9px]">{msg.time}</span>
                </div>

                <div
                  className={`p-3.5 sm:p-4 rounded-2xl max-w-sm sm:max-w-md text-xs sm:text-sm font-medium relative group shadow-md ${
                    msg.isHero
                      ? 'bg-gradient-to-r from-[#ccff00] to-[#d9ff33] text-[#07070b] font-extrabold rounded-tr-none shadow-lime-glow'
                      : 'bg-[#18182b] text-slate-200 border border-white/5 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {/* Floating Reaction Pill */}
                  <span className="absolute -bottom-2.5 right-2 bg-[#0a0a14] border border-white/15 text-[10px] px-2 py-0.5 rounded-full shadow">
                    {msg.reaction}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* The Punchline Banner */}
          <div className="pt-6 border-t border-white/10 text-center space-y-3">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              DON'T PANIC AT 2 AM.
            </p>
            <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              “<span className="text-[#ccff00]">AFTER 9</span> IT.”
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
