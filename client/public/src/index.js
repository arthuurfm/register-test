export default function index() {
    // Modal lógica
    const newProductBtn = document.querySelector('.new-product-button');
    const sections = document.querySelectorAll('[class*="form"]');
    const overlay = document.getElementById('overlay');

    newProductBtn.addEventListener('click', () => {
      sections.forEach(section => section.classList.remove('active'));
      overlay.classList.add('active');
      const form = document.querySelector(`.register-form`);
      form.classList.add('active');
    });

    // Fechar modal
    const buttons = document.querySelectorAll(".cancel-button");
    buttons.forEach(btn => {
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
}