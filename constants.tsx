
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'unit-001',
    sku: 'AF-QS-99',
    slug: 'frostline-vector',
    name: 'Frostline Vector',
    category: 'Precision Mastery',
    description: 'High-visibility metallic grey with precision-etched textures designed to reflect the pursuit of perfection. Engineered for low-drag operations and maximum agility.',
    price: 799,
    image: '/Frostline Vector .jpeg',
    images: [
      '/Frostline Vector .jpeg',
      // 'https://picsum.photos/seed/forge1b/800/1000',
      // 'https://picsum.photos/seed/forge1c/800/1000'
    ],
    stock: 'NOMINAL',
    specs: ['99.9% Titanium Alloy', 'Zero-friction Coating', 'Dynamic Thermal Venting']
  },
  {
    id: 'unit-002',
    sku: 'AF-CT-88',
    slug: 'bloodforge-apex',
    name: 'Bloodforge Apex',
    category: 'Thermal Regulation',
    description: 'Industrial blue performance set utilizing hexagonal conduits to dissipate heat like a high-performance engine. Built for sustained high-intensity environments.',
    price: 799,
    image: '/Bloodforge Apex.jpeg',
    images: [
      '/Bloodforge Apex.jpeg',
      // 'https://picsum.photos/seed/forge2b/800/1000'
    ],
    stock: 'CRITICAL',
    specs: ['Hex-Grid Cooling', 'Impact Resistance Level 4', 'Smart Fiber Integration']
  },
  {
    id: 'unit-003',
    sku: 'AF-EE-77',
    slug: 'ember-edge',
    name: 'Ember Edge',
    category: 'Peak Aggression',
    description: 'Our most aggressive design, featuring deep red panels that mimic the glow of a furnace at full tilt. Command authority in any tactical or industrial theatre.',
    price: 799,
    image: '/product-ember.jpg',
    images: [
      '/product-ember.jpg',
      // 'https://picsum.photos/seed/forge3b/800/1000'
    ],
    stock: 'DEPLETED',
    specs: ['Magma-Resistant Polymer', 'Reinforced Outer Shell', 'Adaptive HUD Connectivity']
  }
];
