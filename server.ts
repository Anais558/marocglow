import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './src/db/index';
import { products, categories, orders, users } from './src/db/schema';
import { seedDatabaseIfEmpty } from './src/db/seed';
import { eq, desc } from 'drizzle-orm';
import { PRODUCTS, CATEGORIES } from './src/data/products';

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'cloudsql_postgresql', timestamp: new Date().toISOString() });
});

// API: Products
app.get('/api/products', async (req, res) => {
  try {
    const list = await db.select().from(products).orderBy(desc(products.createdAt));
    if (list && list.length > 0) {
      const formatted = list.map((p) => ({
        ...p,
        rating: parseFloat(p.rating as string) || 4.9,
      }));
      return res.json(formatted);
    }
    // Fallback to bundled products if database is empty
    res.json(PRODUCTS);
  } catch (error) {
    console.error('Error fetching products from database, serving fallback catalog:', error);
    res.json(PRODUCTS);
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const p = req.body;
    if (!p.id || !p.name || !p.priceFcfa) {
      return res.status(400).json({ error: 'Missing required product fields (id, name, priceFcfa)' });
    }

    const inserted = await db
      .insert(products)
      .values({
        id: p.id,
        name: p.name,
        brand: p.brand || 'MAROC GLOW',
        tagline: p.tagline || '',
        shortDescription: p.shortDescription || '',
        description: p.description || '',
        category: p.category || 'Soins Visage & Sérums',
        categorySlug: p.categorySlug || 'visage',
        priceFcfa: Number(p.priceFcfa),
        originalPriceFcfa: p.originalPriceFcfa ? Number(p.originalPriceFcfa) : null,
        publishDate: p.publishDate || new Date().toISOString().split('T')[0],
        formattedDate: p.formattedDate || 'Aujourd’hui',
        image: p.image || 'https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80',
        gallery: p.gallery || [p.image],
        stockQuantity: Number(p.stockQuantity) || 0,
        inStock: p.inStock ?? true,
        isNew: p.isNew ?? false,
        isBestSeller: p.isBestSeller ?? false,
        isBio: p.isBio ?? true,
        volumeOrWeight: p.volumeOrWeight || '100 ml',
        origin: p.origin || 'Maroc',
        ingredients: p.ingredients || [],
        usageAdvice: p.usageAdvice || '',
        rating: String(p.rating || 4.9),
        reviewsCount: Number(p.reviewsCount) || 0,
      })
      .onConflictDoUpdate({
        target: products.id,
        set: {
          name: p.name,
          brand: p.brand || 'MAROC GLOW',
          tagline: p.tagline || '',
          shortDescription: p.shortDescription || '',
          description: p.description || '',
          category: p.category || 'Soins Visage & Sérums',
          categorySlug: p.categorySlug || 'visage',
          priceFcfa: Number(p.priceFcfa),
          originalPriceFcfa: p.originalPriceFcfa ? Number(p.originalPriceFcfa) : null,
          image: p.image,
          gallery: p.gallery || [p.image],
          stockQuantity: Number(p.stockQuantity) || 0,
          inStock: p.inStock ?? true,
          isNew: p.isNew ?? false,
          isBestSeller: p.isBestSeller ?? false,
          isBio: p.isBio ?? true,
          volumeOrWeight: p.volumeOrWeight,
          origin: p.origin,
          ingredients: p.ingredients || [],
          usageAdvice: p.usageAdvice || '',
          rating: String(p.rating || 4.9),
          reviewsCount: Number(p.reviewsCount) || 0,
          updatedAt: new Date(),
        },
      })
      .returning();

    res.json(inserted[0]);
  } catch (error) {
    console.error('Error saving product to database:', error);
    res.status(500).json({ error: 'Failed to save product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(products).where(eq(products.id, id));
    res.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting product from database:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// API: Categories
app.get('/api/categories', async (req, res) => {
  try {
    const list = await db.select().from(categories);
    res.json(list);
  } catch (error) {
    console.error('Error fetching categories from database:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const c = req.body;
    if (!c.id || !c.name || !c.slug) {
      return res.status(400).json({ error: 'Missing required category fields (id, name, slug)' });
    }

    const inserted = await db
      .insert(categories)
      .values({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || '',
        iconName: c.iconName || null,
      })
      .onConflictDoUpdate({
        target: categories.id,
        set: {
          name: c.name,
          slug: c.slug,
          description: c.description || '',
          iconName: c.iconName || null,
        },
      })
      .returning();

    res.json(inserted[0]);
  } catch (error) {
    console.error('Error saving category to database:', error);
    res.status(500).json({ error: 'Failed to save category' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(categories).where(eq(categories.id, id));
    res.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting category from database:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// API: Orders
app.get('/api/orders', async (req, res) => {
  try {
    const list = await db.select().from(orders).orderBy(desc(orders.createdTimestamp));
    res.json(list);
  } catch (error) {
    console.error('Error fetching orders from database:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const o = req.body;
    if (!o.id || !o.customerName || !o.phone || !o.items) {
      return res.status(400).json({ error: 'Missing required order fields' });
    }

    const inserted = await db
      .insert(orders)
      .values({
        id: o.id,
        customerName: o.customerName,
        phone: o.phone,
        email: o.email || null,
        country: o.country || null,
        city: o.city,
        address: o.address,
        deliveryNotes: o.deliveryNotes || null,
        paymentMethod: o.paymentMethod,
        paymentMethodLabel: o.paymentMethodLabel,
        shippingOption: o.shippingOption || 'standard',
        airShippingDateSelected: o.airShippingDateSelected || null,
        shippingCostFcfa: Number(o.shippingCostFcfa) || 0,
        shippingCostNote: o.shippingCostNote || null,
        items: o.items,
        subtotalFcfa: Number(o.subtotalFcfa),
        discountFcfa: Number(o.discountFcfa) || 0,
        totalFcfa: Number(o.totalFcfa),
        status: o.status || 'reçue',
        createdAt: o.createdAt || new Date().toISOString(),
        formattedCreatedAt: o.formattedCreatedAt || 'Aujourd’hui',
        estimatedDelivery: o.estimatedDelivery || '24 à 48 heures',
        trackingNumber: o.trackingNumber || null,
        carrier: o.carrier || 'Transport Express Maroc',
        timeline: o.timeline || [],
      })
      .returning();

    // Decrement product stock in PostgreSQL
    if (Array.isArray(o.items)) {
      for (const item of o.items) {
        if (item?.product?.id && item?.quantity) {
          try {
            const existing = await db.select().from(products).where(eq(products.id, item.product.id)).limit(1);
            if (existing && existing.length > 0) {
              const currentStock = existing[0].stockQuantity || 0;
              const newStock = Math.max(0, currentStock - item.quantity);
              await db.update(products).set({
                stockQuantity: newStock,
                inStock: newStock > 0,
              }).where(eq(products.id, item.product.id));
            }
          } catch (stockErr) {
            console.warn('Could not update stock for product:', item.product.id, stockErr);
          }
        }
      }
    }

    res.json(inserted[0]);
  } catch (error) {
    console.error('Error creating order in database:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber, timeline } = req.body;

    const updated = await db
      .update(orders)
      .set({
        status,
        ...(trackingNumber !== undefined && { trackingNumber }),
        ...(timeline !== undefined && { timeline }),
      })
      .where(eq(orders.id, id))
      .returning();

    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// API: Reset database
app.post('/api/database/reset', async (req, res) => {
  try {
    await db.delete(products);
    await db.delete(categories);
    await db.delete(orders);
    await seedDatabaseIfEmpty();
    res.json({ success: true, message: 'Database reset to default Moroccan Wholesale catalog and orders.' });
  } catch (error) {
    console.error('Error resetting database:', error);
    res.status(500).json({ error: 'Failed to reset database' });
  }
});

async function startServer() {
  // Seed database if empty on boot
  await seedDatabaseIfEmpty();

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} with PostgreSQL database attached`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
