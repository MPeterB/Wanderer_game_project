import {
  CharacterPosition,
  skeleton1Current,
  skeleton2Current,
  skeleton3Current,
  bossCurrent,
} from './characterPositions.ts';
import { map, wall } from './map.ts';

const canvasE = document.querySelector('.enemy-canvas') as HTMLCanvasElement;
const ctxE = canvasE.getContext('2d') as CanvasRenderingContext2D;

export const skeleton = document.getElementById('skeleton') as HTMLImageElement;
export const boss = document.getElementById('boss') as HTMLImageElement;

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

export function drawEnemies(): void {
  drawEnemy(skeleton, skeleton1Current);
  drawEnemy(skeleton, skeleton2Current);
  drawEnemy(skeleton, skeleton3Current);
  drawEnemy(boss, bossCurrent);
}

const directions: string[] = ['down', 'up', 'right', 'left'];
const seconds: number = 1;

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
          map[characterPosition.positionY + 1][characterPosition.positionX] === wall
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
          map[characterPosition.positionY - 1][characterPosition.positionX] === wall
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
          map[characterPosition.positionY][characterPosition.positionX + 1] === wall
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
          map[characterPosition.positionY][characterPosition.positionX - 1] === wall
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

export function moveEnemies(): void {
  setInterval(() => {
    ctxE.clearRect(0, 0, canvasE.width, canvasE.height);
    moveEnemy(skeleton, skeleton1Current);
    moveEnemy(skeleton, skeleton2Current);
    moveEnemy(skeleton, skeleton3Current);
    moveEnemy(boss, bossCurrent);
  }, seconds * 1000);
}
