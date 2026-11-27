// order-script.js — order.html only
let DISHES = [];
const result = emptyResult();
let catPrices = [0, 0, 0, 0, 0];
let currentCost = 0;

const template = document.querySelector("#template");
const templateContent = template.content;

const stickyBar = document.getElementById("stickyBar");
const stickyCount = document.getElementById("stickyCount");
const stickyCost = document.getElementById("stickyCost");
const stickyCheckoutBtn = document.getElementById("stickyCheckoutBtn");

function updateStickyBar() {
  if (!stickyBar) return;

  const selectedCount = categories.reduce(
    (n, cat) => n + (result[cat] ? 1 : 0),
    0,
  );

  stickyCount.textContent = pluralizeDishes(selectedCount);
  stickyCost.textContent = `${currentCost} ₽`;

  const canCheckout = selectedCount > 0;
  stickyCheckoutBtn.setAttribute("aria-disabled", String(!canCheckout));
  stickyCheckoutBtn.textContent = canCheckout
    ? "Перейти к оформлению"
    : "Выберите блюда";

  if (canCheckout) {
    stickyBar.classList.add("visible");
    document.body.classList.add("has-sticky-bar");
  } else {
    stickyBar.classList.remove("visible");
    document.body.classList.remove("has-sticky-bar");
  }
}

function pluralizeDishes(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} блюдо`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return `${n} блюда`;
  return `${n} блюд`;
}

function persist() {
  saveSelection({ result, catPrices, currentCost });
}

const handleClickBtn = function (event) {
  const btn = event.target;
  const card = btn.closest(".card_out");
  const keyword = card.dataset.dish;

  const dish = DISHES.find((el) => el.keyword === keyword);
  if (!dish) return;
  const category = dish.category;

  result[category] = keyword;
  document
    .querySelectorAll(`[data-dish="${category}"] .card_out.selected`)
    .forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");

  const diff = catPrices[categories.indexOf(category)] - dish.price;
  catPrices[categories.indexOf(category)] = dish.price;
  currentCost -= diff;

  persist();
  updateStickyBar();
};

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    const kind = button.dataset.kind;
    const section = button.closest(".products");
    const cardholder = section.querySelector(".cardholder");
    const isActive = button.classList.contains("active");

    section
      .querySelectorAll(".filter")
      .forEach((b) => b.classList.remove("active"));
    const cards = cardholder.querySelectorAll(".card_out");

    if (isActive) {
      cards.forEach((c) => (c.style.display = ""));
      return;
    }
    button.classList.add("active");
    cards.forEach((card) => {
      const dish = DISHES.find((el) => el.keyword === card.dataset.dish);
      card.style.display = dish && dish.kind === kind ? "" : "none";
    });
  });
});

function renderDishes() {
  const sorted = [...DISHES].sort((a, b) => a.name.localeCompare(b.name, "ru"));

  categories.forEach((cat) => {
    const holder = document.querySelector(`[data-dish="${cat}"]`);
    if (holder) holder.innerHTML = "";
  });

  for (const cat of categories) {
    for (const d of sorted) {
      if (d.category !== cat) continue;
      const card = templateContent.cloneNode(true).querySelector(".card_out");
      card.querySelector(".food_img").src = d.image;
      card.querySelector(".cost").textContent = d.price + "₽";
      card.querySelector(".long_t").textContent = d.name;
      card.querySelector(".weight").textContent = d.count;
      card.dataset.dish = d.keyword;
      card.querySelector(".append").addEventListener("click", handleClickBtn);
      document.querySelector(`[data-dish="${cat}"]`).appendChild(card);
    }
  }
}

function highlightSavedSelection() {
  const saved = loadSelection();
  if (!saved) return;

  Object.assign(result, saved.result || {});
  if (Array.isArray(saved.catPrices)) catPrices = saved.catPrices;
  currentCost = saved.currentCost || 0;

  categories.forEach((category) => {
    const keyword = result[category];
    if (keyword && !DISHES.some((d) => d.keyword === keyword)) {
      result[category] = "";
      catPrices[categories.indexOf(category)] = 0;
    }
  });

  document
    .querySelectorAll(".card_out.selected")
    .forEach((c) => c.classList.remove("selected"));
  Object.values(result).forEach((keyword) => {
    if (!keyword) return;
    const card = document.querySelector(`.card_out[data-dish="${keyword}"]`);
    if (card) card.classList.add("selected");
  });
  updateStickyBar();
}

async function loadDishes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
    DISHES = await response.json();
    renderDishes();
    highlightSavedSelection();
  } catch (error) {
    console.error("Не удалось загрузить блюда:", error);
    alert("Не удалось загрузить меню. Попробуйте позже.");
  }
}

document.addEventListener("DOMContentLoaded", loadDishes);
