
import React from 'react';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-[#0a0a0a] border-l border-[#ff3333]/30 h-full flex flex-col animate-in slide-in-from-right duration-500">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-black text-white tracking-widest">ACTIVE ASSETS</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#ff3333]/20 transition-colors">
            <X className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-4">
              <div className="w-16 h-16 border-2 border-zinc-800 flex items-center justify-center opacity-30">
                <Trash2 size={32} />
              </div>
              <p className="font-black tracking-widest text-xs">NO ASSETS DETECTED</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-24 bg-zinc-900 border border-zinc-800 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-black text-white uppercase tracking-wider">{item.name}</h4>
                    <span className="text-xs font-mono text-zinc-500">{item.price} Taka</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 mb-3 tracking-widest">{item.category}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-zinc-800">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-black text-white">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-zinc-600 hover:text-[#ff3333] transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-black border-t border-zinc-800">
          <div className="flex justify-between items-end mb-6">
            <span className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">Total Investment</span>
            <span className="text-2xl font-black text-white">{subtotal.toLocaleString()} Taka</span>
          </div>
          <button 
            onClick={onCheckout}
            disabled={items.length === 0}
            className={`w-full py-4 flex items-center justify-center gap-3 font-black tracking-[0.2em] transition-all duration-300 border-2 ${
              items.length === 0 
                ? 'border-zinc-800 text-zinc-700 cursor-not-allowed'
                : 'border-[#ff3333] bg-[#ff3333] text-white hover:bg-transparent'
            }`}
          >
            INITIATE ACQUISITION
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
