import { truncateDescription, renderStars } from "./utils";
import { updateCartBadge, toggleCart } from "./cart";

const API_KEY = "AIzaSyDEZ_URml4cE5hbQDYwPMyU8TzEntheTPI";
const API_URL = "https://www.googleapis.com/books/v1/volumes";
const booksContainer = document.getElementById("books-list") as HTMLElement;
const loadMoreButton = document.getElementById("load-more") as HTMLButtonElement;
const categories = document.querySelectorAll(".categories__item");

let currentCategory = "Architecture";
let startIndex = 0;
const maxResults = 6;

async function fetchBooks(category: string, start: number) {
  try {
    const response = await fetch(
      `${API_URL}?q=subject:${encodeURIComponent(category)}&key=${API_KEY}&printType=books&startIndex=${start}&maxResults=${maxResults}&langRestrict=en`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("❌ Ошибка при получении книг:", error);
    return [];
  }
}

function renderBookCard(book: any) {
  const { volumeInfo, saleInfo, id } = book;
  const authors = volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown author";
  const title = volumeInfo.title || "No title";
  const description = volumeInfo.description
    ? truncateDescription(volumeInfo.description, 200)
    : "No description available.";
  const image = volumeInfo.imageLinks?.thumbnail || "https://placehold.co/128x192";
  const rating = volumeInfo.averageRating || null;
  const ratingsCount = volumeInfo.ratingsCount || 0;
  const price = saleInfo?.retailPrice?.amount ? `$${saleInfo.retailPrice.amount}` : null;

  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.innerHTML = `
    <div class="book-card__image">
      <img src="${image}" alt="${title}" />
    </div>
    <div class="book-card__info">
      <h3 class="book-card__author">${authors}</h3>
      <h2 class="book-card__title">${title}</h2>
      ${rating ? `<div class="book-card__rating">
          <div class="book-card__stars">${renderStars(rating)}</div>
          <div class="book-card__reviews">${ratingsCount} reviews</div>
        </div>` : ""}
      <p class="book-card__description">${description}</p>
      ${price ? `<div class="book-card__price">${price}</div>` : ""}
      <button class="book-card__button">BUY NOW</button>
    </div>
  `;

  const button = bookCard.querySelector(".book-card__button") as HTMLButtonElement;
  button.addEventListener("click", () => toggleCart(id, button));
  booksContainer.appendChild(bookCard);

  // Проверка состояния кнопки
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cart.includes(id)) {
    button.textContent = "IN THE CART";
    button.classList.add("in-cart");
  }
}

async function loadBooks() {
  const books = await fetchBooks(currentCategory, startIndex);
  books.forEach(renderBookCard);
  startIndex += maxResults;
}

function initBooks() {
  loadBooks();
  loadMoreButton.addEventListener("click", loadBooks);

  // Переключение категорий
  categories.forEach(category => {
    category.addEventListener("click", () => {
      categories.forEach(el => el.classList.remove("categories__item--active"));
      category.classList.add("categories__item--active");
      currentCategory = category.textContent?.trim() || "Business";
      startIndex = 0;
      booksContainer.innerHTML = "";
      loadBooks();

      // Закрытие списка категорий на мобилке
      const categoriesList = document.querySelector(".categories") as HTMLElement;
      const categoriesToggle = document.querySelector(".categories__toggle") as HTMLElement;
      if (categoriesList.classList.contains("categories--active")) {
        categoriesList.classList.remove("categories--active");
        categoriesToggle.classList.remove("categories__toggle--active");
      }
    });
  });

  // Раскрытие списка категорий
  const categoriesToggle = document.querySelector(".categories__toggle") as HTMLElement;
  const categoriesList = document.querySelector(".categories") as HTMLElement;

  if (categoriesToggle && categoriesList) {
    categoriesToggle.addEventListener("click", () => {
      categoriesList.classList.toggle("categories--active");
      categoriesToggle.classList.toggle("categories__toggle--active");
    });
  }
}


export { initBooks };
