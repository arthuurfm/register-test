import modalChangeProduct from "./modalChangeProduct.js";
import modalDeleteProduct from "./modalDeleteProduct.js";
const list = document.getElementById("productTableBody");

export default function renderProducts(products) {
  products.forEach(product => {
    const item = document.createElement("tr");
    item.classList.add("row");
    item.innerHTML = `
      <td>${product.customId}</td>
      <td class="product-name">${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <div class="buttons active">
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
      // abre o modal de deletar produto.
      if (event.target.classList.contains("delete-button")) {
        modalDeleteProduct(event);
      }
    });
  });
} 