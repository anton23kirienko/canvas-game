import html from './loader.html';
import css from './loader.css';
import { insertMenu } from './../menu/menu.js';

function handlePostProcessTransition(e) {
  const loader = document.querySelector('.loader');
  const form = document.createElement('form');
  const button = document.createElement('button');

  button.textContent = 'continue';
  button.setAttribute('tabindex', 0);
  button.classList.add('form_button');

  form.classList.add('loader_form');
  form.appendChild(button)

  Array.from(loader.children).forEach(elem => loader.removeChild(elem));

  loader.appendChild(form);
  loader.removeEventListener('transitionend', handlePostProcessTransition, false);

  loader.addEventListener('transitionend', e => {
    form.addEventListener('submit', removeLoader, false);
  });
  loader.classList.remove('loader--transitioned');
}

function postProcessLoader() {
  const loader = document.querySelector('.loader');

  loader.addEventListener('transitionend', handlePostProcessTransition, false);
  loader.classList.add('loader--transitioned');  
}

function insertLoader() {
  const main = document.querySelector('.wrapper');
  main.insertAdjacentHTML('beforeend', html);
}

function removeLoader() {
  const main = document.querySelector('.wrapper');
  const loader = document.querySelector('.loader');
  const musicMain = document.querySelector('#mainTheme');

  main.removeChild(loader);
  musicMain.play();

  insertMenu();
}

function loadImages() {
  const list = [
    './dist/images/anubis.png',
    './dist/images/mavka.png',
    './dist/images/mummy.png',
    './dist/images/player.png',
    './dist/images/background.jpg',
    './dist/images/magic-angel.png',
    './dist/images/magic-fire.png',
    './dist/images/magic-hand.png',
    './dist/images/magic-ice.png',
    './dist/images/magic-lighting.png',
    './dist/images/magic-nails.png',
    './dist/images/magic-plant.png',
  ];

  window.game.recources.images = {};
  return Promise.all(list.map(url => new Promise(resolve => {
    const image = new Image;
    const name = url.split('/').reverse()[0];

    image.onload = () => {
      window.game.recources.images[name] = image;
      resolve();
    }
    image.src = url;
  })))
}

function loadRecources() {
  window.game = {};
  window.game.recources = {};
  window.game.recources.images = {};

  return Promise.all([loadImages()])
}


export { insertLoader, removeLoader, loadRecources, postProcessLoader }
