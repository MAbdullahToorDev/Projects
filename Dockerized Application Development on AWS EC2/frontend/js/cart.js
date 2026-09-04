document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
  const items = document.getElementById("cartItems");
  const summary = document.getElementById("cartSummary");
  const cart = getCart();
  if (!cart.length) {
    items.innerHTML = `<div class="info-card"><h2>Your cart is empty.</h2><p>Start shopping to add products.</p><a class="btn btn-primary" href="products.html">Shop Products</a></div>`;
    summary.innerHTML = "";
    return;
  }
  items.innerHTML = cart.map((p,i) => `<div class="cart-item">
    <div class="cart-item-image">${p.emoji || "🛍️"}</div>
    <div class="cart-item-info"><strong>${p.name}</strong><p>Rs. ${Number(p.salePrice||p.price).toLocaleString()}</p></div>
    <div class="qty-controls"><button onclick="changeQty(${i},-1)">−</button><strong>${p.quantity}</strong><button onclick="changeQty(${i},1)">+</button></div>
    <strong>Rs. ${Number((p.salePrice||p.price)*p.quantity).toLocaleString()}</strong>
    <button class="btn" onclick="removeItem(${i})">Remove</button>
  </div>`).join("");
  const total = cart.reduce((s,p)=>s+(p.salePrice||p.price)*p.quantity,0);
  summary.innerHTML = `<h2>Order Summary</h2><div class="summary-row"><span>Subtotal</span><strong>Rs. ${total.toLocaleString()}</strong></div><div class="summary-row"><span>Delivery</span><strong>Calculated later</strong></div><div class="summary-row summary-total"><span>Total</span><strong>Rs. ${total.toLocaleString()}</strong></div><button class="btn btn-primary" style="width:100%;margin-top:15px" onclick="checkout()">Place Demo Order</button>`;
}
function changeQty(i,d){const c=getCart();c[i].quantity=Math.max(1,c[i].quantity+d);saveCart(c);renderCart();}
function removeItem(i){const c=getCart();c.splice(i,1);saveCart(c);renderCart();}
function checkout(){alert("Demo checkout. Connect this button to POST /api/orders when you build your real checkout flow.");}