import html from './menu.html';
import css from './menu.css';
import insertForm from './../form/form.js';
import insertModalError from './../modal-error/modal-error.js';
import launchGame from './../launcher/launcher.js';
import insertScore from './../score/score.js';

function handleMenuClick(e) {
  const target = e.target;

  if (target.id === 'menuNewGame') {
    removeMenu(insertForm);
  }
  else if (target.id === 'menuReplay') {
    const playerName = window.localStorage.getItem('currentPlayer');
    playerName ? removeMenu(launchGame, playerName) : insertModalError('Play at least one time.');
  }
  else if (target.id === 'menuScore') insertScore();
}

function insertMenu() {
  const main = document.querySelector('.wrapper');
  const template = document.createElement('template');

  template.innerHTML = html;
  main.appendChild(template.content);
  
  setTimeout(() => {
    const menu = document.querySelector('.menu');

    menu.classList.add('menu--transitioned');
    menu.addEventListener('click', handleMenuClick, false);
  }, 100);
}

function removeMenu(callback, name) {
  const main = document.querySelector('.wrapper');
  const menu = document.querySelector('.menu');
  
  menu.addEventListener('transitionend', e => {
    main.removeChild(menu);
    callback.playerName = name;
    callback();
  });
  menu.classList.remove('menu--transitioned');
}

export { insertMenu };
