import MagicPlant from './MagicPlant.js';
import getRandomNumber from './../helper/helper.js';

class Mavka {
  constructor() {
    this.name = 'Mavka';
    this.magic = MagicPlant;
    this.maxHP = 400;
    this.currentHP = 400;
    this.pos = [1320, getRandomNumber(260, 320)];
    this.minPosX = getRandomNumber(600, 750);
    this.state = 'render';
    this.speed = 18;
    this.action = 'walk';
    this.lastAction = 'walk';
    this.sprite = window.game.recources.images['mavka.png'];
    this.drawParams = [this.sprite, 0, 0, 135, 185, this.pos[0], this.pos[1], 135, 185]; // [img, sx, sy, sW, sH, dx, dy, dW, dH]
    this.healthBar = document.querySelector('#interfaceEnemyHealth');
    this.logo = document.querySelector('#interfaceEnemyLogo');
    this.sounds = {
      'death': document.querySelector('#mavkaDeath'),
      'hit': document.querySelector('#mavkaHit')
    }
  }

  insertSelf() {
    const span = document.querySelector('#interfaceEnemyName');
    const ctx = this.logo.getContext('2d');
    const name = this.name;
    const healthBar = this.healthBar;

    ctx.drawImage(this.sprite, 26, 6, 60, 60, 0, 0, 120, 120);
    this.logo.addEventListener('transitionend', e => {
      span.textContent = name;
      healthBar.style.width = '100%';
    });
    this.logo.classList.add('canvas-enemy--transitioned');
  }

  stand() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [110, 140, 110, 140];

    if (this.lastAction !== 'stand') {
      sx = 0;
      this.lastAction = 'stand';
    }

    sx = Math.floor(sx / sW) > 6 ? 0 : sx += sW;
    sy = 0;
    dx = this.pos[0] + 60;
    dy = this.pos[1] + 30;
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
  }

  walk() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [110, 140, 110, 140];

    if (this.lastAction !== 'walk') {
      sx = 0;
      this.lastAction = 'walk';
    }

    sx = Math.floor(sx / sW) > 6 ? 0 : sx += sW;
    sy = 0;
    this.pos[0] -= this.speed;
    dx = this.pos[0] + 60;
    dy = this.pos[1] + 30;
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
    if (this.pos[0] < this.minPosX) {
      this.insertSelf();
      this.action = 'stand';
      this.drawParams[1] = 0;
    }
  }

  attack() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [100, 145, 100, 145];

    if (this.lastAction !== 'attack') {
      sx = 0;
      this.lastAction = 'attack';
    }
    if (Math.floor(sx / sW) < 4) {
      sx += sW;
      sy = 140;
      dx = this.pos[0] + 60;
      dy = this.pos[1] + 30;
      this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
    }
    else {
      this.action = 'stand';
    }
  }

  hit() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [100, 110, 100, 110];

    if (this.lastAction !== 'hit') {
      sx = 0;
      this.lastAction = 'hit';
    }
    sx = 0;
    sy = 290;
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
  }

  die() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [105, 110, 105, 110];

    if (this.lastAction !== 'die') {
      sx = 0;
      this.lastAction = 'die';
    }
    if (sx < 600) {
      sx += sW;
      sy = 290;
      dx = this.pos[0] + 60;
      dy = this.pos[1] + 30;
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

export default Mavka;
