import { gameContext } from './../Entities/gameContext.js';
import Anubis from './Anubis.js';
import Mavka from './Mavka.js';
import Mummy from './Mummy.js';
import getRandomNumber from './../helper/helper.js';

function insertRandomEnemy() {
  const enemy = [new Anubis, new Mavka, new Mummy][getRandomNumber(0, 3)];
  gameContext.entities.push(enemy);
}

export default insertRandomEnemy;
