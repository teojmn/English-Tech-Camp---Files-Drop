#!/bin/zsh

# Script de maintenance pour English Tech Camp File Drop
# Usage: ./maintenance.sh [action]

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

show_help() {
    echo "${BLUE}🎯 English Tech Camp - Script de maintenance${NC}"
    echo ""
    echo "Usage: ./maintenance.sh [action]"
    echo ""
    echo "Actions disponibles:"
    echo "  ${GREEN}update${NC}     - Met à jour la liste des fichiers automatiquement"
    echo "  ${GREEN}list${NC}       - Affiche la liste des fichiers actuels"
    echo "  ${GREEN}clean${NC}      - Nettoie les fichiers temporaires"
    echo "  ${GREEN}serve${NC}      - Lance un serveur local pour tester"
    echo "  ${GREEN}check${NC}      - Vérifie l'intégrité du projet"
    echo "  ${GREEN}help${NC}       - Affiche cette aide"
    echo ""
}

update_files() {
    echo "${BLUE}🔄 Mise à jour de la liste des fichiers...${NC}"
    
    # Exécuter le script de génération
    ./generate-filelist.sh
    
    # Afficher le résultat
    if [ -f "assets/files.json" ]; then
        echo "${GREEN}✅ Liste mise à jour avec succès !${NC}"
        echo "${YELLOW}📁 Fichiers détectés :${NC}"
        
        # Afficher les fichiers trouvés
        if command -v jq &> /dev/null; then
            jq -r '.[] | "  - \(.name) (\(.size))"' assets/files.json
        else
            echo "  (installez jq pour voir les détails : brew install jq)"
            echo "  Consultez assets/files.json pour voir la liste"
        fi
    else
        echo "${RED}❌ Erreur lors de la génération de files.json${NC}"
    fi
}

list_files() {
    echo "${BLUE}📁 Fichiers dans le dossier assets :${NC}"
    echo ""
    
    if [ -d "assets" ]; then
        ls -la assets/ | grep -v "^d" | tail -n +2 | while read -r line; do
            filename=$(echo "$line" | awk '{print $9}')
            size=$(echo "$line" | awk '{print $5}')
            if [ "$filename" != "files.json" ] && [ -n "$filename" ]; then
                echo "  ${GREEN}✓${NC} $filename ($(numfmt --to=iec $size))"
            fi
        done
    else
        echo "${RED}❌ Dossier assets introuvable${NC}"
    fi
    
    echo ""
    
    if [ -f "assets/files.json" ]; then
        echo "${YELLOW}📄 Fichiers configurés dans files.json :${NC}"
        if command -v jq &> /dev/null; then
            jq -r '.[] | "  - \(.name) (\(.size))"' assets/files.json
        else
            echo "  (installez jq pour voir les détails)"
        fi
    else
        echo "${YELLOW}⚠️  Aucun fichier files.json trouvé${NC}"
    fi
}

clean_files() {
    echo "${BLUE}🧹 Nettoyage des fichiers temporaires...${NC}"
    
    # Supprimer les fichiers temporaires
    find . -name ".DS_Store" -delete 2>/dev/null || true
    find . -name "*.tmp" -delete 2>/dev/null || true
    find . -name "*.log" -delete 2>/dev/null || true
    
    echo "${GREEN}✅ Nettoyage terminé${NC}"
}

serve_local() {
    echo "${BLUE}🚀 Lancement du serveur local...${NC}"
    echo "${YELLOW}➡️  Votre site sera disponible sur : http://localhost:8000${NC}"
    echo "${YELLOW}➡️  Appuyez sur Ctrl+C pour arrêter${NC}"
    echo ""
    
    # Essayer différentes méthodes pour servir le site
    if command -v python3 &> /dev/null; then
        python3 -m http.server 8000
    elif command -v python &> /dev/null; then
        python -m SimpleHTTPServer 8000
    elif command -v php &> /dev/null; then
        php -S localhost:8000
    elif command -v node &> /dev/null && command -v npx &> /dev/null; then
        npx serve -p 8000
    else
        echo "${RED}❌ Aucun serveur disponible. Installez Python, PHP ou Node.js${NC}"
        exit 1
    fi
}

check_integrity() {
    echo "${BLUE}🔍 Vérification de l'intégrité du projet...${NC}"
    echo ""
    
    # Vérifier les fichiers essentiels
    files_to_check=("index.html" "css/style.css" "js/script.js" "generate-filelist.sh")
    
    for file in "${files_to_check[@]}"; do
        if [ -f "$file" ]; then
            echo "${GREEN}✅${NC} $file"
        else
            echo "${RED}❌${NC} $file (manquant)"
        fi
    done
    
    echo ""
    
    # Vérifier le dossier assets
    if [ -d "assets" ]; then
        echo "${GREEN}✅${NC} Dossier assets/ existe"
        
        # Compter les fichiers
        file_count=$(find assets/ -type f ! -name "files.json" | wc -l | tr -d ' ')
        if [ "$file_count" -gt 0 ]; then
            echo "${GREEN}✅${NC} $file_count fichier(s) trouvé(s) dans assets/"
        else
            echo "${YELLOW}⚠️${NC}  Aucun fichier dans assets/ (ajoutez vos fichiers)"
        fi
    else
        echo "${RED}❌${NC} Dossier assets/ manquant"
    fi
    
    # Vérifier la configuration
    if [ -f "assets/files.json" ]; then
        echo "${GREEN}✅${NC} Configuration files.json existe"
        
        # Vérifier si c'est du JSON valide
        if command -v jq &> /dev/null; then
            if jq empty assets/files.json 2>/dev/null; then
                echo "${GREEN}✅${NC} JSON valide"
            else
                echo "${RED}❌${NC} JSON invalide dans files.json"
            fi
        fi
    else
        echo "${YELLOW}⚠️${NC}  Aucun fichier files.json (lancez ./maintenance.sh update)"
    fi
    
    echo ""
    echo "${BLUE}📊 Résumé :${NC}"
    echo "  - Projet : English Tech Camp File Drop"
    echo "  - Status : Opérationnel"
    echo "  - Fichiers : $file_count dans assets/"
    echo "  - URL locale : file://$(pwd)/index.html"
}

# Script principal
case "${1:-help}" in
    "update")
        update_files
        ;;
    "list")
        list_files
        ;;
    "clean")
        clean_files
        ;;
    "serve")
        serve_local
        ;;
    "check")
        check_integrity
        ;;
    "help"|*)
        show_help
        ;;
esac
