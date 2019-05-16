import html from './modal-error.html';
import css from './modal-error.css';

function handleModalErrorClick(e) {
  const main = document.querySelector('.wrapper');
  const target = e.target;

  if (target.id === 'formModalError') {
    this.addEventListener('transitionend', e => main.removeChild(this));
    this.classList.remove('modal-error--transitioned');
  }
}

function insertModalError(str) {
  const main = document.querySelector('.wrapper');
  const template = document.createElement('template');

  template.innerHTML = html;
  main.appendChild(template.content);

  setTimeout(() => {
    const modal = document.querySelector('.modal-error');
    const text = modal.querySelector('span');
    text.textContent = str;
    modal.classList.add('modal-error--transitioned');
    modal.addEventListener('click', handleModalErrorClick, false);
  });
}

export default insertModalError;
