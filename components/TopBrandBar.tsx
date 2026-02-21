import React from 'react';
import { useNavigate } from 'react-router-dom';
import AshforgeMark from './AshforgeMark';

const TopBrandBar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
            <button
                onClick={() => navigate('/')}
                className="group flex items-center gap-3.5 px-8 py-3 bg-black/35 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-black/50 hover:border-[#ff3333]/40 hover:shadow-[0_0_25px_rgba(255,51,51,0.25)] pointer-events-auto"
                aria-label="Ashforge Home"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-[#ff3333] blur-md opacity-0 group-hover:opacity-60 rounded-full scale-150 transition-all duration-500 pointer-events-none" />
                    <AshforgeMark className="w-6 h-6 text-white transition-all duration-300 group-hover:text-[#ff3333] relative z-10" />
                </div>
                <span className="text-white font-black tracking-[0.25em] text-base mt-0.5 group-hover:text-[#ff3333] transition-colors duration-300 drop-shadow-md">
                    ASHFORGE
                </span>
            </button>
        </div>
    );
};

export default TopBrandBar;
