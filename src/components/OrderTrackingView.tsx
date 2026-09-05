import React, { useState, useEffect } from 'react';
import { Order, TrackingStep, OrderStatus, Currency } from '../types';
import { formatPrice, STORE_PHONE_CLEAN } from '../data/products';
import {
  Search,
  Truck,
  CheckCircle,
  Clock,
  Package,
  CheckCircle2,
  MapPin,
  Calendar,
  CreditCard,
  MessageCircle,
  ArrowRight,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface OrderTrackingViewProps {
  orders: Order[];
  myOrderIds?: string[];
  onAddMyOrderId?: (orderId: string) => void;
  highlightOrderId?: string | null;
  onGoToCatalogue: () => void;
  currency?: Currency;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orders,
  myOrderIds = [],
  onAddMyOrderId,
  highlightOrderId,
  onGoToCatalogue,
  currency = 'FCFA',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchError, setSearchError] = useState('');

  // Only the customer's own orders (placed or tracked on this device)
  const myOrders = orders.filter((o) => myOrderIds.includes(o.id));

  // Initial order selection: ONLY own orders or explicit highlightOrderId
  useEffect(() => {
    if (highlightOrderId) {
      const match = orders.find((o) => o.id.toLowerCase() === highlightOrderId.toLowerCase());
      if (match) {
        setSelectedOrder(match);
        setSearchQuery(match.id);
        onAddMyOrderId?.(match.id);
        return;
      }
    }

    if (selectedOrder) {
      // Keep selected order in sync with latest order data (e.g. status updates from admin)
      const updated = orders.find((o) => o.id === selectedOrder.id);
      if (updated && updated !== selectedOrder) {
        setSelectedOrder(updated);
      }
      return;
    }

    // Default to the user's latest own order if they have one
    if (myOrders.length > 0) {
      setSelectedOrder(myOrders[0]);
      setSearchQuery(myOrders[0].id);
    }
  }, [orders, highlightOrderId, myOrderIds]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');

    const cleanQuery = searchQuery.trim().toLowerCase();
    if (!cleanQuery) return;

    const digitsOnly = cleanQuery.replace(/\D/g, '');

    const found = orders.find((o) => {
      const oId = o.id.toLowerCase();
      const oPhoneDigits = o.phone.replace(/\D/g, '');
      const idMatch = oId === cleanQuery || oId.replace('mg-', '') === cleanQuery || oId.includes(cleanQuery);
      const phoneMatch = digitsOnly.length >= 6 && oPhoneDigits.includes(digitsOnly);
      return idMatch || phoneMatch;
    });

    if (found) {
      setSelectedOrder(found);
      onAddMyOrderId?.(found.id);
      setSearchError('');
    } else {
      setSearchError(
        `Aucune commande trouvée pour "${searchQuery}". Veuillez vérifier votre numéro de commande (ex: MG-2026-XXXX) ou votre numéro de téléphone.`
      );
    }
  };

  const getStepIcon = (step: OrderStatus, isCompleted: boolean, isCurrent: boolean) => {
    const baseColor = isCompleted
      ? 'text-[#2E6349] bg-[#FAF7F2] border-[#2E6349]'
      : isCurrent
      ? 'text-[#B8683C] bg-[#FAF7F2] border-[#B8683C] ring-2 ring-[#B8683C]/20'
      : 'text-[#A89F93] bg-white border-[#EFE6D8]';

    switch (step) {
      case 'reçue':
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${baseColor}`}>
            <Clock className="w-4 h-4" />
          </div>
        );
      case 'confirmée':
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${baseColor}`}>
            <CheckCircle className="w-4 h-4" />
          </div>
        );
      case 'préparation':
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${baseColor}`}>
            <Package className="w-4 h-4" />
          </div>
        );
      case 'expédiée':
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${baseColor}`}>
            <Truck className="w-4 h-4" />
          </div>
        );
      case 'livrée':
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${baseColor}`}>
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Title Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-white text-[#B8683C] text-xs font-bold px-4 py-1.5 rounded-full mb-3 border border-[#EFE6D8] shadow-xs">
          <Truck className="w-3.5 h-3.5 text-[#B8683C]" />
          <span>Suivi en temps réel</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#231B15] mb-2">
          Suivi de votre Commande
        </h1>
        <p className="text-xs sm:text-sm text-[#7D7368]">
          Entrez votre numéro de référence (reçu lors de votre commande) ou votre numéro de téléphone pour suivre chaque étape de préparation et de livraison.
        </p>
      </div>

      {/* Search Bar & Customer's own orders pills */}
      <div className="max-w-2xl mx-auto mb-10 space-y-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7D7368] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Numéro de commande (ex: MG-2026-XXXX) ou Téléphone..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#EFE6D8] rounded-xl text-xs sm:text-sm text-[#231B15] font-medium shadow-xs focus:outline-none focus:ring-1 focus:ring-[#B8683C]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#231B15] hover:bg-[#B8683C] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            Suivre
          </button>
        </form>

        {searchError && (
          <p className="text-xs text-[#B8683C] bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE6D8] font-medium">
            {searchError}
          </p>
        )}

        {/* Customer's Own Orders Pills (ONLY the current user's orders) */}
        {myOrders.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7D7368]">
              <Package className="w-3.5 h-3.5 text-[#B8683C]" />
              <span>Vos commandes enregistrées ({myOrders.length}) :</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {myOrders.map((ord) => (
                <button
                  key={ord.id}
                  type="button"
                  onClick={() => {
                    setSelectedOrder(ord);
                    setSearchQuery(ord.id);
                    setSearchError('');
                  }}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedOrder?.id === ord.id
                      ? 'bg-[#231B15] text-white font-bold shadow-xs'
                      : 'bg-white text-[#231B15] border border-[#EFE6D8] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span>#{ord.id}</span>
                  <span className="text-[10px] opacity-75 font-normal">
                    ({ord.status.toUpperCase()})
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Order Details & 5-Step Timeline */}
      {selectedOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 cols: 5-Step Tracking Timeline */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#EFE6D8] shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#EFE6D8]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7D7368] block">
                  Numéro de Commande
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#231B15]">
                  #{selectedOrder.id}
                </h2>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#7D7368] block">Date de création</span>
                <span className="font-semibold text-xs text-[#231B15]">
                  {selectedOrder.formattedCreatedAt}
                </span>
              </div>
            </div>

            {/* Stepper Header Bar (Mobile/Desktop friendly) */}
            <div>
              <h3 className="font-serif font-bold text-base text-[#231B15] mb-4 flex items-center justify-between">
                <span>Progression de la livraison</span>
                <span className="text-xs uppercase font-bold px-3 py-1 rounded-full bg-[#FAF7F2] text-[#B8683C] border border-[#EFE6D8]">
                  Statut : {selectedOrder.status.toUpperCase()}
                </span>
              </h3>

              {/* 5-STEPS TIMELINE LIST */}
              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#EFE6D8]">
                {selectedOrder.timeline.map((stepItem, idx) => {
                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Step icon bullet */}
                      <div className="absolute -left-6 sm:-left-8 top-0">
                        {getStepIcon(stepItem.step, stepItem.completed, stepItem.current)}
                      </div>

                      {/* Step content */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <h4
                            className={`text-sm font-bold ${
                              stepItem.completed || stepItem.current
                                ? 'text-[#231B15]'
                                : 'text-[#7D7368]'
                            }`}
                          >
                            {idx + 1}. {stepItem.label}
                          </h4>

                          {stepItem.date && (
                            <span className="text-[11px] text-[#7D7368]">
                              {stepItem.date} {stepItem.time ? `à ${stepItem.time}` : ''}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#7D7368] mt-1 leading-relaxed">
                          {stepItem.description}
                        </p>

                        {stepItem.current && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#B8683C] font-bold mt-2 bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#EFE6D8]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B8683C] animate-ping"></span>
                            Étape active en cours
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carrier information badge */}
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EFE6D8] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-[#EFE6D8] text-[#B8683C]">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#7D7368] text-[10px] uppercase font-bold block">
                    Transporteur & Suivi
                  </span>
                  <span className="font-bold text-[#231B15]">
                    {selectedOrder.carrier || 'Maroc Glow Express'}
                  </span>
                  <span className="text-[#7D7368] text-[11px] block">
                    N° colis : {selectedOrder.trackingNumber || 'En cours d’attribution'}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#7D7368] uppercase font-bold block">
                  Livraison estimée
                </span>
                <span className="font-bold text-[#231B15] text-xs">
                  {selectedOrder.estimatedDelivery}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT 5 cols: Order details & WhatsApp support */}
          <div className="lg:col-span-5 space-y-6">
            {/* Recipient & Address Info */}
            <div className="bg-white p-6 rounded-2xl border border-[#EFE6D8] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#231B15] pb-3 border-b border-[#EFE6D8]">
                Destinataire & Adresse
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-[#231B15] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#B8683C]"></span>
                  <span>{selectedOrder.customerName}</span>
                </div>

                <div className="flex items-center gap-2 text-[#7D7368]">
                  <Phone className="w-4 h-4 text-[#B8683C] shrink-0" />
                  <span>{selectedOrder.phone}</span>
                </div>

                <div className="flex items-start gap-2 text-[#7D7368]">
                  <MapPin className="w-4 h-4 text-[#B8683C] shrink-0 mt-0.5" />
                  <span>
                    {selectedOrder.address}, {selectedOrder.city}{selectedOrder.country ? `, ${selectedOrder.country}` : ''}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[#7D7368]">
                  <Truck className="w-4 h-4 text-[#B8683C] shrink-0" />
                  <span>
                    Livraison : <strong className="text-[#231B15]">À définir plus tard</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Items in order */}
            <div className="bg-white p-6 rounded-2xl border border-[#EFE6D8] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#231B15] pb-3 border-b border-[#EFE6D8]">
                Articles commandés ({selectedOrder.items.length})
              </h3>

              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#EFE6D8] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-[#231B15] truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[#7D7368] text-[11px]">
                        Quantité : {item.quantity} × {formatPrice(item.product.priceFcfa, currency)}
                      </span>
                    </div>
                    <span className="font-bold text-[#231B15]">
                      {formatPrice(item.product.priceFcfa * item.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-[#EFE6D8] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#7D7368]">
                  <span>Sous-total articles :</span>
                  <span>{formatPrice(selectedOrder.subtotalFcfa, currency)}</span>
                </div>
                {selectedOrder.discountFcfa > 0 && (
                  <div className="flex justify-between text-[#2E6349] font-semibold">
                    <span>Remise :</span>
                    <span>- {formatPrice(selectedOrder.discountFcfa, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[#7D7368]">
                  <span>Livraison :</span>
                  <span className="text-[#B8683C] font-semibold">À définir plus tard</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#231B15] pt-2 border-t border-[#EFE6D8]">
                  <div>
                    <span>Total :</span>
                    <span className="block text-[10px] font-normal text-[#7D7368]">
                      Livraison à définir plus tard
                    </span>
                  </div>
                  <span className="text-[#B8683C] text-lg font-black">{formatPrice(selectedOrder.totalFcfa, currency)}</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Assistant Button for this order */}
            <a
              href={`https://wa.me/${STORE_PHONE_CLEAN}?text=${encodeURIComponent(
                `Bonjour Maroc Glow ✨\nJe vous contacte concernant ma commande #${selectedOrder.id} au nom de ${selectedOrder.customerName}.\nQuel est l'état actuel de la livraison svp ?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA59] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-center cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contacter le support de livraison sur WhatsApp</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 px-6 bg-white rounded-2xl border border-[#EFE6D8] max-w-lg mx-auto shadow-xs space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#EFE6D8] flex items-center justify-center text-[#B8683C] mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#231B15] mb-1">
              Rechercher votre commande
            </h3>
            <p className="text-xs text-[#7D7368] leading-relaxed max-w-md mx-auto">
              Saisissez votre numéro de commande reçu lors de votre validation ou votre numéro de téléphone dans la barre de recherche ci-dessus pour afficher son statut d'acheminement.
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={onGoToCatalogue}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#231B15] hover:bg-[#B8683C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <span>Découvrir nos produits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
