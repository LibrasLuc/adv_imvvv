const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
document.querySelector('.hero-visual .image-frame img')?.setAttribute('src', 'assets/User attachment.png');
document.querySelector('.presence-image img')?.setAttribute('src', 'assets/lugar.png');
document.querySelectorAll('.brand').forEach((brand) => {
  brand.innerHTML = '<img class="brand-logo-image" src="assets/logo.png" alt="Reis e Borges Advogados Associados">';
});
const whatsappIcon = document.querySelector('.floating-whatsapp span');
if (whatsappIcon) whatsappIcon.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.7 6L.2 24l6.3-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4ZM12.2 21.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-.9 1.1c-.2.2-.3.3-.6.1a8 8 0 0 1-2.4-1.5 9.2 9.2 0 0 1-1.6-2c-.2-.3 0-.5.2-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.4.7 2.8.7.4 0 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4Z"/></svg>';
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open'); menu?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.statement, .practice, .insights, .presence, .contact, .article-card, .practice-item').forEach((el, index) => {
  el.dataset.reveal = '';
  el.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
  revealObserver.observe(el);
});

window.addEventListener('scroll', () => {
  const visual = document.querySelector('.hero-visual .image-frame');
  if (visual && window.scrollY < window.innerHeight) visual.style.transform = `translateY(${window.scrollY * 0.08}px)`;
}, { passive: true });

const form = document.querySelector('#contact-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button');
  if (!form.checkValidity()) {
    status.textContent = 'Preencha seu nome, contato e uma breve mensagem.';
    form.querySelector(':invalid')?.focus();
    return;
  }
  button.disabled = true;
  status.textContent = 'Enviando sua mensagem…';
  setTimeout(() => {
    status.textContent = 'Mensagem registrada. Em um atendimento real, a equipe retornará pelo contato informado.';
    form.reset();
    button.disabled = false;
  }, 900);
});

document.querySelectorAll('a[href*="wa.me"], #contact-form').forEach((element) => {
  element.addEventListener(element.tagName === 'FORM' ? 'submit' : 'click', () => {
    if (typeof window.gtag === 'function') window.gtag('event', 'contact_intent', { method: element.tagName === 'FORM' ? 'form' : 'whatsapp' });
    else window.dispatchEvent(new CustomEvent('contact_intent', { detail: { method: element.tagName === 'FORM' ? 'form' : 'whatsapp' } }));
  });
});
