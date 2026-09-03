import React from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/products';
import { ShoppingBag, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isAddedJustNow?: boolean;
  currency?: Currency;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
  isAddedJustNow = false,
  currency = 'FCFA',
}) => {
  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#EFE6D8] hover:border-[#B8683C]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full relative cursor-pointer"
    >
      {/* Visual Badge Row (Removed Best-Seller) */}

      {/* Square Image with clean smooth hover zoom */}
      <div
        className="relative aspect-square w-full bg-[#FAF7F2] rounded-lg sm:rounded-xl overflow-hidden mb-2.5 sm:mb-3"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Subtle quick view overlay */}
        <div className="absolute inset-0 bg-[#231B15]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-3 py-1.5 bg-white/95 text-[#231B15] text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-xs backdrop-blur-xs">
            Aperçu
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          {/* Product Name - larger and clearer */}
          <h3
            className="font-serif text-sm sm:text-base font-bold text-[#231B15] line-clamp-2 group-hover:text-[#B8683C] transition-colors mb-1.5 min-h-[2.5rem] sm:min-h-[2.8rem] leading-snug"
          >
            {product.name}
          </h3>

          {/* Short description */}
          {product.shortDescription && (
            <p className="text-[11px] sm:text-xs text-[#7D7368] line-clamp-1 leading-normal mb-2 hidden sm:block">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Footer of card: Price & "Ajouter" action button */}
        <div className="pt-2 sm:pt-2.5 border-t border-[#EFE6D8]/80 flex items-center justify-between gap-1.5 sm:gap-2">
          <span className="text-xs sm:text-sm font-bold text-[#231B15] whitespace-nowrap">
            {formatPrice(product.priceFcfa, currency)}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className={`py-1.5 sm:py-2 px-2.5 sm:px-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0 ${
              isAddedJustNow
                ? 'bg-[#2E6349] text-white shadow-xs'
                : 'bg-[#231B15] hover:bg-[#B8683C] text-white shadow-xs'
            }`}
            title="Ajouter au panier"
          >
            {isAddedJustNow ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span className="truncate">Ajouté</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 text-[#D4AF37]" />
                <span className="truncate">Ajouter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
