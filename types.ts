
export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  stock: 'NOMINAL' | 'CRITICAL' | 'DEPLETED';
  specs: string[];
}


export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAYMENT_SUBMITTED'
  | 'PAID_CONFIRMED'
  | 'FULFILLING'
  | 'FULFILLED'
  | 'CANCELLED';

// Snapshot of product data at the exact time of purchase
export interface OrderItem {
  productId: string;
  slug: string;
  titleAtPurchase: string;
  priceAtPurchase: number;
  qty: number;
  imageAtPurchase?: string;
}

export interface Order {
  id: string; // Unique internal uuid
  orderNumber: string; // Human readable visual tag e.g #AF-8X91
  createdAt: string; // ISO String
  status: OrderStatus;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  payment?: {
    method: 'COD' | 'BKASH_MANUAL' | 'NAGAD_MANUAL' | 'BANK_MANUAL';
    trxId?: string;
    sender?: string;
  };
}

export interface User {
  id: string; // uuid
  name: string;
  email: string;
  phone?: string;
  createdAt: string; // ISO string
}

export interface Session {
  user: User;
  token: string;
  expiresAt?: string;
}
