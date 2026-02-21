import { Order, OrderStatus } from '../types';

const STORAGE_KEY = 'ashforge_orders_v1';

/**
 * Robust JSON extraction wrapper
 */
export const getOrders = (): Order[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);

        // Safety check that this is actually an array
        if (!Array.isArray(parsed)) {
            console.warn('Recovered Ashforge Orders array was corrupt. Resetting.');
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
            return [];
        }

        // Sort newest first
        return parsed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
        console.error('Failed to parse Ashforge Orders from localStorage:', err);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([])); // Reset corrupt state
        return [];
    }
};

export const getOrderById = (id: string): Order | undefined => {
    const orders = getOrders();
    return orders.find(o => o.id === id);
};

export const saveOrder = (order: Order): void => {
    try {
        const orders = getOrders();
        orders.push(order);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
        console.error('Failed to save order to localStorage:', err);
    }
};

export const generateOrderNumber = (): string => {
    // Generate a random 4 string alphanumeric
    const hash = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `#AF-${hash}`;
};

/**
 * UI State Maps for Status Badges
 */
export const ORDER_STATUS_MAP: Record<OrderStatus, { label: string; style: string }> = {
    PENDING_PAYMENT: {
        label: 'Awaiting Payment',
        style: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    },
    PAYMENT_SUBMITTED: {
        label: 'Submitted for Review',
        style: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    },
    PAID_CONFIRMED: {
        label: 'Payment Confirmed',
        style: 'bg-green-500/10 text-green-500 border-green-500/20'
    },
    FULFILLING: {
        label: 'Processing in Sector',
        style: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    },
    FULFILLED: {
        label: 'Deployed',
        style: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
    },
    CANCELLED: {
        label: 'Connection Terminated',
        style: 'bg-[#ff3333]/10 text-[#ff3333] border-[#ff3333]/20'
    }
};
