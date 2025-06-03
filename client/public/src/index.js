export default function index() {
    document.addEventListener("DOMContentLoaded", () => {
      // Modal lógica
      const sections = document.querySelectorAll('[class*="form"]');
      const overlay = document.getElementById('overlay');

      const newProductBtn = document.querySelector('.new-product-button');
      const changeButton = document.querySelector(".change-button");
      const deleteButton = document.querySelector(".delete-button");

      newProductBtn.addEventListener('click', () => {
        sections.forEach(section => section.classList.remove('active'));
        overlay.classList.add('active');
        const form = document.querySelector(`.register-form`);
        form.classList.add('active');
      });

      // Fechar modal
      const cancelButtons = document.querySelectorAll(".cancel-button");
      cancelButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          sections.forEach(section => section.classList.remove('active'));
          overlay.classList.remove('active');
        });
      });

      // Clique fora fecha modal
      overlay.addEventListener('click', () => {
        sections.forEach(section => section.classList.remove('active'));
        overlay.classList.remove('active');
      });

    });

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function searchTable() {
      const filter = searchInput.value.toLowerCase();
      const rows = document.querySelectorAll("#productTableBody tr");

      rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(filter) ? "" : "none";
        });
    }

    // Aciona a busca ao digitar
    searchInput.addEventListener("input", searchTable);
}