import './style.css';
import { drawMap, map } from './game/map.ts';
import { ctxH, onKeyPressHero, heroDown, showHeroStats } from './game/hero.ts';
import { drawEnemies } from './game/enemy.ts';

window.onload = (): void => {
  document.body.addEventListener('keydown', onKeyPressHero);
  drawMap(map);
  ctxH.drawImage(heroDown, 0, 0, 50, 50);
  showHeroStats();
  drawEnemies();
};
