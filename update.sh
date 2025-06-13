#!/bin/bash
echo "�� Mise à jour de la liste des fichiers..."
./generate-filelist.sh
echo "✅ Liste des fichiers mise à jour !"
if [ -f "assets/files.json" ]; then
    echo "📄 Fichiers détectés:"
    cat assets/files.json | grep "name" | cut -d'"' -f4
fi
