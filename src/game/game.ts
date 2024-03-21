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

export function winLevel() {
  const wonLevelScreen = document.getElementById('wonLevelScreen') as HTMLElement;
  const alertBox = document.getElementById('alertBox') as HTMLElement;
  const statsContainer = document.getElementById('stats-container') as HTMLElement;
  wonLevel.value = true;
  heroCurrent.moving = false;
  levelUpEnemies();
  setTimeout(() => {
    wonLevelScreen.style.display = 'block';
    alertBox.style.display = 'none';
    statsContainer.style.display = 'none';
  }, 5000);
}
