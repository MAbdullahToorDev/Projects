document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("mainNav");
  if (menuBtn && nav) menuBtn.addEventListener("click", () => nav.style.display = nav.style.display === "flex" ? "none" : "flex");

  updateCartCount();

  const categoryGrid = document.getElementById("categoryGrid");
  if (categoryGrid) loadCategories(categoryGrid);

  const featured = document.getElementById("featuredProducts");
  if (featured) loadFeaturedProducts(featured);
});

const categoryIcons = {
  Fashion: "👕", Food: "🍪", Breakfast: "☕", Skincare: "🧴",
  "Beauty & Personal Care": "💄", Tools: "🔧", Electronics: "🎧", "Home & Kitchen": "🏠"
};

async function loadCategories(container) {
  try {
    const categories = await apiGet("/categories");
    container.innerHTML = categories.map(c => `
      <a class="category-card" href="products.html?category=${encodeURIComponent(c.name)}">
        <div class="category-icon">${categoryIcons[c.name] || "🛒"}</div>
        <h3>${c.name}</h3><p>${c.description}</p>
      </a>`).join("");
  } catch (e) {
    container.innerHTML = "<p>Unable to load categories. Start the backend server.</p>";
  }
}

async function loadFeaturedProducts(container) {
  try {
    const products = await apiGet("/products");
    container.innerHTML = products.slice(0, 8).map(productCard).join("");
  } catch (e) {
    container.innerHTML = "<p>Unable to load products. Start the backend server.</p>";
  }
}

function productCard(p) {
  const price = p.salePrice || p.price;
  return `<article class="product-card">
    <div class="product-image">${p.emoji || "🛍️"}</div>
    <div class="product-body">
      <div class="product-category">${p.category}</div>
      <h3>${p.name}</h3>
      <div class="rating">⭐ ${p.rating || 0}</div>
      <div class="price">Rs. ${Number(price).toLocaleString()} ${p.salePrice ? `<span class="old-price">Rs. ${Number(p.price).toLocaleString()}</span>` : ""}</div>
      <div class="product-actions">
        <button class="btn btn-primary" onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
        <a class="btn btn-light" href="product.html?id=${p._id}">Details</a>
      </div>
    </div>
  </article>`;
}

function getCart() { return JSON.parse(localStorage.getItem("toorCart") || "[]"); }
function saveCart(cart) { localStorage.setItem("toorCart", JSON.stringify(cart)); updateCartCount(); }

function addToCart(product) {
  const cart = getCart();
  const item = cart.find(i => i._id === product._id);
  if (item) item.quantity += 1;
  else cart.push({...product, quantity: 1});
  saveCart(cart);
  alert(`${product.name} added to cart.`);
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#cartCount").forEach(el => el.textContent = count);
}