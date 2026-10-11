const revealTags = [
  "img",
  "a",
  "table",
  "p",
  "h1",
  "h2",
  "ul",
  "label",
  "input",
  "button",
  "textarea",
  "select",
  "nav",
  "footer",
  "div .italic",
];

const STAGGER_MS = 5; // delay between each element's animation

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealIndex * STAGGER_MS;
        entry.target.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05 },
);

document.querySelectorAll(revealTags.join(",")).forEach((element, i) => {
  if (element.matches('input[type="checkbox"]')) return;
  element.classList.add("reveal");
  element.dataset.revealIndex = i; // store its order
  observer.observe(element);
});
