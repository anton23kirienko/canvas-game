class Player {
  constructor(name) {
    this.name = 'player';
    this.maxHP = 400;
    this.currentHP = 400;
    this.pos = [-100, 330];
    this.action = 'walk';
    this.lastAction = 'walk';
    this.sprite = window.game.recources.images['player.png'];
    this.drawParams = [this.sprite, 0, 0, 150, 120, this.pos[0], this.pos[1], 150, 120]; // [img, sx, sy, sW, sH, dx, dy, dW, dH]
    this.healthBar = document.querySelector('#interfacePlayerHealth');
    this.logo = document.querySelector('#interfacePlayerLogo');
    this.sounds = {
      'death': document.querySelector('#playerDeath'),
      'hit': document.querySelector('#playerHit')
    }
  }

  insertSelf() {
    const span = document.querySelector('#interfacePlayerName');
    const ctx = this.logo.getContext('2d');
    const name = this.name;
    const healthBar = this.healthBar;

    ctx.drawImage(this.sprite, 25, 5, 60, 60, 0, 0, 120, 120);
    this.logo.addEventListener('transitionend', e => {
      span.textContent = name;
      healthBar.style.width = '100%';
    });
    this.logo.classList.add('canvas-player--transitioned');
  }

  stand() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [150, 120, 150, 120];

    if (this.lastAction !== 'stand') {
      sx = 0;
      this.lastAction = 'stand';
    }

    sx = Math.floor(sx / sW) > 4 ? 0 : sx += sW;
    sy = 0;
    dx = this.pos[0] + 20;
    dy = this.pos[1] + 30;
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
  }

  walk() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [150, 145, 150, 145];

    if (this.lastAction !== 'walk') {
      sx = 0;
      this.lastAction = 'walk';
    }

    sx = Math.floor(sx / sW) > 6 ? 0 : sx += sW;
    sy = 120;
    this.pos[0] += 5;
    this.drawParams = [img, sx, sy, sW, sH, this.pos[0], dy, dW, dH];
    if (this.pos[0] > 5) {
      this.insertSelf();
      this.action = 'stand';
      this.drawParams[1] = 0;
    }
  }

  attack() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [150, 110, 150, 110];

    if (this.lastAction !== 'attack') {
      sx = 0;
      this.lastAction = 'attack';
    }
    if (Math.floor(sx / sW) < 6) {
      sx += sW;
      sy = 265;
      dx = this.pos[0] + 20;
      dy = this.pos[1] + 35;
      this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
    }
    else {
      this.action = 'stand';
    }
  }

  hit() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    [sW, sH, dW, dH] = [150, 135, 150, 135];

    if (this.lastAction !== 'hit') {
      sx = 0;
      this.lastAction = 'hit';
    }
    
    sx = sW;
    sy = 380;
    dx = this.pos[0] - 10;
    dy = this.pos[1] + 15;
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
  }
}

export default Player;
