import React, { useState, useMemo } from 'react';
import { Product, Category, Currency, CartItem } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, Sparkles, X, ArrowUpDown, CheckCircle2, Shield, Leaf, HeartHandshake, RefreshCw, Plus, ShieldCheck } from 'lucide-react';

interface CatalogueViewProps {
  products: Product[];
  categories?: Category[];
  cartItems?: CartItem[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  addedProductId: string | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currency?: Currency;
  onSyncDatabase?: () => void;
  isSyncingDb?: boolean;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  products,
  categories = CATEGORIES,
  cartItems = [],
  onViewDetails,
  onAddToCart,
  onUpdateQuantity,
  addedProductId,
  searchQuery,
  onSearchChange,
  currency = 'FCFA',
  onSyncDatabase,
  isSyncingDb = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc' | 'popular'>('recent');
  const [onlyBio, setOnlyBio] = useState<boolean>(false);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchIng = p.ingredients.some((i) => i.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchBrand && !matchCat && !matchIng) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'all') {
          if (p.categorySlug !== selectedCategory) {
            return false;
          }
        }

        // Bio filter
        if (onlyBio && !p.isBio) return false;

        // In Stock filter
        if (onlyInStock && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceFcfa - b.priceFcfa;
        if (sortBy === 'price-desc') return b.priceFcfa - a.priceFcfa;
        if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
        // Default recent
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      });
  }, [products, searchQuery, selectedCategory, sortBy, onlyBio, onlyInStock]);

  // Sort categories so that categories with items come first, and those with 0 come at the end
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      // 'Tous les produits' remains first
      if (a.id === 'all' || a.slug === 'all') return -1;
      if (b.id === 'all' || b.slug === 'all') return 1;

      const countA = products.filter((p) => p.categorySlug === a.slug).length;
      const countB = products.filter((p) => p.categorySlug === b.slug).length;

      // Categories with products come before categories with zero products
      if (countA > 0 && countB === 0) return -1;
      if (countA === 0 && countB > 0) return 1;

      // If both have products, order by product count descending
      if (countA !== countB) return countB - countA;

      return 0;
    });
  }, [categories, products]);

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
    <div className="pb-20 w-full max-w-full overflow-x-hidden">
      {/* Grand bloc Hero & Catalogue Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFEB] via-[#FAF7F2] to-[#FAF7F2] pt-8 sm:pt-10 pb-10 sm:pb-12 border-b border-[#EFE6D8] w-full max-w-full">
        {/* Subtle decorative Moroccan pattern / ambient aura */}
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#B8683C]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Main title block */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-white/90 text-[#B8683C] text-xs font-bold uppercase tracking-[0.16em] px-3.5 sm:px-4 py-1.5 rounded-full mb-3 sm:mb-4 border border-[#EFE6D8] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Grossiste • Vente en Gros</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#231B15] tracking-tight leading-[1.15] mb-3 sm:mb-4">
              Produits Marocains en Gros
            </h1>

            <p className="text-xs sm:text-base md:text-lg text-[#7D7368] font-medium max-w-2xl mx-auto leading-relaxed">
              Huiles d'argan pures certifiées, savons noirs, gommages, eaux florales et cosmétiques naturels du Maroc. Tarifs grossistes avantageux par carton et lot pour revendeurs, boutiques, spas et instituts.
            </p>

            {/* Feature Pills */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white px-3 py-1.5 rounded-full border border-[#EFE6D8] shadow-2xs text-[11px] sm:text-xs font-medium text-[#231B15]">
                <Leaf className="w-3.5 h-3.5 text-[#2E6349]" />
                <span>100% Naturel & Origine Maroc</span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white px-3 py-1.5 rounded-full border border-[#EFE6D8] shadow-2xs text-[11px] sm:text-xs font-medium text-[#231B15]">
                <Shield className="w-3.5 h-3.5 text-[#B8683C]" />
                <span>Prix Grossiste & Direct</span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white px-3 py-1.5 rounded-full border border-[#EFE6D8] shadow-2xs text-[11px] sm:text-xs font-medium text-[#231B15]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                <span className="font-bold text-[#B8683C]">{products.length} références</span>
                <span className="text-[#7D7368]">disponibles</span>
              </div>
            </div>
          </div>

          {/* Search & Filters interactive bar */}
          <div className="bg-white p-3.5 sm:p-6 rounded-2xl border border-[#EFE6D8] shadow-md max-w-4xl mx-auto space-y-4 sm:space-y-5 w-full">
            {/* Search Input with live search */}
            <div className="relative">
              <Search className="w-4 sm:w-5 h-4 sm:h-5 text-[#B8683C] absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Rechercher un produit grossiste (argan, savon noir, eau de rose...)"
                className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-3.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-xs sm:text-sm text-[#231B15] placeholder-[#A89F93] focus:outline-none focus:ring-2 focus:ring-[#B8683C]/30 focus:border-[#B8683C] focus:bg-white transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7D7368] hover:text-[#231B15] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Categories horizontal scroll pills */}
            <div className="w-full">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#7D7368] mb-2.5 flex items-center justify-between">
                <span>Rayons & Catégories Grossistes :</span>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-[11px] text-[#B8683C] hover:underline font-bold cursor-pointer"
                  >
                    Tout afficher ({products.length})
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none w-full max-w-full touch-pan-x">
                {sortedCategories.map((cat) => {
                  const count =
                    cat.id === 'all'
                      ? products.length
                      : products.filter((p) => p.categorySlug === cat.slug).length;

                  const isActive = selectedCategory === cat.slug;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#231B15] text-[#FAF7F2] font-bold shadow-xs border border-[#231B15]'
                          : 'bg-[#FAF7F2] border border-[#EFE6D8] text-[#7D7368] hover:bg-white hover:text-[#231B15] hover:border-[#B8683C]/40 font-medium'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-[#B8683C] text-white'
                            : 'bg-[#EFE6D8] text-[#7D7368]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick toggles & Sort bar */}
            <div className="pt-3 border-t border-[#EFE6D8] flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Checkbox filters */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[#7D7368] hover:text-[#231B15] font-medium">
                  <input
                    type="checkbox"
                    checked={onlyBio}
                    onChange={(e) => setOnlyBio(e.target.checked)}
                    className="rounded border-[#EFE6D8] text-[#B8683C] focus:ring-[#B8683C] accent-[#B8683C]"
                  />
                  <span>100% Bio</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none text-[#7D7368] hover:text-[#231B15] font-medium">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded border-[#EFE6D8] text-[#B8683C] focus:ring-[#B8683C] accent-[#B8683C]"
                  />
                  <span>En stock uniquement</span>
                </label>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[#7D7368] flex items-center gap-1 font-medium">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#B8683C]" />
                  Trier par :
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FAF7F2] border border-[#EFE6D8] text-[#231B15] rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B8683C] cursor-pointer"
                >
                  <option value="recent">Nouveautés & Récents</option>
                  <option value="popular">Meilleures ventes</option>
                  <option value="price-asc">Prix : Croissant</option>
                  <option value="price-desc">Prix : Décroissant</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-8 sm:pt-12 w-full max-w-full">
        {/* Results Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-[#EFE6D8] w-full">
          <div>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#231B15]">
              {selectedCategory === 'all'
                ? 'Nos Produits Disponibles'
                : CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
            </h2>
            <p className="text-xs text-[#7D7368] mt-1 font-medium">
              Affichage de {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}{' '}
              {searchQuery && `pour "${searchQuery}"`}
            </p>
          </div>

          {filteredProducts.length > 0 && (
            <span className="self-start sm:self-auto text-[11px] sm:text-xs font-semibold text-[#231B15] bg-white px-3 sm:px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-[#EFE6D8] shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B8683C]" />
              Tarifs en {currency === 'EUR' ? 'Euros (€)' : 'FCFA (XOF)'}
            </span>
          )}
        </div>

        {/* Product Cards Grid: 2 cols on mobile, 3 on tablet, 4 on desktop/pc */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6 w-full">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewDetails}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
                quantityInCart={cartQuantityMap[product.id] || 0}
                isAddedJustNow={addedProductId === product.id}
                currency={currency}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-3xl border border-[#EFE6D8] max-w-lg mx-auto shadow-sm space-y-5">
            <div className="w-16 h-16 bg-[#FAF7F2] text-[#B8683C] rounded-full flex items-center justify-center mx-auto border border-[#EFE6D8]">
              <Sparkles className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#231B15]">
                Chargement du catalogue...
              </h3>
              <p className="text-xs text-[#7D7368] mt-2 leading-relaxed">
                Connexion à la boutique en cours. Veuillez patienter un instant.
              </p>
            </div>

            {onSyncDatabase && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={onSyncDatabase}
                  disabled={isSyncingDb}
                  className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#EFE6D8] text-[#231B15] border border-[#EFE6D8] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 text-[#B8683C] ${isSyncingDb ? 'animate-spin' : ''}`} />
                  <span>{isSyncingDb ? 'Actualisation...' : 'Actualiser le catalogue'}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#EFE6D8] max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-[#FAF7F2] text-[#B8683C] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EFE6D8]">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#231B15] mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-xs text-[#7D7368] mb-6">
              Nous n'avons pas trouvé de produit correspondant à vos filtres.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                setSelectedCategory('all');
                setOnlyBio(false);
                setOnlyInStock(false);
              }}
              className="px-6 py-2.5 bg-[#231B15] hover:bg-[#B8683C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>

      {/* Brand Reassurance Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#EFE6D8] shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-[#FAF7F2] rounded-xl text-[#B8683C] border border-[#EFE6D8] shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#231B15] mb-1">
                Vente en Gros & en Détail
              </h4>
              <p className="text-xs text-[#7D7368] leading-relaxed">
                Produits 100% naturels importés directement du Maroc. Tarifs préférentiels pour particuliers, revendeurs et instituts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-[#FAF7F2] rounded-xl text-[#B8683C] border border-[#EFE6D8] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#231B15] mb-1">
                Paiement Cash ou Mobile Money
              </h4>
              <p className="text-xs text-[#7D7368] leading-relaxed">
                Paiement sécurisé en FCFA à la livraison ou par Wave, Orange Money, Moov et MTN Money dès réception.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-[#FAF7F2] rounded-xl text-[#B8683C] border border-[#EFE6D8] shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#231B15] mb-1">
                Commandes & Devis WhatsApp 7j/7
              </h4>
              <p className="text-xs text-[#7D7368] leading-relaxed">
                Besoin d'un devis pour une commande en gros ou d'un conseil ? Contactez directement notre équipe commerciale.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
