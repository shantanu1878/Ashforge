
export interface Product {
  id: string;
  sku: string;
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

export type AppView = 'SHOP' | 'PDP' | 'CHECKOUT' | 'ABOUT' | 'CONTACT';
