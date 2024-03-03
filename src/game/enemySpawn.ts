import { ctxE } from './enemy.ts';
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

export function evaluatePosition(
  otherEnemyPosition1: CharacterPosition,
  otherEnemyPosition2: CharacterPosition,
  otherEnemyPosition3: CharacterPosition,
): CharacterPosition {
  let tileSpawnable: boolean = false;
  let evaluatedPosition = {} as CharacterPosition;

  while (tileSpawnable === false) {
    const positionToEvaluate = randomPosition();
    if (
      map[positionToEvaluate.positionY][positionToEvaluate.positionX] === wall ||
      (positionToEvaluate.positionX === otherEnemyPosition1.positionX &&
        positionToEvaluate.positionY === otherEnemyPosition1.positionY) ||
      (positionToEvaluate.positionX === otherEnemyPosition2.positionX &&
        positionToEvaluate.positionY === otherEnemyPosition2.positionY) ||
      (positionToEvaluate.positionX === otherEnemyPosition3.positionX &&
        positionToEvaluate.positionY === otherEnemyPosition3.positionY)
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
  characterPosition: CharacterPosition,
  otherEnemyPosition1: CharacterPosition,
  otherEnemyPosition2: CharacterPosition,
  otherEnemyPosition3: CharacterPosition,
): void {
  const evaluatedPosition = evaluatePosition(otherEnemyPosition1, otherEnemyPosition2, otherEnemyPosition3);
  characterPosition.pixelX = evaluatedPosition.pixelX;
  characterPosition.pixelY = evaluatedPosition.pixelY;
  characterPosition.positionX = evaluatedPosition.positionX;
  characterPosition.positionY = evaluatedPosition.positionY;
  ctxE.drawImage(enemyImage, characterPosition.pixelX, characterPosition.pixelY);
}
