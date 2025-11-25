# 📸 Configuration Cloudinary - Guide Pas à Pas

## ⚠️ IMPORTANT : Configuration Obligatoire

Pour que l'upload d'images fonctionne dans le dashboard admin, vous **DEVEZ** créer un upload preset dans Cloudinary.

## 🔧 Étapes de Configuration

### Étape 1 : Connexion à Cloudinary

1. Allez sur [https://cloudinary.com/console](https://cloudinary.com/console)
2. Connectez-vous avec vos identifiants
3. Vous devriez voir votre dashboard avec :
   - Cloud name: `dsuzrrti9`
   - API Key: `761258129216488`

### Étape 2 : Accéder aux Paramètres d'Upload

1. Dans le menu de gauche, cliquez sur **Settings** (⚙️ icône d'engrenage)
2. Cliquez sur l'onglet **Upload**
3. Faites défiler jusqu'à la section **Upload presets**

### Étape 3 : Créer un Upload Preset

1. Cliquez sur le bouton **Add upload preset** (en haut à droite)
2. Configurez les paramètres suivants :

#### Configuration Requise :

**Preset name** (Nom du preset) :
```
sami-fragrance
```
⚠️ **Ce nom DOIT être exactement "sami-fragrance"** (sans guillemets)

**Signing Mode** (Mode de signature) :
```
Unsigned
```
⚠️ **Très important** : Sélectionnez "Unsigned" pour permettre l'upload depuis le navigateur

**Folder** (Dossier - Optionnel mais recommandé) :
```
sami-fragrance
```
Cela organisera toutes les images dans un dossier dédié

#### Configuration Optionnelle (Recommandée) :

**Allowed formats** (Formats autorisés) :
```
jpg, png, webp, jpeg
```

**Max file size** (Taille maximale) :
```
10485760
```
(10 MB en bytes)

**Image transformations** (Transformations d'image) :
- Width: `1200` (largeur maximale)
- Height: `1200` (hauteur maximale)
- Crop mode: `limit` (pour préserver les proportions)

### Étape 4 : Sauvegarder

1. Faites défiler jusqu'en bas de la page
2. Cliquez sur le bouton **Save**
3. Vous devriez voir votre preset dans la liste

### Étape 5 : Vérification

Pour vérifier que tout fonctionne :

1. Retournez à la liste des upload presets
2. Trouvez `sami-fragrance` dans la liste
3. Vérifiez que :
   - ✅ Le nom est correct : `sami-fragrance`
   - ✅ Le mode est : `Unsigned`
   - ✅ Le statut est : `Enabled` (activé)

## 🧪 Test de l'Upload

### Dans le Dashboard Admin :

1. Allez sur `http://localhost:3001/admin.html`
2. Connectez-vous (admin/admin123)
3. Cliquez sur **Parfums** dans le menu
4. Cliquez sur **Ajouter un Parfum**
5. Essayez d'uploader une image

### Si ça fonctionne :
- ✅ L'image s'affiche en prévisualisation
- ✅ Après sauvegarde, l'image est visible dans la carte du produit
- ✅ L'URL de l'image commence par `https://res.cloudinary.com/dsuzrrti9/`

### Si ça ne fonctionne pas :
- ❌ Vérifiez le nom du preset (doit être exactement `sami-fragrance`)
- ❌ Vérifiez que le mode est bien `Unsigned`
- ❌ Vérifiez la console du navigateur (F12) pour voir les erreurs
- ❌ Vérifiez que le preset est activé (Enabled)

## 🔍 Dépannage

### Erreur : "Upload preset not found"
**Solution** : Le nom du preset est incorrect ou n'existe pas
- Vérifiez que vous avez créé le preset `sami-fragrance`
- Vérifiez l'orthographe exacte

### Erreur : "Upload preset requires signing"
**Solution** : Le preset est en mode "Signed" au lieu de "Unsigned"
- Retournez dans les paramètres du preset
- Changez le mode en "Unsigned"
- Sauvegardez

### Erreur : "Invalid API key"
**Solution** : Le cloud name est incorrect
- Vérifiez dans `cloudinary.config.ts` que le cloudName est `dsuzrrti9`

### L'image ne s'affiche pas après upload
**Solution** : Vérifiez les CORS
- Allez dans Settings → Security
- Vérifiez que les CORS sont configurés pour accepter votre domaine

## 📊 Gestion des Images

### Voir toutes les images uploadées :

1. Dans Cloudinary, allez sur **Media Library**
2. Vous verrez toutes vos images
3. Si vous avez configuré un dossier, elles seront dans `sami-fragrance/`

### Organiser les images :

Vous pouvez créer des sous-dossiers :
- `sami-fragrance/homme/`
- `sami-fragrance/femme/`
- `sami-fragrance/unisexe/`

Pour cela, modifiez le code dans `PerfumeManager.tsx` :
```typescript
formData.append('folder', `sami-fragrance/${formData.category.toLowerCase()}`);
```

## 🔐 Sécurité

### Pour la Production :

1. **Limitez les uploads** :
   - Configurez une taille maximale de fichier
   - Limitez les formats autorisés
   - Activez la modération automatique

2. **Utilisez le mode Signed** :
   - Plus sécurisé mais nécessite un backend
   - Empêche les uploads non autorisés

3. **Configurez les transformations** :
   - Optimisez automatiquement les images
   - Réduisez la bande passante
   - Améliorez les performances

## 📞 Support Cloudinary

Si vous avez des problèmes :
- Documentation : [https://cloudinary.com/documentation](https://cloudinary.com/documentation)
- Support : [https://support.cloudinary.com](https://support.cloudinary.com)

---

**Une fois configuré, vous n'aurez plus besoin de toucher à ces paramètres !** ✅
