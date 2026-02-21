import React from 'react';
import AshforgeMark from './AshforgeMark';

interface TopBrandBarProps {
    onHomeClick: () => void;
}

const TopBrandBar: React.FC<TopBrandBarProps> = ({ onHomeClick }) => {
    return (
        <div className="sticky top-0 z-40 w-full flex justify-center items-center py-4 bg-black/35 backdrop-blur-2xl border-b border-white/10 shadow-lg bg-gradient-to-b from-white/5 to-transparent">
            <button
                onClick={onHomeClick}
                className="flex items-center gap-3 md:gap-4 group px-4 hover:opacity-100 transition-opacity"
                aria-label="Home"
            >
                <AshforgeMark className="w-5 h-5 md:w-6 md:h-6 text-white logoGlow transition-transform duration-500 group-hover:scale-105" />
                <span className="text-sm md:text-base font-semibold tracking-[0.2em] text-white">ASHFORGE</span>
            </button>
        </div>
    );
};

export default TopBrandBar;
