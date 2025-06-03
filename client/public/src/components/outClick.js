export default function outClick() {
  const overlay = document.getElementById('overlay');
  const sections = document.querySelectorAll('[class*="form"]');

  sections.forEach(section => section.classList.remove('active'));
  overlay.classList.remove('active');
}