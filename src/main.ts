import './style.css';
import { drawMap, map } from './game/map.ts';
import { ctxH, heroMove, heroDown } from './game/heroMovement.ts';
import { drawEnemies } from './game/enemy.ts';
import { showHeroStats } from './game/showStats.ts';
import { heroStrike } from './game/battleHero.ts';

window.onload = (): void => {
  document.body.addEventListener('keydown', heroMove);
  document.body.addEventListener('keydown', heroStrike);
  drawMap(map);
  ctxH.drawImage(heroDown, 0, 0, 50, 50);
  showHeroStats();
  drawEnemies();
};
