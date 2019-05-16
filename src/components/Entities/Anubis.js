import MagicNails from './MagicNails.js';
import getRandomNumber from './../helper/helper.js';

class Anubis {
  constructor() {
    this.name = 'Anubis';
    this.magic = MagicNails;
    this.maxHP = 600;
    this.currentHP = 600;
    this.pos = [1300, getRandomNumber(230, 320)];
    this.minPosX = getRandomNumber(600, 750);
    this.state = 'render';
    this.speed = 15;
    this.action = 'walk';
    this.lastAction = 'walk';
    this.sprite = window.game.recources.images['anubis.png'];
    this.drawParams = [this.sprite, 0, 0, 135, 185, this.pos[0], this.pos[1], 135, 185]; // [img, sx, sy, sW, sH, dx, dy, dW, dH]
    this.healthBar = document.querySelector('#interfaceEnemyHealth');
    this.logo = document.querySelector('#interfaceEnemyLogo');
    this.sounds = {
      'death': document.querySelector('#anubisDeath'),
      'hit': document.querySelector('#anubisHit')
    }
  }

  insertSelf() {
    const span = document.querySelector('#interfaceEnemyName');
    const ctx = this.logo.getContext('2d');
    const name = this.name;
    const healthBar = this.healthBar;

    ctx.drawImage(this.sprite, 56, 8, 60, 60, 0, 0, 120, 120);
    this.logo.addEventListener('transitionend', e => {
      span.textContent = name;
      healthBar.style.width = '100%';
    });
    this.logo.classList.add('canvas-enemy--transitioned');
  }

  stand() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [135, 185, 135, 185];

    if (this.lastAction !== 'stand') {
      sx = 0;
      this.lastAction = 'stand';
    }

    sx = Math.floor(sx / sW) > 5 ? 0 : sx += sW;
    sy = 0;
    dx = this.pos[0];
    dy = this.pos[1] - 10;
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
  }

  walk() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [137, 175, 137, 175];

    if (this.lastAction !== 'walk') {
      sx = 0;
      this.lastAction = 'walk';
    }

    sx = Math.floor(sx / sW) > 5 ? 0 : sx += sW;
    sy = 185;
    this.pos[0] -= this.speed;
    this.drawParams = [img, sx, sy, sW, sH, this.pos[0], dy, dW, dH];
    if (this.pos[0] < this.minPosX) {
      this.insertSelf();
      this.action = 'stand';
      this.drawParams[1] = 0;
    }
  }

  attack() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [145, 160, 145, 160];

    if (this.lastAction !== 'attack') {
      sx = 0;
      this.lastAction = 'attack';
    }
    if (Math.floor(sx / sW) < 3) {
      sx += sW;
      sy = 365;
      dx = this.pos[0];
      dy = this.pos[1] + 10;
      this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
    }
    else {
      this.action = 'stand';
    }
  }

  hit() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [140, 175, 140, 175];

    if (this.lastAction !== 'hit') {
      sx = 0;
      this.lastAction = 'hit';
    }
    sx = 140;
    sy = 540;
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
  }

  die() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [140, 175, 140, 175];

    if (this.lastAction !== 'die') {
      sx = 0;
      this.lastAction = 'die';
    }
    if (sx < 840) {
      sx += sW;
      sy = 540;
      dx = this.pos[0];
      dy = this.pos[1];
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

export default Anubis;
