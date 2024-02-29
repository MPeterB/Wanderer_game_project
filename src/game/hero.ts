import { CharacterPosition } from '../main.ts';
import { map, wall } from './map.ts';

export const canvasG = document.querySelector('.game-canvas') as HTMLCanvasElement;
export const ctxG = canvasG.getContext('2d') as CanvasRenderingContext2D;

export const heroDown = document.getElementById('hero-down') as HTMLImageElement;
const heroUp = document.getElementById('hero-up') as HTMLImageElement;
const heroRight = document.getElementById('hero-right') as HTMLImageElement;
const heroLeft = document.getElementById('hero-left') as HTMLImageElement;

const heroCurrentX: CharacterPosition = {
  pixel: 0,
  position: 0,
};

const heroCurrentY: CharacterPosition = {
  pixel: 0,
  position: 0,
};

export function onKeyPress(event: KeyboardEvent): void {
  switch (event.key) {
    case 'ArrowDown':
      ctxG.clearRect(0, 0, canvasG.width, canvasG.height);
      if (
        heroCurrentY.pixel === canvasG.height - 71 ||
        map[heroCurrentY.position + 1][heroCurrentX.position] === wall
      ) {
        ctxG.drawImage(heroDown, heroCurrentX.pixel, heroCurrentY.pixel);
      } else {
        ctxG.drawImage(heroDown, heroCurrentX.pixel, heroCurrentY.pixel + 71);
        heroCurrentY.pixel += 71;
        heroCurrentY.position += 1;
      }
      break;
    case 'ArrowUp':
      ctxG.clearRect(0, 0, canvasG.width, canvasG.height);
      if (
        heroCurrentY.pixel === 0 ||
        map[heroCurrentY.position - 1][heroCurrentX.position] === wall
      ) {
        ctxG.drawImage(heroUp, heroCurrentX.pixel, heroCurrentY.pixel);
      } else {
        ctxG.drawImage(heroUp, heroCurrentX.pixel, heroCurrentY.pixel - 71);
        heroCurrentY.pixel -= 71;
        heroCurrentY.position -= 1;
      }
      break;
    case 'ArrowRight':
      ctxG.clearRect(0, 0, canvasG.width, canvasG.height);
      if (
        heroCurrentX.pixel === canvasG.width - 71 ||
        map[heroCurrentY.position][heroCurrentX.position + 1] === wall
      ) {
        ctxG.drawImage(heroRight, heroCurrentX.pixel, heroCurrentY.pixel);
      } else {
        ctxG.drawImage(heroRight, heroCurrentX.pixel + 71, heroCurrentY.pixel);
        heroCurrentX.pixel += 71;
        heroCurrentX.position += 1;
      }
      break;
    case 'ArrowLeft':
      ctxG.clearRect(0, 0, canvasG.width, canvasG.height);
      if (
        heroCurrentX.pixel === 0 ||
        map[heroCurrentY.position][heroCurrentX.position - 1] === wall
      ) {
        ctxG.drawImage(heroLeft, heroCurrentX.pixel, heroCurrentY.pixel);
      } else {
        ctxG.drawImage(heroLeft, heroCurrentX.pixel - 71, heroCurrentY.pixel);
        heroCurrentX.pixel -= 71;
        heroCurrentX.position -= 1;
      }
      break;
    default:
      throw new Error('To start playing the game press any of the arrow buttons on your keyboard!');
  }
}
