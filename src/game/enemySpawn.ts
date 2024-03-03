import { ctxE } from './enemy';
import { CharacterPosition } from './characterPositions.ts';
import { map } from './map.ts';
import { wall } from './tiles.ts';

function randomNumberMinMax(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export function randomPosition(): CharacterPosition {
  const characterPosition = {} as CharacterPosition;
  characterPosition.positionX = randomNumberMinMax(2, 9);
  characterPosition.positionY = randomNumberMinMax(2, 9);
  characterPosition.pixelX = characterPosition.positionX * 71;
  characterPosition.pixelY = characterPosition.positionY * 71;
  return characterPosition;
}

export function evaluatePosition(): CharacterPosition {
  let tileSpawnable: boolean = false;
  let evaluatedPosition = {} as CharacterPosition;

  while (tileSpawnable === false) {
    const positionToEvaluate = randomPosition();
    if (map[positionToEvaluate.positionY][positionToEvaluate.positionX] === wall) {
      tileSpawnable = false;
    } else {
      tileSpawnable = true;
      evaluatedPosition = positionToEvaluate;
    }
  }
  return evaluatedPosition;
}

export function drawEnemy(
  enemyImage: HTMLImageElement,
  characterPosition: {
    pixelX: number;
    pixelY: number;
    positionX: number;
    positionY: number;
  },
): void {
  const evaluatedPosition = evaluatePosition();
  characterPosition.pixelX = evaluatedPosition.pixelX;
  characterPosition.pixelY = evaluatedPosition.pixelY;
  characterPosition.positionX = evaluatedPosition.positionX;
  characterPosition.positionY = evaluatedPosition.positionY;
  ctxE.drawImage(enemyImage, characterPosition.pixelX, characterPosition.pixelY);
}