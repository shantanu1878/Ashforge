
import React, { useState, useCallback } from 'react';
import SidebarNav from './components/SidebarNav';
import LavaBackground from './components/LavaBackground';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import AshforgeLogo from './components/AshforgeLogo';
import OperationsBanner from './components/OperationsBanner';
import { PRODUCTS } from './constants';
import { Product, CartItem, AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('SHOP');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const navigateToPDP = (product: Product) => {
    setSelectedProduct(product);
    setView('PDP');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = () => {
    setView('SHOP');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCheckout = () => {
    setIsCartOpen(false);
    setView('CHECKOUT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeCheckout = () => {
    setCart([]);
    setView('SHOP');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-[#ff3333] selection:text-white">
      <LavaBackground />

      <SidebarNav
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onNavigate={(v) => {
          setView(v);
          if (v === 'SHOP') setSelectedProduct(null);
        }}
        currentView={view}
      />

      <main className="relative z-10 transition-opacity duration-500 md:pl-[72px] pb-24 md:pb-0">
        {view === 'SHOP' && (
          <div className="max-w-7xl mx-auto px-6 pt-48 pb-24">
            <div className="mb-24 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <OperationsBanner />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => navigateToPDP(product)}
                  onAddToCart={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'PDP' && selectedProduct && (
          <div className="animate-in fade-in duration-700">
            <ProductDetail
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              onBack={navigateToShop}
            />
          </div>
        )}

        {view === 'CHECKOUT' && (
          <div className="animate-in fade-in duration-700">
            <Checkout
              items={cart}
              onComplete={completeCheckout}
              onBack={navigateToShop}
            />
          </div>
        )}

        {view === 'ABOUT' && (
          <div className="max-w-7xl mx-auto px-6 pt-48 pb-24 min-h-screen text-center flex flex-col items-center justify-center animate-in fade-in duration-700">
            <h1 className="text-4xl font-black text-white tracking-tighter mb-4">INDUSTRIAL LINEAGE</h1>
            <p className="text-zinc-400 max-w-2xl text-lg font-medium leading-relaxed mb-8">
              Forged in the fires of sector 07. We engineer the gear that engineers the future. Resilience isn't an option, it's a requirement.
            </p>
            <button onClick={() => navigateToShop()} className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-black tracking-[0.2em] border border-white/10 uppercase transition-all duration-300">
              Return to Operations
            </button>
          </div>
        )}

        {view === 'CONTACT' && (
          <div className="max-w-7xl mx-auto px-6 pt-48 pb-24 min-h-screen text-center flex flex-col items-center justify-center animate-in fade-in duration-700">
            <h1 className="text-4xl font-black text-white tracking-tighter mb-4">COMMUNIQUÉ: HQ</h1>
            <p className="text-zinc-400 max-w-2xl text-lg font-medium leading-relaxed mb-8">
              Transmission channels open. Awaiting encoded signal.
            </p>
            <div className="flex gap-4">
              <a href="mailto:hq@ashforge.dev" className="px-8 py-3 bg-[#ff3333]/10 hover:bg-[#ff3333]/20 text-[#ff3333] text-xs font-black tracking-[0.2em] border border-[#ff3333]/20 uppercase transition-all duration-300">
                INITIATE COMMS
              </a>
            </div>
          </div>
        )}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={navigateToCheckout}
      />

      <footer className="relative z-10 border-t border-white/5 bg-black/60 backdrop-blur-2xl py-24 mt-24 md:pl-[72px] mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <AshforgeLogo className="w-12 h-12" />
              <h3 className="text-4xl font-black text-white tracking-tighter">ASHFORGE</h3>
            </div>
            <p className="text-zinc-500 max-w-sm font-medium tracking-wide leading-relaxed">
              Industrial gear for those who operate where others retreat. We engineer the gear that engineers the future.
            </p>
            <div className="flex gap-6">
              <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-[#ff3333] hover:border-[#ff3333] transition-all cursor-pointer group">
                <AshforgeLogo className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] font-black text-[#ff3333] tracking-[0.4em] uppercase">Data Points</p>
            <nav className="flex flex-col gap-4 text-xs font-black tracking-widest text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">NEURAL-NET LOGS</a>
              <a href="#" className="hover:text-white transition-colors">SECTOR MAPS</a>
              <a href="#" className="hover:text-white transition-colors">FITMENT DATA</a>
              <a href="#" className="hover:text-white transition-colors">FORGE INTEL</a>
            </nav>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] font-black text-[#ff3333] tracking-[0.4em] uppercase">Sector Logistics</p>
            <p className="text-xs font-medium text-zinc-500 leading-loose uppercase tracking-tighter">
              HQ: GRID_098-X<br />
              VOLCANIC SECTOR 7<br />
              TRANS-PACIFIC DEPLOYMENT
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-24 mt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
          <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase">
            &copy; 2026 ASHFORGE INDUSTRIES // AUTH: 9918-XPR
          </p>
          <p className="text-zinc-500 text-[10px] font-black tracking-[0.5em] uppercase">
            RESILIENCE_ENGR_V4.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
