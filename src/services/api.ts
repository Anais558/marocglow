import { Product, Category, Order, OrderStatus, TrackingStep } from '../types';

export const api = {
  // Products
  async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        try {
          localStorage.setItem('maroc_glow_products', JSON.stringify(data));
        } catch {
          // ignore localStorage quota errors
        }
        return data;
      }
      return [];
    } catch (err) {
      console.warn('Backend API unavailable for products, fallback to localStorage cache:', err);
      try {
        const saved = localStorage.getItem('maroc_glow_products');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
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
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        try {
          localStorage.setItem('maroc_glow_categories', JSON.stringify(data));
        } catch {
          // ignore
        }
        return data;
      }
      return [];
    } catch (err) {
      console.warn('Backend API unavailable for categories, fallback to localStorage cache:', err);
      try {
        const saved = localStorage.getItem('maroc_glow_categories');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
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
      const data = await res.json();
      if (Array.isArray(data)) {
        try {
          localStorage.setItem('maroc_glow_orders', JSON.stringify(data));
        } catch {
          // ignore
        }
        return data;
      }
      return [];
    } catch (err) {
      console.warn('Backend API unavailable for orders, fallback to localStorage cache:', err);
      try {
        const saved = localStorage.getItem('maroc_glow_orders');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
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
        return await res.json();
      }
    } catch (err) {
      console.warn('Failed to save order to server:', err);
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
