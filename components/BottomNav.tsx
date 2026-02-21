import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Layers, ShoppingCart, Archive } from 'lucide-react';

interface BottomNavProps {
    cartCount: number;
    onCartToggle: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ cartCount, onCartToggle }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { icon: Home, label: 'Home', path: '/', action: () => navigate('/') },
        { icon: Layers, label: 'Collection', path: '/collection', action: () => navigate('/collection') },
        { icon: Archive, label: 'Orders', path: '/orders', action: () => navigate('/orders') },
        { icon: ShoppingCart, label: 'Cart', path: '#', action: onCartToggle },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-2xl border-t border-white/10 z-50 flex items-center justify-around px-2 pb-safe">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path && item.label !== 'Cart';

                return (
                    <button
                        key={item.label}
                        onClick={item.action}
                        className="relative flex flex-col items-center justify-center w-16 h-full text-zinc-500 hover:text-white transition-colors"
                        aria-label={item.label}
                    >
                        {isActive && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#ff3333] shadow-[0_0_8px_#ff3333] rounded-b-md" />
                        )}
                        <div className="relative">
                            {isActive && (
                                <div className="absolute inset-0 bg-[#ff3333] blur-md opacity-20 rounded-full scale-150 transition-all pointer-events-none" />
                            )}
                            <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'text-[#ff3333] opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />

                            {item.label === 'Cart' && cartCount > 0 && (
                                <span className="absolute -top-1 -right-2 bg-[#ff3333] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-sm ring-2 ring-black/80 z-20 shadow-[0_0_10px_rgba(255,51,51,0.5)]">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <span className={`text-[9px] font-bold tracking-wider mt-1 uppercase ${isActive ? 'text-white' : ''}`}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNav;
