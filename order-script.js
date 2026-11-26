const result = {
  soup: "",
  mainDish: "",
  salad: "",
  drink: "",
  dessert: "",
};

const categories = ["soup", "mainDish", "salad", "drink", "dessert"];
let catPrices = [0, 0, 0, 0, 0];
let currentCost = 0;

const template = document.querySelector("#template");
const templateContent = template.content;

const handleClickBtn = function (event) {
  const btn = event.target;
  const card = btn.closest(".card_out");
  const keyword = card.dataset.dish;

  const dish = DISHES.find((el) => el.keyword === keyword);
  if (!dish) return;
  const category = dish.category;

  result[category] = keyword;
  document
    .querySelectorAll(`.card_out[data-dish]`)
    .forEach((c) => c.classList.remove("selected"));
  card.classList.add("selected");

  document.querySelector(`p#${category}.ord_inp`).textContent = dish.name;
  const costBlock = document.querySelector("#costBlock");
  const cost = costBlock.querySelector("#cost");

  const diff = catPrices[categories.indexOf(category)] - dish.price;
  catPrices[categories.indexOf(category)] = dish.price;
  currentCost -= diff;

  cost.textContent = `${currentCost}`;

  if (cost.textContent) {
    costBlock.style.display = "block";
  }
};

const sortedDishes = DISHES.sort((a, b) => a.name.localeCompare(b.name, "ru"));

for (let j = 0; j < categories.length; j++) {
  for (let i = 0; i < DISHES.length; i++) {
    const { image, price, name, count, keyword } = sortedDishes[i];

    if (sortedDishes[i].category != categories[j]) {
      continue;
    }

    const foodCard = templateContent.cloneNode(true).querySelector(".card_out");

    foodCard.querySelector(".food_img").src = image;
    foodCard.querySelector(".cost").textContent = price + "₽";
    foodCard.querySelector(".long_t").textContent = name;
    foodCard.querySelector(".weight").textContent = count;

    const btn = foodCard.querySelector(".append");
    foodCard.dataset.dish = keyword;
    btn.addEventListener("click", handleClickBtn);
    document
      .querySelector(`[data-dish="${categories[j]}"]`)
      .appendChild(foodCard);
  }
}

const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const kind = button.dataset.kind;
    const section = button.closest(".products");
    const cardholder = section.querySelector(".cardholder");

    const isActive = button.classList.contains("active");

    section.querySelectorAll(".filter").forEach((btn) => {
      btn.classList.remove("active");
    });

    const cards = cardholder.querySelectorAll(".card_out");

    if (isActive) {
      cards.forEach((card) => {
        card.style.display = "";
      });
      return;
    }

    button.classList.add("active");

    cards.forEach((card) => {
      const dish = DISHES.find((el) => el.keyword === card.dataset.dish);
      if (dish && dish.kind === kind) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

document.querySelector("form").addEventListener("submit", function (event) {
  const hasSoup = !!result.soup;
  const hasMainDish = !!result.mainDish;
  const hasSalad = !!result.salad;
  const hasDrink = !!result.drink;
  const hasDessert = !!result.dessert;

  const selectedCount = [hasSoup, hasMainDish, hasSalad, hasDrink].filter(
    Boolean,
  ).length;

  let message = null;

  if (selectedCount === 0 && !hasDessert) {
    message = "Ничего не выбрано. Выберите блюда для заказа";
  } else if (hasSoup && hasMainDish && hasSalad && !hasDrink) {
    message = "Выберите напиток";
  } else if (hasSoup && !hasMainDish && !hasSalad) {
    message = "Выберите главное блюдо/салат/стартер";
  } else if (!hasSoup && !hasMainDish && hasSalad) {
    message = "Выберите суп или главное блюдо";
  } else if (
    !hasSoup &&
    !hasMainDish &&
    !hasSalad &&
    (hasDrink || hasDessert)
  ) {
    message = "Выберите главное блюдо";
  } else if (!hasDrink && (hasSoup || hasMainDish || hasSalad || hasDessert)) {
    message = "Выберите напиток";
  } else if (hasDrink && !hasSoup && !hasMainDish) {
    message = "Выберите главное блюдо";
  }

  if (message) {
    event.preventDefault();
    showNotification(message);
    return;
  }

  const fields = ["soup", "mainDish", "salad", "drink", "dessert", "cost"];
  fields.forEach((field) => {
    const summary = document.getElementById(field);
    if (!summary) return;

    let input = this.querySelector(`input[type="hidden"][name="${field}"]`);
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = field;
      this.appendChild(input);
    }
    input.value = summary.textContent.trim();
  });
});

function showNotification(text) {
  const existing = document.querySelector(".notification-overlay");
  if (existing) existing.remove();

  const template = document.querySelector("#notification-template");
  const overlay = template.content
    .cloneNode(true)
    .querySelector(".notification-overlay");

  overlay.querySelector(".notification-text").textContent = text;
  overlay
    .querySelector(".notification-btn")
    .addEventListener("click", () => overlay.remove());

  document.body.appendChild(overlay);
}

document.querySelector("form").addEventListener("reset", function () {
  categories.forEach((category) => {
    result[category] = "";
  });

  catPrices = [0, 0, 0, 0, 0];
  currentCost = 0;

  document.querySelectorAll("p.ord_inp").forEach((p) => {
    if (p.id === "cost") {
      p.textContent = "0";
    } else {
      p.textContent = "Блюдо не выбрано";
    }
  });

  document.querySelector("#costBlock").style.display = "none";
  document.querySelectorAll(".card_out.selected").forEach((card) => {
    card.classList.remove("selected");
  });
  this.querySelectorAll('input[type="hidden"]').forEach((input) => {
    input.remove();
  });
});
