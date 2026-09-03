import { Product, Category, Order, Currency } from '../types';

export const STORE_PHONE = '+212 779545624';
export const STORE_PHONE_DISPLAY = '+212 7 79 54 56 24';
export const STORE_PHONE_CLEAN = '212779545624';
export const STORE_WHATSAPP_LINK = 'https://wa.me/212779545624';

// 1 EUR = 655.957 FCFA (Parité officielle FCFA / Euro)
export const EUR_EXCHANGE_RATE = 655.957;

// Prochaines dates d'expédition aérienne par défaut (modifiables par l'admin)
export const DEFAULT_AIR_SHIPPING_DATES: string[] = [
  'Vendredi 11 Septembre 2026',
  'Mardi 22 Septembre 2026',
  'Vendredi 02 Octobre 2026',
  'Mardi 13 Octobre 2026',
];

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Tous les produits', slug: 'all', description: 'Explorez toute la collection grossiste Maroc Glow.' },
  { id: 'sacs-femme', name: '👜 Sacs Femme', slug: 'sacs-femme', description: 'Sacs à main, cabas et maroquinerie marocaine en cuir véritable et raphia.' },
  { id: 'boubous-marocains', name: '👗 Boubous Marocains', slug: 'boubous-marocains', description: 'Gandoras, djellabas, caftans et boubous marocains traditionnels brodés main.' },
  { id: 'poudres-naturelles', name: '🌿 Poudres Naturelles', slug: 'poudres-naturelles', description: 'Poudres pures : Nila bleu royal, Ghassoul de l’Atlas, Aker Fassi et Henna du désert.' },
  { id: 'parfumerie', name: '🧪 Parfumerie', slug: 'parfumerie', description: 'Muscs blancs Tahara royaux, huiles de parfum d’Orient et encens Bukhoor.' },
  { id: 'beaute-soins', name: '✨ Beauté & Soins', slug: 'beaute-soins', description: 'Sérums précieux, eaux florales de rose de Damas et soins régénérants visage.' },
  { id: 'savons', name: '🧼 Savons', slug: 'savons', description: 'Savons noirs beldi à l’eucalyptus, savons d’Alep et pains de savon artisanaux à l’argan.' },
  { id: 'huiles', name: '💧 Huiles', slug: 'huiles', description: 'Huiles pures pressées à froid : Argan bio, Figue de barbarie, Nigelle et Amande douce.' },
  { id: 'produits-rondeurs', name: '🍑 Produits Rondeurs', slug: 'produits-rondeurs', description: 'Huiles et crèmes végétales galbantes naturelles au Fenugrec et Akpi.' },
];

export const PRODUCTS: Product[] = [
  {
    "id": "mg-poudre-sauge-1kg",
    "name": "Poudre de sauge 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Purifiante, régulatrice de sébum et fortifiante capillaire",
    "shortDescription": "Assainit le cuir chevelu, réduit l’excès de sébum et préserve la vitalité capillaire.",
    "description": "Réputée pour ses propriétés purifiantes et fortifiantes, elle aide à assainir le cuir chevelu, à réduire l’excès de sébum et à redonner force et éclat à la chevelure. Elle est également appréciée pour aider à préserver la beauté naturelle des cheveux au fil du temps.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 5000,
    "publishDate": "2026-06-28",
    "formattedDate": "28 Juin 2026",
    "image": "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 40,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Maroc",
    "ingredients": [
      "100% Poudre de feuilles de sauge officinale (Salvia officinalis)"
    ],
    "usageAdvice": "En masque capillaire séborégulateur ou lotion tonique du cuir chevelu.",
    "rating": 4.8,
    "reviewsCount": 21
  },
  {
    "id": "mg-poudre-camomille-1kg",
    "name": "Poudre de camomille 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Apaisante cuir chevelu sensible, reflets dorés et teint lumineux",
    "shortDescription": "Calme les cuirs chevelus sensibles, illumine les cheveux et apaise les peaux délicates.",
    "description": "Elle est appréciée pour calmer les cuirs chevelus sensibles, apporter douceur et éclat à la chevelure, et illuminer naturellement les cheveux clairs. Côté peau, elle aide à apaiser les irritations et à révéler un teint plus lumineux.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 6000,
    "publishDate": "2026-06-28",
    "formattedDate": "28 Juin 2026",
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 40,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Maroc",
    "ingredients": [
      "100% Poudre de fleurs de camomille matricaire (Matricaria chamomilla)"
    ],
    "usageAdvice": "En masque capillaire doux ou cataplasme apaisant visage.",
    "rating": 4.8,
    "reviewsCount": 24
  },
  {
    "id": "mg-poudre-sene-1kg",
    "name": "Poudre de séné 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Purifie le cuir chevelu, fortifie et apporte douceur et souplesse",
    "shortDescription": "Purifie le cuir chevelu, fortifie les cheveux et apporte douceur et souplesse.",
    "description": "Elle aide à purifier le cuir chevelu, à fortifier les cheveux et à leur apporter douceur et souplesse. Mélangée à d’autres poudres végétales, elle contribue à revitaliser la chevelure et à lui redonner un aspect sain et brillant.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 3000,
    "publishDate": "2026-06-28",
    "formattedDate": "28 Juin 2026",
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Terroirs certifiés",
    "ingredients": [
      "100% Poudre de feuilles de séné (Cassia senna)"
    ],
    "usageAdvice": "À mélanger à de l’eau tiède et d’autres poudres végétales en masque capillaire.",
    "rating": 4.8,
    "reviewsCount": 19
  },
  {
    "id": "mg-poudre-origan-1kg",
    "name": "Poudre d’origan 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Soin purifiant et assainissant pour cuir chevelu et peaux à imperfections",
    "shortDescription": "Assainit le cuir chevelu, réduit les impuretés et purifie les peaux à imperfections.",
    "description": "En soin capillaire, elle aide à assainir le cuir chevelu, à réduire les impuretés et à renforcer les cheveux pour une chevelure plus saine. Pour la peau, elle est reconnue pour contribuer à purifier les peaux sujettes aux imperfections et à leur redonner de l’éclat.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 6500,
    "publishDate": "2026-06-28",
    "formattedDate": "28 Juin 2026",
    "image": "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 40,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Maroc",
    "ingredients": [
      "100% Poudre d’origan pure (Origanum vulgare)"
    ],
    "usageAdvice": "En masque capillaire purifiant ou cataplasme assainissant pour la peau.",
    "rating": 4.8,
    "reviewsCount": 22
  },
  {
    "id": "mg-poudre-lavande-1kg",
    "name": "Poudre de lavande 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Soin naturel apaisant, assainissant et relaxant pour peau et cheveux",
    "shortDescription": "Poudre pure de fleurs de lavande aux propriétés purifiantes et calmantes.",
    "description": "La poudre de Lavande, un soin naturel aux multiples bienfaits ! Réputée pour ses propriétés apaisantes et purifiantes, la poudre de lavande est idéale pour les soins de la peau et des cheveux.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 6500,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 40,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Atlas marocain",
    "ingredients": [
      "100% Poudre de sommités fleuries de lavande séchée"
    ],
    "usageAdvice": "Idéale en infusion pour lotions apaisantes ou en masques purifiants.",
    "rating": 4.8,
    "reviewsCount": 30
  },
  {
    "id": "mg-huile-akpi-concentree",
    "name": "Huile Concentrée Pure d’Akpi (Djansang)",
    "brand": "MAROC GLOW",
    "tagline": "L’huile ancestrale volumatrice et tenseur des tissus",
    "shortDescription": "Graines d’Akpi pures pressées pour stimuler la tonicité et le volume naturel.",
    "description": "L’huile d’Akpi est réputée pour ses principes actifs raffermissants et stimulants. Elle améliore l’élasticité de la peau et aide à sculpter une silhouette harmonieuse et tonique.",
    "category": "🍑 Produits Rondeurs",
    "categorySlug": "produits-rondeurs",
    "priceFcfa": 11000,
    "publishDate": "2026-08-25",
    "formattedDate": "25 Août 2026",
    "image": "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 45,
    "inStock": true,
    "isNew": true,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "100 ml",
    "origin": "Afrique & Terroirs",
    "ingredients": [
      "100% Huile pure de graines d’Akpi (Ricinodendron heudelotii)"
    ],
    "usageAdvice": "Appliquer en massage circulaire sur les fessiers et hanches chaque soir.",
    "rating": 4.8,
    "reviewsCount": 92
  },
  {
    "id": "mg-huile-fenugrec-pure",
    "name": "Huile Végétale Galbante Pure de Fenugrec Pressée à Froid",
    "brand": "MAROC GLOW",
    "tagline": "L’huile naturelle galbante et raffermissante pour fessiers & poitrine",
    "shortDescription": "Riche en phytoestrogènes naturels stimulants pour tonifier et regalber les courbes.",
    "description": "Huile de fenugrec 100% pure extraite par première pression à froid. Très prisée pour favoriser le développement et le raffermissement naturel des courbes féminines (hanches, fessiers, poitrine).",
    "category": "🍑 Produits Rondeurs",
    "categorySlug": "produits-rondeurs",
    "priceFcfa": 9000,
    "publishDate": "2026-08-27",
    "formattedDate": "27 Août 2026",
    "image": "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "100 ml",
    "origin": "Maroc",
    "ingredients": [
      "100% Huile de graines de Fenugrec (Trigonella Foenum-Graecum)"
    ],
    "usageAdvice": "Masser quotidiennement matin et soir en mouvements circulaires ascendants pendant 5 à 10 minutes sur les zones souhaitées.",
    "rating": 4.9,
    "reviewsCount": 145
  },
  {
    "id": "mg-savon-alep-laurier",
    "name": "Savon Pur d’Alep Traditionnel 20% Huile de Laurier",
    "brand": "MAROC GLOW",
    "tagline": "Le plus vieux savon du monde, purifiant et apaisant",
    "shortDescription": "Cuit au chaudron et affiné pendant 9 mois sous le soleil.",
    "description": "Savon noble à l’huile d’olive et 20% d’huile de baies de laurier. Idéal pour les peaux sensibles, sujettes à l’eczéma, au psoriasis ou aux rougeurs.",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 4500,
    "publishDate": "2026-08-11",
    "formattedDate": "11 Août 2026",
    "image": "https://images.unsplash.com/photo-1607006314144-8d48a58f334a?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1607006314144-8d48a58f334a?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 40,
    "inStock": true,
    "isNew": false,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "200 g",
    "origin": "Alep & Méditerranée",
    "ingredients": [
      "Huile d’Olive",
      "20% Huile de baies de laurier"
    ],
    "usageAdvice": "Usage quotidien corps et visage.",
    "rating": 4.7,
    "reviewsCount": 31
  },
  {
    "id": "mg-pain-savon-argan-miel",
    "name": "Pain de Savon Artisanal Argan, Miel & Fleur d’Oranger",
    "brand": "MAROC GLOW",
    "tagline": "Saponification à froid surgras pour peaux délicates",
    "shortDescription": "Pain de savon extra-doux enrichi à 10% d’huile d’argan pure bio et miel d’oranger.",
    "description": "Savon surgras qui nettoie sans dessécher. Sa mousse onctueuse enveloppe le corps d’un parfum gourmand de fleur d’oranger et nourrit l’épiderme en profondeur.",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 3500,
    "publishDate": "2026-08-14",
    "formattedDate": "14 Août 2026",
    "image": "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 70,
    "inStock": true,
    "isNew": false,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "120 g",
    "origin": "Essaouira, Maroc",
    "ingredients": [
      "Huile d’olive",
      "Huile d’argan bio",
      "Miel pur",
      "Essence de fleur d’oranger"
    ],
    "usageAdvice": "Faire mousser sur peau mouillée puis rincer.",
    "rating": 4.8,
    "reviewsCount": 56
  },
  {
    "id": "mg-savon-noir-eucalyptus",
    "name": "Savon Noir Beldi à l'Eucalyptus & Argan",
    "brand": "MAROC GLOW",
    "tagline": "La pâte exfoliante ancestrale pour une peau neuve et veloutée",
    "shortDescription": "Pâte végétale 100% naturelle aux olives noires marocaines enrichie en huile d’eucalyptus.",
    "description": "Le secret du rituel de hammam marocain. Notre savon noir prépare la peau au gommage en éliminant les cellules mortes et les impuretés en profondeur.",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 6000,
    "publishDate": "2026-08-18",
    "formattedDate": "18 Août 2026",
    "image": "https://images.unsplash.com/photo-1607006314144-8d48a58f334a?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1607006314144-8d48a58f334a?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 60,
    "inStock": true,
    "isNew": false,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "250 g",
    "origin": "Marrakech, Maroc",
    "ingredients": [
      "Pâte d’Olives Noires",
      "Huile d’Argan vierge",
      "Huile essentielle d’Eucalyptus"
    ],
    "usageAdvice": "Appliquer sur peau chaude et humide au bain ou sous la douche, laisser agir 5 min puis gommer au gant.",
    "rating": 4.9,
    "reviewsCount": 165
  },
  {
    "id": "mg-masque-eclat-nila",
    "name": "Masque Crème Éclat Unifiant au Nila Bleu & Karité",
    "brand": "MAROC GLOW",
    "tagline": "Formule prête à l’emploi anti-taches et éclat immédiat",
    "shortDescription": "Enrichi en Nila royal, beurre de karité et huile d’argan pour illuminer le teint.",
    "description": "Masque onctueux prêt à l’emploi combinant les propriétés unifiantes du Nila bleu et la nutrition profonde de l’argan et du karité. Laisse la peau douce, lisse et radieuse dès la 1ère pose.",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 11500,
    "publishDate": "2026-08-24",
    "formattedDate": "24 Août 2026",
    "image": "https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 35,
    "inStock": true,
    "isNew": true,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "150 ml",
    "origin": "Maroc",
    "ingredients": [
      "Poudre de Nila",
      "Beurre de Karité Bio",
      "Huile d’Argan",
      "Vitamine E"
    ],
    "usageAdvice": "Appliquer en couche généreuse sur le visage 15 minutes, puis rincer à l’eau tiède.",
    "rating": 4.9,
    "reviewsCount": 76
  },
  {
    "id": "mg-fleur-oranger-200",
    "name": "Eau de Fleur d'Oranger Sauvage Pure Distillation",
    "brand": "MAROC GLOW",
    "tagline": "Hydrolat apaisant relaxant et booster d’éclat instantané",
    "shortDescription": "Distillée à partir de fleurs fraîches de bigaradier récoltées au printemps.",
    "description": "Une eau florale pure aux notes lumineuses. Elle calme les peaux sensibles, réveille le teint et procure une détente immédiate.",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 7500,
    "publishDate": "2026-08-16",
    "formattedDate": "16 Août 2026",
    "image": "https://images.unsplash.com/photo-1547793548-7a0e7dfdb24f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1547793548-7a0e7dfdb24f?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 40,
    "inStock": true,
    "isNew": false,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "200 ml",
    "origin": "Marrakech, Maroc",
    "ingredients": [
      "100% Hydrolat pur de fleurs d’oranger"
    ],
    "usageAdvice": "Vaporiser sur le visage et le décolleté matin et soir.",
    "rating": 4.8,
    "reviewsCount": 43
  },
  {
    "id": "mg-rose-damas-200",
    "name": "Eau Florale Pure de Rose de Damas",
    "brand": "MAROC GLOW",
    "tagline": "Hydrolat tonifiant, purifiant et illuminateur de teint",
    "shortDescription": "Distillation artisanale de pétales de roses fraîches cueillies à l’aube dans la Vallée des Roses.",
    "description": "Une eau florale d’une pureté rare, obtenue par distillation lente à la vapeur d’eau. Elle resserre les pores, apaise les rougeurs, tonifie l’épiderme et laisse un voile subtil et envoûtant.",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 7500,
    "publishDate": "2026-08-20",
    "formattedDate": "20 Août 2026",
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 45,
    "inStock": true,
    "isNew": false,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "200 ml",
    "origin": "Kelaat M'Gouna, Maroc",
    "ingredients": [
      "100% Eau Florale de Rose de Damas Bio"
    ],
    "usageAdvice": "Vaporiser sur le visage propre matin et soir avant votre soin quotidien.",
    "rating": 4.8,
    "reviewsCount": 98
  },
  {
    "id": "mg-bukhoor-oriental",
    "name": "Encens Bukhoor Marocain Artisanal aux Bois Précieux",
    "brand": "MAROC GLOW",
    "tagline": "Parfume et purifie l’intérieur de notes orientales envoûtantes",
    "shortDescription": "Copeaux de bois de santal et d’agarwood imprégnés d’huiles parfumées.",
    "description": "Bukhoor traditionnel préparé à la main selon les recettes ancestrales. Diffuse une fumée délicate et parfumée pour créer une ambiance chaleureuse et apaisante.",
    "category": "🧪 Parfumerie",
    "categorySlug": "parfumerie",
    "priceFcfa": 9000,
    "publishDate": "2026-08-17",
    "formattedDate": "17 Août 2026",
    "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 35,
    "inStock": true,
    "isNew": false,
    "isBestSeller": false,
    "isBio": false,
    "volumeOrWeight": "70 g",
    "origin": "Fès, Maroc",
    "ingredients": [
      "Copeaux de bois aromatiques",
      "Musc",
      "Huiles essentielles orientales"
    ],
    "usageAdvice": "Déposer une pincée sur un charbon ardent ou dans un brûleur d’encens.",
    "rating": 4.8,
    "reviewsCount": 39
  },
  {
    "id": "mg-parfum-oud-royal",
    "name": "Huile de Parfum Oriental Oud & Ambre Royal",
    "brand": "MAROC GLOW",
    "tagline": "Notes boisées envoûtantes, ambre impérial et rose orientale",
    "shortDescription": "Attar concentré oriental de prestige pour sillage puissant et raffiné.",
    "description": "Élixir olfactif majestueux mariant les bois de oud précieux, l’ambre chaud et les épices douces marocaines.",
    "category": "🧪 Parfumerie",
    "categorySlug": "parfumerie",
    "priceFcfa": 15000,
    "publishDate": "2026-08-23",
    "formattedDate": "23 Août 2026",
    "image": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 30,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": false,
    "volumeOrWeight": "15 ml",
    "origin": "Marrakech, Maroc",
    "ingredients": [
      "Huiles de parfum pures concentrées",
      "Oud naturel",
      "Ambre"
    ],
    "usageAdvice": "Appliquer sur les points de pulsation.",
    "rating": 4.9,
    "reviewsCount": 47
  },
  {
    "id": "mg-musc-tahara-royal",
    "name": "Musc Tahara Blanc Précieux sans Alcool",
    "brand": "MAROC GLOW",
    "tagline": "La fragrance pure, crémeuse et délicate aux notes de coton et de fleurs blanches",
    "shortDescription": "Concentré de parfum oriental soyeux longue tenue, symbole d’hygiène et de sensualité raffinée.",
    "description": "Un parfum d’une douceur irrésistible à la texture fondante. Sa tenue dure plus de 24 heures sur la peau et les vêtements tout en respectant l’épiderme sans alcool.",
    "category": "🧪 Parfumerie",
    "categorySlug": "parfumerie",
    "priceFcfa": 8000,
    "publishDate": "2026-08-26",
    "formattedDate": "26 Août 2026",
    "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": true,
    "isBio": false,
    "volumeOrWeight": "12 ml (Concentré)",
    "origin": "Marrakech, Maroc",
    "ingredients": [
      "Parfum concentré de musc blanc",
      "Extrait de fleur de lotus",
      "Ambre doux",
      "0% Alcool"
    ],
    "usageAdvice": "Déposer une micro-goutte au creux du cou, derrière les oreilles et sur les poignets.",
    "rating": 4.9,
    "reviewsCount": 112
  },
  {
    "id": "mg-henne-naturel-desert",
    "name": "Poudre Pure de Henna Naturel du Désert",
    "brand": "MAROC GLOW",
    "tagline": "Soin fortifiant cuir chevelu, brillance et coloration dorée cuivrée",
    "shortDescription": "Feuilles de henné pur broyées finement sans aucun sel métallique ni additif.",
    "description": "Henné de qualité supérieure issu des oasis du Sud marocain. Il gaine la fibre capillaire, apporte volume et éclat miroir tout en assainissant le cuir chevelu.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 4500,
    "publishDate": "2026-08-10",
    "formattedDate": "10 Août 2026",
    "image": "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 40,
    "inStock": true,
    "isNew": false,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "250 g",
    "origin": "Zagora, Maroc",
    "ingredients": [
      "100% Poudre de feuilles de Lawsonia Inermis"
    ],
    "usageAdvice": "Mélanger à de l’eau tiède et appliquer en masque sur les cheveux 1 à 3 heures.",
    "rating": 4.8,
    "reviewsCount": 42
  },
  {
    "id": "mg-ghassoul-atlas",
    "name": "Ghassoul Minéral Pur de l’Atlas aux 7 Plantes",
    "brand": "MAROC GLOW",
    "tagline": "Argile volcanique purifiante et reminéralisante pour visage & cheveux",
    "shortDescription": "Argile saponifère unique extraite des gisements du Moyen Atlas.",
    "description": "Le Ghassoul nettoie la peau et le cuir chevelu en douceur. Il absorbe l’excès de sébum, resserre les pores et donne un volume exceptionnel à la chevelure.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 5500,
    "publishDate": "2026-08-15",
    "formattedDate": "15 Août 2026",
    "image": "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": false,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "200 g",
    "origin": "Moyen Atlas, Maroc",
    "ingredients": [
      "Argile minérale Ghassoul pure",
      "Extraits de Rose, Romarin, Thym et Lavande"
    ],
    "usageAdvice": "Mélanger une cuillère d’argile avec de l’eau tiède ou de l’eau de rose jusqu’à obtention d’une pâte lisse.",
    "rating": 4.7,
    "reviewsCount": 74
  },
  {
    "id": "mg-aker-fassi-pur",
    "name": "Poudre d’Aker Fassi Pur (Coquelicot & Grenade)",
    "brand": "MAROC GLOW",
    "tagline": "Le blush et rouge à lèvres ancestral 100% végétal et bio",
    "shortDescription": "Poudre rouge rubis obtenue par séchage artisanal de pétales de coquelicot.",
    "description": "L’Aker Fassi est le cosmétique naturel légendaire de Fès. Riche en antioxydants, il colore naturellement les lèvres et les pommettes tout en offrant des propriétés hydratantes et anti-âge.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 6500,
    "publishDate": "2026-08-21",
    "formattedDate": "21 Août 2026",
    "image": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 45,
    "inStock": true,
    "isNew": false,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "50 g",
    "origin": "Fès, Maroc",
    "ingredients": [
      "Pétales de coquelicot séchés",
      "Écorce de grenade"
    ],
    "usageAdvice": "Humidifier un pinceau ou mélanger une pincée à de l’eau de rose pour appliquer sur les lèvres, les joues ou les masques capillaires.",
    "rating": 4.8,
    "reviewsCount": 114
  },
  {
    "id": "mg-nila-bleu-pur",
    "name": "Poudre Pure de Nila Bleu Royal du Sahara",
    "brand": "MAROC GLOW",
    "tagline": "Le secret millénaire des femmes sahariennes pour un teint unifié sans tache",
    "shortDescription": "Minéral bleu 100% naturel réputé pour éclaircir, illuminer et unifier.",
    "description": "Poudre de Nila bleue authentique d’une finesse extrême. Elle est célèbre pour estomper les taches brunes, les zones sombres (coudes, genoux, aisselles) et redonner un éclat sublime à la peau.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 7500,
    "publishDate": "2026-08-26",
    "formattedDate": "26 Août 2026",
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 60,
    "inStock": true,
    "isNew": false,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "100 g",
    "origin": "Sahara marocain",
    "ingredients": [
      "100% Poudre minérale de Nila pure"
    ],
    "usageAdvice": "Mélanger une pincée avec du yaourt nature, du savon noir ou de l’eau de rose pour créer un masque corporel ou visage.",
    "rating": 4.9,
    "reviewsCount": 178
  },
  {
    "id": "mg-panier-raphia-marrakech",
    "name": "Panier Cabas Raphia Tressé & Anses Cuir Marrakech",
    "brand": "MAROC GLOW",
    "tagline": "Le grand panier chic en feuilles de palmier doum et cuir",
    "shortDescription": "Tressage main traditionnel ultra-robuste avec finitions en cuir cognac.",
    "description": "Incontournable panier de ville et de plage, tressé à la main à partir de fibres naturelles végétales de palmier doum et orné de solides poignées en cuir cousues main.",
    "category": "👜 Sacs Femme",
    "categorySlug": "sacs-femme",
    "priceFcfa": 14000,
    "publishDate": "2026-08-18",
    "formattedDate": "18 Août 2026",
    "image": "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 35,
    "inStock": true,
    "isNew": false,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Unité",
    "origin": "Marrakech, Maroc",
    "ingredients": [
      "Fibre naturelle de palmier doum",
      "Cuir tanné végétal"
    ],
    "usageAdvice": "Conserver dans un endroit sec.",
    "rating": 4.8,
    "reviewsCount": 45
  },
  {
    "id": "mg-sac-bandouliere-cuir-vintage",
    "name": "Sac Bandoulière Cuir Marocain Artisanal Vintage",
    "brand": "MAROC GLOW",
    "tagline": "Élégance marocaine intemporelle et finitions dorées",
    "shortDescription": "Cuir souple premium avec gravures orientales travaillées à la main.",
    "description": "Sac besace bandoulière à rabat gravé artisanalement. Idéal au quotidien, fermeture aimantée sécurisée et bandoulière ajustable.",
    "category": "👜 Sacs Femme",
    "categorySlug": "sacs-femme",
    "priceFcfa": 19500,
    "publishDate": "2026-08-20",
    "formattedDate": "20 Août 2026",
    "image": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 25,
    "inStock": true,
    "isNew": false,
    "isBestSeller": true,
    "isBio": false,
    "volumeOrWeight": "Unité",
    "origin": "Fès, Maroc",
    "ingredients": [
      "100% Cuir véritable"
    ],
    "usageAdvice": "Nettoyer avec un chiffon doux sec.",
    "rating": 4.8,
    "reviewsCount": 29
  },
  {
    "id": "mg-sac-cabas-cuir-kilim",
    "name": "Cabas Berbère Cuir Véritable & Tissage Kilim",
    "brand": "MAROC GLOW",
    "tagline": "Maroquinerie artisanale de Marrakech en cuir tanné végétal",
    "shortDescription": "Pièce artisanale unique alliant cuir pleine fleur et broderie berbère authentique.",
    "description": "Magnifique cabas spacieux confectionné à la main par les maîtres maroquiniers de Marrakech. Doublure résistante avec poches intérieures zippées et anses renforcées en cuir véritable.",
    "category": "👜 Sacs Femme",
    "categorySlug": "sacs-femme",
    "priceFcfa": 28000,
    "publishDate": "2026-08-27",
    "formattedDate": "27 Août 2026",
    "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 20,
    "inStock": true,
    "isNew": true,
    "isBestSeller": true,
    "isBio": false,
    "volumeOrWeight": "Unité",
    "origin": "Marrakech, Maroc",
    "ingredients": [
      "Cuir de vachette véritable tannage naturel",
      "Tissu Kilim berbère artisanal"
    ],
    "usageAdvice": "Protéger de l’eau et nourrir périodiquement avec un lait pour cuir.",
    "rating": 4.9,
    "reviewsCount": 38
  },
  {
    "id": "mg-huile-nigelle-pure",
    "name": "Huile Pure de Nigelle Bio (Cumin Noir)",
    "brand": "MAROC GLOW",
    "tagline": "La graine bénie purifiante, apaisante et fortifiante",
    "shortDescription": "Reconnue pour ses propriétés antibactériennes puissantes contre les imperfections et la chute.",
    "description": "Pressée à froid à partir de graines de nigelle d’une qualité exceptionnelle, cette huile apaise les peaux à imperfections et tonifie le cuir chevelu.",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 8500,
    "publishDate": "2026-08-12",
    "formattedDate": "12 Août 2026",
    "image": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 40,
    "inStock": true,
    "isNew": false,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "100 ml",
    "origin": "Maroc",
    "ingredients": [
      "100% Huile de Nigelle Biologique"
    ],
    "usageAdvice": "Appliquer sur les zones ciblées du visage ou masser le cuir chevelu.",
    "rating": 4.7,
    "reviewsCount": 51
  },
  {
    "id": "mg-huile-figue-barbarie",
    "name": "Huile Pure de Pépins de Figue de Barbarie",
    "brand": "MAROC GLOW",
    "tagline": "L’anti-âge naturel suprême, tenseur et régénérant cellulaire",
    "shortDescription": "1 tonne de fruits pour obtenir 1L d’huile pure rare et précieuse.",
    "description": "Considérée comme l’une des huiles les plus précieuses au monde, elle est ultra-concentrée en stérols et vitamine E pour lifter, atténuer les rides et redonner une fermeté spectaculaire.",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 24000,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 30,
    "inStock": true,
    "isNew": true,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "30 ml",
    "origin": "Sidi Ifni, Maroc",
    "ingredients": [
      "100% Huile de pépins de figue de barbarie pure vierge"
    ],
    "usageAdvice": "Déposer 3 gouttes le soir sur le contour des yeux, le visage et le cou en massant délicatement.",
    "rating": 5,
    "reviewsCount": 89
  },
  {
    "id": "mg-argan-bio-100",
    "name": "Huile Pure d'Argan Bio Pressée à Froid",
    "brand": "MAROC GLOW",
    "tagline": "L'élixir d'or pur régénérant pour visage, corps et cheveux",
    "shortDescription": "100% pure et certifiée biologique, récoltée à Taroudant. Riche en vitamine E et omégas 6 et 9.",
    "description": "Véritable joyau du terroir marocain, notre Huile d'Argan Bio est extraite par première pression à froid d'amandons sauvages sélectionnés à la main. Elle nourrit intensément, prévient le vieillissement cutané, redonne de l'éclat au teint et répare les pointes sèches et abîmées.",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "publishDate": "2026-08-25",
    "formattedDate": "25 Août 2026",
    "image": "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": false,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "100 ml",
    "origin": "Taroudant, Maroc",
    "ingredients": [
      "100% Huile d'Argan Vierge Biologique"
    ],
    "usageAdvice": "Appliquer quelques gouttes matin et soir sur une peau propre et légèrement humide. Idéal également en soin capillaire.",
    "rating": 4.9,
    "reviewsCount": 142
  },
  {
    "id": "mg-poudre-aker-fassi-1kg",
    "name": "Poudre d’aker fassi 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Teinte rouge naturelle, effet bonne mine et soin adoucissant",
    "shortDescription": "Idéale pour lèvres, joues et soins visage/corps pour un effet bonne mine radieux.",
    "description": "Utilisée aussi bien pour les lèvres que pour les joues, elle apporte une jolie teinte rouge naturelle et un effet bonne mine. En soin, elle est également reconnue pour aider à adoucir et sublimer la peau.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 6500,
    "publishDate": "2026-06-28",
    "formattedDate": "28 Juin 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788458565/images_1_lfukh2.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Fès, Maroc",
    "ingredients": [
      "100% Poudre pure de coquelicot séché et écorce de grenade"
    ],
    "usageAdvice": "Une pointe de couteau suffit, à diluer dans de l’eau de rose ou un baume.",
    "rating": 4.9,
    "reviewsCount": 47
  },
  {
    "id": "mg-poudre-thym-1kg",
    "name": "Poudre de thym 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Assainissant cuir chevelu et soin purifiant pour teint net",
    "shortDescription": "Aide à assainir le cuir chevelu, fortifier dès la racine et purifier les imperfections.",
    "description": "Elle aide à assainir le cuir chevelu, à lutter contre les impuretés et à fortifier les cheveux dès la racine. Côté peau, elle est appréciée pour purifier les peaux sujettes aux imperfections et contribuer à un teint plus net.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 8500,
    "publishDate": "2026-06-28",
    "formattedDate": "28 Juin 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788458745/thym-poudre_dvvmb0.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 45,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Atlas marocain",
    "ingredients": [
      "100% Poudre de thym sauvage séché (Thymus vulgaris)"
    ],
    "usageAdvice": "En masque capillaire assainissant ou lotion purifiante après infusion.",
    "rating": 4.9,
    "reviewsCount": 26
  },
  {
    "id": "mg-poudre-romarin-1kg",
    "name": "Poudre de romarin 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Fortifiant d’excellence, vitalité et stimulation de la pousse",
    "shortDescription": "Fortifie les cheveux, redonne vitalité et favorise une croissance saine.",
    "description": "La poudre de romarin est appréciée pour prendre soin des cheveux et du cuir chevelu. Elle aide à fortifier les cheveux, à leur redonner de la vitalité et à favoriser un environnement propice à une croissance saine.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 4000,
    "publishDate": "2026-06-28",
    "formattedDate": "28 Juin 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788458564/as-poudre-de-romarin-bio_nay10c.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 60,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Plateaux de l’Atlas, Maroc",
    "ingredients": [
      "100% Poudre de sommités de romarin séché (Rosmarinus officinalis)"
    ],
    "usageAdvice": "Mélanger avec de l’eau chaude ou une huile végétale en masque fortifiant.",
    "rating": 4.9,
    "reviewsCount": 54
  },
  {
    "id": "mg-poudre-rose-1kg",
    "name": "Poudre de rose 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Soin de beauté adoucissant, apaisant et revitalisant d’exception",
    "shortDescription": "Illumine le teint, apporte douceur à la peau et redonne éclat et souplesse aux cheveux.",
    "description": "La poudre de rose est un véritable soin de beauté naturel, reconnue pour ses propriétés adoucissantes, apaisantes et revitalisantes. Elle aide à illuminer le teint, à apporter de la douceur à la peau et à redonner éclat et souplesse aux cheveux.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 8500,
    "publishDate": "2026-06-28",
    "formattedDate": "28 Juin 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788458745/ChatGPT_Image_22_mai_2026_15_14_32_1254x_ypayom.webp",
    "gallery": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 45,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Kelaat M'Gouna, Maroc",
    "ingredients": [
      "100% Poudre de pétales de roses de Damas séchées"
    ],
    "usageAdvice": "Mélanger à de l’eau de rose ou à du yaourt pour un masque éclat visage ou capillaire.",
    "rating": 5,
    "reviewsCount": 38
  },
  {
    "id": "mg-creme-galbante-fenugrec-karite",
    "name": "Crème rondeurs Fenugrec & Akpi",
    "brand": "MAROC GLOW",
    "tagline": "Soin onctueux raffermissant pour galbe et élasticité renforcée",
    "shortDescription": "Synergie puissante de fenugrec, d’akpi et de beurre de karité pour hydrater et tonifier.",
    "description": "",
    "category": "🍑 Produits Rondeurs",
    "categorySlug": "produits-rondeurs",
    "priceFcfa": 2000,
    "publishDate": "2026-08-20",
    "formattedDate": "20 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788457384/WhatsApp_Image_2026-09-03_at_18.42.40_f4bcsp.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 35,
    "inStock": true,
    "isNew": false,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "200 ml",
    "origin": "Maroc",
    "ingredients": [
      "Extrait concentré de Fenugrec",
      "Extrait d’Akpi",
      "Beurre de Karité Bio",
      "Huile d’Argan"
    ],
    "usageAdvice": "Masser matin et soir sur les zones cibles jusqu’à absorption complète.",
    "rating": 4.9,
    "reviewsCount": 88
  },
  {
    "id": "mg-caftan-kimono-soie",
    "name": "Boubou normal",
    "brand": "MAROC GLOW",
    "tagline": "La touche d’éclat orientale chic pour tenues d’exception",
    "shortDescription": "À porter ouvert ou fermé avec ceinture dorée assortie.",
    "description": "",
    "category": "👗 Boubous Marocains",
    "categorySlug": "boubous-marocains",
    "priceFcfa": 3500,
    "publishDate": "2026-08-19",
    "formattedDate": "19 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899513/WhatsApp_Image_2026-08-16_at_17.51.01_7_ambzfj.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 22,
    "inStock": true,
    "isNew": false,
    "isBestSeller": true,
    "isBio": false,
    "volumeOrWeight": "Taille Unique",
    "origin": "Marrakech, Maroc",
    "ingredients": [
      "Mousseline soyeuse",
      "Fils d’or Skalli"
    ],
    "usageAdvice": "Lavage à sec recommandé.",
    "rating": 4.9,
    "reviewsCount": 52
  },
  {
    "id": "mg-djellaba-brodee-fes",
    "name": "Makiba avec perlage, en tissu crêpe",
    "brand": "MAROC GLOW",
    "tagline": "Prestige et noblesse du travail artisanal marocain",
    "shortDescription": "Tissu de crêpe de haute qualité avec capuchon traditionnel brodé.",
    "description": "",
    "category": "👗 Boubous Marocains",
    "categorySlug": "boubous-marocains",
    "priceFcfa": 7800,
    "publishDate": "2026-08-22",
    "formattedDate": "22 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899355/WhatsApp_Image_2026-08-16_at_17.51.00_6_ovdll1.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 18,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": false,
    "volumeOrWeight": "Taille Standard",
    "origin": "Fès, Maroc",
    "ingredients": [
      "Crêpe fluide premium",
      "Broderie main"
    ],
    "usageAdvice": "Repassage doux à la vapeur.",
    "rating": 5,
    "reviewsCount": 34
  },
  {
    "id": "mg-gandora-sabra-royale",
    "name": "Jalaba avec capuche en tissu crêpe",
    "brand": "MAROC GLOW",
    "tagline": "Tissu fluide infroissable, broderies sfifa et boutons aakad faits main",
    "shortDescription": "Coupe ample raffinée et ultra-confortable pour cérémonies et réceptions.",
    "description": "",
    "category": "👗 Boubous Marocains",
    "categorySlug": "boubous-marocains",
    "priceFcfa": 8300,
    "publishDate": "2026-08-25",
    "formattedDate": "25 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899596/WhatsApp_Image_2026-08-16_at_17.51.01_bhxedj.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 30,
    "inStock": true,
    "isNew": true,
    "isBestSeller": true,
    "isBio": false,
    "volumeOrWeight": "Taille Unique",
    "origin": "Fès & Rabat, Maroc",
    "ingredients": [
      "Soie végétale de Sabra (Aloe vera)",
      "Fils de soie et broderies artisanales"
    ],
    "usageAdvice": "Lavage délicat à la main ou en machine à 30°C.",
    "rating": 4.9,
    "reviewsCount": 67
  },
  {
    "id": "mg-gamme-aloe-vera",
    "name": "MINI GAMME ALOE VERA",
    "brand": "Maison LaurNex",
    "tagline": "Coffret soin hydratant et apaisant 6 pièces à l'aloe vera",
    "shortDescription": "Gamme complète comprenant crème visage, lait corporel, masque, gommage, savon visage et gant de corps.",
    "description": "Une routine complète comprenant crème visage, lait corporel, masque, gommage, savon visage et gant de corps. Idéale pour réunir plusieurs étapes de soin dans une seule gamme.",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 7500,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899615/WhatsApp_Image_2026-08-16_at_17.51.03_1_ryaeiz.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 35,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Coffret 6 pièces",
    "origin": "Maroc",
    "ingredients": [
      "Gel pur d’Aloe Vera Bio",
      "Agents hydratants naturels"
    ],
    "usageAdvice": "Application quotidienne pour apaiser et hydrater intensément l’épiderme.",
    "rating": 5,
    "reviewsCount": 39
  },
  {
    "id": "mg-gamme-aker-fassi",
    "name": "MINI GAMME AKER FASSI",
    "brand": "Maison LaurNex",
    "tagline": "Rituel beauté marocain complet 6 pièces à l'extrait pur d'Aker Fassi",
    "shortDescription": "Routine complète comprenant crème visage, lait corporel, masque, gommage, savon visage et gant de corps.",
    "description": "Une routine complète comprenant crème visage, lait corporel, masque, gommage, savon visage et gant de corps. Idéale pour réunir plusieurs étapes de soin dans une seule gamme.",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 7500,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899643/WhatsApp_Image_2026-08-16_at_17.51.02_8_ykqo5m.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 30,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Coffret 6 pièces",
    "origin": "Maroc",
    "ingredients": [
      "Extrait de coquelicot (Aker Fassi)",
      "Argile rouge",
      "Huile végétale douce"
    ],
    "usageAdvice": "Utiliser chaque soin selon la routine visage et corps recommandée.",
    "rating": 5,
    "reviewsCount": 42
  },
  {
    "id": "mg-gamme-carotte",
    "name": "MINI GAMME CAROTTE",
    "brand": "Maison LaurNex",
    "tagline": "Routine complète 6 pièces pour un teint lumineux et éclatant",
    "shortDescription": "Routine complète comprenant crème visage, lait corporel, masque, gommage, savon visage et gant de corps.",
    "description": "Une routine complète comprenant crème visage, lait corporel, masque, gommage, savon visage et gant de corps. Idéale pour réunir plusieurs étapes de soin dans une seule gamme.",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 7500,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899616/WhatsApp_Image_2026-08-16_at_17.51.03_zufqs1.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 35,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Coffret 6 pièces",
    "origin": "Maroc",
    "ingredients": [
      "Extrait de racine de carotte",
      "Bêta-carotène",
      "Huiles végétales douces"
    ],
    "usageAdvice": "Compléter votre rituel quotidien pour révéler l’éclat naturel du teint.",
    "rating": 4.9,
    "reviewsCount": 35
  },
  {
    "id": "mg-gel-douche-beldi-carotte",
    "name": "Gel douche beldi à la carotte",
    "brand": "Maison LaurNex",
    "tagline": "Gel douche beldi nettoyant et sublimateur d’éclat",
    "shortDescription": "Toilette quotidienne douce associant savon beldi et bienfaits illuminants de la carotte.",
    "description": "Un gel douche beldi destiné à la routine de toilette quotidienne. Il permet de nettoyer la peau tout en profitant des propriétés associées à la carotte.\n\n• Formule beldi traditionnelle\n• Aux extraits de carotte",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 2600,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898645/6c43c066-3739-497f-8c06-ac839eae01e7_sdjpla.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1607006314144-8d48a58f334a?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "500 ml",
    "origin": "Maroc",
    "ingredients": [
      "Base lavante végétale beldi",
      "Extrait de carotte bio"
    ],
    "usageAdvice": "Utiliser quotidiennement pour un nettoyage respectueux de l’épiderme.",
    "rating": 4.8,
    "reviewsCount": 24
  },
  {
    "id": "mg-poudre-amla-1kg",
    "name": "Poudre d’amla 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Le secret ayurvédique d’une chevelure forte, dense et éclatante",
    "shortDescription": "Fortifie les racines, favorise la croissance et apporte brillance et vitalité.",
    "description": "La poudre d’Amla, le secret d’une chevelure forte et éclatante ! C’est réputée pour fortifier les cheveux, favoriser leur croissance et leur apporter brillance et vitalité.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 10000,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788457921/shutterstock_1160797252_sotnwy.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 40,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Terroirs ayurvédiques d’excellence",
    "ingredients": [
      "100% Poudre pure d’Amla (Emblica officinalis)"
    ],
    "usageAdvice": "Mélanger avec de l’eau tiède pour former une pâte onctueuse, laisser poser en masque.",
    "rating": 4.9,
    "reviewsCount": 44
  },
  {
    "id": "mg-poudre-fenugrec-1kg",
    "name": "Poudre de fenugrec 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Fortifiant capillaire naturel, volume et bien-être général",
    "shortDescription": "Trésor naturel réputé pour fortifier les cheveux, leur apporter volume et brillance.",
    "description": "La poudre de Fenugrec, un trésor naturel aux multiples bienfaits ! Elle est réputée pour aider à fortifier les cheveux, leur apporter du volume et de la brillance, tout en contribuant au bien-être général dans le cadre d’une alimentation équilibrée.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 4000,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788456973/WhatsApp_Image_2026-09-03_at_17.48.57_fryzai.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Maroc",
    "ingredients": [
      "100% Poudre pure de graines de Fenugrec (Trigonella foenum-graecum)"
    ],
    "usageAdvice": "À incorporer dans vos masques capillaires nourrissants ou préparations maison.",
    "rating": 4.8,
    "reviewsCount": 52
  },
  {
    "id": "mg-poudre-ghassoul-1kg",
    "name": "Poudre de ghassoul 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Argile minérale marocaine purifiante pour peau douce et cheveux légers",
    "shortDescription": "L’argile authentique du Maroc extraite des gisements de l’Atlas pour purifier en douceur.",
    "description": "Le Ghassoul, l’argile naturelle du Maroc ! Utilisé depuis des siècles, il nettoie la peau et les cheveux en douceur tout en absorbant les impuretés et l’excès de sébum. Pour une peau douce et des cheveux légers.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 4000,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788456972/WhatsApp_Image_2026-09-03_at_17.48.57_1_rkoyhc.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 60,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Moyen Atlas, Maroc",
    "ingredients": [
      "100% Argile saponifère naturelle marocaine (Montmorillonite)"
    ],
    "usageAdvice": "Délayer avec de l’eau tiède ou de l’eau de rose pour former une pâte soyeuse.",
    "rating": 4.9,
    "reviewsCount": 68
  },
  {
    "id": "mg-poudre-curcuma-1kg",
    "name": "Poudre de curcuma 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Poudre d’or végétal 100% pure pour recettes de beauté et bien-être",
    "shortDescription": "Incontournable de la nature pour masques éclaircissants et routine saine.",
    "description": "La poudre de Curcuma, un incontournable de la nature ! 100 % naturelle, elle s’intègre facilement dans vos recettes, boissons et préparations beauté pour une routine saine et authentique.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 5000,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788457923/curcuma3-1024x703-1-740x508_fnbyff.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Terroirs certifiés",
    "ingredients": [
      "100% Curcuma racine en poudre (Curcuma longa)"
    ],
    "usageAdvice": "Intégrer dans des masques au miel ou au yaourt pour illuminer le teint.",
    "rating": 4.8,
    "reviewsCount": 41
  },
  {
    "id": "mg-poudre-maca-1kg",
    "name": "Poudre de maca 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Trésor naturel des Andes pour vitalité, énergie et tonus",
    "shortDescription": "Plante adaptogène réputée pour accompagner la vitalité et les performances physiques.",
    "description": "La poudre de Maca, un trésor naturel des Andes ! Elle est souvent consommée pour accompagner la vitalité, le bien-être général et les performances physiques.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 18000,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788458044/la-maca-un-superaliment-aux-multiples-vertus-pour-votre-sante_b3779368b52e9897_sgfib2.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 30,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Hauts plateaux des Andes",
    "ingredients": [
      "100% Poudre de racine de Maca pure (Lepidium meyenii)"
    ],
    "usageAdvice": "Mélanger une cuillère à café dans vos smoothies, jus ou préparations saines.",
    "rating": 4.9,
    "reviewsCount": 29
  },
  {
    "id": "mg-poudre-nila-1kg",
    "name": "Poudre Nila 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Le secret bleu royal du Sahara pour illuminer et adoucir la peau",
    "shortDescription": "Pigment minéral pur royal du Sahara pour masques unifiants et teint radieux.",
    "description": "La poudre de Nila, le secret de beauté venu du Sahara ! Une alliée incontournable pour une peau douce, lumineuse et éclatante de beauté.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 6500,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788457710/images_uqj8l7.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 55,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Sahara marocain",
    "ingredients": [
      "100% Poudre minérale de Nila bleu pure"
    ],
    "usageAdvice": "Mélanger une pincée avec du yaourt ou du savon noir pour un masque unifiant.",
    "rating": 5,
    "reviewsCount": 75
  },
  {
    "id": "mg-poudre-qasil-1kg",
    "name": "Poudre de qasil 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Secret de beauté somalien pour nettoyer et purifier la peau en douceur",
    "shortDescription": "Nettoie la peau, absorbe le sébum et laisse un teint frais et éclatant.",
    "description": "La poudre de Qasil, le secret de beauté naturel venu de Somalie ! Est reconnue pour nettoyer la peau en douceur, absorber l’excès de sébum et laisser le teint frais et éclatant.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 4000,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788457924/poudre-de-qasil-jujubier-sidr-720x1080.jpg_fziy2y.webp",
    "gallery": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 45,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Somalie / Corne de l’Afrique",
    "ingredients": [
      "100% Poudre de feuilles de Gob (Ziziphus mauritiana)"
    ],
    "usageAdvice": "Émulsionner avec un peu d’eau pour créer une mousse nettoyante visage.",
    "rating": 4.8,
    "reviewsCount": 33
  },
  {
    "id": "mg-poudre-hibiscus-1kg",
    "name": "Poudre d’hibiscus 1kg",
    "brand": "Maison LaurNex",
    "tagline": "Soin végétal pour reflets éclatants, brillance et éclat du teint",
    "shortDescription": "Poudre pure de fleurs d’hibiscus pour cheveux éclatants et masque visage éclat.",
    "description": "La poudre d’Hibiscus, le soin naturel pour des cheveux éclatants ! Appréciée pour apporter douceur, brillance et vitalité aux cheveux. Elle est également utilisée dans les soins de la peau pour un teint lumineux.",
    "category": "🌿 Poudres Naturelles",
    "categorySlug": "poudres-naturelles",
    "priceFcfa": 5000,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 45,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 kg",
    "origin": "Terroirs naturels",
    "ingredients": [
      "100% Poudre de calices d’Hibiscus Sabdariffa (Bissap)"
    ],
    "usageAdvice": "Mélanger à de l’eau chaude ou à une base lavante pour cheveux ou masque visage.",
    "rating": 4.9,
    "reviewsCount": 36
  },
  {
    "id": "mg-gel-douche-beldi-aker-fassi",
    "name": "Gel douche beldi à l’aker fassi",
    "brand": "Maison LaurNex",
    "tagline": "Gel douche beldi inspiré des rituels traditionnels marocains",
    "shortDescription": "Formule beldi authentique à l’aker fassi pour une toilette douce et raffinée.",
    "description": "Un gel douche beldi conçu pour accompagner votre routine corporelle. Sa formule à l’aker fassi offre une expérience de soin inspirée des rituels marocains.\n\n• Rituel marocain authentique\n• Aker Fassi naturel",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 2600,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898645/81add923-67e7-4f21-8fd9-7543b8af6311_bcbsr6.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "500 ml",
    "origin": "Maroc",
    "ingredients": [
      "Savon noir beldi saponifié",
      "Poudre d’Aker Fassi"
    ],
    "usageAdvice": "Appliquer sous la douche sur peau humide, faire mousser puis rincer.",
    "rating": 4.9,
    "reviewsCount": 28
  },
  {
    "id": "mg-gel-douche-beldi-concombre",
    "name": "Gel douche beldi au concombre",
    "brand": "Maison LaurNex",
    "tagline": "Fraîcheur intense et hydratation pour la toilette quotidienne",
    "shortDescription": "Gel douche beldi doux au concombre pour une sensation revigorante de pureté.",
    "description": "Un gel douche beldi adapté à l’utilisation quotidienne. Sa composition au concombre apporte une sensation de fraîcheur lors de la toilette.\n\n• Extrait de concombre rafraîchissant\n• Hydratation et propreté",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 2600,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898645/12ae3e0a-f916-4f84-8e43-cf961de61df6_l97jtk.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "500 ml",
    "origin": "Maroc",
    "ingredients": [
      "Base beldi douce",
      "Extrait pur de concombre"
    ],
    "usageAdvice": "Appliquer sous la douche, faire mousser et rincer abondamment.",
    "rating": 4.7,
    "reviewsCount": 19
  },
  {
    "id": "mg-serum-eclaircissant",
    "name": "Sérum éclaircissant",
    "brand": "Maison LaurNex",
    "tagline": "Sérum ciblé haute précision spécialement destiné aux zones sensibles",
    "shortDescription": "Texture légère à pénétration rapide pour unifier délicatement les zones sensibles.",
    "description": "Sérum spécialement destiné aux zones sensibles. Il s’intègre facilement dans une routine de soin ciblée.\n\n• Spécial zones sensibles\n• Texture légère à pénétration rapide",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 2500,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899663/WhatsApp_Image_2026-08-16_at_17.51.04_1_vnqnth.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 70,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "50 ml",
    "origin": "Maroc",
    "ingredients": [
      "Actifs botaniques unifiants",
      "Acide hyaluronique doux"
    ],
    "usageAdvice": "Appliquer quelques gouttes le soir sur peau propre et masser délicatement.",
    "rating": 4.8,
    "reviewsCount": 46
  },
  {
    "id": "mg-eau-vitamine-c-1l",
    "name": "Eau de vitamine C 1L",
    "brand": "Maison LaurNex",
    "tagline": "Eau de soin énergisante et tonifiante format généreux 1 Litre",
    "shortDescription": "Apporte fraîcheur et confort au teint. Format économique 1 Litre pour toute la famille.",
    "description": "Une eau de soin idéale pour accompagner votre routine beauté quotidienne. Elle apporte une sensation de fraîcheur et de confort à la peau.\n\n• Format économique 1 Litre\n• Enrichie en vitamine C",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 6500,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898898/WhatsApp_Image_2026-08-16_at_17.47.40_npgjke.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 40,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 L",
    "origin": "Maroc",
    "ingredients": [
      "Eau purifiée",
      "Vitamine C stabilisée",
      "Extrait d’agrumes doux"
    ],
    "usageAdvice": "Vaporiser sur le visage et le cou matin et soir.",
    "rating": 4.9,
    "reviewsCount": 37
  },
  {
    "id": "mg-gelules-collagene",
    "name": "Gélules au collagène",
    "brand": "Maison LaurNex",
    "tagline": "Complément beauté premium pour la peau, les cheveux et les ongles",
    "shortDescription": "Complément alimentaire haute biodisponibilité pour accompagner votre routine beauté.",
    "description": "Complément à base de collagène destiné à accompagner votre routine beauté. Il est présenté comme un complément pour le soin de la peau, des cheveux et des ongles.\n\n• Collagène haute biodisponibilité\n• Soin peau, cheveux et ongles",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 5500,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898576/95d684cc-8367-47dd-87b7-1bf1de469c91_sjzz6o.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 60,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "60 gélules",
    "origin": "Laboratoires certifiés",
    "ingredients": [
      "Hydrolysat de collagène pur",
      "Vitamine C naturelle"
    ],
    "usageAdvice": "Prendre 2 gélules par jour avec un grand verre d’eau.",
    "rating": 4.8,
    "reviewsCount": 31
  },
  {
    "id": "mg-eau-de-rose-1l",
    "name": "Eau de rose 1L",
    "brand": "Maison LaurNex",
    "tagline": "Eau florale délicate et rafraîchissante pour soins quotidiens",
    "shortDescription": "Une eau douce et délicate adaptée aux soins quotidiens. Format généreux 1 Litre.",
    "description": "Une eau douce et délicate adaptée aux soins quotidiens. Elle aide à rafraîchir et à apporter une sensation de douceur à la peau.\n\n• Format généreux 1 Litre\n• Eau florale délicate",
    "category": "✨ Beauté & Soins",
    "categorySlug": "beaute-soins",
    "priceFcfa": 6500,
    "publishDate": "2026-08-28",
    "formattedDate": "28 Août 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898897/WhatsApp_Image_2026-08-16_at_17.47.40_1_y8xpcj.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 44,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1 L",
    "origin": "Kelaat M'Gouna, Maroc",
    "ingredients": [
      "100% Eau florale de Rose distillée"
    ],
    "usageAdvice": "Vaporiser ou appliquer au coton matin et soir sur le visage et le cou.",
    "rating": 4.9,
    "reviewsCount": 38
  },
  {
    "id": "mg-huile-de-pepins-de-r-1971",
    "name": "Huile de pepins de raisin 1L",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398333/WhatsApp_Image_2026-09-03_at_02.16.45_vfhu3h.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398333/WhatsApp_Image_2026-09-03_at_02.16.45_vfhu3h.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-de-ricin-1l-8726",
    "name": "Huile de ricin 1L",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398331/WhatsApp_Image_2026-09-03_at_02.16.45_1_j54vbn.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398331/WhatsApp_Image_2026-09-03_at_02.16.45_1_j54vbn.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-de-moutarde-1l-8992",
    "name": "Huile de moutarde 1L",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398331/WhatsApp_Image_2026-09-03_at_02.16.45_2_dxrarn.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398331/WhatsApp_Image_2026-09-03_at_02.16.45_2_dxrarn.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-de-coco-1l-2031",
    "name": "Huile de coco 1L",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398329/WhatsApp_Image_2026-09-03_at_02.16.45_3_nid4of.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398329/WhatsApp_Image_2026-09-03_at_02.16.45_3_nid4of.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-de-curcuma-1l-8839",
    "name": "Huile de curcuma 1L",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398329/WhatsApp_Image_2026-09-03_at_02.16.46_ourw8h.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398329/WhatsApp_Image_2026-09-03_at_02.16.46_ourw8h.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-de-chancre-ind-0792",
    "name": "Huile de chancre indien",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398324/WhatsApp_Image_2026-09-03_at_02.16.46_2_lfcigp.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398324/WhatsApp_Image_2026-09-03_at_02.16.46_2_lfcigp.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-d-avocat-1582",
    "name": "Huile d'avocat",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398324/WhatsApp_Image_2026-09-03_at_02.16.46_1_oub6ru.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398324/WhatsApp_Image_2026-09-03_at_02.16.46_1_oub6ru.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-de-fenugrec-1l-1492",
    "name": "Huile de fenugrec 1L",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398323/WhatsApp_Image_2026-09-03_at_02.16.46_3_ierabs.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1788398323/WhatsApp_Image_2026-09-03_at_02.16.46_3_ierabs.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "prod-huile-rose-1l",
    "name": "Huiles de rose 1L",
    "brand": "Maroc Glow",
    "tagline": "Élixir floral adoucissant de Kelaat M'gouna",
    "shortDescription": "Une huile douce et délicate, idéale pour les soins quotidiens de la peau. Elle aide à nourrir et à adoucir la peau tout en contribuant à maintenir son confort et sa souplesse.",
    "description": "Une huile douce et délicate, idéale pour les soins quotidiens de la peau. Elle aide à nourrir et à adoucir la peau tout en contribuant à maintenir son confort et sa souplesse.",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 15000,
    "publishDate": "2026-09-02",
    "formattedDate": "02 sept. 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898571/WhatsApp_Image_2026-08-16_at_14.31.30_mfdmpr.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898571/WhatsApp_Image_2026-08-16_at_14.31.30_mfdmpr.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": false,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "1L",
    "origin": "Maroc",
    "ingredients": [
      "Extrait huileux de Rose de Damas",
      "Huile végétale pure"
    ],
    "usageAdvice": "Masser délicatement sur le visage et le décolleté matin et soir.",
    "rating": 4.8,
    "reviewsCount": 28
  },
  {
    "id": "prod-huile-ail-1l",
    "name": "Huile d’ail 1L",
    "brand": "Maroc Glow",
    "tagline": "Soin capillaire fortifiant & assainissant",
    "shortDescription": "L'huile d'ail est un soin naturel reconnu principalement pour stimuler la pousse des cheveux, lutter contre la chute capillaire et assainir la peau.",
    "description": "L'huile d'ail est un soin naturel réputé pour fortifier le cuir chevelu, stimuler la repousse et freiner efficacement la chute des cheveux tout en assainissant l'épiderme.",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 15000,
    "publishDate": "2026-09-02",
    "formattedDate": "02 sept. 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899614/WhatsApp_Image_2026-08-16_at_17.51.03_3_acg4gc.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899614/WhatsApp_Image_2026-08-16_at_17.51.03_3_acg4gc.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "1L",
    "origin": "Maroc",
    "ingredients": [
      "100% Extrait d'ail macéré pur",
      "Huile végétale support"
    ],
    "usageAdvice": "Appliquer en bain d'huile sur le cuir chevelu 1 à 2 fois par semaine avant le shampooing.",
    "rating": 4.8,
    "reviewsCount": 14
  },
  {
    "id": "prod-huile-nigelle-1l",
    "name": "Huile de graines de nigelle 1L",
    "brand": "Maroc Glow",
    "tagline": "Huile pure de cumin noir d'Égypte et du Maroc",
    "shortDescription": "L'huile de graines de nigelle (ou cumin noir) possède de puissantes propriétés anti-inflammatoires, antioxydantes et antibactériennes grâce à sa richesse en thymoquinone.",
    "description": "L'huile de graines de nigelle (ou cumin noir) possède de puissantes propriétés anti-inflammatoires, antioxydantes et antibactériennes grâce à sa richesse en thymoquinone.",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 15000,
    "publishDate": "2026-09-02",
    "formattedDate": "02 sept. 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899614/WhatsApp_Image_2026-08-16_at_17.51.03_4_zcrlda.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899614/WhatsApp_Image_2026-08-16_at_17.51.03_4_zcrlda.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "1L",
    "origin": "Maroc",
    "ingredients": [
      "100% Huile de graines de Nigella Sativa première pression à froid"
    ],
    "usageAdvice": "Soin visage, corps et cheveux. Masser quelques gouttes sur les zones concernées.",
    "rating": 4.8,
    "reviewsCount": 22
  },
  {
    "id": "prod-huile-busserole-1l",
    "name": "Huile Concentrée de Busserole 1L",
    "brand": "Maroc Glow",
    "tagline": "Uniformisant de teint & anti-taches pigmentaires",
    "shortDescription": "Soin concentré à base de busserole, apprécié pour les soins des peaux présentant des irrégularités de pigmentation. Elle aide à unifier l’apparence du teint et à apporter une peau visiblement plus homogène.",
    "description": "Soin concentré à base de busserole, apprécié pour les soins des peaux présentant des irrégularités de pigmentation. Elle aide à unifier l’apparence du teint et à apporter une peau visiblement plus homogène.",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 12500,
    "originalPriceFcfa": 15000,
    "publishDate": "2026-09-02",
    "formattedDate": "02 sept. 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786902020/ChatGPT_Image_Aug_16_2026_06_40_00_PM_v24ith.png",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786902020/ChatGPT_Image_Aug_16_2026_06_40_00_PM_v24ith.png"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "1L",
    "origin": "Maroc",
    "ingredients": [
      "Macérât huileux de feuilles de Busserole (Arctostaphylos uva-ursi)"
    ],
    "usageAdvice": "Appliquer le soir sur une peau propre en ciblant les taches et zones à unifier.",
    "rating": 4.8,
    "reviewsCount": 19
  },
  {
    "id": "prod-huile-coco-250ml",
    "name": "Huile de coco 250ml",
    "brand": "Maroc Glow",
    "tagline": "Nutrition intense peau & fibre capillaire",
    "shortDescription": "Une huile nourrissante et polyvalente, idéale pour prendre soin de la peau et des cheveux. Elle aide à maintenir la peau douce et souple et apporte aux cheveux douceur et brillance.",
    "description": "Une huile nourrissante et polyvalente, idéale pour prendre soin de la peau et des cheveux. Elle aide à maintenir la peau douce et souple et apporte aux cheveux douceur et brillance.",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 2500,
    "originalPriceFcfa": 7000,
    "publishDate": "2026-09-02",
    "formattedDate": "02 sept. 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898571/ChatGPT_Image_Aug_16_2026_02_11_38_PM_tn8wgb.png",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898571/ChatGPT_Image_Aug_16_2026_02_11_38_PM_tn8wgb.png"
    ],
    "stockQuantity": 60,
    "inStock": true,
    "isNew": false,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "250ml",
    "origin": "Maroc",
    "ingredients": [
      "100% Huile de Cocos Nucifera vierge pressée à froid"
    ],
    "usageAdvice": "Faire fondre une noisette au creux des mains et appliquer sur cheveux secs ou humides.",
    "rating": 4.8,
    "reviewsCount": 35
  },
  {
    "id": "prod-huile-jojoba-250ml",
    "name": "Huile de jojoba 250ml",
    "brand": "Maroc Glow",
    "tagline": "Huile équilibrante & séborégulatrice",
    "shortDescription": "Une huile légère et polyvalente, idéale pour nourrir et adoucir la peau sans laisser de sensation trop grasse. Elle convient également aux soins des cheveux pour les garder souples et brillants.",
    "description": "Une huile légère et polyvalente, idéale pour nourrir et adoucir la peau sans laisser de sensation trop grasse. Elle convient également aux soins des cheveux pour les garder souples et brillants.",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 2500,
    "originalPriceFcfa": 7000,
    "publishDate": "2026-09-02",
    "formattedDate": "02 sept. 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898572/ChatGPT_Image_Aug_16_2026_02_09_27_PM_us8gj4.png",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898572/ChatGPT_Image_Aug_16_2026_02_09_27_PM_us8gj4.png"
    ],
    "stockQuantity": 60,
    "inStock": true,
    "isNew": false,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "250ml",
    "origin": "Maroc",
    "ingredients": [
      "100% Cire liquide de Simmondsia Chinensis (Jojoba)"
    ],
    "usageAdvice": "Quelques gouttes sur le visage après le nettoyage pour réguler le sébum et hydrater.",
    "rating": 4.8,
    "reviewsCount": 18
  },
  {
    "id": "prod-huile-curcuma-250ml",
    "name": "Huile de curcuma 250ml",
    "brand": "Maroc Glow",
    "tagline": "Éclat du teint & soin antioxydant",
    "shortDescription": "Une huile végétale idéale pour prendre soin de la peau au quotidien. Elle aide à nourrir, adoucir et apporter un joli éclat à la peau.",
    "description": "Une huile végétale idéale pour prendre soin de la peau au quotidien. Elle aide à nourrir, adoucir et apporter un joli éclat à la peau.",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 2500,
    "originalPriceFcfa": 7000,
    "publishDate": "2026-09-02",
    "formattedDate": "02 sept. 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898574/ChatGPT_Image_Aug_16_2026_02_05_42_PM_np552a.png",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898574/ChatGPT_Image_Aug_16_2026_02_05_42_PM_np552a.png"
    ],
    "stockQuantity": 60,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "250ml",
    "origin": "Maroc",
    "ingredients": [
      "Macérât de racine de Curcuma Longa",
      "Huile végétale pure"
    ],
    "usageAdvice": "Mélanger 2 à 3 gouttes à votre crème de jour ou appliquer le soir pour un teint lumineux.",
    "rating": 4.8,
    "reviewsCount": 16
  },
  {
    "id": "prod-huile-rose-250ml",
    "name": "Huiles de rose 250ml",
    "brand": "Maroc Glow",
    "tagline": "Soin soyeux hydratant & parfumé",
    "shortDescription": "Une huile douce et délicate, idéale pour nourrir, hydrater et adoucir la peau. Elle contribue à laisser la peau souple, lumineuse et agréablement parfumée.",
    "description": "Une huile douce et délicate, idéale pour nourrir, hydrater et adoucir la peau. Elle contribue à laisser la peau souple, lumineuse et agréablement parfumée.",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 2500,
    "originalPriceFcfa": 7000,
    "publishDate": "2026-09-02",
    "formattedDate": "02 sept. 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898573/ChatGPT_Image_16_ao%C3%BBt_2026_13_27_33_g3cg8y.png",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898573/ChatGPT_Image_16_ao%C3%BBt_2026_13_27_33_g3cg8y.png"
    ],
    "stockQuantity": 60,
    "inStock": true,
    "isNew": false,
    "isBestSeller": true,
    "isBio": true,
    "volumeOrWeight": "250ml",
    "origin": "Maroc",
    "ingredients": [
      "Extrait pur de Rose de Damas",
      "Huiles végétales douces"
    ],
    "usageAdvice": "Appliquer sur le corps et le visage après le bain pour une peau douce et satinée.",
    "rating": 4.8,
    "reviewsCount": 42
  },
  {
    "id": "mg-huile-d-argan-60ml-4771",
    "name": "huile d'argan 60ml",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 1300,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898647/df3a71ad-54bf-4c92-b731-34524acfdd30_dw7xa4.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-de-rose-60ml-9650",
    "name": "huile de rose 60ml",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 1300,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898648/e35da625-5082-4195-8563-37a33487de4c_wu2o5o.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-de-collag-ne-6-2033",
    "name": "huile de collagène 60ml",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 1300,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898648/c02170ae-e87a-48ba-a3af-bde2cf46c761_rxmdt4.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-de-ricin-60ml-3293",
    "name": "huile de ricin 60ml",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 1300,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898648/7a7a02c2-acd9-4f46-9b68-759c679b797a_uozxrc.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-souplesse-de-f-1282",
    "name": "huile de fenugrec 60ml",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 1300,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898648/1d59db04-7484-4804-a3c2-4d3412742250_vdljxr.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huiles-souplesse-de--6503",
    "name": "huiles de nigelle 60ml",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 1300,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898651/5cf4cc2f-f7fa-47d3-85a4-1c84f0e94753_mrgsnf.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huiles-souplesse-a-l-0461",
    "name": "huiles a la papaye 60ml",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 1300,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898652/WhatsApp_Image_2026-08-10_at_16.32.34_xjtzsv.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-souplesse-au-n-5292",
    "name": "Huile au Nila bleu 60ml",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 1300,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786900523/WhatsApp_Image_2026-08-16_at_18.14.36_z9hbxt.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-huile-souplesse---la-0070",
    "name": "Huile à la carotte 60ml",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "💧 Huiles",
    "categorySlug": "huiles",
    "priceFcfa": 1300,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786900523/WhatsApp_Image_2026-08-16_at_18.14.36_1_gtc8gp.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-aux-extra-6820",
    "name": "Savon noir aux extraits de rose 5kg",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 8500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788396866/WhatsApp_Image_2026-09-03_at_01.53.24_1_d7tybg.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir---l-aloe--3595",
    "name": "Savon noir à l'aloe vera 5kg",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 8500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788396865/WhatsApp_Image_2026-09-03_at_01.53.24_2_d1nys1.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir---la-caro-7760",
    "name": "Savon noir au curcuma et à la carotte 5kg",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 8500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788396865/WhatsApp_Image_2026-09-03_at_01.53.24_3_ink4wg.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-a-l-akerf-0500",
    "name": "Savon noir a l'akerfassi 5kg",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 8500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788396868/WhatsApp_Image_2026-09-03_at_01.53.24_sdjikp.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-au-nila-b-0116",
    "name": "Savon noir au Nila bleu 5kg",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 8500,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788396865/WhatsApp_Image_2026-09-03_at_01.53.24_4_crggvh.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir---la-caro-6420",
    "name": "Savon noir à la carotte 1kg",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 4000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788396574/WhatsApp_Image_2026-09-03_at_01.48.41_2_svulun.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir---l-aloe--0842",
    "name": "Savon noir à l'aloe vera 1kg",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 4000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788396574/WhatsApp_Image_2026-09-03_at_01.48.41_oeffs7.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir---la-lava-0099",
    "name": "Savon noir à la lavande 1kg",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 4000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788396574/WhatsApp_Image_2026-09-03_at_01.48.41_1_ouvjfn.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-au-miel-1-7595",
    "name": "Savon noir au miel 1kg",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 4000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788396573/WhatsApp_Image_2026-09-03_at_01.48.41_3_yflm3k.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1788396573/WhatsApp_Image_2026-09-03_at_01.48.41_3_yflm3k.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-a-l-akerf-9641",
    "name": "Savon noir a l'akerfassi 1kg",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 4000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898646/ade0e9f3-960a-413a-9419-4832da642690_tecrak.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898646/ade0e9f3-960a-413a-9419-4832da642690_tecrak.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-au-nila-b-0181",
    "name": "Savon noir au Nila bleu 1kg",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 4000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898647/239936ac-e4cb-48b3-b6de-261860492c9e_csdyma.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786898647/239936ac-e4cb-48b3-b6de-261860492c9e_csdyma.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir--7074",
    "name": "Savon noir à l'aker fassi 500g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 2000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899663/WhatsApp_Image_2026-08-16_at_17.51.04_vj81gb.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899663/WhatsApp_Image_2026-08-16_at_17.51.04_vj81gb.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-au-miel-5-7328",
    "name": "Savon noir au miel 500g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 2000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899644/WhatsApp_Image_2026-08-16_at_17.51.03_7_hzm8bw.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899644/WhatsApp_Image_2026-08-16_at_17.51.03_7_hzm8bw.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir---l-aloe--6526",
    "name": "Savon noir à l'aloe vera 500g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 2000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899644/WhatsApp_Image_2026-08-16_at_17.51.03_8_skq2gr.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899644/WhatsApp_Image_2026-08-16_at_17.51.03_8_skq2gr.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-au-nila-b-6531",
    "name": "Savon noir au Nila bleu 500g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 2000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899927/WhatsApp_Image_2026-08-16_at_17.51.05_5_ozf6vr.jpg",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597359-573e87858c28?auto=format&fit=crop&w=800&q=80"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-aux-extra-7485",
    "name": "Savon noir aux extraits d’amandes 500g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 2000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899965/WhatsApp_Image_2026-08-16_at_17.51.05_6_h5upnt.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899965/WhatsApp_Image_2026-08-16_at_17.51.05_6_h5upnt.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-au-citron-5828",
    "name": "Savon noir au citron 500g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 2000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899964/WhatsApp_Image_2026-08-16_at_17.51.05_8_zbrjmb.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899964/WhatsApp_Image_2026-08-16_at_17.51.05_8_zbrjmb.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-au-curcum-8438",
    "name": "Savon noir au curcuma et à la carotte 500g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 2000,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899928/WhatsApp_Image_2026-08-16_at_17.51.05_4_owgbqh.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899928/WhatsApp_Image_2026-08-16_at_17.51.05_4_owgbqh.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-a-l-huile-5788",
    "name": "Savon noir a l'huile d'argan 250g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 1200,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788395600/WhatsApp_Image_2026-09-03_at_01.31.09_e5iapz.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1788395600/WhatsApp_Image_2026-09-03_at_01.31.09_e5iapz.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-aux-extra-7837",
    "name": "Savon noir aux extraits de rose 250g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 1200,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1788395600/WhatsApp_Image_2026-09-03_at_01.31.08_nnk5om.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1788395600/WhatsApp_Image_2026-09-03_at_01.31.08_nnk5om.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-au-citron-9834",
    "name": "Savon noir au citron 250g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 1200,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899928/WhatsApp_Image_2026-08-16_at_17.51.05_3_oemfor.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899928/WhatsApp_Image_2026-08-16_at_17.51.05_3_oemfor.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir---l-huile-0583",
    "name": "Savon noir à l’huile d’olive 250g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 1200,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899929/WhatsApp_Image_2026-08-16_at_17.51.05_2_cpemtm.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899929/WhatsApp_Image_2026-08-16_at_17.51.05_2_cpemtm.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-au-curcum-4294",
    "name": "Savon noir au curcuma 250g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 1200,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-03",
    "formattedDate": "3 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899930/WhatsApp_Image_2026-08-16_at_17.51.05_1_m6rckg.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899930/WhatsApp_Image_2026-08-16_at_17.51.05_1_m6rckg.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir---l-akerf-7264",
    "name": "Savon noir à l’akerfassi 250g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 1200,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-02",
    "formattedDate": "2 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899951/WhatsApp_Image_2026-08-16_at_17.51.05_xmych5.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899951/WhatsApp_Image_2026-08-16_at_17.51.05_xmych5.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-au-curcum-3081",
    "name": "Savon noir au curcuma et à la carotte 250g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 1200,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-02",
    "formattedDate": "2 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899951/WhatsApp_Image_2026-08-16_at_17.51.06_1_lgfpz0.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899951/WhatsApp_Image_2026-08-16_at_17.51.06_1_lgfpz0.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  },
  {
    "id": "mg-savon-noir-au-nila-b-1838",
    "name": "Savon noir au Nila bleu 250g",
    "brand": "MAROC GLOW",
    "tagline": "Produit marocain authentique 100% naturel - Qualité Grossiste",
    "shortDescription": "",
    "description": "",
    "category": "🧼 Savons",
    "categorySlug": "savons",
    "priceFcfa": 1200,
    "originalPriceFcfa": 18000,
    "publishDate": "2026-09-02",
    "formattedDate": "2 septembre 2026",
    "image": "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899960/WhatsApp_Image_2026-08-16_at_17.51.06_dncewx.jpg",
    "gallery": [
      "https://res.cloudinary.com/dq10gftuo/image/upload/v1786899960/WhatsApp_Image_2026-08-16_at_17.51.06_dncewx.jpg"
    ],
    "stockQuantity": 50,
    "inStock": true,
    "isNew": true,
    "isBestSeller": false,
    "isBio": true,
    "volumeOrWeight": "Carton de 12 unités",
    "origin": "Maroc (Agadir / Marrakech)",
    "ingredients": [
      "Ingrédients 100% naturels"
    ],
    "usageAdvice": "Idéal pour revente en salon, spa, parapharmacie ou boutique.",
    "rating": 5,
    "reviewsCount": 1
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'MG-2026-8842',
    customerName: 'Amina Diop',
    phone: '+221 77 452 19 80',
    email: 'amina.diop@gmail.com',
    city: 'Dakar (Almadies)',
    address: 'Résidence Les Palmiers, Villa 14',
    paymentMethod: 'wave',
    paymentMethodLabel: 'Wave Mobile Money',
    shippingOption: 'express',
    shippingCostFcfa: 2000,
    items: [
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[3], quantity: 1 },
      { product: PRODUCTS[5], quantity: 1 }
    ],
    subtotalFcfa: 44500,
    discountFcfa: 2000,
    totalFcfa: 44500,
    status: 'expédiée',
    createdAt: '2026-08-30T10:15:00Z',
    formattedCreatedAt: '30 Août 2026 à 10:15',
    estimatedDelivery: '31 Août 2026 (Aujourd’hui)',
    trackingNumber: 'MG-EXP-77492',
    carrier: 'Express Glow Courier Express',
    timeline: [
      {
        step: 'reçue',
        label: 'Commande reçue',
        description: 'Votre commande #MG-2026-8842 a été enregistrée avec succès dans notre système.',
        date: '30 Août 2026',
        time: '10:15',
        completed: true,
        current: false
      },
      {
        step: 'confirmée',
        label: 'Commande confirmée',
        description: 'Paiement Wave vérifié et validation par le service client.',
        date: '30 Août 2026',
        time: '11:00',
        completed: true,
        current: false
      },
      {
        step: 'préparation',
        label: 'En cours de préparation',
        description: 'Vos cosmétiques naturels ont été emballés avec soin dans notre atelier.',
        date: '30 Août 2026',
        time: '14:30',
        completed: true,
        current: false
      },
      {
        step: 'expédiée',
        label: 'Colis expédié',
        description: 'Le coursier est en route pour la livraison à Dakar (Almadies).',
        date: '31 Août 2026',
        time: '08:45',
        completed: true,
        current: true
      },
      {
        step: 'livrée',
        label: 'Commande livrée',
        description: 'Remise en main propre contre signature ou confirmation.',
        date: '31 Août 2026 (Prévu)',
        time: '15:00',
        completed: false,
        current: false
      }
    ]
  },
  {
    id: 'MG-2026-7910',
    customerName: 'Kouamé Jean-Marc',
    phone: '+225 07 89 22 14 55',
    email: 'jm.kouame@yahoo.fr',
    city: 'Abidjan (Cocody Angré)',
    address: '7e Tranche, Carrefour Duncan',
    paymentMethod: 'cod',
    paymentMethodLabel: 'Paiement à la livraison (Espèces)',
    shippingOption: 'standard',
    shippingCostFcfa: 1500,
    items: [
      { product: PRODUCTS[11], quantity: 1 }
    ],
    subtotalFcfa: 29500,
    discountFcfa: 0,
    totalFcfa: 31000,
    status: 'préparation',
    createdAt: '2026-08-31T03:30:00Z',
    formattedCreatedAt: '31 Août 2026 à 03:30',
    estimatedDelivery: '01 Septembre 2026',
    trackingNumber: 'MG-ABJ-11093',
    carrier: 'Service Livraison Maroc Glow',
    timeline: [
      {
        step: 'reçue',
        label: 'Commande reçue',
        description: 'Commande enregistrée.',
        date: '31 Août 2026',
        time: '03:30',
        completed: true,
        current: false
      },
      {
        step: 'confirmée',
        label: 'Commande confirmée',
        description: 'Numéro de téléphone confirmé via WhatsApp.',
        date: '31 Août 2026',
        time: '04:10',
        completed: true,
        current: false
      },
      {
        step: 'préparation',
        label: 'En cours de préparation',
        description: 'Mise en carton prestige du coffret Hammam Royal.',
        date: '31 Août 2026',
        time: '05:00',
        completed: true,
        current: true
      },
      {
        step: 'expédiée',
        label: 'Colis expédié',
        description: 'Prise en charge par le transporteur régional.',
        completed: false,
        current: false
      },
      {
        step: 'livrée',
        label: 'Commande livrée',
        description: 'Paiement en espèces lors de la réception.',
        completed: false,
        current: false
      }
    ]
  }
];

export function fcfaToEur(amountFcfa: number): number {
  return amountFcfa / EUR_EXCHANGE_RATE;
}

export function formatFcfa(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

export function formatPrice(amountFcfa: number, currency: Currency | string = 'FCFA'): string {
  if (currency === 'EUR') {
    const inEur = fcfaToEur(amountFcfa);
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(inEur);
  }
  return formatFcfa(amountFcfa);
}
