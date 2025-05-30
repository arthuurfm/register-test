import index from "./src/index.js";

const name = document.getElementById("name");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const submit = document.querySelector(".submit")

async function loadProducts() {
  try {
    const res = await fetch("/products");
    const data = await res.json();

    const list = document.getElementById("productTableBody");
    data.forEach(product => {
      const item = document.createElement("tr");
      item.innerHTML = `
        <td>${product.customId}</td>
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

function createProduct() {
  
  submit.addEventListener("click", async () => {
    const product = {
      name: name.value,
      quantity: parseInt(quantity.value),
      price: parseFloat(price.value)
    };
    
    try {
      const res = await fetch("/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      if (!res.ok) {
        throw new Error("Erro ao cadastrar produto");
      }

      // Limpa campos após envio
      name.value = "";
      quantity.value = "";
      price.value = "";

      } catch (error) {
        console.log(error);
      }
    });
}

index();
loadProducts();
createProduct();