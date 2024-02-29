export const canvasG = document.querySelector('.game-canvas') as HTMLCanvasElement;
export const ctxG = canvasG.getContext('2d') as CanvasRenderingContext2D;

export const heroDown = document.getElementById('hero-down') as HTMLImageElement;
const heroUp = document.getElementById('hero-up') as HTMLImageElement;
const heroRight = document.getElementById('hero-right') as HTMLImageElement;
const heroLeft = document.getElementById('hero-left') as HTMLImageElement;

let heroCurrentX: number = 0;
let heroCurrentY: number = 0;

export function onKeyPress(event: KeyboardEvent): void {
  switch (event.key) {
    case 'ArrowDown':
      ctxG.clearRect(0, 0, canvasG.width, canvasG.height);
      if (heroCurrentY === canvasG.height - 71) {
        ctxG.drawImage(heroDown, heroCurrentX, heroCurrentY);
      } else {
        ctxG.drawImage(heroDown, heroCurrentX, heroCurrentY + 71);
        heroCurrentY += 71;
      }
      break;
    case 'ArrowUp':
      ctxG.clearRect(0, 0, canvasG.width, canvasG.height);
      if (heroCurrentY === 0) {
        ctxG.drawImage(heroUp, heroCurrentX, heroCurrentY);
      } else {
        ctxG.drawImage(heroUp, heroCurrentX, heroCurrentY - 71);
        heroCurrentY -= 71;
      }
      break;
    case 'ArrowRight':
      ctxG.clearRect(0, 0, canvasG.width, canvasG.height);
      if (heroCurrentX === canvasG.width - 71) {
        ctxG.drawImage(heroRight, heroCurrentX, heroCurrentY);
      } else {
        ctxG.drawImage(heroRight, heroCurrentX + 71, heroCurrentY);
        heroCurrentX += 71;
      }
      break;
    case 'ArrowLeft':
      ctxG.clearRect(0, 0, canvasG.width, canvasG.height);
      if (heroCurrentX === 0) {
        ctxG.drawImage(heroLeft, heroCurrentX, heroCurrentY);
      } else {
        ctxG.drawImage(heroLeft, heroCurrentX - 71, heroCurrentY);
        heroCurrentX -= 71;
      }
      break;
  }
}
