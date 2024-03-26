import { bossCurrent, heroCurrent, skeleton1Current, skeleton2Current, skeleton3Current } from './characters.ts';
import { drawEnemies, moveEnemies, moveInterval } from './enemy.ts';
import { levelUpEnemies } from './enemySpawn.ts';
import { drawMap, map } from './map.ts';
import { canvasH, ctxH, heroDown } from './heroMovement.ts';
import { showHeroStats } from './showStats.ts';

export type BooleanObject = {
  value: boolean;
};
export const gameInProgress: BooleanObject = {
  value: false,
};

export const wonLevel: BooleanObject = {
  value: false,
};

export function startGame() {
  moveEnemies();
}

export function randomNumberMinMax(min: number, max: number): number {
  const minCeiled: number = Math.ceil(min);
  const maxFloored: number = Math.floor(max);
  const randomNumber: number = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  return randomNumber;
}

function heroHealthRestore(): void {
  const chances: number[] = [1, 2, 2, 2, 2, 3, 3, 3, 3, 3];
  const chosenIndex: number = chances[randomNumberMinMax(0, 9)];
  let maxRestorable: number = 0;
  switch (chosenIndex) {
    case 1:
      heroCurrent.currentHealth = heroCurrent.maxHealth;
      break;
    case 2:
      maxRestorable = heroCurrent.maxHealth / 3;
      if ((heroCurrent.currentHealth + maxRestorable) > heroCurrent.maxHealth) {
        heroCurrent.currentHealth = heroCurrent.maxHealth;
      } else {
        heroCurrent.currentHealth = Number((heroCurrent.currentHealth + maxRestorable).toFixed());
      }
      break;
    case 3:
      maxRestorable = heroCurrent.maxHealth * 0.1;
      if ((heroCurrent.currentHealth + maxRestorable) > heroCurrent.maxHealth) {
        heroCurrent.currentHealth = heroCurrent.maxHealth;
      } else {
        heroCurrent.currentHealth = Number((heroCurrent.currentHealth + maxRestorable).toFixed());
      }
      break;
    default:
      heroCurrent.currentHealth += 1;
  }
}

const wonLevelScreen = document.getElementById('wonLevelScreen') as HTMLElement;
const alertBox = document.getElementById('alertBox') as HTMLElement;
const statsContainer = document.getElementById('stats-container') as HTMLElement;

export function winLevel() {
  wonLevel.value = true;
  heroCurrent.moving = false;
  gameInProgress.value = false;
  clearInterval(moveInterval);
  heroHealthRestore();
  levelUpEnemies();
  setTimeout(() => {
    wonLevelScreen.style.display = 'block';
    alertBox.style.display = 'none';
    statsContainer.style.display = 'none';
  }, 5000);
}

export function nextLevel(): void {
  const gameMessages = document.getElementById('gameMessages') as HTMLElement;
  const alerts = document.getElementById('alerts') as HTMLElement;

  gameMessages.innerHTML = `To start the game press one of the arrow or WASD buttons!`;
  alerts.innerHTML = '';

  ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
  drawMap(map);
  heroCurrent.pixelX = 0;
  heroCurrent.pixelY = 0;
  heroCurrent.positionX = 0;
  heroCurrent.positionY = 0;
  ctxH.drawImage(heroDown, 0, 0, 50, 50);
  showHeroStats();
  drawEnemies();
  wonLevelScreen.style.display = 'none';
  alertBox.style.display = 'block';
  statsContainer.style.display = 'flex';
  wonLevel.value = false;
  heroCurrent.moving = true;
  skeleton1Current.alive = true;
  skeleton2Current.alive = true;
  skeleton3Current.alive = true;
  bossCurrent.alive = true;
}
