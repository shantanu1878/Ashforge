
import React, { useState } from 'react';
import { Product } from '../types';
import { ChevronDown, ChevronUp, Shield, Activity, Map, ArrowLeft, Plus, Share2, Hexagon } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>('specs');

  const sections = [
    { id: 'specs', title: 'TECHNICAL SPECS', content: product.specs.join(', ') },
    { id: 'care', title: 'MAINTENANCE PROTOCOL', content: 'Clean with pressurized air and non-corrosive industrial micro-solutions. Avoid direct exposure to solar flares.' },
    { id: 'return', title: 'RECOVERY POLICY', content: 'Field failures must be reported within 30 deployment cycles. Structural warranties apply to all forged components.' }
  ];

  const getStockStatus = (stock: string) => {
    switch (stock) {
      case 'NOMINAL': return { label: 'STATUS: NOMINAL', color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
      case 'CRITICAL': return { label: 'STATUS: CRITICAL', color: 'text-amber-500', bg: 'bg-amber-500/10' };
      default: return { label: 'STATUS: DEPLETED', color: 'text-rose-600', bg: 'bg-rose-600/10' };
    }
  };

  const status = getStockStatus(product.stock);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
      <button
        onClick={onBack}
        className="flex items-center gap-3 text-zinc-500 hover:text-white transition-all mb-12 font-black tracking-[0.3em] text-[10px] group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        RETURN TO GRID
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/5] bg-zinc-950 border border-zinc-800 overflow-hidden group shadow-2xl">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110 grayscale-[30%] hover:grayscale-0"
            />

            {/* Image Overlay UI */}
            <div className="absolute top-8 left-8 flex flex-col gap-3">
              <div className={`flex items-center gap-3 ${status.bg} backdrop-blur-md px-4 py-2 border border-white/5`}>
                <div className={`w-2 h-2 rounded-full animate-ping ${status.color.replace('text-', 'bg-')}`} />
                <span className={`text-[10px] font-black tracking-[0.2em] ${status.color}`}>{status.label}</span>
              </div>
            </div>

            <div className="absolute bottom-8 right-8">
              <div className="bg-black/80 backdrop-blur-md border border-zinc-800 p-4 flex gap-4">
                <div className="text-right">
                  <p className="text-[8px] font-black text-zinc-600 tracking-widest uppercase">Imaging Mode</p>
                  <p className="text-[10px] font-black text-white tracking-widest">ENHANCED_VIS</p>
                </div>
                <div className="w-px h-8 bg-zinc-800" />
                <Hexagon className="text-[#ff3333] animate-spin-slow" size={32} strokeWidth={1} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`relative aspect-square border-2 transition-all overflow-hidden group ${activeImg === idx ? 'border-[#ff3333]' : 'border-zinc-800 opacity-40 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                {activeImg === idx && <div className="absolute inset-0 border-[4px] border-[#ff3333]/20" />}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-10 border-b border-zinc-800 pb-10">
            <div className="flex justify-between items-center mb-6">
              <button className="text-zinc-500 hover:text-white transition-colors" aria-label="Share Asset Intel"><Share2 size={20} /></button>
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">{product.name}</h1>
            <div className="flex items-end gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-zinc-600 tracking-widest mb-1 uppercase">Allocated Credits</span>
                <span className="text-5xl font-black text-white leading-none">{product.price.toLocaleString()} Taka</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-zinc-600 tracking-widest mb-1 uppercase">Designation</span>
                <span className="text-sm font-mono text-zinc-400">#AF-{product.sku}</span>
              </div>
            </div>
          </div>

          <p className="text-lg text-zinc-500 mb-12 leading-relaxed font-medium tracking-wide">
            {product.description}
          </p>

          <div className="grid grid-cols-3 gap-6 mb-12">
            {[
              { icon: Shield, label: 'REINFORCED' },
              { icon: Activity, label: 'ADAPTIVE' },
              { icon: Map, label: 'NAV-SYNC' }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900/30 p-5 border border-zinc-800 flex flex-col items-center justify-center gap-3 hover:border-[#ff3333]/30 transition-colors group">
                <item.icon size={24} className="text-[#ff3333] group-hover:scale-110 transition-transform" />
                <p className="text-[9px] font-black text-white tracking-[0.2em]">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-12">
            {sections.map(section => (
              <div key={section.id} className="border-b border-zinc-900 group">
                <button
                  onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                  className="w-full py-5 flex justify-between items-center text-left"
                >
                  <span className={`text-[11px] font-black tracking-[0.25em] transition-colors ${activeSection === section.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                    {section.title}
                  </span>
                  {activeSection === section.id ? <ChevronUp size={16} className="text-[#ff3333]" /> : <ChevronDown size={16} className="text-zinc-700" />}
                </button>
                {activeSection === section.id && (
                  <div className="pb-6 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed uppercase tracking-wider">{section.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="mt-auto hidden lg:flex flex-col gap-4">
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 'DEPLETED'}
              className="w-full bg-[#ff3333] text-white py-6 font-black tracking-[0.3em] border-2 border-[#ff3333] hover:bg-transparent transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed uppercase glitch-hover text-sm shadow-[0_0_30px_rgba(255,51,51,0.2)]"
            >
              EQUIP UNIT
            </button>
            <button className="w-full border-2 border-zinc-800 text-zinc-500 py-6 font-black tracking-[0.3em] hover:text-white hover:border-white transition-all duration-300 uppercase text-xs">
              LOADOUT
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add to Cart - Pinned for accessibility */}
      <div className="fixed bottom-0 left-0 right-0 p-6 lg:hidden z-[60] pointer-events-none">
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 'DEPLETED'}
          className="pointer-events-auto w-full bg-[#ff3333] text-white py-5 font-black tracking-[0.3em] shadow-[0_0_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,51,51,0.4)] uppercase active:scale-95 transition-all text-sm border-t border-white/20"
        >
          {product.stock === 'DEPLETED' ? 'ASSET DEPLETED' : `EQUIP UNIT — ${product.price} Taka`}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
