import React from 'react';
import { useNavigate } from 'react-router-dom';
import AshforgeMark from './AshforgeMark';

const TopBrandBar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="hidden md:flex sticky top-0 z-40 w-full justify-center pointer-events-none pt-4 pb-2">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-4 group px-6 py-2.5 bg-black/30 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.4)] pointer-events-auto transition-transform hover:scale-105"
                aria-label="Home"
            >
                <AshforgeMark className="w-5 h-5 md:w-6 md:h-6 text-white logoGlow transition-transform duration-500 group-hover:drop-shadow-[0_0_10px_rgba(255,51,51,0.5)]" />
                <span className="text-sm md:text-base font-semibold tracking-[0.2em] text-white uppercase mt-0.5">ASHFORGE</span>
            </button>
        </div>
    );
};

export default TopBrandBar;
