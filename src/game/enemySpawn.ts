import { ctxE } from './enemy.ts';
import { Character } from './characters.ts';
import { map } from './map.ts';
import { wall } from './tiles.ts';

function randomNumberMinMax(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export function randomPosition(): Character {
  const enemy = {} as Character;
  enemy.positionX = randomNumberMinMax(2, 9);
  enemy.positionY = randomNumberMinMax(2, 9);
  enemy.pixelX = enemy.positionX * 71;
  enemy.pixelY = enemy.positionY * 71;
  return enemy;
}

export function evaluatePosition(
  otherEnemy1: Character,
  otherEnemy2: Character,
  otherEnemy3: Character,
): Character {
  let tileSpawnable: boolean = false;
  let evaluatedPosition = {} as Character;

  while (tileSpawnable === false) {
    const positionToEvaluate = randomPosition();
    if (
      map[positionToEvaluate.positionY][positionToEvaluate.positionX] === wall ||
      (positionToEvaluate.positionX === otherEnemy1.positionX &&
        positionToEvaluate.positionY === otherEnemy1.positionY) ||
      (positionToEvaluate.positionX === otherEnemy2.positionX &&
        positionToEvaluate.positionY === otherEnemy2.positionY) ||
      (positionToEvaluate.positionX === otherEnemy3.positionX &&
        positionToEvaluate.positionY === otherEnemy3.positionY)
    ) {
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
  enemy: Character,
  otherEnemy1: Character,
  otherEnemy2: Character,
  otherEnemy3: Character,
): void {
  const evaluatedPosition = evaluatePosition(otherEnemy1, otherEnemy2, otherEnemy3);
  enemy.pixelX = evaluatedPosition.pixelX;
  enemy.pixelY = evaluatedPosition.pixelY;
  enemy.positionX = evaluatedPosition.positionX;
  enemy.positionY = evaluatedPosition.positionY;
  ctxE.drawImage(enemyImage, enemy.pixelX, enemy.pixelY);
}
