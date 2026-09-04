document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  const search = document.getElementById("searchInput");
  const category = document.getElementById("categoryFilter");
  const sort = document.getElementById("sortSelect");
  let products = [];

  try {
    products = await apiGet("/products");
    const categories = [...new Set(products.map(p => p.category))];
    category.innerHTML += categories.map(c => `<option>${c}</option>`).join("");
    const params = new URLSearchParams(location.search);
    category.value = params.get("category") || "";
    render();
  } catch (e) {
    grid.innerHTML = "<p>Unable to load products. Start the backend server.</p>";
  }

  function render() {
    let list = products.filter(p => (!category.value || p.category === category.value) &&
      (!search.value || p.name.toLowerCase().includes(search.value.toLowerCase())));
    if (sort.value === "low") list.sort((a,b)=>(a.salePrice||a.price)-(b.salePrice||b.price));
    if (sort.value === "high") list.sort((a,b)=>(b.salePrice||b.price)-(a.salePrice||a.price));
    if (sort.value === "rating") list.sort((a,b)=>(b.rating||0)-(a.rating||0));
    grid.innerHTML = list.length ? list.map(productCard).join("") : "<p>No products found.</p>";
  }

  search.addEventListener("input", render);
  category.addEventListener("change", render);
  sort.addEventListener("change", render);
});