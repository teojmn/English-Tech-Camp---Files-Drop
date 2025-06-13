# English Tech Camp - File Drop System

Un système élégant de téléchargement de fichiers pour partager des ressources pédagogiques.

## 🚀 Fonctionnalités

- ✨ Interface moderne et responsive
- 🔍 Recherche en temps réel
- 📱 Compatible mobile et desktop
- 🎨 Icônes automatiques selon le type de fichier
- 📊 Informations détaillées (taille, date)
- 🎯 Modal de progression de téléchargement
- 🌐 Site statique - aucun serveur requis

## 📁 Structure du projet

```
English-Tech-Camp---Files-Drop/
├── index.html          # Page principale
├── css/
│   └── style.css      # Styles CSS modernes
├── js/
│   └── script.js      # Logique JavaScript
├── assets/            # Dossier pour vos fichiers
│   ├── exemple1.pdf
│   ├── exemple2.docx
│   └── ...
└── README.md          # Ce fichier
```

## 🎯 Comment ajouter des fichiers

### Étape 1: Ajouter vos fichiers
Placez vos fichiers dans le dossier `assets/`

### Étape 2: Mettre à jour la liste
Modifiez la méthode `fetchFiles()` dans `js/script.js` :

```javascript
async fetchFiles() {
    return [
        {
            name: 'Mon_Fichier.pdf',
            size: '2.4 MB',
            type: 'pdf',
            date: '2025-06-13',
            path: 'assets/Mon_Fichier.pdf'
        },
        // Ajoutez vos fichiers ici...
    ];
}
```

### Étape 3: Types de fichiers supportés

| Type | Extensions | Icône |
|------|------------|-------|
| 📄 Documents | pdf, doc, docx | Rouge/Bleu |
| 🖼️ Images | jpg, jpeg, png, gif | Violet |
| 🎥 Vidéos | mp4, avi, mov | Rouge |
| 🎵 Audio | mp3, wav | Vert |
| 📦 Archives | zip, rar, 7z | Orange |
| 💻 Code | js, html, css | Gris |

## 🚀 Déploiement

Ce site est entièrement statique et peut être déployé sur :
- GitHub Pages
- Netlify  
- Vercel
- Tout hébergeur de fichiers statiques

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans `css/style.css` :

```css
:root {
    --primary-color: #3b82f6;    /* Couleur principale */
    --secondary-color: #6366f1;  /* Couleur secondaire */
    --success-color: #10b981;    /* Vert */
    /* ... */
}
```

### Titre et branding
Modifiez le titre dans `index.html` :

```html
<h1 class="title">
    <i class="fas fa-download"></i>
    Votre Titre Ici
</h1>
```

## 🔧 Développement

Aucune installation requise ! Ouvrez simplement `index.html` dans votre navigateur.

Pour un serveur de développement local :
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx serve

# Avec PHP
php -S localhost:8000
```

## 📱 Responsive Design

L'interface s'adapte automatiquement :
- 💻 Desktop : Grille de 3-4 colonnes
- 📱 Tablet : Grille de 2 colonnes  
- 📱 Mobile : 1 colonne

## 🎯 Fonctionnalités avancées

- **Recherche intelligente** : Filtrage en temps réel
- **Animations fluides** : Transitions CSS modernes
- **Gestion d'erreurs** : Messages informatifs
- **Optimisé performance** : CSS et JS optimisés
- **Accessibilité** : Support clavier et lecteurs d'écran

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 🎉 Crédits

- **Font Awesome** pour les icônes
- **Google Fonts** pour la typographie Inter
- **CSS Grid & Flexbox** pour la mise en page responsive

---

Fait avec ❤️ pour English Tech Camp
