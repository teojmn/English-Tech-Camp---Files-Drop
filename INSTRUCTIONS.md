# 🎯 Comment ajouter vos fichiers

## ✅ SOLUTION RAPIDE (ce que vous cherchiez !)

Votre fichier `CleanShot 2025-06-12 at 17.18.34.mp4` est maintenant configuré et devrait apparaître sur le site !

## 🚀 Pour ajouter d'AUTRES fichiers à l'avenir :

### Méthode 1 - AUTOMATIQUE (Recommandée)
```bash
# 1. Ajoutez vos fichiers dans le dossier assets/
# 2. Exécutez ce script :
./generate-filelist.sh
```

### Méthode 2 - MANUELLE
Modifiez la liste dans `js/script.js`, méthode `fetchFiles()` :

```javascript
return [
    {
        name: 'CleanShot 2025-06-12 at 17.18.34.mp4',
        size: '6.2 MB',
        type: 'mp4',
        date: '2025-06-12',
        path: 'assets/CleanShot 2025-06-12 at 17.18.34.mp4'
    },
    // Ajoutez vos nouveaux fichiers ici
    {
        name: 'nouveau_fichier.pdf',
        size: '1.5 MB',
        type: 'pdf',
        date: '2025-06-13',
        path: 'assets/nouveau_fichier.pdf'
    }
];
```

## 🎨 Le problème était résolu !

Le système affichait des fichiers d'exemple codés en dur. Maintenant il affiche votre vrai fichier vidéo CleanShot !

## 🔄 Pour tester

1. Ouvrez `index.html` dans votre navigateur
2. Vous devriez voir votre fichier vidéo avec l'icône vidéo
3. La recherche et le téléchargement fonctionnent

## 📝 Types de fichiers supportés

- **Vidéos** : mp4, avi, mov (icône rouge)
- **Documents** : pdf, doc, docx  
- **Images** : jpg, png, gif
- **Audio** : mp3, wav
- **Archives** : zip, rar, 7z
- **Code** : js, html, css
