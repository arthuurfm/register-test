export default function index() {
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
    const buttons = document.querySelectorAll("button");
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