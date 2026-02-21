import React, { useState } from 'react';
import { Home, Layers, Info, Mail, ShoppingCart, Menu, X } from 'lucide-react';
import { AppView } from '../types';
import AshforgeLogo from './AshforgeLogo';

interface SidebarNavProps {
    cartCount: number;
    onCartToggle: () => void;
    onNavigate: (view: AppView) => void;
    currentView: AppView;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ cartCount, onCartToggle, onNavigate, currentView }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { icon: Home, label: 'Home', desc: 'Main Operations Hub', view: 'SHOP' as AppView },
        { icon: Layers, label: 'Collection', desc: 'Engineering Gear', view: 'SHOP' as AppView },
        { icon: Info, label: 'About', desc: 'Industrial Lineage', view: 'ABOUT' as AppView },
        { icon: Mail, label: 'Contact', desc: 'Communicate with HQ', view: 'CONTACT' as AppView },
    ];

    const handleNavClick = (view: AppView) => {
        onNavigate(view);
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* --- DESKTOP SIDEBAR --- */}
            <aside
                className="hidden md:flex flex-col fixed top-0 left-0 h-screen z-50 bg-black/40 backdrop-blur-xl border-r border-[#ff3333]/10 transition-all duration-500 ease-out shadow-[4px_0_24px_rgba(0,0,0,0.5)]"
                style={{ width: isHovered ? '260px' : '72px' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Logo Area */}
                <div className="h-24 flex items-center justify-center border-b border-white/5 relative">
                    <button
                        onClick={() => onNavigate('SHOP')}
                        className="flex items-center justify-center w-full h-full relative group"
                        aria-label="Ashforge Home"
                    >
                        <div className="w-10 h-10 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                            <AshforgeLogo className="w-full h-full text-white" />
                        </div>
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-8 flex flex-col gap-2 overflow-y-auto no-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentView === item.view; // Very basic active check

                        return (
                            <button
                                key={item.label}
                                onClick={() => handleNavClick(item.view)}
                                className="group relative flex flex-col items-center justify-center w-full min-h-[72px] text-zinc-400 hover:text-white transition-colors duration-300 pointer-events-auto"
                                aria-label={item.label}
                                title={!isHovered ? item.label : undefined} // Native tooltip on collapsed
                            >
                                {/* Active Indicator Accent */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#ff3333] shadow-[0_0_10px_#ff3333] rounded-r-md transition-all" />
                                )}

                                <div className="flex flex-col items-center w-full px-4 overflow-hidden">
                                    <Icon className={`w-6 h-6 shrink-0 transition-transform duration-300 ${isActive ? 'text-[#ff3333]' : 'group-hover:text-white'} ${isHovered ? 'mb-2' : ''}`} />

                                    {/* Expanded Content */}
                                    <div
                                        className={`flex flex-col items-center justify-center w-full transition-all duration-500 ease-out flex-nowrap whitespace-nowrap overflow-hidden
                      ${isHovered ? 'opacity-100 max-h-20 translate-y-0' : 'opacity-0 max-h-0 translate-y-2'}
                    `}
                                    >
                                        <span className="text-xs font-black tracking-widest text-white uppercase">{item.label}</span>
                                        <span className="text-[9px] font-medium tracking-wide text-zinc-500 mt-1">{item.desc}</span>
                                    </div>
                                </div>

                                {/* Subtle Hover Background */}
                                <div className="absolute inset-x-2 inset-y-1 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10" />
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom Actions (Cart) */}
                <div className="py-6 border-t border-white/5">
                    <button
                        onClick={onCartToggle}
                        className="group relative flex flex-col items-center justify-center w-full min-h-[72px] text-zinc-400 hover:text-white transition-colors duration-300"
                        aria-label={`Cart (${cartCount})`}
                        title={!isHovered ? 'Cart' : undefined}
                    >
                        <div className="flex flex-col items-center w-full px-4 overflow-hidden relative">
                            <div className="relative">
                                <ShoppingCart className={`w-6 h-6 shrink-0 transition-all duration-300 group-hover:text-[#ff3333] ${isHovered ? 'mb-2' : ''}`} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#ff3333] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-none ring-2 ring-black">
                                        {cartCount}
                                    </span>
                                )}
                            </div>

                            <div
                                className={`flex flex-col items-center justify-center w-full transition-all duration-500 ease-out flex-nowrap whitespace-nowrap overflow-hidden
                      ${isHovered ? 'opacity-100 max-h-20 translate-y-0' : 'opacity-0 max-h-0 translate-y-2'}
                    `}
                            >
                                <span className="text-xs font-black tracking-widest text-white uppercase">Cart</span>
                                <span className="text-[9px] font-medium tracking-wide text-zinc-500 mt-1">{cartCount} items</span>
                            </div>
                        </div>
                        <div className="absolute inset-x-2 inset-y-1 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10" />
                    </button>
                </div>
            </aside>

            {/* --- MOBILE NAVIGATION --- */}
            {/* Mobile Top Bar (Just Logo & Hamburger) */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-black/80 backdrop-blur-md border-b border-white/5 px-4 flex justify-between items-center bg-black/40 backdrop-blur-xl border-r border-[#ff3333]/10">
                <button onClick={() => onNavigate('SHOP')} className="w-8 h-8 flex items-center justify-center">
                    <AshforgeLogo className="w-full h-full text-white" />
                </button>

                {/* Hamburger replaced by a bottom nav, but keeping a simple header */}
                <div className="text-sm font-black tracking-widest text-white uppercase">ASHFORGE</div>

                <div className="w-8" /> {/* Spacer to center title */}
            </header>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-black/85 backdrop-blur-xl border-t border-white/10 px-6 flex justify-between items-center pb-safe">
                {navItems.slice(0, 3).map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.view;
                    return (
                        <button
                            key={item.label}
                            onClick={() => handleNavClick(item.view)}
                            className={`relative flex flex-col items-center justify-center w-12 h-full gap-1 transition-colors ${isActive ? 'text-[#ff3333]' : 'text-zinc-400'}`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-[9px] font-medium tracking-widest uppercase">{item.label}</span>
                            {isActive && <div className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#ff3333] rounded-b-md" />}
                        </button>
                    )
                })}
                {/* Cart in Mobile Nav */}
                <button
                    onClick={onCartToggle}
                    className="relative flex flex-col items-center justify-center w-12 h-full gap-1 text-zinc-400"
                >
                    <div className="relative">
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-2 bg-[#ff3333] text-white text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full ring-2 ring-black">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[9px] font-medium tracking-widest uppercase">Cart</span>
                </button>
            </nav>
        </>
    );
};

export default SidebarNav;
