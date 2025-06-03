export default function searchBar() {
  const filter = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll("#productTableBody tr");

  rows.forEach(row => {
    const rowText = row.textContent.toLowerCase();
    row.style.display = rowText.includes(filter) ? "" : "none";
  });
}