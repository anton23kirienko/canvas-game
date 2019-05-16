import getMagicPosition from './getMagicPosition.js';
import getRandomNumber from './../helper/helper.js';
import handleTargetDeath from './handleTargetDeath';

class MagicAngel {
  constructor(target, caster) {
    this.name = 'Magic-angel';
    this.damage = getRandomNumber(100,200);
    this.target = target;
    this.caster = caster;
    this.sW = 170;
    this.sH = 152;
    this.pos = caster.pos;
    this.speedX = 45;
    this.framesToTarget = Math.floor((caster.pos[0] - target.pos[0]) / this.speedX);
    this.speedY = Math.floor((caster.pos[1] - target.pos[1]) / this.framesToTarget);
    this.state = 'render';
    this.action = 'move';
    this.lastAction = 'move';
    this.sprite = window.game.recources.images['magic-angel.png'];
    this.drawParams = [this.sprite, 0, 0, this.sW, this.sH, this.pos[0], this.pos[1], this.sW, this.sH]; // [img, sx, sy, sW, sH, dx, dy, dW, dH]
    this.sounds = {
      'move': document.querySelector('#mummyAttackMove'),
      'explosion': document.querySelector('#mummyAttackExplosion')
    }
  }

  move() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;

    sx = 0;
    dx -= this.speedX;
    dy -= this.speedY;
    if (this.sounds.move.currentTime === 0) this.sounds.move.play();
    if (dx < this.target.pos[0] + 100) {
      this.action = 'cast';
      this.sounds.move.pause();
      this.sounds.move.currentTime = 0;
    }
    this.caster.action = 'attack';
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
  }

  cast() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    
    if (this.lastAction !== 'cast') {
      this.lastAction = 'cast';
      sx = 0;
      this.sounds.explosion.play();
      this.target.currentHP -= this.damage;
      this.target.healthBar.style.width = `${this.target.currentHP / this.target.maxHP * 100}%`;
      if (this.target.currentHP > 1) this.target.sounds.hit.play();
      else this.target.sounds.death.play();
    }
    if (sx < 1020) {
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

export default MagicAngel;
