
import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, CheckCircle2, ArrowRight, Lock } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onComplete: () => void;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = 250.00; // Updated for Taka scale
  const total = subtotal + tax + shipping;

  const renderStepIcon = (s: number, Icon: any) => (
    <div className={`w-10 h-10 flex items-center justify-center border-2 transition-colors ${step >= s ? 'border-[#ff3333] text-[#ff3333]' : 'border-zinc-800 text-zinc-600'}`}>
      <Icon size={18} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Main Flow */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-8 mb-16 overflow-x-auto pb-4">
            <div className="flex items-center gap-3">
              {renderStepIcon(1, Truck)}
              <span className={`text-[10px] font-black tracking-widest whitespace-nowrap ${step >= 1 ? 'text-white' : 'text-zinc-600'}`}>01 LOGISTICS</span>
            </div>
            <div className="h-px w-8 bg-zinc-800" />
            <div className="flex items-center gap-3">
              {renderStepIcon(2, CreditCard)}
              <span className={`text-[10px] font-black tracking-widest whitespace-nowrap ${step >= 2 ? 'text-white' : 'text-zinc-600'}`}>02 PAYMENT</span>
            </div>
            <div className="h-px w-8 bg-zinc-800" />
            <div className="flex items-center gap-3">
              {renderStepIcon(3, CheckCircle2)}
              <span className={`text-[10px] font-black tracking-widest whitespace-nowrap ${step >= 3 ? 'text-white' : 'text-zinc-600'}`}>03 VERIFICATION</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Deployment Destination</h2>
              <div className="grid grid-cols-2 gap-6">
                <input placeholder="GIVEN NAME" className="col-span-1 bg-transparent border-b border-zinc-800 p-4 text-sm focus:border-[#ff3333] outline-none text-white font-mono" />
                <input placeholder="FAMILY NAME" className="col-span-1 bg-transparent border-b border-zinc-800 p-4 text-sm focus:border-[#ff3333] outline-none text-white font-mono" />
                <input placeholder="GRID COORDINATES (STREET)" className="col-span-2 bg-transparent border-b border-zinc-800 p-4 text-sm focus:border-[#ff3333] outline-none text-white font-mono" />
                <input placeholder="SECTOR (CITY)" className="col-span-1 bg-transparent border-b border-zinc-800 p-4 text-sm focus:border-[#ff3333] outline-none text-white font-mono" />
                <input placeholder="POSTAL CODE" className="col-span-1 bg-transparent border-b border-zinc-800 p-4 text-sm focus:border-[#ff3333] outline-none text-white font-mono" />
              </div>
              <div className="flex justify-between items-center pt-8">
                <button onClick={onBack} className="text-zinc-500 text-[10px] font-black tracking-[0.2em] hover:text-white uppercase transition-colors">Abort Mission</button>
                <button 
                  onClick={() => setStep(2)}
                  className="bg-[#ff3333] text-white px-8 py-4 font-black tracking-[0.2em] flex items-center gap-2 group transition-all"
                >
                  NEXT PROTOCOL
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Credit Credentials</h2>
              <div className="grid grid-cols-2 gap-6 p-8 border border-[#ff3333]/20 bg-zinc-900/30">
                 <input placeholder="CARD NUMBER" className="col-span-2 bg-transparent border-b border-zinc-800 p-4 text-sm focus:border-[#ff3333] outline-none text-white font-mono" />
                 <input placeholder="EXPIRY MM/YY" className="col-span-1 bg-transparent border-b border-zinc-800 p-4 text-sm focus:border-[#ff3333] outline-none text-white font-mono" />
                 <input placeholder="CVV" className="col-span-1 bg-transparent border-b border-zinc-800 p-4 text-sm focus:border-[#ff3333] outline-none text-white font-mono" />
              </div>
              <div className="flex items-center gap-3 text-zinc-600">
                <Lock size={14} />
                <span className="text-[10px] font-black tracking-widest uppercase">Encrypted Neural-Link Secure</span>
              </div>
              <div className="flex justify-between items-center pt-8">
                <button onClick={() => setStep(1)} className="text-zinc-500 text-[10px] font-black tracking-[0.2em] hover:text-white uppercase transition-colors">Revisit Logistics</button>
                <button 
                  onClick={() => setStep(3)}
                  className="bg-[#ff3333] text-white px-8 py-4 font-black tracking-[0.2em] flex items-center gap-2 group"
                >
                  FINALIZE ACQUISITION
                  <ShieldCheck size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-20 space-y-6 animate-in zoom-in-95 duration-700">
              <div className="w-24 h-24 border-4 border-[#ff3333] flex items-center justify-center mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-[#ff3333] blur-xl opacity-20" />
                <CheckCircle2 size={48} className="text-[#ff3333]" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Transmission Success</h2>
              <p className="text-zinc-500 font-medium tracking-wide max-w-sm mx-auto">
                Units are being forged. Diagnostic confirmation sent to your registered neural-link.
              </p>
              <button 
                onClick={onComplete}
                className="mt-12 border-2 border-white text-white px-12 py-5 font-black tracking-[0.3em] hover:bg-white hover:text-black transition-all"
              >
                RETURN TO HQ
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#121212]/80 border border-zinc-800 p-8 sticky top-32">
            <h3 className="text-xs font-black tracking-[0.3em] text-zinc-500 uppercase mb-8">Manifest Summary</h3>
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-16 bg-zinc-900 border border-zinc-800 shrink-0 overflow-hidden">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white leading-tight uppercase mb-1">{item.name}</p>
                      <p className="text-[10px] text-zinc-600 font-mono">QTY: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">{(item.price * item.quantity).toFixed(0)} Taka</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-6 border-t border-zinc-800">
              <div className="flex justify-between text-[10px] font-black tracking-widest">
                <span className="text-zinc-600 uppercase">Investment Subtotal</span>
                <span className="text-white">{subtotal.toLocaleString()} Taka</span>
              </div>
              <div className="flex justify-between text-[10px] font-black tracking-widest">
                <span className="text-zinc-600 uppercase">Sector Logistics</span>
                <span className="text-white">{shipping.toFixed(0)} Taka</span>
              </div>
              <div className="flex justify-between text-[10px] font-black tracking-widest">
                <span className="text-zinc-600 uppercase">Transmission Levies</span>
                <span className="text-white">{tax.toLocaleString(undefined, {maximumFractionDigits: 0})} Taka</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-[#ff3333]/30">
                <span className="text-xs font-black tracking-[0.3em] text-[#ff3333] uppercase">Grand Total</span>
                <span className="text-xl font-black text-white">{total.toLocaleString(undefined, {maximumFractionDigits: 0})} Taka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
