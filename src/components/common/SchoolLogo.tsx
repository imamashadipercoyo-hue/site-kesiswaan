import React, { useState } from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withGlow?: boolean;
  animateEntry?: boolean;
  withHoverScale?: boolean;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({ 
  className = '', 
  size = 'md',
  withGlow = true,
  animateEntry = true,
  withHoverScale = true
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Responsive size definitions: automatically adjusts smoothly from phone (HP), tablet, to laptop/desktop
  const sizeClasses = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12',
    lg: 'w-11 h-11 sm:w-13 sm:h-13 md:w-16 md:h-16',
    xl: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'
  };

  const logoUrl = 'https://iili.io/njZm6g9.md.png';

  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 select-none will-change-transform ${
        sizeClasses[size]
      } ${
        animateEntry ? 'animate-fadeInDown' : ''
      } ${
        withHoverScale ? 'transition-transform duration-300 ease-out group-hover:scale-105 active:scale-95' : ''
      } ${className}`}
    >
      {/* Dynamic ambient halo glow on hover / active */}
      {withGlow && (
        <div 
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-500/25 via-blue-500/15 to-amber-400/35 opacity-0 group-hover:opacity-100 group-hover:scale-110 blur-xs transition-all duration-300 pointer-events-none"
        />
      )}

      {/* Main Logo Image */}
      {!imageError ? (
        <img
          src={logoUrl}
          alt="Logo Kesiswaan SMK Negeri 1 Jember"
          loading="eager"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(15,23,42,0.12)] group-hover:drop-shadow-[0_6px_16px_rgba(245,158,11,0.38)] transition-all duration-300 ease-out will-change-transform ${
            isLoaded ? 'opacity-100' : 'opacity-0 scale-95'
          }`}
        />
      ) : (
        /* Graceful SVG fallback in case of connection limits */
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm transition-transform duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 5 L88 22 V52 C88 74 50 95 50 95 C50 95 12 74 12 52 V22 L50 5 Z"
            fill="#0f172a"
            stroke="#d97706"
            strokeWidth="3.5"
          />
          <path
            d="M50 11 L82 25 V51 C82 69 50 88 50 88 C50 88 18 69 18 51 V25 L50 11 Z"
            fill="#1e293b"
            stroke="#fbbf24"
            strokeWidth="1.5"
            opacity="0.85"
          />
          <circle cx="50" cy="50" r="19" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />
          <path
            d="M34 56 C40 52 46 54 50 57 C54 54 60 52 66 56 V42 C60 38 54 40 50 43 C46 40 40 38 34 42 Z"
            fill="#ffffff"
            opacity="0.95"
          />
          <path d="M50 28 C47 34 45 37 47 42 C48 44 52 44 53 42 C55 37 53 34 50 28 Z" fill="#f59e0b" />
          <path d="M48 42 H52 V47 H48 Z" fill="#d97706" />
        </svg>
      )}

      {/* Subtle skeleton loader before image finishes loading */}
      {!isLoaded && !imageError && (
        <div 
          aria-hidden="true" 
          className="absolute inset-0 rounded-full bg-slate-200/60 animate-pulse" 
        />
      )}
    </div>
  );
};
