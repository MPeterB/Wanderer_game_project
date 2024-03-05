import { canvasE, ctxE } from './enemy.ts';
import { Character, heroCurrent } from './characters.ts';
import { map } from './map.ts';
import { wall } from './tiles.ts';
import { showEnemyStats } from './showStats.ts';

const directions: string[] = ['down', 'up', 'right', 'left'];

function randomNumberMax(max: number): number {
  return Math.floor(Math.random() * max);
}

function chooseDirection(): string {
  const chosenDirection: string = directions[randomNumberMax(4)];
  return chosenDirection;
}

export function evaluateDirection(
  enemy: Character,
  otherEnemy1: Character,
  otherEnemy2: Character,
  otherEnemy3: Character,
): string | void {

  if (enemy.positionX === heroCurrent.positionX && enemy.positionY === heroCurrent.positionY) {
    enemy.moving = false;
  } else {
    let tileWalkable: boolean = false;
    let evaluatedDirection: string = '';
  
    while (tileWalkable === false) {
      const chosenDirection = chooseDirection();
      switch (chosenDirection) {
        case 'down':
          if (
            enemy.pixelY === canvasE.height - 50 ||
            map[enemy.positionY + 1][enemy.positionX] === wall ||
            (enemy.positionX === otherEnemy1.positionX && enemy.positionY + 1 === otherEnemy1.positionY) ||
            (enemy.positionX === otherEnemy2.positionX && enemy.positionY + 1 === otherEnemy2.positionY) ||
            (enemy.positionX === otherEnemy3.positionX && enemy.positionY + 1 === otherEnemy3.positionY)
          ) {
            tileWalkable = false;
          } else {
            tileWalkable = true;
            evaluatedDirection = chosenDirection;
          }
          break;
        case 'up':
          if (
            enemy.pixelY === 0 ||
            map[enemy.positionY - 1][enemy.positionX] === wall ||
            (enemy.positionX === otherEnemy1.positionX && enemy.positionY - 1 === otherEnemy1.positionY) ||
            (enemy.positionX === otherEnemy2.positionX && enemy.positionY - 1 === otherEnemy2.positionY) ||
            (enemy.positionX === otherEnemy3.positionX && enemy.positionY - 1 === otherEnemy3.positionY)
          ) {
            tileWalkable = false;
          } else {
            tileWalkable = true;
            evaluatedDirection = chosenDirection;
          }
          break;
        case 'right':
          if (
            enemy.pixelX === canvasE.width - 50 ||
            map[enemy.positionY][enemy.positionX + 1] === wall ||
            (enemy.positionX + 1 === otherEnemy1.positionX && enemy.positionY === otherEnemy1.positionY) ||
            (enemy.positionX + 1 === otherEnemy2.positionX && enemy.positionY === otherEnemy2.positionY) ||
            (enemy.positionX + 1 === otherEnemy3.positionX && enemy.positionY === otherEnemy3.positionY)
          ) {
            tileWalkable = false;
          } else {
            tileWalkable = true;
            evaluatedDirection = chosenDirection;
          }
          break;
        case 'left':
          if (
            enemy.pixelX === 0 ||
            map[enemy.positionY][enemy.positionX - 1] === wall ||
            (enemy.positionX - 1 === otherEnemy1.positionX && enemy.positionY === otherEnemy1.positionY) ||
            (enemy.positionX - 1 === otherEnemy2.positionX && enemy.positionY === otherEnemy2.positionY) ||
            (enemy.positionX - 1 === otherEnemy3.positionX && enemy.positionY === otherEnemy3.positionY)
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
}

export function moveEnemy(
  enemyImage: HTMLImageElement,
  enemy: Character,
  otherEnemy1: Character,
  otherEnemy2: Character,
  otherEnemy3: Character,
): void {
  switch (evaluateDirection(enemy, otherEnemy1, otherEnemy2, otherEnemy3)) {
    case 'down':
      ctxE.drawImage(enemyImage, enemy.pixelX, enemy.pixelY + 50, 50, 50);
      enemy.pixelY += 50;
      enemy.positionY += 1;
      showEnemyStats()
      break;
    case 'up':
      ctxE.drawImage(enemyImage, enemy.pixelX, enemy.pixelY - 50, 50, 50);
      enemy.pixelY -= 50;
      enemy.positionY -= 1;
      showEnemyStats()
      break;
    case 'right':
      ctxE.drawImage(enemyImage, enemy.pixelX + 50, enemy.pixelY, 50, 50);
      enemy.pixelX += 50;
      enemy.positionX += 1;
      showEnemyStats()
      break;
    case 'left':
      ctxE.drawImage(enemyImage, enemy.pixelX - 50, enemy.pixelY, 50, 50);
      enemy.pixelX -= 50;
      enemy.positionX -= 1;
      showEnemyStats()
      break;
    default:
      ctxE.drawImage(enemyImage, enemy.pixelX, enemy.pixelY, 50, 50);
      showEnemyStats()
  }
}
