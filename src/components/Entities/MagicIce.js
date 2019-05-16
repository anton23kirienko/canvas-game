import getMagicPosition from './getMagicPosition.js';
import getRandomNumber from './../helper/helper.js';
import handleTargetDeath from './handleTargetDeath';

class MagicIce {
  constructor(target, caster) {
    this.name = 'Magic-ice';
    this.damage = getRandomNumber(180, 250);
    this.target = target;
    this.caster = caster;
    this.sW = 95;
    this.sH = 120;
    this.pos = getMagicPosition(caster, this.sW, this.sH);
    this.speedX = 40;
    this.framesToTarget = Math.floor(Math.abs(caster.pos[0] - target.pos[0]) / this.speedX);
    this.speedY = Math.floor((caster.pos[1] - target.pos[1]) / this.framesToTarget);
    this.state = 'render';
    this.action = 'move';
    this.lastAction = 'move';
    this.sprite = window.game.recources.images['magic-ice.png'];
    this.drawParams = [this.sprite, 0, 0, this.sW, this.sH, this.pos[0] + 120, this.pos[1], this.sW, this.sH]; // [img, sx, sy, sW, sH, dx, dy, dW, dH]
    this.sounds = {
      'move': document.querySelector('#playerIceMove'),
      'explosion': document.querySelector('#playerIceExplosion')
    }
  }

  move() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;

    sx = sx < 1330 ? sx += sW : 0;
    dx += this.speedX;
    dy -= this.speedY;
    if (this.sounds.move.currentTime === 0) this.sounds.move.play();
    if (dx > this.target.pos[0]) {
      this.action = 'cast';
      this.sounds.move.pause();
      this.sounds.move.currentTime = 0;
    }  
    this.caster.action = 'attack';
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];

  }

  cast() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    
    sy = 130;
    sW = 160;
    sH = 122;
    dW = 160;
    dH = 122;
    if (this.lastAction !== 'cast') {
      this.lastAction = 'cast';
      sx = 0;
      this.sounds.explosion.play();
      this.target.currentHP -= this.damage;
      this.target.healthBar.style.width = `${this.target.currentHP / this.target.maxHP * 100}%`;
      if (this.target.currentHP > 1) this.target.sounds.hit.play();
      else this.target.sounds.death.play();
    }
    if (sx < 1280) {
      sx += sW;
      this.target.action = 'hit';
      this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
    }
    else {
      this.state = 'removed';
      if (this.target.currentHP < 1) handleTargetDeath(this.target);
      else this.target.action = 'stand';
    }
  }
}

export default MagicIce;
