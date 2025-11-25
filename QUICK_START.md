# 🚀 Démarrage Rapide - Dashboard Admin

## ⚡ En 3 Minutes !

### 1️⃣ Configuration Cloudinary (2 minutes)

1. Allez sur [Cloudinary Console](https://cloudinary.com/console)
2. Settings → Upload → Add upload preset
3. Configurez :
   - **Preset name**: `sami-fragrance`
   - **Signing mode**: `Unsigned`
4. Cliquez sur **Save**

✅ **C'est tout !** Voir `CLOUDINARY_SETUP.md` pour plus de détails.

### 2️⃣ Lancer le Dashboard (30 secondes)

Le serveur est déjà en cours d'exécution ! Ouvrez simplement :

```
http://localhost:3001/admin.html
```

### 3️⃣ Se Connecter (10 secondes)

- **Username**: `admin`
- **Password**: `admin123`

---

## 🎯 Que Faire Ensuite ?

### ✅ Ajouter votre premier parfum

1. Cliquez sur **Parfums** dans le menu
2. Cliquez sur **Ajouter un Parfum**
3. Remplissez le formulaire :
   - Uploadez une image
   - Nom : "Dior Sauvage"
   - Prix : 150
   - Stock : 25
   - Catégorie : Homme
   - Description : "Parfum frais et épicé"
4. Cliquez sur **Ajouter**

### ✅ Tester les statistiques

1. Retournez au **Tableau de Bord**
2. Vous verrez :
   - Total Parfums : 1
   - Les autres stats se mettront à jour automatiquement

### ✅ Créer une réservation test

Pour tester la gestion des réservations, vous devez créer une réservation depuis le site principal :

1. Allez sur `http://localhost:3001/`
2. Ajoutez des produits au panier
3. Passez commande
4. Retournez au dashboard admin
5. Cliquez sur **Réservations**
6. Vous verrez votre commande !

---

## 📚 Documentation Complète

- **Guide complet** : `GUIDE_ADMIN.md`
- **Configuration Cloudinary** : `CLOUDINARY_SETUP.md`
- **README Admin** : `ADMIN_README.md`

---

## 🆘 Problèmes Courants

### ❌ L'image ne s'uploade pas
→ Vérifiez que le preset Cloudinary `sami-fragrance` existe et est en mode `Unsigned`

### ❌ Les données ne se sauvegardent pas
→ Vérifiez les règles Firebase Realtime Database (doivent permettre read/write)

### ❌ Erreur 404 sur admin.html
→ Vérifiez que le serveur est bien lancé avec `npm run dev`

---

## 🎨 Captures d'Écran

Le dashboard inclut :
- 📊 Statistiques en temps réel
- 🖼️ Gestion des parfums avec upload d'images
- 📦 Gestion des réservations avec filtres
- 🎯 Interface moderne et responsive

---

**Bon développement ! 🚀**
