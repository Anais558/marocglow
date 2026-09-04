import { Product, Category, Order, OrderStatus, TrackingStep } from '../types';
import { PRODUCTS, CATEGORIES, INITIAL_ORDERS } from '../data/products';
import {
  supabase,
  mapSupabaseProduct,
  productToSupabase,
  mapSupabaseCategory,
  categoryToSupabase,
  mapSupabaseOrder,
  orderToSupabase,
} from '../lib/supabase';

export const api = {
  // Products
  async getProducts(): Promise<Product[]> {
    // 1. Try fetching from Supabase first (works everywhere, including Netlify)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map(mapSupabaseProduct);
        try {
          localStorage.setItem('maroc_glow_products', JSON.stringify(mapped));
        } catch {
          // ignore storage quota
        }
        return mapped;
      }
    } catch (err) {
      console.warn('Supabase fetch failed, trying fallback:', err);
    }

    // 2. Try fetching from local Express server if running
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            try {
              localStorage.setItem('maroc_glow_products', JSON.stringify(data));
            } catch {
              // ignore
            }
            return data;
          }
        }
      }
    } catch {
      // ignore
    }

    // 3. Fallback to localStorage or bundled PRODUCTS
    try {
      const saved = localStorage.getItem('maroc_glow_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }

    return PRODUCTS;
  },

  async saveProduct(product: Product): Promise<Product> {
    // 1. Save to Supabase
    try {
      const row = productToSupabase(product);
      const { error } = await supabase.from('products').upsert(row);
      if (error) {
        console.warn('Supabase product upsert error:', error);
      }
    } catch (err) {
      console.warn('Failed to upsert product in Supabase:', err);
    }

    // 2. Also notify local Express server if present
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
    } catch {
      // ignore
    }

    return product;
  },

  async deleteProduct(id: string): Promise<boolean> {
    // 1. Delete in Supabase
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) console.warn('Supabase delete error:', error);
    } catch (err) {
      console.warn('Failed to delete product in Supabase:', err);
    }

    // 2. Notify local Express server if present
    try {
      await fetch(`/api/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch {
      // ignore
    }

    return true;
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    // 1. Try fetching from Supabase
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map(mapSupabaseCategory);
        // Ensure "Tous les produits" is present
        const hasAll = mapped.some((c) => c.slug === 'all');
        const finalCategories = hasAll
          ? mapped
          : [{ id: 'all', name: 'Tous les produits', slug: 'all', description: 'Explorez tout notre univers' }, ...mapped];

        try {
          localStorage.setItem('maroc_glow_categories', JSON.stringify(finalCategories));
        } catch {
          // ignore
        }
        return finalCategories;
      }
    } catch (err) {
      console.warn('Supabase categories fetch failed:', err);
    }

    // 2. Try fetching from local Express server
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            return data;
          }
        }
      }
    } catch {
      // ignore
    }

    // 3. Fallback to localStorage or bundled CATEGORIES
    try {
      const saved = localStorage.getItem('maroc_glow_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }

    return CATEGORIES;
  },

  async saveCategory(category: Category): Promise<Category> {
    try {
      const row = categoryToSupabase(category);
      await supabase.from('categories').upsert(row);
    } catch (err) {
      console.warn('Failed to save category to Supabase:', err);
    }

    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });
    } catch {
      // ignore
    }

    return category;
  },

  async deleteCategory(id: string): Promise<boolean> {
    try {
      await supabase.from('categories').delete().eq('id', id);
    } catch (err) {
      console.warn('Failed to delete category from Supabase:', err);
    }

    try {
      await fetch(`/api/categories/${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch {
      // ignore
    }

    return true;
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    // 1. Try fetching from Supabase
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_timestamp', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map(mapSupabaseOrder);
        try {
          localStorage.setItem('maroc_glow_orders', JSON.stringify(mapped));
        } catch {
          // ignore
        }
        return mapped;
      }
    } catch (err) {
      console.warn('Supabase orders fetch error:', err);
    }

    // 2. Try fetching from local Express server
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            return data;
          }
        }
      }
    } catch {
      // ignore
    }

    // 3. Fallback
    try {
      const saved = localStorage.getItem('maroc_glow_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }

    return INITIAL_ORDERS;
  },

  async createOrder(order: Order): Promise<Order> {
    // 1. Save directly to Supabase
    try {
      const payload = orderToSupabase(order);
      const { error } = await supabase.from('orders').insert(payload);
      if (error) {
        console.warn('Supabase order insert warning:', error);
      } else {
        // Decrement product stocks in Supabase
        if (Array.isArray(order.items)) {
          for (const item of order.items) {
            if (item?.product?.id && item?.quantity) {
              try {
                const { data: currentP } = await supabase
                  .from('products')
                  .select('stock_quantity')
                  .eq('id', item.product.id)
                  .single();
                if (currentP) {
                  const newStock = Math.max(0, (currentP.stock_quantity || 0) - item.quantity);
                  await supabase
                    .from('products')
                    .update({ stock_quantity: newStock, in_stock: newStock > 0 })
                    .eq('id', item.product.id);
                }
              } catch {
                // non-blocking
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn('Failed to save order to Supabase:', err);
    }

    // 2. Also notify local Express server if active
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
    } catch {
      // ignore
    }

    // 3. Persist into localStorage for immediate tracking
    try {
      const saved = localStorage.getItem('maroc_glow_orders');
      const currentOrders = saved ? JSON.parse(saved) : INITIAL_ORDERS;
      const updated = [order, ...currentOrders.filter((o: Order) => o.id !== order.id)];
      localStorage.setItem('maroc_glow_orders', JSON.stringify(updated));
    } catch {
      // ignore
    }

    return order;
  },

  async updateOrderStatus(id: string, status: OrderStatus, trackingNumber?: string, timeline?: TrackingStep[]): Promise<boolean> {
    try {
      const updateData: Record<string, any> = { status };
      if (trackingNumber) updateData.tracking_number = trackingNumber;
      if (timeline) updateData.timeline = timeline;

      await supabase.from('orders').update(updateData).eq('id', id);
    } catch (err) {
      console.warn('Failed to update order status in Supabase:', err);
    }

    try {
      await fetch(`/api/orders/${encodeURIComponent(id)}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, trackingNumber, timeline }),
      });
    } catch {
      // ignore
    }

    return true;
  },

  async resetDatabase(): Promise<boolean> {
    try {
      const res = await fetch('/api/database/reset', { method: 'POST' });
      return res.ok;
    } catch {
      return false;
    }
  },
};
