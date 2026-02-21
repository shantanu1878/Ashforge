import { PRODUCTS } from '../constants';
import { Product } from '../types';

export function getProductBySlug(slug: string): Product | undefined {
    return PRODUCTS.find((product) => product.slug === slug);
}
