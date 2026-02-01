
import React from 'react';

interface AshforgeLogoProps {
  className?: string;
}

const AshforgeLogo: React.FC<AshforgeLogoProps> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Glow Layer */}
      <div className="absolute inset-0 bg-[#ff3333] blur-2xl opacity-20 animate-logo-glow" />

      {/* The Actual Logo Image */}
      <img
        src="/ashforge-logo-final.png"
        alt="Ashforge Logo"
        className="relative w-full h-full object-contain animate-industrial-pulse filter drop-shadow-[0_0_8px_rgba(255,51,51,0.5)]"
        onError={(e) => {
          // Robust fallback if image path is disrupted
          (e.target as HTMLImageElement).style.display = 'none';
          (e.target as HTMLImageElement).parentElement?.classList.add('fallback-svg');
        }}
      />

      <style>{`
        @keyframes industrial-pulse {
          0%, 100% { 
            transform: scale(1);
            filter: brightness(1) drop-shadow(0 0 5px rgba(255, 51, 51, 0.4));
          }
          50% { 
            transform: scale(1.05);
            filter: brightness(1.2) drop-shadow(0 0 15px rgba(255, 51, 51, 0.8));
          }
        }

        @keyframes logo-glow {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.3; transform: scale(1.2); }
        }

        .animate-industrial-pulse {
          animation: industrial-pulse 4s ease-in-out infinite;
        }

        .animate-logo-glow {
          animation: logo-glow 6s ease-in-out infinite;
        }

        /* Fallback for preview environments where local image paths might be stripped */
        .fallback-svg::after {
          content: 'A';
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          color: white;
          font-size: 2rem;
          filter: drop-shadow(0 0 10px #ff3333);
        }
      `}</style>
    </div>
  );
};

export default AshforgeLogo;
