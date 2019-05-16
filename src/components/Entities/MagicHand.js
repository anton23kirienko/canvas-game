import getMagicPosition from './getMagicPosition.js';

class MagicHand {
  constructor(target, caster) {
    this.name = 'Magic-hand';
    this.target = target;
    this.caster = caster;
    this.sW = 200;
    this.sH = 180;
    this.pos = caster.pos;
    this.speedX = 35;
    this.framesToTarget = Math.floor((caster.pos[0] - target.pos[0]) / this.speedX);
    this.speedY = Math.floor((caster.pos[1] - target.pos[1]) / this.framesToTarget);
    this.state = 'render';
    this.action = 'move';
    this.lastAction = 'move';
    this.sprite = window.game.recources.images['magic-hand.png'];
    this.drawParams = [this.sprite, 0, 0, this.sW, this.sH, this.pos[0], this.pos[1], this.sW, this.sH]; // [img, sx, sy, sW, sH, dx, dy, dW, dH]
  }

  move() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;

    sx = 800;
    dx -= this.speedX;
    dy -= this.speedY;
    if (dx < this.target.pos[0] + 100) {
      this.action = 'cast';
    }
    this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
  }

  cast() {
    let [img, sx, sy, sW, sH, dx, dy, dW, dH] = this.drawParams;
    
    if (this.lastAction !== 'cast') {
      this.lastAction = 'cast';
      sx = 0;
    }
    if (sx < 800) {
      sx += sW;
      this.target.action = 'hit';
      this.drawParams = [img, sx, sy, sW, sH, dx, dy, dW, dH];
    }
    else {
      this.state = 'removed';
      this.target.hp -= 120;
      this.target.action = 'stand';
    }
  }
}

export default MagicHand;
