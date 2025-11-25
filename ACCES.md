# 🎯 Guide d'Accès Rapide - SAMI Fragrance

## 🌐 URLs du Projet

### ✅ **URLs Correctes**

| Page | URL | Description |
|------|-----|-------------|
| 🏠 **Navigation** | `http://localhost:3001/navigation.html` | Page de choix |
| 🛍️ **Site Web** | `http://localhost:3001/` ou `http://localhost:3001/index.html` | Boutique client |
| 🔐 **Admin** | `http://localhost:3001/admin.html` | Panel admin |

---

## 🚀 Démarrage Rapide

### 1️⃣ **Lancer le Serveur**
```bash
npm run dev
```

Le serveur démarre sur le port **3001** (car le port 3000 est occupé).

### 2️⃣ **Accéder aux Pages**

#### Option A : Page de Navigation (Recommandé)
```
http://localhost:3001/navigation.html
```
Cette page vous permet de choisir entre :
- 🛍️ Site Web Client
- 🔐 Panel Admin

#### Option B : Accès Direct

**Site Web Client** :
```
http://localhost:3001/
```

**Panel Admin** :
```
http://localhost:3001/admin.html
```
- Username: `admin`
- Password: `admin123`

---

## 📱 Captures d'Écran des URLs

### Navigation
```
┌─────────────────────────────────────────┐
│  http://localhost:3001/navigation.html  │
├─────────────────────────────────────────┤
│                                         │
│         SAMI Fragrance                  │
│    Choisissez votre destination         │
│                                         │
│  ┌──────────┐      ┌──────────┐        │
│  │ Site Web │      │  Admin   │        │
│  │    🛍️    │      │    🔐    │        │
│  └──────────┘      └──────────┘        │
│                                         │
└─────────────────────────────────────────┘
```

### Site Web
```
┌─────────────────────────────────────────┐
│  http://localhost:3001/                 │
├─────────────────────────────────────────┤
│  SAMI Fragrance          🛒 Panier      │
│  ─────────────────────────────────────  │
│                                         │
│     L'Art du Parfum                     │
│     Découvrez nos fragrances            │
│                                         │
│  ┌────┐  ┌────┐  ┌────┐                │
│  │ 🧴 │  │ 🧴 │  │ 🧴 │  Produits      │
│  └────┘  └────┘  └────┘                │
└─────────────────────────────────────────┘
```

### Panel Admin
```
┌─────────────────────────────────────────┐
│  http://localhost:3001/admin.html       │
├─────────────────────────────────────────┤
│                                         │
│      SAMI Fragrance                     │
│      Administration                     │
│                                         │
│  ┌─────────────────────────────┐       │
│  │ Username: admin             │       │
│  │ Password: ••••••••          │       │
│  │                             │       │
│  │   [Se connecter]            │       │
│  └─────────────────────────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

---

## ⚠️ Erreurs Courantes

### ❌ Erreur 1 : "Ce site est inaccessible"

**Cause** : Mauvais port ou serveur non lancé

**Solution** :
1. Vérifiez que le serveur est lancé : `npm run dev`
2. Vérifiez le port dans le terminal (devrait être 3001)
3. Utilisez `http://localhost:3001/` (pas 3000)

### ❌ Erreur 2 : "404 Not Found" sur /admin

**Cause** : URL incorrecte (manque `.html`)

**Solution** :
- ❌ Incorrect : `http://localhost:3001/admin`
- ✅ Correct : `http://localhost:3001/admin.html`

### ❌ Erreur 3 : Page blanche

**Cause** : Erreur JavaScript ou mauvaise configuration

**Solution** :
1. Ouvrez la console (F12)
2. Vérifiez les erreurs
3. Rechargez la page (Ctrl+R ou Cmd+R)

---

## 🔍 Vérification du Serveur

### Dans le Terminal

Après `npm run dev`, vous devriez voir :

```bash
Port 3000 is in use, trying another one...

  VITE v6.4.1  ready in 430 ms

  ➜  Local:   http://localhost:3001/
  ➜  Network: http://172.17.16.231:3001/
  ➜  press h + enter to show help
```

✅ **Confirmez que le port est bien 3001**

---

## 📋 Checklist de Démarrage

Avant de commencer, vérifiez :

- [ ] Le serveur est lancé (`npm run dev`)
- [ ] Le terminal affiche `http://localhost:3001/`
- [ ] Vous pouvez accéder à `http://localhost:3001/navigation.html`
- [ ] Le site web s'affiche sur `http://localhost:3001/`
- [ ] L'admin s'affiche sur `http://localhost:3001/admin.html`
- [ ] Vous pouvez vous connecter avec admin/admin123

---

## 🎯 Scénario Complet de Test

### Test 1 : Navigation
1. Ouvrez `http://localhost:3001/navigation.html`
2. ✅ Vous voyez deux cartes (Site Web et Admin)
3. Cliquez sur "Site Web"
4. ✅ Vous êtes redirigé vers la boutique

### Test 2 : Site Web
1. Ouvrez `http://localhost:3001/`
2. ✅ Vous voyez la page d'accueil
3. Faites défiler vers le bas
4. ✅ Vous voyez les produits (si ajoutés)

### Test 3 : Admin
1. Ouvrez `http://localhost:3001/admin.html`
2. ✅ Vous voyez la page de connexion
3. Entrez : admin / admin123
4. ✅ Vous accédez au dashboard

---

## 🔗 Liens de Référence

### Documentation
- `README.md` - Vue d'ensemble
- `URLS.md` - Guide des URLs
- `QUICK_START.md` - Démarrage rapide
- `INTEGRATION.md` - Intégration complète

### Pages du Projet
- `navigation.html` - Page de navigation
- `index.html` - Site web client
- `admin.html` - Panel admin

---

## 💡 Astuces

### Raccourcis Clavier
- **F5** ou **Ctrl+R** : Recharger la page
- **F12** : Ouvrir la console développeur
- **Ctrl+Shift+I** : Ouvrir les outils de développement

### Favoris Recommandés
Ajoutez ces URLs à vos favoris :
1. `http://localhost:3001/navigation.html` - Navigation
2. `http://localhost:3001/` - Site Web
3. `http://localhost:3001/admin.html` - Admin

---

## 📞 Support

### Problème Non Résolu ?

1. **Vérifiez le terminal** : Y a-t-il des erreurs ?
2. **Vérifiez la console** (F12) : Y a-t-il des erreurs JavaScript ?
3. **Redémarrez le serveur** :
   ```bash
   # Arrêtez le serveur (Ctrl+C)
   # Relancez
   npm run dev
   ```

---

## ✅ Résumé

| Action | URL | Identifiants |
|--------|-----|--------------|
| Choisir | `http://localhost:3001/navigation.html` | - |
| Acheter | `http://localhost:3001/` | - |
| Gérer | `http://localhost:3001/admin.html` | admin/admin123 |

**Tout est prêt ! Bon développement ! 🚀**
