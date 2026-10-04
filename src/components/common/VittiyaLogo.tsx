import React from 'react';

interface VittiyaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  onClick?: () => void;
}

export const VittiyaLogo: React.FC<VittiyaLogoProps> = ({ className = '', size = 38, showText = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3.5 cursor-pointer group ${className}`}
      title="Click to return to Master Executive Dashboard"
    >
      {/* Geometric Owl Emblem Vector */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-[#00D09C] rounded-2xl blur-xs opacity-15 group-hover:opacity-35 transition duration-300"></div>
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative shrink-0 transition-transform duration-300 group-hover:scale-105"
        >
          <rect width="100" height="100" rx="24" fill="#0B1120" stroke="rgba(0, 245, 176, 0.45)" strokeWidth="2.5" />
          
          <g stroke="url(#vittiya-luxury-gradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            {/* Left Eye Frame */}
            <path d="M 22 34 L 48 34 L 35 56 Z" />
            {/* Right Eye Frame */}
            <path d="M 52 34 L 78 34 L 65 56 Z" />
            
            {/* Beak / V-Shape Bottom */}
            <path d="M 38 56 L 50 74 L 62 56" />

            {/* Left Pupil Circle */}
            <circle cx="35" cy="42" r="4.5" fill="#00F5B0" stroke="none" />

            {/* Right Pupil Circle */}
            <circle cx="65" cy="42" r="4.5" fill="#00F5B0" stroke="none" />
          </g>

          <defs>
            <linearGradient id="vittiya-luxury-gradient" x1="20" y1="30" x2="80" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00F5B0" />
              <stop offset="0.5" stopColor="#38BDF8" />
              <stop offset="1" stopColor="#818CF8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tight metallic-text font-sans leading-none">
            VITTIYA
          </span>
          <span className="text-[9px] uppercase font-extrabold tracking-widest text-[#00F5B0] font-mono mt-1 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5B0] pulse-glow"></span>
            <span>Economic Intelligence OS</span>
          </span>
        </div>
      )}
    </div>
  );
};
