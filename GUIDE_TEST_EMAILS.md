# Guide de test - Système d'envoi d'emails

## ✅ Configuration actuelle

- **Email expéditeur** : `onboarding@resend.dev` (domaine de test Resend)
- **Email destinataire** : `fermeassiko@gmail.com` (vous recevez les commandes)
- **Clé API** : Configurée dans `.env.local`

## 🧪 Test 1 : Formulaire de contact

1. Démarrez le serveur :
   ```bash
   pnpm dev
   ```

2. Allez sur http://localhost:3000/contact

3. Remplissez le formulaire :
   - **Nom** : Votre nom de test
   - **Email** : votre-email@exemple.com (peut être n'importe quoi)
   - **Téléphone** : +229 XX XX XX XX
   - **Sujet** : Test formulaire de contact
   - **Message** : Ceci est un test

4. Cliquez sur "Envoyer"

5. **Vérifiez** :
   - ✅ Message de confirmation affiché sur le site
   - ✅ Email reçu sur `fermeassiko@gmail.com`
   - ✅ L'expéditeur est `onboarding@resend.dev`

## 🧪 Test 2 : Commande (avec email client)

1. Ajoutez des produits au panier

2. Cliquez sur "Passer la commande"

3. **Étape 1** : Vérifiez vos produits, cliquez "Continuer"

4. **Étape 2** : Remplissez les informations :
   - **Nom** : Jean Dupont
   - **Téléphone** : +229 XX XX XX XX
   - **Email** : votre-email-perso@gmail.com (IMPORTANT : mettez un vrai email pour voir l'email de confirmation client)
   - Mode de livraison : Retrait à la ferme ou Livraison à domicile
   - Si livraison : Adresse complète

5. **Étape 3** : Vérifiez le récapitulatif, cliquez "Confirmer la commande"

6. **Vérifiez** :
   - ✅ Message de confirmation affiché
   - ✅ Email reçu sur `fermeassiko@gmail.com` avec tous les détails
   - ✅ Email de confirmation envoyé à l'adresse du client (si vous avez mis votre vrai email)

## 🧪 Test 3 : Commande (sans email client)

1. Refaites le test 2

2. Mais **NE REMPLISSEZ PAS** le champ email

3. **Vérifiez** :
   - ✅ La commande fonctionne quand même
   - ✅ Vous recevez l'email admin sur `fermeassiko@gmail.com`
   - ✅ Le client ne reçoit RIEN (c'est normal, il n'a pas donné son email)

## 📧 Emails reçus

### Pour vous (fermeassiko@gmail.com) :

**Sujet** : 🛒 Nouvelle commande #CMD12345678 - Nom du client

**Contenu** :
- Informations client complètes (nom, téléphone, email si fourni, adresse)
- Liste des produits avec prix
- Mode de livraison
- Total de la commande
- Notes du client

### Pour le client (si email fourni) :

**Sujet** : ✅ Commande confirmée #CMD12345678 - Ferme ASSIKO

**Contenu** :
- Confirmation de la commande
- Récapitulatif des produits
- Mode de livraison et délai
- Vos coordonnées de contact (+229 97 44 62 30, fermeassiko@gmail.com)

## 🔍 En cas de problème

### "Je ne reçois pas d'email"

1. **Vérifiez les spams** de `fermeassiko@gmail.com`
2. **Ouvrez la console du navigateur** (F12) et regardez les erreurs
3. **Vérifiez le terminal** où tourne `pnpm dev` pour voir les logs
4. **Testez avec le script** :
   ```bash
   node test-email.mjs
   ```

### "Le client ne reçoit pas d'email"

C'est normal si :
- Le client n'a pas rempli le champ email (c'est optionnel)
- Ou si le domaine de test Resend ne peut envoyer qu'à l'email avec lequel vous vous êtes inscrit

**Solution** : Pour envoyer à n'importe qui, configurez un domaine personnalisé dans Resend.

### "Erreur : Missing API Key"

1. Vérifiez que `.env.local` contient votre vraie clé
2. Redémarrez le serveur après modification du `.env.local`

### "Erreur : Domain not verified"

Si vous utilisez `fermeassiko@gmail.com` comme expéditeur → Changez pour `onboarding@resend.dev`

## 📊 Logs utiles

Dans le terminal où tourne `pnpm dev`, vous verrez :
```
📧 Envoi des emails pour la commande: CMD12345678
✅ Email admin envoyé: { id: 're_abc123...' }
✅ Email client envoyé: { id: 're_def456...' }
```

## 🎯 Checklist finale

- [ ] Le formulaire de contact fonctionne
- [ ] Vous recevez les emails de contact
- [ ] Les clients reçoivent la confirmation de contact
- [ ] Vous recevez les détails des commandes par email
- [ ] Les clients reçoivent la confirmation de commande (si email fourni)
- [ ] Les emails contiennent toutes les bonnes informations
- [ ] Votre numéro WhatsApp (+229 97 44 62 30) apparaît dans les emails

## 🚀 Prochaines étapes

Quand tout fonctionne en local :
1. Déployez sur votre VPS
2. Configurez les variables d'environnement sur le serveur
3. Achetez `fermeassiko.com`
4. Configurez le domaine dans Resend
5. Changez `FROM_EMAIL=contact@fermeassiko.com`
