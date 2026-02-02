
import React from 'react';
import { Product } from '../types';
import { Shield, Plus, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  const isOutOfStock = product.stock === 'DEPLETED';

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col h-full bg-[#0a0a0a]/80 border border-[#333] hover:border-[#555] transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-md magma-glow"
    >
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity z-20">
        <ArrowUpRight className="text-[#ff3333]" size={16} />
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff3333] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff3333] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 shrink-0">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 lg:grayscale group-hover:grayscale-0 lg:opacity-80 group-hover:opacity-100"
        />

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-[4px] z-10">
            <div className="border border-[#ff3333] p-1">
              <span className="border border-[#ff3333] px-6 py-2 text-[#ff3333] font-black tracking-[0.4em] uppercase text-xs block">
                DEPLETED
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-1">
        {/* Title & SKU Alignment - Fixed height for uniform starting point of description */}
        <div className="flex justify-between items-start gap-4 mb-4 min-h-[3rem]">
          <h3 className="text-xl font-black text-white tracking-tight uppercase group-hover:text-[#ff3333] transition-colors leading-tight">
            {product.name}
          </h3>
          <span className="text-zinc-600 text-[10px] font-mono tracking-tighter shrink-0 mt-1">
            [{product.sku}]
          </span>
        </div>

        {/* Description - Fixed height for uniform starting point of footer */}
        <div className="mb-8 flex-1">
          <p className="text-xs text-zinc-500 line-clamp-3 font-medium leading-relaxed tracking-wide h-[3.75rem] overflow-hidden">
            {product.description}
          </p>
        </div>

        {/* Stacked Industrial Footer */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col gap-6 mt-auto">
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-black text-zinc-600 tracking-[0.4em] mb-1 uppercase">ASSET_VALUATION</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">
                {product.price.toLocaleString()}
              </span>
              <span className="text-[10px] font-black text-zinc-400 tracking-widest uppercase">Taka</span>
            </div>
          </div>

          <button
            onClick={onAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-3 w-full h-14 px-5 transition-all duration-300 font-black text-[11px] tracking-[0.3em] glitch-hover ${isOutOfStock
                ? 'border border-zinc-900 text-zinc-800 cursor-not-allowed bg-zinc-950 opacity-40'
                : 'bg-zinc-900 border-2 border-[#ff3333] text-white hover:bg-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.4)]'
              }`}
          >
            <Plus size={16} strokeWidth={3} />
            EQUIP UNIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
