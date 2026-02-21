import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, ORDER_STATUS_MAP } from '../lib/orders';
import { Order, CartItem } from '../types';

interface OrderDetailProps {
    onReorder: (items: CartItem[]) => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ onReorder }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (id) {
            const found = getOrderById(id);
            if (found) {
                setOrder(found);
                document.title = `ASHFORGE | Order ${found.orderNumber}`;
            }
        }
    }, [id]);

    if (!order) {
        return (
            <div className="max-w-7xl mx-auto px-6 pt-48 pb-24 min-h-[70vh] text-center flex flex-col items-center justify-center animate-in fade-in duration-1000">
                <h1 className="text-4xl font-black text-[#ff3333] tracking-tighter mb-4 uppercase">
                    Transmission Lost
                </h1>
                <p className="text-zinc-500 max-w-lg text-lg font-medium tracking-wide leading-relaxed mb-8">
                    The requested data packet [{id}] could not be extracted from local registry.
                </p>
                <button
                    onClick={() => navigate('/orders')}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-black tracking-widest border border-white/10 uppercase transition-all duration-300"
                >
                    Return to Registry
                </button>
            </div>
        );
    }

    const badge = ORDER_STATUS_MAP[order.status];
    const dateStr = new Date(order.createdAt).toLocaleString();

    const handleReorder = () => {
        // Map OrderItem snapshots back into active CartItem objects.
        // NOTE: This assumes catalog availability matching the slug.
        const cartMocks: CartItem[] = order.items.map(item => ({
            id: item.productId,
            sku: `REORDER-${item.productId.substring(0, 4).toUpperCase()}`,
            slug: item.slug,
            name: item.titleAtPurchase,
            category: 'REORDERED', // placeholder
            description: 'Retrieved from transaction history.',
            price: item.priceAtPurchase,
            image: item.imageAtPurchase || '',
            images: item.imageAtPurchase ? [item.imageAtPurchase] : [],
            stock: 'NOMINAL', // optimistic UI assumption
            specs: [],
            quantity: item.qty
        }));

        onReorder(cartMocks);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-16 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-700">

            {/* Navigation Headers */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6 gap-6">
                <div>
                    <button
                        onClick={() => navigate('/orders')}
                        className="text-zinc-500 hover:text-white text-[10px] uppercase font-black tracking-widest transition-colors mb-4 flex items-center gap-2"
                    >
                        ← System Registry
                    </button>

                    <div className="flex items-center gap-4 flex-wrap">
                        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            Data Packet
                        </h1>
                        <span className={`px-3 py-1 text-[10px] md:text-xs font-black tracking-widest border border-current uppercase rounded-sm ${badge.style}`}>
                            {badge.label}
                        </span>
                    </div>
                    <p className="text-zinc-500 mt-2 font-mono tracking-widest text-[10px] md:text-xs">
                        Ref: <span className="text-white">{order.orderNumber}</span> // Auth: {dateStr}
                    </p>
                </div>

                <button
                    onClick={handleReorder}
                    className="group relative px-6 py-2.5 bg-transparent border border-[#ff3333] text-white font-bold tracking-widest text-[10px] uppercase transition-all hover:bg-[#ff3333]/10 hover:shadow-[0_0_20px_rgba(255,51,51,0.4)] whitespace-nowrap"
                >
                    RE-INITIALIZE PROTOCOL
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Left Col: Items */}
                <div className="col-span-1 md:col-span-2 space-y-8">
                    <h3 className="text-lg font-black text-white italic tracking-tighter uppercase mb-6 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-[#ff3333]"></span>
                        Asset Manifest
                    </h3>

                    <div className="space-y-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 p-4 bg-white/5 border border-white/10 items-center">
                                {item.imageAtPurchase ? (
                                    <div className="w-16 h-16 bg-black/50 border border-white/5 flex items-center justify-center p-2 rounded shrink-0">
                                        <img src={item.imageAtPurchase} alt={item.titleAtPurchase} className="max-w-full max-h-full object-contain" />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 bg-black/50 border border-white/5 flex items-center justify-center shrink-0">
                                        <span className="text-zinc-600 text-[8px] uppercase tracking-widest text-center px-1">NO FEED</span>
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-tight truncate">
                                        {item.titleAtPurchase}
                                    </h4>
                                    <p className="text-zinc-500 text-[10px] font-mono mt-1">QTY: {item.qty}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-white font-mono font-black text-sm md:text-base">${(item.priceAtPurchase * item.qty).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Col: Logistics */}
                <div className="space-y-12">
                    <div>
                        <h3 className="text-sm font-black text-white tracking-widest uppercase mb-4 opacity-50">Logistics Dest</h3>
                        <div className="text-xs text-zinc-400 font-medium leading-loose">
                            <p className="text-white uppercase object-contain mb-1">{order.customer.name}</p>
                            <p>{order.customer.address}</p>
                            <p className="font-mono mt-2 text-[#ff3333]/80">COMMS: {order.customer.phone}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-black text-white tracking-widest uppercase mb-4 opacity-50">Transaction Hash</h3>
                        <div className="space-y-2 text-xs font-mono tracking-widest border-b border-white/10 pb-4 mb-4">
                            <div className="flex justify-between">
                                <span className="text-zinc-500">SUBTOTAL</span>
                                <span className="text-white">${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">DROPSHIP FEE</span>
                                <span className="text-white">${order.shippingFee.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-4 border border-[#ff3333]/20">
                            <span className="text-xs font-black tracking-widest uppercase text-[#ff3333]">Net Value</span>
                            <span className="text-xl font-mono font-black text-white">${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
