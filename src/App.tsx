import React, { useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, ViewMode, Currency } from './types';
import { PRODUCTS, CATEGORIES, INITIAL_ORDERS } from './data/products';
import { api } from './services/api';
import { Header } from './components/Header';
import { CatalogueView } from './components/CatalogueView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AdminView } from './components/AdminView';
import { Footer } from './components/Footer';
import { LegalModals } from './components/LegalModals';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('catalogue');
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('maroc_glow_currency');
      return (saved === 'EUR' || saved === 'FCFA') ? saved : 'FCFA';
    } catch {
      return 'FCFA';
    }
  });

  // Dynamic Products State with LocalStorage & Database API
  const [products, setProducts] = useState<Product[]>(() => {
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
  });

  // Dynamic Categories State with LocalStorage & Database API
  const [categories, setCategories] = useState<Category[]>(() => {
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
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maroc_glow_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('maroc_glow_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Dynamic Database Sync State
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  const handleSyncDatabase = async () => {
    setIsSyncingDb(true);
    try {
      const [dbProducts, dbCategories, dbOrders] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
        api.getOrders(),
      ]);
      if (Array.isArray(dbProducts) && dbProducts.length > 0) setProducts(dbProducts);
      if (Array.isArray(dbCategories) && dbCategories.length > 0) setCategories(dbCategories);
      if (Array.isArray(dbOrders) && dbOrders.length > 0) setOrders(dbOrders);
      const nowStr = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSyncTime(nowStr);
    } catch (err) {
      console.warn('Database sync error:', err);
    } finally {
      setIsSyncingDb(false);
    }
  };

  // Initial load from Database API
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('admin') === 'true' || searchParams.get('admin') === '1' || window.location.hash === '#admin') {
        setCurrentView('admin');
      }
    } catch {
      // ignore
    }

    let isMounted = true;
    const loadDbData = async () => {
      setIsSyncingDb(true);
      try {
        const [dbProducts, dbCategories, dbOrders] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
          api.getOrders(),
        ]);
        if (isMounted) {
          if (Array.isArray(dbProducts) && dbProducts.length > 0) setProducts(dbProducts);
          if (Array.isArray(dbCategories) && dbCategories.length > 0) setCategories(dbCategories);
          if (Array.isArray(dbOrders) && dbOrders.length > 0) setOrders(dbOrders);
          setLastSyncTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      } catch (err) {
        console.warn('Initial DB load error:', err);
      } finally {
        if (isMounted) setIsSyncingDb(false);
      }
    };
    loadDbData();
    return () => {
      isMounted = false;
    };
  }, []);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [highlightOrderId, setHighlightOrderId] = useState<string | null>(null);
  const [recentlyPlacedOrder, setRecentlyPlacedOrder] = useState<Order | null>(null);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  // Sync currency to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maroc_glow_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maroc_glow_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Sync categories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maroc_glow_categories', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maroc_glow_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maroc_glow_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Reset to default data
  const handleResetDefaultData = async () => {
    setProducts(PRODUCTS);
    setCategories(CATEGORIES);
    setOrders(INITIAL_ORDERS);
    try {
      localStorage.removeItem('maroc_glow_products');
      localStorage.removeItem('maroc_glow_categories');
      localStorage.removeItem('maroc_glow_orders');
      await api.resetDatabase();
    } catch (e) {
      console.error(e);
    }
  };

  // Cart count & subtotal calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.priceFcfa * item.quantity,
    0
  );

  const discountAmount =
    promoCode === 'GLOW10' || promoCode === 'MAROC10'
      ? Math.round(cartSubtotal * 0.1)
      : promoCode === 'BIENVENUE' || promoCode === 'LIVRAISON'
      ? 1500
      : 0;

  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  // Add to cart handler
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stockQuantity, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  // Remove item from cart
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Instant buy: adds to cart and redirects straight to checkout
  const handleInstantBuy = (product: Product, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View Product details
  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation router helper
  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create new order
  const handleCreateOrder = async (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setRecentlyPlacedOrder(newOrder);
    try {
      await api.createOrder(newOrder);
    } catch (e) {
      console.warn('Could not sync order to database:', e);
    }
  };

  // Track specific order
  const handleTrackOrderFromSuccess = (orderId: string) => {
    setRecentlyPlacedOrder(null);
    setHighlightOrderId(orderId);
    setCurrentView('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#231B15] font-sans selection:bg-[#B8683C]/20 selection:text-[#B8683C]">
      {/* Persistent Global Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
        onSearchClick={() => {
          if (currentView === 'admin') {
            setCurrentView('catalogue');
          }
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (searchInput) searchInput.focus();
        }}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentView === 'catalogue' && (
          <CatalogueView
            products={products}
            categories={categories}
            onViewDetails={handleViewProductDetails}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            addedProductId={addedProductId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currency={currency}
            onSyncDatabase={handleSyncDatabase}
            isSyncingDb={isSyncingDb}
          />
        )}

        {currentView === 'product_detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            allProducts={products}
            onBack={() => handleNavigate('catalogue')}
            onAddToCart={handleAddToCart}
            onInstantBuy={handleInstantBuy}
            onViewProduct={handleViewProductDetails}
            currency={currency}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            items={cartItems}
            discountAmount={discountAmount}
            promoCode={promoCode}
            onBackToCatalogue={() => handleNavigate('catalogue')}
            onCreateOrder={handleCreateOrder}
            currency={currency}
          />
        )}

        {currentView === 'tracking' && (
          <OrderTrackingView
            orders={orders}
            highlightOrderId={highlightOrderId}
            onGoToCatalogue={() => handleNavigate('catalogue')}
            currency={currency}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            products={products}
            categories={categories}
            orders={orders}
            currency={currency}
            onUpdateProducts={setProducts}
            onUpdateCategories={setCategories}
            onUpdateOrders={setOrders}
            onResetDefaultData={handleResetDefaultData}
            onBackToStore={() => handleNavigate('catalogue')}
            onSyncDatabase={handleSyncDatabase}
            isSyncingDb={isSyncingDb}
            lastSyncTime={lastSyncTime}
          />
        )}
      </main>

      {/* Cart Drawer Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          handleNavigate('checkout');
        }}
        promoCode={promoCode}
        onApplyPromoCode={setPromoCode}
        discountAmount={discountAmount}
        currency={currency}
      />

      {/* Order Success Popup */}
      {recentlyPlacedOrder && (
        <OrderSuccessModal
          order={recentlyPlacedOrder}
          onTrackOrder={handleTrackOrderFromSuccess}
          onContinueShopping={() => {
            setRecentlyPlacedOrder(null);
            handleNavigate('catalogue');
          }}
          currency={currency}
        />
      )}

      {/* Legal terms and privacy popups */}
      <LegalModals type={legalModalType} onClose={() => setLegalModalType(null)} />

      {/* Persistent Global Footer (shown when not in admin view or at bottom of all) */}
      {currentView !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenLegal={(type) => setLegalModalType(type)}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}
    </div>
  );
}
