import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Books from './components/Books';
import './styles/styles.scss';

const App: React.FC = () => {
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleToggleCart = (bookId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.includes(bookId)
        ? prevCart.filter((id) => id !== bookId)
        : [...prevCart, bookId];
      
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <>
      <Header cartCount={cart.length} />
      <main className="main">
        <Banner />
        <Books cart={cart} onToggleCart={handleToggleCart} />
      </main>
    </>
  );
};

export default App;
