import { heroCurrent } from './characters.ts';
import { moveEnemies } from './enemy.ts';
import { levelUpEnemies } from './enemySpawn.ts';

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
        heroCurrent.currentHealth = (heroCurrent.currentHealth + maxRestorable);
      }
      break;
    case 3:
      maxRestorable = heroCurrent.maxHealth * 0.1;
      if ((heroCurrent.currentHealth + maxRestorable) > heroCurrent.maxHealth) {
        heroCurrent.currentHealth = heroCurrent.maxHealth;
      } else {
        heroCurrent.currentHealth = (heroCurrent.currentHealth + maxRestorable);
      }
      break;
    default:
      heroCurrent.currentHealth += 1;
  }
}

export function winLevel() {
  const wonLevelScreen = document.getElementById('wonLevelScreen') as HTMLElement;
  const alertBox = document.getElementById('alertBox') as HTMLElement;
  const statsContainer = document.getElementById('stats-container') as HTMLElement;
  wonLevel.value = true;
  heroCurrent.moving = false;
  heroHealthRestore();
  levelUpEnemies();
  setTimeout(() => {
    wonLevelScreen.style.display = 'block';
    alertBox.style.display = 'none';
    statsContainer.style.display = 'none';
  }, 5000);
}
