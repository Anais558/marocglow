import React from 'react';
import { Order, Currency } from '../types';
import { formatPrice, STORE_PHONE_CLEAN } from '../data/products';
import { CheckCircle2, Truck, MessageCircle, ArrowRight, Sparkles, Copy, Check } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order;
  onTrackOrder: (orderId: string) => void;
  onContinueShopping: () => void;
  currency?: Currency;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onTrackOrder,
  onContinueShopping,
  currency = 'FCFA',
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shippingDisplay = order.shippingOptionLabel || (order.shippingOption === 'aerienne' ? 'Voie aérienne (Avion)' : 'Voie routière');

  const whatsappMessage = encodeURIComponent(
    `Bonjour Maroc Glow ✨\nJe viens de valider ma commande #${order.id}.\nArticles : *${formatPrice(
      order.totalFcfa,
      currency
    )}*.\nDestination : ${order.city}${order.country ? `, ${order.country}` : ''}\nMode d'expédition : ${shippingDisplay}\nFrais de livraison : À définir plus tard (payables à la réception du colis).\nMerci de confirmer la prise en charge !`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#231B15]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#EFE6D8] shadow-2xl max-w-lg w-full p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-[#FAF7F2] text-[#2E6349] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#EFE6D8] shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 bg-[#FAF7F2] text-[#B8683C] text-xs font-bold px-3.5 py-1 rounded-full mb-3 border border-[#EFE6D8]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Commande validée avec succès</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231B15] mb-2">
          Merci pour votre commande
        </h2>

        <p className="text-xs sm:text-sm text-[#7D7368] mb-6 leading-relaxed">
          Votre commande a été transmise à notre service commercial. Nous allons vous contacter directement pour convenir des frais de livraison et de l'expédition.
        </p>

        {/* Order ID & Details Card */}
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFE6D8] text-left mb-6 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#7D7368]">Numéro de commande :</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-[#231B15]">#{order.id}</span>
              <button
                onClick={handleCopyId}
                className="p-1 text-[#7D7368] hover:text-[#B8683C] transition-colors cursor-pointer"
                title="Copier le numéro"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#2E6349]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#7D7368]">Destinataire :</span>
            <span className="font-semibold text-[#231B15]">{order.customerName}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#7D7368]">Destination :</span>
            <span className="font-semibold text-[#231B15]">{order.city}{order.country ? `, ${order.country}` : ''}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#7D7368]">Mode d'expédition :</span>
            <span className="font-bold text-[#B8683C]">{shippingDisplay}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#7D7368]">Frais de livraison :</span>
            <div className="text-right">
              <span className="font-semibold text-[#B8683C] text-[11px] bg-white px-2 py-0.5 rounded border border-[#EFE6D8]">
                À définir plus tard
              </span>
              <span className="block text-[10px] font-bold text-[#2E6349] mt-0.5">
                ✓ Payable à la réception du colis
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#EFE6D8]">
            <span className="text-[#7D7368]">Total articles :</span>
            <span className="font-extrabold text-[#231B15] text-base">{formatPrice(order.totalFcfa, currency)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Suivre la commande */}
          <button
            onClick={() => onTrackOrder(order.id)}
            className="w-full py-3.5 px-4 bg-[#231B15] hover:bg-[#B8683C] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Suivre ma commande en temps réel</span>
          </button>

          {/* WhatsApp Direct Notification */}
          <a
            href={`https://wa.me/${STORE_PHONE_CLEAN}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BA59] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Envoyer le reçu sur WhatsApp</span>
          </a>

          {/* Continuer les achats */}
          <button
            onClick={onContinueShopping}
            className="w-full py-2.5 px-4 text-xs font-semibold text-[#7D7368] hover:text-[#B8683C] transition-colors cursor-pointer"
          >
            Retourner au catalogue de rituels
          </button>
        </div>
      </div>
    </div>
  );
};
