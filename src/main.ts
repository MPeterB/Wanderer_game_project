import './style.css';
import { drawMap, map } from './game/map.ts';
import { ctxH, heroMove, heroDown } from './game/heroMovement.ts';
import { drawEnemies } from './game/enemy.ts';
import { showHeroStats } from './game/showStats.ts';
import { heroStrike } from './game/battleHero.ts';
import { goToGame, nextLevel } from './game/game.ts';

const gameMessages = document.getElementById('gameMessages') as HTMLElement;
const nextLevelButton = document.getElementById('nextLevelButton') as HTMLElement;
const goToGameButton = document.getElementById('goToGameButton') as HTMLElement;

window.onload = (): void => {
  gameMessages.innerHTML = `To start the game press one of the arrow or WASD buttons!`;
  document.body.addEventListener('keydown', heroMove);
  document.body.addEventListener('keydown', heroStrike);
  nextLevelButton.addEventListener('click', nextLevel);
  goToGameButton.addEventListener('click', goToGame);
  drawMap(map);
  ctxH.drawImage(heroDown, 0, 0, 50, 50);
  showHeroStats();
  drawEnemies();
};
