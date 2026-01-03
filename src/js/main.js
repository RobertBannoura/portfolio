import "../css/tailwind.css";
import "../css/custom.css";

// ---- Images (Vite bundling) ----
import heartguardCover from "../assets/images/projects/heartguard/cover.png";
import techstoreCover from "../assets/images/projects/techstore/cover.png";
import interfacingCover from "../assets/images/projects/interfacing/cover.png";
import embeddedCover from "../assets/images/projects/embedded/cover.png";

function setImg(id, src) {
  const el = document.getElementById(id);
  if (el) el.src = src;
}

setImg("imgHeartGuard", heartguardCover);
setImg("imgTechStore", techstoreCover);
setImg("imgInterfacing", interfacingCover);
setImg("imgEmbedded", embeddedCover);

// ---- Year ----
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ---- Mobile menu ----
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", isOpen);
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
  });

  mobileMenu.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- Smooth scroll ----
document.querySelectorAll("a[href^='#']").forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ---- Copy email ----
const copyBtn = document.getElementById("copyEmail");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = "bannourarobert@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = "Copied ✓";
      setTimeout(() => (copyBtn.textContent = "Copy email"), 1200);
    } catch {
      prompt("Copy email:", email);
    }
  });
}

// ---- Progress bar ----
const progress = document.getElementById("progress");
function updateProgress() {
  if (!progress) return;
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progress.style.width = `${pct}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// ---- Reveal animation ----
const revealEls = document.querySelectorAll("[data-reveal]");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// ---- Active nav highlight ----
const sections = ["projects", "skills", "about", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navLinks = Array.from(document.querySelectorAll(".navlink[href^='#']"));

function setActiveNav(id) {
  navLinks.forEach((l) =>
    l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`)
  );
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) setActiveNav(visible.target.id);
  },
  { threshold: [0.2, 0.35, 0.5] }
);

sections.forEach((s) => sectionObserver.observe(s));
