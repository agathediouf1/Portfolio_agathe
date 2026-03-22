// ============================
// DONNÉES INITIALES EN MÉMOIRE
// ============================

/**
 * Collection des projets du portfolio
 * @type {Array<Object>}
 */
let projects = [
  {
    id: 1,                                      // Identifiant unique
    title: "Carte interactive de Niakhar",      // Titre du projet
    category: "cartographie",                    // Catégorie pour filtrage
    description: "Application web affichant une carte interactive des Villages et infrastructures de la commune de Niakhar.",
    technologies: ["HTML", "CSS", "JavaScript", "Leaflet"], // Technologies utilisées
    link: "CARTE.html",                          // Lien vers le projet
    image: "localition.jpg.jpeg"                  // Image d'aperçu
  },
  {
    id: 2,
    title: "Projet Analyse 3",
    category: "Projet",
    description: "Projet developper sur Qualite de l'air .",
    technologies: ["Rstudio"],
    link: "projet analyse 3.pdf",
    image: "LOGO R.jpg.jpeg"
  },
  {
    id: 3,
    title: "Portfolio web personnel",
    category: "web",
    description: "Portfolio statique présentant les compétences, projets et coordonnées d'un étudiant en informatique.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "cv.html",
    image: "image_cv.PNG"
  },
  {
    id: 4,
    title: "site web",
    category: "site web",
    description: "site web sur Agriculture, Élevage & Pêche au Sénégal.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "site.html",
    image: "agricole.jpg.jpeg"
  },
  {
    id: 4,
    title: "Projet",
    category: "Rapport",
    description: "PROJET DU TRAFIC ROUTIER DANS LA VILLE DE THIES.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "PROJET_Ndoncky 2025 (1).pdf",
    image: "rond_point.PNG"
  },
   {
    id: 4,
    title: "Cartes realisees en classe",
    category: "Cartothéque",
    description: "Decouvrer nos collections de cartes.",
    technologies: ["QGIS"],
    link: "cartotheque.html",
    image: "CARTE DE NIAKHAR.png"
  }
];

/**
 * Collection des compétences avec niveaux de maîtrise
 * @type {Array<Object>}
 */
let skills = [
  { id: 1, name: "HTML", level: "Intermédiaire", percent: 85, category: "Web" },
  { id: 2, name: "CSS3 / Design responsive", level: "Intermédiaire", percent: 75, category: "Web" },
  { id: 3, name: "JavaScript (DOM, ES6+)", level: "Intermédiaire", percent: 70, category: "Web" },
  { id: 4, name: "Cartographie SIG", level: "Avancé", percent: 80, category: "Géomatique" },
  { id: 5, name: "Analyse de données", level: "Intermédiaire", percent: 65, category: "Données" }
];

/**
 * Collection des expériences professionnelles/académiques
 * @type {Array<Object>}
 */
let experiences = [
  {
    id: 1,
    title: "Projet tutoré de cartographie",
    organisation: "Université Iba Der Thiam de Thiès",
    date: "2025 - 2026",
    location: "Thiès, Sénégal",
    description: "Réalisation d'une carte thématique pour analyser la répartition spatiale de données géographiques."
  }
];

// ============================
// CONFIGURATION RÉSEAUX SOCIAUX
// ============================
const socialLinks = {
  linkedin: "https://www.linkedin.com/in/agathe-diouf-361a593b6/",
  github: "https://github.com/",
  twitter: "https://mail.google.com/mail/u/0/?hl=fr#inbox"
};

// ============================
// FONCTIONS UTILITAIRES
// ============================

/**
 * Affiche une notification temporaire (toast)
 * @param {string} message - Message à afficher
 * @param {number} duration - Durée d'affichage en ms (défaut: 3000)
 * @param {string} type - Type de notification (success, warning, error)
 */
function showToast(message, duration = 3000, type = 'success') {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  
  toast.textContent = message;
  toast.className = 'toast-notification show';
  if (type === 'warning') toast.classList.add('warning');
  if (type === 'error') toast.classList.add('error');
  
  // Disparition automatique après duration ms
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/**
 * Affiche un message de remerciement animé après envoi du formulaire
 */
function showThankYouMessage() {
  const thankYouMsg = document.getElementById('thank-you-message');
  if (!thankYouMsg) return;
  
  thankYouMsg.classList.add('show');
  
  // Fermeture automatique après 5 secondes
  setTimeout(() => {
    thankYouMsg.classList.remove('show');
  }, 5000);
  
  // Fermeture au clic sur la modale
  thankYouMsg.addEventListener('click', function(e) {
    if (e.target === thankYouMsg) {
      thankYouMsg.classList.remove('show');
    }
  });
}

/**
 * Ouvre le lien du réseau social sélectionné
 * @param {string} platform - Plateforme sociale (linkedin, github, twitter)
 */
window.openSocial = function(platform) {
  if (socialLinks[platform]) {
    window.open(socialLinks[platform], '_blank');
    showToast(`Ouverture de ${platform}`);
  } else {
    showToast(`Lien ${platform} non configuré`, 3000, 'warning');
  }
};

/**
 * Initialise le contrôle de l'animation du background défilant
 * Pause l'animation quand la page n'est pas visible
 * Ralentit l'animation pendant le scroll
 */
function initBackgroundControl() {
  const track = document.querySelector('.sliding-track');
  if (!track) return;
  
  // Pause l'animation quand la page n'est pas visible (économie de ressources)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      track.style.animationPlayState = 'paused';
    } else {
      track.style.animationPlayState = 'running';
    }
  });
  
  // Ralentir l'animation au scroll pour améliorer les performances
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    track.style.animationDuration = '60s'; // Ralentissement
    
    // Retour à la vitesse normale après 1s sans scroll
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      track.style.animationDuration = '40s';
    }, 1000);
  }, { passive: true });
}

/**
 * Génère le prochain ID disponible pour une collection
 * @param {Array} collection - Tableau d'objets avec propriété id
 * @returns {number} Prochain ID disponible
 */
function getNextId(collection) {
  return collection.length ? Math.max(...collection.map((item) => item.id)) + 1 : 1;
}

// ============================
// RENDU DES PROJETS
// ============================

const projectsGrid = document.getElementById("projects-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

/**
 * Affiche les projets dans la grille selon le filtre sélectionné
 * @param {string} filter - Catégorie de filtre ("all" ou catégorie spécifique)
 */
function renderProjects(filter = "all") {
  if (!projectsGrid) return;

  // Filtrage des projets selon la catégorie
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // Gestion du cas où aucun projet ne correspond
  if (!filtered.length) {
    projectsGrid.innerHTML = `<div class="col-12"><p class="text-center text-muted">Aucun projet pour cette catégorie.</p></div>`;
    return;
  }

  // Génération du HTML pour chaque projet
  projectsGrid.innerHTML = filtered
    .map(
      (p) => `
      <div class="col-md-6 col-lg-4">
        <article class="project-card">
          <span class="project-badge">${p.category}</span>
          <img src="${p.image || "https://via.placeholder.com/600x300.png?text=Projet"}" alt="${p.title}">
          <div class="project-body">
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.description}</p>
            <p class="project-tech"><strong>Technologies :</strong> ${p.technologies.join(", ")}</p>
            <div class="d-flex justify-content-between align-items-center">
              <a href="${p.link || "#"}" target="_blank" class="btn btn-sm btn-outline-light">
                <i class="bi bi-box-arrow-up-right"></i> Voir
              </a>
              <button class="btn btn-sm btn-outline-primary" onclick="openEditProject(${p.id})">
                <i class="bi bi-pencil-square"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    `
    )
    .join("");
}

// Gestion des filtres projets (événements au clic)
if (filterButtons.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active")); // Désactive tous les filtres
      btn.classList.add("active"); // Active le filtre cliqué
      const cat = btn.dataset.category;
      renderProjects(cat);
    });
  });
}

// ============================
// RENDU DES COMPÉTENCES
// ============================

const skillsGrid = document.getElementById("skills-grid");
const skillFilterBtns = document.querySelectorAll("#skill-filter-bar .filter-btn");

/**
 * Affiche les compétences dans la grille selon le filtre sélectionné
 * @param {string} category - Catégorie de filtre ("all" ou catégorie spécifique)
 */
function renderSkills(category = "all") {
  if (!skillsGrid) return;

  // Filtrage des compétences selon la catégorie
  const filtered = category === "all" ? skills : skills.filter((s) => s.category === category);

  if (!filtered.length) {
    skillsGrid.innerHTML = `<div class="col-12"><p class="text-center text-muted">Aucune compétence pour cette catégorie.</p></div>`;
    return;
  }

  // Génération du HTML pour chaque compétence
  skillsGrid.innerHTML = filtered
    .map((s) => {
      // Détermination de la classe CSS selon le niveau
      let levelClass = '';
      if (s.level === 'Débutant') levelClass = 'bg-success bg-opacity-25 text-success';
      else if (s.level === 'Intermédiaire') levelClass = 'bg-warning bg-opacity-25 text-warning';
      else if (s.level === 'Avancé') levelClass = 'bg-danger bg-opacity-25 text-danger';
      
      return `
      <div class="col-md-6 col-lg-4">
        <article class="skill-card">
          <div class="skill-header">
            <span class="skill-name">${s.name}</span>
            <span class="skill-level ${levelClass}">${s.level}</span>
          </div>
          <p class="skill-category">${s.category || "Non catégorisé"}</p>
          <div class="skill-progress">
            <div class="skill-progress-bar" style="width: ${s.percent}%"></div>
          </div>
          <div class="mt-2 d-flex justify-content-between align-items-center">
            <span class="text-muted" style="font-size:0.8rem;">${s.percent}% maîtrise</span>
            <button class="btn btn-sm btn-outline-primary" onclick="openEditSkill(${s.id})">
              <i class="bi bi-pencil-square"></i>
            </button>
          </div>
        </article>
      </div>
    `}).join("");
}

// Gestion des filtres compétences
if (skillFilterBtns.length) {
  skillFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      skillFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.category;
      renderSkills(cat);
    });
  });
}

// ============================
// RENDU DES EXPÉRIENCES
// ============================

const experienceList = document.getElementById("experience-list");

/**
 * Affiche la liste des expériences professionnelles/académiques
 */
function renderExperiences() {
  if (!experienceList) return;

  if (experiences.length === 0) {
    experienceList.innerHTML = `<p class="text-center text-muted">Aucune expérience pour le moment.</p>`;
    return;
  }

  // Génération du HTML pour chaque expérience
  experienceList.innerHTML = experiences
    .map(
      (e) => `
      <article class="experience-item">
        <h3 class="exp-title">${e.title}</h3>
        <p class="exp-meta">
          <i class="bi bi-building"></i> ${e.organisation} &bull; 
          <i class="bi bi-calendar"></i> ${e.date} 
          ${e.location ? " &bull; <i class='bi bi-geo-alt'></i> " + e.location : ""}
        </p>
        <p class="exp-desc">${e.description}</p>
        <div class="text-end">
          <button class="btn btn-sm btn-outline-primary" onclick="openEditExp(${e.id})">
            <i class="bi bi-pencil-square"></i> Modifier
          </button>
        </div>
      </article>
    `
    )
    .join("");
}

// ============================
// THÈME CLAIR/SOMBRE
// ============================

/**
 * Initialise le toggle de changement de thème (clair/sombre)
 * Sauvegarde la préférence dans localStorage
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  if (!themeToggle) return;
  
  // Récupération du thème sauvegardé ou utilisation du thème sombre par défaut
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  
  // Gestion du clic sur le toggle
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Sauvegarde du choix
    
    // Animation de transition
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
    
    showToast(`Thème ${newTheme} activé`);
  });
}

// ============================
// MODALES & FORMULAIRES
// ============================

let projectModal, skillModal, expModal; // Variables pour les instances des modales Bootstrap

/**
 * Initialisation au chargement du DOM
 */
document.addEventListener("DOMContentLoaded", () => {
  // Mise à jour automatique de l'année dans le footer
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Initialisation des affichages
  renderProjects();
  renderSkills();
  renderExperiences();

  // Initialisation des fonctionnalités
  initThemeToggle();
  initBackgroundControl();

  // IntersectionObserver pour animations fade-in au scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 } // Déclenché quand 20% de l'élément est visible
  );

  // Observation de tous les éléments avec la classe fade-in
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Initialisation des modales Bootstrap
  if (typeof bootstrap !== "undefined") {
    const mp = document.getElementById("modalProject");
    const ms = document.getElementById("modalSkill");
    const me = document.getElementById("modalExp");
    if (mp) projectModal = new bootstrap.Modal(mp);
    if (ms) skillModal = new bootstrap.Modal(ms);
    if (me) expModal = new bootstrap.Modal(me);
  }

  // Attachement des événements aux boutons d'ouverture des modales
  const btnAddProject = document.getElementById("btn-open-add-project");
  const btnAddSkill = document.getElementById("btn-open-add-skill");
  const btnAddExp = document.getElementById("btn-open-add-exp");

  btnAddProject?.addEventListener("click", () => openAddProject());
  btnAddSkill?.addEventListener("click", () => openAddSkill());
  btnAddExp?.addEventListener("click", () => openAddExp());

  // Attachement des événements aux boutons de sauvegarde
  document.getElementById("btn-save-project")?.addEventListener("click", handleSaveProject);
  document.getElementById("btn-save-skill")?.addEventListener("click", handleSaveSkill);
  document.getElementById("btn-save-exp")?.addEventListener("click", handleSaveExp);

  // Initialisation du formulaire de contact
  setupContactForm();
  
  // Message de bienvenue après 1 seconde
  setTimeout(() => {
    showToast('👋 Bienvenue sur mon portfolio !');
  }, 1000);
});

// ---------- GESTION DES PROJETS ----------

/**
 * Ouvre la modale pour ajouter un nouveau projet
 */
function openAddProject() {
  const form = document.getElementById("project-form");
  form.reset(); // Réinitialisation du formulaire
  form.classList.remove("was-validated");
  document.getElementById("project-id").value = ""; // ID vide = création
  document.getElementById("modalProjectTitle").textContent = "Ajouter un projet";
  projectModal && projectModal.show();
}

/**
 * Ouvre la modale pour modifier un projet existant
 * @param {number} id - ID du projet à modifier
 */
window.openEditProject = function(id) {
  const project = projects.find((p) => p.id === id);
  if (!project) return;
  const form = document.getElementById("project-form");
  form.classList.remove("was-validated");

  // Remplissage du formulaire avec les données du projet
  document.getElementById("project-id").value = project.id;
  document.getElementById("project-title").value = project.title;
  document.getElementById("project-category").value = project.category;
  document.getElementById("project-desc").value = project.description;
  document.getElementById("project-tech").value = project.technologies.join(", ");
  document.getElementById("project-link").value = project.link || "";
  document.getElementById("project-image").value = project.image || "";

  document.getElementById("modalProjectTitle").textContent = "Modifier le projet";
  projectModal && projectModal.show();
};

/**
 * Gère la sauvegarde d'un projet (création ou modification)
 */
function handleSaveProject() {
  const form = document.getElementById("project-form");
  if (!form.checkValidity()) {
    form.classList.add("was-validated"); // Affiche les erreurs de validation
    return;
  }

  // Récupération des valeurs du formulaire
  const idValue = document.getElementById("project-id").value;
  const title = document.getElementById("project-title").value.trim();
  const category = document.getElementById("project-category").value;
  const description = document.getElementById("project-desc").value.trim();
  const technologies = document.getElementById("project-tech").value.split(",").map((t) => t.trim()).filter(Boolean);
  const link = document.getElementById("project-link").value.trim();
  const image = document.getElementById("project-image").value.trim();

  if (idValue) {
    // MODIFICATION : mise à jour du projet existant
    const id = parseInt(idValue, 10);
    projects = projects.map((p) => p.id === id ? { ...p, title, category, description, technologies, link, image } : p);
    showToast('Projet modifié avec succès !');
  } else {
    // CRÉATION : ajout d'un nouveau projet
    const newProject = {
      id: getNextId(projects),
      title,
      category,
      description,
      technologies,
      link,
      image
    };
    projects.push(newProject);
    showToast('Projet ajouté avec succès !');
  }

  projectModal && projectModal.hide();
  // Re-rendu avec le filtre actuel
  const activeFilterBtn = document.querySelector(".filter-btn.active");
  const currentFilter = activeFilterBtn ? activeFilterBtn.dataset.category : "all";
  renderProjects(currentFilter);
}

// ---------- GESTION DES COMPÉTENCES ----------

/**
 * Ouvre la modale pour ajouter une nouvelle compétence
 */
function openAddSkill() {
  const form = document.getElementById("skill-form");
  form.reset();
  form.classList.remove("was-validated");
  document.getElementById("skill-id").value = "";
  document.getElementById("modalSkillTitle").textContent = "Ajouter une compétence";
  skillModal && skillModal.show();
}

/**
 * Ouvre la modale pour modifier une compétence existante
 * @param {number} id - ID de la compétence à modifier
 */
window.openEditSkill = function(id) {
  const skill = skills.find((s) => s.id === id);
  if (!skill) return;
  const form = document.getElementById("skill-form");
  form.classList.remove("was-validated");

  // Remplissage du formulaire
  document.getElementById("skill-id").value = skill.id;
  document.getElementById("skill-name").value = skill.name;
  document.getElementById("skill-level").value = skill.level;
  document.getElementById("skill-percent").value = skill.percent;
  document.getElementById("skill-category").value = skill.category || "";

  document.getElementById("modalSkillTitle").textContent = "Modifier la compétence";
  skillModal && skillModal.show();
};

/**
 * Gère la sauvegarde d'une compétence (création ou modification)
 */
function handleSaveSkill() {
  const form = document.getElementById("skill-form");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // Récupération des valeurs
  const idValue = document.getElementById("skill-id").value;
  const name = document.getElementById("skill-name").value.trim();
  const level = document.getElementById("skill-level").value;
  const percent = parseInt(document.getElementById("skill-percent").value, 10);
  const category = document.getElementById("skill-category").value.trim();

  if (idValue) {
    // Modification
    const id = parseInt(idValue, 10);
    skills = skills.map((s) => s.id === id ? { ...s, name, level, percent, category } : s);
    showToast('Compétence modifiée avec succès !');
  } else {
    // Création
    const newSkill = { id: getNextId(skills), name, level, percent, category };
    skills.push(newSkill);
    showToast('Compétence ajoutée avec succès !');
  }

  skillModal && skillModal.hide();
  
  // Re-rendu avec le filtre actuel
  const activeSkillFilter = document.querySelector("#skill-filter-bar .filter-btn.active");
  const currentFilter = activeSkillFilter ? activeSkillFilter.dataset.category : "all";
  renderSkills(currentFilter);
}

// ---------- GESTION DES EXPÉRIENCES ----------

/**
 * Ouvre la modale pour ajouter une nouvelle expérience
 */
function openAddExp() {
  const form = document.getElementById("exp-form");
  form.reset();
  form.classList.remove("was-validated");
  document.getElementById("exp-id").value = "";
  document.getElementById("modalExpTitle").textContent = "Ajouter une expérience";
  expModal && expModal.show();
}

/**
 * Ouvre la modale pour modifier une expérience existante
 * @param {number} id - ID de l'expérience à modifier
 */
window.openEditExp = function(id) {
  const exp = experiences.find((e) => e.id === id);
  if (!exp) return;
  const form = document.getElementById("exp-form");
  form.classList.remove("was-validated");

  // Remplissage du formulaire
  document.getElementById("exp-id").value = exp.id;
  document.getElementById("exp-title").value = exp.title;
  document.getElementById("exp-org").value = exp.organisation;
  document.getElementById("exp-date").value = exp.date;
  document.getElementById("exp-location").value = exp.location || "";
  document.getElementById("exp-desc").value = exp.description;

  document.getElementById("modalExpTitle").textContent = "Modifier l'expérience";
  expModal && expModal.show();
};

/**
 * Gère la sauvegarde d'une expérience (création ou modification)
 */
function handleSaveExp() {
  const form = document.getElementById("exp-form");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // Récupération des valeurs
  const idValue = document.getElementById("exp-id").value;
  const title = document.getElementById("exp-title").value.trim();
  const organisation = document.getElementById("exp-org").value.trim();
  const date = document.getElementById("exp-date").value.trim();
  const location = document.getElementById("exp-location").value.trim();
  const description = document.getElementById("exp-desc").value.trim();

  if (idValue) {
    // Modification
    const id = parseInt(idValue, 10);
    experiences = experiences.map((e) => e.id === id ? { ...e, title, organisation, date, location, description } : e);
    showToast('Expérience modifiée avec succès !');
  } else {
    // Création
    const newExp = { id: getNextId(experiences), title, organisation, date, location, description };
    experiences.push(newExp);
    showToast('Expérience ajoutée avec succès !');
  }

  expModal && expModal.hide();
  renderExperiences();
}

// ============================
// FORMULAIRE DE CONTACT
// ============================

/**
 * Configure le formulaire de contact avec validation et simulation d'envoi
 */
function setupContactForm() {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("contact-submit-btn");
  
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    let valid = true;

    // Récupération des éléments du formulaire
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    
    const nameError = document.getElementById("contact-name-error");
    const emailError = document.getElementById("contact-email-error");
    const messageError = document.getElementById("contact-message-error");

    // Réinitialisation des classes d'erreur
    [nameInput, emailInput, messageInput].forEach(input => {
      input.classList.remove("is-invalid");
    });

    // Validation du nom
    if (!nameInput.value.trim()) {
      nameInput.classList.add("is-invalid");
      if (nameError) nameError.textContent = "Veuillez saisir votre nom.";
      valid = false;
    } else if (nameInput.value.trim().length < 2) {
      nameInput.classList.add("is-invalid");
      if (nameError) nameError.textContent = "Le nom doit contenir au moins 2 caractères.";
      valid = false;
    }

    // Validation de l'email (regex standard)
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailInput.classList.add("is-invalid");
      if (emailError) emailError.textContent = "Veuillez saisir un email valide.";
      valid = false;
    }

    // Validation du message
    if (!messageInput.value.trim()) {
      messageInput.classList.add("is-invalid");
      if (messageError) messageError.textContent = "Veuillez saisir votre message.";
      valid = false;
    } else if (messageInput.value.trim().length < 10) {
      messageInput.classList.add("is-invalid");
      if (messageError) messageError.textContent = "Le message doit contenir au moins 10 caractères.";
      valid = false;
    }

    if (!valid) return;

    // Simulation d'envoi avec animation de chargement
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Envoi...';
    submitBtn.disabled = true;

    // Simulation d'un délai d'envoi
    setTimeout(() => {
      form.reset(); // Réinitialisation du formulaire
      
      // Restauration du bouton
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Affichage des messages de succès
      showThankYouMessage();
      showToast('✅ Message envoyé avec succès !');
    }, 1500);
  });
}



// ============================
// GESTION DU QR CODE
// ============================

let qrCodeInstance = null;

/**
 * Affiche la modale avec le QR code
 */
window.showQRCode = function() {
  const modal = document.getElementById('qrCodeModal');
  if (!modal) {
    // Créer la modale si elle n'existe pas
    createQRCodeModal();
    setTimeout(() => showQRCode(), 100);
    return;
  }
  
  // Initialiser Bootstrap modal
  const qrModal = new bootstrap.Modal(modal);
  
  // Générer le QR code
  setTimeout(() => {
    generateQRCode();
  }, 300);
  
  qrModal.show();
}

/**
 * Crée la modale QR code si elle n'existe pas
 */
function createQRCodeModal() {
  const modalHTML = `
    <div class="modal fade" id="qrCodeModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-glass">
          <div class="modal-header">
            <h5 class="modal-title">📱 Scanner pour voir le portfolio PDF</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <div id="qrcode" style="margin: 20px auto; width: 256px; height: 256px;"></div>
            <p class="mt-3">Scannez ce QR code avec votre téléphone pour voir le portfolio complet au format PDF.</p>
            <div class="mt-4">
              <button class="btn btn-primary me-2" onclick="downloadPDF()">
                <i class="bi bi-download"></i> Télécharger le PDF
              </button>
              <button class="btn btn-outline-light" onclick="shareQRCode()">
                <i class="bi bi-share"></i> Partager
              </button>
            </div>
            <div class="mt-3 text-muted">
              <small>Le PDF sera ouvert directement sur votre téléphone</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Dans app.js - Version avec hébergement en ligne

function generateQRCode() {
  const qrContainer = document.getElementById('qrcode');
  if (!qrContainer) return;
  
  qrContainer.innerHTML = '';
  
  // URL de votre site une fois déployé
  // Exemple avec Netlify : https://votre-portfolio.netlify.app/portfolio.pdf
  // Exemple avec GitHub Pages : https://votreusername.github.io/portfolio/portfolio.pdf
  
  const pdfUrl = 'https://votre-site.com/Portfolio_Complet_Agathe_DIOUF_19-03-2026 12-58.pdf';
  
  // QR code qui ouvre directement le PDF
  new QRCode(qrContainer, {
    text: pdfUrl,
    width: 256,
    height: 256
  });
}

/**
 * Télécharge le PDF directement
 */
window.downloadPDF = function() {
  // Fermer la modale
  const modal = bootstrap.Modal.getInstance(document.getElementById('qrCodeModal'));
  if (modal) modal.hide();
  
  // URL du fichier PDF
  const pdfUrl = window.location.origin + '/Portfolio_Complet_Agathe_DIOUF_19-03-2026_12-58.pdf';
  
  // Créer un lien temporaire pour le téléchargement
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Portfolio_Complet_Agathe_DIOUF_19-03-2026.pdf'; // Nom du fichier téléchargé
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showToast('Téléchargement du PDF démarré...', 2000, 'success');
}

/**
 * Partage le QR code
 */
window.shareQRCode = function() {
  const pdfUrl = window.location.origin + '/Portfolio_Complet_Agathe_DIOUF_19-03-2026_12-58.pdf';
  
  if (navigator.share) {
    navigator.share({
      title: 'Mon Portfolio',
      text: 'Découvrez mon portfolio en PDF',
      url: pdfUrl
    }).catch(() => {
      showToast('Partage annulé', 2000, 'warning');
    });
  } else {
    // Fallback : copier le lien
    navigator.clipboard.writeText(pdfUrl).then(() => {
      showToast('Lien du PDF copié dans le presse-papier !', 2000, 'success');
    }).catch(() => {
      showToast('Impossible de copier le lien', 2000, 'error');
    });
  }
}
