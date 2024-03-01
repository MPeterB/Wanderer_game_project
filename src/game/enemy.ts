import { skeleton1Current, skeleton2Current, skeleton3Current, bossCurrent } from './characterPositions.ts';
import { map, wall } from './map.ts';

const canvasE = document.querySelector('.enemy-canvas') as HTMLCanvasElement;
const ctxE = canvasE.getContext('2d') as CanvasRenderingContext2D;

export const skeleton = document.getElementById('skeleton') as HTMLImageElement;
export const boss = document.getElementById('boss') as HTMLImageElement;

export function drawEnemies(skeleton: HTMLImageElement, boss: HTMLImageElement): void {
  ctxE.drawImage(skeleton, skeleton1Current.pixelX, skeleton1Current.pixelY);
  ctxE.drawImage(skeleton, skeleton2Current.pixelX, skeleton2Current.pixelY);
  ctxE.drawImage(skeleton, skeleton3Current.pixelX, skeleton3Current.pixelY);
  ctxE.drawImage(boss, bossCurrent.pixelX, bossCurrent.pixelY);
}
const directions: string[] = ['down', 'up', 'right', 'left'];
const seconds: number = 1;

export function moveEnemies(): void {
  setInterval(() => {
    ctxE.clearRect(0, 0, canvasE.width, canvasE.height);
    moveSkeleton1(skeleton);
    moveSkeleton2(skeleton);
    moveSkeleton3(skeleton);
    moveBoss(boss);
  }, seconds * 1000);
}

function randomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

function chooseDirection(): string {
  const chosenDirection: string = directions[randomNumber(4)];
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

export function moveSkeleton1(skeleton: HTMLImageElement): void {

  switch (evaluateDirection(skeleton1Current)) {
    case 'down':
      ctxE.drawImage(skeleton, skeleton1Current.pixelX, skeleton1Current.pixelY + 71)
      skeleton1Current.pixelY += 71;
      skeleton1Current.positionY += 1;
      break;
    case 'up':
      ctxE.drawImage(skeleton, skeleton1Current.pixelX, skeleton1Current.pixelY - 71)
      skeleton1Current.pixelY -= 71;
      skeleton1Current.positionY -= 1;
      break;
    case 'right':
      ctxE.drawImage(skeleton, skeleton1Current.pixelX + 71, skeleton1Current.pixelY)
      skeleton1Current.pixelX += 71;
      skeleton1Current.positionX += 1;
      break;
    case 'left':
      ctxE.drawImage(skeleton, skeleton1Current.pixelX - 71, skeleton1Current.pixelY)
      skeleton1Current.pixelX -= 71;
      skeleton1Current.positionX -= 1;
      break;
    default:
      throw new Error();
  }
}

export function moveSkeleton2(skeleton: HTMLImageElement): void {

  switch (evaluateDirection(skeleton2Current)) {
    case 'down':
      ctxE.drawImage(skeleton, skeleton2Current.pixelX, skeleton2Current.pixelY + 71)
      skeleton2Current.pixelY += 71;
      skeleton2Current.positionY += 1;
      break;
    case 'up':
      ctxE.drawImage(skeleton, skeleton2Current.pixelX, skeleton2Current.pixelY - 71)
      skeleton2Current.pixelY -= 71;
      skeleton2Current.positionY -= 1;
      break;
    case 'right':
      ctxE.drawImage(skeleton, skeleton2Current.pixelX + 71, skeleton2Current.pixelY)
      skeleton2Current.pixelX += 71;
      skeleton2Current.positionX += 1;
      break;
    case 'left':
      ctxE.drawImage(skeleton, skeleton2Current.pixelX - 71, skeleton2Current.pixelY)
      skeleton2Current.pixelX -= 71;
      skeleton2Current.positionX -= 1;
      break;
    default:
      throw new Error();
  }
}

export function moveSkeleton3(skeleton: HTMLImageElement): void {

  switch (evaluateDirection(skeleton3Current)) {
    case 'down':
      ctxE.drawImage(skeleton, skeleton3Current.pixelX, skeleton3Current.pixelY + 71)
      skeleton3Current.pixelY += 71;
      skeleton3Current.positionY += 1;
      break;
    case 'up':
      ctxE.drawImage(skeleton, skeleton3Current.pixelX, skeleton3Current.pixelY - 71)
      skeleton3Current.pixelY -= 71;
      skeleton3Current.positionY -= 1;
      break;
    case 'right':
      ctxE.drawImage(skeleton, skeleton3Current.pixelX + 71, skeleton3Current.pixelY)
      skeleton3Current.pixelX += 71;
      skeleton3Current.positionX += 1;
      break;
    case 'left':
      ctxE.drawImage(skeleton, skeleton3Current.pixelX - 71, skeleton3Current.pixelY)
      skeleton3Current.pixelX -= 71;
      skeleton3Current.positionX -= 1;
      break;
    default:
      throw new Error();
  }
}

export function moveBoss(skeleton: HTMLImageElement): void {

  switch (evaluateDirection(bossCurrent)) {
    case 'down':
      ctxE.drawImage(skeleton, bossCurrent.pixelX, bossCurrent.pixelY + 71)
      bossCurrent.pixelY += 71;
      bossCurrent.positionY += 1;
      break;
    case 'up':
      ctxE.drawImage(skeleton, bossCurrent.pixelX, bossCurrent.pixelY - 71)
      bossCurrent.pixelY -= 71;
      bossCurrent.positionY -= 1;
      break;
    case 'right':
      ctxE.drawImage(skeleton, bossCurrent.pixelX + 71, bossCurrent.pixelY)
      bossCurrent.pixelX += 71;
      bossCurrent.positionX += 1;
      break;
    case 'left':
      ctxE.drawImage(skeleton, bossCurrent.pixelX - 71, bossCurrent.pixelY)
      bossCurrent.pixelX -= 71;
      bossCurrent.positionX -= 1;
      break;
    default:
      throw new Error();
  }
}