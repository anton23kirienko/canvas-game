import Player from './Player.js';
import Anubis from './Anubis.js';
import Mavka from './../Entities/Mavka.js';
import Mummy from './../Entities/Mummy.js';
import getRandomNumber from './../helper/helper.js';

let gameContext;

function setGameContext() {
  const canvasFront = document.querySelector('#canvasFront');
  const ctxFront = canvasFront.getContext('2d');
  const player = new Player;
  const enemy = [new Anubis, new Mavka, new Mummy][getRandomNumber(0, 3)];
  const entities = [player, enemy];
  const last = Date.now();
  const context = {
    ctx: ctxFront,
    entities: entities,
    date: last
  }

  gameContext = context;
}

export { gameContext, setGameContext };
