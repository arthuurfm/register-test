// Dados simulados
    const produtos = [
      { id: 1, nome: "Arroz", preco: 5.99, estoque: 20 },
      { id: 2, nome: "Feijão", preco: 4.49, estoque: 15 },
      { id: 3, nome: "Macarrão", preco: 2.99, estoque: 30 }
    ];

    // Preencher tabela
    const tbody = document.getElementById("productTableBody");
    produtos.forEach(produto => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>R$ ${produto.preco.toFixed(2)}</td>
        <td>${produto.estoque}</td>
      `;
      tbody.appendChild(tr);
    });

    // Modal lógica
    const radios = document.querySelectorAll('input[name="mode"]');
    const sections = document.querySelectorAll('.form-section');
    const overlay = document.getElementById('overlay');

    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        sections.forEach(section => section.classList.remove('active'));
        overlay.classList.add('active');
        const form = document.querySelector(`.${radio.value}-form`);
        form.classList.add('active');
      });
    });

    // Fechar modal
    const cancelButtons = document.querySelectorAll('.cancel-button');
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