import { wall, floor } from "./tiles";

const canvasM = document.querySelector('.map-canvas') as HTMLCanvasElement;
const ctxM = canvasM.getContext('2d') as CanvasRenderingContext2D;

export const map: HTMLImageElement[][] = [
  [floor.image, floor.image, floor.image, wall.image, floor.image, floor.image, floor.image, floor.image, floor.image, floor.image],
  [floor.image, floor.image, floor.image, wall.image, floor.image, wall.image, floor.image, wall.image, wall.image, floor.image],
  [floor.image, wall.image, wall.image, wall.image, floor.image, wall.image, floor.image, wall.image, wall.image, floor.image],
  [floor.image, floor.image, floor.image, floor.image, floor.image, wall.image, floor.image, floor.image, floor.image, floor.image],
  [wall.image, wall.image, wall.image, wall.image, floor.image, wall.image, wall.image, wall.image, wall.image, floor.image],
  [floor.image, wall.image, floor.image, wall.image, floor.image, floor.image, floor.image, floor.image, floor.image, floor.image],
  [floor.image, wall.image, floor.image, wall.image, floor.image, wall.image, wall.image, floor.image, wall.image, floor.image],
  [floor.image, floor.image, floor.image, floor.image, floor.image, wall.image, wall.image, floor.image, wall.image, floor.image],
  [floor.image, wall.image, wall.image, wall.image, floor.image, floor.image, floor.image, floor.image, wall.image, floor.image],
  [floor.image, floor.image, floor.image, wall.image, floor.image, wall.image, wall.image, floor.image, floor.image, floor.image],
];

export function drawMap(map: HTMLImageElement[][]): void {
  for (let i: number = 0; i < map.length; i++) {
    for (let j: number = 0; j < map[i].length; j++) {
      ctxM.drawImage(map[i][j], j * 71, i * 71);
    }
  }
}
