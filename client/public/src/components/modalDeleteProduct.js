export default function modalDeleteProduct() {
  return new Promise ((resolve) => {
    const overlay = document.getElementById('overlay');
    const modal = document.querySelector(".delete-form");
    const deleteBtn = document.querySelector(".delete-btn");
    const cancelBtn = modal.querySelector(".cancel-button");

    modal.classList.add("active");
    overlay.classList.add("active");

    const cleanUp = () => {
      modal.classList.remove("active");
      overlay.classList.remove("active");
      deleteBtn.removeEventListener("click", onDelete);
      cancelBtn.removeEventListener("click", onCancel);
    }

    // ao clicar em deletar.
    const onDelete = () => {  
      cleanUp();
      resolve(true);
    }

    const onCancel = () => {
      cleanUp();
      resolve(false);
    }

    deleteBtn.addEventListener("click", onDelete);
    cancelBtn.addEventListener("click", onCancel);
   });
}