import { moveEnemies } from './enemy.ts';

type GameProgress = {
  inProgress: boolean;
};

export const gameProgress: GameProgress = {
  inProgress: false,
};

export function randomNumberMinMax(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export function startGame() {
  moveEnemies();
}
