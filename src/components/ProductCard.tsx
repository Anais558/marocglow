import React from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../data/products';
import { ShoppingBag, Check, Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  quantityInCart?: number;
  isAddedJustNow?: boolean;
  currency?: Currency;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
  onUpdateQuantity,
  quantityInCart = 0,
  isAddedJustNow = false,
  currency = 'FCFA',
}) => {
  const isInCart = quantityInCart > 0;

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group bg-white p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#EFE6D8] hover:border-[#B8683C]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full relative cursor-pointer"
    >
      {/* Square Image with clean smooth hover zoom */}
      <div className="relative aspect-square w-full bg-[#FAF7F2] rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-2.5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* In-cart indicator badge */}
        {isInCart && (
          <div className="absolute top-1.5 right-1.5 bg-[#B8683C] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
            <span>{quantityInCart}</span>
            <span className="text-[9px] opacity-80">au panier</span>
          </div>
        )}

        {/* Subtle quick view overlay */}
        <div className="absolute inset-0 bg-[#231B15]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-2.5 py-1 bg-white/95 text-[#231B15] text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-xs backdrop-blur-xs">
            Aperçu
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          {/* Product Name - clear, ultra-readable font */}
          <h3 className="font-sans text-[13px] sm:text-[15px] font-bold text-[#1E1916] line-clamp-2 group-hover:text-[#B8683C] transition-colors mb-1.5 min-h-[2.3rem] sm:min-h-[2.6rem] leading-snug tracking-tight">
            {product.name}
          </h3>

          {/* Short description hidden on mobile to keep card compact */}
          {product.shortDescription && (
            <p className="text-[11px] sm:text-xs text-[#7D7368] line-clamp-1 leading-normal mb-2 hidden sm:block">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Footer of card: Price & Interactive Action */}
        <div className="pt-1.5 sm:pt-2.5 border-t border-[#EFE6D8]/80 flex items-center justify-between gap-1 sm:gap-2">
          <span className="text-xs sm:text-sm font-bold text-[#231B15] whitespace-nowrap">
            {formatPrice(product.priceFcfa, currency)}
          </span>

          {/* Action button: transforms into +/- selector when in cart */}
          {isInCart ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center bg-[#1E1916] rounded-md sm:rounded-lg p-0.5 border border-[#3A322B] shadow-xs shrink-0"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onUpdateQuantity) {
                    onUpdateQuantity(product.id, quantityInCart - 1);
                  }
                }}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-[#C4B7A5] hover:text-white hover:bg-[#2A2420] active:scale-90 transition-all cursor-pointer"
                aria-label="Diminuer la quantité"
                title="Diminuer"
              >
                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>

              <span className="px-1 sm:px-1.5 text-[11px] sm:text-xs font-bold text-[#FAF7F2] min-w-[16px] sm:min-w-[20px] text-center select-none">
                {quantityInCart}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onUpdateQuantity) {
                    onUpdateQuantity(product.id, Math.min(product.stockQuantity, quantityInCart + 1));
                  } else {
                    onAddToCart(product);
                  }
                }}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#B8683C] hover:bg-[#A3592F] flex items-center justify-center text-white active:scale-90 transition-all cursor-pointer"
                aria-label="Augmenter la quantité"
                title="Augmenter"
              >
                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className={`py-1 sm:py-1.5 px-2 sm:px-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md sm:rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0 ${
                isAddedJustNow
                  ? 'bg-[#2E6349] text-white shadow-xs'
                  : 'bg-[#231B15] hover:bg-[#B8683C] text-white shadow-xs active:scale-95'
              }`}
              title="Ajouter au panier"
            >
              {isAddedJustNow ? (
                <>
                  <Check className="w-3 h-3 text-white" />
                  <span>Ajouté</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 text-[#D4AF37]" />
                  <span>Ajouter</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
