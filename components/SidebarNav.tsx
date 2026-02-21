import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Layers, Info, Mail, ShoppingCart, Archive, User } from 'lucide-react';
import AshforgeMark from './AshforgeMark';
import { isAuthed } from '../lib/auth';

interface SidebarNavProps {
    cartCount: number;
    onCartToggle: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ cartCount, onCartToggle }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const primaryNav = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Layers, label: 'Collection', path: '/collection' },
        { icon: Archive, label: 'Orders', path: '/orders' }
    ];

    const secondaryNav = [
        { icon: Info, label: 'About', path: '/about' },
        { icon: Mail, label: 'Contact', path: '/contact' }
    ];

    const glassStyles = "hidden md:flex bg-black/50 backdrop-blur-2xl border border-white/15 shadow-lg z-50 flex-col items-center justify-center";

    const renderNavItems = (items: typeof primaryNav) => {
        return items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
                <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
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
                    <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap hidden md:block z-50 shadow-xl">
                        <span className="text-xs font-bold tracking-widest text-white uppercase">{item.label}</span>
                        {/* Small left pointing triangle for tooltip */}
                        <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-r-[6px] border-r-white/10" />
                    </div>
                </button>
            );
        });
    };

    return (
        <>
            {/* 1. Top Logo Chip */}
            <button
                onClick={() => navigate('/')}
                className={`fixed top-4 left-4 w-12 h-12 md:w-14 md:h-14 rounded-2xl ${glassStyles} group transition-transform hover:scale-105`}
                aria-label="Ashforge Home"
            >
                <AshforgeMark className="w-6 h-6 md:w-8 md:h-8 text-white transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,51,51,0.6)] drop-shadow-[0_0_8px_rgba(255,51,51,0.6)]" title="Ashforge Logo" />
            </button>

            {/* 2 & 3. Grouped Navigation Capsules */}
            <div className="fixed top-1/2 -translate-y-1/2 left-4 hidden md:flex flex-col gap-6 z-50">
                {/* Primary Nav Capsule */}
                <nav className={`w-12 md:w-14 rounded-[28px] py-4 gap-4 ${glassStyles}`}>
                    {renderNavItems(primaryNav)}
                </nav>

                {/* Secondary Nav Capsule */}
                <nav className={`w-12 md:w-14 rounded-[28px] py-4 gap-4 ${glassStyles}`}>
                    {renderNavItems(secondaryNav)}
                </nav>
            </div>

            {/* 4. Bottom Cart Chip */}
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

            {/* 5. Top Right Profile HUD */}
            <button
                onClick={() => navigate(isAuthed() ? '/account' : '/login')}
                className={`fixed top-4 right-4 w-12 h-12 md:w-14 md:h-14 rounded-2xl ${glassStyles} group transition-transform hover:scale-105`}
                aria-label="Profile"
            >
                {isAuthed() ? (
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#ff3333] blur-md opacity-30 rounded-full scale-150 transition-all pointer-events-none" />
                        <User fill="currentColor" className="text-[#ff3333] w-5 h-5 md:w-6 md:h-6 shrink-0 transition-all duration-300 relative z-10" />
                    </div>
                ) : (
                    <User className="w-5 h-5 md:w-6 md:h-6 shrink-0 transition-all duration-300 text-zinc-400 group-hover:text-white group-hover:scale-110 relative z-10" />
                )}

                {/* Profile Floating Tooltip - Opens to the Left */}
                <div className="absolute right-[calc(100%+16px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap hidden md:block z-50 shadow-xl">
                    <span className="text-xs font-bold tracking-widest text-white uppercase">{isAuthed() ? 'Dossier' : 'Login'}</span>
                    <div className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-l-[6px] border-l-white/10" />
                </div>
            </button>
        </>
    );
};

export default SidebarNav;
