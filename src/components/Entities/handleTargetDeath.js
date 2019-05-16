import insertRandomEnemy from './insertRandomEnemy';
import { gameContext } from './../Entities/gameContext.js';
import insertModalEnd from './../modal-end/modal-end.js';

function handleEnemyLogoTransition() {
  const score = document.querySelector('#interfaceScore');
  const ctx = this.getContext('2d');

  ctx.clearRect(0, 0, 120, 120);
  score.textContent = parseInt(score.textContent, 10) + 1;
  insertRandomEnemy();
  this.removeEventListener('transitionend', handleEnemyLogoTransition, false);
}

function handleEnemyDeath() {
  const target = handleEnemyDeath.target;

  target.action = 'die';
  target.logo.addEventListener('transitionend', handleEnemyLogoTransition, false);
  target.logo.classList.remove('canvas-enemy--transitioned');
  this.removeEventListener('transitionend', handleEnemyDeath, false);
}

function handlePlayerDeath() {
  const rounds = document.querySelector('#interfaceScore').textContent;
  const musicEnd = document.querySelector('#endTheme');
  const musicMain = document.querySelector('#mainTheme');
  const playerName = gameContext.entities[0].name;
  let score = JSON.parse(window.localStorage.getItem('score'));

  musicMain.pause();
  musicEnd.play();

  if (!score) score = {};

  score[playerName] = rounds;
  window.localStorage.setItem('currentPlayer', playerName);
  window.localStorage.setItem('score', JSON.stringify(score));


  insertModalEnd();
}

function handleTargetDeath(target) {
  const playerName = gameContext.entities[0].name;

  if (target.name === playerName) {
    target.healthBar.addEventListener('transitionend', handlePlayerDeath, false);
    target.healthBar.style.width = '0';
  }
  else {
    handleEnemyDeath.target = target;
    target.healthBar.addEventListener('transitionend', handleEnemyDeath, false);
    target.healthBar.style.width = '0';
  }
}

export default handleTargetDeath;
