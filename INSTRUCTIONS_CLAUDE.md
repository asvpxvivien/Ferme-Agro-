# 🌿 AgroFresh - Spécifications Complètes du Projet

## 📌 Contexte du Projet

**Client** : Ferme agricole familiale au Bénin  
**Produits** : Légumes bio 100% naturels, poulets, lapins, œufs  
**Objectif** : Site e-commerce simple avec système de commande et livraison à domicile  
**Monnaie** : FCFA (remplacer tous les EUR/€ par FCFA)  
**Localisation** : Bénin, Afrique de l'Ouest

---

## 🎯 Objectifs Principaux

### Problèmes à Résoudre
1. ❌ Site actuel non responsive
2. ❌ Design trop large, prend tout l'écran
3. ❌ Header non professionnel
4. ❌ Photos générées par IA (manque d'authenticité)
5. ❌ Pas d'animations fluides
6. ❌ Mauvaise expérience utilisateur

### Solutions Attendues
1. ✅ Design 100% responsive (mobile-first)
2. ✅ Largeur maximale contrôlée (max-width: 1400px)
3. ✅ Header moderne et professionnel
4. ✅ Intégration des vraies photos de la ferme (dossier `public/photo de la ferme/`)
5. ✅ Animations fluides et modernes
6. ✅ UX/UI exceptionnelle
7. ✅ Performance optimale (site rapide)

---

## 🎨 Design & Identité Visuelle

### Palette de Couleurs
```css
Principale: 
- Vert nature: #22c55e (primary)
- Vert foncé: #16a34a (hover)
- Vert très foncé: #15803d (dark mode)

Secondaires:
- Beige naturel: #f5f5dc
- Crème: #fefce8
- Terre: #92400e

Neutres:
- Blanc: #ffffff
- Gris clair: #f3f4f6
- Gris moyen: #6b7280
- Noir: #1f2937
```

### Typographie
```css
Police principale: 'Inter', 'Segoe UI', sans-serif
Titres: font-weight: 700
Texte normal: font-weight: 400
Tailles:
- Hero: 3rem (mobile: 2rem)
- H1: 2.5rem (mobile: 1.75rem)
- H2: 2rem (mobile: 1.5rem)
- H3: 1.5rem (mobile: 1.25rem)
- Body: 1rem
- Small: 0.875rem
```

### Animations à Implémenter
1. **Fade-in au scroll** : Éléments apparaissent progressivement
2. **Hover effects** : Cartes produits se soulèvent légèrement
3. **Carrousel smooth** : Transition fluide entre images
4. **Loading states** : Skeleton loaders pour les images
5. **Micro-interactions** : Boutons avec feedback visuel
6. **Page transitions** : Smooth scroll entre sections

---

## 📐 Structure du Site

### Pages Principales

#### 1. **Page d'Accueil** (`/` ou `/accueil`)
```
- Header fixe avec navigation
- Hero Section avec carrousel
- Section "Notre Ferme" (À propos)
- Produits Vedettes (3-4 produits)
- Section Valeurs (Bio, Naturel, Local)
- Témoignages clients
- Contact/Localisation
- Footer
```

#### 2. **Page Catalogue** (`/catalogue`)
```
- Filtres par catégorie (Tous, Volailles, Œufs, Légumes, Fruits)
- Grille de produits responsive
- Recherche en temps réel
- Tri (prix, nom, catégorie)
- Ajout au panier direct
```

#### 3. **Page Panier/Commande** (`/panier`)
```
- Liste des articles
- Quantités modifiables
- Calcul automatique du total
- Frais de livraison
- Formulaire de commande
- Confirmation
```

#### 4. **Page Contact** (`/contact`)
```
- Formulaire de contact
- Informations de la ferme
- Carte de localisation (si possible)
- Réseaux sociaux
```

---

## 🛠️ Composants Détaillés

### Header (Navigation)
```jsx
Structure:
- Logo AgroFresh (gauche)
- Menu navigation (centre/droite)
  * Accueil
  * Notre Ferme
  * Nos Produits
  * Catalogue
  * Contact
- Icône panier avec badge (droite)
- Menu burger (mobile)

Comportements:
- Sticky/fixed au scroll
- Background transparent au top, blanc au scroll
- Ombre légère après scroll
- Menu mobile: slide depuis la droite
- Animation smooth pour toutes les transitions
```

### Hero Section (Carrousel)
```jsx
Fonctionnalités:
- Auto-play (5 secondes par slide)
- Navigation manuelle (flèches + dots)
- Pause au hover
- Images optimisées (lazy loading)
- Overlay gradient pour lisibilité du texte

Contenu:
Slide 1: "Bienvenue chez AgroFresh"
- Titre principal
- Sous-titre: "Du Champ à Votre Table"
- CTA: "Découvrir nos produits"

Slide 2: "100% Bio et Naturel"
- Image de la ferme
- Message sur l'agriculture biologique

Slide 3: "Livraison à Domicile"
- Service de livraison
- Zone de couverture
```

### Cartes Produits
```jsx
Design:
- Image en haut (ratio 4:3)
- Badge catégorie (coin supérieur droit)
- Nom du produit
- Description courte (2 lignes max)
- Prix en FCFA (gros et visible)
- Unité (kg, pièce, boîte, etc.)
- Bouton "Ajouter au panier"

Animations:
- Hover: élévation (translateY: -8px)
- Hover: ombre plus prononcée
- Image: zoom léger (scale: 1.05)
- Bouton: changement de couleur smooth
```

### Formulaire de Commande
```jsx
Champs requis:
1. Informations personnelles:
   - Nom complet*
   - Numéro de téléphone*
   - Email (optionnel)

2. Adresse de livraison:
   - Ville/Commune*
   - Quartier*
   - Adresse détaillée*
   - Point de repère (optionnel)

3. Détails de commande:
   - Récapitulatif des articles
   - Date de livraison souhaitée
   - Heure préférée (Matin/Après-midi/Soir)

4. Mode de paiement:
   - Paiement à la livraison (par défaut)
   - Instructions spéciales (textarea)

Validation:
- Vérification en temps réel
- Messages d'erreur clairs
- Empêcher la soumission si incomplet
```

---

## 💾 Données Produits

### Liste Complète des Produits

```javascript
const PRODUCTS = [
  {
    id: 1,
    name: "Poulet Fermier",
    category: "Volailles",
    price: 8000, // FCFA
    unit: "kg",
    image: "/photo de la ferme/poulet.jpg",
    description: "Poulet élevé en plein air, nourri aux grains naturels, sans antibiotiques",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Œufs Frais Bio",
    category: "Œufs",
    price: 3000,
    unit: "boîte de 6",
    image: "/photo de la ferme/oeufs.jpg",
    description: "Œufs de poules élevées en liberté, ramassés quotidiennement",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Lapin Entier",
    category: "Volailles",
    price: 10000,
    unit: "kg",
    image: "/photo de la ferme/lapin.jpg",
    description: "Lapin fermier élevé naturellement, viande tendre et savoureuse",
    inStock: true,
    featured: false
  },
  {
    id: 4,
    name: "Salade Verte Bio",
    category: "Légumes",
    price: 1500,
    unit: "pièce",
    image: "/photo de la ferme/salade.jpg",
    description: "Salade fraîche du jour, cultivée sans pesticides",
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "Tomates Anciennes",
    category: "Légumes",
    price: 3000,
    unit: "kg",
    image: "/photo de la ferme/tomates.jpg",
    description: "Variétés anciennes de tomates, goût authentique",
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Pommes du Verger",
    category: "Fruits",
    price: 2500,
    unit: "kg",
    image: "/photo de la ferme/pommes.jpg",
    description: "Pommes croquantes et juteuses, cueillies à maturité",
    inStock: true,
    featured: false
  },
  {
    id: 7,
    name: "Carottes Bio",
    category: "Légumes",
    price: 2000,
    unit: "kg",
    image: "/photo de la ferme/carottes.jpg",
    description: "Carottes fraîches et sucrées, cultivées naturellement",
    inStock: true,
    featured: false
  },
  {
    id: 8,
    name: "Fraises de Saison",
    category: "Fruits",
    price: 4500,
    unit: "barquette 500g",
    image: "/photo de la ferme/fraises.jpg",
    description: "Fraises parfumées et sucrées, cultivées avec amour",
    inStock: true,
    featured: true
  },
  {
    id: 9,
    name: "Courgettes",
    category: "Légumes",
    price: 1800,
    unit: "kg",
    image: "/photo de la ferme/courgettes.jpg",
    description: "Courgettes tendres et savoureuses du potager",
    inStock: true,
    featured: false
  },
  {
    id: 10,
    name: "Poires Williams",
    category: "Fruits",
    price: 3500,
    unit: "kg",
    image: "/photo de la ferme/poires.jpg",
    description: "Poires juteuses et fondantes, récoltées à point",
    inStock: true,
    featured: false
  },
  {
    id: 11,
    name: "Œufs de Caille",
    category: "Œufs",
    price: 3800,
    unit: "boîte de 12",
    image: "/photo de la ferme/oeufs-caille.jpg",
    description: "Œufs de caille délicats, parfaits pour vos apéritifs",
    inStock: true,
    featured: false
  },
  {
    id: 12,
    name: "Canard Fermier",
    category: "Volailles",
    price: 12000,
    unit: "kg",
    image: "/photo de la ferme/canard.jpg",
    description: "Canard élevé en plein air, viande savoureuse et tendre",
    inStock: true,
    featured: false
  }
];
```

### Catégories
```javascript
const CATEGORIES = [
  { id: 'all', name: 'Tous', icon: '🌿' },
  { id: 'Volailles', name: 'Volailles', icon: '🐔' },
  { id: 'Œufs', name: 'Œufs', icon: '🥚' },
  { id: 'Légumes', name: 'Légumes', icon: '🥬' },
  { id: 'Fruits', name: 'Fruits', icon: '🍎' }
];
```

---

## 🚚 Système de Livraison

### Frais de Livraison (Bénin)
```javascript
const DELIVERY_FEES = {
  cotonou: {
    name: "Cotonou",
    fee: 1000, // FCFA
    zones: ["Centre", "Nord", "Sud", "Est", "Ouest"]
  },
  porto_novo: {
    name: "Porto-Novo",
    fee: 1500,
    zones: ["Centre-ville", "Périphérie"]
  },
  calavi: {
    name: "Calavi",
    fee: 1200,
    zones: ["Akassato", "Kpota", "Godomey"]
  },
  abomey_calavi: {
    name: "Abomey-Calavi",
    fee: 1200,
    zones: []
  },
  other: {
    name: "Autres zones",
    fee: 2000,
    note: "À préciser lors de la commande"
  }
};

// Livraison gratuite à partir de
const FREE_DELIVERY_THRESHOLD = 25000; // FCFA
```

### Horaires de Livraison
```javascript
const DELIVERY_SLOTS = [
  { id: 'morning', label: 'Matin (8h-12h)', available: true },
  { id: 'afternoon', label: 'Après-midi (14h-18h)', available: true },
  { id: 'evening', label: 'Soir (18h-20h)', available: false } // Non disponible
];
```

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile first approach */
mobile: 0-640px (base styles)
tablet: 641-1024px
desktop: 1025-1400px
large: 1401px+

/* Media queries */
@media (min-width: 640px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1400px) { /* Large screens */ }
```

### Comportements Spécifiques

#### Mobile (< 640px)
- Menu burger obligatoire
- Carrousel hero: 1 slide visible
- Produits: 1 colonne
- Textes réduits (titres plus petits)
- Boutons pleine largeur
- Footer: sections empilées

#### Tablet (641-1024px)
- Menu burger optionnel
- Carrousel hero: plus grand
- Produits: 2 colonnes
- Sidebar navigation possible

#### Desktop (> 1024px)
- Menu horizontal complet
- Carrousel hero: pleine largeur
- Produits: 3-4 colonnes
- Hover effects activés
- Sidebar + contenu principal

---

## ⚡ Performance & Optimisation

### Images
```javascript
Optimisations requises:
1. Formats modernes: WebP avec fallback
2. Lazy loading: images chargées au scroll
3. Tailles responsive: srcset pour différentes résolutions
4. Compression: qualité 80-85%
5. Dimensions optimales:
   - Hero: 1920x1080px
   - Produits: 800x800px
   - Thumbnails: 400x400px
6. Placeholder: blur-up effect pendant chargement
```

### Code
```javascript
Optimisations:
1. Code splitting: lazy load des pages
2. Minification CSS/JS
3. Tree shaking: supprimer code inutilisé
4. Memoization: React.memo pour composants statiques
5. Debounce: recherche et filtres
6. LocalStorage: panier persistant
```

### Chargement
```javascript
Objectifs:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90/100
```

---

## 🔧 Stack Technique Recommandée

### Frontend
```
Framework: React 18+
Build: Vite ou Create React App
Styling: Tailwind CSS + CSS Modules
Icons: Lucide React
Animations: Framer Motion
Forms: React Hook Form
State: React Context API ou Zustand
Routing: React Router v6
```

### Librairies Utiles
```javascript
- react-intersection-observer: animations au scroll
- react-hot-toast: notifications
- date-fns: manipulation de dates
- clsx: conditional classes
- react-responsive: breakpoints
```

---

## 📋 Fonctionnalités Détaillées

### 1. Panier d'Achat
```javascript
Fonctionnalités:
✅ Ajouter produit
✅ Modifier quantité (+/-)
✅ Supprimer produit
✅ Vider le panier
✅ Calculer total automatiquement
✅ Persister dans localStorage
✅ Badge avec nombre d'articles
✅ Animation d'ajout au panier
✅ Afficher frais de livraison
✅ Calcul livraison gratuite

État du panier:
{
  items: [
    {
      productId: 1,
      name: "Poulet Fermier",
      price: 8000,
      quantity: 2,
      unit: "kg",
      image: "/path/to/image.jpg"
    }
  ],
  total: 16000,
  deliveryFee: 1000,
  finalTotal: 17000
}
```

### 2. Filtrage et Recherche
```javascript
Filtres:
- Par catégorie (boutons toggle)
- Par disponibilité (en stock uniquement)
- Par prix (tri croissant/décroissant)

Recherche:
- Temps réel (debounced à 300ms)
- Recherche dans: nom, description, catégorie
- Résultats instantanés
- Message si aucun résultat
```

### 3. Formulaire de Commande
```javascript
Étapes:
1. Vérification du panier (non vide)
2. Informations client
3. Adresse de livraison
4. Choix date/heure
5. Récapitulatif
6. Confirmation

Validation:
- Téléphone: format béninois (+229 XX XX XX XX)
- Email: format valide (optionnel)
- Adresse: tous les champs requis
- Date: minimum J+1

Soumission:
- Envoi par email ou WhatsApp
- Message de confirmation
- Vider le panier après envoi
- Numéro de commande généré
```

### 4. Section Témoignages
```javascript
const TESTIMONIALS = [
  {
    id: 1,
    name: "Adjoua K.",
    location: "Cotonou",
    rating: 5,
    comment: "Produits frais et de qualité exceptionnelle ! Livraison rapide et poulet délicieux.",
    date: "Il y a 2 semaines"
  },
  {
    id: 2,
    name: "Serge M.",
    location: "Calavi",
    rating: 5,
    comment: "Enfin des légumes vraiment bio ! On sent la différence. Je recommande à 100%.",
    date: "Il y a 1 mois"
  },
  {
    id: 3,
    name: "Mariam T.",
    location: "Porto-Novo",
    rating: 5,
    comment: "Service impeccable, produits frais et équipe très professionnelle. Merci AgroFresh !",
    date: "Il y a 3 semaines"
  }
];

Affichage:
- Carrousel sur mobile
- Grille 3 colonnes sur desktop
- Étoiles de notation
- Photo de profil (initiales)
```

---

## 📞 Informations de Contact

### Coordonnées
```javascript
const CONTACT_INFO = {
  phone: {
    primary: "+229 XX XX XX XX", // À remplacer
    secondary: "+229 XX XX XX XX",
    whatsapp: "+229 XX XX XX XX"
  },
  email: "contact@agrofresh.bj",
  address: {
    street: "123 Chemin de la Ferme",
    city: "75000 Paris", // À remplacer par ville au Bénin
    country: "Bénin"
  },
  social: {
    facebook: "https://facebook.com/agrofresh",
    instagram: "https://instagram.com/agrofresh"
  },
  hours: {
    weekdays: "Lun - Sam : 8h - 19h",
    sunday: "Dimanche : 8h - 13h"
  }
};
```

---

## 🎨 Sections Supplémentaires

### Section "Nos Valeurs"
```jsx
Icônes et textes:

1. 🌿 100% Bio
   "Cultivés sans pesticides ni produits chimiques"

2. 🏆 Qualité Premium
   "Produits sélectionnés avec soin pour votre satisfaction"

3. 🚚 Livraison Rapide
   "Chez vous en 24-48h, frais garantis"

4. ❤️ Passion & Tradition
   "Ferme familiale depuis 1998"
```

### Section "Notre Histoire"
```markdown
# Une Ferme Familiale Depuis 1998

Située au cœur du Bénin, AgroFresh est une ferme familiale passionnée par l'agriculture biologique et respectueuse de l'environnement.

Depuis plus de 25 ans, nous cultivons avec amour des légumes sains et élevons nos animaux en plein air, dans le respect de leur bien-être.

Notre mission : vous apporter le meilleur de la nature, directement du champ à votre table.

**Nos engagements:**
- Agriculture 100% biologique
- Engrais naturels uniquement
- Bien-être animal
- Circuit court
- Qualité garantie
```

---

## 📐 Layout Détaillé

### Container Principal
```jsx
<div className="min-h-screen flex flex-col">
  {/* Header fixe */}
  <Header />
  
  {/* Contenu principal */}
  <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Contenu des pages */}
  </main>
  
  {/* Footer */}
  <Footer />
</div>
```

### Grille Produits
```jsx
// Mobile: 1 colonne
// Tablet: 2 colonnes
// Desktop: 3 colonnes
// Large: 4 colonnes

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

---

## 🔐 Sécurité & Bonnes Pratiques

### Validation des Données
```javascript
- Sanitize tous les inputs utilisateur
- Validation côté client ET serveur
- Protection contre XSS
- Limiter taille des uploads
- Rate limiting sur formulaires
```

### Accessibilité (a11y)
```javascript
- Textes alternatifs pour toutes les images
- Navigation au clavier
- Contraste suffisant (WCAG AA)
- ARIA labels appropriés
- Focus visible sur éléments interactifs
- Taille minimale des boutons: 44x44px
```

---

## 📊 Analytics & Suivi

### Événements à Tracker
```javascript
- Page views
- Ajout au panier
- Suppression du panier
- Validation commande
- Clics sur catégories
- Recherches populaires
- Temps passé sur site
- Taux de conversion
```

---

## 🚀 Déploiement

### Checklist Avant Mise en Ligne
```markdown
- [ ] Remplacer toutes les images IA par vraies photos
- [ ] Vérifier tous les prix en FCFA
- [ ] Tester responsive sur tous devices
- [ ] Optimiser toutes les images
- [ ] Vérifier performances (Lighthouse)
- [ ] Tester formulaire de commande
- [ ] Vérifier liens et navigation
- [ ] Tester panier (ajout/suppression)
- [ ] Vérifier calcul livraison
- [ ] Tester sur différents navigateurs
- [ ] Ajouter vraies coordonnées de contact
- [ ] Configurer emails de confirmation
- [ ] Tester WhatsApp integration
```

---

## 📝 Notes Importantes

### Pour Claude Code
```
1. **Priorité absolue**: RESPONSIVE DESIGN
   - Commencer mobile-first
   - Tester à chaque breakpoint

2. **Animations**: Utiliser des transitions CSS simples d'abord
   - Éviter trop d'animations complexes
   - Performance > Effet wahou

3. **Images**: Chemins d'accès à respecter
   - Source: /photo de la ferme/
   - Ne PAS créer de nouvelles images
   - Utiliser les vraies photos fournies

4. **Monnaie**: FCFA partout
   - Aucun EUR ou € dans le code
   - Format: "8 000 FCFA" avec espace

5. **Performance**:
   - Lazy loading obligatoire
   - Optimiser le bundle
   - Minimiser les re-renders

6. **Code Quality**:
   - Commentaires en français
   - Noms de variables explicites
   - Composants réutilisables
   - Pas de code dupliqué
```

### Ordre d'Implémentation Suggéré
```
Phase 1: Structure de base
1. Setup projet (React + Tailwind)
2. Header + Navigation
3. Footer
4. Routing

Phase 2: Pages principales
5. Page d'accueil (sans carrousel)
6. Catalogue avec filtres
7. Cartes produits

Phase 3: Fonctionnalités
8. Système de panier
9. Formulaire de commande
10. Gestion du state

Phase 4: Polish
11. Carrousel hero
12. Animations
13. Responsive final
14. Optimisations performance

Phase 5: Finitions
15. Vraies photos
16. Contenus réels
17. Tests complets
18. Déploiement
```

---

## 🎯 Critères de Succès

### Site Validé Si:
```
✅ 100% responsive (mobile/tablet/desktop)
✅ Largeur max 1400px respectée
✅ Header professionnel et fonctionnel
✅ Toutes les vraies photos intégrées
✅ Animations fluides sans lag
✅ Panier fonctionnel complet
✅ Formulaire commande opérationnel
✅ Temps de chargement < 3s
✅ Aucune erreur console
✅ Navigation intuitive
✅ Design moderne et propre
✅ Expérience utilisateur excellente
```

---

## 💡 Inspirations Design

### Sites de Référence (Style)
- Fermes bio modernes
- E-commerce minimaliste
- Landing pages avec animations fluides
- Sites avec belle photographie

### Mood Board
```
Style: Naturel, chaleureux, authentique, moderne
Couleurs: Vert nature, beige, blanc, terre
Ambiance: Confiance, qualité, proximité, fraîcheur
Typographie: Claire, lisible, professionnelle
Images: Vraies photos de la ferme, lumière naturelle
```

---

## 📞 Support & Questions

Pour toute question pendant le développement:
- Privilégier les solutions simples et robustes
- Tester régulièrement sur mobile
- Demander validation avant choix techniques majeurs
- Documenter les décisions importantes

---

**Version**: 1.0  
**Date**: Novembre 2024  
**Projet**: AgroFresh - Site Ferme Bio Bénin  
**Pour**: Claude Code