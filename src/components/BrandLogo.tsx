import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light' | 'auto';
  variant?: 'gold-dark' | 'gold-light' | 'emerald' | 'default';
  showText?: boolean;
  className?: string;
  logoSrc?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  theme = 'light',
  variant = 'gold-dark',
  showText = true,
  className = '',
  logoSrc = '/logo.jpeg',
}) => {
  const [imgSrc, setImgSrc] = useState(logoSrc);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-16 h-16',
  };

  const handleImgError = () => {
    if (imgSrc === '/logo.jpeg') {
      setImgSrc('/logo.png');
    } else if (imgSrc === '/logo.png') {
      setImgSrc('/logo.jpg');
    } else {
      setImageError(true);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* If custom logo is provided and hasn't errored, display it */}
      {!imageError ? (
        <div className={`${sizeClasses[size]} relative shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-[#1E1916] border border-[#D4AF37]/30 shadow-xs`}>
          <img
            src={imgSrc}
            alt="Logo Maroc Glow"
            onError={handleImgError}
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        /* Emblem Vector Monogram fallback if logo.png is not loaded */
        <div
          className={`${sizeClasses[size]} relative rounded-full flex items-center justify-center p-1.5 shadow-xs border ${
            isDark
              ? 'bg-[#221D1A] border-[#D4AF37]/40 text-[#D4AF37]'
              : 'bg-[#171513] border-[#C5A059]/30 text-[#D4AF37]'
          }`}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Moroccan 8-pointed star crest at top */}
            <path
              d="M50 8 L54 16 L62 16 L56 22 L58 30 L50 25 L42 30 L44 22 L38 16 L46 16 Z"
              fill="url(#goldGradient)"
              opacity="0.95"
            />
            {/* Emerald accent in center of star */}
            <circle cx="50" cy="19" r="2.5" fill="#1E4D3B" stroke="#D4AF37" strokeWidth="0.75" />

            {/* Golden Outer Ring with break */}
            <circle
              cx="50"
              cy="52"
              r="38"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeDasharray="210 30"
              strokeDashoffset="15"
            />

            {/* Stylized M Monogram */}
            <path
              d="M32 72 V38 L43 57 L54 38 V72"
              stroke="url(#goldGradient)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Stylized G Monogram overlapping */}
            <path
              d="M68 45 C64 39 56 39 52 44 C47 50 47 62 53 67 C59 72 68 70 70 63 V54 H59"
              stroke="url(#goldGradient)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Botanical Olive / Argan Leaves on left branch */}
            <path
              d="M26 62 C21 58 19 50 22 44 C26 48 27 56 26 62 Z"
              fill="#2D5A43"
              stroke="url(#goldGradient)"
              strokeWidth="0.8"
            />
            <path
              d="M28 50 C24 45 24 37 28 32 C31 36 31 44 28 50 Z"
              fill="#3B6E54"
              stroke="url(#goldGradient)"
              strokeWidth="0.8"
            />
            <path
              d="M32 40 C30 35 32 29 36 26 C38 30 37 36 32 40 Z"
              fill="#4D8467"
              stroke="url(#goldGradient)"
              strokeWidth="0.8"
            />

            {/* Small leaf inside G */}
            <path
              d="M62 53 C59 49 59 43 63 39 C65 43 65 49 62 53 Z"
              fill="#2D5A43"
              stroke="url(#goldGradient)"
              strokeWidth="0.7"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D77F" />
                <stop offset="45%" stopColor="#D4AF37" />
                <stop offset="85%" stopColor="#AA7C11" />
                <stop offset="100%" stopColor="#F3E5AB" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Brand Text if requested */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif text-lg md:text-xl font-bold tracking-[0.16em] transition-colors ${
                isDark
                  ? 'text-[#FAF7F2] group-hover:text-[#D4AF37]'
                  : 'text-[#231B15] group-hover:text-[#B8683C]'
              }`}
            >
              MAROC GLOW
            </span>
          </div>
          <span
            className={`text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase ${
              isDark ? 'text-[#D4AF37]' : 'text-[#B8683C]'
            }`}
          >
            Grossiste • Vente en Gros
          </span>
        </div>
      )}
    </div>
  );
};
