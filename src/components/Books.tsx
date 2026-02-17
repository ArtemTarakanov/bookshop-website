import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import BookCard from './BookCard';

const API_KEY = "AIzaSyDEZ_URml4cE5hbQDYwPMyU8TzEntheTPI";
const API_URL = "https://www.googleapis.com/books/v1/volumes";
const MAX_RESULTS = 6;

const categories = [
  "Architecture", "Art & Fashion", "Biography", "Business", 
  "Crafts & Hobbies", "Drama", "Fiction", "Food & Drink",
  "Health & Wellbeing", "History & Politics", "Humor", "Poetry",
  "Psychology", "Science", "Technology", "Travel & Maps"
];

interface BooksProps {
  cart: string[];
  onToggleCart: (bookId: string) => void;
}

const Books: React.FC<BooksProps> = ({ cart, onToggleCart }) => {
  const [currentCategory, setCurrentCategory] = useState("Architecture");
  const [books, setBooks] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const fetchBooks = async (category: string, start: number) => {
    try {
      const response = await fetch(
        `${API_URL}?q=subject:${encodeURIComponent(category)}&key=${API_KEY}&printType=books&startIndex=${start}&maxResults=${MAX_RESULTS}&langRestrict=en`
      );
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("❌ Ошибка при получении книг:", error);
      return [];
    }
  };

  const loadBooks = async () => {
    const newBooks = await fetchBooks(currentCategory, startIndex);
    setBooks((prev) => [...prev, ...newBooks]);
    setStartIndex((prev) => prev + MAX_RESULTS);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setBooks([]);
    setStartIndex(0);
    setIsCategoriesOpen(false);
    
    setTimeout(async () => {
      const newBooks = await fetchBooks(category, 0);
      setBooks(newBooks);
      setStartIndex(MAX_RESULTS);
    }, 0);
  };

  return (
    <section className="books">
      <aside className="books__categories">
        <button 
          className="categories__toggle"
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
        >
          Categories
        </button>
        <ul className={`categories ${isCategoriesOpen ? 'categories--active' : ''}`}>
          {categories.map((category) => (
            <li
              key={category}
              className={`categories__item ${category === currentCategory ? 'categories__item--active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      <div className="books__list-wrapper">
        <div className="books__list">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isInCart={cart.includes(book.id)}
              onToggleCart={onToggleCart}
            />
          ))}
        </div>
        <button className="books__load-more" onClick={loadBooks}>
          Load more
        </button>
      </div>
    </section>
  );
};

export default Books;
