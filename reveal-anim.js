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
];

revealTags.forEach((tag) => {
  document.querySelectorAll(tag).forEach((element) => {
    element.classList.add("reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
  });
});
