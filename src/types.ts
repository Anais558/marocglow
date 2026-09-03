export type OrderStatus = 'reçue' | 'confirmée' | 'préparation' | 'expédiée' | 'livrée';

export type Currency = 'FCFA' | 'EUR';

export interface Product {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  shortDescription: string;
  description: string;
  category: string;
  categorySlug: string;
  priceFcfa: number;
  originalPriceFcfa?: number;
  publishDate: string; // e.g. "2026-08-28"
  formattedDate: string; // e.g. "28 Août 2026"
  image: string;
  gallery: string[];
  stockQuantity: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isBio?: boolean;
  volumeOrWeight: string;
  origin: string;
  ingredients: string[];
  usageAdvice: string;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TrackingStep {
  step: OrderStatus;
  label: string;
  description: string;
  date?: string;
  time?: string;
  completed: boolean;
  current: boolean;
}

export interface AirShippingSchedule {
  dates: string[];
  note?: string;
  updatedAt?: string;
}

export interface Order {
  id: string; // e.g. "MG-2026-9284"
  customerName: string;
  phone: string;
  email?: string;
  country?: string;
  city: string;
  address: string;
  deliveryNotes?: string;
  paymentMethod?: string;
  paymentMethodLabel?: string;
  shippingOption: 'routiere' | 'aerienne' | 'standard' | 'express';
  shippingOptionLabel?: string;
  airShippingDateSelected?: string;
  shippingCostFcfa: number; // 0 car à définir ultérieurement
  shippingCostNote?: string;
  items: CartItem[];
  subtotalFcfa: number;
  discountFcfa: number;
  totalFcfa: number;
  status: OrderStatus;
  createdAt: string;
  formattedCreatedAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  carrier?: string;
  timeline: TrackingStep[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
}

export type ViewMode = 'catalogue' | 'product_detail' | 'checkout' | 'tracking' | 'order_success' | 'admin';
