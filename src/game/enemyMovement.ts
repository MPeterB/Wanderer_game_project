import { canvasE, ctxE } from './enemy.ts';
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
  characterPosition: {
    pixelX: number;
    pixelY: number;
    positionX: number;
    positionY: number;
  }
): string {
  let tileWalkable: boolean = false;
  let evaluatedDirection: string = '';

  while (tileWalkable === false) {
    const chosenDirection = chooseDirection();
    switch (chosenDirection) {
      case 'down':
        if (
          characterPosition.pixelY === canvasE.height - 71 ||
          map[characterPosition.positionY + 1][characterPosition.positionX] === wall.image
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
          map[characterPosition.positionY - 1][characterPosition.positionX] === wall.image
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
          map[characterPosition.positionY][characterPosition.positionX + 1] === wall.image
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
          map[characterPosition.positionY][characterPosition.positionX - 1] === wall.image
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
  characterPosition: {
    pixelX: number;
    pixelY: number;
    positionX: number;
    positionY: number;
  },
): void {
  switch (evaluateDirection(characterPosition)) {
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
