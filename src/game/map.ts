import { Tile, wall, floor } from './tiles.ts';

const canvasM = document.querySelector('.map-canvas') as HTMLCanvasElement;
const ctxM = canvasM.getContext('2d') as CanvasRenderingContext2D;

export const map: Tile[][] = [
  [floor, floor, floor, wall, floor, floor, floor, floor, floor, floor],
  [floor, floor, floor, wall, floor, wall, floor, wall, wall, floor],
  [floor, wall, wall, wall, floor, wall, floor, wall, wall, floor],
  [floor, floor, floor, floor, floor, wall, floor, floor, floor, floor],
  [wall, wall, wall, wall, floor, wall, wall, wall, wall, floor],
  [floor, wall, floor, wall, floor, floor, floor, floor, floor, floor],
  [floor, wall, floor, wall, floor, wall, wall, floor, wall, floor],
  [floor, floor, floor, floor, floor, wall, wall, floor, wall, floor],
  [floor, wall, wall, wall, floor, floor, floor, floor, wall, floor],
  [floor, floor, floor, wall, floor, wall, wall, floor, floor, floor],
];

export function drawMap(map: Tile[][]): void {
  for (let i: number = 0; i < map.length; i++) {
    for (let j: number = 0; j < map[i].length; j++) {
      ctxM.drawImage(map[i][j].image, j * 50, i * 50, 50, 50);
    }
  }
}
