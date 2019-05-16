import getMagicPosition from './getMagicPosition.js';
import getRandomNumber from './../helper/helper.js';
import handleTargetDeath from './handleTargetDeath';

class MagicLighting {
  constructor(target, caster) {
    this.name = 'Magic-lighting';
    this.damage = getRandomNumber(100, 300);
    this.target = target;
    this.caster = caster;
    this.sW = 90;
    this.sH = 258;
    this.pos = getMagicPosition(target, this.sW, this.sH);
    this.state = 'render';
    this.action = 'cast';
    this.sprite = window.game.recources.images['magic-lighting.png'];
    this.drawParams = [this.sprite, 0, 0, this.sW, this.sH, this.pos[0], this.pos[1], this.sW, this.sH]; // [img, sx, sy, sW, sH, dx, dy, dW, dH]
    this.sounds = {'explosion': document.querySelector('#playerLightingExplosion')}
  }

  cast() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;

    if (this.target.lastAction !== 'hit') {
      this.target.currentHP -= this.damage;
      this.target.healthBar.style.width = `${this.target.currentHP / this.target.maxHP * 100}%`;
      this.sounds.explosion.play();
      this.target.sounds.hit.play();
    }
    if (sx <= 270) {
      sx += sW;
      this.target.action = 'hit';
      this.caster.action = 'attack';
      this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
    }
    else {
      this.state = 'removed';
      if (this.target.currentHP < 1) {
        this.target.sounds.death.play();
        handleTargetDeath(this.target);
      }
      else this.target.action = 'stand';
    }
  }
}

export default MagicLighting;
