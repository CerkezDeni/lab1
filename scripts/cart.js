const cartBody = document.getElementById("cartBody");

function renderCart() {
  const cart = getCart();
  cartBody.innerHTML = "";

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <tr>
        <td colspan="2">Košarica je prazna.</td>
      </tr>
    `;
    updateHeaderCartCount();
    return;
  }

  cart.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.name}</td>
      <td class="kolicina">
        <button class="minus" data-index="${index}">-</button>
        <span class="counter">${item.quantity}</span>
        <button class="plus" data-index="${index}">+</button>
      </td>
    `;

    cartBody.appendChild(row);
  });

  updateHeaderCartCount();
}

cartBody.addEventListener("click", function (e) {
  const cart = getCart();

  if (e.target.classList.contains("plus")) {
    const index = Number(e.target.dataset.index);
    cart[index].quantity++;
    saveCart(cart);
    renderCart();
  }

  if (e.target.classList.contains("minus")) {
    const index = Number(e.target.dataset.index);
    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    saveCart(cart);
    renderCart();
  }
});

renderCart();