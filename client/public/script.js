import index from "./src/index.js";

async function loadProducts() {
  try {
    const res = await fetch("/products");
    const data = await res.json();

    const list = document.getElementById("productTableBody");
    data.forEach(product => {
      const item = document.createElement("tr");
      item.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
      `;

      list.appendChild(item);
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

index();
loadProducts();