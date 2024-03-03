import { canvasE, ctxE } from './enemy.ts';
import { CharacterPosition } from './characterPositions.ts';
import { map } from './map.ts';
import { wall } from './tiles.ts';

const directions: string[] = ['down', 'up', 'right', 'left'];

function randomNumberMax(max: number): number {
  return Math.floor(Math.random() * max);
}

function chooseDirection(): string {
  const chosenDirection: string = directions[randomNumberMax(4)];
  return chosenDirection;
}

export function evaluateDirection(
  characterPosition: CharacterPosition,
  otherEnemyPosition1: CharacterPosition,
  otherEnemyPosition2: CharacterPosition,
  otherEnemyPosition3: CharacterPosition,
): string {
  let tileWalkable: boolean = false;
  let evaluatedDirection: string = '';

  while (tileWalkable === false) {
    const chosenDirection = chooseDirection();
    switch (chosenDirection) {
      case 'down':
        if (
          characterPosition.pixelY === canvasE.height - 71 ||
          map[characterPosition.positionY + 1][characterPosition.positionX] === wall ||
          (characterPosition.positionX === otherEnemyPosition1.positionX &&
            characterPosition.positionY + 1 === otherEnemyPosition1.positionY) ||
          (characterPosition.positionX === otherEnemyPosition2.positionX &&
            characterPosition.positionY + 1 === otherEnemyPosition2.positionY) ||
          (characterPosition.positionX === otherEnemyPosition3.positionX &&
            characterPosition.positionY + 1 === otherEnemyPosition3.positionY)
        ) {
          tileWalkable = false;
        } else {
          tileWalkable = true;
          evaluatedDirection = chosenDirection;
        }
        break;
      case 'up':
        if (
          characterPosition.pixelY === 0 ||
          map[characterPosition.positionY - 1][characterPosition.positionX] === wall ||
          (characterPosition.positionX === otherEnemyPosition1.positionX &&
            characterPosition.positionY - 1 === otherEnemyPosition1.positionY) ||
          (characterPosition.positionX === otherEnemyPosition2.positionX &&
            characterPosition.positionY - 1 === otherEnemyPosition2.positionY) ||
          (characterPosition.positionX === otherEnemyPosition3.positionX &&
            characterPosition.positionY - 1 === otherEnemyPosition3.positionY)
        ) {
          tileWalkable = false;
        } else {
          tileWalkable = true;
          evaluatedDirection = chosenDirection;
        }
        break;
      case 'right':
        if (
          characterPosition.pixelX === canvasE.width - 71 ||
          map[characterPosition.positionY][characterPosition.positionX + 1] === wall ||
          (characterPosition.positionX + 1 === otherEnemyPosition1.positionX &&
            characterPosition.positionY === otherEnemyPosition1.positionY) ||
          (characterPosition.positionX + 1 === otherEnemyPosition2.positionX &&
            characterPosition.positionY === otherEnemyPosition2.positionY) ||
          (characterPosition.positionX + 1 === otherEnemyPosition3.positionX &&
            characterPosition.positionY === otherEnemyPosition3.positionY)
        ) {
          tileWalkable = false;
        } else {
          tileWalkable = true;
          evaluatedDirection = chosenDirection;
        }
        break;
      case 'left':
        if (
          characterPosition.pixelX === 0 ||
          map[characterPosition.positionY][characterPosition.positionX - 1] === wall ||
          (characterPosition.positionX - 1 === otherEnemyPosition1.positionX &&
            characterPosition.positionY === otherEnemyPosition1.positionY) ||
          (characterPosition.positionX - 1 === otherEnemyPosition2.positionX &&
            characterPosition.positionY === otherEnemyPosition2.positionY) ||
          (characterPosition.positionX - 1 === otherEnemyPosition3.positionX &&
            characterPosition.positionY === otherEnemyPosition3.positionY)
        ) {
          tileWalkable = false;
        } else {
          tileWalkable = true;
          evaluatedDirection = chosenDirection;
        }
        break;
      default:
        throw new Error();
    }
  }
  return evaluatedDirection;
}

export function moveEnemy(
  enemyImage: HTMLImageElement,
  characterPosition: CharacterPosition,
  otherEnemyPosition1: CharacterPosition,
  otherEnemyPosition2: CharacterPosition,
  otherEnemyPosition3: CharacterPosition,
): void {
  switch (evaluateDirection(characterPosition, otherEnemyPosition1, otherEnemyPosition2, otherEnemyPosition3)) {
    case 'down':
      ctxE.drawImage(enemyImage, characterPosition.pixelX, characterPosition.pixelY + 71);
      characterPosition.pixelY += 71;
      characterPosition.positionY += 1;
      break;
    case 'up':
      ctxE.drawImage(enemyImage, characterPosition.pixelX, characterPosition.pixelY - 71);
      characterPosition.pixelY -= 71;
      characterPosition.positionY -= 1;
      break;
    case 'right':
      ctxE.drawImage(enemyImage, characterPosition.pixelX + 71, characterPosition.pixelY);
      characterPosition.pixelX += 71;
      characterPosition.positionX += 1;
      break;
    case 'left':
      ctxE.drawImage(enemyImage, characterPosition.pixelX - 71, characterPosition.pixelY);
      characterPosition.pixelX -= 71;
      characterPosition.positionX -= 1;
      break;
    default:
      throw new Error();
  }
}
