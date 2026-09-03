import React, { useState, useMemo } from 'react';
import { Product, Category, Order, OrderStatus, Currency } from '../types';
import { formatPrice, STORE_PHONE, STORE_PHONE_CLEAN } from '../data/products';
import { api } from '../services/api';
import {
  Package,
  FolderPlus,
  Plus,
  Trash2,
  Edit3,
  Save,
  Check,
  X,
  Search,
  Database,
  UploadCloud,
  Download,
  RefreshCw,
  Tag,
  AlertCircle,
  CheckCircle2,
  Eye,
  Copy,
  FileJson,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Box,
  Truck,
  ArrowLeft,
  Info,
  Server,
  Cloud,
  Layers,
  ShoppingBag,
  ExternalLink,
  MessageCircle,
  Phone,
  Plane,
  Calendar,
  Clock
} from 'lucide-react';
import { getAirShippingDates, saveAirShippingDates, getAirShippingNote, saveAirShippingNote } from '../utils/shippingConfig';

interface AdminViewProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  currency: Currency;
  onUpdateProducts: (newProducts: Product[]) => void;
  onUpdateCategories: (newCategories: Category[]) => void;
  onUpdateOrders: (newOrders: Order[]) => void;
  onResetDefaultData: () => void;
  onBackToStore: () => void;
  onSyncDatabase?: () => Promise<void>;
  isSyncingDb?: boolean;
  lastSyncTime?: string | null;
}

type AdminTab = 'products' | 'categories' | 'orders' | 'expeditions' | 'database';

export const AdminView: React.FC<AdminViewProps> = ({
  products,
  categories,
  orders,
  currency,
  onUpdateProducts,
  onUpdateCategories,
  onUpdateOrders,
  onResetDefaultData,
  onBackToStore,
  onSyncDatabase,
  isSyncingDb = false,
  lastSyncTime,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Air shipping dates management state
  const [airDatesList, setAirDatesList] = useState<string[]>(() => getAirShippingDates());
  const [airAdminNote, setAirAdminNote] = useState<string>(() => getAirShippingNote());
  const [newAirDateInput, setNewAirDateInput] = useState('');
  const [shippingFilter, setShippingFilter] = useState<'all' | 'routiere' | 'aerienne'>('all');

  const handleAddAirDate = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newAirDateInput.trim();
    if (!trimmed) return;
    if (airDatesList.includes(trimmed)) {
      showToast('Cette date est déjà dans la liste.', 'error');
      return;
    }
    const updated = [...airDatesList, trimmed];
    setAirDatesList(updated);
    saveAirShippingDates(updated);
    setNewAirDateInput('');
    showToast('Nouvelle date d\'expédition aérienne ajoutée avec succès !');
  };

  const handleRemoveAirDate = (indexToRemove: number) => {
    const updated = airDatesList.filter((_, idx) => idx !== indexToRemove);
    setAirDatesList(updated);
    saveAirShippingDates(updated);
    showToast('Date d\'expédition retirée.');
  };

  const handleSaveAirNote = () => {
    saveAirShippingNote(airAdminNote);
    showToast('Consigne d\'expédition mise à jour !');
  };

  // Product form modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Category form modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Notifications
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Import / Export state
  const [jsonImportText, setJsonImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // ----------------------------------------------------
  // Product Form State
  // ----------------------------------------------------
  const [prodName, setProdName] = useState('');
  const [prodBrand, setProdBrand] = useState('MAROC GLOW');
  const [prodTagline, setProdTagline] = useState('');
  const [prodShortDesc, setProdShortDesc] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodCategorySlug, setProdCategorySlug] = useState('huiles');
  const [prodPriceFcfa, setProdPriceFcfa] = useState<number>(10000);
  const [prodOrigPriceFcfa, setProdOrigPriceFcfa] = useState<number>(0);
  const [prodVolume, setProdVolume] = useState('Carton de 12 x 100ml');
  const [prodStock, setProdStock] = useState<number>(50);
  const [prodInStock, setProdInStock] = useState(true);
  const [prodIsBio, setProdIsBio] = useState(true);
  const [prodIsBestSeller, setProdIsBestSeller] = useState(false);
  const [prodIsNew, setProdIsNew] = useState(false);
  const [prodOrigin, setProdOrigin] = useState('Souss-Massa & Taroudant, Maroc');
  const [prodImage, setProdImage] = useState('');
  const [prodIngredients, setProdIngredients] = useState('');
  const [prodUsage, setProdUsage] = useState('');

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdBrand('MAROC GLOW');
    setProdTagline('Produit marocain authentique 100% naturel - Qualité Grossiste');
    setProdShortDesc('');
    setProdDesc('');
    setProdCategorySlug(categories[0]?.slug || 'huiles');
    setProdPriceFcfa(15000);
    setProdOrigPriceFcfa(18000);
    setProdVolume('Carton de 12 unités');
    setProdStock(50);
    setProdInStock(true);
    setProdIsBio(true);
    setProdIsBestSeller(false);
    setProdIsNew(true);
    setProdOrigin('Maroc (Agadir / Marrakech)');
    setProdImage('https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80');
    setProdIngredients('Ingrédients 100% naturels');
    setProdUsage('Idéal pour revente en salon, spa, parapharmacie ou boutique.');
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProdName(product.name);
    setProdBrand(product.brand);
    setProdTagline(product.tagline || '');
    setProdShortDesc(product.shortDescription || '');
    setProdDesc(product.description || '');
    setProdCategorySlug(product.categorySlug);
    setProdPriceFcfa(product.priceFcfa);
    setProdOrigPriceFcfa(product.originalPriceFcfa || 0);
    setProdVolume(product.volumeOrWeight);
    setProdStock(product.stockQuantity);
    setProdInStock(product.inStock);
    setProdIsBio(!!product.isBio);
    setProdIsBestSeller(!!product.isBestSeller);
    setProdIsNew(!!product.isNew);
    setProdOrigin(product.origin);
    setProdImage(product.image);
    setProdIngredients(product.ingredients.join(', '));
    setProdUsage(product.usageAdvice);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      showToast('Le nom du produit est obligatoire', 'error');
      return;
    }

    const targetCategory = categories.find((c) => c.slug === prodCategorySlug);
    const categoryName = targetCategory ? targetCategory.name : (categories[1]?.name || '💧 Huiles');

    const ingredientsList = prodIngredients
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const now = new Date();
    const dateIso = now.toISOString().split('T')[0];
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(now);

    if (editingProduct) {
      // Update existing product
      const updated: Product = {
        ...editingProduct,
        name: prodName.trim(),
        brand: prodBrand.trim() || 'MAROC GLOW',
        tagline: prodTagline.trim(),
        shortDescription: prodShortDesc.trim() || prodDesc.trim().slice(0, 100),
        description: prodDesc.trim(),
        category: categoryName,
        categorySlug: prodCategorySlug,
        priceFcfa: Number(prodPriceFcfa) || 0,
        originalPriceFcfa: Number(prodOrigPriceFcfa) > 0 ? Number(prodOrigPriceFcfa) : undefined,
        volumeOrWeight: prodVolume.trim() || 'Lot de 10',
        stockQuantity: Number(prodStock) || 0,
        inStock: prodInStock && Number(prodStock) > 0,
        isBio: prodIsBio,
        isBestSeller: prodIsBestSeller,
        isNew: prodIsNew,
        origin: prodOrigin.trim() || 'Maroc',
        image: prodImage.trim() || 'https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80',
        gallery: editingProduct.gallery?.length ? editingProduct.gallery : [prodImage.trim()],
        ingredients: ingredientsList.length > 0 ? ingredientsList : ['Ingrédients 100% naturels'],
        usageAdvice: prodUsage.trim(),
      };

      const newProductList = products.map((p) => (p.id === editingProduct.id ? updated : p));
      onUpdateProducts(newProductList);
      api.saveProduct(updated).catch((err) => console.warn('Product sync error:', err));
      showToast(`Produit grossiste « ${updated.name} » mis à jour avec succès (PostgreSQL) !`);
    } else {
      // Create new product
      const generatedId = `mg-${prodName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)}-${Date.now().toString().slice(-4)}`;
      const newProduct: Product = {
        id: generatedId,
        name: prodName.trim(),
        brand: prodBrand.trim() || 'MAROC GLOW',
        tagline: prodTagline.trim(),
        shortDescription: prodShortDesc.trim() || prodDesc.trim().slice(0, 100),
        description: prodDesc.trim(),
        category: categoryName,
        categorySlug: prodCategorySlug,
        priceFcfa: Number(prodPriceFcfa) || 0,
        originalPriceFcfa: Number(prodOrigPriceFcfa) > 0 ? Number(prodOrigPriceFcfa) : undefined,
        publishDate: dateIso,
        formattedDate: formattedDate,
        image: prodImage.trim() || 'https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80',
        gallery: [prodImage.trim()],
        stockQuantity: Number(prodStock) || 0,
        inStock: prodInStock && Number(prodStock) > 0,
        isBio: prodIsBio,
        isBestSeller: prodIsBestSeller,
        isNew: prodIsNew,
        volumeOrWeight: prodVolume.trim() || 'Lot grossiste',
        origin: prodOrigin.trim() || 'Maroc',
        ingredients: ingredientsList.length > 0 ? ingredientsList : ['Ingrédients 100% naturels'],
        usageAdvice: prodUsage.trim(),
        rating: 5.0,
        reviewsCount: 1,
      };

      onUpdateProducts([newProduct, ...products]);
      api.saveProduct(newProduct).catch((err) => console.warn('Product sync error:', err));
      showToast(`Nouveau produit grossiste « ${newProduct.name} » ajouté au catalogue et synchronisé !`);
    }

    setIsProductModalOpen(false);
  };

  // Delete Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'product' | 'category';
    id: string;
    name: string;
  } | null>(null);

  const confirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'product') {
      const filtered = products.filter((p) => p.id !== deleteTarget.id);
      onUpdateProducts(filtered);
      api.deleteProduct(deleteTarget.id).catch((err) => console.warn('Product delete error:', err));
      showToast(`Produit « ${deleteTarget.name} » supprimé avec succès.`);
    } else if (deleteTarget.type === 'category') {
      if (deleteTarget.id === 'all') {
        showToast('Impossible de supprimer la catégorie racine "Tous les produits"', 'error');
        setDeleteTarget(null);
        return;
      }
      const filtered = categories.filter((c) => c.id !== deleteTarget.id);
      onUpdateCategories(filtered);
      api.deleteCategory(deleteTarget.id).catch((err) => console.warn('Category delete error:', err));
      showToast(`Catégorie « ${deleteTarget.name} » supprimée avec succès.`);
    }

    setDeleteTarget(null);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    setDeleteTarget({
      type: 'product',
      id: productId,
      name: productName,
    });
  };

  const handleDeleteCategory = (categoryId: string, categoryName: string) => {
    if (categoryId === 'all') {
      showToast('Impossible de supprimer la catégorie racine "Tous les produits"', 'error');
      return;
    }
    setDeleteTarget({
      type: 'category',
      id: categoryId,
      name: categoryName,
    });
  };

  const handleToggleStock = (product: Product) => {
    const updated = products.map((p) => {
      if (p.id === product.id) {
        const item = {
          ...p,
          inStock: !p.inStock,
          stockQuantity: !p.inStock && p.stockQuantity === 0 ? 10 : p.stockQuantity,
        };
        api.saveProduct(item).catch((err) => console.warn('Stock sync error:', err));
        return item;
      }
      return p;
    });
    onUpdateProducts(updated);
    showToast(`Stock de « ${product.name} » modifié (${!product.inStock ? 'En stock' : 'Rupture'}).`);
  };

  // ----------------------------------------------------
  // Category Form State
  // ----------------------------------------------------
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDesc, setCatDesc] = useState('');

  const openNewCategoryModal = () => {
    setEditingCategory(null);
    setCatName('');
    setCatSlug('');
    setCatDesc('');
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (category: Category) => {
    setEditingCategory(category);
    setCatName(category.name);
    setCatSlug(category.slug);
    setCatDesc(category.description);
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) {
      showToast('Le nom de la catégorie est obligatoire', 'error');
      return;
    }

    const generatedSlug = catSlug.trim()
      ? catSlug.trim().toLowerCase().replace(/[^a-z0-9]/g, '-')
      : catName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (editingCategory) {
      const updatedCat: Category = { ...editingCategory, name: catName.trim(), slug: generatedSlug, description: catDesc.trim() };
      const updated = categories.map((c) =>
        c.id === editingCategory.id ? updatedCat : c
      );
      onUpdateCategories(updated);
      api.saveCategory(updatedCat).catch((err) => console.warn('Category sync error:', err));
      showToast(`Catégorie « ${catName} » mise à jour.`);
    } else {
      const newCat: Category = {
        id: `cat-${Date.now().toString().slice(-4)}`,
        name: catName.trim(),
        slug: generatedSlug,
        description: catDesc.trim() || `Produits de la catégorie ${catName}`,
      };
      onUpdateCategories([...categories, newCat]);
      api.saveCategory(newCat).catch((err) => console.warn('Category sync error:', err));
      showToast(`Nouvelle catégorie « ${catName} » créée.`);
    }

    setIsCategoryModalOpen(false);
  };

  // ----------------------------------------------------
  // Order Status Management
  // ----------------------------------------------------
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    let targetTimeline: any[] = [];
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        const updatedTimeline = o.timeline.map((step) => ({
          ...step,
          completed: step.step === newStatus || isStatusBeforeOrEqual(step.step, newStatus),
          current: step.step === newStatus,
        }));
        targetTimeline = updatedTimeline;
        return {
          ...o,
          status: newStatus,
          timeline: updatedTimeline,
        };
      }
      return o;
    });
    onUpdateOrders(updated);
    api.updateOrderStatus(orderId, newStatus, undefined, targetTimeline).catch((err) => console.warn('Order sync error:', err));
    showToast(`Statut de la commande #${orderId} mis à jour : ${newStatus.toUpperCase()}`);
  };

  const isStatusBeforeOrEqual = (step: OrderStatus, target: OrderStatus): boolean => {
    const sequence: OrderStatus[] = ['reçue', 'confirmée', 'préparation', 'expédiée', 'livrée'];
    return sequence.indexOf(step) <= sequence.indexOf(target);
  };

  // ----------------------------------------------------
  // Import / Export JSON Catalog
  // ----------------------------------------------------
  const handleExportJson = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      store: 'Maroc Glow Grossiste',
      categories,
      products,
      orders,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maroc-glow-catalogue-grossiste-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Fichier catalogue JSON exporté avec succès !');
  };

  const handleImportJson = () => {
    try {
      if (!jsonImportText.trim()) {
        showToast('Veuillez coller le contenu JSON à importer', 'error');
        return;
      }
      const parsed = JSON.parse(jsonImportText);
      if (parsed.products && Array.isArray(parsed.products)) {
        onUpdateProducts(parsed.products);
      }
      if (parsed.categories && Array.isArray(parsed.categories)) {
        onUpdateCategories(parsed.categories);
      }
      if (parsed.orders && Array.isArray(parsed.orders)) {
        onUpdateOrders(parsed.orders);
      }
      setJsonImportText('');
      setImportStatus('Importation réussie avec succès !');
      showToast('Catalogue importé et synchronisé avec succès !');
    } catch (err: any) {
      setImportStatus(`Erreur de format JSON : ${err.message}`);
      showToast('Format JSON invalide', 'error');
    }
  };

  // Reset Confirmation State
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Helper for SQL string escaping
  const escapeSql = (str: string) => {
    if (!str) return "''";
    return `'${str.replace(/'/g, "''")}'`;
  };

  const escapeJson = (obj: any) => {
    const jsonStr = JSON.stringify(obj || []);
    return `'${jsonStr.replace(/'/g, "''")}'::jsonb`;
  };

  const generateSupabaseSql = () => {
    let sql = `-- ==========================================================\n`;
    sql += `-- SCRIPT SQL EXPORT MAROC GLOW GROSSISTE POUR SUPABASE\n`;
    sql += `-- Généré le : ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}\n`;
    sql += `-- Instructions : Ouvrez votre projet Supabase > SQL Editor > Collez ce script > Exécutez (Run)\n`;
    sql += `-- ==========================================================\n\n`;

    sql += `-- 1. Création de la table des Catégories\n`;
    sql += `CREATE TABLE IF NOT EXISTS public.categories (\n`;
    sql += `  id TEXT PRIMARY KEY,\n`;
    sql += `  name TEXT NOT NULL,\n`;
    sql += `  slug TEXT NOT NULL UNIQUE,\n`;
    sql += `  description TEXT DEFAULT '',\n`;
    sql += `  icon_name TEXT,\n`;
    sql += `  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n`;
    sql += `);\n\n`;

    sql += `-- 2. Création de la table des Produits Grossistes\n`;
    sql += `CREATE TABLE IF NOT EXISTS public.products (\n`;
    sql += `  id TEXT PRIMARY KEY,\n`;
    sql += `  name TEXT NOT NULL,\n`;
    sql += `  brand TEXT DEFAULT 'MAROC GLOW',\n`;
    sql += `  tagline TEXT DEFAULT '',\n`;
    sql += `  short_description TEXT DEFAULT '',\n`;
    sql += `  description TEXT DEFAULT '',\n`;
    sql += `  category TEXT NOT NULL,\n`;
    sql += `  category_slug TEXT NOT NULL,\n`;
    sql += `  price_fcfa INTEGER NOT NULL,\n`;
    sql += `  original_price_fcfa INTEGER,\n`;
    sql += `  publish_date TEXT NOT NULL,\n`;
    sql += `  formatted_date TEXT NOT NULL,\n`;
    sql += `  image TEXT NOT NULL,\n`;
    sql += `  gallery JSONB DEFAULT '[]'::jsonb,\n`;
    sql += `  stock_quantity INTEGER DEFAULT 50,\n`;
    sql += `  in_stock BOOLEAN DEFAULT true,\n`;
    sql += `  is_new BOOLEAN DEFAULT false,\n`;
    sql += `  is_best_seller BOOLEAN DEFAULT false,\n`;
    sql += `  is_bio BOOLEAN DEFAULT true,\n`;
    sql += `  volume_or_weight TEXT DEFAULT '',\n`;
    sql += `  origin TEXT DEFAULT 'Maroc',\n`;
    sql += `  ingredients JSONB DEFAULT '[]'::jsonb,\n`;
    sql += `  usage_advice TEXT DEFAULT '',\n`;
    sql += `  rating TEXT DEFAULT '4.9',\n`;
    sql += `  reviews_count INTEGER DEFAULT 12,\n`;
    sql += `  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n`;
    sql += `  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n`;
    sql += `);\n\n`;

    sql += `-- 3. Création de la table des Commandes\n`;
    sql += `CREATE TABLE IF NOT EXISTS public.orders (\n`;
    sql += `  id TEXT PRIMARY KEY,\n`;
    sql += `  customer_name TEXT NOT NULL,\n`;
    sql += `  phone TEXT NOT NULL,\n`;
    sql += `  city TEXT NOT NULL,\n`;
    sql += `  address TEXT DEFAULT '',\n`;
    sql += `  notes TEXT DEFAULT '',\n`;
    sql += `  items JSONB NOT NULL,\n`;
    sql += `  total_fcfa INTEGER NOT NULL,\n`;
    sql += `  status TEXT NOT NULL DEFAULT 'reçue',\n`;
    sql += `  payment_method TEXT DEFAULT 'Paiement à la livraison / Virement',\n`;
    sql += `  created_at TEXT NOT NULL,\n`;
    sql += `  formatted_created_at TEXT NOT NULL,\n`;
    sql += `  created_timestamp BIGINT NOT NULL,\n`;
    sql += `  timeline JSONB NOT NULL\n`;
    sql += `);\n\n`;

    sql += `-- 4. Insertion / Synchronisation des 8 Catégories\n`;
    sql += `INSERT INTO public.categories (id, name, slug, description)\nVALUES\n`;
    const catRows = categories.map((c) =>
      `  (${escapeSql(c.id)}, ${escapeSql(c.name)}, ${escapeSql(c.slug)}, ${escapeSql(c.description || '')})`
    ).join(',\n');
    sql += catRows + `\nON CONFLICT (id) DO UPDATE SET\n  name = EXCLUDED.name,\n  slug = EXCLUDED.slug,\n  description = EXCLUDED.description;\n\n`;

    sql += `-- 5. Insertion / Synchronisation des Produits Grossistes\n`;
    sql += `INSERT INTO public.products (\n`;
    sql += `  id, name, brand, tagline, short_description, description,\n`;
    sql += `  category, category_slug, price_fcfa, original_price_fcfa, publish_date, formatted_date,\n`;
    sql += `  image, gallery, stock_quantity, in_stock, is_new, is_best_seller, is_bio,\n`;
    sql += `  volume_or_weight, origin, ingredients, usage_advice, rating, reviews_count\n`;
    sql += `)\nVALUES\n`;

    const prodRows = products.map((p) => {
      return `  (${escapeSql(p.id)}, ${escapeSql(p.name)}, ${escapeSql(p.brand || 'MAROC GLOW')}, ${escapeSql(p.tagline || '')}, ${escapeSql(p.shortDescription || '')}, ${escapeSql(p.description || '')}, ${escapeSql(p.category)}, ${escapeSql(p.categorySlug)}, ${p.priceFcfa}, ${p.originalPriceFcfa || 'NULL'}, ${escapeSql(p.publishDate || '')}, ${escapeSql(p.formattedDate || '')}, ${escapeSql(p.image)}, ${escapeJson(p.gallery || [p.image])}, ${p.stockQuantity || 50}, ${p.inStock ? 'true' : 'false'}, ${p.isNew ? 'true' : 'false'}, ${p.isBestSeller ? 'true' : 'false'}, ${p.isBio ? 'true' : 'false'}, ${escapeSql(p.volumeOrWeight || '')}, ${escapeSql(p.origin || 'Maroc')}, ${escapeJson(p.ingredients || [])}, ${escapeSql(p.usageAdvice || '')}, ${escapeSql(String(p.rating || 4.9))}, ${p.reviewsCount || 0})`;
    }).join(',\n');

    sql += prodRows + `\nON CONFLICT (id) DO UPDATE SET\n  name = EXCLUDED.name,\n  price_fcfa = EXCLUDED.price_fcfa,\n  category = EXCLUDED.category,\n  category_slug = EXCLUDED.category_slug,\n  image = EXCLUDED.image,\n  stock_quantity = EXCLUDED.stock_quantity,\n  in_stock = EXCLUDED.in_stock;\n`;

    return sql;
  };

  const handleCopySupabaseSql = () => {
    const script = generateSupabaseSql();
    navigator.clipboard.writeText(script);
    setCopiedSql(true);
    showToast('Script SQL Supabase copié dans le presse-papier !');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleDownloadSupabaseSql = () => {
    const script = generateSupabaseSql();
    const blob = new Blob([script], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maroc-glow-supabase-export-${new Date().toISOString().slice(0, 10)}.sql`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Fichier maroc-glow-supabase-export.sql téléchargé !');
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchOrigin = p.origin.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchOrigin) return false;
      }
      if (selectedCategoryFilter !== 'all') {
        if (p.categorySlug !== selectedCategoryFilter) return false;
      }
      return true;
    });
  }, [products, productSearch, selectedCategoryFilter]);

  // Statistics
  const totalStockValueFcfa = useMemo(() => {
    return products.reduce((acc, p) => acc + p.priceFcfa * p.stockQuantity, 0);
  }, [products]);

  const totalOrdersAmountFcfa = useMemo(() => {
    return orders.reduce((acc, o) => acc + o.totalFcfa, 0);
  }, [orders]);

  // Sorted categories: categories with products first, those with 0 products at the end
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      if (a.id === 'all' || a.slug === 'all') return -1;
      if (b.id === 'all' || b.slug === 'all') return 1;

      const countA = products.filter((p) => p.categorySlug === a.slug).length;
      const countB = products.filter((p) => p.categorySlug === b.slug).length;

      if (countA > 0 && countB === 0) return -1;
      if (countA === 0 && countB > 0) return 1;

      if (countA !== countB) return countB - countA;
      return 0;
    });
  }, [categories, products]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#231B15] pb-24">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top duration-300">
          <div
            className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border text-sm font-semibold ${
              notification.type === 'success'
                ? 'bg-[#231B15] text-white border-[#D4AF37]/50'
                : 'bg-red-900 text-white border-red-700'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Top Admin Navigation Bar */}
      <header className="bg-[#171513] text-white border-b border-[#2A2420] sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <button
              onClick={onBackToStore}
              className="p-2 rounded-xl bg-[#231E1B] hover:bg-[#B8683C] text-[#C4B7A5] hover:text-white transition-all cursor-pointer flex items-center gap-2 text-xs font-bold"
              title="Retourner au catalogue client"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Boutique</span>
            </button>
            <div className="h-6 w-px bg-[#3A322B]"></div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#B8683C]/20 border border-[#B8683C]/40 text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-serif text-base sm:text-lg font-bold tracking-wide text-white">
                  Panneau d'Administration Grossiste
                </h1>
                <p className="text-[10px] text-[#A89C8F] uppercase tracking-wider font-semibold">
                  Maroc Glow • Vente en Gros & Gestion des Stocks
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onSyncDatabase && (
              <button
                onClick={async () => {
                  await onSyncDatabase();
                  showToast('Base de données PostgreSQL synchronisée en temps réel !');
                }}
                disabled={isSyncingDb}
                className="px-3 py-2 bg-[#231E1B] hover:bg-[#322B26] text-emerald-400 hover:text-emerald-300 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 border border-emerald-900/50 cursor-pointer disabled:opacity-50"
                title="Recharger et synchroniser les données en direct depuis PostgreSQL"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingDb ? 'animate-spin text-emerald-400' : 'text-emerald-400'}`} />
                <span className="hidden sm:inline">
                  {isSyncingDb ? 'Synchro en cours...' : 'Synchroniser BDD'}
                </span>
              </button>
            )}

            <button
              onClick={openNewProductModal}
              className="px-3.5 py-2 bg-[#B8683C] hover:bg-[#A3592F] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer border border-[#D4AF37]/30 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Produit</span>
            </button>

            <button
              onClick={handleExportJson}
              className="px-3 py-2 bg-[#231E1B] hover:bg-[#322B26] text-[#EFE6D8] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 border border-[#3A322B] cursor-pointer"
              title="Exporter le catalogue au format JSON"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden md:inline">Sauvegarder</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto border-t border-[#231E1B] pt-2 pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#FAF7F2] text-[#231B15] border-[#B8683C]'
                : 'text-[#A89C8F] hover:text-white border-transparent'
            }`}
          >
            <Package className="w-4 h-4 text-[#B8683C]" />
            <span>Catalogue Produits ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-[#FAF7F2] text-[#231B15] border-[#B8683C]'
                : 'text-[#A89C8F] hover:text-white border-transparent'
            }`}
          >
            <FolderPlus className="w-4 h-4 text-[#D4AF37]" />
            <span>Catégories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#FAF7F2] text-[#231B15] border-[#B8683C]'
                : 'text-[#A89C8F] hover:text-white border-transparent'
            }`}
          >
            <Truck className="w-4 h-4 text-[#2E6349]" />
            <span>Commandes Grossistes ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('expeditions')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'expeditions'
                ? 'bg-[#FAF7F2] text-[#231B15] border-[#B8683C]'
                : 'text-[#A89C8F] hover:text-white border-transparent'
            }`}
          >
            <Plane className="w-4 h-4 text-[#D4AF37]" />
            <span>Expéditions & Fret Aérien ({airDatesList.length} dates)</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'database'
                ? 'bg-[#FAF7F2] text-[#231B15] border-[#B8683C]'
                : 'text-[#A89C8F] hover:text-white border-transparent'
            }`}
          >
            <Database className="w-4 h-4 text-[#3B82F6]" />
            <span>Bases de Données Gratuites</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-[#EFE6D8] shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D7368]">Total Produits</span>
              <Box className="w-4 h-4 text-[#B8683C]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#231B15]">{products.length}</div>
            <div className="text-[10px] text-[#2E6349] font-medium mt-1">
              {products.filter((p) => p.inStock).length} en stock disponible
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#EFE6D8] shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D7368]">Catégories</span>
              <FolderPlus className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#231B15]">{categories.length}</div>
            <div className="text-[10px] text-[#7D7368] font-medium mt-1">Rayons soins marocains</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#EFE6D8] shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D7368]">Commandes Grossistes</span>
              <Truck className="w-4 h-4 text-[#2E6349]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#231B15]">{orders.length}</div>
            <div className="text-[10px] text-[#B8683C] font-semibold mt-1">
              {formatPrice(totalOrdersAmountFcfa, currency)} cumulés
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#EFE6D8] shadow-2xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D7368]">Valeur du Stock Gros</span>
              <TrendingUp className="w-4 h-4 text-[#B8683C]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#B8683C]">
              {formatPrice(totalStockValueFcfa, currency)}
            </div>
            <div className="text-[10px] text-[#7D7368] font-medium mt-1">Évaluation stock total</div>
          </div>
        </div>

        {/* -------------------------------------------------------------------------------- */}
        {/* TAB 1: PRODUITS */}
        {/* -------------------------------------------------------------------------------- */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Action Bar: Search, Category Filter, Add Button */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EFE6D8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3 w-full">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#7D7368] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Rechercher par nom, ingrédient ou origine..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30 focus:border-[#B8683C]"
                  />
                  {productSearch && (
                    <button
                      onClick={() => setProductSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7D7368] hover:text-[#231B15]"
                    >
                      Effacer
                    </button>
                  )}
                </div>

                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-xs sm:text-sm font-medium text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={openNewProductModal}
                className="w-full md:w-auto px-5 py-2.5 bg-[#B8683C] hover:bg-[#A3592F] text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un Produit Grossiste</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[#EFE6D8] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF7F2] text-[#7D7368] font-bold uppercase text-[10px] sm:text-[11px] tracking-wider border-b border-[#EFE6D8]">
                    <tr>
                      <th className="py-3.5 px-4">Produit</th>
                      <th className="py-3.5 px-4">Catégorie</th>
                      <th className="py-3.5 px-4">Prix Unitaire</th>
                      <th className="py-3.5 px-4">Disponibilité</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE6D8]">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-[#7D7368]">
                          <Box className="w-10 h-10 mx-auto text-[#C4B7A5] mb-2" />
                          <p className="font-semibold">Aucun produit grossiste trouvé.</p>
                          <p className="text-xs text-[#A89F93] mt-1">Modifiez vos filtres ou ajoutez un nouveau produit.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 object-cover rounded-xl border border-[#EFE6D8] shrink-0 bg-[#FAF7F2]"
                              />
                              <div>
                                <h4 className="font-bold text-[#231B15] line-clamp-1">{p.name}</h4>
                                <div className="flex items-center gap-1.5 text-[10px] text-[#7D7368] mt-0.5">
                                  <span>{p.brand}</span>
                                  {p.isBio && <span className="text-[#2E6349] font-bold">• 100% Bio</span>}
                                  {p.isBestSeller && <span className="text-[#B8683C] font-bold">• Bestseller</span>}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-[#7D7368]">
                            <span className="px-2.5 py-1 bg-[#FAF7F2] rounded-lg text-xs font-medium border border-[#EFE6D8]">
                              {p.category}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-bold text-[#B8683C]">
                            {formatPrice(p.priceFcfa, currency)}
                          </td>

                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => handleToggleStock(p)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                                p.inStock
                                  ? 'bg-[#2E6349]/10 text-[#2E6349] border border-[#2E6349]/20 hover:bg-[#2E6349]/20'
                                  : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                              }`}
                              title="Cliquer pour changer le statut en/hors stock"
                            >
                              {p.inStock ? '✓ En Stock' : '✕ Rupture'}
                            </button>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEditProductModal(p)}
                                className="p-2 text-[#7D7368] hover:text-[#B8683C] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
                                title="Modifier la fiche produit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="p-2 text-[#7D7368] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Supprimer ce produit"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------------------- */}
        {/* TAB 2: CATÉGORIES */}
        {/* -------------------------------------------------------------------------------- */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-2xl border border-[#EFE6D8] shadow-xs">
              <div>
                <h3 className="text-base font-bold text-[#231B15]">Rayons & Catégories de Soins Marocains</h3>
                <p className="text-xs text-[#7D7368]">
                  Structurez votre catalogue par type d'ingrédient ou de rituel beauté.
                </p>
              </div>

              <button
                onClick={openNewCategoryModal}
                className="px-4 py-2.5 bg-[#B8683C] hover:bg-[#A3592F] text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une Catégorie</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedCategories.map((cat) => {
                const productCount = products.filter((p) => p.categorySlug === cat.slug).length;
                return (
                  <div
                    key={cat.id}
                    className="bg-white p-5 rounded-2xl border border-[#EFE6D8] shadow-xs flex flex-col justify-between hover:border-[#B8683C]/40 transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="p-2 rounded-xl bg-[#FAF7F2] text-[#B8683C] border border-[#EFE6D8]">
                          <FolderPlus className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold bg-[#FAF7F2] px-2.5 py-1 rounded-full text-[#7D7368] border border-[#EFE6D8]">
                          {productCount} produit{productCount > 1 ? 's' : ''}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#231B15] text-base mb-1">{cat.name}</h4>
                      <div className="text-[11px] font-mono text-[#A89F93] mb-2">Slug : /{cat.slug}</div>
                      <p className="text-xs text-[#7D7368] leading-relaxed line-clamp-2">{cat.description}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-[#EFE6D8]">
                      <button
                        onClick={() => openEditCategoryModal(cat)}
                        className="px-3 py-1.5 text-xs font-bold text-[#231B15] hover:text-[#B8683C] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Modifier</span>
                      </button>
                      {cat.id !== 'all' && (
                        <button
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Supprimer</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------------------- */}
        {/* TAB 3: COMMANDES GROSSISTES */}
        {/* -------------------------------------------------------------------------------- */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EFE6D8] shadow-xs flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#231B15]">Suivi des Commandes Grossistes & Expéditions</h3>
                <p className="text-xs text-[#7D7368]">
                  Gérez le statut en temps réel de chaque commande (Préparation, Expédition, Facturation).
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {orders.map((order) => {
                const whatsappCustomerUrl = `https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Bonjour ${order.customerName} ✨\nVotre commande grossiste Maroc Glow #${order.id} est actuellement au statut : *${order.status.toUpperCase()}*.\nMontant total : *${formatPrice(order.totalFcfa, currency)}*.\nMerci pour votre confiance !`
                )}`;

                return (
                  <div
                    key={order.id}
                    className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EFE6D8] shadow-xs space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EFE6D8]">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#231B15] text-white">
                          <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm sm:text-base text-[#231B15]">
                              #{order.id}
                            </span>
                            <span className="text-xs text-[#7D7368]">({order.formattedCreatedAt})</span>
                          </div>
                          <p className="text-xs text-[#7D7368]">
                            Client : <strong className="text-[#231B15]">{order.customerName}</strong> • {order.city} ({order.phone})
                          </p>
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#7D7368]">Statut :</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FAF7F2] border border-[#EFE6D8] text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30"
                        >
                          <option value="reçue">Reçue (En attente)</option>
                          <option value="confirmée">Confirmée</option>
                          <option value="préparation">En préparation</option>
                          <option value="expédiée">Expédiée (En transit)</option>
                          <option value="livrée">Livrée avec succès</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items Table */}
                    <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EFE6D8] space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#7D7368] mb-2">
                        Articles commandés :
                      </div>
                      <div className="space-y-1.5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-[#231B15] font-medium">
                              • {item.product.name} ({item.product.volumeOrWeight}) × <strong>{item.quantity}</strong>
                            </span>
                            <span className="font-bold text-[#B8683C]">
                              {formatPrice(item.product.priceFcfa * item.quantity, currency)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#EFE6D8] flex items-center justify-between text-xs font-bold">
                        <span className="text-[#7D7368]">Total à régler :</span>
                        <span className="text-base text-[#B8683C] font-black">
                          {formatPrice(order.totalFcfa, currency)}
                        </span>
                      </div>
                    </div>

                    {/* Customer Contact & Quick Action */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="text-xs text-[#7D7368] space-y-0.5">
                        <div>
                          Mode d'expédition :{' '}
                          <strong className="text-[#231B15]">
                            {order.shippingOptionLabel || (order.shippingOption === 'aerienne' ? 'Voie aérienne (Avion)' : 'Voie routière')}
                          </strong>
                          {order.airShippingDateSelected && (
                            <span className="ml-1.5 px-2 py-0.5 bg-[#FAF7F2] text-[#B8683C] rounded border border-[#EFE6D8] font-bold text-[10px]">
                              Départ : {order.airShippingDateSelected}
                            </span>
                          )}
                        </div>
                        <div>
                          Destination :{' '}
                          <strong className="text-[#231B15]">
                            {order.address}, {order.city}{order.country ? ` (${order.country})` : ''}
                          </strong>
                          {' '}• Frais de livraison :{' '}
                          <span className="text-[#B8683C] font-semibold">À définir selon le poids</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={whatsappCustomerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#20BA59] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Notifier sur WhatsApp</span>
                        </a>
                        <a
                          href={`tel:${order.phone.replace(/[^0-9+]/g, '')}`}
                          className="px-3 py-1.5 bg-white border border-[#EFE6D8] hover:bg-[#FAF7F2] text-[#231B15] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#B8683C]" />
                          <span>Appeler</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------------------- */}
        {/* TAB: EXPÉDITIONS & FRET AÉRIEN */}
        {/* -------------------------------------------------------------------------------- */}
        {activeTab === 'expeditions' && (
          <div className="space-y-6">
            {/* Header banner */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EFE6D8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#B8683C] text-[11px] font-bold mb-2 border border-[#EFE6D8]">
                  <Plane className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Gestion logistique Maroc</span>
                </div>
                <h3 className="text-lg font-bold text-[#231B15]">
                  Planification des Expéditions Aériennes & Routières
                </h3>
                <p className="text-xs text-[#7D7368] mt-1 max-w-2xl">
                  En tant qu'administrateur, définissez ici les prochaines dates de vols cargo pour la voie aérienne. Ces dates s'affichent automatiquement aux clients lorsqu'ils passent commande.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#7D7368] bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#EFE6D8]">
                  {airDatesList.length} date{airDatesList.length > 1 ? 's' : ''} programmée{airDatesList.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Grid 2 colonnes: Configuration dates & Instructions clients */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Gauche (7 cols): Liste et Ajout des dates d'expédition aérienne */}
              <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-[#EFE6D8] shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#EFE6D8]">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#231B15]">
                    <Calendar className="w-4 h-4 text-[#B8683C]" />
                    <span>Prochaines Dates de Départs Aériens (Fret Avion)</span>
                  </div>
                  <span className="text-[11px] text-[#7D7368]">Visibles dans le formulaire client</span>
                </div>

                {/* Formulaire ajout date */}
                <form onSubmit={handleAddAirDate} className="space-y-2">
                  <label className="block text-xs font-semibold text-[#231B15]">
                    Ajouter une nouvelle date d'expédition aérienne :
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAirDateInput}
                      onChange={(e) => setNewAirDateInput(e.target.value)}
                      placeholder="Ex: Samedi 19 Septembre 2026, Jeudi 24 Septembre..."
                      className="flex-1 px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-xs text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#B8683C] hover:bg-[#A3592F] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-[#7D7368]">
                    Écrivez la date au format clair pour vos clients (jour, date, mois, année).
                  </p>
                </form>

                {/* Liste des dates configurées */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#7D7368]">
                    Dates actuellement enregistrées ({airDatesList.length}) :
                  </div>

                  {airDatesList.length === 0 ? (
                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-dashed border-[#EFE6D8] text-center text-xs text-[#7D7368]">
                      Aucune date programmée pour le moment. Ajoutez une première date ci-dessus.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {airDatesList.map((dateStr, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE6D8] text-xs hover:border-[#B8683C]/40 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#B8683C]/10 text-[#B8683C] font-bold text-[10px] flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-[#231B15]">{dateStr}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#2E6349] font-semibold border border-[#EFE6D8]">
                              ✈️ Vol Cargo Programmé
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveAirDate(idx)}
                            className="p-1.5 text-[#7D7368] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Supprimer cette date"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Droite (5 cols): Consignes admin & Rappel tarifs */}
              <div className="lg:col-span-5 space-y-6">
                {/* Note admin affichée aux clients */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EFE6D8] shadow-xs space-y-4">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#231B15] pb-2 border-b border-[#EFE6D8]">
                    <Info className="w-4 h-4 text-[#B8683C]" />
                    <span>Consignes Client Voie Aérienne</span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#231B15]">
                      Note / Message pour les clients choisissant l'avion :
                    </label>
                    <textarea
                      rows={3}
                      value={airAdminNote}
                      onChange={(e) => setAirAdminNote(e.target.value)}
                      placeholder="Ex: Clôture de la réception des colis 48h avant chaque départ aérien..."
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-xs text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30"
                    />
                    <button
                      type="button"
                      onClick={handleSaveAirNote}
                      className="w-full py-2.5 bg-[#231B15] hover:bg-[#B8683C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Enregistrer la consigne</span>
                    </button>
                  </div>
                </div>

                {/* Rappel des 2 voies de livraison */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EFE6D8] shadow-xs space-y-3">
                  <h4 className="font-bold text-sm text-[#231B15] pb-2 border-b border-[#EFE6D8]">
                    Fonctionnement des 2 Modes
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EFE6D8]">
                      <div className="font-bold text-[#231B15] flex items-center justify-between gap-1.5 mb-1">
                        <div className="flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-[#B8683C]" />
                          <span>1. Voie Routière (Terrestre)</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#B8683C] bg-white px-2 py-0.5 rounded border border-[#EFE6D8]">
                          À définir plus tard
                        </span>
                      </div>
                      <p className="text-[#7D7368] leading-relaxed">
                        Transport par camions / convois régionaux. Idéal pour cartons volumineux et commandes en gros. Frais payables directement par le client à la réception du colis.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EFE6D8]">
                      <div className="font-bold text-[#231B15] flex items-center justify-between gap-1.5 mb-1">
                        <div className="flex items-center gap-1.5">
                          <Plane className="w-4 h-4 text-[#B8683C]" />
                          <span>2. Voie Aérienne (Fret Cargo)</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#B8683C] bg-white px-2 py-0.5 rounded border border-[#EFE6D8]">
                          À définir plus tard
                        </span>
                      </div>
                      <p className="text-[#7D7368] leading-relaxed">
                        Vols cargos réguliers depuis le Maroc vers les capitales africaines et européennes. Frais payables directement par le client à la réception du colis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Commandes triées selon le mode d'expédition */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EFE6D8] shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EFE6D8]">
                <h4 className="font-bold text-sm text-[#231B15]">
                  Commandes Clients par Mode d'Expédition
                </h4>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[#7D7368] font-medium mr-1">Filtrer :</span>
                  <button
                    onClick={() => setShippingFilter('all')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      shippingFilter === 'all'
                        ? 'bg-[#231B15] text-white'
                        : 'bg-[#FAF7F2] text-[#7D7368] hover:text-[#231B15] border border-[#EFE6D8]'
                    }`}
                  >
                    Toutes ({orders.length})
                  </button>
                  <button
                    onClick={() => setShippingFilter('routiere')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      shippingFilter === 'routiere'
                        ? 'bg-[#B8683C] text-white'
                        : 'bg-[#FAF7F2] text-[#7D7368] hover:text-[#231B15] border border-[#EFE6D8]'
                    }`}
                  >
                    <Truck className="w-3 h-3" />
                    <span>Routière ({orders.filter((o) => o.shippingOption !== 'aerienne').length})</span>
                  </button>
                  <button
                    onClick={() => setShippingFilter('aerienne')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      shippingFilter === 'aerienne'
                        ? 'bg-[#B8683C] text-white'
                        : 'bg-[#FAF7F2] text-[#7D7368] hover:text-[#231B15] border border-[#EFE6D8]'
                    }`}
                  >
                    <Plane className="w-3 h-3" />
                    <span>Aérienne ({orders.filter((o) => o.shippingOption === 'aerienne').length})</span>
                  </button>
                </div>
              </div>

              {/* Table / Cards list of filtered orders */}
              <div className="space-y-3">
                {orders
                  .filter((o) => {
                    if (shippingFilter === 'routiere') return o.shippingOption !== 'aerienne';
                    if (shippingFilter === 'aerienne') return o.shippingOption === 'aerienne';
                    return true;
                  })
                  .map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EFE6D8] flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white border border-[#EFE6D8] text-[#B8683C]">
                          {ord.shippingOption === 'aerienne' ? <Plane className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-mono font-bold text-[#231B15]">#{ord.id} • {ord.customerName}</div>
                          <div className="text-[#7D7368]">
                            {ord.city}{ord.country ? `, ${ord.country}` : ''} ({ord.phone}) • {ord.items.length} article{ord.items.length > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-full bg-white text-[#B8683C] font-bold border border-[#EFE6D8]">
                          {ord.shippingOptionLabel || (ord.shippingOption === 'aerienne' ? 'Voie aérienne' : 'Voie routière')}
                        </span>
                        <span className="font-extrabold text-[#231B15]">
                          {formatPrice(ord.totalFcfa, currency)}
                        </span>
                        <a
                          href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Bonjour ${ord.customerName} ✨\nConcernant votre commande #${ord.id} pour ${ord.city} (${ord.shippingOption === 'aerienne' ? 'Voie aérienne' : 'Voie routière'}).\nNous avons calculé vos frais d'expédition selon le poids de vos colis : ...`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20BA59] text-white font-bold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------------------- */}
        {/* TAB 4: BASES DE DONNÉES GRATUITES & SAUVEGARDE */}
        {/* -------------------------------------------------------------------------------- */}
        {activeTab === 'database' && (
          <div className="space-y-8">
            {/* Active Database Status Banner */}
            <div className="bg-gradient-to-r from-[#171513] via-[#231B15] to-[#2E6349] text-white p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-80 h-80 bg-[#2E6349]/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 bg-[#2E6349]/40 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>PostgreSQL Cloud SQL Connecté • europe-west2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {onSyncDatabase && (
                      <button
                        onClick={async () => {
                          await onSyncDatabase();
                          showToast('Données synchronisées avec PostgreSQL !');
                        }}
                        disabled={isSyncingDb}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncingDb ? 'animate-spin' : ''}`} />
                        <span>{isSyncingDb ? 'Synchro en cours...' : 'Forcer la Synchro'}</span>
                      </button>
                    )}
                    <span className="text-xs font-mono text-[#D4AF37] bg-black/40 px-3 py-1 rounded-lg border border-[#D4AF37]/20">
                      {lastSyncTime ? `Synchro : ${lastSyncTime}` : 'Connecté en direct'}
                    </span>
                  </div>
                </div>

                <div className="max-w-3xl">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                    Base de Données Relationnelle PostgreSQL & Drizzle ORM
                  </h2>
                  <p className="text-sm text-[#EFE6D8] leading-relaxed">
                    Votre application est connectée à une base de données PostgreSQL haute performance hébergée dans la région <strong>europe-west2</strong> (Londres). Toutes les modifications sur vos produits, catégories et commandes de gros sont persistées en direct avec réplication et pooling de connexions.
                  </p>
                </div>

                {/* Live Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                    <div className="text-[11px] font-semibold text-emerald-200">Table Produits</div>
                    <div className="text-xl font-bold text-white mt-1">{products.length} réf.</div>
                    <div className="text-[10px] text-white/70">schema: "products" (réel)</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                    <div className="text-[11px] font-semibold text-emerald-200">Table Catégories</div>
                    <div className="text-xl font-bold text-white mt-1">{categories.length} cat.</div>
                    <div className="text-[10px] text-white/70">schema: "categories" (réel)</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                    <div className="text-[11px] font-semibold text-emerald-200">Table Commandes</div>
                    <div className="text-xl font-bold text-white mt-1">{orders.length} cmd.</div>
                    <div className="text-[10px] text-white/70">schema: "orders" (réel)</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                    <div className="text-[11px] font-semibold text-emerald-200">Authentification</div>
                    <div className="text-xl font-bold text-white mt-1">Firebase + SQL</div>
                    <div className="text-[10px] text-white/70">schema: "users"</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Database Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Option 1: Firebase Firestore */}
              <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/40 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow">
                <div className="absolute -top-3 right-4 bg-[#D4AF37] text-[#231B15] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                  Recommandé Google Cloud
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 border border-amber-200">
                      <Cloud className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#231B15]">Firebase Firestore</h3>
                      <span className="text-xs font-semibold text-[#2E6349]">Offre gratuite à vie (Spark Plan)</span>
                    </div>
                  </div>
                  <ul className="text-xs text-[#7D7368] space-y-2 mb-4">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span><strong>1 Go de stockage</strong> gratuit à vie</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span><strong>50 000 lectures / jour</strong> gratuites</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span><strong>20 000 écritures / jour</strong> gratuites</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span>Synchronisation temps réel & Auth client</span>
                    </li>
                  </ul>
                  <p className="text-xs text-[#231B15] bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE6D8]">
                    <strong>Idéal pour :</strong> Démarrage rapide sans serveur, synchronisation automatique des commandes et du stock en direct.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EFE6D8]">
                  <span className="text-[11px] text-[#A89F93] font-mono">firebase.google.com</span>
                </div>
              </div>

              {/* Option 2: Supabase PostgreSQL */}
              <div className="bg-white p-6 rounded-2xl border-2 border-emerald-500/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-200">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#231B15]">Supabase (PostgreSQL)</h3>
                      <span className="text-xs font-semibold text-[#2E6349]">Table Editor & SQL Direct</span>
                    </div>
                  </div>
                  <ul className="text-xs text-[#7D7368] space-y-2 mb-4">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span><strong>500 Mo</strong> base de données SQL dédiée gratuite</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span><strong>Table Editor visuel</strong> (interface type tableur moderne)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span><strong>1 Go de stockage d'images</strong> & fichiers</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span>API REST et GraphQL générées en temps réel</span>
                    </li>
                  </ul>
                  <p className="text-xs text-[#231B15] bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                    <strong>Prêt pour Supabase :</strong> Copiez le script SQL ci-dessous dans votre console Supabase pour y voir immédiatement vos 8 catégories et tous vos produits !
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EFE6D8] flex items-center justify-between">
                  <span className="text-[11px] text-[#A89F93] font-mono">supabase.com</span>
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>Ouvrir Supabase</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Option 3: Neon Serverless Postgres */}
              <div className="bg-white p-6 rounded-2xl border border-[#EFE6D8] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-cyan-50 rounded-2xl text-cyan-600 border border-cyan-200">
                      <Server className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#231B15]">Neon Serverless SQL</h3>
                      <span className="text-xs font-semibold text-[#2E6349]">PostgreSQL Serverless Gratuit</span>
                    </div>
                  </div>
                  <ul className="text-xs text-[#7D7368] space-y-2 mb-4">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span><strong>0.5 Go</strong> de données stockées</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span>Connexion SQL instantanée</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span>Branching de base de données (comme Git)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2E6349] shrink-0" />
                      <span>Mise en veille à 0€ quand pas d'activité</span>
                    </li>
                  </ul>
                  <p className="text-xs text-[#231B15] bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE6D8]">
                    <strong>Idéal pour :</strong> Les applications nécessitant un serveur Node/Express avec Drizzle ou Prisma ORM.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EFE6D8]">
                  <span className="text-[11px] text-[#A89F93] font-mono">neon.tech</span>
                </div>
              </div>
            </div>

            {/* Guide Spécifique : Comment voir vos données dans Supabase */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EFE6D8]">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-200">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#231B15]">
                        Guide : Comment voir et gérer ces données dans Supabase
                      </h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 rounded-full">
                        Étape par Étape
                      </span>
                    </div>
                    <p className="text-xs text-[#7D7368]">
                      Suivez ces 3 étapes simples pour voir vos tables <code className="text-[#231B15] font-semibold">categories</code>, <code className="text-[#231B15] font-semibold">products</code> et <code className="text-[#231B15] font-semibold">orders</code> dans le Table Editor de Supabase.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySupabaseSql}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    {copiedSql ? <CheckCircle2 className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedSql ? 'Copié !' : 'Copier le Script SQL Supabase'}</span>
                  </button>

                  <button
                    onClick={handleDownloadSupabaseSql}
                    className="px-4 py-2.5 bg-[#231B15] hover:bg-[#B8683C] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4 text-[#D4AF37]" />
                    <span>Télécharger (.sql)</span>
                  </button>
                </div>
              </div>

              {/* 3 Steps Visual Tutorial */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#EFE6D8] space-y-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h4 className="font-bold text-sm text-[#231B15]">Créer votre projet Supabase</h4>
                  <p className="text-xs text-[#7D7368] leading-relaxed">
                    Rendez-vous sur <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">supabase.com</a>, connectez-vous et créez un nouveau projet gratuit en quelques clics.
                  </p>
                </div>

                <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#EFE6D8] space-y-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h4 className="font-bold text-sm text-[#231B15]">Exécuter le script SQL</h4>
                  <p className="text-xs text-[#7D7368] leading-relaxed">
                    Dans le menu de gauche Supabase, cliquez sur <strong>SQL Editor</strong>, collez le script généré ci-dessous, puis cliquez sur <strong>RUN</strong>.
                  </p>
                </div>

                <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#EFE6D8] space-y-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </div>
                  <h4 className="font-bold text-sm text-[#231B15]">Voir dans Table Editor</h4>
                  <p className="text-xs text-[#7D7368] leading-relaxed">
                    Cliquez sur <strong>Table Editor</strong> dans Supabase : vos tables <code>categories</code>, <code>products</code> et <code>orders</code> s'affichent sous forme de tableur interactif avec vos {products.length} produits et {categories.length} catégories !
                  </p>
                </div>
              </div>

              {/* Live SQL Preview Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#7D7368]">
                  <span>Aperçu du script SQL prêt à être copié dans Supabase :</span>
                  <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {products.length} produits &bull; {categories.length} catégories inclus
                  </span>
                </div>
                <pre className="p-4 bg-[#171513] text-emerald-400 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-56 border border-emerald-900/50">
                  {generateSupabaseSql()}
                </pre>
              </div>
            </div>

            {/* Sauvegarde & Restauration Instantanée (JSON Backup) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE6D8] shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#B8683C]/10 text-[#B8683C] rounded-2xl border border-[#B8683C]/20">
                  <FileJson className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#231B15]">
                    Sauvegarde & Restauration Immédiate du Catalogue
                  </h3>
                  <p className="text-xs text-[#7D7368]">
                    Exportez vos données en 1 clic pour les archiver ou restaurez un fichier catalogue existant.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Export Card */}
                <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EFE6D8] flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-[#231B15] mb-1">1. Exporter le catalogue (JSON)</h4>
                    <p className="text-xs text-[#7D7368]">
                      Télécharge un fichier structuré contenant vos {products.length} produits, {categories.length}{' '}
                      catégories et {orders.length} commandes.
                    </p>
                  </div>
                  <button
                    onClick={handleExportJson}
                    className="w-full py-3 bg-[#231B15] hover:bg-[#B8683C] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4 text-[#D4AF37]" />
                    <span>Télécharger le Fichier JSON</span>
                  </button>
                </div>

                {/* Reset to Default */}
                <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EFE6D8] flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-[#231B15] mb-1">2. Réinitialiser aux données d'origine</h4>
                    <p className="text-xs text-[#7D7368]">
                      Recharge les produits et catégories de base authentiques marocains (argan, savon noir, etc.).
                    </p>
                  </div>
                  <button
                    onClick={() => setIsResetConfirmOpen(true)}
                    className="w-full py-3 bg-white hover:bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Réinitialiser les données</span>
                  </button>
                </div>
              </div>

              {/* Import Area */}
              <div className="pt-4 border-t border-[#EFE6D8] space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#231B15]">
                  3. Importer des données JSON (Coller votre sauvegarde) :
                </label>
                <textarea
                  rows={4}
                  value={jsonImportText}
                  onChange={(e) => setJsonImportText(e.target.value)}
                  placeholder='Collez ici votre JSON (ex: { "products": [...], "categories": [...] })'
                  className="w-full p-3.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-xs font-mono text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30 focus:bg-white"
                />
                {importStatus && (
                  <p className="text-xs font-semibold text-[#B8683C]">{importStatus}</p>
                )}
                <button
                  onClick={handleImportJson}
                  className="px-5 py-2.5 bg-[#B8683C] hover:bg-[#A3592F] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Importer & Mettre à Jour le Catalogue</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================================================================================= */}
      {/* PRODUCT ADD / EDIT MODAL */}
      {/* ================================================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#EFE6D8] shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[#171513] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#B8683C]/30 text-[#D4AF37] rounded-xl border border-[#D4AF37]/30">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {editingProduct ? 'Modifier le Produit Grossiste' : 'Nouveau Produit Grossiste'}
                  </h3>
                  <p className="text-xs text-[#A89C8F]">
                    Maroc Glow • Vente en Gros
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 rounded-full text-[#A89C8F] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#231B15] mb-1.5">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="ex: Huile Pure d'Argan Bio Pressée à Froid"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-sm text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#231B15] mb-1.5">
                    Catégorie *
                  </label>
                  <select
                    value={prodCategorySlug}
                    onChange={(e) => setProdCategorySlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-sm text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30 focus:bg-white"
                  >
                    {categories
                      .filter((c) => c.id !== 'all')
                      .map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#231B15] mb-1.5">
                    Prix Unitaire (FCFA) *
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={prodPriceFcfa}
                    onChange={(e) => setProdPriceFcfa(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-sm font-bold text-[#B8683C] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30 focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#231B15] mb-1.5">
                    URL de la Photo du Produit
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={prodImage}
                      onChange={(e) => setProdImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-sm text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30 focus:bg-white"
                    />
                    {prodImage && (
                      <img
                        src={prodImage}
                        alt="Aperçu"
                        className="w-11 h-11 object-cover rounded-xl border border-[#EFE6D8]"
                      />
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#231B15] mb-1.5">
                    Description détaillée du produit
                  </label>
                  <textarea
                    rows={3}
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    placeholder="Décrivez les bienfaits, la méthode d'extraction et les conseils d'utilisation..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-sm text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30 focus:bg-white"
                  />
                </div>

                {/* Badges and Flags */}
                <div className="sm:col-span-2 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFE6D8] flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2 text-xs font-bold text-[#231B15] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prodInStock}
                      onChange={(e) => setProdInStock(e.target.checked)}
                      className="w-4 h-4 accent-[#B8683C] rounded cursor-pointer"
                    />
                    <span>Disponible en stock</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-[#2E6349] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prodIsBio}
                      onChange={(e) => setProdIsBio(e.target.checked)}
                      className="w-4 h-4 accent-[#2E6349] rounded cursor-pointer"
                    />
                    <span>Certifié 100% Bio</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-[#B8683C] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prodIsBestSeller}
                      onChange={(e) => setProdIsBestSeller(e.target.checked)}
                      className="w-4 h-4 accent-[#B8683C] rounded cursor-pointer"
                    />
                    <span>Bestseller Grossiste</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prodIsNew}
                      onChange={(e) => setProdIsNew(e.target.checked)}
                      className="w-4 h-4 accent-[#D4AF37] rounded cursor-pointer"
                    />
                    <span>Nouveauté</span>
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#EFE6D8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EFE6D8] hover:bg-[#FAF7F2] text-xs font-bold text-[#7D7368] transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#B8683C] hover:bg-[#A3592F] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Enregistrer les Modifications' : 'Créer le Produit'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================================= */}
      {/* CATEGORY ADD / EDIT MODAL */}
      {/* ================================================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EFE6D8] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 bg-[#171513] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FolderPlus className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-base font-bold">
                  {editingCategory ? 'Modifier la Catégorie' : 'Nouvelle Catégorie'}
                </h3>
              </div>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1.5 rounded-full text-[#A89C8F] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#231B15] mb-1.5">
                  Nom de la catégorie *
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => {
                    setCatName(e.target.value);
                    if (!editingCategory) {
                      setCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                    }
                  }}
                  placeholder="ex: Savons Noirs & Hammam"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-sm text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#231B15] mb-1.5">
                  Slug / Identifiant URL
                </label>
                <input
                  type="text"
                  value={catSlug}
                  onChange={(e) => setCatSlug(e.target.value)}
                  placeholder="ex: savons-noirs"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-sm font-mono text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#231B15] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="Description pour vos clients et revendeurs..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-sm text-[#231B15] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30 focus:bg-white"
                />
              </div>

              <div className="pt-3 border-t border-[#EFE6D8] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#EFE6D8] text-xs font-bold text-[#7D7368]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B8683C] hover:bg-[#A3592F] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  {editingCategory ? 'Sauvegarder' : 'Créer la Catégorie'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================================= */}
      {/* DELETE CONFIRMATION MODAL (Non-blocking in-app modal, works inside iframe) */}
      {/* ================================================================================= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EFE6D8] shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 bg-red-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Trash2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-serif text-base font-bold">
                  {deleteTarget.type === 'product' ? 'Supprimer le produit grossiste' : 'Supprimer la catégorie'}
                </h3>
              </div>
              <button
                onClick={() => setDeleteTarget(null)}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-[#231B15] leading-relaxed">
                Êtes-vous sûr de vouloir supprimer définitivement {deleteTarget.type === 'product' ? 'le produit' : 'la catégorie'} :
              </p>
              
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl">
                <p className="font-bold text-[#231B15] text-sm break-words">
                  « {deleteTarget.name} »
                </p>
                <p className="text-[11px] text-red-700 mt-1">
                  Cette action est immédiate et sera synchronisée avec la base de données PostgreSQL.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#EFE6D8] text-xs font-bold text-[#7D7368] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Oui, Supprimer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================================= */}
      {/* RESET CONFIRMATION MODAL */}
      {/* ================================================================================= */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EFE6D8] shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 bg-[#231B15] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#D4AF37]/20 rounded-xl">
                  <RefreshCw className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-base font-bold">Réinitialiser le catalogue</h3>
              </div>
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="p-1.5 rounded-full text-[#A89C8F] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-[#231B15] leading-relaxed">
                Voulez-vous réinitialiser l'ensemble du catalogue aux produits et aux 8 catégories de soins marocains d'origine ?
              </p>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EFE6D8] text-xs font-bold text-[#7D7368] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetConfirmOpen(false);
                    onResetDefaultData();
                    showToast('Catalogue réinitialisé avec succès aux produits d’origine.');
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Confirmer la réinitialisation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
