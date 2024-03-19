import { moveEnemies } from './enemy.ts';

export type BooleanObject = {
  value: boolean;
};
export const gameInProgress: BooleanObject = {
  value: false,
};

export function randomNumberMinMax(min: number, max: number): number {
  const minCeiled: number = Math.ceil(min);
  const maxFloored: number = Math.floor(max);
  const randomNumber: number = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  return randomNumber;
}

export function startGame() {
  moveEnemies();
}
