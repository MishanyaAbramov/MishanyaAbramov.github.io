const DISHES = [
  {
    keyword: "borscht",
    name: "Борщ",
    price: 195,
    category: "soup",
    count: "350 г",
    image: "pics/borscht (2).png",
  },
  {
    keyword: "tom-yum",
    name: "Том Ям",
    price: 205,
    category: "soup",
    count: "300 г",
    image: "pics/tom-yum.png",
  },
  {
    keyword: "potato-soup",
    name: "Сюп-пюре из картофеля",
    price: 175,
    category: "soup",
    count: "400 г",
    image: "pics/potato-soup.png",
  },
  {
    keyword: "chicken-tenders",
    name: "Куриные наггетсы",
    price: 225,
    category: "mainDish",
    count: "200 г",
    image: "pics/chicken-tenders.jfif",
  },
  {
    keyword: "fried-potatoes",
    name: "Картошка фри",
    price: 165,
    category: "mainDish",
    count: "400 г",
    image: "pics/fried-potatoes.avif",
  },
  {
    keyword: "pasta-carbonara",
    name: "Паста Карбонара",
    price: 250,
    category: "mainDish",
    count: "300 г",
    image: "pics/pasta (2).jfif",
  },
  {
    keyword: "beer",
    name: "Пиво",
    price: 150,
    category: "drink",
    count: "500 мл",
    image: "pics/beer.jfif",
  },
  {
    keyword: "wine",
    name: "Вино",
    price: 300,
    category: "drink",
    count: "750 мл",
    image: "pics/wine.webp",
  },
  {
    keyword: "apple-juice",
    name: "Яблочный сок",
    price: 120,
    category: "drink",
    count: "250 мл",
    image: "pics/apple-juice.webp",
  },
];

const result = {
  soup: "",
  mainDish: "",
  drink: "",
};

const categories = ["soup", "mainDish", "drink"];
let catPrices = [0, 0, 0];
let currentCost = 0;

const template = document.querySelector("#template");
const templateContent = template.content;

const handleClickBtn = function (event) {
  const btn = event.target;
  const keyword = btn.dataset.dish;
  const parentKey = btn.closest(".card_out").dataset.dish;
  result[parentKey] = keyword;
  const dish = DISHES.find((el) => el.keyword === keyword);
  const category = dish.category;

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

for (let j = 0; j < categories.length; j++) {
  for (let i = 0; i < DISHES.length; i++) {
    const { image, price, name, count, keyword } = DISHES[i];

    const foodCard = templateContent.cloneNode(true);

    if (DISHES[i].category !== categories[j]) {
      continue;
    }

    foodCard.querySelector(".food_img").src = image;
    foodCard.querySelector(".cost").textContent = price + "₽";
    foodCard.querySelector(".long_t").textContent = name;
    foodCard.querySelector(".weight").textContent = count;
    const btn = foodCard.querySelector(".append");
    btn.dataset.dish = keyword;
    btn.addEventListener("click", handleClickBtn);
    document
      .querySelector(`[data-dish="${categories[j]}"]`)
      .appendChild(foodCard);
  }
}

document.querySelector("form").addEventListener("submit", function () {
  const fields = ["soup", "mainDish", "drink", "cost"];
  fields.forEach((field) => {
    const p = document.getElementById(field);
    if (!p) return;
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = field;
    input.value = p.textContent.trim();
    this.appendChild(input);
  });
});
