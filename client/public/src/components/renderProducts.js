import modalChangeProduct from "./modalChangeProduct.js";
const list = document.getElementById("productTableBody");

export default function renderProducts(products) {
  products.forEach(product => {
    const item = document.createElement("tr");
    item.classList.add("row");
    item.dataset.id = product.customId;
    item.innerHTML = `
      <td>${product.customId}</td>
      <td class="product-name">${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <div class="buttons">
        <button class="change-button">🖉</button>
        <button class="delete-button">🗑</button>
      </div>
    `;
  
    list.appendChild(item);
    list.addEventListener('click', (event) => {
      // abre o modal de alterar produto.
      if (event.target.classList.contains("change-button")) {
        modalChangeProduct(event);
      }
    });
  });
} 