const canvasE = document.querySelector('.enemy-canvas') as HTMLCanvasElement;
const ctxE = canvasE.getContext('2d') as CanvasRenderingContext2D;

export const skeleton1 = document.getElementById('skeleton') as HTMLImageElement;
export const skeleton2 = document.getElementById('skeleton') as HTMLImageElement;
export const skeleton3 = document.getElementById('skeleton') as HTMLImageElement;
export const boss = document.getElementById('boss') as HTMLImageElement;

export function drawEnemies(
  skeleton1: HTMLImageElement, skeleton2: HTMLImageElement,
  skeleton3: HTMLImageElement, boss: HTMLImageElement
): void {
  ctxE.drawImage(skeleton1, 426, 142);
  ctxE.drawImage(skeleton2, 71, 497);
  ctxE.drawImage(skeleton3, 497, 568);
  ctxE.drawImage(boss, 284, 355);
}
