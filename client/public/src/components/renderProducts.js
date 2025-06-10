const list = document.getElementById("productTableBody");

export default function renderProducts(products) {
  list.innerHTML = "";
  
  products.forEach((product, index) => {
    const item = document.createElement("tr");

    item.classList.add("row");
    item.dataset.id = product._id;
    item.dataset.name = product.name;
    item.dataset.price = product.price;
    item.dataset.quantity = product.quantity;

    const formatedPrice = product.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

    item.innerHTML = `
      <td>${index + 1}</td>
      <td class="product-name">${product.name}</td>
      <td class="product-price">${formatedPrice}</td>
      <td class="product-quantity">${product.quantity}</td>
      <div class="buttons">
        <button class="change-button">🖉</button>
        <button class="delete-button">🗑</button>
      </div>
    `;
  
    list.appendChild(item);
  });
}