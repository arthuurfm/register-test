export default function modalNewProduct() {
  const sections = document.querySelectorAll('[class*="form"]');
  const overlay = document.getElementById('overlay');
  const form = document.querySelector(`.register-form`);

  sections.forEach(section => section.classList.remove('active'));
  overlay.classList.add('active');
  form.classList.add('active');
}