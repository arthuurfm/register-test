export default function modalChangeProduct(row) {
  return new Promise((resolve) => {
    const overlay = document.getElementById('overlay');
    const modal = document.querySelector(".change-form");
    const changeBtn = document.querySelector(".change-btn");
    const cancelBtn = modal.querySelector(".cancel-button");

    // inputs.
    const nameInput = modal.querySelector(".name");
    const priceInput = modal.querySelector(".price");
    const quantityInput = modal.querySelector(".quantity");

    // preenche os campos com os dados atuais do produto.
    nameInput.value = row.dataset.name;
    priceInput.value = row.dataset.price;
    quantityInput.value = row.dataset.quantity;

    modal.classList.add("active");
    overlay.classList.add("active");

    const cleanUp = () => {
      modal.classList.remove("active");
      overlay.classList.remove("active");
      changeBtn.removeEventListener("click", onChange);
      cancelBtn.removeEventListener("click", onCancel);
    }

    // ao clicar em change após preencher o form.
    const onChange = () => {
      const updatedProduct = {
        name: nameInput.value,
        price: parseFloat(priceInput.value),
        quantity: parseInt(quantityInput.value)
      }

      cleanUp();
      resolve(updatedProduct);
    }

    const onCancel = () => {
      cleanUp();
      resolve(null);
    }

    changeBtn.addEventListener("click", onChange);
    cancelBtn.addEventListener("click", onCancel);
  });
}