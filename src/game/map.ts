import { ctx } from '../main.ts';

const floor = document.getElementById('floor') as HTMLImageElement;
const wall = document.getElementById('wall') as HTMLImageElement;

export const map: HTMLImageElement[][] = [
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

export function drawMap(map: HTMLImageElement[][]): void {
  for (let i: number = 0; i < map.length; i++) {
    for (let j: number = 0; j < map[i].length; j++) {
      ctx.drawImage(map[i][j], j * 71, i * 71);
    }
  }
}
