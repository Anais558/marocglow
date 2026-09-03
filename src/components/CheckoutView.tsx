import React, { useState, useEffect } from 'react';
import { CartItem, Order, TrackingStep, Currency } from '../types';
import { formatPrice } from '../data/products';
import { getAirShippingDates, getAirShippingNote } from '../utils/shippingConfig';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Plane,
  Sparkles,
  Lock,
  MessageCircle,
  Calendar,
  AlertCircle,
  Clock,
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

  // Shipping mode: 'routiere' | 'aerienne'
  const [shippingOption, setShippingOption] = useState<'routiere' | 'aerienne'>('routiere');
  const [airDates, setAirDates] = useState<string[]>([]);
  const [airNote, setAirNote] = useState<string>('');
  const [selectedAirDate, setSelectedAirDate] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadAirSchedule = () => {
      const dates = getAirShippingDates();
      setAirDates(dates);
      setAirNote(getAirShippingNote());
      if (dates.length > 0 && !selectedAirDate) {
        setSelectedAirDate(dates[0]);
      }
    };
    loadAirSchedule();

    const handleUpdate = () => loadAirSchedule();
    window.addEventListener('maroc_glow_shipping_dates_updated', handleUpdate);
    return () => {
      window.removeEventListener('maroc_glow_shipping_dates_updated', handleUpdate);
    };
  }, [selectedAirDate]);

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

    const shippingOptionLabel =
      shippingOption === 'aerienne'
        ? `Voie aérienne (Avion)${selectedAirDate ? ` - Départ prévu : ${selectedAirDate}` : ''}`
        : 'Voie routière (Transport terrestre)';

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
        label: 'Contact & confirmation des frais',
        description:
          'Notre équipe vous contacte sur WhatsApp pour confirmer les frais de livraison selon le poids et valider le règlement.',
        completed: false,
        current: false,
      },
      {
        step: 'préparation',
        label: 'Préparation et pesée du colis',
        description: 'Conditionnement soigné de vos produits marocains en atelier.',
        completed: false,
        current: false,
      },
      {
        step: 'expédiée',
        label:
          shippingOption === 'aerienne'
            ? `Expédition fret aérien (${selectedAirDate || 'Prochain vol'})`
            : 'Expédition par voie routière',
        description:
          shippingOption === 'aerienne'
            ? 'Prise en charge à l’aéroport et vol cargo direct vers votre destination.'
            : 'Acheminement par convoi routier sécurisé.',
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
      shippingOption,
      shippingOptionLabel,
      airShippingDateSelected: shippingOption === 'aerienne' ? selectedAirDate : undefined,
      shippingCostFcfa: 0,
      shippingCostNote: 'Frais à définir plus tard (payables à la réception du colis)',
      items: [...items],
      subtotalFcfa: subtotal,
      discountFcfa: 0,
      totalFcfa: subtotal,
      status: 'reçue',
      createdAt: now.toISOString(),
      formattedCreatedAt: formattedDate,
      estimatedDelivery:
        shippingOption === 'aerienne'
          ? `Fret aérien (${selectedAirDate || 'Prochaine expédition'})`
          : 'Voie routière (Selon planning de route)',
      trackingNumber: `MG-TRK-${randomNum}`,
      carrier: shippingOption === 'aerienne' ? 'Fret Aérien Express Maroc' : 'Convoi Routier Régional',
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
          Renseignez vos coordonnées complètes. Les frais de transport seront calculés et convenus avec vous selon le poids et le mode d'expédition choisi.
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

            {/* Step 2: Mode d'Expédition (Voie routière & Voie aérienne) */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EFE6D8] shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#EFE6D8]">
                <div className="w-6 h-6 bg-[#B8683C] text-white rounded-full flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-[#231B15]">
                    Mode d'Expédition
                  </h2>
                  <p className="text-[11px] text-[#7D7368]">
                    Choisissez votre option. Frais de livraison à définir plus tard (payables à la réception).
                  </p>
                </div>
              </div>

              {/* Notice informative et rassurante sur le paiement à la réception */}
              <div className="p-4 rounded-xl bg-[#EBF5EE] border border-[#CDE5D5] flex items-start gap-3 text-xs text-[#231B15]">
                <CheckCircle2 className="w-5 h-5 text-[#2E6349] shrink-0 mt-0.5" />
                <div className="leading-relaxed space-y-1">
                  <div className="font-bold text-[#2E6349] text-xs uppercase tracking-wider">
                    Frais de livraison payables à la réception du colis !
                  </div>
                  <p className="text-[11px] text-[#2E6349]">
                    Pas de livraison offerte. Les frais d'expédition sont <strong>à définir plus tard</strong> selon le poids réel et la destination, et vous les réglerez <strong>directement à la réception de votre colis</strong>.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Option 1: Voie routière */}
                <div
                  onClick={() => setShippingOption('routiere')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingOption === 'routiere'
                      ? 'border-[#B8683C] bg-[#FAF7F2]/90 ring-2 ring-[#B8683C]/40 shadow-xs'
                      : 'border-[#EFE6D8] hover:border-[#7D7368] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingOption === 'routiere'}
                      onChange={() => setShippingOption('routiere')}
                      className="mt-1 text-[#B8683C] focus:ring-[#B8683C]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#231B15]">
                          <Truck className="w-4 h-4 text-[#B8683C]" />
                          <span>Voie routière (Transport Terrestre)</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#B8683C] text-[11px] font-bold border border-[#EFE6D8]">
                          À définir plus tard
                        </span>
                      </div>
                      <p className="text-xs text-[#7D7368] mt-1.5 leading-relaxed">
                        Acheminement sécurisé par convoi routier. Solution économique idéale pour colis lourds ou volumineux. Frais payables à la réception du colis.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Option 2: Voie aérienne */}
                <div
                  onClick={() => setShippingOption('aerienne')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingOption === 'aerienne'
                      ? 'border-[#B8683C] bg-[#FAF7F2]/90 ring-2 ring-[#B8683C]/40 shadow-xs'
                      : 'border-[#EFE6D8] hover:border-[#7D7368] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingOption === 'aerienne'}
                      onChange={() => setShippingOption('aerienne')}
                      className="mt-1 text-[#B8683C] focus:ring-[#B8683C]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#231B15]">
                          <Plane className="w-4 h-4 text-[#B8683C]" />
                          <span>Voie aérienne (Fret Cargo Avion)</span>
                          <span className="bg-[#B8683C]/10 text-[#B8683C] text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            ✈️ Rapide
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#B8683C] text-[11px] font-bold border border-[#EFE6D8]">
                          À définir plus tard
                        </span>
                      </div>
                      <p className="text-xs text-[#7D7368] mt-1.5 leading-relaxed">
                        Acheminement prioritaire par avion cargo direct depuis le Maroc. Frais payables à la réception du colis.
                      </p>

                      {/* Prochaines dates d'expédition aérienne fixées par l'administrateur */}
                      <div className="mt-3 p-3 bg-white rounded-xl border border-[#D4AF37]/50 shadow-2xs space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#231B15]">
                          <Calendar className="w-4 h-4 text-[#B8683C]" />
                          <span>Prochaines dates de vol programmées :</span>
                        </div>

                        {airDates && airDates.length > 0 ? (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {airDates.map((dateStr, idx) => {
                              const isSelected = selectedAirDate === dateStr;
                              return (
                                <button
                                  type="button"
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShippingOption('aerienne');
                                    setSelectedAirDate(dateStr);
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                    isSelected && shippingOption === 'aerienne'
                                      ? 'bg-[#B8683C] text-white shadow-xs'
                                      : 'bg-[#FAF7F2] text-[#231B15] border border-[#EFE6D8] hover:border-[#B8683C]'
                                  }`}
                                >
                                  <span>{dateStr}</span>
                                  {isSelected && shippingOption === 'aerienne' && (
                                    <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded">Choisi</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs text-[#7D7368] italic">
                            Dates des prochains vols communiquées par l'administrateur.
                          </p>
                        )}

                        {airNote && (
                          <p className="text-[11px] text-[#7D7368] pt-1 border-t border-[#EFE6D8]">
                            ℹ️ <strong className="text-[#231B15]">Note logistique :</strong> {airNote}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Note d'information de règlement (Remplacement complet du mode de paiement) */}
            <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#EFE6D8] space-y-2">
              <div className="flex items-center gap-2 text-[#231B15] font-bold text-xs sm:text-sm">
                <MessageCircle className="w-4 h-4 text-[#B8683C]" />
                <span>Règlement & Frais d'expédition (À convenir directement)</span>
              </div>
              <p className="text-xs text-[#7D7368] leading-relaxed">
                Aucun paiement en ligne n'est prélevé à cette étape. Après enregistrement de votre commande, notre équipe commerciale vous contacte directement (via WhatsApp ou appel) pour vous confirmer le poids exact de vos colis, les frais d'expédition ({shippingOption === 'aerienne' ? 'voie aérienne' : 'voie routière'}) et les facilités de règlement adaptées à votre pays.
              </p>
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
                  <span>Mode sélectionné :</span>
                  <span className="font-semibold text-[#231B15] flex items-center gap-1">
                    {shippingOption === 'aerienne' ? (
                      <>
                        <Plane className="w-3.5 h-3.5 text-[#B8683C]" />
                        <span>Voie aérienne</span>
                      </>
                    ) : (
                      <>
                        <Truck className="w-3.5 h-3.5 text-[#B8683C]" />
                        <span>Voie routière</span>
                      </>
                    )}
                  </span>
                </div>

                {shippingOption === 'aerienne' && selectedAirDate && (
                  <div className="flex justify-between text-[11px] text-[#7D7368] bg-[#FAF7F2] p-2 rounded-lg border border-[#EFE6D8]">
                    <span>Vol programmé :</span>
                    <span className="font-bold text-[#B8683C]">{selectedAirDate}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-[#7D7368]">
                  <span>Frais de livraison :</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#B8683C] font-semibold text-[11px] border border-[#EFE6D8]">
                    À définir plus tard
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#EBF5EE] border border-[#CDE5D5] text-[11px] text-[#2E6349] leading-relaxed flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2E6349]" />
                  <span>
                    <strong>Payable à la réception :</strong> Vous réglerez les frais de livraison lors de la remise de votre colis.
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#231B15] pt-3 border-t border-[#EFE6D8]">
                  <div>
                    <span>Total articles :</span>
                    <span className="block text-[10px] font-normal text-[#7D7368]">
                      (Hors frais de livraison à définir plus tard)
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
