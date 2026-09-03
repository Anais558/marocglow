import React from 'react';
import { BrandLogo } from './BrandLogo';
import { ViewMode } from '../types';
import { STORE_PHONE, STORE_PHONE_CLEAN } from '../data/products';
import {
  Truck,
  ShieldCheck,
  Leaf,
  MessageCircle,
  Mail,
  MapPin,
  Heart,
  FileText,
  Lock,
  Sparkles,
  Phone,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenLegal: (type: 'terms' | 'privacy') => void;
  onOpenCart: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegal,
  onOpenCart,
}) => {
  return (
    <footer className="bg-white text-[#231B15] border-t border-[#EFE6D8] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#EFE6D8]">
          {/* Col 1 (4 cols): Brand Identity */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="md" variant="default" />
            <p className="text-xs text-[#7D7368] leading-relaxed max-w-sm">
              Vente de produits marocains naturels en gros et au détail : huile d'argan pure, savon noir traditionnel, eaux florales, ghassoul et cosmétiques authentiques. Tarifs avantageux et expédition rapide.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#231B15] font-semibold">
              <span className="flex items-center gap-1 text-[#2E6349]">
                <Leaf className="w-3.5 h-3.5" /> 100% Naturel
              </span>
              <span className="text-[#EFE6D8]">•</span>
              <span className="flex items-center gap-1 text-[#B8683C]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Gros & Détail
              </span>
            </div>
          </div>

          {/* Col 2 (3 cols): Navigation & Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#231B15] tracking-[0.16em] uppercase">
              Catalogue
            </h3>
            <ul className="space-y-2.5 text-xs text-[#7D7368]">
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-[#B8683C] transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                >
                  <span>Tous les Produits</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCart}
                  className="hover:text-[#B8683C] transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                >
                  <span>Mon Panier</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tracking')}
                  className="hover:text-[#B8683C] transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                >
                  <Truck className="w-3.5 h-3.5 text-[#B8683C]" />
                  <span>Suivi de Commande</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 (2 cols): Informations Légales */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#231B15] tracking-[0.16em] uppercase">
              Informations
            </h3>
            <ul className="space-y-2.5 text-xs text-[#7D7368]">
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#B8683C] transition-colors flex items-center gap-1.5 text-left cursor-pointer font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-[#B8683C]" />
                  <span>Conditions de vente</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-[#B8683C] transition-colors flex items-center gap-1.5 text-left cursor-pointer font-medium"
                >
                  <Lock className="w-3.5 h-3.5 text-[#B8683C]" />
                  <span>Confidentialité</span>
                </button>
              </li>
              <li>
                <span className="text-[#7D7368] text-[11px] block mt-2 font-medium">
                  Devise : FCFA / EUR (€)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4 (3 cols): Contact & WhatsApp Assistance */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#231B15] tracking-[0.16em] uppercase">
              Commandes & Contact
            </h3>
            <p className="text-xs text-[#7D7368]">
              Commande en gros, tarifs revendeurs ou questions sur vos achats ? Contactez-nous directement.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/${STORE_PHONE_CLEAN}?text=${encodeURIComponent(
                  'Bonjour Maroc Glow, je souhaite commander des produits marocains (gros/détail).'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA59] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Commandes 7j/7</span>
              </a>
              <a
                href={`tel:${STORE_PHONE_CLEAN}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#231B15] hover:text-[#B8683C] transition-colors py-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#B8683C]" />
                <span>{STORE_PHONE}</span>
              </a>
            </div>
            <div className="text-[11px] text-[#7D7368] space-y-1 pt-1 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B8683C]" />
                <span>Expédition rapide • Produits 100% Marocains</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7D7368] gap-3">
          <p>© 2026 Maroc Glow. Vente de produits marocains en gros et en détail.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onOpenLegal('terms')} className="hover:text-[#B8683C] cursor-pointer">
              Conditions Générales de Vente
            </button>
            <span className="text-[#EFE6D8]">•</span>
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-[#B8683C] cursor-pointer">
              Politique de Confidentialité
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
