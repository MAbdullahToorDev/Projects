document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("productDetail");
  const id = new URLSearchParams(location.search).get("id");
  if (!id) { container.innerHTML = "<p>Product not found.</p>"; return; }
  try {
    const p = await apiGet("/products/" + id);
    let qty = 1;
    const price = p.salePrice || p.price;
    container.innerHTML = `<div class="product-detail">
      <div class="detail-image">${p.emoji || "🛍️"}</div>
      <div class="detail-content">
        <p class="eyebrow">${p.category}</p>
        <h1>${p.name}</h1>
        <div class="rating">⭐ ${p.rating || 0} / 5</div>
        <p class="detail-price">Rs. ${Number(price).toLocaleString()}</p>
        <p>${p.description}</p>
        <p><strong>Stock:</strong> ${p.stock}</p>
        <div class="quantity"><button id="minus">−</button><strong id="qty">1</strong><button id="plus">+</button></div>
        <button class="btn btn-primary" id="add">Add to Cart</button>
        <a class="btn btn-light" href="cart.html">View Cart</a>
      </div></div>`;
    const qtyEl = document.getElementById("qty");
    document.getElementById("plus").onclick = () => { if(qty < p.stock){qty++;qtyEl.textContent=qty;} };
    document.getElementById("minus").onclick = () => { if(qty > 1){qty--;qtyEl.textContent=qty;} };
    document.getElementById("add").onclick = () => {
      const cart = getCart(); const item = cart.find(i=>i._id===p._id);
      if(item) item.quantity += qty; else cart.push({...p, quantity:qty});
      saveCart(cart); alert("Added to cart.");
    };
  } catch(e) { container.innerHTML = "<p>Unable to load product.</p>"; }
});