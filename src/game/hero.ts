import { heroCurrent } from './characters.ts';
import { map } from './map.ts';
import { wall } from './tiles.ts';
import { gameProgress, startGame } from './game.ts';
import { showEnemyStats } from './showStats.ts';
import { strike } from './battle.ts';

const canvasH = document.querySelector('.hero-canvas') as HTMLCanvasElement;
export const ctxH = canvasH.getContext('2d') as CanvasRenderingContext2D;

export const heroDown = document.getElementById('hero-down') as HTMLImageElement;
const heroUp = document.getElementById('hero-up') as HTMLImageElement;
const heroRight = document.getElementById('hero-right') as HTMLImageElement;
const heroLeft = document.getElementById('hero-left') as HTMLImageElement;

export function onKeyPress(event: KeyboardEvent): void {
  switch (event.code) {
    case 'ArrowDown':
    case 'KeyS':
      ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
      if (gameProgress.inProgress === false) {
        startGame();
        gameProgress.inProgress = true;
      }
      if (
        heroCurrent.pixelY === canvasH.height - 50 ||
        map[heroCurrent.positionY + 1][heroCurrent.positionX] === wall
      ) {
        ctxH.drawImage(heroDown, heroCurrent.pixelX, heroCurrent.pixelY, 50, 50);
      } else {
        ctxH.drawImage(heroDown, heroCurrent.pixelX, heroCurrent.pixelY + 50, 50, 50);
        heroCurrent.pixelY += 50;
        heroCurrent.positionY += 1;
        showEnemyStats();
      }
      break;
    case 'ArrowUp':
    case 'KeyW':
      ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
      if (gameProgress.inProgress === false) {
        startGame();
        gameProgress.inProgress = true;
      }
      if (heroCurrent.pixelY === 0 || map[heroCurrent.positionY - 1][heroCurrent.positionX] === wall) {
        ctxH.drawImage(heroUp, heroCurrent.pixelX, heroCurrent.pixelY, 50, 50);
      } else {
        ctxH.drawImage(heroUp, heroCurrent.pixelX, heroCurrent.pixelY - 50, 50, 50);
        heroCurrent.pixelY -= 50;
        heroCurrent.positionY -= 1;
        showEnemyStats();
      }
      break;
    case 'ArrowRight':
    case 'KeyD':
      ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
      if (gameProgress.inProgress === false) {
        startGame();
        gameProgress.inProgress = true;
      }
      if (heroCurrent.pixelX === canvasH.width - 50 || map[heroCurrent.positionY][heroCurrent.positionX + 1] === wall) {
        ctxH.drawImage(heroRight, heroCurrent.pixelX, heroCurrent.pixelY, 50, 50);
      } else {
        ctxH.drawImage(heroRight, heroCurrent.pixelX + 50, heroCurrent.pixelY, 50, 50);
        heroCurrent.pixelX += 50;
        heroCurrent.positionX += 1;
        showEnemyStats();
      }
      break;
    case 'ArrowLeft':
    case 'KeyA':
      ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
      if (gameProgress.inProgress === false) {
        startGame();
        gameProgress.inProgress = true;
      }
      if (heroCurrent.pixelX === 0 || map[heroCurrent.positionY][heroCurrent.positionX - 1] === wall) {
        ctxH.drawImage(heroLeft, heroCurrent.pixelX, heroCurrent.pixelY, 50, 50);
      } else {
        ctxH.drawImage(heroLeft, heroCurrent.pixelX - 50, heroCurrent.pixelY, 50, 50);
        heroCurrent.pixelX -= 50;
        heroCurrent.positionX -= 1;
        showEnemyStats();
      }
      break;
    case 'Space':
      strike();
      break;
    default:
      throw new Error('Only arrow buttons and WASD are acceptable to move your hero!');
  }
}
