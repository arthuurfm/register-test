import closeModal from "./components/closeModal.js";
import modalNewProduct from "./components/modalNewProduct.js";
import searchBar from "./components/searchBar.js";

export default function index() {
    // Cria um novo produto.
    const newProductButton = document.querySelector('.new-product-button');
    newProductButton.addEventListener('click', modalNewProduct);

    // Fechar modal com o botão cancel.
    const cancelButtons = document.querySelectorAll(".cancel-button");
    cancelButtons.forEach(button => button.addEventListener('click', closeModal));

    // Clique fora fecha modal.
    overlay.addEventListener('click', closeModal);

    // Aciona a busca ao digitar
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", searchBar);
}