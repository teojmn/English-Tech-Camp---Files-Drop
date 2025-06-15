#!/bin/bash

echo "🎯 English Tech Camp - File Drop Simple"
echo "====================================="
echo ""

echo "📁 Fichiers dans assets/ :"
if [ -d "assets" ]; then
    ls -1 assets/ 2>/dev/null || echo "  Aucun fichier"
else
    echo "  Dossier assets/ introuvable"
fi

echo ""
echo "📂 Structure du site :"
echo "  📄 index.html       (page principale)"
echo "  🎨 css/style.css    (design)" 
echo "  ⚙️  js/script.js     (logique)"
echo "  📁 assets/          (vos fichiers)"
echo ""

echo "🚀 AJOUTER DES FICHIERS :"
echo ""
echo "1. 📁 Placez vos fichiers dans assets/"
echo "2. 📝 Ouvrez js/script.js"
echo "3. 🔍 Trouvez 'const fileList = [' (ligne ~77)"
echo "4. ➕ Ajoutez vos fichiers :"
echo ""
echo "   const fileList = ["
echo "       'The Last Office 1.3.zip',"
echo "       'votre_nouveau_fichier.pdf',"  
echo "   ];"
echo ""
echo "5. 💾 Sauvegardez"
echo ""

echo "✅ Site 100% statique !"
echo "🌐 Prêt pour GitHub Pages, Netlify, etc."
echo ""
echo "📖 Plus d'infos : cat README.md"
