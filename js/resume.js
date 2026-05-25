/* ==========================================================
   Resume page interactivity — vanilla JS, no frameworks.

   Features:
     1. Scroll-triggered fade-in on each .resume-card (IntersectionObserver)
     2. Sticky sidebar that highlights the current section while scrolling
     3. Expandable job/experience cards (uses native <details>, but JS adds
        keyboard focus/blur niceties)
     4. Skill pills filter projects + experience by data-skills attribute
     5. Theme toggle (light cream / dark charcoal) saved to localStorage
     6. Subtle 3D tilt on cards based on mouse position
     7. "Download Resume" — triggers window.print() so users can Save as PDF
   ========================================================== */

const STORAGE_KEY = "khush-resume-theme";
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// ------------------------------------------------------------------
// 1. Scroll-triggered fade-ins for resume cards
// ------------------------------------------------------------------
function setupFadeInCards() {
  const cards = document.querySelectorAll(".resume-card");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("visible"));
    return;
  }

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  cards.forEach((card) => fadeObserver.observe(card));
}

// ------------------------------------------------------------------
// 2. Sticky sidebar — highlight the current section based on scroll
// ------------------------------------------------------------------
function setupSidebarScrollSpy() {
  const sections = document.querySelectorAll(".resume-section");
  const links = document.querySelectorAll(".sidebar-link");
  if (!sections.length || !links.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      const isActive = link.dataset.target === id;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  if (!("IntersectionObserver" in window)) {
    setActive(sections[0].id);
    return;
  }

  const visibility = new Map();

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibility.set(entry.target.id, entry.intersectionRatio);
      });

      let topId = null;
      let topRatio = 0;
      visibility.forEach((ratio, id) => {
        if (ratio > topRatio) {
          topRatio = ratio;
          topId = id;
        }
      });

      if (topId) {
        setActive(topId);
      }
    },
    {
      rootMargin: "-90px 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

// ------------------------------------------------------------------
// 3. Expandable cards — using native <details> with small UX polish.
//    The icon flip is purely CSS via the [open] selector, but we
//    still wire up a click listener for analytics-style logging hooks
//    and to keep aria state consistent if needed.
// ------------------------------------------------------------------
function setupExpandableCards() {
  const detailsList = document.querySelectorAll(".expandable-card .card-details");
  detailsList.forEach((details) => {
    details.addEventListener("toggle", () => {
      const summary = details.querySelector("summary");
      if (!summary) return;
      summary.setAttribute("aria-expanded", details.open ? "true" : "false");
    });
    // initialize aria-expanded
    const summary = details.querySelector("summary");
    if (summary) summary.setAttribute("aria-expanded", "false");
  });
}

// ------------------------------------------------------------------
// 4. Skill pill filtering
// ------------------------------------------------------------------
function setupSkillFilter() {
  const pills = document.querySelectorAll(".skill-pill");
  const filterableCards = document.querySelectorAll(
    ".resume-card[data-skills]",
  );
  const statusBox = document.getElementById("filter-status");
  const skillNameSpan = document.getElementById("filter-skill");
  const clearBtn = document.getElementById("clear-filter");

  let activeSkill = null;

  const clearFilter = () => {
    activeSkill = null;
    pills.forEach((p) => {
      p.classList.remove("active");
      p.setAttribute("aria-pressed", "false");
    });
    filterableCards.forEach((card) => {
      card.classList.remove("filtered-in", "filtered-out");
    });
    if (statusBox) statusBox.hidden = true;
  };

  const applyFilter = (skill, pillEl) => {
    activeSkill = skill;
    pills.forEach((p) => {
      const on = p === pillEl;
      p.classList.toggle("active", on);
      p.setAttribute("aria-pressed", on ? "true" : "false");
    });

    filterableCards.forEach((card) => {
      const raw = card.dataset.skills || "";
      if (raw === "") {
        // experience card with no listed skills — neither matched nor dimmed
        card.classList.remove("filtered-in", "filtered-out");
        return;
      }
      const skills = raw.split(",").map((s) => s.trim().toLowerCase());
      const match = skills.includes(skill);
      card.classList.toggle("filtered-in", match);
      card.classList.toggle("filtered-out", !match);
    });

    if (statusBox && skillNameSpan && pillEl) {
      skillNameSpan.textContent = pillEl.textContent.trim();
      statusBox.hidden = false;
    }
  };

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const skill = (pill.dataset.skill || "").toLowerCase();
      if (!skill) return;
      if (activeSkill === skill) {
        clearFilter();
      } else {
        applyFilter(skill, pill);
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", clearFilter);
  }
}

// ------------------------------------------------------------------
// 5. Theme toggle — light cream / dark charcoal, persisted
// ------------------------------------------------------------------
function setupThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;
  const iconEl = toggleBtn.querySelector(".theme-icon");
  const labelEl = toggleBtn.querySelector(".theme-label");

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    toggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
    if (iconEl) {
      // sun glyph for light mode, crescent moon for dark mode
      iconEl.textContent = isDark ? "☾" : "☼";
    }
    if (labelEl) {
      labelEl.textContent = isDark ? "Dark" : "Light";
    }
  };

  let saved;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    saved = null;
  }

  const initialTheme = saved === "dark" || saved === "light" ? saved : "light";
  applyTheme(initialTheme);

  toggleBtn.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage might be disabled — fail silently */
    }
  });
}

// ------------------------------------------------------------------
// 6. Subtle 3D tilt effect on cards (mouse position based)
// ------------------------------------------------------------------
function setupCardTilt() {
  if (reduceMotion) return;

  const cards = document.querySelectorAll(".resume-card");
  const maxTilt = 5; // degrees

  cards.forEach((card) => {
    let pending = false;
    let nextX = 0;
    let nextY = 0;

    const flush = () => {
      pending = false;
      card.style.setProperty("--tilt-x", nextX.toFixed(2) + "deg");
      card.style.setProperty("--tilt-y", nextY.toFixed(2) + "deg");
    };

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      nextY = px * maxTilt * 2;
      nextX = -py * maxTilt * 2;
      if (!pending) {
        pending = true;
        requestAnimationFrame(flush);
      }
    });

    card.addEventListener("mouseleave", () => {
      nextX = 0;
      nextY = 0;
      if (!pending) {
        pending = true;
        requestAnimationFrame(flush);
      }
    });
  });
}

// ------------------------------------------------------------------
// 7. Download resume — opens browser print dialog for Save as PDF.
//    Also force-opens collapsed <details> blocks so all bullet points
//    are visible in the printed/PDF output, then restores state.
// ------------------------------------------------------------------
function setupDownloadButton() {
  const btn = document.getElementById("download-resume");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.print();
  });

  const detailsEls = document.querySelectorAll(".card-details");
  const previouslyOpen = new WeakMap();

  window.addEventListener("beforeprint", () => {
    detailsEls.forEach((d) => {
      previouslyOpen.set(d, d.open);
      d.open = true;
    });
  });

  window.addEventListener("afterprint", () => {
    detailsEls.forEach((d) => {
      d.open = previouslyOpen.get(d) === true;
    });
  });
}

// ------------------------------------------------------------------
// Boot
// ------------------------------------------------------------------
function init() {
  setupFadeInCards();
  setupSidebarScrollSpy();
  setupExpandableCards();
  setupSkillFilter();
  setupThemeToggle();
  setupCardTilt();
  setupDownloadButton();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
