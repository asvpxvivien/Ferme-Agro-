# Guide Complet de Déploiement - Ferme ASSIKO

## 📋 Table des matières
1. [Vue d'ensemble du site](#vue-densemble)
2. [Acheter et configurer le nom de domaine](#nom-de-domaine)
3. [Déploiement sur Vercel](#deploiement-vercel)
4. [Configuration Resend pour les emails](#configuration-resend)
5. [Maintenance et mises à jour](#maintenance)

---

## 🌐 Vue d'ensemble

Votre site Ferme ASSIKO est un site **statique Next.js** qui:
- ✅ **Ne nécessite PAS de base de données**
- ✅ **Ne nécessite PAS de serveur physique**
- ✅ Fonctionne avec React (frontend seulement)
- ✅ Utilise Resend pour envoyer les emails
- ✅ Stocke le panier dans le navigateur du client (localStorage)

**Coût estimé: GRATUIT** (sauf le nom de domaine ~10-15€/an)

---

## 🌍 1. Acheter et configurer le nom de domaine

### Étape 1.1: Acheter fermeassiko.com

**Recommandations de registrars:**
- **Namecheap** (recommandé) - https://www.namecheap.com
- **Google Domains** - https://domains.google
- **OVH** (pour l'Afrique) - https://www.ovh.com/africa

**Prix moyen:** 10-15€ par an

### Étape 1.2: Choisir l'hébergement

**Option recommandée: VERCEL (GRATUIT)**

Pourquoi Vercel?
- ✅ Gratuit pour toujours
- ✅ Hébergement rapide et fiable
- ✅ Déploiement automatique depuis GitHub
- ✅ Support Next.js natif
- ✅ HTTPS automatique
- ✅ Pas de limite de trafic raisonnable

**Alternatives gratuites:**
- Netlify (similaire à Vercel)
- Cloudflare Pages

---

## 🚀 2. Déploiement sur Vercel

### Étape 2.1: Créer un compte GitHub

1. Allez sur https://github.com
2. Créez un compte gratuit
3. Vérifiez votre email

### Étape 2.2: Mettre votre code sur GitHub

**Option A: Via GitHub Desktop (plus simple)**

1. Téléchargez GitHub Desktop: https://desktop.github.com
2. Installez et connectez-vous
3. Cliquez sur "File" → "Add Local Repository"
4. Sélectionnez le dossier `ferme-familiale`
5. Cliquez sur "Create Repository" si demandé
6. Entrez un nom: `ferme-assiko-website`
7. Cliquez sur "Publish repository"
8. Décochez "Keep this code private" (ou laissez coché si vous voulez privé)
9. Cliquez sur "Publish repository"

**Option B: Via ligne de commande**

```bash
cd c:\Users\amagb\Desktop\ferme-familiale

# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Site Ferme ASSIKO"

# Créer un repo sur GitHub via le site web, puis:
git remote add origin https://github.com/VOTRE_USERNAME/ferme-assiko-website.git
git branch -M main
git push -u origin main
```

### Étape 2.3: Déployer sur Vercel

1. **Créer un compte Vercel**
   - Allez sur https://vercel.com
   - Cliquez sur "Sign Up"
   - Choisissez "Continue with GitHub"
   - Autorisez Vercel à accéder à GitHub

2. **Importer le projet**
   - Cliquez sur "Add New..." → "Project"
   - Sélectionnez votre repository `ferme-assiko-website`
   - Cliquez sur "Import"

3. **Configurer le projet**
   - **Framework Preset:** Next.js (détecté automatiquement)
   - **Root Directory:** ./
   - **Build Command:** `pnpm build` (ou laissez par défaut)
   - **Output Directory:** .next (par défaut)

4. **Ajouter les variables d'environnement**

   Dans la section "Environment Variables", ajoutez:

   ```
   RESEND_API_KEY=re_aK7ENRo5_2bKwHxLujYVwUgo8K6KtEzYQ
   ADMIN_EMAIL=fermeassiko@gmail.com
   FROM_EMAIL=onboarding@resend.dev
   NEXT_PUBLIC_SITE_URL=https://fermeassiko.com
   ```

5. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes
   - Vous obtiendrez une URL temporaire: `https://ferme-assiko-website.vercel.app`

### Étape 2.4: Connecter votre nom de domaine

1. Dans Vercel, allez dans votre projet
2. Cliquez sur "Settings" → "Domains"
3. Entrez votre domaine: `fermeassiko.com`
4. Cliquez sur "Add"

5. **Configurer les DNS chez votre registrar:**

   Vercel vous donnera des instructions. Généralement:

   **Type A Record:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: Automatic
   ```

   **Type CNAME Record:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```

6. **Attendre la propagation DNS (24-48h max)**
   - Vérifiez sur https://dnschecker.org

### Étape 2.5: Masquer l'URL Vercel (Important!)

**Problème:** Par défaut, votre site aura 2 URLs:
- `https://fermeassiko.com` ✅ (votre domaine)
- `https://ferme-assiko-website.vercel.app` ❌ (URL Vercel)

**Solution: Désactiver l'URL Vercel**

1. Dans Vercel, allez dans **Settings** → **Domains**
2. Trouvez `ferme-assiko-website.vercel.app`
3. Cliquez sur les 3 points **···** à côté
4. Sélectionnez **"Remove"**

**Alternative: Redirection automatique**

Si vous préférez garder l'URL Vercel (pour tester):

1. Dans **Settings** → **Domains**
2. À côté de `fermeassiko.com`, cliquez sur le menu
3. Sélectionnez **"Set as Primary Domain"**
4. Maintenant, toute visite sur `.vercel.app` redirige vers `fermeassiko.com`

**Résultat:** Seul `fermeassiko.com` sera visible pour vos clients! ✅

---

## 📧 3. Configuration Resend pour les emails

### Étape 3.1: Configuration actuelle (domaine de test)

**État actuel:**
- ✅ Vous utilisez `onboarding@resend.dev` (domaine de test Resend)
- ✅ L'admin (vous) reçoit tous les emails sur `fermeassiko@gmail.com`
- ❌ Les clients NE reçoivent PAS d'emails de confirmation
- ❌ Limitation: Vous ne pouvez envoyer qu'à `fermeassiko@gmail.com`

**Pourquoi?**
Le domaine de test de Resend ne peut envoyer des emails qu'à l'adresse email utilisée pour créer le compte Resend (la vôtre).

### Étape 3.2: Configuration avec domaine personnalisé

Pour que les clients reçoivent des emails, vous devez configurer votre propre domaine.

#### 1. Acheter fermeassiko.com (voir section 1)

#### 2. Ajouter le domaine dans Resend

1. Connectez-vous à https://resend.com
2. Allez dans "Domains"
3. Cliquez sur "Add Domain"
4. Entrez: `fermeassiko.com`
5. Cliquez sur "Add"

#### 3. Configurer les DNS

Resend vous donnera des enregistrements DNS à ajouter. Allez chez votre registrar (Namecheap, etc.) et ajoutez:

**Enregistrements TXT (pour vérification):**
```
Type: TXT
Name: _resend
Value: [valeur fournie par Resend]
TTL: Automatic
```

**Enregistrements MX (pour recevoir les emails):**
```
Type: MX
Name: @
Priority: 10
Value: mx1.resend.com
TTL: Automatic

Type: MX
Name: @
Priority: 20
Value: mx2.resend.com
TTL: Automatic
```

**Enregistrements SPF/DKIM (pour l'authentification):**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
TTL: Automatic

Type: TXT
Name: resend._domainkey
Value: [valeur DKIM fournie par Resend]
TTL: Automatic
```

**Enregistrement DMARC (optionnel mais recommandé):**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:fermeassiko@gmail.com
TTL: Automatic
```

#### 4. Vérifier le domaine

1. Retournez sur Resend
2. Cliquez sur "Verify" à côté de votre domaine
3. Attendez quelques minutes (jusqu'à 24h)
4. Le statut passera de "Pending" à "Verified" ✅

#### 5. Mettre à jour les variables d'environnement

Dans Vercel, mettez à jour:

```env
FROM_EMAIL=contact@fermeassiko.com
```

Puis redéployez (Vercel le fait automatiquement).

### Étape 3.3: Structure des emails

**Ce qui se passe quand un client commande:**

1. **Email à l'admin (vous):**
   - De: `contact@fermeassiko.com`
   - À: `fermeassiko@gmail.com`
   - Sujet: `🛒 Nouvelle commande #CMD12345 - Nom Client`
   - Contenu: Détails complets de la commande

2. **Email au client:**
   - De: `contact@fermeassiko.com`
   - À: `email.client@exemple.com`
   - Sujet: `✅ Commande confirmée #CMD12345 - Ferme ASSIKO`
   - Contenu: Confirmation avec résumé

### Étape 3.4: Gérer les réponses des clients

**Option 1: Email direct (recommandé)**

Les clients peuvent vous répondre directement à `fermeassiko@gmail.com`. Vous recevrez leurs emails dans Gmail normalement.

**Option 2: Configurer une redirection**

Si vous voulez que `contact@fermeassiko.com` redirige vers `fermeassiko@gmail.com`:

1. Dans Resend, allez dans "Settings" → "Email Forwarding"
2. Ajoutez une règle:
   - De: `contact@fermeassiko.com`
   - Vers: `fermeassiko@gmail.com`

**Option 3: Configurer Gmail pour envoyer depuis fermeassiko.com**

1. Dans Gmail, cliquez sur l'engrenage ⚙️ → "Voir tous les paramètres"
2. Allez dans "Comptes et importation"
3. Dans "Envoyer des e-mails en tant que", cliquez sur "Ajouter une autre adresse e-mail"
4. Entrez:
   - Nom: `Ferme ASSIKO`
   - Email: `contact@fermeassiko.com`
5. Suivez les instructions de vérification
6. Vous pourrez maintenant envoyer des emails depuis Gmail avec l'adresse `contact@fermeassiko.com`

---

## 🔄 4. Maintenance et mises à jour

### 4.1: Faire des modifications au site

**Méthode simple (avec GitHub Desktop):**

1. Modifiez vos fichiers localement (VSCode, etc.)
2. Ouvrez GitHub Desktop
3. Vous verrez les fichiers modifiés
4. Entrez un message de commit (ex: "Ajout de nouveaux produits")
5. Cliquez sur "Commit to main"
6. Cliquez sur "Push origin"
7. **Vercel déploie automatiquement** en 2-3 minutes! 🚀

### 4.2: Ajouter de nouveaux produits

Éditez le fichier: `lib/products-data.ts`

```typescript
{
  id: "nouveau-produit",
  name: "Nouveau Produit",
  description: "Description du produit",
  price: 2500,
  category: "Légumes",
  unit: "kg",
  image: "/Photo de la ferme/nouveau-produit.jpg",
  inStock: true,
  featured: true
}
```

N'oubliez pas d'ajouter la photo dans le dossier `public/Photo de la ferme/`

### 4.3: Modifier les prix

Éditez `lib/products-data.ts` et changez le champ `price`

### 4.4: Changer les informations de contact

Éditez les fichiers:
- `components/header.tsx`
- `components/footer.tsx`
- `app/contact/page.tsx`

### 4.5: Monitorer les commandes

Vous recevez tous les emails de commande sur `fermeassiko@gmail.com`. Je recommande de:

1. **Créer un label Gmail "Commandes"**
2. **Créer un filtre pour auto-labelliser:**
   - De: `contact@fermeassiko.com`
   - Contient: "Nouvelle commande"
   - → Appliquer le label "Commandes"

### 4.6: Sauvegardes

**Automatique avec GitHub:**
- Tout votre code est sauvegardé sur GitHub
- Historique complet des modifications
- Vous pouvez revenir en arrière à tout moment

**Sauvegardes locales:**
- Gardez une copie du dossier sur un disque externe
- Ou sur Google Drive / OneDrive

---

## 📊 5. Statistiques et analytics (optionnel)

### Option 1: Vercel Analytics (gratuit)

1. Dans Vercel, allez dans votre projet
2. Cliquez sur "Analytics"
3. Activez "Enable Analytics"
4. Vous verrez:
   - Nombre de visiteurs
   - Pages les plus visitées
   - Performance du site

### Option 2: Google Analytics (gratuit)

1. Créez un compte: https://analytics.google.com
2. Créez une propriété pour `fermeassiko.com`
3. Obtenez votre ID de suivi (G-XXXXXXXXXX)
4. Ajoutez dans `app/layout.tsx`:

```tsx
import Script from 'next/script'

// Dans le <head>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

---

## 💰 6. Résumé des coûts

| Service | Coût | Fréquence |
|---------|------|-----------|
| **Nom de domaine** | 10-15€ | /an |
| **Hébergement Vercel** | 0€ | Gratuit |
| **Resend (emails)** | 0€ | Gratuit jusqu'à 3000 emails/mois |
| **GitHub** | 0€ | Gratuit |
| **TOTAL** | **10-15€** | **/an** |

---

## 🆘 7. Support et dépannage

### Problème: Le site ne se déploie pas

1. Vérifiez les logs dans Vercel
2. Assurez-vous que toutes les dépendances sont dans `package.json`
3. Vérifiez que `pnpm-lock.yaml` est bien présent

### Problème: Les emails ne partent pas

1. Vérifiez que `RESEND_API_KEY` est bien dans Vercel
2. Vérifiez les logs de Resend: https://resend.com/logs
3. Vérifiez que votre domaine est vérifié (✅ Verified)

### Problème: Le domaine ne fonctionne pas

1. Vérifiez la propagation DNS: https://dnschecker.org
2. Attendez 24-48h
3. Vérifiez que les enregistrements sont corrects

### Problème: Images ne s'affichent pas

1. Vérifiez que les images sont dans `public/Photo de la ferme/`
2. Vérifiez les chemins dans `products-data.ts`
3. Redéployez le site

---

## 📞 Contacts utiles

- **Vercel Support:** https://vercel.com/support
- **Resend Support:** support@resend.com
- **GitHub Help:** https://support.github.com

---

## ✅ Checklist finale avant mise en ligne

- [ ] Acheter le domaine `fermeassiko.com`
- [ ] Créer compte GitHub
- [ ] Pousser le code sur GitHub
- [ ] Créer compte Vercel
- [ ] Déployer le site sur Vercel
- [ ] Connecter le domaine à Vercel
- [ ] Ajouter le domaine dans Resend
- [ ] Configurer les DNS pour Resend
- [ ] Vérifier le domaine dans Resend
- [ ] Mettre à jour `FROM_EMAIL` dans Vercel
- [ ] Tester une commande complète
- [ ] Vérifier réception des emails admin
- [ ] Vérifier réception des emails clients
- [ ] Configurer Google Analytics (optionnel)
- [ ] Créer label Gmail "Commandes"
- [ ] Sauvegarder le code localement

---

## 🎉 Félicitations!

Votre site Ferme ASSIKO est maintenant en ligne et fonctionnel!

**Prochaines étapes suggérées:**
1. Partager le lien sur les réseaux sociaux
2. Créer une page Facebook/Instagram pour la ferme
3. Ajouter un système de paiement mobile money (phase 2)
4. Créer un blog pour partager des conseils agricoles
5. Ajouter des témoignages clients

Bon courage avec votre ferme! 🌱🐔🥬
