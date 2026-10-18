import React from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      {/* Emblem SVG Badge */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield background */}
        <path
          d="M50 5 L88 22 V52 C88 74 50 95 50 95 C50 95 12 74 12 52 V22 L50 5 Z"
          fill="#0f172a"
          stroke="#d97706"
          strokeWidth="3.5"
        />
        {/* Inner gold border */}
        <path
          d="M50 11 L82 25 V51 C82 69 50 88 50 88 C50 88 18 69 18 51 V25 L50 11 Z"
          fill="#1e293b"
          stroke="#fbbf24"
          strokeWidth="1.5"
          opacity="0.85"
        />
        {/* Gear / Industrial education symbol */}
        <circle cx="50" cy="50" r="19" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />
        
        {/* Open book of knowledge */}
        <path
          d="M34 56 C40 52 46 54 50 57 C54 54 60 52 66 56 V42 C60 38 54 40 50 43 C46 40 40 38 34 42 Z"
          fill="#ffffff"
          opacity="0.95"
        />
        {/* Center Torch flame */}
        <path
          d="M50 28 C47 34 45 37 47 42 C48 44 52 44 53 42 C55 37 53 34 50 28 Z"
          fill="#f59e0b"
        />
        <path
          d="M50 33 C49 36 48 38 49 41 C50 42 51 42 51.5 41 C52.5 38 51.5 36 50 33 Z"
          fill="#fef08a"
        />
        
        {/* Torch handle */}
        <path d="M48 42 H52 V47 H48 Z" fill="#d97706" />

        {/* 5 Stars at the bottom arch */}
        <circle cx="34" cy="74" r="2" fill="#fbbf24" />
        <circle cx="42" cy="78" r="2.2" fill="#fbbf24" />
        <circle cx="50" cy="80" r="2.5" fill="#f59e0b" />
        <circle cx="58" cy="78" r="2.2" fill="#fbbf24" />
        <circle cx="66" cy="74" r="2" fill="#fbbf24" />
      </svg>
    </div>
  );
};
