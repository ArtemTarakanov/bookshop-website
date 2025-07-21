const cartIcon = document.querySelector(".header__icon") as HTMLElement;
const cartBadge = document.querySelector(".header__cart-badge") as HTMLElement;

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cart.length > 0) {
    cartBadge.textContent = cart.length.toString();
    cartBadge.style.display = "flex";
    cartIcon.classList.add("header__icon--cart", "has-items");
  } else {
    cartBadge.style.display = "none";
    cartIcon.classList.remove("header__icon--cart", "has-items");
  }
}

function toggleCart(bookId: string, button: HTMLButtonElement) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cart.includes(bookId)) {
    cart = cart.filter((id: string) => id !== bookId);
    button.textContent = "BUY NOW";
    button.classList.remove("in-cart");
  } else {
    cart.push(bookId);
    button.textContent = "IN THE CART";
    button.classList.add("in-cart");
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

export { updateCartBadge, toggleCart };
