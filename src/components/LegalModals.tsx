import React from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

interface LegalModalsProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#231B15]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#EFE6D8] shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EFE6D8] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FAF7F2] rounded-xl text-[#B8683C] border border-[#EFE6D8]">
              {type === 'terms' ? <FileText className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <h3 className="font-serif text-xl font-bold text-[#231B15]">
              {type === 'terms'
                ? 'Conditions Générales de Vente (CGV)'
                : 'Politique de Confidentialité'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7D7368] hover:text-[#231B15] hover:bg-[#FAF7F2] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-4 space-y-4 text-xs text-[#231B15] leading-relaxed pr-2">
          {type === 'terms' ? (
            <>
              <h4 className="font-serif font-bold text-sm text-[#231B15]">1. Objet & Présentation</h4>
              <p className="text-[#7D7368]">
                Les présentes conditions régissent les ventes de soins cosmétiques naturels et produits de beauté par la boutique Maroc Glow. Tous nos prix sont affichés en Francs CFA (FCFA) toutes taxes comprises.
              </p>

              <h4 className="font-serif font-bold text-sm text-[#231B15]">2. Commandes & Disponibilité</h4>
              <p className="text-[#7D7368]">
                Les produits présentés sur le catalogue sont disponibles dans la limite des stocks indiqués en temps réel. La validation de la commande génère un numéro unique de suivi et engage le client et la boutique.
              </p>

              <h4 className="font-serif font-bold text-sm text-[#231B15]">3. Tarifs et Modalités de Paiement</h4>
              <p className="text-[#7D7368]">
                Les règlements peuvent s'effectuer à la livraison en espèces auprès du coursier, ou par Mobile Money sécurisé (Wave, Orange Money, Moov Money) ainsi que par Carte Bancaire.
              </p>

              <h4 className="font-serif font-bold text-sm text-[#231B15]">4. Livraison & Délais</h4>
              <p className="text-[#7D7368]">
                Les expéditions s'effectuent sous 24h à 48h ouvrées. Le suivi étape par étape (Commande reçue, Confirmée, Préparation, Expédiée, Livrée) est accessible directement sur notre plateforme via votre numéro de commande.
              </p>

              <h4 className="font-serif font-bold text-sm text-[#231B15]">5. Garantie & Retours</h4>
              <p className="text-[#7D7368]">
                En cas de produit défectueux ou non conforme à la réception, vous disposez d'un délai de 7 jours pour solliciter un échange gratuit ou un remboursement via notre service WhatsApp.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-serif font-bold text-sm text-[#231B15]">1. Collecte des données personnelles</h4>
              <p className="text-[#7D7368]">
                Maroc Glow collecte uniquement les informations nécessaires au traitement et à l'acheminement de vos commandes (Nom, Téléphone WhatsApp, Ville et Adresse de livraison).
              </p>

              <h4 className="font-serif font-bold text-sm text-[#231B15]">2. Utilisation des données</h4>
              <p className="text-[#7D7368]">
                Vos coordonnées sont strictement utilisées pour l'expédition de votre colis, les notifications de suivi et les communications directes avec notre service client. Elles ne sont en aucun cas vendues ou cédées à des tiers.
              </p>

              <h4 className="font-serif font-bold text-sm text-[#231B15]">3. Sécurité</h4>
              <p className="text-[#7D7368]">
                Nous appliquons des mesures de protection strictes et un chiffrement standardisé pour préserver l'intégrité et la confidentialité de vos données personnelles.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#EFE6D8] shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#231B15] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#B8683C] transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
