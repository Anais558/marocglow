import React from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../data/products';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Plane } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  promoCode?: string;
  onApplyPromoCode?: (code: string) => void;
  discountAmount?: number;
  currency?: Currency;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currency = 'FCFA',
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.priceFcfa * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Dark backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#231B15]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full max-w-md bg-white border-l border-[#EFE6D8] shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-5 bg-white border-b border-[#EFE6D8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#FAF7F2] rounded-xl text-[#B8683C] border border-[#EFE6D8]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#231B15]">Mon Panier</h3>
                <span className="text-xs text-[#7D7368]">
                  {items.length} article{items.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#7D7368] hover:text-[#231B15] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping notice banner */}
          {items.length > 0 && (
            <div className="bg-[#FAF7F2] px-4 py-2.5 border-b border-[#EFE6D8] text-xs flex items-center justify-between gap-2 text-[#7D7368]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B8683C] shrink-0" />
                <span className="font-semibold text-[#231B15]">Livraison :</span>
              </div>
              <span className="px-2.5 py-0.5 bg-white rounded-md text-[#B8683C] text-[11px] font-bold border border-[#EFE6D8]">
                À définir plus tard
              </span>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 bg-[#FAF7F2] text-[#B8683C] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EFE6D8]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#231B15] mb-1">
                  Votre panier est vide
                </h4>
                <p className="text-xs text-[#7D7368] mb-6">
                  Découvrez nos huiles pures et soins botaniques marocains d'exception.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#231B15] hover:bg-[#B8683C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Explorer le Catalogue
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#EFE6D8] shadow-2xs flex gap-3.5 items-center hover:border-[#B8683C]/40 transition-colors"
                >
                  {/* Item Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#EFE6D8] shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h5 className="font-serif font-bold text-sm text-[#231B15] truncate leading-tight">
                        {item.product.name}
                      </h5>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#A89F93] hover:text-[#B8683C] p-1 transition-colors cursor-pointer"
                        title="Supprimer l'article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#7D7368] mb-2 font-medium">
                      <span className="text-[#B8683C] font-semibold">{formatPrice(item.product.priceFcfa, currency)}</span>
                    </div>

                    {/* Quantity Stepper & Line Subtotal */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-[#FAF7F2] rounded-full border border-[#EFE6D8] p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#231B15] hover:bg-white rounded-full transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-[#231B15]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#231B15] hover:bg-white rounded-full transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-bold text-xs text-[#231B15]">
                        {formatPrice(item.product.priceFcfa * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Pricing Breakdown & Checkout Button */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#EFE6D8] space-y-4 shadow-lg">
              {/* Price Calculations */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-[#7D7368]">
                  <span>Sous-total articles :</span>
                  <span className="font-bold text-[#231B15]">{formatPrice(subtotal, currency)}</span>
                </div>

                <div className="flex justify-between items-center text-[#7D7368]">
                  <span>Livraison :</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FAF7F2] text-[#B8683C] font-semibold text-[11px] border border-[#EFE6D8]">
                    À définir plus tard
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#231B15] pt-2 border-t border-[#EFE6D8]">
                  <div>
                    <span>Total :</span>
                    <span className="block text-[10px] font-normal text-[#7D7368]">
                      Livraison à définir plus tard
                    </span>
                  </div>
                  <span className="text-[#B8683C] font-extrabold">{formatPrice(subtotal, currency)}</span>
                </div>
              </div>

              {/* CTA Checkout */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-[#231B15] hover:bg-[#B8683C] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Finaliser la commande</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
