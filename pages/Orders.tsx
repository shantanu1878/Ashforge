import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders, ORDER_STATUS_MAP } from '../lib/orders';
import { Order } from '../types';

const Orders: React.FC = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        document.title = "ASHFORGE | Sector Logistics (Orders)";
        // Load local storage arrays
        setOrders(getOrders());
    }, []);

    if (orders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 pt-48 pb-24 min-h-[70vh] text-center flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <h1 className="text-3xl md:text-5xl font-black italic text-white tracking-tighter uppercase mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    No Operations Logged
                </h1>
                <p className="text-zinc-500 max-w-lg text-sm md:text-base font-medium tracking-wide leading-relaxed mb-8">
                    The tactical ledger shows no deployment records originating from this terminal.
                </p>
                <button
                    onClick={() => navigate('/collection')}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] md:text-xs font-black tracking-[0.2em] border border-white/10 uppercase transition-all duration-300"
                >
                    Initialize Deployment (Shop Collection)
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-16 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="mb-12 border-b border-white/10 pb-6 flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate('/')}
                        className="text-zinc-500 hover:text-white text-[10px] uppercase font-black tracking-widest transition-colors mb-4 flex items-center gap-2"
                    >
                        ← Back to HQ
                    </button>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        Ops Ledger
                    </h1>
                    <p className="text-zinc-500 mt-2 font-medium tracking-wide text-xs md:text-sm">
                        Terminal transaction history and current deployment tracking.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                {orders.map((order) => {
                    const badge = ORDER_STATUS_MAP[order.status];
                    const date = new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });

                    return (
                        <div
                            key={order.id}
                            onClick={() => navigate(`/orders/${order.id}`)}
                            className="group cursor-pointer bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Dynamic decorative hover bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff3333] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                    <span className="text-white font-mono text-lg font-bold tracking-widest uppercase">
                                        {order.orderNumber}
                                    </span>
                                    <span className={`px-2 py-0.5 text-[9px] uppercase font-black tracking-widest border border-current rounded-sm ${badge.style}`}>
                                        {badge.label}
                                    </span>
                                </div>
                                <div className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase">
                                    Logged on: {date}
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                                <div className="flex flex-col md:items-end">
                                    <span className="text-[10px] text-zinc-500 font-black tracking-widest uppercase">Total Valuation</span>
                                    <span className="text-white font-mono text-xl font-bold tracking-widest">
                                        ${order.total.toFixed(2)}
                                    </span>
                                </div>

                                <span className="text-[10px] text-[#ff3333] font-black tracking-widest group-hover:translate-x-1 transition-transform uppercase hidden md:flex items-center gap-1">
                                    View Data Log <span className="text-lg leading-none">→</span>
                                </span>
                                <span className="text-[10px] text-[#ff3333] font-black tracking-widest uppercase md:hidden border border-[#ff3333]/20 px-3 py-1">
                                    View
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Orders;
