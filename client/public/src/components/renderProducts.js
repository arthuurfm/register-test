import modalChangeProduct from "./modalChangeProduct.js";
const list = document.getElementById("productTableBody");
list.innerHTML = "";

export default function renderProducts(products) {
  products.forEach((product, index) => {
    const item = document.createElement("tr");
    item.classList.add("row");
    item.dataset.id = product._id;
    item.innerHTML = `
      <td>${index + 1}</td>
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