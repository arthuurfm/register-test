import renderProducts from "../src/components/renderProducts.js";

const name = document.getElementById ("name");
const quantity = document.getElementById ("quantity");
const price = document.getElementById ("price");

export async function loadProducts() {
  try {
    const res = await fetch("/products");
    const data = await res.json();

    renderProducts(data);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

export async function createProduct() {
  const submit = document.querySelector (".submit-button");
  submit.addEventListener("click", async () => {
    const product = {
      name: name.value,
      quantity: parseInt(quantity.value),
      price: parseFloat(price.value),
    }
    try {
      const res = await fetch("/products",{
        method: "POST", 
        headers: {
          "content-Type" : "application/json"
        },
        body: JSON.stringify(product)
    });

    if (!res.ok) {
      throw new Error ("erro ao cadastrar produto")
    }

    // limpa os campos após o envio.
    name.value = "" 
    quantity.value = "" 
    price.value = "" 
  
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
  });
}
