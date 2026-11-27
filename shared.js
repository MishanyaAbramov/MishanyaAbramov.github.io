const categories = ["soup", "mainDish", "salad", "drink", "dessert"];
const STORAGE_KEY = "selectedDishes";
const API_URL = "https://mishanyaabramov.github.io/dishes.json";

const emptyResult = () => ({
  soup: "",
  mainDish: "",
  salad: "",
  drink: "",
  dessert: "",
});

function loadSelection() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Не удалось разобрать сохранённый выбор:", e);
    return null;
  }
}

function saveSelection(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function clearSelection() {
  localStorage.removeItem(STORAGE_KEY);
}
