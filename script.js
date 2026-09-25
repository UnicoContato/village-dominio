const header = document.getElementById("siteHeader");
const mobileToggle = document.getElementById("mobileToggle");
const mobileMenu = document.getElementById("mobileMenu");
const privacyOpen = document.getElementById("privacyOpen");
const privacyModal = document.getElementById("privacyModal");
const year = document.getElementById("year");
let lastScroll = 0;

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const movingDown = currentScroll > lastScroll && currentScroll > 120;
  header.style.transform = movingDown ? "translateY(-120%)" : "translateY(0)";
  lastScroll = Math.max(currentScroll, 0);
});

mobileToggle.addEventListener("click", () => {
  const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
  mobileToggle.setAttribute("aria-expanded", String(!expanded));
  mobileToggle.classList.toggle("menu-open", !expanded);
  mobileMenu.classList.toggle("hidden", expanded);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.classList.remove("menu-open");
    mobileMenu.classList.add("hidden");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

const openModal = () => {
  privacyModal.classList.remove("hidden");
  privacyModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  privacyModal.classList.add("hidden");
  privacyModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

privacyOpen.addEventListener("click", openModal);

privacyModal.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !privacyModal.classList.contains("hidden")) {
    closeModal();
  }
});
