import React from 'react';
import { Book } from '../types';
import { renderStars, truncateDescription } from '../utils/helpers';

interface BookCardProps {
  book: Book;
  isInCart: boolean;
  onToggleCart: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isInCart, onToggleCart }) => {
  const { volumeInfo, saleInfo, id } = book;
  const authors = volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown author";
  const title = volumeInfo.title || "No title";
  const description = volumeInfo.description
    ? truncateDescription(volumeInfo.description, 200)
    : "No description available.";
  const image = volumeInfo.imageLinks?.thumbnail || "https://placehold.co/128x192";
  const rating = volumeInfo.averageRating || null;
  const ratingsCount = volumeInfo.ratingsCount || 0;
  const price = saleInfo?.retailPrice?.amount ? `${saleInfo.retailPrice.amount}` : null;

  return (
    <div className="book-card">
      <div className="book-card__image">
        <img src={image} alt={title} />
      </div>
      <div className="book-card__info">
        <h3 className="book-card__author">{authors}</h3>
        <h2 className="book-card__title">{title}</h2>
        {rating && (
          <div className="book-card__rating">
            <div className="book-card__stars">{renderStars(rating)}</div>
            <div className="book-card__reviews">{ratingsCount} reviews</div>
          </div>
        )}
        <p className="book-card__description">{description}</p>
        {price && <div className="book-card__price">{price}</div>}
        <button 
          className={`book-card__button ${isInCart ? 'in-cart' : ''}`}
          onClick={() => onToggleCart(id)}
        >
          {isInCart ? 'IN THE CART' : 'BUY NOW'}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
