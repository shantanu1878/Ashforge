import React, { useState, useEffect } from 'react';
import AshforgeLogo from './AshforgeLogo';

const OperationsBanner: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(36 * 60 + 59); // 36 min 59 sec
    const [activeSlide, setActiveSlide] = useState(0);

    // Countdown timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 24 * 60 * 60)); // Reset to 24h if 0 for demo
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Carousel rotation logic
    useEffect(() => {
        const rotation = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % 2);
        }, 5000);
        return () => clearInterval(rotation);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m} min and ${s.toString().padStart(2, '0')} seconds remaining`;
    };

    const slides = [
        {
            title: "FLASH SALE: -30%",
            subtitle: "ALL BASE LAYERS",
            color: "text-[#ff3333]",
            glow: "shadow-[0_0_30px_rgba(255,51,51,0.3)]"
        },
        {
            title: "SECTOR UPDATE",
            subtitle: "NEW SHIPMENT ARRIVED",
            color: "text-white",
            glow: "shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        }
    ];

    return (
        <div className="relative w-full max-w-7xl mx-auto mb-32 font-sans uppercase tracking-wider">
            {/* Container Frame */}
            <div className="relative border border-white/10 bg-black/40 backdrop-blur-sm p-1 rounded-lg overflow-hidden group">

                {/* Animated Glow Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff3333]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse pointer-events-none" />

                {/* Inner Content Area */}
                <div className={`relative border border-white/5 bg-black/80 p-16 md:p-24 flex flex-col items-center justify-center min-h-[500px] ${slides[activeSlide].glow} transition-shadow duration-1000`}>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-16 border-l-2 border-t-2 border-[#ff3333] rounded-tl-sm" />
                    <div className="absolute top-0 right-0 w-4 h-16 border-r-2 border-t-2 border-white/20 rounded-tr-sm" />
                    <div className="absolute bottom-0 left-0 w-4 h-16 border-l-2 border-b-2 border-white/20 rounded-bl-sm" />
                    <div className="absolute bottom-0 right-0 w-4 h-16 border-r-2 border-b-2 border-white/20 rounded-br-sm" />

                    {/* Top Bar Label */}
                    <div className="absolute top-6 w-full flex justify-between px-8 text-[10px] items-center text-zinc-500 font-bold tracking-[0.2em]">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#ff3333] rounded-full animate-ping" />
                            CURRENT OPERATIONS
                        </span>
                        <div className="flex gap-2">
                            <AshforgeLogo className="w-4 h-4 text-zinc-600" />
                        </div>
                    </div>

                    {/* Main Content Carousel */}
                    <div className="relative z-10 text-center space-y-6 transition-all duration-700 transform">
                        <div className={`text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter transition-all duration-700 ${slides[activeSlide].color} drop-shadow-2xl`}>
                            {slides[activeSlide].title}
                        </div>
                        <div className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 transition-all duration-700 delay-100`}>
                            {slides[activeSlide].subtitle}
                        </div>
                    </div>

                    {/* Countdown Footer */}
                    <div className="absolute bottom-8 text-[#ff3333] font-bold text-sm tracking-[0.2em] animate-pulse">
                        ENDS IN: {formatTime(timeLeft)}
                    </div>

                    {/* Scanlines Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />

                </div>
            </div>
        </div>
    );
};

export default OperationsBanner;
