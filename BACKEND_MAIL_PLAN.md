# Plan d'Implémentation Backend Mail - Ferme ASSIKO

## 📋 Vue d'ensemble
Ce document détaille le plan d'implémentation du système de traitement des commandes et formulaires par email pour la Ferme AgroEcologique ASSIKO.

---

## 🎯 Objectifs

### Fonctionnalités à implémenter
1. **Réception des commandes par email** (formulaire de checkout)
2. **Réception des demandes de contact** (formulaire de contact)
3. **Emails automatiques de confirmation** pour les clients
4. **Emails formatés et professionnels** avec le branding ASSIKO

---

## 📧 Services Email Recommandés

### Option 1: Resend (Recommandé)
- ✅ Gratuit jusqu'à 3000 emails/mois
- ✅ API simple et moderne
- ✅ Templates React Email
- ✅ Excellente délivrabilité
- ✅ Interface moderne

### Option 2: SendGrid
- ✅ Gratuit jusqu'à 100 emails/jour
- ✅ Très populaire
- ✅ Templates d'emails
- ❌ Interface plus complexe

### Option 3: Nodemailer + Gmail
- ✅ Gratuit
- ✅ Simple pour débuter
- ❌ Limites d'envoi strictes (500/jour)
- ❌ Moins professionnel

**Recommandation: Resend** pour son API moderne et sa facilité d'intégration avec Next.js

---

## 🏗️ Architecture Technique

### Structure des API Routes

```
/app/api/
├── contact/
│   └── route.ts         # Traitement formulaire contact
├── checkout/
│   └── route.ts         # Traitement commandes
└── emails/
    ├── contact-notification.tsx    # Template email admin (contact)
    ├── contact-confirmation.tsx    # Template email client (contact)
    ├── order-notification.tsx      # Template email admin (commande)
    └── order-confirmation.tsx      # Template email client (commande)
```

---

## 📝 Templates d'Emails

### 1. Email de notification de commande (pour ASSIKO)

**Sujet:** 🛒 Nouvelle commande #[ORDER_ID] - [CLIENT_NAME]

**Contenu:**
```
┌─────────────────────────────────────┐
│     🌾 Ferme AgroEcologique ASSIKO  │
│        NOUVELLE COMMANDE            │
└─────────────────────────────────────┘

Commande #[ORDER_ID]
Date: [DATE]

👤 INFORMATIONS CLIENT
━━━━━━━━━━━━━━━━━━━━━━
Nom: [NOM]
Téléphone: [TELEPHONE]
Email: [EMAIL]
Adresse: [ADRESSE]

📦 MODE DE LIVRAISON
━━━━━━━━━━━━━━━━━━━━━━
[RETRAIT FERME / LIVRAISON DOMICILE]
Délai: [24h / 1-2 jours]
Frais: [GRATUIT / 1000 FCFA]

🛒 PRODUITS COMMANDÉS
━━━━━━━━━━━━━━━━━━━━━━
[LISTE PRODUITS]
- Nom produit × quantité (prix unitaire) = total
  Type: [Détail / En gros]

💰 RÉSUMÉ
━━━━━━━━━━━━━━━━━━━━━━
Sous-total: [MONTANT] FCFA
Livraison: [MONTANT] FCFA
TOTAL: [MONTANT] FCFA

📝 NOTES CLIENT
━━━━━━━━━━━━━━━━━━━━━━
[NOTES]
```

### 2. Email de confirmation de commande (pour le client)

**Sujet:** ✅ Commande confirmée - Ferme ASSIKO

**Contenu:**
```
Bonjour [NOM],

Merci pour votre confiance ! 🌾

Votre commande a bien été enregistrée et sera traitée dans les plus brefs délais.

📋 RÉCAPITULATIF DE VOTRE COMMANDE

[DETAILS COMMANDE - même format que ci-dessus]

📞 BESOIN D'AIDE ?
Notre équipe est à votre disposition:
- Téléphone: +229 XX XX XX XX
- WhatsApp: +229 XX XX XX XX
- Email: contact@fermeassiko.bj

Merci de soutenir l'agriculture locale et écologique !

L'équipe Ferme AgroEcologique ASSIKO
Calavi, Bénin
```

### 3. Email de notification de contact (pour ASSIKO)

**Sujet:** 📨 Nouveau message de contact - [SUJET]

### 4. Email de confirmation de contact (pour le client)

**Sujet:** ✅ Message reçu - Ferme ASSIKO

---

## 🔧 Implémentation Détaillée

### Étape 1: Installation des dépendances

```bash
npm install resend
npm install @react-email/components
npm install react-email
```

### Étape 2: Configuration des variables d'environnement

Créer/modifier `.env.local`:
```env
# Resend API
RESEND_API_KEY=re_xxxxxxxxxxxx

# Emails
ADMIN_EMAIL=contact@fermeassiko.bj
FROM_EMAIL=noreply@fermeassiko.bj

# Site URL
NEXT_PUBLIC_SITE_URL=https://fermeassiko.bj
```

### Étape 3: Créer l'API Route pour les commandes

**Fichier: `/app/api/checkout/route.ts`**

Fonctionnalités:
- Validation des données reçues
- Génération d'un ID de commande unique
- Envoi email à l'admin (ASSIKO)
- Envoi email de confirmation au client
- Gestion des erreurs
- Logs pour debugging

### Étape 4: Créer l'API Route pour le contact

**Fichier: `/app/api/contact/route.ts`**

Fonctionnalités:
- Validation des données du formulaire
- Envoi email à l'admin
- Envoi email de confirmation au client
- Protection anti-spam (rate limiting)

### Étape 5: Créer les templates d'emails avec React Email

Avantages de React Email:
- Templates responsive automatiques
- Composants réutilisables
- Prévisualisation facile
- Compatible tous clients email

### Étape 6: Modifier les formulaires frontend

**Modifications à apporter:**

1. **checkout-step-3.tsx**
   - Remplacer le `setTimeout` simulé par un vrai appel API
   - Gérer les états loading/success/error
   - Afficher les messages d'erreur le cas échéant

2. **contact/page.tsx**
   - Remplacer le `setTimeout` simulé par un vrai appel API
   - Ajouter la gestion d'erreurs
   - Améliorer les messages de confirmation

---

## 🔐 Sécurité

### Mesures à implémenter:

1. **Validation des données**
   - Vérifier tous les champs obligatoires
   - Valider format email
   - Valider format téléphone
   - Sanitiser les inputs

2. **Rate Limiting**
   - Limiter à 5 demandes par IP/10 minutes
   - Éviter le spam

3. **Protection CSRF**
   - Utiliser Next.js built-in protection
   - Vérifier l'origine des requêtes

4. **Environnement**
   - Ne jamais exposer les clés API
   - Utiliser .env.local (ignoré par git)

---

## 📊 Données à stocker (optionnel - future base de données)

Pour l'instant: emails uniquement
Plus tard: base de données pour:
- Historique des commandes
- Gestion du stock
- Statistiques
- CRM clients

**Tables suggérées:**
```sql
- orders (commandes)
- order_items (produits commandés)
- customers (clients)
- contact_messages (messages contact)
```

---

## 🧪 Tests à effectuer

### Tests fonctionnels:
- [ ] Envoi de commande avec retrait ferme
- [ ] Envoi de commande avec livraison domicile
- [ ] Envoi de commande avec produits en gros
- [ ] Envoi de message de contact
- [ ] Réception emails admin
- [ ] Réception emails client
- [ ] Emails lisibles sur mobile
- [ ] Emails lisibles sur desktop
- [ ] Emails compatibles Gmail, Outlook, etc.

### Tests de sécurité:
- [ ] Tentative d'injection SQL
- [ ] Tentative de spam
- [ ] Validation des données invalides

---

## 📱 Responsive Design des Emails

Les templates doivent être responsive pour:
- Mobile (80% des utilisateurs au Bénin)
- Desktop
- Tablette

Utiliser React Email qui gère automatiquement le responsive.

---

## 🚀 Déploiement

### Checklist avant déploiement:

1. **Configuration Resend**
   - [ ] Créer compte Resend
   - [ ] Vérifier le domaine fermeassiko.bj
   - [ ] Générer clé API
   - [ ] Configurer SPF/DKIM records

2. **Variables d'environnement**
   - [ ] Ajouter RESEND_API_KEY sur Vercel
   - [ ] Vérifier ADMIN_EMAIL
   - [ ] Vérifier FROM_EMAIL

3. **Tests finaux**
   - [ ] Test commande en production
   - [ ] Test contact en production
   - [ ] Vérifier délivrabilité

---

## 💰 Coûts Estimés

### Resend (Recommandé)
- **Gratuit:** 3000 emails/mois
- **Pro:** 20$/mois pour 50,000 emails
- **Enterprise:** Sur devis

### Estimation pour Ferme ASSIKO:
- ~50 commandes/mois = 100 emails (client + admin)
- ~30 contacts/mois = 60 emails
- **Total: ~160 emails/mois**
- ✅ **GRATUIT avec Resend**

---

## 📅 Timeline d'Implémentation

### Phase 1 (Jour 1): Setup
- Installation dépendances
- Configuration Resend
- Configuration variables d'environnement

### Phase 2 (Jour 1-2): Templates Emails
- Créer template commande admin
- Créer template commande client
- Créer template contact admin
- Créer template contact client
- Tests templates

### Phase 3 (Jour 2): API Routes
- Créer API route checkout
- Créer API route contact
- Validation des données
- Gestion des erreurs

### Phase 4 (Jour 2-3): Frontend Integration
- Modifier checkout-step-3.tsx
- Modifier contact/page.tsx
- Tests complets

### Phase 5 (Jour 3): Tests & Déploiement
- Tests fonctionnels
- Tests de sécurité
- Déploiement production
- Monitoring

---

## 📞 Support et Documentation

### Ressources utiles:
- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### En cas de problème:
1. Vérifier les logs Resend
2. Vérifier les logs Vercel
3. Tester en local d'abord
4. Vérifier configuration DNS

---

## ✅ Checklist Finale

- [ ] Resend configuré et testé
- [ ] Templates emails créés et testés
- [ ] API routes implémentées
- [ ] Frontend intégré
- [ ] Tests complets effectués
- [ ] Variables d'environnement configurées
- [ ] Déploiement en production
- [ ] Monitoring actif
- [ ] Documentation à jour

---

**Document créé le:** 2025-11-02
**Projet:** Ferme AgroEcologique ASSIKO
**Version:** 1.0
**Statut:** En attente d'implémentation
