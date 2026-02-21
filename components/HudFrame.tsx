import React, { ReactNode } from 'react';

interface HudFrameProps {
    children: ReactNode;
    className?: string; // Optional extra classes for the inner flex container
}

/**
 * Shared tech-HUD frame wrapper for the Two-Banner Switcher system.
 * Enforces strict min-heights to prevent layout shift between states.
 */
const HudFrame: React.FC<HudFrameProps> = ({ children, className = '' }) => {
    return (
        <div className="relative w-full max-w-7xl mx-auto mb-12 md:mb-24 font-sans select-none px-4 md:px-0">
            {/* Main Container Frame with enforced min-heights */}
            <div className={`relative group w-full h-[38vh] max-h-[260px] min-h-[200px] md:h-[350px] md:min-h-[350px] md:max-h-[350px] bg-transparent flex items-center overflow-hidden md:overflow-visible ${className}`}>

                {/* Main Tech Frame Border (SVG for complex shape) */}
                <div className="absolute inset-1.5 md:inset-0 pointer-events-none z-10">
                    <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(255,51,51,0.2)] md:drop-shadow-[0_0_15px_rgba(255,51,51,0.5)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 5,20 L 5,80 L 20,95 L 80,95 L 95,80 L 95,20 L 80,5 L 20,5 Z"
                            fill="none"
                            stroke="#ff3333"
                            strokeWidth="0.5"
                            vectorEffect="non-scaling-stroke"
                            className="opacity-100" />
                    </svg>

                    {/* Corner Accents */}
                    <style>{`
                        @keyframes corner-flash {
                            0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 2px #ff3333); }
                            50% { opacity: 1; filter: drop-shadow(0 0 8px #ff3333); }
                        }
                    `}</style>
                    <div className="absolute top-0 left-[15%] w-[10%] h-[2px] bg-[#ff3333] shadow-[0_0_8px_#ff3333] animate-[corner-flash_3s_ease-in-out_infinite]" />
                    <div className="absolute top-[15%] left-0 w-[2px] h-[15%] bg-[#ff3333] shadow-[0_0_8px_#ff3333] animate-[corner-flash_3s_ease-in-out_infinite_0.5s]" />
                    <div className="absolute top-0 left-0 w-[15%] h-[2px] bg-gradient-to-r from-transparent to-[#ff3333] opacity-50" />

                    <div className="absolute top-0 right-[15%] w-[10%] h-[2px] bg-[#ff3333] shadow-[0_0_8px_#ff3333] animate-[corner-flash_3s_ease-in-out_infinite_1s]" />
                    <div className="absolute top-[15%] right-0 w-[2px] h-[15%] bg-[#ff3333] shadow-[0_0_8px_#ff3333] animate-[corner-flash_3s_ease-in-out_infinite_1.5s]" />

                    <div className="absolute bottom-0 left-[15%] w-[10%] h-[2px] bg-[#ff3333] shadow-[0_0_8px_#ff3333] animate-[corner-flash_3s_ease-in-out_infinite_2s]" />
                    <div className="absolute bottom-[15%] left-0 w-[2px] h-[15%] bg-[#ff3333] shadow-[0_0_8px_#ff3333] animate-[corner-flash_3s_ease-in-out_infinite_2.5s]" />

                    <div className="absolute bottom-0 right-[15%] w-[10%] h-[2px] bg-[#ff3333] shadow-[0_0_8px_#ff3333] animate-[corner-flash_3s_ease-in-out_infinite_1s]" />
                    <div className="absolute bottom-[15%] right-0 w-[2px] h-[15%] bg-[#ff3333] shadow-[0_0_8px_#ff3333] animate-[corner-flash_3s_ease-in-out_infinite_0.5s]" />

                    <div className="absolute top-[3px] left-[3px] md:top-[4px] md:left-[4px] w-4 md:w-8 h-[2px] bg-[#ff3333] rotate-45 origin-top-left opacity-80" />
                    <div className="absolute top-[3px] right-[3px] md:top-[4px] md:right-[4px] w-4 md:w-8 h-[2px] bg-[#ff3333] -rotate-45 origin-top-right opacity-80" />
                    <div className="absolute bottom-[3px] left-[3px] md:bottom-[4px] md:left-[4px] w-4 md:w-8 h-[2px] bg-[#ff3333] -rotate-45 origin-bottom-left opacity-80" />
                    <div className="absolute bottom-[3px] right-[3px] md:bottom-[4px] md:right-[4px] w-4 md:w-8 h-[2px] bg-[#ff3333] rotate-45 origin-bottom-right opacity-80" />
                </div>

                {/* Bottom Red Glow Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] md:h-[2px] bg-[#ff3333] shadow-[0_0_10px_#ff3333] md:shadow-[0_0_20px_#ff3333] z-30 pointer-events-none" />

                {/* Content Render Bound */}
                {children}
            </div>
        </div>
    );
};

export default HudFrame;
