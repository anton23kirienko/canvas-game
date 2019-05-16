import html from './form.html';
import css from './form.css';
import insertModalError from './../modal-error/modal-error.js';
import launchGame from './../launcher/launcher.js';

function handleFormSubmit(e) {
  e.preventDefault();
  const input = document.querySelector('#formName');
  const playerName = input.value;

  if (playerName.length < 3) insertModalError('Name should be at least 3 characters long.');
  else removeForm(launchGame, playerName);
}

function insertForm() {
  const main = document.querySelector('.wrapper');
  const template = document.createElement('template');

  template.innerHTML = html;
  main.appendChild(template.content);

  setTimeout(() => {
    const form = document.querySelector('.form');
    form.classList.add('form--transitioned');
    form.addEventListener('submit', handleFormSubmit, false);
  });
}

function removeForm(callback, name) {
  const main = document.querySelector('.wrapper');
  const form = document.querySelector('.form');

  form.addEventListener('transitionend', e => {
    main.removeChild(form);
    callback.playerName = name;
    callback();
  });
  form.classList.remove('form--transitioned');
}

export default insertForm;