class FileDropManager {
    constructor() {
        this.files = [];
        this.filteredFiles = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadFiles();
    }

    bindEvents() {
        // Recherche
        const searchInput = document.getElementById('searchInput');
        searchInput?.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Modal
        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('downloadModal');
        modalClose?.addEventListener('click', () => this.closeModal());
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        // Escape key pour fermer la modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    async loadFiles() {
        const loadingState = document.getElementById('loadingState');
        const emptyState = document.getElementById('emptyState');
        const fileGrid = document.getElementById('fileGrid');
        
        try {
            // Simulation de chargement des fichiers
            // En production, ceci ferait appel à une API ou lirait un fichier JSON
            const files = await this.fetchFiles();
            
            this.files = files;
            this.filteredFiles = [...files];
            
            setTimeout(() => {
                loadingState.style.display = 'none';
                
                if (files.length === 0) {
                    emptyState.style.display = 'block';
                    fileGrid.style.display = 'none';
                } else {
                    emptyState.style.display = 'none';
                    fileGrid.style.display = 'grid';
                    this.renderFiles();
                }
                
                this.updateFileCount();
            }, 1000);
            
        } catch (error) {
            console.error('Erreur lors du chargement des fichiers:', error);
            loadingState.innerHTML = `
                <div class="empty-icon">
                    <i class="fas fa-exclamation-triangle" style="color: var(--error-color);"></i>
                </div>
                <h3>Erreur de chargement</h3>
                <p>Impossible de charger les fichiers. Veuillez réessayer.</p>
            `;
        }
    }

    async fetchFiles() {
        try {
            // Essayer de charger la liste automatique depuis files.json
            const response = await fetch('assets/files.json');
            if (response.ok) {
                const files = await response.json();
                console.log('✅ Fichiers chargés automatiquement depuis files.json');
                return files;
            } else {
                throw new Error('Fichier files.json non trouvé');
            }
        } catch (error) {
            console.log('⚠️ Chargement automatique échoué, utilisation de la liste manuelle');
            // Liste des fichiers réels dans le dossier assets
            // Modifiez cette liste selon vos fichiers ou utilisez le script generate-filelist.sh
            return [
                {
                    name: 'CleanShot 2025-06-12 at 17.18.34.mp4',
                    size: '6.2 MB',
                    type: 'mp4',
                    date: '2025-06-12',
                    path: 'assets/CleanShot 2025-06-12 at 17.18.34.mp4'
                }
                // Ajoutez vos autres fichiers ici au format :
                // {
                //     name: 'nom_du_fichier.extension',
                //     size: 'taille (ex: 2.4 MB)',
                //     type: 'extension',
                //     date: 'YYYY-MM-DD',
                //     path: 'assets/nom_du_fichier.extension'
                // }
            ];
        }
    }

    getFileIcon(type) {
        const icons = {
            pdf: 'fas fa-file-pdf',
            doc: 'fas fa-file-word',
            docx: 'fas fa-file-word',
            image: 'fas fa-file-image',
            jpg: 'fas fa-file-image',
            jpeg: 'fas fa-file-image',
            png: 'fas fa-file-image',
            gif: 'fas fa-file-image',
            video: 'fas fa-file-video',
            mp4: 'fas fa-file-video',
            avi: 'fas fa-file-video',
            mov: 'fas fa-file-video',
            audio: 'fas fa-file-audio',
            mp3: 'fas fa-file-audio',
            wav: 'fas fa-file-audio',
            archive: 'fas fa-file-archive',
            zip: 'fas fa-file-archive',
            rar: 'fas fa-file-archive',
            '7z': 'fas fa-file-archive',
            code: 'fas fa-file-code',
            js: 'fas fa-file-code',
            html: 'fas fa-file-code',
            css: 'fas fa-file-code',
            default: 'fas fa-file'
        };

        return icons[type] || icons.default;
    }

    getFileTypeClass(type) {
        const typeMap = {
            pdf: 'pdf',
            doc: 'doc',
            docx: 'doc',
            jpg: 'image',
            jpeg: 'image',
            png: 'image',
            gif: 'image',
            mp4: 'video',
            avi: 'video',
            mov: 'video',
            mp3: 'audio',
            wav: 'audio',
            zip: 'archive',
            rar: 'archive',
            '7z': 'archive',
            js: 'code',
            html: 'code',
            css: 'code'
        };

        return typeMap[type] || 'default';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    renderFiles() {
        const fileGrid = document.getElementById('fileGrid');
        
        fileGrid.innerHTML = this.filteredFiles.map((file, index) => {
            const icon = this.getFileIcon(file.type);
            const typeClass = this.getFileTypeClass(file.type);
            const formattedDate = this.formatDate(file.date);

            return `
                <div class="file-card fade-in" style="animation-delay: ${index * 0.1}s">
                    <i class="${icon} file-icon ${typeClass}"></i>
                    <div class="file-info">
                        <h3>${file.name}</h3>
                        <div class="file-meta">
                            <span class="file-size">${file.size}</span>
                            <span class="file-date">${formattedDate}</span>
                        </div>
                        <button class="download-btn" onclick="fileManager.downloadFile('${file.path}', '${file.name}')">
                            <i class="fas fa-download"></i>
                            Télécharger
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredFiles = [...this.files];
        } else {
            this.filteredFiles = this.files.filter(file => 
                file.name.toLowerCase().includes(searchTerm)
            );
        }
        
        this.renderFiles();
        this.updateFileCount();
        
        // Afficher/masquer l'état vide selon les résultats
        const emptyState = document.getElementById('emptyState');
        const fileGrid = document.getElementById('fileGrid');
        
        if (this.filteredFiles.length === 0 && searchTerm !== '') {
            emptyState.style.display = 'block';
            emptyState.innerHTML = `
                <div class="empty-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>Aucun résultat trouvé</h3>
                <p>Aucun fichier ne correspond à votre recherche "${query}".</p>
            `;
            fileGrid.style.display = 'none';
        } else if (this.filteredFiles.length === 0) {
            emptyState.style.display = 'block';
            emptyState.innerHTML = `
                <div class="empty-icon">
                    <i class="fas fa-folder-open"></i>
                </div>
                <h3>Aucun fichier disponible</h3>
                <p>Les fichiers seront affichés ici une fois ajoutés au dossier assets.</p>
            `;
            fileGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            fileGrid.style.display = 'grid';
        }
    }

    updateFileCount() {
        const fileCount = document.getElementById('fileCount');
        if (fileCount) {
            fileCount.textContent = this.filteredFiles.length;
        }
    }

    async downloadFile(filePath, fileName) {
        try {
            this.showModal();
            this.updateProgress(0, 'Préparation du téléchargement...');

            // Simulation de progression de téléchargement
            for (let progress = 0; progress <= 100; progress += 10) {
                await new Promise(resolve => setTimeout(resolve, 200));
                this.updateProgress(progress, `Téléchargement en cours... ${progress}%`);
            }

            // Créer un lien de téléchargement
            const link = document.createElement('a');
            link.href = filePath;
            link.download = fileName;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            this.updateProgress(100, 'Téléchargement terminé !');
            
            setTimeout(() => {
                this.closeModal();
            }, 1000);

        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
            this.updateProgress(0, 'Erreur lors du téléchargement. Veuillez réessayer.');
            
            setTimeout(() => {
                this.closeModal();
            }, 2000);
        }
    }

    showModal() {
        const modal = document.getElementById('downloadModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('downloadModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset progress
        this.updateProgress(0, 'Préparation du téléchargement...');
    }

    updateProgress(percentage, status) {
        const progressFill = document.getElementById('progressFill');
        const downloadStatus = document.getElementById('downloadStatus');
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (downloadStatus) {
            downloadStatus.textContent = status;
        }
    }
}

// Instructions pour ajouter des fichiers
class FileInstructions {
    static show() {
        console.log(`
🎯 ENGLISH TECH CAMP - FILE DROP
================================

🚀 DEUX MÉTHODES pour ajouter des fichiers :

MÉTHODE 1 - AUTOMATIQUE (Recommandée) :
1. 📁 Placez vos fichiers dans le dossier 'assets/'
2. 🔧 Exécutez : ./generate-filelist.sh
3. ✅ Le fichier files.json sera créé automatiquement !

MÉTHODE 2 - MANUELLE :
1. 📁 Placez vos fichiers dans le dossier 'assets/'
2. 📝 Modifiez la méthode 'fetchFiles()' dans js/script.js
3. ➕ Ajoutez vos fichiers à la liste avec le format :
   {
       name: 'nom_du_fichier.extension',
       size: 'taille (ex: 2.4 MB)',
       type: 'extension (pdf, doc, mp3, etc.)',
       date: 'YYYY-MM-DD',
       path: 'assets/nom_du_fichier.extension'
   }

Types de fichiers supportés :
• 📄 Documents : pdf, doc, docx
• 🖼️ Images : jpg, jpeg, png, gif
• 🎥 Vidéos : mp4, avi, mov
• 🎵 Audio : mp3, wav
• 📦 Archives : zip, rar, 7z
• 💻 Code : js, html, css

✨ Le système charge automatiquement files.json si disponible,
   sinon utilise la liste manuelle !
        `);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.fileManager = new FileDropManager();
    FileInstructions.show();
});

// Gestion du responsive et des interactions
window.addEventListener('resize', () => {
    // Ajustements responsive si nécessaire
});

// Service Worker pour la mise en cache (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
