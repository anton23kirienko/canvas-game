import html from './score.html';
import css from './score.css';

function fillTableBody() {
  const body = document.querySelector('#scoreTableBody');
  const score = JSON.parse(window.localStorage.getItem('score'));

  if (score) {
    Object.entries(score).forEach(elem => {
      const tr = document.createElement('tr');
      const person = document.createElement('td');
      const personalScore = document.createElement('td')

      person.textContent = elem[0];
      personalScore.textContent = elem[1];
      [person, personalScore].forEach(elem => tr.appendChild(elem));
      body.appendChild(tr);
    });
  }
}

function insertScore() {
  const main = document.querySelector('.wrapper');
  const template = document.createElement('template');

  template.innerHTML = html;
  main.appendChild(template.content);
  setTimeout(() => {
    const score = document.querySelector('.score');
    const button = document.querySelector('#scoreButton');
    button.addEventListener('click', removeScore, false);
    fillTableBody();
    score.classList.add('score--transitioned');
  }, 100);
}

function removeScore() {
  const main = document.querySelector('.wrapper');
  const score = document.querySelector('.score');

  score.addEventListener('transitionend', e => {
    main.removeChild(score);
  });
  score.classList.remove('score--transitioned');
}

export default insertScore;
