import { gameContext } from './../Entities/gameContext.js';

function loopGame() {
  const now = Date.now();
  let last = gameContext.date;

  if (now - last > 70) {
    gameContext.date = now;
    renderFrame();
  }
  window.requestAnimationFrame(loopGame);
}

function renderFrame() {
  const len = gameContext.entities.length;

  gameContext.ctx.clearRect(0, 0, 900, 500);

  for (let i = len-1; i >= 0; i--) {
    const entity = gameContext.entities[i];
    entity[entity['action']]();
    if (entity.state === 'removed') gameContext.entities = gameContext.entities.filter(elem => elem !== entity);
  }
  gameContext.entities.forEach(entity => gameContext.ctx.drawImage(...entity.drawParams));
}

export default loopGame;
