// ============================
// Données initiales en mémoire
// ============================

let projects = [
  {
    id: 1,
    title: "Carte interactive de Niakhar",
    category: "cartographie",
    description:
      "Application web affichant une carte interactive des quartiers de Thiès avec informations contextuelles.",
    technologies: ["HTML", "CSS", "JavaScript", "Leaflet"],
    link: "CARTE.html",
    image: "localition.jpg.jpeg"
  },
  {
    id: 2,
    title: "Dashboard de données climatiques",
    category: "Projet",
    description:
      "Tableau de bord pour visualiser des séries temporelles de données climatiques (température, pluviométrie).",
    technologies: ["HTML", "CSS", "JavaScript", "Chart.js"],
    link: "projet analyse 3.pdf",
    image: "LOGO R.jpg.jpeg"
  },
  {
    id: 3,
    title: "Portfolio web personnel",
    category: "web",
    description:
      "Portfolio statique présentant les compétences, projets et coordonnées d'un étudiant en informatique.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "cv.html",
    image: "image_cv.PNG"
  },
  {
    id: 4,
    title: "Portfolio web personnel",
    category: "site web",
    description:
      "Portfolio statique présentant les compétences, projets et coordonnées d'un étudiant en informatique.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "site.html",
    image: "agricole.jpg.jpeg"
  },
  {
    id: 4,
    title: "Portfolio web personnel",
    category: "Rapport",
    description:
      "Portfolio statique présentant les compétences, projets et coordonnées d'un étudiant en informatique.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "PROJET_Ndoncky 2025 (1).pdf",
    image: "rond_point.PNG"
  },
   {
    id: 4,
    title: "Portfolio web personnel",
    category: "Cartothéque",
    description:
      "Portfolio statique présentant les compétences, projets et coordonnées d'un étudiant en informatique.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "cartotheque.html",
    image: "CARTE DE NIAKHAR.png"
  }
];

let skills = [
  { id: 1, name: "HTML5", level: "Avancé", percent: 85, category: "Web" },
  { id: 2, name: "CSS3 / Design responsive", level: "Intermédiaire", percent: 75, category: "Web" },
  { id: 3, name: "JavaScript (DOM, ES6+)", level: "Intermédiaire", percent: 70, category: "Web" },
  { id: 4, name: "Cartographie SIG", level: "Avancé", percent: 80, category: "Géomatique" },
  { id: 5, name: "Analyse de données", level: "Intermédiaire", percent: 65, category: "Données" }
];

let experiences = [
  {
    id: 1,
    title: "Projet tutoré de cartographie",
    organisation: "Université Iba Der Thiam de Thiès",
    date: "2025 - 2026",
    location: "Thiès, Sénégal",
    description:
      "Réalisation d'une carte thématique interactive pour analyser la répartition spatiale de données géographiques."
  }
];

// ============================
// Configuration réseaux sociaux
// ============================
const socialLinks = {
  linkedin: "https://www.linkedin.com/in/agathe-diouf-361a593b6/",
  github: "https://github.com/",
  twitter: "https://mail.google.com/mail/u/0/?hl=fr#inbox"
};

// ============================
// Fonction Toast
// ============================
function showToast(message, duration = 3000, type = 'success') {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  
  toast.textContent = message;
  toast.className = 'toast-notification show';
  if (type === 'warning') toast.classList.add('warning');
  if (type === 'error') toast.classList.add('error');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ============================
// Fonction Message de remerciement animé
// ============================
function showThankYouMessage() {
  const thankYouMsg = document.getElementById('thank-you-message');
  if (!thankYouMsg) return;
  
  thankYouMsg.classList.add('show');
  
  // Fermer automatiquement après 5 secondes
  setTimeout(() => {
    thankYouMsg.classList.remove('show');
  }, 5000);
  
  // Fermer au clic
  thankYouMsg.addEventListener('click', function(e) {
    if (e.target === thankYouMsg) {
      thankYouMsg.classList.remove('show');
    }
  });
}

// ============================
// Ouvrir réseaux sociaux
// ============================
window.openSocial = function(platform) {
  if (socialLinks[platform]) {
    window.open(socialLinks[platform], '_blank');
    showToast(`Ouverture de ${platform}`);
  } else {
    showToast(`Lien ${platform} non configuré`, 3000, 'warning');
  }
};

// ============================
// Contrôle de l'animation du background
// ============================
function initBackgroundControl() {
  const track = document.querySelector('.sliding-track');
  if (!track) return;
  
  // Pause l'animation quand la page n'est pas visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      track.style.animationPlayState = 'paused';
    } else {
      track.style.animationPlayState = 'running';
    }
  });
  
  // Ralentir l'animation au scroll
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    track.style.animationDuration = '60s';
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      track.style.animationDuration = '40s';
    }, 1000);
  }, { passive: true });
}

// ============================
// Utilitaires
// ============================

function getNextId(collection) {
  return collection.length ? Math.max(...collection.map((item) => item.id)) + 1 : 1;
}

// ============================
// Rendu des PROJETS
// ============================

const projectsGrid = document.getElementById("projects-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderProjects(filter = "all") {
  if (!projectsGrid) return;

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  if (!filtered.length) {
    projectsGrid.innerHTML = `<div class="col-12"><p class="text-center text-muted">Aucun projet pour cette catégorie.</p></div>`;
    return;
  }

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

// Gestion des filtres projets
if (filterButtons.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.category;
      renderProjects(cat);
    });
  });
}

// ============================
// Rendu des COMPÉTENCES
// ============================

const skillsGrid = document.getElementById("skills-grid");
const skillFilterBar = document.getElementById("skill-filter-bar");
const skillFilterBtns = document.querySelectorAll("#skill-filter-bar .filter-btn");

function renderSkills(category = "all") {
  if (!skillsGrid) return;

  const filtered = category === "all" 
    ? skills 
    : skills.filter((s) => s.category === category);

  if (!filtered.length) {
    skillsGrid.innerHTML = `<div class="col-12"><p class="text-center text-muted">Aucune compétence pour cette catégorie.</p></div>`;
    updateSkillsStats([]);
    return;
  }

  skillsGrid.innerHTML = filtered
    .map((s) => {
      // Déterminer la classe Bootstrap pour le niveau
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
  
  // Mettre à jour les statistiques
  updateSkillsStats(filtered);
}

// Statistiques des compétences
function updateSkillsStats(filteredSkills = skills) {
  const statsContainer = document.getElementById('skills-stats');
  if (!statsContainer) return;
  
  // Compter par catégorie
  const categories = {};
  filteredSkills.forEach(s => {
    const cat = s.category || 'Autres';
    categories[cat] = (categories[cat] || 0) + 1;
  });
  
  if (Object.keys(categories).length === 0) {
    statsContainer.innerHTML = '';
    return;
  }
  
  statsContainer.innerHTML = Object.entries(categories).map(([cat, count]) => `
    <div class="skills-stat-item">
      <div class="skills-stat-number">${count}</div>
      <div class="skills-stat-label">${cat}</div>
    </div>
  `).join('');
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
// Rendu des EXPÉRIENCES
// ============================

const experienceList = document.getElementById("experience-list");

function renderExperiences() {
  if (!experienceList) return;

  if (experiences.length === 0) {
    experienceList.innerHTML = `<p class="text-center text-muted">Aucune expérience pour le moment.</p>`;
    return;
  }

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
// Thème clair/sombre
// ============================

function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  if (!themeToggle) return;
  
  // Vérifier le thème sauvegardé
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animation de transition
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
    
    showToast(`Thème ${newTheme} activé`);
  });
}

// ============================
// Modales & formulaires
// ============================

let projectModal, skillModal, expModal;

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Initialisation affichage
  renderProjects();
  renderSkills();
  renderExperiences();

  // Initialisation du thème
  initThemeToggle();

  // Initialisation du contrôle du background
  initBackgroundControl();

  // IntersectionObserver pour animations fade-in
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Bootstrap modals
  if (typeof bootstrap !== "undefined") {
    const mp = document.getElementById("modalProject");
    const ms = document.getElementById("modalSkill");
    const me = document.getElementById("modalExp");
    if (mp) projectModal = new bootstrap.Modal(mp);
    if (ms) skillModal = new bootstrap.Modal(ms);
    if (me) expModal = new bootstrap.Modal(me);
  }

  // Boutons ouvrir modales
  const btnAddProject = document.getElementById("btn-open-add-project");
  const btnAddSkill = document.getElementById("btn-open-add-skill");
  const btnAddExp = document.getElementById("btn-open-add-exp");

  btnAddProject?.addEventListener("click", () => openAddProject());
  btnAddSkill?.addEventListener("click", () => openAddSkill());
  btnAddExp?.addEventListener("click", () => openAddExp());

  // Boutons Enregistrer
  document
    .getElementById("btn-save-project")
    ?.addEventListener("click", handleSaveProject);
  document
    .getElementById("btn-save-skill")
    ?.addEventListener("click", handleSaveSkill);
  document
    .getElementById("btn-save-exp")
    ?.addEventListener("click", handleSaveExp);

  // Formulaire contact
  setupContactForm();
  
  // Afficher un toast de bienvenue après 1 seconde
  setTimeout(() => {
    showToast('👋 Bienvenue sur mon portfolio !');
  }, 1000);
});

// ---------- Projets ----------
function openAddProject() {
  const form = document.getElementById("project-form");
  form.reset();
  form.classList.remove("was-validated");
  document.getElementById("project-id").value = "";
  document.getElementById("modalProjectTitle").textContent = "Ajouter un projet";
  projectModal && projectModal.show();
}

window.openEditProject = function(id) {
  const project = projects.find((p) => p.id === id);
  if (!project) return;
  const form = document.getElementById("project-form");
  form.classList.remove("was-validated");

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

function handleSaveProject() {
  const form = document.getElementById("project-form");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const idValue = document.getElementById("project-id").value;
  const title = document.getElementById("project-title").value.trim();
  const category = document.getElementById("project-category").value;
  const description = document.getElementById("project-desc").value.trim();
  const technologies = document
    .getElementById("project-tech")
    .value.split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const link = document.getElementById("project-link").value.trim();
  const image = document.getElementById("project-image").value.trim();

  if (idValue) {
    // Modification
    const id = parseInt(idValue, 10);
    projects = projects.map((p) =>
      p.id === id
        ? { ...p, title, category, description, technologies, link, image }
        : p
    );
    showToast('Projet modifié avec succès !');
  } else {
    // Ajout
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
  const activeFilterBtn = document.querySelector(".filter-btn.active");
  const currentFilter = activeFilterBtn ? activeFilterBtn.dataset.category : "all";
  renderProjects(currentFilter);
}

// ---------- Compétences ----------
function openAddSkill() {
  const form = document.getElementById("skill-form");
  form.reset();
  form.classList.remove("was-validated");
  document.getElementById("skill-id").value = "";
  document.getElementById("modalSkillTitle").textContent = "Ajouter une compétence";
  skillModal && skillModal.show();
}

window.openEditSkill = function(id) {
  const skill = skills.find((s) => s.id === id);
  if (!skill) return;
  const form = document.getElementById("skill-form");
  form.classList.remove("was-validated");

  document.getElementById("skill-id").value = skill.id;
  document.getElementById("skill-name").value = skill.name;
  document.getElementById("skill-level").value = skill.level;
  document.getElementById("skill-percent").value = skill.percent;
  document.getElementById("skill-category").value = skill.category || "";

  document.getElementById("modalSkillTitle").textContent = "Modifier la compétence";
  skillModal && skillModal.show();
};

function handleSaveSkill() {
  const form = document.getElementById("skill-form");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const idValue = document.getElementById("skill-id").value;
  const name = document.getElementById("skill-name").value.trim();
  const level = document.getElementById("skill-level").value;
  const percent = parseInt(document.getElementById("skill-percent").value, 10);
  const category = document.getElementById("skill-category").value.trim();

  if (idValue) {
    const id = parseInt(idValue, 10);
    skills = skills.map((s) =>
      s.id === id ? { ...s, name, level, percent, category } : s
    );
    showToast('Compétence modifiée avec succès !');
  } else {
    const newSkill = {
      id: getNextId(skills),
      name,
      level,
      percent,
      category
    };
    skills.push(newSkill);
    showToast('Compétence ajoutée avec succès !');
  }

  skillModal && skillModal.hide();
  
  // Déterminer le filtre actif
  const activeSkillFilter = document.querySelector("#skill-filter-bar .filter-btn.active");
  const currentFilter = activeSkillFilter ? activeSkillFilter.dataset.category : "all";
  renderSkills(currentFilter);
}

// ---------- Expériences ----------
function openAddExp() {
  const form = document.getElementById("exp-form");
  form.reset();
  form.classList.remove("was-validated");
  document.getElementById("exp-id").value = "";
  document.getElementById("modalExpTitle").textContent = "Ajouter une expérience";
  expModal && expModal.show();
}

window.openEditExp = function(id) {
  const exp = experiences.find((e) => e.id === id);
  if (!exp) return;
  const form = document.getElementById("exp-form");
  form.classList.remove("was-validated");

  document.getElementById("exp-id").value = exp.id;
  document.getElementById("exp-title").value = exp.title;
  document.getElementById("exp-org").value = exp.organisation;
  document.getElementById("exp-date").value = exp.date;
  document.getElementById("exp-location").value = exp.location || "";
  document.getElementById("exp-desc").value = exp.description;

  document.getElementById("modalExpTitle").textContent = "Modifier l'expérience";
  expModal && expModal.show();
};

function handleSaveExp() {
  const form = document.getElementById("exp-form");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const idValue = document.getElementById("exp-id").value;
  const title = document.getElementById("exp-title").value.trim();
  const organisation = document.getElementById("exp-org").value.trim();
  const date = document.getElementById("exp-date").value.trim();
  const location = document.getElementById("exp-location").value.trim();
  const description = document.getElementById("exp-desc").value.trim();

  if (idValue) {
    const id = parseInt(idValue, 10);
    experiences = experiences.map((e) =>
      e.id === id
        ? { ...e, title, organisation, date, location, description }
        : e
    );
    showToast('Expérience modifiée avec succès !');
  } else {
    const newExp = {
      id: getNextId(experiences),
      title,
      organisation,
      date,
      location,
      description
    };
    experiences.push(newExp);
    showToast('Expérience ajoutée avec succès !');
  }

  expModal && expModal.hide();
  renderExperiences();
}

// ============================
// Formulaire de contact avec message de remerciement
// ============================

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("contact-submit-btn");
  
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    
    const nameError = document.getElementById("contact-name-error");
    const emailError = document.getElementById("contact-email-error");
    const messageError = document.getElementById("contact-message-error");

    // Réinitialiser les classes d'erreur
    [nameInput, emailInput, messageInput].forEach(input => {
      input.classList.remove("is-invalid");
    });

    // Validation nom
    if (!nameInput.value.trim()) {
      nameInput.classList.add("is-invalid");
      if (nameError) nameError.textContent = "Veuillez saisir votre nom.";
      valid = false;
    } else if (nameInput.value.trim().length < 2) {
      nameInput.classList.add("is-invalid");
      if (nameError) nameError.textContent = "Le nom doit contenir au moins 2 caractères.";
      valid = false;
    }

    // Validation email
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailInput.classList.add("is-invalid");
      if (emailError) emailError.textContent = "Veuillez saisir un email valide.";
      valid = false;
    }

    // Validation message
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

    // Simulation d'envoi avec animation
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Envoi...';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Simulation d'envoi réussi
      form.reset();
      
      // Restaurer le bouton
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Afficher le message de remerciement animé
      showThankYouMessage();
      
      // Afficher un toast
      showToast('✅ Message envoyé avec succès !');
    }, 1500);
  });
}

