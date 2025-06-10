export default function filters(products) {
  const showAll = document.getElementById("radio-all").checked;
  const showOutOfStock = document.getElementById("radio-out-of-stock").checked;
  const showInStock = document.getElementById("radio-in-stock").checked;
  const showDrecreasing = document.getElementById("radio-decreasing").checked;
  const showIncreasing = document.getElementById("radio-increasing").checked;

  let filtered = [...products];

  // mostra todos os produtos cadastrados.
  if (showAll) filtered = filtered;

  // mostra todos os produtos fora de estoque (estoque = 0).
  if (showOutOfStock) filtered = filtered.filter(p => p.quantity === 0);

  // mostra todos os produtos com pelo menos estoque = 1.
  if (showInStock) filtered = filtered.filter(p => p.quantity > 0);

  // mostra os produtos com preço de ordem decrescente.
  if (showDrecreasing) filtered = filtered.sort((a, b) => b.price - a.price);

  // mostra os produtos com preço de ordem crescente.
  if (showIncreasing) filtered = filtered.sort((a, b) => a.price - b.price);

  return filtered;
}