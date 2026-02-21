import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface CollectionProps {
    onAddToCart: (product: Product) => void;
}

const Collection: React.FC<CollectionProps> = ({ onAddToCart }) => {
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState<'NEWEST' | 'PRICE_LOW_HIGH' | 'PRICE_HIGH_LOW'>('NEWEST');

    useEffect(() => {
        document.title = "ASHFORGE | Complete Collection";

        // Scroll restoration pattern matching the grid
        const saved = sessionStorage.getItem('collectionScrollY');
        if (saved) {
            window.scrollTo(0, parseInt(saved, 10));
        } else {
            window.scrollTo(0, 0);
        }

        return () => {
            sessionStorage.setItem('collectionScrollY', window.scrollY.toString());
        };
    }, []);

    // Simple sorting derivation
    const sortedProducts = [...PRODUCTS].sort((a, b) => {
        switch (sortOption) {
            case 'PRICE_LOW_HIGH':
                return a.price - b.price;
            case 'PRICE_HIGH_LOW':
                return b.price - a.price;
            case 'NEWEST':
            default:
                // Assuming array order is newest first for MVP, if we had timestamps we'd use those. 
                // For now, maintaining original array index mapping represents 'Default/Newest'
                return 0;
        }
    });

    return (
        <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6">
                <div>
                    <button
                        onClick={() => navigate('/')}
                        className="text-zinc-500 hover:text-white text-[10px] uppercase font-black tracking-widest transition-colors mb-4 flex items-center gap-2"
                    >
                        ← Back to HQ
                    </button>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        Full Arsenal
                    </h1>
                    <p className="text-zinc-500 mt-2 font-medium tracking-wide">
                        Complete inventory catalog for Sector 07 deployment.
                    </p>
                </div>

                {/* Sort Controls */}
                <div className="mt-6 md:mt-0 flex items-center gap-3">
                    <span className="text-[10px] text-zinc-600 font-black tracking-[0.2em] uppercase">Sort Strategy:</span>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as any)}
                        className="bg-black/60 border border-white/10 text-white text-xs font-bold px-3 py-2 rounded-none focus:outline-none focus:border-[#ff3333]/50 focus:ring-1 focus:ring-[#ff3333]/50 appearance-none cursor-pointer hover:bg-black/80 transition-colors"
                    >
                        <option value="NEWEST">Primary Directives (Newest)</option>
                        <option value="PRICE_LOW_HIGH">Resource Allocation (Low-High)</option>
                        <option value="PRICE_HIGH_LOW">Premium Assets (High-Low)</option>
                    </select>
                </div>
            </div>

            {/* Roster Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                {sortedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Collection;
