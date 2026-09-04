import { createClient } from '@supabase/supabase-js';
import { Product, Category, Order } from '../types';

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://zhfxbfdgtfmwzjtdfoly.supabase.co';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_xvK0PJcTKoRrwx5a73ScDg_No2dKbXi';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function mapSupabaseProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand || 'Maroc Glow',
    tagline: row.tagline || '',
    shortDescription: row.short_description || '',
    description: row.description || '',
    category: row.category,
    categorySlug: row.category_slug,
    priceFcfa: Number(row.price_fcfa) || 0,
    originalPriceFcfa: row.original_price_fcfa ? Number(row.original_price_fcfa) : undefined,
    publishDate: row.publish_date || '',
    formattedDate: row.formatted_date || '',
    image: row.image,
    gallery: Array.isArray(row.gallery) && row.gallery.length > 0 ? row.gallery : [row.image],
    stockQuantity: Number(row.stock_quantity) || 0,
    inStock: Boolean(row.in_stock),
    isNew: Boolean(row.is_new),
    isBestSeller: Boolean(row.is_best_seller),
    isBio: Boolean(row.is_bio),
    volumeOrWeight: row.volume_or_weight || '',
    origin: row.origin || 'Maroc',
    ingredients: Array.isArray(row.ingredients) ? row.ingredients : [],
    usageAdvice: row.usage_advice || '',
    rating: parseFloat(row.rating) || 4.9,
    reviewsCount: Number(row.reviews_count) || 0,
  };
}

export function productToSupabase(p: Partial<Product>) {
  const row: Record<string, any> = {};
  if (p.id !== undefined) row.id = p.id;
  if (p.name !== undefined) row.name = p.name;
  if (p.brand !== undefined) row.brand = p.brand;
  if (p.tagline !== undefined) row.tagline = p.tagline;
  if (p.shortDescription !== undefined) row.short_description = p.shortDescription;
  if (p.description !== undefined) row.description = p.description;
  if (p.category !== undefined) row.category = p.category;
  if (p.categorySlug !== undefined) row.category_slug = p.categorySlug;
  if (p.priceFcfa !== undefined) row.price_fcfa = Number(p.priceFcfa);
  if (p.originalPriceFcfa !== undefined) row.original_price_fcfa = p.originalPriceFcfa ? Number(p.originalPriceFcfa) : null;
  if (p.publishDate !== undefined) row.publish_date = p.publishDate;
  if (p.formattedDate !== undefined) row.formatted_date = p.formattedDate;
  if (p.image !== undefined) row.image = p.image;
  if (p.gallery !== undefined) row.gallery = p.gallery;
  if (p.stockQuantity !== undefined) row.stock_quantity = Number(p.stockQuantity);
  if (p.inStock !== undefined) row.in_stock = Boolean(p.inStock);
  if (p.isNew !== undefined) row.is_new = Boolean(p.isNew);
  if (p.isBestSeller !== undefined) row.is_best_seller = Boolean(p.isBestSeller);
  if (p.isBio !== undefined) row.is_bio = Boolean(p.isBio);
  if (p.volumeOrWeight !== undefined) row.volume_or_weight = p.volumeOrWeight;
  if (p.origin !== undefined) row.origin = p.origin;
  if (p.ingredients !== undefined) row.ingredients = p.ingredients;
  if (p.usageAdvice !== undefined) row.usage_advice = p.usageAdvice;
  if (p.rating !== undefined) row.rating = Number(p.rating);
  if (p.reviewsCount !== undefined) row.reviews_count = Number(p.reviewsCount);
  return row;
}

export function mapSupabaseCategory(row: any): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    iconName: row.icon_name || undefined,
  };
}

export function categoryToSupabase(c: Partial<Category>) {
  const row: Record<string, any> = {};
  if (c.id !== undefined) row.id = c.id;
  if (c.name !== undefined) row.name = c.name;
  if (c.slug !== undefined) row.slug = c.slug;
  if (c.description !== undefined) row.description = c.description;
  if (c.iconName !== undefined) row.icon_name = c.iconName;
  return row;
}

export function mapSupabaseOrder(row: any): Order {
  return {
    id: row.id,
    customerName: row.customer_name || 'Client',
    phone: row.phone || '',
    email: row.email || undefined,
    country: row.country || 'Côte d’Ivoire',
    city: row.city || 'Abidjan',
    address: row.address || '',
    deliveryNotes: row.notes || undefined,
    paymentMethod: row.payment_method || 'cash_on_delivery',
    paymentMethodLabel: row.payment_method || 'Paiement à la livraison',
    shippingOption: 'standard',
    shippingCostFcfa: 0,
    items: Array.isArray(row.items) ? row.items : [],
    subtotalFcfa: Number(row.total_fcfa) || 0,
    discountFcfa: 0,
    totalFcfa: Number(row.total_fcfa) || 0,
    status: row.status || 'reçue',
    createdAt: row.created_at || new Date().toISOString(),
    formattedCreatedAt: row.formatted_created_at || 'Aujourd’hui',
    estimatedDelivery: '24 à 48 heures',
    timeline: Array.isArray(row.timeline) ? row.timeline : [],
  };
}

export function orderToSupabase(o: Order) {
  return {
    id: o.id,
    customer_name: o.customerName,
    phone: o.phone,
    city: o.city || 'Abidjan',
    address: o.address || '',
    notes: o.deliveryNotes || '',
    items: o.items || [],
    total_fcfa: Number(o.totalFcfa) || 0,
    status: o.status || 'reçue',
    payment_method: o.paymentMethodLabel || o.paymentMethod || 'Paiement à la livraison',
    created_at: o.createdAt || new Date().toISOString(),
    formatted_created_at: o.formattedCreatedAt || 'Aujourd’hui',
    created_timestamp: Date.now(),
    timeline: o.timeline || [],
  };
}
