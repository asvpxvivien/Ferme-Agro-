# Configuration de Resend pour l'envoi d'emails

## Étape 1 : Créer un compte Resend

1. Allez sur https://resend.com
2. Créez un compte ou connectez-vous
3. Vérifiez votre email

## Étape 2 : Obtenir votre clé API

1. Allez dans **API Keys** dans le menu
2. Cliquez sur **Create API Key**
3. Donnez un nom à votre clé (ex: "Ferme ASSIKO Production")
4. Sélectionnez les permissions : **Full Access** ou **Sending Access**
5. Cliquez sur **Add**
6. **IMPORTANT** : Copiez immédiatement la clé (elle commence par `re_...`)
   - Vous ne pourrez plus la voir après !

## Étape 3 : Configurer le domaine d'envoi

### Option 1 : Utiliser le domaine de test (pour développement)
Resend vous donne un domaine de test gratuit qui fonctionne immédiatement.
**Limitation** : Vous ne pouvez envoyer qu'à l'email avec lequel vous vous êtes inscrit.

### Option 2 : Configurer votre propre domaine (recommandé pour production)
1. Allez dans **Domains** dans le menu Resend
2. Cliquez sur **Add Domain**
3. Entrez votre domaine (ex: `fermeassiko.bj`)
4. Suivez les instructions pour ajouter les enregistrements DNS
5. Attendez la vérification (peut prendre quelques minutes à 24h)

**Pour Gmail** : Vous ne pouvez pas utiliser `@gmail.com` comme domaine d'envoi.
- Soit utilisez le domaine de test de Resend
- Soit configurez un vrai domaine personnalisé

## Étape 4 : Configurer les variables d'environnement

1. Ouvrez le fichier `.env.local` à la racine du projet
2. Remplacez `re_votre_cle_api_ici_depuis_resend` par votre vraie clé API
3. Les emails sont déjà configurés :
   - `ADMIN_EMAIL=fermeassiko@gmail.com` (où vous recevez les commandes)
   - `FROM_EMAIL=fermeassiko@gmail.com` (expéditeur)

**Exemple** :
```env
RESEND_API_KEY=re_AbCdEf123456789XyZ
ADMIN_EMAIL=fermeassiko@gmail.com
FROM_EMAIL=fermeassiko@gmail.com
```

## Étape 5 : Redémarrer le serveur

Après avoir configuré la clé API :

```bash
# Arrêter le serveur (Ctrl+C)
# Puis redémarrer
pnpm dev
```

## Tester l'envoi d'emails

### Test 1 : Formulaire de contact
1. Allez sur http://localhost:3000/contact
2. Remplissez le formulaire
3. Cliquez sur "Envoyer"
4. Vérifiez votre boîte mail `fermeassiko@gmail.com`

### Test 2 : Commande
1. Ajoutez des produits au panier
2. Allez dans le panier
3. Cliquez sur "Passer la commande"
4. Remplissez les informations
5. Confirmez la commande
6. Vérifiez votre boîte mail `fermeassiko@gmail.com`

## Emails envoyés

### Pour les commandes :
- **Admin** (`fermeassiko@gmail.com`) reçoit :
  - Détails de la commande
  - Infos client
  - Produits commandés
  - Prix total

- **Client** reçoit (si email fourni) :
  - Confirmation de commande
  - Récapitulatif
  - Coordonnées de contact

### Pour le formulaire de contact :
- **Admin** (`fermeassiko@gmail.com`) reçoit :
  - Message du client
  - Coordonnées pour répondre

- **Client** reçoit :
  - Confirmation de réception du message

## Dépannage

### "Error: Missing API Key"
- Vérifiez que la clé est bien dans `.env.local`
- Redémarrez le serveur après modification

### "Email not delivered"
- Si vous utilisez le domaine de test, vous ne pouvez envoyer qu'à l'email de votre compte Resend
- Configurez un domaine personnalisé pour envoyer à n'importe quelle adresse

### "Domain not verified"
- Vérifiez les enregistrements DNS de votre domaine
- Attendez la propagation DNS (jusqu'à 24h)

## Limites du plan gratuit Resend

- **100 emails/jour** (largement suffisant pour une petite ferme)
- **3 000 emails/mois**
- Emails uniquement vers votre propre email (domaine de test)
- Pour envoyer à n'importe qui : configurez un domaine

## Support

- Documentation Resend : https://resend.com/docs
- Support Resend : https://resend.com/support
- Vérifier le statut : https://status.resend.com
