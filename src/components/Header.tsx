import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ShoppingBag, Truck, Sparkles, Search, Menu, X, Globe } from 'lucide-react';
import { ViewMode, Currency } from '../types';
import { formatPrice } from '../data/products';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onSearchClick?: () => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  cartTotal,
  onOpenCart,
  onSearchClick,
  currency,
  onCurrencyChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#121110]/95 backdrop-blur-md border-b border-[#2A2420] transition-all">
      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[74px]">
          {/* Brand Logo & Slogan */}
          <button
            onClick={() => {
              onNavigate('catalogue');
              setMobileMenuOpen(false);
            }}
            className="flex items-center text-left group focus:outline-none cursor-pointer"
            aria-label="Retour à l'accueil Maroc Glow"
          >
            <BrandLogo size="md" theme="dark" />
          </button>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-7 ml-8 text-sm font-medium">
            <button
              onClick={() => onNavigate('catalogue')}
              className={`transition-all relative py-1 text-xs uppercase tracking-[0.16em] cursor-pointer ${
                currentView === 'catalogue' || currentView === 'product_detail'
                  ? 'text-[#D4AF37] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D4AF37]'
                  : 'text-[#C4B7A5] hover:text-white'
              }`}
            >
              Catalogue Grossiste
            </button>

            <button
              onClick={() => onNavigate('tracking')}
              className={`flex items-center gap-1.5 transition-all relative py-1 text-xs uppercase tracking-[0.16em] cursor-pointer ${
                currentView === 'tracking'
                  ? 'text-[#D4AF37] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D4AF37]'
                  : 'text-[#C4B7A5] hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Suivi Commandes</span>
            </button>
          </nav>

          {/* Right Action Tools: Currency Selector, Search trigger, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector (FCFA / EUR toggle) */}
            <div className="inline-flex items-center bg-[#1E1916] rounded-full p-0.5 border border-[#3A322B] shadow-xs">
              <button
                type="button"
                onClick={() => onCurrencyChange('FCFA')}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  currency === 'FCFA'
                    ? 'bg-[#B8683C] text-white shadow-xs'
                    : 'text-[#C4B7A5] hover:text-white'
                }`}
                title="Afficher les prix en Franc CFA"
              >
                FCFA
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('EUR')}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  currency === 'EUR'
                    ? 'bg-[#B8683C] text-white shadow-xs'
                    : 'text-[#C4B7A5] hover:text-white'
                }`}
                title="Afficher les prix en Euro (€)"
              >
                <span>EUR (€)</span>
              </button>
            </div>

            {/* Quick Search Button */}
            {onSearchClick && (
              <button
                onClick={onSearchClick}
                className="p-2 sm:p-2.5 rounded-full text-[#C4B7A5] hover:text-white hover:bg-[#1E1916] border border-transparent hover:border-[#3A322B] transition-colors focus:outline-none cursor-pointer"
                title="Rechercher un produit"
                aria-label="Rechercher"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative px-3 sm:px-3.5 py-2 bg-[#B8683C] hover:bg-[#A3592F] text-white rounded-full transition-all active:scale-95 focus:outline-none flex items-center gap-2 group cursor-pointer shadow-md border border-[#D4AF37]/30"
              aria-label={`Panier d'achat avec ${cartCount} articles`}
            >
              <ShoppingBag className="w-4 h-4 text-[#FDE047] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold tracking-wider">
                {cartCount > 0 ? (
                  <span className="flex items-center gap-1.5">
                    <span>{cartCount}</span>
                    <span className="hidden sm:inline opacity-80 font-normal">| {formatPrice(cartTotal, currency)}</span>
                  </span>
                ) : (
                  <span>Panier</span>
                )}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#FAF7F2] hover:bg-[#1E1916] focus:outline-none cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181512] border-b border-[#2A2420] px-4 pt-3 pb-5 space-y-3 shadow-2xl animate-fade-in text-[#FAF7F2]">
          <button
            onClick={() => {
              onNavigate('catalogue');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between cursor-pointer ${
              currentView === 'catalogue' || currentView === 'product_detail'
                ? 'bg-[#28211C] text-[#D4AF37] font-bold border border-[#3A322B]'
                : 'text-[#C4B7A5] hover:bg-[#201A16]'
            }`}
          >
            <span>Catalogue Produits</span>
            <span className="text-xs bg-[#121110] px-2.5 py-0.5 rounded-full text-[#D4AF37] border border-[#3A322B]">Boutique</span>
          </button>

          <button
            onClick={() => {
              onNavigate('tracking');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between cursor-pointer ${
              currentView === 'tracking'
                ? 'bg-[#28211C] text-[#D4AF37] font-bold border border-[#3A322B]'
                : 'text-[#C4B7A5] hover:bg-[#201A16]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D4AF37]" />
              Suivi de Commande
            </span>
            <span className="text-xs text-[#D4AF37] font-semibold">En direct</span>
          </button>

          {/* Mobile Currency Switcher */}
          <div className="pt-3 border-t border-[#2A2420] flex items-center justify-between text-xs px-1">
            <span className="text-[#C4B7A5] font-medium">Changer la devise :</span>
            <div className="inline-flex bg-[#121110] rounded-lg p-0.5 border border-[#3A322B]">
              <button
                type="button"
                onClick={() => onCurrencyChange('FCFA')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  currency === 'FCFA'
                    ? 'bg-[#B8683C] text-white'
                    : 'text-[#C4B7A5]'
                }`}
              >
                FCFA (XOF)
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('EUR')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  currency === 'EUR'
                    ? 'bg-[#B8683C] text-white'
                    : 'text-[#C4B7A5]'
                }`}
              >
                Euro (€)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
