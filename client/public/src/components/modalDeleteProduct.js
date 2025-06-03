export default function modalDeleteProduct() {
  const sections = document.querySelectorAll('[class*="form"]');
  const overlay = document.getElementById('overlay');
  const form = document.querySelector(`.delete-form`);

  sections.forEach(section => section.classList.remove('active'));
  overlay.classList.add('active');
  form.classList.add('active');
}