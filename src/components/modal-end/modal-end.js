import html from './modal-end.html';
import css from './modal-end.css';

function insertModalEnd() {
  const main = document.querySelector('.wrapper');
  const template = document.createElement('template');

  template.innerHTML = html;
  main.appendChild(template.content);

  setTimeout(() => {
    const form = document.querySelector('#modalEndForm');

    form.addEventListener('submit', e => {
      const main = document.querySelector('.wrapper');

      main.removeChild(main.children[0]);
    });
  }, 100);
}

export default insertModalEnd;
