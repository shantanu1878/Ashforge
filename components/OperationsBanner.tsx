import React, { useState, useEffect } from 'react';
import AshforgeLogo from './AshforgeLogo';

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
        <div className="relative w-full max-w-7xl mx-auto mb-24 font-sans select-none">
            {/* Main Container Frame */}
            <div className="relative group perspective-1000">
                {/* Glow Effects */}
                {/* Card Background */}
                <div className="relative bg-transparent min-h-[350px] flex flex-col md:flex-row items-center px-4 md:px-0">

                    {/* Main Tech Frame Border (SVG for complex shape) */}
                    <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(255,51,51,0.5)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* Outer Glow Path */}
                            <path d="M 5,20 L 5,80 L 20,95 L 80,95 L 95,80 L 95,20 L 80,5 L 20,5 Z"
                                fill="none"
                                stroke="#ff3333"
                                strokeWidth="0.5"
                                vectorEffect="non-scaling-stroke"
                                className="opacity-100" />
                        </svg>

                        {/* Corner Accents - Static Glow */}
                        {/* Top Left */}
                        <div className="absolute top-0 left-[15%] w-[10%] h-[2px] bg-[#ff3333] shadow-[0_0_10px_#ff3333]" />
                        <div className="absolute top-[15%] left-0 w-[2px] h-[15%] bg-[#ff3333] shadow-[0_0_10px_#ff3333]" />
                        <div className="absolute top-0 left-0 w-[15%] h-[2px] bg-gradient-to-r from-transparent to-[#ff3333] opacity-50" />

                        {/* Top Right */}
                        <div className="absolute top-0 right-[15%] w-[10%] h-[2px] bg-[#ff3333] shadow-[0_0_10px_#ff3333]" />
                        <div className="absolute top-[15%] right-0 w-[2px] h-[15%] bg-[#ff3333] shadow-[0_0_10px_#ff3333]" />

                        {/* Bottom Left */}
                        <div className="absolute bottom-0 left-[15%] w-[10%] h-[2px] bg-[#ff3333] shadow-[0_0_10px_#ff3333]" />
                        <div className="absolute bottom-[15%] left-0 w-[2px] h-[15%] bg-[#ff3333] shadow-[0_0_10px_#ff3333]" />

                        {/* Bottom Right */}
                        <div className="absolute bottom-0 right-[15%] w-[10%] h-[2px] bg-[#ff3333] shadow-[0_0_10px_#ff3333]" />
                        <div className="absolute bottom-[15%] right-0 w-[2px] h-[15%] bg-[#ff3333] shadow-[0_0_10px_#ff3333]" />

                        {/* Connector Diagonal Lines at corners */}
                        <div className="absolute top-[4px] left-[4px] w-8 h-[2px] bg-[#ff3333] rotate-45 origin-top-left opacity-80" />
                        <div className="absolute top-[4px] right-[4px] w-8 h-[2px] bg-[#ff3333] -rotate-45 origin-top-right opacity-80" />
                        <div className="absolute bottom-[4px] left-[4px] w-8 h-[2px] bg-[#ff3333] -rotate-45 origin-bottom-left opacity-80" />
                        <div className="absolute bottom-[4px] right-[4px] w-8 h-[2px] bg-[#ff3333] rotate-45 origin-bottom-right opacity-80" />

                    </div>


                    {/* Left Content Section */}
                    <div className="relative z-20 flex-1 p-8 md:p-12 flex flex-col justify-center space-y-6">

                        {/* Header Logo */}
                        <div className="flex items-center gap-3">
                            {/* Stylized Logo Icon (Simulated or use Component) */}
                            <div className="relative w-8 h-8">
                                <AshforgeLogo className="w-full h-full text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-white tracking-widest leading-none">ASHFORGE</span>
                                <span className="text-[9px] text-[#ff3333] tracking-[0.4em] font-bold uppercase mt-1">Performance Engineered</span>
                            </div>
                        </div>

                        {/* Main Typography */}
                        <div className="space-y-1">
                            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-[#ff3333] drop-shadow-[0_0_15px_rgba(255,51,51,0.4)]">
                                FLASH SALE: -30%
                            </h2>
                            <h3 className="text-2xl md:text-3xl font-black italic tracking-tight text-white/90">
                                ALL BASE LAYERS
                            </h3>
                        </div>

                        {/* Timer Box */}
                        <div className="relative max-w-sm border border-[#ff3333]/30 bg-[#ff3333]/5 p-3 rounded skew-x-[-12deg] backdrop-blur-sm">
                            <div className="flex items-center gap-4 text-[#ff3333] font-mono tracking-widest skew-x-[12deg]">
                                <span className="text-sm">ENDS IN:</span>
                                <span className="text-2xl md:text-3xl font-bold tabular-nums drop-shadow-[0_0_8px_rgba(255,51,51,0.6)]">
                                    {formatTime(timeLeft)}
                                </span>
                            </div>

                            {/* Decorative Tech Arrows on Timer */}
                            <div className="absolute top-1/2 -right-4 w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-[#ff3333] border-b-[6px] border-b-transparent transform -translate-y-1/2" />
                        </div>

                        {/* CTA Button */}
                        <div className="pt-2">
                            <button className="group relative px-10 py-3 bg-transparent border border-[#ff3333] text-white font-bold tracking-widest text-base uppercase overflow-hidden transition-all hover:bg-[#ff3333]/10 hover:shadow-[0_0_30px_rgba(255,51,51,0.4)]">
                                <span className="relative z-10">Shop Now</span>
                                {/* Hover Fill Effect */}
                                <div className="absolute inset-0 bg-[#ff3333] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0 opacity-10" />
                                {/* Corner Decorations */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white" />
                            </button>
                        </div>
                    </div>

                    {/* Right Image Section */}
                    <div className="relative z-20 flex-1 h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-visible">

                        {/* Background Glow behind Mannequin */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-[#ff3333]/20 to-transparent blur-3xl opacity-60" />

                        {/* Mannequin Image - Pop Out Effect */}
                        <div className="relative w-full h-[300%] flex items-end justify-center -mb-8">
                            <img
                                src="/mannequin-new.png"
                                alt="Base Layer Performance Gear"
                                className="relative z-30 w-auto h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter contrast-125 saturate-[1.1] transition-all duration-700 hover:scale-105"
                            />
                        </div>

                        {/* Side Tech Graphics */}
                        <div className="absolute right-0 top-0 h-full w-32 border-l border-white/5 bg-gradient-to-r from-transparent to-black/40 z-0 pointer-events-none" />
                    </div>
                </div>

                {/* Bottom Red Glow Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff3333] shadow-[0_0_20px_#ff3333] z-30" />
            </div>
        </div>
    );
};

export default OperationsBanner;
