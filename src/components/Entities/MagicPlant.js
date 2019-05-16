import getMagicPosition from './getMagicPosition.js';
import getRandomNumber from './../helper/helper.js';
import handleTargetDeath from './handleTargetDeath';

class MagicPlant {
  constructor(target, caster) {
    this.name = 'Magic-plant';
    this.damage = getRandomNumber(100,140);
    this.target = target;
    this.caster = caster;
    this.sW = 35;
    this.sH = 84;
    this.pos = target.pos;
    this.state = 'render';
    this.action = 'cast';
    this.sprite = window.game.recources.images['magic-plant.png'];
    this.drawParams = [this.sprite, 0, 0, this.sW, this.sH, this.pos[0] + 30, this.pos[1], this.sW*2, this.sH*2]; // [img, sx, sy, sW, sH, dx, dy, dW, dH]
    this.sounds = {'explosion': document.querySelector('#mavkaAttackExplosion')}
  }

  cast() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;

    if (this.target.lastAction !== 'hit') {
      this.target.currentHP -= this.damage;
      this.target.healthBar.style.width = `${this.target.currentHP / this.target.maxHP * 100}%`;
      this.sounds.explosion.play();
      this.target.sounds.hit.play();
    }
    if (sx < 220) {
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

export default MagicPlant;