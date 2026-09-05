import React, { useState } from 'react';
import { CartItem, Order, TrackingStep, Currency } from '../types';
import { formatPrice } from '../data/products';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Truck,
  MessageCircle,
} from 'lucide-react';

interface CheckoutViewProps {
  items: CartItem[];
  discountAmount?: number;
  promoCode?: string;
  onBackToCatalogue: () => void;
  onCreateOrder: (order: Order) => void;
  currency?: Currency;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  items,
  onBackToCatalogue,
  onCreateOrder,
  currency = 'FCFA',
}) => {
  // Free text inputs (no select dropdowns)
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const subtotal = items.reduce((acc, item) => acc + item.product.priceFcfa * item.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!customerName.trim()) errors.customerName = 'Veuillez écrire votre nom complet ou raison sociale';
    if (!phone.trim() || phone.length < 8) errors.phone = 'Numéro de téléphone (WhatsApp) valide requis';
    if (!country.trim()) errors.country = 'Veuillez écrire votre pays de destination';
    if (!city.trim()) errors.city = 'Veuillez écrire votre ville';
    if (!address.trim()) errors.address = 'Veuillez écrire votre adresse précise ou quartier';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `MG-2026-${randomNum}`;

    const now = new Date();
    const formattedDate = `${now.getDate()} ${
      ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'][
        now.getMonth()
      ]
    } 2026 à ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const initialTimeline: TrackingStep[] = [
      {
        step: 'reçue',
        label: 'Commande enregistrée',
        description: `Votre commande #${orderId} a bien été transmise à notre service logistique.`,
        date: formattedDate.split(' à ')[0],
        time: formattedDate.split(' à ')[1] || '00:00',
        completed: true,
        current: true,
      },
      {
        step: 'confirmée',
        label: 'Contact & confirmation de la livraison',
        description:
          'Notre équipe vous contacte sur WhatsApp pour organiser la livraison de votre colis.',
        completed: false,
        current: false,
      },
      {
        step: 'préparation',
        label: 'Préparation du colis',
        description: 'Conditionnement soigné de vos produits marocains en atelier.',
        completed: false,
        current: false,
      },
      {
        step: 'expédiée',
        label: 'Expédition de la commande',
        description: 'Acheminement sécurisé vers votre destination.',
        completed: false,
        current: false,
      },
      {
        step: 'livrée',
        label: 'Livraison finale',
        description: 'Remise de votre colis à votre adresse.',
        completed: false,
        current: false,
      },
    ];

    const newOrder: Order = {
      id: orderId,
      customerName,
      phone,
      email: email || undefined,
      country: country.trim(),
      city: city.trim(),
      address: address.trim(),
      deliveryNotes: deliveryNotes.trim() || undefined,
      paymentMethod: 'a_definir',
      paymentMethodLabel: 'À convenir avec l’administrateur (WhatsApp / Téléphone)',
      shippingOption: 'standard',
      shippingOptionLabel: 'À définir plus tard',
      shippingCostFcfa: 0,
      shippingCostNote: 'Livraison à définir plus tard',
      items: [...items],
      subtotalFcfa: subtotal,
      discountFcfa: 0,
      totalFcfa: subtotal,
      status: 'reçue',
      createdAt: now.toISOString(),
      formattedCreatedAt: formattedDate,
      estimatedDelivery: 'À définir plus tard',
      trackingNumber: `MG-TRK-${randomNum}`,
      carrier: 'Service Logistique Maroc Glow',
      timeline: initialTimeline,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onCreateOrder(newOrder);
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-2xl border border-[#EFE6D8] shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-[#231B15] mb-2">
            Votre panier est actuellement vide
          </h2>
          <p className="text-xs text-[#7D7368] mb-6">
            Ajoutez au moins un produit marocain pour finaliser votre commande.
          </p>
          <button
            onClick={onBackToCatalogue}
            className="px-6 py-3 bg-[#231B15] hover:bg-[#B8683C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Retourner au Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Navigation retour */}
      <div className="mb-8">
        <button
          onClick={onBackToCatalogue}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#7D7368] hover:text-[#231B15] transition-colors mb-3 bg-white px-3.5 py-1.5 rounded-full border border-[#EFE6D8] shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#B8683C]" />
          <span>Continuer mes achats</span>
        </button>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#231B15]">
          Finalisation de votre Commande
        </h1>
        <p className="text-xs sm:text-sm text-[#7D7368] mt-1">
          Renseignez vos coordonnées pour finaliser votre commande. Livraison à définir plus tard.
        </p>
      </div>

      {/* Main 2-columns checkout grid */}
      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT FORM (7 cols): Customer & Shipping */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Coordonnées Client (Champs libres, aucune sélection) */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EFE6D8] shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#EFE6D8]">
                <div className="w-6 h-6 bg-[#B8683C] text-white rounded-full flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-[#231B15]">
                    Coordonnées & Destination
                  </h2>
                  <p className="text-[11px] text-[#7D7368]">
                    Écrivez librement toutes vos informations de livraison
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nom Complet */}
                <div>
                  <label className="block text-xs font-semibold text-[#231B15] mb-1.5">
                    Nom & Prénoms / Raison Sociale <span className="text-[#B8683C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Écrivez votre nom ou entreprise..."
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#231B15] focus:outline-none focus:ring-1 focus:ring-[#B8683C] font-medium ${
                      formErrors.customerName ? 'border-[#B8683C]' : 'border-[#EFE6D8]'
                    }`}
                  />
                  {formErrors.customerName && (
                    <p className="text-[11px] text-[#B8683C] mt-1 font-medium">{formErrors.customerName}</p>
                  )}
                </div>

                {/* Téléphone WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold text-[#231B15] mb-1.5">
                    Numéro de Téléphone (WhatsApp) <span className="text-[#B8683C]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: +225 07 00 00 00 00 / +221 77 000 00 00"
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#231B15] focus:outline-none focus:ring-1 focus:ring-[#B8683C] font-medium ${
                      formErrors.phone ? 'border-[#B8683C]' : 'border-[#EFE6D8]'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-[#B8683C] mt-1 font-medium">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Email (Optionnel) */}
              <div>
                <label className="block text-xs font-semibold text-[#231B15] mb-1.5">
                  Adresse e-mail <span className="text-[#7D7368] font-normal">(Optionnel, pour accusé de réception)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Écrivez votre e-mail..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-xs text-[#231B15] focus:outline-none focus:ring-1 focus:ring-[#B8683C] font-medium"
                />
              </div>

              {/* Pays & Ville (Champs libres saisis par le client) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#231B15] mb-1.5">
                    Pays de Destination <span className="text-[#B8683C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Écrivez votre pays (ex: Côte d'Ivoire, Sénégal, France, Cameroun, Mali...)"
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#231B15] focus:outline-none focus:ring-1 focus:ring-[#B8683C] font-medium ${
                      formErrors.country ? 'border-[#B8683C]' : 'border-[#EFE6D8]'
                    }`}
                  />
                  {formErrors.country && (
                    <p className="text-[11px] text-[#B8683C] mt-1 font-medium">{formErrors.country}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#231B15] mb-1.5">
                    Ville <span className="text-[#B8683C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Écrivez votre ville (ex: Abidjan, Dakar, Douala, Yaoundé, Paris, Bamako...)"
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#231B15] focus:outline-none focus:ring-1 focus:ring-[#B8683C] font-medium ${
                      formErrors.city ? 'border-[#B8683C]' : 'border-[#EFE6D8]'
                    }`}
                  />
                  {formErrors.city && (
                    <p className="text-[11px] text-[#B8683C] mt-1 font-medium">{formErrors.city}</p>
                  )}
                </div>
              </div>

              {/* Adresse / Quartier */}
              <div>
                <label className="block text-xs font-semibold text-[#231B15] mb-1.5">
                  Adresse précise / Quartier / Repère <span className="text-[#B8683C]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Écrivez votre quartier, rue, porte ou repère précis..."
                  className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#231B15] focus:outline-none focus:ring-1 focus:ring-[#B8683C] font-medium ${
                    formErrors.address ? 'border-[#B8683C]' : 'border-[#EFE6D8]'
                  }`}
                />
                {formErrors.address && (
                  <p className="text-[11px] text-[#B8683C] mt-1 font-medium">{formErrors.address}</p>
                )}
              </div>

              {/* Instructions spéciales */}
              <div>
                <label className="block text-xs font-semibold text-[#231B15] mb-1.5">
                  Précisions & Instructions pour la livraison <span className="text-[#7D7368] font-normal">(Optionnel)</span>
                </label>
                <textarea
                  rows={2}
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Écrivez toute précision utile (ex: numéro de contact secondaire, consignes pour le coursier, horaires souhaités...)"
                  className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EFE6D8] rounded-xl text-xs text-[#231B15] focus:outline-none focus:ring-1 focus:ring-[#B8683C] font-medium"
                />
              </div>
            </div>

            {/* Livraison à définir plus tard */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EFE6D8] shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EFE6D8] flex items-center justify-center text-[#B8683C] shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#231B15]">
                    Livraison
                  </h3>
                  <p className="text-xs text-[#7D7368]">
                    Modalités convenues directement après validation
                  </p>
                </div>
              </div>
              <span className="px-3 py-1.5 bg-[#FAF7F2] text-[#B8683C] border border-[#EFE6D8] rounded-full text-xs font-bold whitespace-nowrap shrink-0">
                À définir plus tard
              </span>
            </div>
          </div>

          {/* RIGHT SUMMARY (5 cols): Order Recap & Confirm CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EFE6D8] shadow-xs space-y-5 sticky top-28">
              <h3 className="font-serif font-bold text-lg text-[#231B15] pb-3 border-b border-[#EFE6D8] flex items-center justify-between">
                <span>Récapitulatif Commande</span>
                <span className="text-xs text-[#7D7368] font-medium">
                  {items.length} produit{items.length > 1 ? 's' : ''}
                </span>
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {items.map((item) => (
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
                        Qté : {item.quantity} × {formatPrice(item.product.priceFcfa, currency)}
                      </span>
                    </div>
                    <span className="font-bold text-[#231B15]">
                      {formatPrice(item.product.priceFcfa * item.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-[#EFE6D8] space-y-2.5 text-xs">
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

                <div className="flex justify-between text-base font-bold text-[#231B15] pt-3 border-t border-[#EFE6D8]">
                  <div>
                    <span>Total :</span>
                    <span className="block text-[11px] font-normal text-[#7D7368]">
                      Livraison à définir plus tard
                    </span>
                  </div>
                  <span className="text-[#B8683C] text-xl font-black">{formatPrice(subtotal, currency)}</span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-4 bg-[#231B15] hover:bg-[#B8683C] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Enregistrement de la commande...</span>
                  </div>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Valider la commande</span>
                  </>
                )}
              </button>

              {/* Security and reassurance */}
              <div className="space-y-2 pt-2 text-[11px] text-[#7D7368]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2E6349] shrink-0" />
                  <span>Origine garantie 100% Maroc • Vente Grossiste</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#B8683C] shrink-0" />
                  <span>Prise en charge et suivi direct par WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
