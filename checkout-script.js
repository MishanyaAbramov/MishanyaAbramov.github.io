// checkout-script.js — checkout.html only

const result = emptyResult();
let catPrices = [0, 0, 0, 0, 0];
let currentCost = 0;

let DISHES = [];
const byKeyword = {};

const form = document.querySelector("form");

/* ---------- render the "Ваш заказ" block ---------- */

function renderSummary() {
  // 1) Fill the <p> fields with the human-readable name
  categories.forEach((category) => {
    const el = document.querySelector(`p#${category}.ord_inp`);
    if (!el) return;
    const keyword = result[category];
    el.textContent = keyword
      ? byKeyword[keyword]?.name || keyword
      : "Блюдо не выбрано";
  });

  // 2) Cost
  const costBlock = document.querySelector("#costBlock");
  const cost = costBlock.querySelector("#cost");
  cost.textContent = `${currentCost}`;
  costBlock.style.display = currentCost > 0 ? "block" : "none";

  // 3) Card grid — same .card_out look, "Удалить" button
  const holder = document.querySelector("#chosenDishes");
  if (!holder) return;
  holder.innerHTML = "";

  categories.forEach((category) => {
    const keyword = result[category];
    if (!keyword) return;
    const dish = byKeyword[keyword];
    if (!dish) return;

    const card = document.createElement("div");
    card.className = "card_out chosen";
    card.dataset.dish = dish.keyword;

    card.innerHTML = `
      <img class="food_img" src="${dish.image}" alt="">
      <div class="textholder">
        <p class="cost">${dish.price}₽</p>
        <p class="long_t">${dish.name}</p>
        <p class="weight">${dish.count}</p>
      </div>
      <button type="button" class="append remove" data-category="${category}">
        Удалить
      </button>
    `;

    card
      .querySelector(".remove")
      .addEventListener("click", () => removeDish(category));

    holder.appendChild(card);
  });
}

/* ---------- remove one dish ---------- */

function removeDish(category) {
  const idx = categories.indexOf(category);
  currentCost -= catPrices[idx];
  catPrices[idx] = 0;
  result[category] = "";

  saveSelection({ result, catPrices, currentCost });
  renderSummary();
}

/* ---------- restore state from localStorage ---------- */

function restoreCheckoutSummary() {
  const saved = loadSelection();
  if (!saved) return;

  Object.assign(result, saved.result || {});
  if (Array.isArray(saved.catPrices)) catPrices = saved.catPrices;
  currentCost = saved.currentCost || 0;

  // Drop keywords that no longer exist in the menu
  categories.forEach((category) => {
    const keyword = result[category];
    if (keyword && !byKeyword[keyword]) {
      result[category] = "";
      catPrices[categories.indexOf(category)] = 0;
    }
  });

  renderSummary();
}

/* ---------- load menu then restore ---------- */

async function loadDishes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
    DISHES = await response.json();
    DISHES.forEach((d) => (byKeyword[d.keyword] = d));
    restoreCheckoutSummary();
  } catch (error) {
    console.error("Не удалось загрузить блюда:", error);
    showNotification("Не удалось загрузить меню. Попробуйте позже.");
    restoreCheckoutSummary(); // fall back to keywords
  }
}

/* ---------- notification (unchanged) ---------- */

function showNotification(text) {
  const existing = document.querySelector(".notification-overlay");
  if (existing) existing.remove();

  const tpl = document.querySelector("#notification-template");
  const overlay = tpl.content
    .cloneNode(true)
    .querySelector(".notification-overlay");
  overlay.querySelector(".notification-text").textContent = text;
  overlay
    .querySelector(".notification-btn")
    .addEventListener("click", () => overlay.remove());
  document.body.appendChild(overlay);
}

/* ---------- submit + reset ---------- */

if (form) {
  form.addEventListener("submit", function (event) {
    const hasSoup = !!result.soup;
    const hasMainDish = !!result.mainDish;
    const hasSalad = !!result.salad;
    const hasDrink = !!result.drink;
    const hasDessert = !!result.dessert;

    const selectedCount = [hasSoup, hasMainDish, hasSalad, hasDrink].filter(
      Boolean,
    ).length;
    let message = null;

    if (selectedCount === 0 && !hasDessert)
      message = "Ничего не выбрано. Выберите блюда для заказа";
    else if (hasSoup && hasMainDish && hasSalad && !hasDrink)
      message = "Выберите напиток";
    else if (hasSoup && !hasMainDish && !hasSalad)
      message = "Выберите главное блюдо/салат/стартер";
    else if (!hasSoup && !hasMainDish && hasSalad)
      message = "Выберите суп или главное блюдо";
    else if (!hasSoup && !hasMainDish && !hasSalad && (hasDrink || hasDessert))
      message = "Выберите главное блюдо";
    else if (!hasDrink && (hasSoup || hasMainDish || hasSalad || hasDessert))
      message = "Выберите напиток";
    else if (hasDrink && !hasSoup && !hasMainDish)
      message = "Выберите главное блюдо";

    if (message) {
      event.preventDefault();
      showNotification(message);
      return;
    }

    const fields = ["soup", "mainDish", "salad", "drink", "dessert", "cost"];
    fields.forEach((field) => {
      let value;
      if (field === "cost") {
        value = String(currentCost);
      } else {
        const keyword = result[field];
        value = keyword
          ? byKeyword[keyword]?.name || keyword
          : "Блюдо не выбрано";
      }

      let input = this.querySelector(`input[type="hidden"][name="${field}"]`);
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = field;
        this.appendChild(input);
      }
      input.value = value;
    });
  });

  form.addEventListener("reset", function () {
    categories.forEach((c) => (result[c] = ""));
    catPrices = [0, 0, 0, 0, 0];
    currentCost = 0;

    renderSummary();
    this.querySelectorAll('input[type="hidden"]').forEach((i) => i.remove());
    clearSelection();
  });
}

document.addEventListener("DOMContentLoaded", loadDishes);
