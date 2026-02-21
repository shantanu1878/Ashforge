import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User, ShoppingCart } from 'lucide-react';
import AshforgeMark from './AshforgeMark';
import { isAuthed } from '../lib/auth';

interface MobileTopBarProps {
    cartCount: number;
    onMenuClick: () => void;
    onCartClick: () => void;
}

const MobileTopBar: React.FC<MobileTopBarProps> = ({ cartCount, onMenuClick, onCartClick }) => {
    const navigate = useNavigate();

    return (
        <div className="md:hidden sticky top-0 z-40 w-full flex items-center justify-between px-4 h-16 bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-lg bg-gradient-to-b from-white/5 to-transparent pt-safe">
            {/* Left: Hamburger */}
            <button
                onClick={onMenuClick}
                className="w-10 h-10 flex items-center justify-start text-zinc-400 hover:text-white transition-colors"
                aria-label="Open Menu"
            >
                <Menu size={24} />
            </button>

            {/* Center: Brand */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 group absolute left-1/2 -translate-x-1/2"
                aria-label="Home"
            >
                <AshforgeMark className="w-5 h-5 text-white logoGlow transition-transform duration-500 group-hover:scale-105" />
                <span className="text-sm font-semibold tracking-[0.2em] text-white hidden sm:block">ASHFORGE</span>
            </button>

            {/* Right: Account & Cart */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate(isAuthed() ? '/account' : '/login')}
                    className="w-8 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                    aria-label="Account"
                >
                    <User size={20} />
                </button>
                <button
                    onClick={onCartClick}
                    className="w-8 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors relative"
                    aria-label={`Cart (${cartCount})`}
                >
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                        <span className="absolute top-1 -right-1 bg-[#ff3333] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-sm ring-2 ring-black/80 shadow-[0_0_10px_rgba(255,51,51,0.5)]">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default MobileTopBar;
