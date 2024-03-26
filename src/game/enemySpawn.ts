import { ctxE } from './enemy.ts';
import {
  Character,
  skeleton1Current,
  skeleton2Current,
  skeleton3Current,
  bossCurrent,
} from './characters.ts';
import { map } from './map.ts';
import { wall } from './tiles.ts';
import { randomNumberMinMax } from './game.ts';

export function keyToRandomSkeleton(): void {
  switch (randomNumberMinMax(1, 3)) {
    case 1:
      skeleton1Current.hasKey = true;
      break;
    case 2:
      skeleton2Current.hasKey = true;
      break;
    case 3:
      skeleton3Current.hasKey = true;
      break;
    default:
      skeleton1Current.hasKey = true;
  }
}

function levelUpEnemy(enemy: Character): void {
  const currentLevel: number = enemy.level;
  const nextLevel: number = currentLevel + 1;

  enemy.level = nextLevel;
  enemy.maxHealth = 2 * nextLevel * randomNumberMinMax(1, 6);
  enemy.currentHealth = enemy.maxHealth;
  enemy.defensePoint = (nextLevel / 2) * randomNumberMinMax(1, 6);
  enemy.strikePoint = nextLevel * randomNumberMinMax(1, 6);
}

export function levelUpEnemies(): void {
  levelUpEnemy(skeleton1Current);
  levelUpEnemy(skeleton2Current);
  levelUpEnemy(skeleton3Current);
  levelUpEnemy(bossCurrent);
}

export function randomPosition(): Character {
  const enemy = {} as Character;
  enemy.positionX = randomNumberMinMax(2, 9);
  enemy.positionY = randomNumberMinMax(2, 9);
  enemy.pixelX = enemy.positionX * 50;
  enemy.pixelY = enemy.positionY * 50;
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
  ctxE.drawImage(enemyImage, enemy.pixelX, enemy.pixelY, 50, 50);
}
