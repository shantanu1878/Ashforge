import React, { useState, useEffect } from 'react';

const OperationsBanner: React.FC = () => {
    // Timer logic: Fixed countdown for demo purposes, resetting every 24h
    const [timeLeft, setTimeLeft] = useState(4 * 60 * 60 + 12 * 60 + 55); // 04:12:55

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 24 * 60 * 60));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto mb-12 md:mb-24 font-sans select-none px-4 md:px-0">
            {/* Main Container Frame */}
            <div className="relative group w-full h-[38vh] max-h-[260px] min-h-[200px] md:h-auto md:max-h-none md:min-h-[350px] bg-transparent flex items-center overflow-hidden md:overflow-visible">

                {/* Main Tech Frame Border (SVG for complex shape) */}
                <div className="absolute inset-1.5 md:inset-0 pointer-events-none">
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

                {/* Left Content Section */}
                <div className="relative z-20 w-full md:w-1/2 p-4 md:p-12 flex flex-col items-center md:items-start justify-center gap-2 md:gap-6 mt-1 md:mt-0">

                    {/* Main Typography */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-0.5 md:gap-1 w-full max-w-[85%] md:max-w-none">
                        <h2 className="text-[clamp(1.4rem,6vw,3rem)] md:text-5xl font-black italic tracking-tighter text-[#ff3333] drop-shadow-[0_0_8px_rgba(255,51,51,0.4)] leading-none">
                            FLASH SALE: -30%
                        </h2>
                        <h3 className="text-[clamp(0.95rem,4vw,1.875rem)] md:text-3xl font-black italic tracking-tight text-white/90 leading-tight">
                            ALL BASE LAYERS
                        </h3>
                    </div>

                    {/* Timer Box */}
                    <div className="relative w-max max-w-[160px] md:max-w-sm p-1.5 md:p-3 mx-auto md:mx-0 mt-1">
                        {/* Glass Background Layer */}
                        <div className="absolute inset-0 border border-[#ff3333]/80 md:border-[#ff3333]/30 bg-[#ff3333]/30 md:bg-[#ff3333]/5 rounded skew-x-[-12deg] backdrop-blur-md shadow-[0_0_20px_rgba(255,51,51,0.3)] pointer-events-none" />

                        {/* Crisp Text Layer */}
                        <div className="relative z-10 flex items-center justify-between gap-1.5 px-2 md:px-4 text-[#ff3333] font-mono tracking-widest skew-x-[12deg] drop-shadow-[0_0_8px_rgba(255,51,51,1)]">
                            <span className="text-[8px] md:text-sm whitespace-nowrap text-white font-bold opacity-90">ENDS IN:</span>
                            <span className="text-[11px] md:text-3xl font-black tabular-nums text-white">
                                {formatTime(timeLeft)}
                            </span>
                        </div>

                        {/* Side caret accent */}
                        <div className="absolute top-1/2 -right-2 md:-right-4 w-0 h-0 border-t-[3px] md:border-t-[6px] border-t-transparent border-l-[4px] md:border-l-[10px] border-l-[#ff3333] border-b-[3px] md:border-b-[6px] border-b-transparent transform -translate-y-1/2" />
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2 md:pt-4 flex justify-center md:justify-start w-full">
                        <button className="group relative px-6 md:px-10 py-2.5 md:py-3 bg-transparent border border-[#ff3333] text-white font-bold tracking-widest text-[10px] md:text-base uppercase transition-all hover:bg-[#ff3333]/10 hover:shadow-[0_0_20px_rgba(255,51,51,0.4)]">
                            <span className="relative z-10 block w-max">SHOP NOW</span>
                            <div className="absolute inset-0 bg-[#ff3333] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0 opacity-10" />
                            <div className="absolute top-0 left-0 w-1 md:w-2 h-1 md:h-2 border-l border-t border-white" />
                            <div className="absolute bottom-0 right-0 w-1 md:w-2 h-1 md:h-2 border-r border-b border-white" />
                        </button>
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="hidden md:flex relative flex-1 h-full w-1/2 items-center justify-center z-20 pointer-events-none overflow-visible mix-blend-normal">

                    {/* Background Glow behind Mannequin */}
                    <div className="absolute top-1/2 md:left-1/2 right-4 md:right-auto md:-translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-[#ff3333]/50 to-transparent blur-2xl md:blur-3xl opacity-80 pointer-events-none" />

                    {/* Shadow Plate for separation */}
                    <div className="absolute bottom-2 right-6 w-[70%] h-[60%] bg-black/60 blur-xl rounded-full z-20 pointer-events-none md:hidden" />

                    {/* Mannequin Image */}
                    <img
                        src="/mannequin-new.png"
                        alt="Base Layer Performance Gear"
                        loading="eager"
                        className="relative z-30 w-[110%] h-auto max-h-[145%] object-contain object-bottom md:w-auto md:h-[160%] lg:h-[300%] md:max-h-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] filter contrast-125 saturate-[1.1] transition-all duration-700 md:hover:scale-105 pointer-events-auto origin-bottom"
                    />

                    {/* Side Tech Graphics */}
                    <div className="absolute right-0 top-0 h-full w-16 md:w-32 border-l border-white/5 bg-gradient-to-r from-transparent to-black/40 z-0 pointer-events-none hidden md:block" />
                </div>

                {/* Bottom Red Glow Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] md:h-[2px] bg-[#ff3333] shadow-[0_0_10px_#ff3333] md:shadow-[0_0_20px_#ff3333] z-30" />
            </div>
        </div>
    );
};

export default OperationsBanner;
