#!/bin/bash

# Script pour générer automatiquement la liste des fichiers
# Usage: ./generate-filelist.sh

ASSETS_DIR="assets"
OUTPUT_FILE="assets/files.json"

echo "Génération de la liste des fichiers..."

# Début du fichier JSON
echo '[' > "$OUTPUT_FILE"

first=true

# Parcourir tous les fichiers dans le dossier assets
for file in "$ASSETS_DIR"/*; do
    if [ -f "$file" ] && [ "$(basename "$file")" != "files.json" ]; then
        filename=$(basename "$file")
        filesize=$(du -h "$file" | cut -f1)
        extension="${filename##*.}"
        extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
        
        # Date de modification du fichier
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            filedate=$(stat -f "%Sm" -t "%Y-%m-%d" "$file")
        else
            # Linux
            filedate=$(stat -c "%y" "$file" | cut -d' ' -f1)
        fi
        
        # Ajouter une virgule si ce n'est pas le premier fichier
        if [ "$first" = false ]; then
            echo ',' >> "$OUTPUT_FILE"
        fi
        first=false
        
        # Ajouter l'entrée JSON (sans heredoc pour éviter les problèmes)
        echo "    {" >> "$OUTPUT_FILE"
        echo "        \"name\": \"$filename\"," >> "$OUTPUT_FILE"
        echo "        \"size\": \"$filesize\"," >> "$OUTPUT_FILE"
        echo "        \"type\": \"$extension\"," >> "$OUTPUT_FILE"
        echo "        \"date\": \"$filedate\"," >> "$OUTPUT_FILE"
        echo "        \"path\": \"$file\"" >> "$OUTPUT_FILE"
        echo -n "    }" >> "$OUTPUT_FILE"
    fi
done

# Fin du fichier JSON
echo '' >> "$OUTPUT_FILE"
echo ']' >> "$OUTPUT_FILE"

echo "Liste des fichiers générée dans $OUTPUT_FILE"
