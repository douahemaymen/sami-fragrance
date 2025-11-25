# Dashboard Admin - Sami Fragrance

## 🚀 Configuration

### 1. Configuration Cloudinary

Pour que l'upload d'images fonctionne, vous devez créer un **upload preset** dans Cloudinary :

1. Connectez-vous à [Cloudinary](https://cloudinary.com)
2. Allez dans **Settings** → **Upload**
3. Cliquez sur **Add upload preset**
4. Configurez :
   - **Upload preset name**: `sami-fragrance`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `sami-fragrance` (optionnel)
5. Cliquez sur **Save**

### 2. Configuration Firebase Realtime Database

1. Allez dans la [Console Firebase](https://console.firebase.google.com)
2. Sélectionnez votre projet `sami-fragrance`
3. Allez dans **Realtime Database**
4. Si ce n'est pas déjà fait, créez une base de données
5. Configurez les règles de sécurité (pour le développement) :

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

⚠️ **Important**: En production, configurez des règles de sécurité appropriées !

### 3. Accéder au Dashboard Admin

1. Démarrez le serveur de développement :
```bash
npm run dev
```

2. Ouvrez votre navigateur et allez à :
```
http://localhost:3001/admin.html
```

3. Connectez-vous avec les identifiants par défaut :
   - **Username**: `admin`
   - **Password**: `admin123`

## 📊 Fonctionnalités du Dashboard

### Tableau de Bord
- ✅ Statistiques en temps réel
- ✅ Total des parfums
- ✅ Nombre de réservations
- ✅ Revenu total
- ✅ Commandes récentes (7 derniers jours)

### Gestion des Parfums
- ✅ Ajouter un nouveau parfum
- ✅ Modifier un parfum existant
- ✅ Supprimer un parfum
- ✅ Upload d'images vers Cloudinary
- ✅ Gestion du stock
- ✅ Catégorisation (Homme/Femme/Unisexe)

### Gestion des Réservations
- ✅ Liste de toutes les réservations
- ✅ Filtrage par statut
- ✅ Mise à jour du statut (En attente → Confirmée → Livrée)
- ✅ Annulation de commandes
- ✅ Détails complets de chaque réservation

## 🗄️ Structure de la Base de Données Firebase

### Parfums (`/perfumes`)
```json
{
  "perfume_id": {
    "name": "Dior Sauvage",
    "price": 150.00,
    "description": "Un parfum frais et épicé",
    "image": "https://res.cloudinary.com/...",
    "category": "Homme",
    "stock": 25,
    "createdAt": 1234567890,
    "updatedAt": 1234567890
  }
}
```

### Réservations (`/reservations`)
```json
{
  "reservation_id": {
    "customerName": "John Doe",
    "phone": "50997060",
    "address": "Tunis, Tunisie",
    "items": [
      {
        "name": "Dior Sauvage",
        "quantity": 2,
        "price": 150.00
      }
    ],
    "total": 300.00,
    "status": "pending",
    "timestamp": 1234567890
  }
}
```

## 🔐 Sécurité

⚠️ **Important pour la production** :

1. **Remplacez l'authentification simple** par Firebase Authentication
2. **Configurez les règles de sécurité Firebase** pour protéger vos données
3. **Utilisez des variables d'environnement** pour les clés API
4. **Activez HTTPS** en production

## 🎨 Personnalisation

Les couleurs et le design peuvent être modifiés dans :
- `admin.html` (configuration Tailwind)
- Composants individuels dans `/components/admin/`

## 📱 Responsive

Le dashboard est entièrement responsive et fonctionne sur :
- 💻 Desktop
- 📱 Tablette
- 📱 Mobile

## 🆘 Support

Pour toute question ou problème, vérifiez :
1. La console du navigateur pour les erreurs
2. Les règles Firebase Realtime Database
3. La configuration de l'upload preset Cloudinary
