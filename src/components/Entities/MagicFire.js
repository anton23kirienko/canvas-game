import getMagicPosition from './getMagicPosition.js';
import getRandomNumber from './../helper/helper.js';
import handleTargetDeath from './handleTargetDeath';

class MagicFire {
  constructor(target, caster) {
    this.name = 'Magic-fire';
    this.damage = getRandomNumber(120, 220);
    this.target = target;
    this.caster = caster;
    this.sW = 119;
    this.sH = 188;
    this.pos = getMagicPosition(target, this.sW, this.sH);
    this.state = 'render';
    this.action = 'cast';
    this.sprite = window.game.recources.images['magic-fire.png'];
    this.drawParams = [this.sprite, 0, 0, 119, 188, this.pos[0], this.pos[1], 119, 188]; // [img, sx, sy, sW, sH, dx, dy, dW, dH]
    this.sounds = {'explosion': document.querySelector('#playerFireExplosion')}
  }

  cast() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    if (this.target.lastAction !== 'hit') {
      this.target.currentHP -= this.damage;
      this.target.healthBar.style.width = `${this.target.currentHP / this.target.maxHP * 100}%`;
      this.sounds.explosion.play();
      this.target.sounds.hit.play();window.aaa = this.target.sounds.hit;
    }
    if (sx < 2261) {
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

export default MagicFire;

