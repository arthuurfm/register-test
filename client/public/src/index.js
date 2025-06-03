import cancel from "./components/cancel.js";
import newProduct from "./components/newProduct.js";
import outClick from "./components/outClick.js";
import searchBar from "./components/searchBar.js";

export default function index() {
    // Cria um novo produto.
    const newProductBtn = document.querySelector('.new-product-button');
    newProductBtn.addEventListener('click', newProduct);

    // Fechar modal com o botão cancel.
    const cancelButtons = document.querySelectorAll(".cancel-button");
    cancelButtons.forEach(button => button.addEventListener('click', cancel));

    // Clique fora fecha modal.
    overlay.addEventListener('click', outClick);

    // Aciona a busca ao digitar
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", searchBar);
}