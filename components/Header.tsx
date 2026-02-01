
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { AppView } from '../types';
import AshforgeLogo from './AshforgeLogo';

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  onNavigate: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartToggle, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'FORGE', view: 'SHOP' as AppView },
    { name: 'COLLECTIONS', view: 'SHOP' as AppView },
    { name: 'FITMENT DATA', view: 'SHOP' as AppView },
    { name: 'INTEL', view: 'SHOP' as AppView },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b border-[#ff3333]/10 backdrop-blur-xl ${isScrolled ? 'py-3 bg-black/95 translate-y-0 shadow-2xl' : 'py-8 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <button
          onClick={() => onNavigate('SHOP')}
          className="flex items-center gap-5 group"
          aria-label="Ashforge Home"
        >
          <div className="relative w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <AshforgeLogo className="w-full h-full" />
          </div>

          <div className="flex flex-col items-start leading-none pt-1">
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-[#ff3333] transition-colors duration-300">ASHFORGE</span>
            <span className="text-[8px] font-black tracking-[0.4em] text-[#ff3333] opacity-60 mt-1">RESILIENCE ENGINEERED</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.view)}
              className="text-[10px] font-black tracking-[0.2em] text-zinc-500 hover:text-white transition-all relative group uppercase"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ff3333] group-hover:w-full transition-all duration-500" />
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={onCartToggle}
            className="relative p-2 group"
            aria-label={`Open shopping cart (${cartCount} items)`}
          >
            <ShoppingCart className="w-6 h-6 text-white group-hover:text-[#ff3333] transition-all duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff3333] text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-none ring-2 ring-black animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 text-white hover:text-[#ff3333] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-[#ff3333]/20 p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                onNavigate(link.view);
                setMobileMenuOpen(false);
              }}
              className="text-3xl font-black tracking-tighter text-white text-left hover:text-[#ff3333] transition-colors flex justify-between items-center group uppercase"
            >
              {link.name}
              <div className="w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <AshforgeLogo className="w-full h-full" />
              </div>
            </button>
          ))}
          <div className="pt-8 border-t border-zinc-900 mt-4 flex justify-between items-center">
            <p className="text-[9px] font-black text-zinc-600 tracking-[0.4em] uppercase">Sector-07 Auth</p>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
