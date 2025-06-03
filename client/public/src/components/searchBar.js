export default function searchBar() {
  const filter = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll("#productTableBody tr");

  rows.forEach(row => {
    const productName = row.querySelector(".product-name");
    const rowText = productName.textContent.toLowerCase();
    // mostra a linha da tabela, se não, fica invisível.
    row.style.display = rowText.includes(filter) ? "" : "none";
  });
}