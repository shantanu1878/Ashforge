import React from 'react';
import { Home, Layers, Info, Mail, ShoppingCart } from 'lucide-react';
import { AppView } from '../types';
import AshforgeMark from './AshforgeMark';

interface SidebarNavProps {
    cartCount: number;
    onCartToggle: () => void;
    onNavigate: (view: AppView) => void;
    currentView: AppView;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ cartCount, onCartToggle, onNavigate, currentView }) => {
    const navItems = [
        { icon: Home, label: 'Home', view: 'SHOP' as AppView },
        { icon: Layers, label: 'Collection', view: 'SHOP' as AppView },
        { icon: Info, label: 'About', view: 'ABOUT' as AppView },
        { icon: Mail, label: 'Contact', view: 'CONTACT' as AppView },
    ];

    const glassStyles = "bg-black/50 backdrop-blur-2xl border border-white/15 shadow-lg z-50 flex flex-col items-center justify-center";

    return (
        <>
            {/* Top Logo Chip */}
            <button
                onClick={() => onNavigate('SHOP')}
                className={`fixed top-4 left-4 w-12 h-12 md:w-14 md:h-14 rounded-2xl ${glassStyles} group transition-transform hover:scale-105`}
                aria-label="Ashforge Home"
            >
                <AshforgeMark className="w-6 h-6 md:w-8 md:h-8 text-white transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,51,51,0.6)]" title="Ashforge Logo" />
            </button>

            {/* Middle Nav Capsule */}
            <nav className={`fixed top-1/2 -translate-y-1/2 left-4 w-12 md:w-14 rounded-[28px] py-4 gap-4 ${glassStyles}`}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.view;

                    return (
                        <button
                            key={item.label}
                            onClick={() => onNavigate(item.view)}
                            className="group relative w-full h-12 flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-300"
                            aria-label={item.label}
                        >
                            {/* Active Indicator Line */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#ff3333] shadow-[0_0_8px_#ff3333] rounded-r-md transition-all" />
                            )}

                            <div className="relative">
                                {/* Soft red glow underneath active icon */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-[#ff3333] blur-md opacity-30 rounded-full scale-150 transition-all pointer-events-none" />
                                )}
                                <Icon className={`w-5 h-5 md:w-6 md:h-6 shrink-0 transition-all duration-300 relative z-10 ${isActive ? 'text-[#ff3333]' : 'group-hover:text-white group-hover:scale-110'}`} />
                            </div>

                            {/* Floating Tooltip (Desktop Hover & Mobile Label logic) */}
                            <div className="absolute left-[calc(100%+16px)] px-3 py-1.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap hidden md:block z-50 shadow-xl">
                                <span className="text-xs font-bold tracking-widest text-white uppercase">{item.label}</span>
                                {/* Small left pointing triangle for tooltip */}
                                <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-r-[6px] border-r-white/10" />
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Cart Chip */}
            <button
                onClick={onCartToggle}
                className={`fixed bottom-4 left-4 w-12 h-12 md:w-14 md:h-14 rounded-2xl ${glassStyles} group transition-all duration-300 hover:border-white/20`}
                aria-label={`Cart (${cartCount})`}
            >
                <div className="relative">
                    {cartCount > 0 && (
                        <div className="absolute inset-0 bg-[#ff3333] blur-md opacity-30 rounded-full scale-150 transition-all pointer-events-none" />
                    )}
                    <ShoppingCart className={`w-5 h-5 md:w-6 md:h-6 shrink-0 transition-all duration-300 relative z-10 ${cartCount > 0 ? 'text-[#ff3333]' : 'text-zinc-400 group-hover:text-white group-hover:-translate-y-0.5'}`} />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#ff3333] text-white text-[9px] md:text-[10px] font-black w-4 md:w-4.5 h-4 md:h-4.5 flex items-center justify-center rounded-sm ring-2 ring-black/80 z-20 shadow-[0_0_10px_rgba(255,51,51,0.5)]">
                            {cartCount}
                        </span>
                    )}

                    {/* Floating Tooltip Cart */}
                    <div className="absolute left-[calc(100%+24px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap hidden md:block z-50 shadow-xl">
                        <span className="text-xs font-bold tracking-widest text-white uppercase">Cart</span>
                        <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-r-[6px] border-r-white/10" />
                    </div>
                </div>
            </button>
        </>
    );
};

export default SidebarNav;
