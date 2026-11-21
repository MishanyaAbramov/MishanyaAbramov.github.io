const DISHES = [
  {
    keyword: "borscht",
    name: "Борщ",
    price: 195,
    category: "soup",
    kind: "meat",
    count: "350 г",
    image: "pics/borscht (2).png",
  },
  {
    keyword: "tom-yum",
    name: "Том Ям",
    price: 205,
    category: "soup",
    kind: "fish",
    count: "300 г",
    image: "pics/tom-yum.png",
  },
  {
    keyword: "potato-soup",
    name: "Суп-пюре из картофеля",
    price: 175,
    category: "soup",
    kind: "veg",
    count: "400 г",
    image: "pics/potato-soup.png",
  },
  {
    keyword: "fish-soup",
    name: "Уха",
    price: 220,
    category: "soup",
    kind: "fish",
    count: "350 г",
    image: "food/uha.png",
  },
  {
    keyword: "mushroom-soup",
    name: "Грибной суп",
    price: 185,
    category: "soup",
    kind: "veg",
    count: "300 г",
    image: "food/shroom.jfif",
  },
  {
    keyword: "chicken-noodle-soup",
    name: "Куриный суп с лапшой",
    price: 190,
    category: "soup",
    kind: "meat",
    count: "350 г",
    image: "food/chickensoup.png",
  },
  {
    keyword: "chicken-tenders",
    name: "Куриные наггетсы",
    price: 225,
    category: "mainDish",
    kind: "meat",
    count: "200 г",
    image: "pics/chicken-tenders.png",
  },
  {
    keyword: "fried-potatoes",
    name: "Картошка фри",
    price: 165,
    category: "mainDish",
    kind: "veg",
    count: "400 г",
    image: "pics/fries.png",
  },
  {
    keyword: "pasta-carbonara",
    name: "Паста Карбонара",
    price: 250,
    category: "mainDish",
    kind: "meat",
    count: "300 г",
    image: "pics/pasta.png",
  },
  {
    keyword: "salmon-steak",
    name: "Стейк из лосося",
    price: 450,
    category: "mainDish",
    kind: "fish",
    count: "250 г",
    image: "food/salmon.png",
  },
  {
    keyword: "veg-curry",
    name: "Овощное карри",
    price: 280,
    category: "mainDish",
    kind: "veg",
    count: "300 г",
    image: "food/curry.png",
  },
  {
    keyword: "beef-steak",
    name: "Стейк из говядины",
    price: 550,
    category: "mainDish",
    kind: "meat",
    count: "300 г",
    image: "food/steak.png",
  },
  {
    keyword: "caesar-with-salmon",
    name: "Цезарь с лососем",
    price: 320,
    category: "salad",
    kind: "fish",
    count: "200 г",
    image: "food/cesar-salmon.png",
  },
  {
    keyword: "caesar-with-chicken",
    name: "Цезарь с курицей",
    price: 280,
    category: "salad",
    kind: "meat",
    count: "200 г",
    image: "food/cesar-chicken.png",
  },
  {
    keyword: "greek-salad",
    name: "Греческий салат",
    price: 240,
    category: "salad",
    kind: "veg",
    count: "220 г",
    image: "food/greek-salad.avif",
  },
  {
    keyword: "veg-spring-rolls",
    name: "Овощные спринг-роллы",
    price: 210,
    category: "salad",
    kind: "veg",
    count: "200 г",
    image: "food/spring-rolls.avif",
  },
  {
    keyword: "avocado-salad",
    name: "Салат с авокадо",
    price: 260,
    category: "salad",
    kind: "veg",
    count: "180 г",
    image: "food/avocado.webp",
  },
  {
    keyword: "caprese",
    name: "Салат Капрезе",
    price: 290,
    category: "salad",
    kind: "veg",
    count: "200 г",
    image: "food/caprese.avif",
  },
  {
    keyword: "beer",
    name: "Пиво",
    price: 150,
    category: "drink",
    kind: "cold",
    count: "500 мл",
    image: "pics/beer.png",
  },
  {
    keyword: "wine",
    name: "Вино",
    price: 300,
    category: "drink",
    kind: "cold",
    count: "750 мл",
    image: "pics/wine.webp",
  },
  {
    keyword: "apple-juice",
    name: "Яблочный сок",
    price: 120,
    category: "drink",
    kind: "cold",
    count: "250 мл",
    image: "pics/apple-juice.webp",
  },
  {
    keyword: "lemonade",
    name: "Домашний лимонад",
    price: 180,
    category: "drink",
    kind: "cold",
    count: "400 мл",
    image: "food/lemonade.png",
  },
  {
    keyword: "tea",
    name: "Чай (черный/зеленый)",
    price: 100,
    category: "drink",
    kind: "hot",
    count: "300 мл",
    image: "food/tea.webp",
  },
  {
    keyword: "cappuccino",
    name: "Капучино",
    price: 160,
    category: "drink",
    kind: "hot",
    count: "200 мл",
    image: "food/capuccino.png",
  },
  {
    keyword: "macaron",
    name: "Пироможное Макарон",
    price: 90,
    category: "dessert",
    kind: "small",
    count: "30 г",
    image: "food/macaron.avif",
  },
  {
    keyword: "eclair",
    name: "Эклер",
    price: 120,
    category: "dessert",
    kind: "small",
    count: "75 г",
    image: "food/ecler.png",
  },
  {
    keyword: "cheesecake",
    name: "Чизкейк",
    price: 250,
    category: "dessert",
    kind: "medium",
    count: "150 г",
    image: "food/cheesecake.png",
  },
  {
    keyword: "tiramisu",
    name: "Тирамису",
    price: 280,
    category: "dessert",
    kind: "medium",
    count: "160 г",
    image: "food/tiramisu.png",
  },
  {
    keyword: "apple-pie",
    name: "Яблочный пирог",
    price: 350,
    category: "dessert",
    kind: "large",
    count: "250 г",
    image: "food/pie.png",
  },
];

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
