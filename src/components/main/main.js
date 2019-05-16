import html from './main.html';
import css from './main.css';

export default function insertMain() {
  const body = document.querySelector('body');
  const template = document.createElement('template');

  template.innerHTML = html;
  body.appendChild(template.content.children[0]);
  body.appendChild(template.content.children[0]);
}
