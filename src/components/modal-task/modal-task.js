import html from './modal-task.html';
import css from './modal-task.css';
import { gameContext } from './../Entities/gameContext.js';
import getRandomNumber from './../helper/helper.js';
import dictionary from './dictionary.js';
import MagicIce from './../Entities/MagicIce.js';
import MagicFire from './../Entities/MagicFire.js';
import MagicLighting from './../Entities/MagicLighting.js';


function handleModalMathTaskInput(e) {
  e.preventDefault();
  const modal = document.querySelector('.modal-task');
  const value = document.querySelector('#modalTaskInput').value;
  const answer = parseInt(value, 10);
  const correctAnswer = handleModalMathTaskInput.correctAnswer;
  const player = gameContext.entities[0];
  const enemy = gameContext.entities[1];

  modal.addEventListener('transitionend', e => {
    const main = document.querySelector('.wrapper');
    const modal = document.querySelector('.modal-task');

    main.removeChild(modal);
    if (correctAnswer === answer) {
      gameContext.entities.push(new MagicIce(enemy, player));
    }
    else {
      const Magic = enemy.magic;
      gameContext.entities.push(new Magic(player, enemy));
    }
  }, false);
  modal.classList.remove('modal-task--transitioned');
}

function handleModalTranslateTaskInput(e) {
  e.preventDefault();
  const modal = document.querySelector('.modal-task');
  const answer = document.querySelector('#modalTaskInput').value;
  const correctAnswer = handleModalTranslateTaskInput.correctAnswer;
  const player = gameContext.entities[0];
  const enemy = gameContext.entities[1];

  modal.addEventListener('transitionend', e => {
    const main = document.querySelector('.wrapper');
    const modal = document.querySelector('.modal-task');

    main.removeChild(modal);
    if (correctAnswer.includes(answer)) {
      gameContext.entities.push(new MagicFire(enemy, player));
    }
    else {
      const Magic = enemy.magic;
      gameContext.entities.push(new Magic(player, enemy));
    }
  }, false);
  modal.classList.remove('modal-task--transitioned');
}

function handleModalDragTaskInput(e) {
  e.preventDefault();
  const modal = document.querySelector('.modal-task');
  const list = document.querySelector('#modalTaskList');
  const answer = Array.from(list.children).reduce((acc, elem) => acc + elem.textContent, '');
  const correctAnswer = handleModalDragTaskInput.correctAnswer;
  const player = gameContext.entities[0];
  const enemy = gameContext.entities[1];

  modal.addEventListener('transitionend', e => {
    const main = document.querySelector('.wrapper');
    const modal = document.querySelector('.modal-task');


    main.removeChild(modal);
    if (answer === correctAnswer) {
      gameContext.entities.push(new MagicLighting(enemy, player));
    }
    else {
      const Magic = enemy.magic;
      gameContext.entities.push(new Magic(player, enemy));
    }
  }, false);
  modal.classList.remove('modal-task--transitioned');
}

function getMathTask() {
  const sign = ['\u002B', '\u002B', '\u2022', '\u008F'][getRandomNumber(0, 4)]; //  [+ - * /]
  let first, second, correctAnswer;

  switch (sign) {
    case '\u002B':
      [first, second] = [getRandomNumber(0, 100), getRandomNumber(0, 100)];
      correctAnswer = eval(`${first}+${second}`);
      break;
    case '\u002B':
      [first, second] = [getRandomNumber(0, 100), getRandomNumber(0, 100)];
      [first, second] = first > second ? [first, second] : [second, first];
      correctAnswer = eval(`${first}-${second}`);
      break;
    case '\u2022':
      [first, second] = [getRandomNumber(0, 10), getRandomNumber(0, 10)];
      correctAnswer = eval(`${first}*${second}`);
      break;
    case '\u008F':
      [first, second] = [getRandomNumber(1, 10), getRandomNumber(1, 10)];
      first = first * second;
      correctAnswer = eval(`${first}/${second}`);
      break;
  }
  
  return [`${first} ${sign} ${second}`, correctAnswer];
}

function getTranslateTask() {
  const keys = Object.keys(dictionary);
  const word = keys[getRandomNumber(0, keys.length)];
  const correctAnswer = dictionary[word];

  return [word, correctAnswer];
}

function getDragTask() {
  const keys = Object.keys(dictionary);
  const word = keys[getRandomNumber(0, keys.length)];
  const arr = word.split('');
  const list = document.querySelector('#modalTaskList');
  let initialItem, initialLetter, finalItem, finalLetter;

  while (arr.length > 0) {
    const index = getRandomNumber(0, arr.length);
    const li = document.createElement('li');

    li.classList.add('draggable-list_item');
    li.textContent = arr.splice(index, 1);
    list.appendChild(li);
  }

  list.addEventListener('mousedown', e => {
    if (e.target.localName === 'li') {
      initialItem = e.target;
      initialLetter = e.target.textContent;
    }
  }, false);

  list.addEventListener('mouseup', e => {
    if (e.target.localName === 'li') {
      finalItem = e.target;
      finalLetter = e.target.textContent;

      initialItem.textContent = finalLetter;
      finalItem.textContent = initialLetter;
    }
  }, false);

  return word;
}

function insertModalTask(type) {
  const main = document.querySelector('.wrapper');
  const template = document.createElement('template');
  let content;

  template.innerHTML = html;
  content = type === 'drag' ? template.content.childNodes[2] : template.content.childNodes[0];
  main.appendChild(content);

  setTimeout(() => {
    const modal = document.querySelector('.modal-task');
    const span = document.querySelector('#modalTaskQuestion');
    const form = document.querySelector('#modalTaskForm');
    let input, question, correctAnswer;

    switch (type) {
      case 'math':
        input = document.querySelector('#modalTaskInput');
        [question, correctAnswer] = getMathTask();

        span.textContent = `Solve math: ${question}`;
        handleModalMathTaskInput.correctAnswer = correctAnswer;
        form.addEventListener('submit', handleModalMathTaskInput, false);
        input.focus();
        break;
      case 'translate':
        input = document.querySelector('#modalTaskInput');
        [question, correctAnswer] = getTranslateTask();

        span.textContent = `Translate into russian: ${question}`;
        handleModalTranslateTaskInput.correctAnswer = correctAnswer;
        form.addEventListener('submit', handleModalTranslateTaskInput, false);
        input.focus();
        break;
      case 'drag':
        const button = document.querySelector('#modalTaskButton');

        correctAnswer = getDragTask();
        span.textContent = `Combine a word from letters:`;
        handleModalDragTaskInput.correctAnswer = correctAnswer;
        form.addEventListener('submit', handleModalDragTaskInput, false);
        button.focus();
        break;
    }
    modal.classList.add('modal-task--transitioned');
  }, 100);
}

export default insertModalTask;
