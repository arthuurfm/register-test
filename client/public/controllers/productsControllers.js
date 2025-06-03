const list = document.getElementById("productTableBody");
const name = document.getElementById ("name");
const quantity = document.getElementById ("quantity");
const price = document.getElementById ("price");

export async function loadProducts() {
  try {
    const res = await fetch("/products");
    const data = await res.json();

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


export async function createProduct() {
  const submit = document.querySelector (".submit")
  submit.addEventListener("click",async () => {
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

    name.value = "" 
    quantity.value = "" 
    price.value = "" 
  
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
  })
}
  

