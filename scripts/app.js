const categoriesContainer = document.getElementById("categories");
const productsContainer = document.getElementById("products");
const trenutnaKategorija = document.querySelector(".trenutna-kategorija");

let activeCategoryIndex = 0;

function renderCategories() {
  categoriesContainer.innerHTML = "";

  data.categories.forEach((category, index) => {
    const div = document.createElement("div");
    div.textContent = category.name;

    if (index === activeCategoryIndex) {
      div.classList.add("active");
    }

    div.addEventListener("click", () => {
      activeCategoryIndex = index;
      renderCategories();
      renderProducts();
      renderCurrentCategory();
    });

    categoriesContainer.appendChild(div);
  });
}

function renderProducts() {
  productsContainer.innerHTML = "";

  const activeCategory = data.categories[activeCategoryIndex];

  activeCategory.products.forEach((product) => {
    const quantity = getProductQuantity(product.name, activeCategory.name);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="slika-wrapper">
        <div class="slika-proizvoda">
          <img src="assets/images/${product.image}" alt="${product.name}">
        </div>
        <button class="add-to-cart-btn" data-name="${product.name}" data-category="${activeCategory.name}">
          🛒
        </button>
        ${quantity > 0 ? `<div class="product-badge">${quantity}</div>` : ""}
      </div>
      <div class="ime-proizvoda">${product.name}</div>
      <div class="kat-proizvoda">${activeCategory.name}</div>
    `;

    productsContainer.appendChild(card);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.name, button.dataset.category);
      renderProducts();
      updateHeaderCartCount();
    });
  });
}

function renderCurrentCategory() {
  trenutnaKategorija.textContent = data.categories[activeCategoryIndex].name;
}

renderCategories();
renderProducts();
renderCurrentCategory();
updateHeaderCartCount();