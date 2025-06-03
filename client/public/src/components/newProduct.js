export default function newProduct() {
  const sections = document.querySelectorAll('[class*="form"]');

  sections.forEach(section => section.classList.remove('active'));
  overlay.classList.add('active');
  const form = document.querySelector(`.register-form`);
  form.classList.add('active');
}