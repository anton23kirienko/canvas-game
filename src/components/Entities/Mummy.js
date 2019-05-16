import MagicAngel from './MagicAngel.js';
import getRandomNumber from './../helper/helper.js';

class Mummy {
  constructor() {
    this.name = 'Mummy';
    this.magic = MagicAngel;
    this.maxHP = 500;
    this.currentHP = 500;
    this.pos = [1200, getRandomNumber(260, 320)];
    this.minPosX = getRandomNumber(600, 750);
    this.state = 'render';
    this.speed = 10;
    this.action = 'walk';
    this.lastAction = 'walk';
    this.sprite = window.game.recources.images['mummy.png'];
    this.drawParams = [this.sprite, 0, 0, 135, 185, this.pos[0], this.pos[1], 135, 185]; // [img, sx, sy, sW, sH, dx, dy, dW, dH]
    this.healthBar = document.querySelector('#interfaceEnemyHealth');
    this.logo = document.querySelector('#interfaceEnemyLogo');
    this.sounds = {
      'death': document.querySelector('#mummyDeath'),
      'hit': document.querySelector('#mummyHit')
    }
  }

  insertSelf() {
    const span = document.querySelector('#interfaceEnemyName');
    const ctx = this.logo.getContext('2d');
    const name = this.name;
    const healthBar = this.healthBar;

    ctx.drawImage(this.sprite, 156, 97, 60, 60, 0, 0, 120, 120);
    this.logo.addEventListener('transitionend', e => {
      span.textContent = name;
      healthBar.style.width = '100%';
    });
    this.logo.classList.add('canvas-enemy--transitioned');
  }

  stand() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [70, 100, 70, 100];

    if (this.lastAction !== 'stand') {
      sx = 0;
      this.lastAction = 'stand';
    }

    sx = Math.floor(sx / sW) > 4 ? 0 : sx += sW;
    sy = 0;
    dx = this.pos[0] + 60;
    dy = this.pos[1] + 50;
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
  }

  walk() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [75, 95, 75, 95];

    if (this.lastAction !== 'walk') {
      sx = 0;
      this.lastAction = 'walk';
    }

    sx = Math.floor(sx / sW) > 6 ? 0 : sx += sW;
    sy = 100;
    this.pos[0] -= this.speed;
    dx = this.pos[0] + 60;
    dy = this.pos[1] + 50;
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
    if (this.pos[0] < this.minPosX) {
      this.insertSelf();
      this.action = 'stand';
      this.drawParams[1] = 0;
    }
  }

  attack() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [80, 110, 80, 110];

    if (this.lastAction !== 'attack') {
      sx = 0;
      this.lastAction = 'attack';
    }
    if (Math.floor(sx / sW) < 3) {
      sx += sW;
      sy = 205;
      dx = this.pos[0] + 60 - 10;
      dy = this.pos[1] + 50 - 15;
      this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
    }
    else {
      this.action = 'stand';
    }
  }

  hit() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [70, 105, 70, 105];

    if (this.lastAction !== 'hit') {
      sx = 0;
      this.lastAction = 'hit';
    }
    sx = 155;
    sy = 315;
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
  }

  die() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [150, 105, 150, 105];

    if (this.lastAction !== 'die') {
      sx = 0;
      this.lastAction = 'die';
    }
    if (sx < 151) {
      sx += sW;
      sy = 315;
      dx = this.pos[0] + 60;
      dy = this.pos[1] + 50;
      this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
    }
    else {
      const canvasBack = document.querySelector('#canvasBack');
      const ctx = canvasBack.getContext('2d');

      this.state = 'removed';
      ctx.drawImage(img, sx, sy, sW, sH, dx, dy, dW, dH);
    }
  }
}

export default Mummy;
