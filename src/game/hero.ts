import { heroCurrent } from './characterPositions.ts';
import { map, wall } from './map.ts';

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
      if (
        heroCurrent.pixelY === canvasH.height - 71 ||
        map[heroCurrent.positionY + 1][heroCurrent.positionX] === wall
      ) {
        ctxH.drawImage(heroDown, heroCurrent.pixelX, heroCurrent.pixelY);
      } else {
        ctxH.drawImage(heroDown, heroCurrent.pixelX, heroCurrent.pixelY + 71);
        heroCurrent.pixelY += 71;
        heroCurrent.positionY += 1;
      }
      break;
    case 'ArrowUp':
    case 'KeyW':
      ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
      if (
        heroCurrent.pixelY === 0 ||
        map[heroCurrent.positionY - 1][heroCurrent.positionX] === wall
      ) {
        ctxH.drawImage(heroUp, heroCurrent.pixelX, heroCurrent.pixelY);
      } else {
        ctxH.drawImage(heroUp, heroCurrent.pixelX, heroCurrent.pixelY - 71);
        heroCurrent.pixelY -= 71;
        heroCurrent.positionY -= 1;
      }
      break;
    case 'ArrowRight':
    case 'KeyD':
      ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
      if (
        heroCurrent.pixelX === canvasH.width - 71 ||
        map[heroCurrent.positionY][heroCurrent.positionX + 1] === wall
      ) {
        ctxH.drawImage(heroRight, heroCurrent.pixelX, heroCurrent.pixelY);
      } else {
        ctxH.drawImage(heroRight, heroCurrent.pixelX + 71, heroCurrent.pixelY);
        heroCurrent.pixelX += 71;
        heroCurrent.positionX += 1;
      }
      break;
    case 'ArrowLeft':
    case 'KeyA':
      ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
      if (
        heroCurrent.pixelX === 0 ||
        map[heroCurrent.positionY][heroCurrent.positionX - 1] === wall
      ) {
        ctxH.drawImage(heroLeft, heroCurrent.pixelX, heroCurrent.pixelY);
      } else {
        ctxH.drawImage(heroLeft, heroCurrent.pixelX - 71, heroCurrent.pixelY);
        heroCurrent.pixelX -= 71;
        heroCurrent.positionX -= 1;
      }
      break;
    default:
      throw new Error('Only arrow buttons and WASD are acceptable to move your hero!');
  }
}
