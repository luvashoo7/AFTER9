import React, { useMemo } from 'react';

export const NightSkyBackground = () => {
  // Generate random stars once
  const stars = useMemo(() => {
    const starList = [];
    for (let i = 0; i < 90; i++) {
      starList.push({
        id: i,
        top: `${(Math.random() * 100).toFixed(2)}%`,
        left: `${(Math.random() * 100).toFixed(2)}%`,
        size: Math.random() > 0.8 ? (Math.random() * 2 + 1.5).toFixed(1) : (Math.random() * 1.5 + 0.8).toFixed(1),
        duration: (Math.random() * 3 + 2).toFixed(1),
        delay: (Math.random() * 4).toFixed(1),
        opacity: (Math.random() * 0.5 + 0.3).toFixed(2),
        color: Math.random() > 0.7 ? '#e2e8f0' : Math.random() > 0.4 ? '#a78bfa' : '#bef264',
      });
    }
    return starList;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep night gradient background with soft nebula highlights */}
      <div className="absolute inset-0 bg-[#06060a]"></div>
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-950/20 rounded-full blur-[140px]"></div>
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-950/15 rounded-full blur-[130px]"></div>
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-emerald-950/10 rounded-full blur-[150px]"></div>

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-twinkle absolute rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${parseFloat(star.size) * 2}px ${star.color}`,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Subtle Shooting Stars */}
      <div className="shooting-star shooting-star-1"></div>
      <div className="shooting-star shooting-star-2"></div>
      <div className="shooting-star shooting-star-3"></div>
    </div>
  );
};
