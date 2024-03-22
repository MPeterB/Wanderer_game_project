import { canvasE, ctxE } from './enemy.ts';
import { Character, heroCurrent } from './characters.ts';
import { map } from './map.ts';
import { wall } from './tiles.ts';
import { showEnemyStats } from './showStats.ts';
import { battle, firstAttackHappened } from './battle.ts';
import { wonLevel } from './game.ts';

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
  const alerts = document.getElementById('alerts') as HTMLElement;
  if (enemy.alive === false) {
    return 'dead';
  }
  if (wonLevel.value === true) {
    return 'wonLevel';
  }
  if (heroCurrent.alive === false) {
    return 'gameOver';
  }
  if (enemy.positionX === heroCurrent.positionX && enemy.positionY === heroCurrent.positionY) {
    enemy.moving = false;
    heroCurrent.moving = false;
    return 'battle';
  }
  let tileWalkable: boolean = false;
  let evaluatedDirection: string = '';
  let numberOfTries: number = 0;

  while (tileWalkable === false) {
    const chosenDirection = chooseDirection();
    numberOfTries += 1;
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
        if (numberOfTries > 10) {
          return 'stay';
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
        if (numberOfTries > 10) {
          return 'stay';
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
        if (numberOfTries > 10) {
          return 'stay';
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
        if (numberOfTries > 10) {
          return 'stay';
        }
        break;
      default:
        alerts.innerHTML = `${new Error().message}`;
    }
  }
  return evaluatedDirection;
}

export function moveEnemy(
  enemyImage: HTMLImageElement,
  enemy: Character,
  otherEnemy1: Character,
  otherEnemy2: Character,
  otherEnemy3: Character,
): void {
  const direction = evaluateDirection(enemy, otherEnemy1, otherEnemy2, otherEnemy3);
  switch (direction) {
    case 'down':
      ctxE.drawImage(enemyImage, enemy.pixelX, enemy.pixelY + 50, 50, 50);
      enemy.pixelY += 50;
      enemy.positionY += 1;
      enemy.lastMove = new Date();
      break;
    case 'up':
      ctxE.drawImage(enemyImage, enemy.pixelX, enemy.pixelY - 50, 50, 50);
      enemy.pixelY -= 50;
      enemy.positionY -= 1;
      enemy.lastMove = new Date();
      break;
    case 'right':
      ctxE.drawImage(enemyImage, enemy.pixelX + 50, enemy.pixelY, 50, 50);
      enemy.pixelX += 50;
      enemy.positionX += 1;
      enemy.lastMove = new Date();
      break;
    case 'left':
      ctxE.drawImage(enemyImage, enemy.pixelX - 50, enemy.pixelY, 50, 50);
      enemy.pixelX -= 50;
      enemy.positionX -= 1;
      enemy.lastMove = new Date();
      break;
    case 'battle':
      ctxE.drawImage(enemyImage, enemy.pixelX, enemy.pixelY, 50, 50);
      showEnemyStats();
      if (firstAttackHappened.value === false) {
        battle();
      }
      break;
    case 'stay':
    case 'gameOver':
    case 'wonLevel':
      ctxE.drawImage(enemyImage, enemy.pixelX, enemy.pixelY, 50, 50);
      break;
    case 'dead':
      break;
    default:
      ctxE.drawImage(enemyImage, enemy.pixelX, enemy.pixelY, 50, 50);
  }
}
