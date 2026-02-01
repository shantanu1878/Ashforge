
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'unit-001',
    sku: 'AF-QS-99',
    name: 'Quicksilver Cast',
    category: 'Precision Mastery',
    description: 'High-visibility metallic grey with precision-etched textures designed to reflect the pursuit of perfection. Engineered for low-drag operations and maximum agility.',
    price: 1799,
    image: '/product-quicksilver.jpg',
    images: [
      '/product-quicksilver.jpg',
      'https://picsum.photos/seed/forge1b/800/1000',
      'https://picsum.photos/seed/forge1c/800/1000'
    ],
    stock: 'NOMINAL',
    specs: ['99.9% Titanium Alloy', 'Zero-friction Coating', 'Dynamic Thermal Venting']
  },
  {
    id: 'unit-002',
    sku: 'AF-CT-88',
    name: 'Cobalt Temper',
    category: 'Thermal Regulation',
    description: 'Industrial blue performance set utilizing hexagonal conduits to dissipate heat like a high-performance engine. Built for sustained high-intensity environments.',
    price: 2450,
    image: '/product-cobalt.jpg',
    images: [
      '/product-cobalt.jpg',
      'https://picsum.photos/seed/forge2b/800/1000'
    ],
    stock: 'CRITICAL',
    specs: ['Hex-Grid Cooling', 'Impact Resistance Level 4', 'Smart Fiber Integration']
  },
  {
    id: 'unit-003',
    sku: 'AF-EE-77',
    name: 'Ember Edge',
    category: 'Peak Aggression',
    description: 'Our most aggressive design, featuring deep red panels that mimic the glow of a furnace at full tilt. Command authority in any tactical or industrial theatre.',
    price: 3100,
    image: '/product-ember.jpg',
    images: [
      '/product-ember.jpg',
      'https://picsum.photos/seed/forge3b/800/1000'
    ],
    stock: 'NOMINAL',
    specs: ['Magma-Resistant Polymer', 'Reinforced Outer Shell', 'Adaptive HUD Connectivity']
  },
  {
    id: 'unit-004',
    sku: 'AF-VX-12',
    name: 'Vortex Core',
    category: 'Aero Dynamics',
    description: 'A masterpiece of fluid dynamics, the Vortex Core features matte charcoal finishes with oscillating air-flow channels for extreme cooling.',
    price: 1550,
    image: 'https://picsum.photos/seed/forge4/800/1000',
    images: [
      'https://picsum.photos/seed/forge4/800/1000'
    ],
    stock: 'DEPLETED',
    specs: ['Air-flow Optimization', 'Lightweight Carbon Fiber', 'Quick-Release Fasteners']
  }
];
