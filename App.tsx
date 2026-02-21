
import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SidebarNav from './components/SidebarNav';
import LavaBackground from './components/LavaBackground';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import AshforgeMark from './components/AshforgeMark';
import OperationsBanner from './components/OperationsBanner';
import TopBrandBar from './components/TopBrandBar';
import MobileTopBar from './components/MobileTopBar';
import MobileMenuDrawer from './components/MobileMenuDrawer';
import BottomNav from './components/BottomNav';
import FeaturedProduct from './components/FeaturedProduct';
import Collection from './pages/Collection';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Login from './pages/Login';
import Account from './pages/Account';
import { isAuthed } from './lib/auth';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

function useGridScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const saved = sessionStorage.getItem('gridScrollY');
      if (saved) {
        window.scrollTo(0, parseInt(saved, 10));
      } else {
        window.scrollTo(0, 0);
      }
    }

    return () => {
      if (location.pathname === '/') {
        sessionStorage.setItem('gridScrollY', window.scrollY.toString());
      }
    };
  }, [location.pathname]);
}

const HomeGrid = ({ onAddToCart }: { onAddToCart: (product: Product) => void }) => {
  useGridScrollRestoration();

  useEffect(() => {
    document.title = "ASHFORGE | Resilience Engineered";
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6 md:pt-10 pb-24">
      <div className="mb-8 md:mb-16 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <OperationsBanner />
      </div>

      <FeaturedProduct />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {PRODUCTS.map((product) => (
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

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const navigateToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeCheckout = (orderId: string) => {
    setCart([]);
    navigate(`/orders/${orderId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-[#ff3333] selection:text-white">
      <LavaBackground />

      <SidebarNav
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      <MobileTopBar
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onMenuClick={() => setIsMobileMenuOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="relative z-10 transition-opacity duration-500 pl-0 md:pl-[96px] pb-[80px] md:pb-0">
        <TopBrandBar />

        <Routes>
          <Route path="/" element={<HomeGrid onAddToCart={handleAddToCart} />} />

          <Route path="/product/:slug" element={
            <div className="animate-in fade-in duration-700">
              <ProductDetail onAddToCart={handleAddToCart} />
            </div>
          } />

          <Route path="/checkout" element={
            <div className="animate-in fade-in duration-700">
              <Checkout
                items={cart}
                onComplete={completeCheckout}
                onBack={() => navigate('/')}
              />
            </div>
          } />

          <Route path="/about" element={
            <div className="max-w-7xl mx-auto px-6 pt-48 pb-24 min-h-screen text-center flex flex-col items-center justify-center animate-in fade-in duration-700">
              <h1 className="text-4xl font-black text-white tracking-tighter mb-4">INDUSTRIAL LINEAGE</h1>
              <p className="text-zinc-400 max-w-2xl text-lg font-medium leading-relaxed mb-8">
                Forged in the fires of sector 07. We engineer the gear that engineers the future. Resilience isn't an option, it's a requirement.
              </p>
              <button onClick={() => navigate('/')} className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-black tracking-[0.2em] border border-white/10 uppercase transition-all duration-300">
                Return to Operations
              </button>
            </div>
          } />

          <Route path="/contact" element={
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
          } />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />

          {/* New Ops Routes */}
          <Route path="/collection" element={<Collection onAddToCart={handleAddToCart} />} />

          {/* Protected Routes */}
          <Route path="/orders" element={isAuthed() ? <Orders /> : <Login />} />
          <Route path="/orders/:id" element={isAuthed() ? <OrderDetail onReorder={(items) => {
            // Directly inject reorder requests into the shopping cart State mapping
            setCart(prev => {
              const updated = [...prev];
              items.forEach(newItem => {
                const existing = updated.find(i => i.id === newItem.id);
                if (existing) {
                  existing.quantity += newItem.quantity;
                } else {
                  updated.push(newItem);
                }
              });
              return updated;
            });
            setIsCartOpen(true);
          }} /> : <Login />} />
        </Routes>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={navigateToCheckout}
      />

      <BottomNav
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      <footer className="relative z-10 border-t border-white/5 bg-black/60 backdrop-blur-2xl py-24 md:mt-24 pl-0 md:pl-[96px] pb-[120px] md:pb-0">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <AshforgeMark className="w-12 h-12" />
              <h3 className="text-4xl font-black text-white tracking-tighter">ASHFORGE</h3>
            </div>
            <p className="text-zinc-500 max-w-sm font-medium tracking-wide leading-relaxed">
              Industrial gear for those who operate where others retreat. We engineer the gear that engineers the future.
            </p>
            <div className="flex gap-6">
              <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-[#ff3333] hover:border-[#ff3333] transition-all cursor-pointer group">
                <AshforgeMark className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
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
