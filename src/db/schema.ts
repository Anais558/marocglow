import { pgTable, text, integer, boolean, numeric, timestamp, jsonb, serial } from 'drizzle-orm/pg-core';

// Users table for authentication and admin role management
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  role: text('role').default('admin'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Products table
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  brand: text('brand').notNull().default('Maroc Glow'),
  tagline: text('tagline').notNull().default(''),
  shortDescription: text('short_description').notNull().default(''),
  description: text('description').notNull().default(''),
  category: text('category').notNull(),
  categorySlug: text('category_slug').notNull(),
  priceFcfa: integer('price_fcfa').notNull(),
  originalPriceFcfa: integer('original_price_fcfa'),
  publishDate: text('publish_date').notNull(),
  formattedDate: text('formatted_date').notNull(),
  image: text('image').notNull(),
  gallery: jsonb('gallery').$type<string[]>().default([]),
  stockQuantity: integer('stock_quantity').notNull().default(50),
  inStock: boolean('in_stock').notNull().default(true),
  isNew: boolean('is_new').default(false),
  isBestSeller: boolean('is_best_seller').default(false),
  isBio: boolean('is_bio').default(true),
  volumeOrWeight: text('volume_or_weight').notNull().default(''),
  origin: text('origin').notNull().default('Maroc'),
  ingredients: jsonb('ingredients').$type<string[]>().default([]),
  usageAdvice: text('usage_advice').notNull().default(''),
  rating: numeric('rating', { precision: 3, scale: 2 }).notNull().default('4.9'),
  reviewsCount: integer('reviews_count').notNull().default(12),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Categories table
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description').notNull().default(''),
  iconName: text('icon_name'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Orders table
export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  country: text('country'),
  city: text('city').notNull(),
  address: text('address').notNull(),
  deliveryNotes: text('delivery_notes'),
  paymentMethod: text('payment_method').notNull(),
  paymentMethodLabel: text('payment_method_label').notNull(),
  shippingOption: text('shipping_option').notNull().default('standard'),
  airShippingDateSelected: text('air_shipping_date_selected'),
  shippingCostFcfa: integer('shipping_cost_fcfa').notNull().default(0),
  shippingCostNote: text('shipping_cost_note'),
  items: jsonb('items').notNull().default([]),
  subtotalFcfa: integer('subtotal_fcfa').notNull(),
  discountFcfa: integer('discount_fcfa').notNull().default(0),
  totalFcfa: integer('total_fcfa').notNull(),
  status: text('status').notNull().default('reçue'),
  createdAt: text('created_at').notNull(),
  formattedCreatedAt: text('formatted_created_at').notNull(),
  estimatedDelivery: text('estimated_delivery').notNull(),
  trackingNumber: text('tracking_number'),
  carrier: text('carrier'),
  timeline: jsonb('timeline').notNull().default([]),
  createdTimestamp: timestamp('created_timestamp').defaultNow(),
});
