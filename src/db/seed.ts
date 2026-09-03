import { db } from './index';
import { products, categories, orders } from './schema';
import { PRODUCTS, CATEGORIES, INITIAL_ORDERS } from '../data/products';
import { eq } from 'drizzle-orm';

export async function seedDatabaseIfEmpty() {
  try {
    // 1. Seed / Upsert Categories
    console.log('Syncing categories into PostgreSQL database...');
    for (const cat of CATEGORIES) {
      await db.insert(categories).values({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description || '',
        iconName: cat.iconName || null,
      }).onConflictDoUpdate({
        target: categories.id,
        set: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description || '',
          iconName: cat.iconName || null,
        }
      });
    }
    console.log('Categories synced successfully.');

    // 2. Sync Products into PostgreSQL
    console.log('Syncing products into PostgreSQL database...');
    for (const p of PRODUCTS) {
      await db.insert(products).values({
        id: p.id,
        name: p.name,
        brand: p.brand || 'MAROC GLOW',
        tagline: p.tagline || '',
        shortDescription: p.shortDescription || '',
        description: p.description || '',
        category: p.category,
        categorySlug: p.categorySlug,
        priceFcfa: Number(p.priceFcfa),
        originalPriceFcfa: p.originalPriceFcfa ? Number(p.originalPriceFcfa) : null,
        publishDate: p.publishDate,
        formattedDate: p.formattedDate,
        image: p.image,
        gallery: p.gallery || [p.image],
        stockQuantity: Number(p.stockQuantity) || 0,
        inStock: p.inStock ?? true,
        isNew: p.isNew ?? false,
        isBestSeller: p.isBestSeller ?? false,
        isBio: p.isBio ?? true,
        volumeOrWeight: p.volumeOrWeight || '',
        origin: p.origin || 'Maroc',
        ingredients: p.ingredients || [],
        usageAdvice: p.usageAdvice || '',
        rating: String(p.rating || 4.9),
        reviewsCount: Number(p.reviewsCount) || 0,
      }).onConflictDoNothing();
    }
    console.log('Products synced successfully.');

    // 3. Seed Orders if empty
    const existingOrders = await db.select().from(orders).limit(1);
    if (existingOrders.length === 0) {
      console.log('Seeding initial orders into PostgreSQL...');
      for (const ord of INITIAL_ORDERS) {
        await db.insert(orders).values({
          id: ord.id,
          customerName: ord.customerName,
          phone: ord.phone,
          email: ord.email || null,
          city: ord.city,
          address: ord.address,
          deliveryNotes: ord.deliveryNotes || null,
          paymentMethod: ord.paymentMethod,
          paymentMethodLabel: ord.paymentMethodLabel,
          shippingOption: ord.shippingOption,
          shippingCostFcfa: ord.shippingCostFcfa,
          items: ord.items,
          subtotalFcfa: ord.subtotalFcfa,
          discountFcfa: ord.discountFcfa,
          totalFcfa: ord.totalFcfa,
          status: ord.status,
          createdAt: ord.createdAt,
          formattedCreatedAt: ord.formattedCreatedAt,
          estimatedDelivery: ord.estimatedDelivery,
          trackingNumber: ord.trackingNumber || null,
          carrier: ord.carrier || null,
          timeline: ord.timeline,
        }).onConflictDoNothing();
      }
      console.log('Initial orders seeded successfully.');
    }
  } catch (error) {
    console.error('Database seeding error (non-fatal):', error);
  }
}
