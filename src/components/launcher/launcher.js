import { insertInterface, handleControlClick } from './../interface/interface.js';
import { gameContext, setGameContext } from './../Entities/gameContext.js';
import loopGame from './../renderer/renderer.js';

function launchGame() {
  insertInterface()
    .then(() => {
      const control = document.querySelector('.control');

      setGameContext();
      gameContext.entities[0].name = launchGame.playerName;
      control.addEventListener('click', handleControlClick, false);
      loopGame();
    });
}  

export default launchGame;