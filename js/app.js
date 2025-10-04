// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Back-to-top button logic
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) backToTop.style.display = "grid";
  else backToTop.style.display = "none";
});
backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// Simple theme toggle (dark <-> light)
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme) html.setAttribute("data-bs-theme", storedTheme);

themeToggle?.addEventListener("click", () => {
  const current = html.getAttribute("data-bs-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  html.setAttribute("data-bs-theme", next);
  localStorage.setItem("theme", next);
});

// Dummy contact form feedback
const form = document.querySelector("form");
const status = document.getElementById("formStatus");
form?.addEventListener("submit", () => {
  status.textContent = "Thanks! Your message has been (pretend) sent.";
  setTimeout(() => (status.textContent = ""), 3000);
});

// Scroll-reveal for cards/sections
const revealTargets = document.querySelectorAll(".card, .section-title");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.animate(
          [
            { opacity: 0, transform: "translateY(10px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 400,
            easing: "cubic-bezier(.2,.8,.2,1)",
            fill: "forwards",
          }
        );
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => io.observe(el));

// Simple lightbox via Bootstrap Modal
const imgModal = document.getElementById("imgModal");
const imgModalSrc = document.getElementById("imgModalSrc");
document.querySelectorAll(".gallery-tile").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const full = a.getAttribute("data-full") || a.getAttribute("href");
    imgModalSrc.src = full;
    const modal = bootstrap.Modal.getOrCreateInstance(imgModal);
    modal.show();
  });
});
imgModal?.addEventListener("hidden.bs.modal", () => {
  imgModalSrc.src = "";
});
