# ✅ Vérification des URLs - SAMI Fragrance

## 🔍 URLs Correctes du Projet

### ✅ **Site Web Principal**
```
http://localhost:3001/
```
ou
```
http://localhost:3001/index.html
```

### ✅ **Panel Admin**
```
http://localhost:3001/admin.html
```

⚠️ **IMPORTANT** : Notez bien le `.html` à la fin !

---

## ❌ URLs Incorrectes (Ne Fonctionnent PAS)

### ❌ Port 3000
```
http://localhost:3000/          ❌ INCORRECT
http://localhost:3000/admin     ❌ INCORRECT
http://localhost:3000/admin.html ❌ INCORRECT
```

### ❌ Sans Extension
```
http://localhost:3001/admin     ❌ INCORRECT
```

---

## 🔧 Pourquoi le Port 3001 ?

Le serveur Vite a détecté que le port 3000 était déjà utilisé et a automatiquement choisi le port 3001.

Vous pouvez le voir dans les logs du serveur :
```
Port 3000 is in use, trying another one...
➜  Local:   http://localhost:3001/
```

---

## 📋 Checklist de Vérification

### Avant de Commencer :

- [ ] Le serveur est lancé (`npm run dev`)
- [ ] Le port affiché est bien `3001`
- [ ] Vous utilisez `http://localhost:3001/` pour le site
- [ ] Vous utilisez `http://localhost:3001/admin.html` pour l'admin

---

## 🚀 Accès Rapide

### 1️⃣ **Ouvrir le Site Web**
1. Ouvrez votre navigateur
2. Tapez : `http://localhost:3001/`
3. Appuyez sur Entrée
4. ✅ Le site s'affiche

### 2️⃣ **Ouvrir le Panel Admin**
1. Ouvrez un nouvel onglet
2. Tapez : `http://localhost:3001/admin.html`
3. Appuyez sur Entrée
4. ✅ La page de connexion s'affiche
5. Connectez-vous avec :
   - Username: `admin`
   - Password: `admin123`

---

## 🆘 Dépannage

### Problème : "Ce site est inaccessible"

**Solution 1** : Vérifiez que le serveur est lancé
```bash
npm run dev
```

**Solution 2** : Vérifiez le port dans le terminal
Cherchez cette ligne :
```
➜  Local:   http://localhost:XXXX/
```
Utilisez le port affiché (probablement 3001)

**Solution 3** : Vérifiez l'URL
- ✅ Correct : `http://localhost:3001/admin.html`
- ❌ Incorrect : `http://localhost:3000/admin`

### Problème : "404 Not Found" sur /admin

**Cause** : Vous avez oublié le `.html`

**Solution** : Utilisez `http://localhost:3001/admin.html`

### Problème : Le port change à chaque fois

**Cause** : Un autre processus utilise le port 3001

**Solution** : 
1. Arrêtez tous les serveurs Node.js
2. Relancez `npm run dev`
3. Utilisez le port affiché dans le terminal

---

## 📝 Résumé

| Page | URL Correcte | Identifiants |
|------|-------------|--------------|
| Site Web | `http://localhost:3001/` | - |
| Admin | `http://localhost:3001/admin.html` | admin / admin123 |

---

## 🔗 Liens Rapides

Copiez-collez ces URLs dans votre navigateur :

**Site Web** :
```
http://localhost:3001/
```

**Panel Admin** :
```
http://localhost:3001/admin.html
```

---

## ✅ Vérification Finale

Pour vérifier que tout fonctionne :

1. **Terminal** : Vérifiez que le serveur affiche :
   ```
   ➜  Local:   http://localhost:3001/
   ```

2. **Site Web** : Ouvrez `http://localhost:3001/`
   - Vous devriez voir la page d'accueil avec le hero
   - La navbar en haut
   - Les produits (si vous en avez ajouté)

3. **Panel Admin** : Ouvrez `http://localhost:3001/admin.html`
   - Vous devriez voir la page de connexion
   - Connectez-vous avec admin/admin123
   - Vous devriez voir le dashboard

---

**Tout fonctionne ? Parfait ! 🎉**

Si vous avez des problèmes, vérifiez :
1. Le serveur est lancé
2. Le port est correct (3001)
3. L'URL inclut `.html` pour l'admin
