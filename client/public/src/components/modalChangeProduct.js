export default function modalChangeProduct() {
  const sections = document.querySelectorAll('[class*="form"]');
  const overlay = document.getElementById('overlay');
  const form = document.querySelector(`.change-form`);

  sections.forEach(section => section.classList.remove('active'));
  overlay.classList.add('active');
  form.classList.add('active');
}