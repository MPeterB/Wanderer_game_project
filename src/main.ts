import './style.css';
import { drawMap, map } from './game/map.ts';
import { ctxH, onKeyPress, heroDown } from './game/hero.ts';
import { drawEnemies, skeleton1, skeleton2, skeleton3, boss } from './game/enemy.ts';

export type CharacterPosition = {
  pixelX: number;
  pixelY: number;
  positionX: number;
  positionY: number;
};

window.onload = (): void => {
  document.body.addEventListener('keydown', onKeyPress);
  drawMap(map);
  ctxH.drawImage(heroDown, 0, 0);
  drawEnemies(skeleton1, skeleton2, skeleton3, boss);
};
