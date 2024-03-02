import './style.css';
import { drawMap, map } from './game/map.ts';
import { ctxH, onKeyPress, heroDown } from './game/hero.ts';
import { drawEnemies, moveEnemies } from './game/enemy.ts';

window.onload = (): void => {
  document.body.addEventListener('keydown', onKeyPress);
  drawMap(map);
  ctxH.drawImage(heroDown, 0, 0);
  drawEnemies();
  moveEnemies();
};
