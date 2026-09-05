import React, { useState, useMemo } from 'react';
import { Product, Currency, CartItem } from '../types';
import { formatPrice, STORE_PHONE_CLEAN } from '../data/products';
import { ProductCard } from './ProductCard';
import {
  ArrowLeft,
  ShoppingBag,
  Zap,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  cartItems?: CartItem[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onInstantBuy: (product: Product, quantity?: number) => void;
  onViewProduct: (product: Product) => void;
  currency?: Currency;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  cartItems = [],
  onBack,
  onAddToCart,
  onUpdateQuantity,
  onInstantBuy,
  onViewProduct,
  currency = 'FCFA',
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'usage'>('desc');

  // Sync selected image if product changes
  React.useEffect(() => {
    setSelectedImage(product.image);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Real-time total calculation
  const totalAmountFcfa = useMemo(() => {
    return product.priceFcfa * quantity;
  }, [product.priceFcfa, quantity]);

  // Similar products (same category, excluding current product)
  const similarProducts = useMemo(() => {
    const sameCat = allProducts.filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== product.id
    );
    if (sameCat.length >= 3) {
      return sameCat.slice(0, 4);
    }
    // Fallback to other top products
    const others = allProducts.filter((p) => p.id !== product.id && !sameCat.includes(p));
    return [...sameCat, ...others].slice(0, 4);
  }, [allProducts, product]);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleInstantBuy = () => {
    onInstantBuy(product, quantity);
  };

  // WhatsApp Contact URL with tailored inquiry
  const whatsappUrl = useMemo(() => {
    const message = encodeURIComponent(
      `Bonjour Maroc Glow ✨\nJe souhaite avoir des conseils ou passer commande pour le produit :\n- *${product.name}*\n- Prix unitaire : *${formatPrice(product.priceFcfa, currency)}*\n- Quantité souhaitée : *${quantity}*\n- Total : *${formatPrice(totalAmountFcfa, currency)}*\n\nPouvez-vous m'aider ? Merci !`
    );
    // Real store WhatsApp link
    return `https://wa.me/${STORE_PHONE_CLEAN}?text=${message}`;
  }, [product, quantity, totalAmountFcfa, currency]);

  // Lookup map for fast quantity retrieval
  const cartQuantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of cartItems) {
      if (item?.product?.id) {
        map[item.product.id] = (map[item.product.id] || 0) + item.quantity;
      }
    }
    return map;
  }, [cartItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb / Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#231B15] hover:text-[#B8683C] transition-colors bg-white px-4 py-2.5 rounded-full border border-[#EFE6D8] shadow-2xs hover:border-[#B8683C] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#B8683C]" />
          <span>Retour au Catalogue</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#7D7368]">
          <span>Catalogue</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-[#231B15] font-bold truncate max-w-[200px]">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Product Sheet (2 columns layout) */}
      <div className="bg-white rounded-3xl border border-[#EFE6D8] shadow-md overflow-hidden p-6 sm:p-8 lg:p-10 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Large Image and Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Primary Large Image Frame */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#EFE6D8] group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Badges on main image (Best-Seller removed) */}
            </div>

            {/* Gallery Thumbnails (if multiple images) */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImage === imgUrl
                        ? 'border-[#B8683C] shadow-xs scale-102'
                        : 'border-[#EFE6D8] opacity-70 hover:opacity-100 hover:border-[#B8683C]/40'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} vue ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust highlights under image */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#EFE6D8] text-center">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EFE6D8]">
                <ShieldCheck className="w-4 h-4 text-[#B8683C] mx-auto mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#231B15] block">Pureté Garantie</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EFE6D8]">
                <Truck className="w-4 h-4 text-[#B8683C] mx-auto mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#231B15] block">Livraison 24/48h</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EFE6D8]">
                <RotateCcw className="w-4 h-4 text-[#B8683C] mx-auto mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#231B15] block">Satisfait ou Remboursé</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Specs, Price, Quantity, Total, CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category, Brand */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-[0.16em] text-[#B8683C] uppercase text-[11px]">
                    {product.brand || 'Maroc Glow'}
                  </span>
                  <span className="text-[#EFE6D8]">•</span>
                  <span className="bg-[#FAF7F2] text-[#7D7368] px-3 py-1 rounded-full font-semibold border border-[#EFE6D8] text-[11px]">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E1916] leading-tight mb-4 tracking-tight">
                {product.name}
              </h1>

              {/* Price Display */}
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EFE6D8] mb-6 flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B8683C] mb-1">
                    Prix Unitaire
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-bold text-[#231B15] tracking-tight">
                      {formatPrice(product.priceFcfa, currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Availability status */}
              <div className="flex items-center gap-2 mb-6 text-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E6349] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2E6349]"></span>
                </span>
                <span className="font-bold text-[#2E6349]">
                  {product.inStock ? 'En stock' : 'Rupture temporaire'}
                </span>
              </div>

              {/* Quantity Selector & Real-Time Total Box */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EFE6D8] mb-6 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#231B15]">
                    Quantité :
                  </label>

                  <div className="flex items-center bg-[#FAF7F2] rounded-full border border-[#EFE6D8] p-1">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-full text-[#231B15] hover:bg-white disabled:opacity-30 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                      aria-label="Diminuer la quantité"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-[#231B15]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-8 h-8 rounded-full text-[#231B15] hover:bg-white transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                      aria-label="Augmenter la quantité"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Real-time Total Calculation */}
                <div className="pt-3 border-t border-[#EFE6D8] flex items-center justify-between text-sm">
                  <span className="text-xs text-[#7D7368] font-medium">
                    Total pour {quantity} produit{quantity > 1 ? 's' : ''} :
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-[#B8683C]">
                    {formatPrice(totalAmountFcfa, currency)}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Add to Cart, Buy Now, WhatsApp Contact */}
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Ajouter au panier */}
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                      addedAnimation
                        ? 'bg-[#2E6349] text-white border-[#2E6349]'
                        : 'bg-white hover:bg-[#FAF7F2] text-[#231B15] border-[#EFE6D8] hover:border-[#B8683C]'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Ajouté au panier !</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#B8683C]" />
                        <span>Ajouter au panier</span>
                      </>
                    )}
                  </button>

                  {/* Commander maintenant */}
                  <button
                    onClick={handleInstantBuy}
                    className="w-full py-3.5 px-4 bg-[#231B15] hover:bg-[#B8683C] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    <span>Commander</span>
                  </button>
                </div>

                {/* WhatsApp Direct Contact Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075E54] font-bold text-xs uppercase tracking-wider rounded-xl border border-[#25D366]/30 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Commander ou Devis Gros sur WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Information Tabs (Description, Conseils) */}
            <div className="mt-4 pt-4 border-t border-[#EFE6D8]">
              <div className="flex items-center gap-6 border-b border-[#EFE6D8] pb-2 mb-3">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`text-xs font-bold pb-2 transition-colors relative cursor-pointer ${
                    activeTab === 'desc'
                      ? 'text-[#B8683C]'
                      : 'text-[#7D7368] hover:text-[#231B15]'
                  }`}
                >
                  Description
                  {activeTab === 'desc' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8683C]" />
                  )}
                </button>
                {product.usageAdvice && (
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`text-xs font-bold pb-2 transition-colors relative cursor-pointer ${
                      activeTab === 'usage'
                        ? 'text-[#B8683C]'
                        : 'text-[#7D7368] hover:text-[#231B15]'
                    }`}
                  >
                    Conseils d'utilisation
                    {activeTab === 'usage' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8683C]" />
                    )}
                  </button>
                )}
              </div>

              <div className="text-xs text-[#231B15] leading-relaxed">
                {activeTab === 'desc' && <p>{product.description}</p>}

                {activeTab === 'usage' && product.usageAdvice && (
                  <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EFE6D8]">
                    <p className="italic font-serif text-[#231B15] text-sm">🌿 {product.usageAdvice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Produits Similaires */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EFE6D8]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B8683C] mb-1">
              Catalogue Marocain
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231B15]">
              Autres Produits Disponibles
            </h2>
          </div>
          <button
            onClick={onBack}
            className="text-xs font-bold text-[#B8683C] hover:underline cursor-pointer"
          >
            Tout le catalogue →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {similarProducts.map((simProd) => (
            <ProductCard
              key={simProd.id}
              product={simProd}
              onViewDetails={onViewProduct}
              onAddToCart={(p) => onAddToCart(p, 1)}
              onUpdateQuantity={onUpdateQuantity}
              quantityInCart={cartQuantityMap[simProd.id] || 0}
              currency={currency}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
