import renderProducts from "../src/components/renderProducts.js";

const name = document.getElementById ("name");
const quantity = document.getElementById ("quantity");
const price = document.getElementById ("price");

export async function loadProducts() {
  try {
    const res = await fetch("/products");

    if (!res.ok) throw new Error("Erro na resposta: ", res.status);
    
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Resposta inesperada:", data);
      return;
    }

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

    // carregando os produtos em formato de array ao cadastrar.
    loadProducts();

    // limpa os campos após o envio.
    name.value = "";
    quantity.value = "";
    price.value = "";

    form.classList.remove('active');
    overlay.classList.remove('active');
      
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
        
        // carregando os produtos em formato de array ao excluir.
        loadProducts();
        
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
      }
    }
  })
}