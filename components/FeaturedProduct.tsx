import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../constants';

const FeaturedProduct: React.FC = () => {
    const navigate = useNavigate();

    // Feature the first product for this showcase block
    const featured = PRODUCTS[0];
    if (!featured) return null;

    return (
        <div className="md:hidden w-full px-4 mb-24">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-[#ff3333] tracking-[0.4em] uppercase shadow-sm">Featured Asset</span>
                <span className="text-xs font-mono text-zinc-500">{featured.sku}</span>
            </div>

            <div
                className="relative bg-[#050505] border border-white/5 rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/product/${featured.slug}`)}
            >
                {/* Large Visual Section */}
                <div className="relative aspect-square w-full bg-zinc-900 overflow-hidden">
                    <img
                        src={featured.image}
                        alt={featured.name}
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-90" />
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">{featured.name}</h3>
                    <p className="text-xs text-zinc-400 font-medium line-clamp-2 leading-relaxed tracking-wide">
                        {featured.description}
                    </p>

                    {/* CTA Sequence */}
                    <div className="flex items-center justify-between mt-4 pb-2 border-b border-white/10">
                        <span className="text-zinc-500 text-[10px] font-black tracking-widest uppercase">Inspect Details</span>
                        <ChevronRight size={16} className="text-[#ff3333] group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Red CTA Border Accent */}
                <div className="w-full h-1 bg-[#ff3333] shadow-[0_-2px_15px_rgba(255,51,51,0.5)] absolute bottom-0 left-0 right-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </div>

            {/* View Collection Global CTA */}
            <button
                className="w-full mt-6 py-4 bg-transparent border-2 border-[#ff3333]/90 text-white text-[11px] font-black tracking-[0.3em] uppercase transition-colors hover:bg-[#ff3333] shadow-[0_0_20px_rgba(255,51,51,0.2)] rounded-xl"
                onClick={() => { window.scrollTo({ top: 800, behavior: 'smooth' }); }}
            >
                View Collection
            </button>
        </div>
    );
};

export default FeaturedProduct;
