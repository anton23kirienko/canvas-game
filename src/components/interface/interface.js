import html from './interface.html';
import css from './interface.css';
import insertModalTask from './../modal-task/modal-task.js';
import { gameContext } from './../Entities/gameContext.js';

function handleControlClick(e) {
  const entities = gameContext.entities;

  if (entities[0].action === 'stand' && entities[1].action === 'stand') {
    const target = e.target;

    if (target.id === 'interfaceControlMath') insertModalTask('math');
    if (target.id === 'interfaceControlTranslate') insertModalTask('translate');
    if (target.id === 'interfaceControlDrag') insertModalTask('drag');
  }
}

function insertInterface(callback) {
  const main = document.querySelector('.wrapper');
  const template = document.createElement('template');

  template.innerHTML = html;
  main.appendChild(template.content);

  return new Promise(resolve => {
    setTimeout(() => {
      const gameField = document.querySelector('.interface');
      const canvasBack = document.querySelector('#canvasBack');
      const ctx = canvasBack.getContext('2d');
      const image = window.game.recources.images['background.jpg'];

      ctx.drawImage(image, 0, 0);
      gameField.addEventListener('transitionend', e => resolve());
      gameField.classList.add('interface--transitioned');
    }, 100);
  })
}

export { insertInterface, handleControlClick };
