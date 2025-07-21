import "./styles/styles.scss";
import { initSlider } from "./components/slider";
import { initBooks } from "./components/books";
import { updateCartBadge } from "./components/cart";
import { initBurgerMenu } from './components/burger';

console.log("📚 Bookshop is starting...");
initSlider();
initBooks();
updateCartBadge();
initBurgerMenu();
