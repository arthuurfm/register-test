export default function cancel() {
  const sections = document.querySelectorAll('[class*="form"]');
  const overlay = document.getElementById('overlay');

  sections.forEach(section => section.classList.remove('active'));
  overlay.classList.remove('active');
}