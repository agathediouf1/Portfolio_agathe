
// generate-pdf.js
// Script pour générer un PDF ULTRA COMPLET du portfolio avec images et design professionnel

/**
 * Génère un PDF complet du portfolio
 */
function generatePortfolioPDF() {
  showToast('📄 Préparation du PDF complet...', 2000, 'success');
  
  // Vérifier si html2pdf est disponible
  if (typeof html2pdf === 'undefined') {
    console.error('html2pdf non chargé');
    loadHTML2PDF();
    return;
  }
  
  generatePDFContent();
}

/**
 * Charge la bibliothèque html2pdf
 */
function loadHTML2PDF() {
  showToast('Chargement de la bibliothèque PDF...', 1500, 'warning');
  
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
  script.onload = function() {
    setTimeout(generatePDFContent, 500);
  };
  script.onerror = function() {
    showToast('Erreur de chargement de la bibliothèque PDF', 3000, 'error');
  };
  document.head.appendChild(script);
}

/**
 * Génère le contenu complet du PDF
 */
function generatePDFContent() {
  try {
    // Récupérer toutes les données actuelles
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Créer un élément pour le PDF
    const element = document.createElement('div');
    element.innerHTML = generateCompletePDFHTML(currentDate);
    
    // Options de génération optimisées
    const options = {
      margin: [0.3, 0.3, 0.3, 0.3],
      filename: `Portfolio_Complet_Agathe_DIOUF_${currentDate.replace(/[\/:]/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 3,
        letterRendering: true,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };
    
    // Générer le PDF
    html2pdf().set(options).from(element).save()
      .then(() => {
        showToast('✅ PDF complet généré avec succès !', 3000, 'success');
      })
      .catch((error) => {
        console.error('Erreur génération PDF:', error);
        showToast('❌ Erreur lors de la génération du PDF', 3000, 'error');
      });
      
  } catch (error) {
    console.error('Erreur:', error);
    showToast('Erreur lors de la préparation du PDF', 3000, 'error');
  }
}

/**
 * Génère le HTML complet du PDF avec TOUTES les informations et images
 */
function generateCompletePDFHTML(currentDate) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Portfolio Complet - Agathe Yacine DIOUF</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
          padding: 30px;
          color: #1e293b;
          background: #ffffff;
          line-height: 1.6;
        }
        
        /* ========== COUVERTURE ========== */
        .pdf-cover {
          text-align: center;
          margin-bottom: 40px;
          padding: 50px 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          color: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }
        
        .pdf-cover::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }
        
        .pdf-cover h1 {
          font-size: 48px;
          margin-bottom: 20px;
          font-weight: 800;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          position: relative;
          z-index: 1;
        }
        
        .pdf-cover h2 {
          font-size: 24px;
          margin-bottom: 30px;
          font-weight: 400;
          opacity: 0.95;
          position: relative;
          z-index: 1;
        }
        
        .pdf-cover-badges {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin: 30px 0;
          position: relative;
          z-index: 1;
        }
        
        .pdf-cover-badge {
          background: rgba(255,255,255,0.2);
          padding: 10px 25px;
          border-radius: 50px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          font-weight: 500;
        }
        
        /* ========== EN-TÊTE ========== */
        .pdf-header {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 40px;
          padding: 30px;
          background: linear-gradient(135deg, #f8fafc, #ffffff);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
        }
        
        .pdf-header-photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #667eea;
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .pdf-header-info {
          flex: 1;
        }
        
        .pdf-header-info h1 {
          color: #1e293b;
          font-size: 32px;
          margin-bottom: 5px;
          font-weight: 700;
        }
        
        .pdf-header-info h2 {
          color: #667eea;
          font-size: 18px;
          margin-bottom: 15px;
          font-weight: 500;
        }
        
        .pdf-header-contact {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .pdf-header-contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-size: 14px;
        }
        
        /* ========== SECTIONS ========== */
        .pdf-section {
          margin-bottom: 40px;
          page-break-inside: avoid;
        }
        
        .pdf-section-title {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }
        
        .pdf-section-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .pdf-section-title h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }
        
        .pdf-section-subtitle {
          color: #64748b;
          margin-left: 65px;
          margin-top: -10px;
          margin-bottom: 20px;
        }
        
        /* ========== GRILLES ========== */
        .pdf-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
          margin-bottom: 25px;
        }
        
        .pdf-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 25px;
        }
        
        .pdf-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 25px;
        }
        
        /* ========== CARTES PROJETS ========== */
        .pdf-project-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          transition: all 0.3s;
        }
        
        .pdf-project-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-bottom: 3px solid #667eea;
        }
        
        .pdf-project-content {
          padding: 20px;
        }
        
        .pdf-project-category {
          display: inline-block;
          padding: 5px 15px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 25px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        
        .pdf-project-title {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 10px;
        }
        
        .pdf-project-desc {
          color: #64748b;
          font-size: 14px;
          margin-bottom: 15px;
          line-height: 1.5;
        }
        
        .pdf-project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 15px 0;
        }
        
        .pdf-project-tech-tag {
          background: #f1f5f9;
          color: #475569;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
        }
        
        .pdf-project-link {
          display: inline-block;
          color: #667eea;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          margin-top: 10px;
        }
        
        /* ========== CARTES COMPÉTENCES ========== */
        .pdf-skill-card {
          background: white;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
        }
        
        .pdf-skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .pdf-skill-name {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
        }
        
        .pdf-skill-level {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }
        
        .pdf-skill-level.debutant { background: #22c55e20; color: #22c55e; }
        .pdf-skill-level.intermediaire { background: #eab30820; color: #eab308; }
        .pdf-skill-level.avance { background: #ef444420; color: #ef4444; }
        
        .pdf-skill-category {
          color: #94a3b8;
          font-size: 12px;
          margin-bottom: 15px;
        }
        
        .pdf-skill-progress {
          height: 8px;
          background: #f1f5f9;
          border-radius: 10px;
          overflow: hidden;
          margin: 15px 0 8px;
        }
        
        .pdf-skill-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 10px;
        }
        
        .pdf-skill-percent {
          text-align: right;
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
        }
        
        /* ========== EXPÉRIENCES ========== */
        .pdf-exp-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          margin-bottom: 20px;
          border-left: 5px solid #667eea;
        }
        
        .pdf-exp-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 10px;
        }
        
        .pdf-exp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 15px;
          color: #64748b;
          font-size: 14px;
        }
        
        .pdf-exp-meta i {
          color: #667eea;
          margin-right: 5px;
        }
        
        .pdf-exp-desc {
          color: #475569;
          line-height: 1.7;
        }
        
        /* ========== FORMATION (TIMELINE) ========== */
        .pdf-timeline {
          position: relative;
          padding: 20px 0;
        }
        
        .pdf-timeline::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, #667eea, #764ba2);
          opacity: 0.3;
        }
        
        .pdf-timeline-item {
          position: relative;
          padding-left: 60px;
          margin-bottom: 35px;
        }
        
        .pdf-timeline-dot {
          position: absolute;
          left: 11px;
          top: 5px;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .pdf-timeline-date {
          display: inline-block;
          padding: 5px 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .pdf-timeline-content {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
        }
        
        .pdf-timeline-content h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 10px;
        }
        
        .pdf-timeline-location {
          color: #667eea;
          font-size: 14px;
          margin-bottom: 15px;
        }
        
        /* ========== CONTACT ========== */
        .pdf-contact {
          background: linear-gradient(135deg, #f8fafc, #ffffff);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid #e2e8f0;
        }
        
        .pdf-contact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }
        
        .pdf-contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .pdf-contact-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
        }
        
        .pdf-contact-info h4 {
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 5px;
        }
        
        .pdf-contact-info p {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }
        
        /* ========== STATISTIQUES ========== */
        .pdf-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin: 30px 0;
        }
        
        .pdf-stat-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
        }
        
        .pdf-stat-number {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.2;
        }
        
        .pdf-stat-label {
          color: #64748b;
          font-size: 14px;
          margin-top: 10px;
        }
        
        /* ========== OBJECTIF ========== */
        .pdf-objective {
          background: linear-gradient(135deg, #667eea10, #764ba210);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          border: 1px dashed #667eea;
          margin: 30px 0;
        }
        
        .pdf-objective p {
          font-size: 18px;
          color: #1e293b;
          font-style: italic;
          max-width: 800px;
          margin: 0 auto;
        }
        
        /* ========== FOOTER ========== */
        .pdf-footer {
          margin-top: 50px;
          padding: 30px;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border-radius: 20px;
          color: white;
          text-align: center;
        }
        
        .pdf-footer p {
          opacity: 0.9;
          margin: 5px 0;
          font-size: 14px;
        }
        
        /* ========== BADGES ========== */
        .pdf-badge {
          display: inline-block;
          padding: 5px 15px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 25px;
          font-size: 12px;
          font-weight: 600;
        }
        
        /* ========== SÉPARATEURS ========== */
        .pdf-divider {
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
          margin: 30px 0;
          border-radius: 3px;
        }
        
        /* ========== ANIMATIONS ========== */
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* ========== PAGE BREAK ========== */
        .page-break {
          page-break-before: always;
        }
      </style>
    </head>
    <body>
      ${generateCover(currentDate)}
      ${generateHeaderWithPhoto()}
      ${generateFormationSection()}
      ${generateProjectsSection()}
      ${generateSkillsSection()}
      ${generateExperiencesSection()}
      ${generateContactSection()}
      ${generateStatsSection()}
      ${generateObjectiveSection()}
      ${generateFooter()}
    </body>
    </html>
  `;
}

/**
 * Génère la couverture du PDF
 */
function generateCover(currentDate) {
  return `
    <div class="pdf-cover">
      <h1>Agathe Yacine DIOUF</h1>
      <h2>Future Géomaticienne & Développeuse web</h2>
      <div class="pdf-cover-badges">
        <span class="pdf-cover-badge">🎓 Licence 2 Géomatique</span>
        <span class="pdf-cover-badge">💻 6+ Projets</span>
        <span class="pdf-cover-badge">📍 Thiès, Sénégal</span>
      </div>
      <p style="opacity: 0.9; margin-top: 30px;">Portfolio complet généré le ${currentDate}</p>
    </div>
  `;
}

/**
 * Génère l'en-tête avec photo
 */
function generateHeaderWithPhoto() {
  // Essayer de récupérer la photo de profil
  const photoSrc = document.querySelector('.hero-avatar')?.src || 'agathe.JPEG.jpeg';
  
  return `
    <div class="pdf-header">
      <img src="${photoSrc}" alt="Photo de profil" class="pdf-header-photo" crossorigin="anonymous">
      <div class="pdf-header-info">
        <h1>Agathe Yacine DIOUF</h1>
        <h2>Étudiante en Licence 2 Géomatique</h2>
        <div class="pdf-header-contact">
          <span class="pdf-header-contact-item"><span>📧</span> agathe.diouf@email.com</span>
          <span class="pdf-header-contact-item"><span>📱</span> +221 77 XXX XX XX</span>
          <span class="pdf-header-contact-item"><span>📍</span> Thiès, Sénégal</span>
          <span class="pdf-header-contact-item"><span>🔗</span> linkedin.com/in/agathe-diouf</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Génère la section formation avec images
 */
function generateFormationSection() {
  return `
    <div class="pdf-section">
      <div class="pdf-section-title">
        <div class="pdf-section-icon">🎓</div>
        <h3>Formation académique</h3>
      </div>
      
      <div class="pdf-timeline">
        <div class="pdf-timeline-item">
          <div class="pdf-timeline-dot"></div>
          <span class="pdf-timeline-date">2025 - 2026</span>
          <div class="pdf-timeline-content">
            <h4>Licence 2 en Géomatique</h4>
            <div class="pdf-timeline-location">🏛️ Université Iba Der Thiam de Thiès</div>
            <p>Formation en systèmes d'information géographique (SIG), cartographie numérique, télédétection et analyse spatiale.</p>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
              <span class="pdf-badge">SIG</span>
              <span class="pdf-badge">Cartographie</span>
              <span class="pdf-badge">Télédétection</span>
              
              
            </div>
          </div>
        </div>
        
        <div class="pdf-timeline-item">
          <div class="pdf-timeline-dot"></div>
          <span class="pdf-timeline-date">2024 - 2025</span>
          <div class="pdf-timeline-content">
            <h4>Licence 1 en Géomatique</h4>
            <div class="pdf-timeline-location">🏛️ Université Iba Der Thiam de Thiès</div>
            <p>Première année de licence avec des bases solides en informatique, programmation...</p>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
              <span class="pdf-badge">informatique</span>
              <span class="pdf-badge">Programmation</span>
              
            </div>
          </div>
        </div>
        
        <div class="pdf-timeline-item">
          <div class="pdf-timeline-dot"></div>
          <span class="pdf-timeline-date">2024</span>
          <div class="pdf-timeline-content">
            <h4>Baccalauréat Série S2</h4>
            <div class="pdf-timeline-location">🏛️ Lycée de Niakhar</div>
            <p>Obtention du Baccalauréat scientifique, spécialisation en mathématiques et sciences physiques.</p>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
              <span class="pdf-badge">Mathématiques</span>
              <span class="pdf-badge">Physique</span>
              <span class="pdf-badge">Chimie</span>
       
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Génère la section projets avec images
 */
function generateProjectsSection() {
  if (typeof projects === 'undefined' || !projects || projects.length === 0) {
    return `
      <div class="pdf-section">
        <div class="pdf-section-title">
          <div class="pdf-section-icon">🚀</div>
          <h3>Projets</h3>
        </div>
        <p style="color: #94a3b8;">Aucun projet disponible pour le moment.</p>
      </div>
    `;
  }
  
  let projectsHTML = '';
  
  projects.forEach(project => {
    const imageSrc = project.image || 'https://via.placeholder.com/600x400/667eea/ffffff?text=Projet';
    
    projectsHTML += `
      <div class="pdf-project-card">
        <img src="${imageSrc}" alt="${project.title}" class="pdf-project-image" crossorigin="anonymous" onerror="this.src='https://via.placeholder.com/600x400/667eea/ffffff?text=Projet'">
        <div class="pdf-project-content">
          <span class="pdf-project-category">${project.category || 'Non catégorisé'}</span>
          <h4 class="pdf-project-title">${project.title || 'Sans titre'}</h4>
          <p class="pdf-project-desc">${project.description || 'Description non disponible'}</p>
          <div class="pdf-project-tech">
            ${project.technologies ? project.technologies.map(tech => `<span class="pdf-project-tech-tag">${tech}</span>`).join('') : '<span class="pdf-project-tech-tag">Non spécifié</span>'}
          </div>
          ${project.link ? `<a href="${project.link}" class="pdf-project-link">🔗 Voir le projet</a>` : ''}
        </div>
      </div>
    `;
  });
  
  return `
    <div class="pdf-section">
      <div class="pdf-section-title">
        <div class="pdf-section-icon">🚀</div>
        <h3>Projets réalisés (${projects.length})</h3>
      </div>
      <div class="pdf-grid-2">
        ${projectsHTML}
      </div>
    </div>
  `;
}

/**
 * Génère la section compétences
 */
function generateSkillsSection() {
  if (typeof skills === 'undefined' || !skills || skills.length === 0) {
    return `
      <div class="pdf-section">
        <div class="pdf-section-title">
          <div class="pdf-section-icon">💡</div>
          <h3>Compétences techniques</h3>
        </div>
        <p style="color: #94a3b8;">Aucune compétence disponible pour le moment.</p>
      </div>
    `;
  }
  
  let skillsHTML = '';
  
  skills.forEach(skill => {
    const levelClass = skill.level === 'Débutant' ? 'debutant' : (skill.level === 'Intermédiaire' ? 'intermediaire' : 'avance');
    
    skillsHTML += `
      <div class="pdf-skill-card">
        <div class="pdf-skill-header">
          <span class="pdf-skill-name">${skill.name || 'Non nommé'}</span>
          <span class="pdf-skill-level ${levelClass}">${skill.level || 'Non défini'}</span>
        </div>
        <div class="pdf-skill-category">${skill.category || 'Général'}</div>
        <div class="pdf-skill-progress">
          <div class="pdf-skill-progress-bar" style="width: ${skill.percent || 0}%;"></div>
        </div>
        <div class="pdf-skill-percent">${skill.percent || 0}% maîtrise</div>
      </div>
    `;
  });
  
  return `
    <div class="pdf-section">
      <div class="pdf-section-title">
        <div class="pdf-section-icon">💡</div>
        <h3>Compétences techniques (${skills.length})</h3>
      </div>
      <div class="pdf-grid-3">
        ${skillsHTML}
      </div>
    </div>
  `;
}

/**
 * Génère la section expériences
 */
function generateExperiencesSection() {
  if (typeof experiences === 'undefined' || !experiences || experiences.length === 0) {
    return `
      <div class="pdf-section">
        <div class="pdf-section-title">
          <div class="pdf-section-icon">📚</div>
          <h3>Expériences</h3>
        </div>
        <p style="color: #94a3b8;">Aucune expérience disponible pour le moment.</p>
      </div>
    `;
  }
  
  let experiencesHTML = '';
  
  experiences.forEach(exp => {
    experiencesHTML += `
      <div class="pdf-exp-card">
        <h4 class="pdf-exp-title">${exp.title || 'Sans titre'}</h4>
        <div class="pdf-exp-meta">
          <span><span>🏢</span> ${exp.organisation || 'Non spécifié'}</span>
          <span><span>📅</span> ${exp.date || 'Non spécifié'}</span>
          ${exp.location ? `<span><span>📍</span> ${exp.location}</span>` : ''}
        </div>
        <p class="pdf-exp-desc">${exp.description || 'Description non disponible'}</p>
      </div>
    `;
  });
  
  return `
    <div class="pdf-section">
      <div class="pdf-section-title">
        <div class="pdf-section-icon">📚</div>
        <h3>Expériences (${experiences.length})</h3>
      </div>
      ${experiencesHTML}
    </div>
  `;
}

/**
 * Génère la section contact
 */
function generateContactSection() {
  return `
    <div class="pdf-section">
      <div class="pdf-section-title">
        <div class="pdf-section-icon">📧</div>
        <h3>Contact & Réseaux</h3>
      </div>
      <div class="pdf-contact">
        <div class="pdf-contact-grid">
          <div class="pdf-contact-item">
            <div class="pdf-contact-icon">📧</div>
            <div class="pdf-contact-info">
              <h4>Email</h4>
              <p>agathe.diouf@email.com</p>
            </div>
          </div>
          <div class="pdf-contact-item">
            <div class="pdf-contact-icon">📱</div>
            <div class="pdf-contact-info">
              <h4>Téléphone</h4>
              <p>+221 77 XXX XX XX</p>
            </div>
          </div>
          <div class="pdf-contact-item">
            <div class="pdf-contact-icon">📍</div>
            <div class="pdf-contact-info">
              <h4>Adresse</h4>
              <p>Thiès, Sénégal</p>
            </div>
          </div>
          <div class="pdf-contact-item">
            <div class="pdf-contact-icon">🔗</div>
            <div class="pdf-contact-info">
              <h4>LinkedIn</h4>
              <p>linkedin.com/in/agathe-diouf</p>
            </div>
          </div>
          <div class="pdf-contact-item">
            <div class="pdf-contact-icon">💻</div>
            <div class="pdf-contact-info">
              <h4>GitHub</h4>
              <p>github.com/agathe</p>
            </div>
          </div>
          <div class="pdf-contact-item">
            <div class="pdf-contact-icon">🌐</div>
            <div class="pdf-contact-info">
              <h4>Portfolio</h4>
              <p>agathe-portfolio.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Génère les statistiques
 */
function generateStatsSection() {
  const totalProjects = typeof projects !== 'undefined' ? projects.length : 0;
  const totalSkills = typeof skills !== 'undefined' ? skills.length : 0;
  const totalExperiences = typeof experiences !== 'undefined' ? experiences.length : 0;
  
  return `
    <div class="pdf-stats">
      <div class="pdf-stat-card">
        <div class="pdf-stat-number">${totalProjects}</div>
        <div class="pdf-stat-label">Projets réalisés</div>
      </div>
      <div class="pdf-stat-card">
        <div class="pdf-stat-number">${totalSkills}</div>
        <div class="pdf-stat-label">Compétences</div>
      </div>
      <div class="pdf-stat-card">
        <div class="pdf-stat-number">${totalExperiences}</div>
        <div class="pdf-stat-label">Expériences</div>
      </div>
      <div class="pdf-stat-card">
        <div class="pdf-stat-number">2+</div>
        <div class="pdf-stat-label">Années d'études</div>
      </div>
    </div>
  `;
}

/**
 * Génère la section objectif
 */
function generateObjectiveSection() {
  return `
    <div class="pdf-objective">
      <p>🎯 "Je recherche un stage en développement web ou géomatique pour mettre en pratique mes compétences et contribuer à des projets innovants alliant technologie et données géospatiales."</p>
    </div>
  `;
}

/**
 * Génère le footer
 */
function generateFooter() {
  return `
    <div class="pdf-footer">
      <p>© ${new Date().getFullYear()} Agathe Yacine DIOUF - Portfolio complet</p>
      <p>Document généré automatiquement - Toutes les informations sont à jour</p>
      <p style="margin-top: 15px; font-size: 12px;">✨ Ce document contient l'intégralité du portfolio avec toutes les images, projets, compétences et expériences</p>
    </div>
  `;
}
