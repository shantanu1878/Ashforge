import React from 'react';
import { useNavigate } from 'react-router-dom';
import HudFrame from './HudFrame';
import AshforgeMark from './AshforgeMark';

const HeroOverview: React.FC = () => {
    const navigate = useNavigate();

    return (
        <HudFrame>
            {/* Left Content Section */}
            <div className="relative z-20 w-full md:w-1/2 p-6 md:p-12 flex flex-col items-center md:items-start justify-center gap-4 mt-1 md:mt-0 pb-16 md:pb-12">

                {/* Main Typography */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 w-full max-w-[90%] md:max-w-none">
                    <h2 className="text-[clamp(1.5rem,5vw,3rem)] md:text-6xl font-black italic tracking-tighter text-[#ff3333] drop-shadow-[0_0_8px_rgba(255,51,51,0.4)] leading-none uppercase">
                        RESILIENCE ENGINEERED
                    </h2>
                    <h3 className="text-[clamp(0.9rem,3vw,1.25rem)] md:text-xl font-medium tracking-wide text-zinc-300 leading-snug">
                        Built for Daily Performance. Designed for Presence.
                    </h3>
                </div>

                {/* CTA Button */}
                <div className="pt-2 md:pt-4 flex justify-center md:justify-start w-full">
                    <button
                        onClick={() => navigate('/collection')}
                        className="group relative px-6 md:px-10 py-2.5 md:py-3 bg-transparent border border-[#ff3333] text-white font-bold tracking-widest text-[10px] md:text-base uppercase transition-all hover:bg-[#ff3333]/10 hover:shadow-[0_0_20px_rgba(255,51,51,0.4)] focus:outline-none focus:ring-2 focus:ring-[#ff3333]"
                    >
                        <span className="relative z-10 block w-max">VIEW COLLECTION</span>
                        <div className="absolute inset-0 bg-[#ff3333] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0 opacity-10" />
                        <div className="absolute top-0 left-0 w-1 md:w-2 h-1 md:h-2 border-l border-t border-white" />
                        <div className="absolute bottom-0 right-0 w-1 md:w-2 h-1 md:h-2 border-r border-b border-white" />
                    </button>
                </div>
            </div>

            {/* Right Image Section (Emblem) */}
            <div className="absolute md:relative inset-0 md:inset-auto opacity-15 md:opacity-100 flex-1 h-full w-full md:w-1/2 flex items-center justify-center z-0 md:z-20 pointer-events-none overflow-hidden mix-blend-normal">
                {/* Background Glow behind Emblem */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-[#ff3333]/30 to-transparent blur-3xl opacity-80 pointer-events-none" />

                {/* Ashforge Emblem */}
                <AshforgeMark className="relative z-30 w-[60%] md:w-[45%] h-auto text-white drop-shadow-[0_0_30px_rgba(255,51,51,0.6)] transition-transform duration-700 md:hover:scale-105 pointer-events-auto origin-center opacity-90" />

                {/* Side Tech Graphics */}
                <div className="absolute right-0 top-0 h-full w-16 md:w-32 border-l border-white/5 bg-gradient-to-r from-transparent to-black/40 z-0 pointer-events-none hidden md:block" />
            </div>
        </HudFrame>
    );
};

export default HeroOverview;
