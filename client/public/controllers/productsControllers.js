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
  const overlay = document.getElementById('overlay');
  const form = document.querySelector(`.register-form`);
  const submit = document.querySelector(".submit-button");
  
  submit.onclick = async () => {
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
      throw new Error("erro ao cadastrar produto");
    }

    // limpa os campos após o envio.
    name.value = "";
    quantity.value = "";
    price.value = "";

    form.classList.remove('active');
    overlay.classList.remove('active');

    const data = res.json();
    renderProducts(data);
      
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
  };
}

export async function deleteProduct() {
  const table = document.getElementById("productTableBody");
  table.addEventListener('click', async (event) => {
    if (event.target.classList.contains("delete-button")) {
      const row = event.target.closest("tr");
      
      if (!row) return;
      
      const id = row.dataset.id;
      
      // confirmar antes de deletar.
      const confirmed = confirm("Are you sure you want to delete?");
      if (!confirmed) return;
      
      try {
        const res = await fetch(`/products/${id}`, {method: "DELETE"});
        
        if (!res.ok) throw new Error("Erro ao deletar!");
        
        
        // remove a linha.
        row.remove();
        
        const data = res.json();
        renderProducts(data);

      } catch (error) {
        console.error("Erro ao deletar produto:", error);
      }
    }
  })
}