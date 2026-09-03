import { DEFAULT_AIR_SHIPPING_DATES } from '../data/products';

const STORAGE_KEY_DATES = 'maroc_glow_air_shipping_dates';
const STORAGE_KEY_NOTE = 'maroc_glow_air_shipping_note';

export function getAirShippingDates(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_DATES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Erreur lecture dates expédition aérienne:', err);
  }
  return DEFAULT_AIR_SHIPPING_DATES;
}

export function saveAirShippingDates(dates: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_DATES, JSON.stringify(dates));
    window.dispatchEvent(new Event('maroc_glow_shipping_dates_updated'));
  } catch (err) {
    console.error('Erreur sauvegarde dates expédition aérienne:', err);
  }
}

export function getAirShippingNote(): string {
  try {
    const note = localStorage.getItem(STORAGE_KEY_NOTE);
    if (note !== null) return note;
  } catch (err) {
    console.error('Erreur lecture note expédition aérienne:', err);
  }
  return 'Clôture de la réception des colis 48h avant chaque départ aérien. Acheminement direct depuis Casablanca.';
}

export function saveAirShippingNote(note: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_NOTE, note);
    window.dispatchEvent(new Event('maroc_glow_shipping_dates_updated'));
  } catch (err) {
    console.error('Erreur sauvegarde note expédition aérienne:', err);
  }
}

// -----------------------------------------------------------------------------
// TARIFS OFFICIELS AU KILOGRAMME
// -----------------------------------------------------------------------------
export const SHIPPING_RATES = {
  routiere: {
    label: 'Voie routière (Transport terrestre)',
    shortLabel: 'Voie routière',
    ratePerKgFcfa: 1600, // 1 600 FCFA / kg
    description: 'Acheminement par convoi terrestre sécurisé. 1 600 FCFA par kilogramme.',
  },
  aerienne: {
    label: 'Voie aérienne (Fret Cargo Avion)',
    shortLabel: 'Voie aérienne',
    ratePerKgFcfa: 5000, // 5 000 FCFA / kg
    description: 'Expédition directe par avion cargo depuis le Maroc. 5 000 FCFA par kilogramme.',
  },
};

/**
 * Estime le poids unitaire brut (produit + emballage sécurisé) en kilogrammes.
 */
export function estimateProductWeightKg(product: {
  volumeOrWeight?: string;
  categorySlug?: string;
  name?: string;
}): number {
  const text = (product.volumeOrWeight || '').toLowerCase();
  const cat = (product.categorySlug || '').toLowerCase();
  const name = (product.name || '').toLowerCase();

  // 1. Parsing direct du texte s'il contient des unités
  if (text) {
    // Cas Kg
    const kgMatch = text.match(/([\d.,]+)\s*kg/i);
    if (kgMatch) {
      const val = parseFloat(kgMatch[1].replace(',', '.'));
      if (!isNaN(val) && val > 0) return Math.max(val + 0.1, 0.2);
    }

    // Cas Grammes
    const gMatch = text.match(/([\d.,]+)\s*g/i);
    if (gMatch) {
      const val = parseFloat(gMatch[1].replace(',', '.'));
      if (!isNaN(val) && val > 0) {
        // Poids en g converti en kg + tare pot/bocal/flacon (ex: 50g tare pour 250g)
        return Math.max(val / 1000 + 0.05, 0.15);
      }
    }

    // Cas Litres
    const lMatch = text.match(/([\d.,]+)\s*l(?!i)/i);
    if (lMatch) {
      const val = parseFloat(lMatch[1].replace(',', '.'));
      if (!isNaN(val) && val > 0) return Math.max(val + 0.15, 0.5);
    }

    // Cas Millilitres
    const mlMatch = text.match(/([\d.,]+)\s*ml/i);
    if (mlMatch) {
      const val = parseFloat(mlMatch[1].replace(',', '.'));
      if (!isNaN(val) && val > 0) {
        // Flacon verre ou plastique : 100ml d'huile ~ 0.10kg liquide + 0.08kg flacon = 0.18kg
        return Math.max(val / 1000 + 0.08, 0.15);
      }
    }
  }

  // 2. Fallbacks selon la catégorie et le type de produit
  if (cat.includes('sac') || name.includes('sac') || name.includes('cabas') || name.includes('panier')) {
    return 0.7; // Un sac en cuir / panier pèse environ 700g avec emballage
  }
  if (cat.includes('boubou') || name.includes('boubou') || name.includes('djellaba') || name.includes('gandora') || name.includes('caftan')) {
    return 0.45; // Tissu soyeux + broderies ~ 450g
  }
  if (cat.includes('parfum') || name.includes('parfum') || name.includes('musc') || name.includes('oud')) {
    return 0.12; // Petit flacon concentré ~ 120g
  }
  if (cat.includes('huile') || name.includes('huile')) {
    return 0.22; // Bouteille cosmétique standard ~ 220g
  }
  if (cat.includes('savon') || name.includes('savon')) {
    return 0.28; // Savon noir ou pain ~ 280g
  }
  if (cat.includes('poudre') || name.includes('nila') || name.includes('argile') || name.includes('ghassoul')) {
    return 0.3; // Sachet / pot de poudre ~ 300g
  }
  if (cat.includes('pack') || name.includes('pack') || name.includes('coffret') || name.includes('rituel')) {
    return 0.85; // Coffret rituel complet ~ 850g
  }

  // Poids moyen par défaut pour un cosmétique artisanal
  return 0.25;
}

/**
 * Calcule l'estimation du poids total du colis (en kg) pour une liste d'articles de panier.
 * Inclut un minimum forfaitaire de carton d'expédition de 0.15 kg.
 */
export function estimateCartWeightKg(items: Array<{ product: any; quantity: number }>): number {
  if (!items || items.length === 0) return 0;

  const rawWeight = items.reduce((acc, item) => {
    const itemWeight = estimateProductWeightKg(item.product);
    return acc + itemWeight * item.quantity;
  }, 0);

  // Ajout de la protection et carton d'emballage (+150g)
  const totalWithBox = rawWeight + 0.15;

  // Arrondi à 1 décimale supérieure (ex: 1.25 -> 1.3 kg)
  return Math.max(Math.ceil(totalWithBox * 10) / 10, 0.5);
}

/**
 * Calcule l'estimation du montant des frais d'expédition selon le poids et le mode d'expédition.
 * Voie routière: 1 600 FCFA / kg
 * Voie aérienne: 5 000 FCFA / kg
 */
export function calculateShippingEstimate(
  weightKg: number,
  mode: 'routiere' | 'aerienne'
): number {
  if (weightKg <= 0) return 0;
  const rate = mode === 'aerienne' ? SHIPPING_RATES.aerienne.ratePerKgFcfa : SHIPPING_RATES.routiere.ratePerKgFcfa;
  // Arrondi à la centaine la plus proche pour un affichage net
  return Math.round((weightKg * rate) / 100) * 100;
}

