import { Product, Category, Order, OrderStatus, TrackingStep } from '../types';
import { PRODUCTS, CATEGORIES, INITIAL_ORDERS } from '../data/products';

export const api = {
  // Products
  async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Not JSON (static host fallback)');
      }
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        try {
          localStorage.setItem('maroc_glow_products', JSON.stringify(data));
        } catch {
          // ignore localStorage quota errors
        }
        return data;
      }
      // If server returned empty, fallback to local storage or bundled products
      const saved = localStorage.getItem('maroc_glow_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        localStorage.removeItem('maroc_glow_products');
      }
      return PRODUCTS;
    } catch (err) {
      console.warn('Backend API unavailable (e.g. Netlify static hosting), using bundled catalog:', err);
      try {
        const saved = localStorage.getItem('maroc_glow_products');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
          localStorage.removeItem('maroc_glow_products');
        }
        return PRODUCTS;
      } catch {
        return PRODUCTS;
      }
    }
  },

  async saveProduct(product: Product): Promise<Product> {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        const saved = await res.json();
        return saved;
      }
    } catch (err) {
      console.warn('Failed to sync product to server:', err);
    }
    return product;
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch (err) {
      console.warn('Failed to delete product from server:', err);
      return false;
    }
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Not JSON (static host fallback)');
      }
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        try {
          localStorage.setItem('maroc_glow_categories', JSON.stringify(data));
        } catch {
          // ignore
        }
        return data;
      }
      const saved = localStorage.getItem('maroc_glow_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        localStorage.removeItem('maroc_glow_categories');
      }
      return CATEGORIES;
    } catch (err) {
      console.warn('Backend API unavailable for categories, using default categories:', err);
      try {
        const saved = localStorage.getItem('maroc_glow_categories');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
          localStorage.removeItem('maroc_glow_categories');
        }
        return CATEGORIES;
      } catch {
        return CATEGORIES;
      }
    }
  },

  async saveCategory(category: Category): Promise<Category> {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Failed to sync category to server:', err);
    }
    return category;
  },

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/categories/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch (err) {
      console.warn('Failed to delete category from server:', err);
      return false;
    }
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Not JSON (static host fallback)');
      }
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        try {
          localStorage.setItem('maroc_glow_orders', JSON.stringify(data));
        } catch {
          // ignore
        }
        return data;
      }
      const saved = localStorage.getItem('maroc_glow_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        localStorage.removeItem('maroc_glow_orders');
      }
      return INITIAL_ORDERS;
    } catch (err) {
      console.warn('Backend API unavailable for orders, using local orders:', err);
      try {
        const saved = localStorage.getItem('maroc_glow_orders');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
          localStorage.removeItem('maroc_glow_orders');
        }
        return INITIAL_ORDERS;
      } catch {
        return INITIAL_ORDERS;
      }
    }
  },

  async createOrder(order: Order): Promise<Order> {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const saved = await res.json();
          return saved;
        }
      }
    } catch (err) {
      console.warn('Failed to save order to server, saving locally:', err);
    }
    // Also persist into localStorage for tracking even on static host
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
      const res = await fetch(`/api/orders/${encodeURIComponent(id)}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, trackingNumber, timeline }),
      });
      return res.ok;
    } catch (err) {
      console.warn('Failed to update order status on server:', err);
      return false;
    }
  },

  async resetDatabase(): Promise<boolean> {
    try {
      const res = await fetch('/api/database/reset', {
        method: 'POST',
      });
      return res.ok;
    } catch (err) {
      console.warn('Failed to reset database on server:', err);
      return false;
    }
  },
};
