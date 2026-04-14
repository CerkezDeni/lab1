function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productName, categoryName) {
  const cart = getCart();

  const existingProduct = cart.find(
    (item) => item.name === productName && item.category === categoryName
  );

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      name: productName,
      category: categoryName,
      quantity: 1,
    });
  }

  saveCart(cart);
}

function getProductQuantity(productName, categoryName) {
  const cart = getCart();

  const product = cart.find(
    (item) => item.name === productName && item.category === categoryName
  );

  return product ? product.quantity : 0;
}

function getTotalQuantity() {
  const cart = getCart();
  let total = 0;

  cart.forEach((item) => {
    total += item.quantity;
  });

  return total;
}

function updateHeaderCartCount() {
  const countElement = document.getElementById("cart-count");
  if (!countElement) return;

  const total = getTotalQuantity();
  countElement.textContent = total;
}