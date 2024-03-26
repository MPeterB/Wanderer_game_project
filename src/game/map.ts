import { randomNumberMinMax } from './game.ts';
import { Tile, wall, floor } from './tiles.ts';

const canvasM = document.querySelector('.map-canvas') as HTMLCanvasElement;
const ctxM = canvasM.getContext('2d') as CanvasRenderingContext2D;

export function generateRandomMap(): Tile[][] {
  const randomMap: Tile[][] = [[], [], [], [], [], [], [], [], [], []];

  randomMap[0].push(floor);

  for (let i: number = 1; i <= 9; i++) {
    const choose: number = randomNumberMinMax(0, 2);
    if (choose === 0) {
      randomMap[0].push(floor);
    } else {
      randomMap[0].push(wall);
    }
  }

  for (let i: number = 1; i <= 9; i++) {
    for (let j: number = 0; j <= 9; j++) {
      const choose: number = randomNumberMinMax(0, 2);
      if (randomMap[i - 1][j] === floor) {
        if (randomMap[i - 1][j + 1] === floor) {
          if (randomMap[i - 1][j - 1] === floor) {
            if (choose === 0) {
              randomMap[i].push(floor);
            } else {
              randomMap[i].push(wall);
            }
          } else {
            if (randomMap[i][j - 1] === floor) {
              randomMap[i].push(floor);
            } else {
              if (choose === 0) {
                randomMap[i].push(floor);
              } else {
                randomMap[i].push(wall);
              }
            }
          }
        } else {
          if (randomMap[i - 1][j - 1] === floor) {
            if (randomMap[i][j - 1] === floor) {
              if (choose === 0) {
                randomMap[i].push(floor);
              } else {
                randomMap[i].push(wall);
              }
            } else {
              randomMap[i].push(floor);
            }
          } else {
            if (randomMap[i][j - 1] === floor) {
              randomMap[i].push(floor);
            } else {
              randomMap[i].push(floor);
            }
          }
        }
      } else {
        if (randomMap[i - 1][j + 1] === floor) {
          if (randomMap[i - 1][j - 1] === floor) {
            if (randomMap[i][j - 1] === floor) {
              randomMap[i].push(floor);
            } else {
              if (choose === 0) {
                randomMap[i].push(floor);
              } else {
                randomMap[i].push(wall);
              }
            }
          } else {
            if (randomMap[i][j - 1] === floor) {
              randomMap[i].push(floor);
            } else {
              if (choose === 0) {
                randomMap[i].push(floor);
              } else {
                randomMap[i].push(wall);
              }
            }
          }
        } else {
          if (randomMap[i][j - 1] === floor) {
            randomMap[i].push(floor);
          } else {
            if (choose === 0) {
              randomMap[i].push(floor);
            } else {
              randomMap[i].push(wall);
            }
          }
        }
      }
    }
  }
  return randomMap;
}

export const map: Tile[][] = generateRandomMap();

export function drawMap(map: Tile[][]): void {
  for (let i: number = 0; i < map.length; i++) {
    for (let j: number = 0; j < map[i].length; j++) {
      ctxM.drawImage(map[i][j].image, j * 50, i * 50, 50, 50);
    }
  }
}
